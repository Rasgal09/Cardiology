import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  serviceUuid?: string;
  pcmCharUuid?: string;
  onConnected?: () => void;
  onDisconnected?: () => void;
  onPCMFrame?: (samples: Int16Array) => void;
};

export default function BLEConnector({
  serviceUuid = '12345678-1234-5678-1234-56789abcdef0',
  pcmCharUuid = '12345678-1234-5678-1234-56789abcdef2',
  onConnected,
  onDisconnected,
  onPCMFrame,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'connecting' | 'connected' | 'error'>('idle');
  const deviceRef = useRef<any>(null);
  const bleManagerRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // try to require react-native-ble-plx lazily; user must install it for native BLE support
      try {
        // @ts-ignore
        const { BleManager } = require('react-native-ble-plx');
        // @ts-ignore
        bleManagerRef.current = new BleManager();
      } catch (err) {
        console.warn('BLEConnector: react-native-ble-plx not installed. Native BLE not available.');
      }
    }

    return () => {
      // cleanup
      if (Platform.OS !== 'web' && bleManagerRef.current) {
        try { bleManagerRef.current.destroy(); } catch (e) {}
      }
    };
  }, []);

  // --- Web implementation ---
  const connectWeb = async () => {
    if (!navigator || !(navigator as any).bluetooth) {
      setStatus('error');
      console.error('Web Bluetooth API not available in this browser');
      return;
    }

    // Helper: try to request device with several strategies
    const tryRequestDevice = async () => {
      const attempts = [
        // Prefer filter by service UUID (cleanest when ESP32 advertises it)
        { filters: [{ services: [serviceUuid] }], optionalServices: [serviceUuid] },
        // Try namePrefix / name (common for ESP32 boards that include "ESP" or "ESP32" in the device name)
        { filters: [{ namePrefix: 'ESP' }], optionalServices: [serviceUuid] },
        { filters: [{ name: 'ESP32' }], optionalServices: [serviceUuid] },
        // Fallback: ask user for any device but request our service as optional
        { acceptAllDevices: true, optionalServices: [serviceUuid] },
      ];

      for (const opts of attempts) {
        try {
          // requestDevice must be called inside a user gesture (button press)
          // @ts-ignore
          const device = await (navigator as any).bluetooth.requestDevice(opts);
          return device;
        } catch (err: any) {
          // If the user explicitly cancelled the chooser, stop trying and rethrow
          const name = err && (err.name || err.code || err.message);
          if (name === 'NotFoundError' || (err && /cancel/i.test(err.message || ''))) {
            // continue to next strategy (user may have closed dialog); do not throw immediately
            console.warn('requestDevice canceled or not found for strategy, trying next if available', err);
            continue;
          }
          console.warn('requestDevice attempt failed, trying next strategy:', err);
        }
      }
      throw new Error('No device selected or Bluetooth request failed.');
    };

    try {
      setStatus('scanning');
      const device = await tryRequestDevice();
      if (!device) throw new Error('No device returned from requestDevice.');

      deviceRef.current = device;
      setStatus('connecting');

      // Some implementations provide .gatt on the device directly
      const server = await (device.gatt || device).connect();
      const service = await server.getPrimaryService(serviceUuid);
      const char = await service.getCharacteristic(pcmCharUuid);

      // Handler: normalize value retrieval from event
      const handleValue = (ev: any) => {
        // Web Bluetooth delivers a DataView at ev.target.value or ev.currentTarget.value
        const dv: DataView | undefined = ev?.target?.value ?? ev?.currentTarget?.value;
        if (!dv) return;
        // Copy the exact ArrayBuffer slice used by the DataView
        const byteOffset = (dv as any).byteOffset ?? 0;
        const byteLength = (dv as any).byteLength ?? dv.byteLength;
        const buffer = dv.buffer.slice(byteOffset, byteOffset + byteLength);
        // Interpret as 16-bit signed PCM
        const samples = new Int16Array(buffer);
        if (onPCMFrame) onPCMFrame(samples);
      };

      await char.startNotifications();
      // Use both addEventListener and oncharacteristicvaluechanged for compatibility
      try {
        char.addEventListener('characteristicvaluechanged', handleValue);
      } catch (e) {
        // Fallback
        // @ts-ignore
        char.oncharacteristicvaluechanged = handleValue;
      }

      // Disconnect handling with optional reconnect attempts
      let reconnectAttempts = 0;
      const maxReconnect = 3;
      const onDisconnected = async () => {
        setStatus('idle');
        if (onDisconnected) onDisconnected();
        // Try simple reconnect strategy a limited number of times
        if (reconnectAttempts < maxReconnect) {
          reconnectAttempts++;
          console.warn(`Device disconnected, attempt reconnect ${reconnectAttempts}/${maxReconnect}`);
          setTimeout(async () => {
            try {
              setStatus('connecting');
              // try to reconnect to the same device
              const srv = await (device.gatt || device).connect();
              const svc = await srv.getPrimaryService(serviceUuid);
              const ch = await svc.getCharacteristic(pcmCharUuid);
              await ch.startNotifications();
              // reattach handler
              try {
                ch.addEventListener('characteristicvaluechanged', handleValue);
              } catch (e) {
                // @ts-ignore
                ch.oncharacteristicvaluechanged = handleValue;
              }
              setStatus('connected');
              if (onConnected) onConnected();
              reconnectAttempts = 0;
            } catch (err) {
              console.warn('Reconnect failed:', err);
              setStatus('idle');
            }
          }, 1000 * reconnectAttempts); // simple backoff
        }
      };

      device.addEventListener('gattserverdisconnected', onDisconnected);

      setStatus('connected');
      if (onConnected) onConnected();
    } catch (err) {
      console.error('BLEConnector(web) connect error:', err);
      setStatus('error');
    }
  };

  // --- Native implementation using react-native-ble-plx (requires installation) ---
  const connectNative = async () => {
    const manager = bleManagerRef.current;
    if (!manager) {
      setStatus('error');
      console.warn('BLEConnector: native BleManager not available');
      return;
    }
    setStatus('scanning');
    try {
      // start scanning and connect to first device exposing the serviceUuid
      const subscription = manager.onStateChange((state: string) => {
        if (state === 'PoweredOn') {
          subscription.remove();
        }
      }, true);

      manager.startDeviceScan([serviceUuid], null, async (error: any, device: any) => {
        if (error) {
          console.warn('scan error', error);
          setStatus('error');
          manager.stopDeviceScan();
          return;
        }
        if (device) {
          // connect to first matching device
          manager.stopDeviceScan();
          setStatus('connecting');
          try {
            const connected = await device.connect();
            await connected.discoverAllServicesAndCharacteristics();
            deviceRef.current = connected;
            // monitor characteristic for notifications
            connected.monitorCharacteristicForService(serviceUuid, pcmCharUuid, (err: any, char: any) => {
              if (err) {
                console.warn('monitor error', err);
                return;
              }
              if (char && char.value) {
                try {
                  const base64 = char.value;
                  const raw = Buffer.from(base64, 'base64');
                  const samples = new Int16Array(new Uint8Array(raw).buffer);
                  if (onPCMFrame) onPCMFrame(samples);
                } catch (e) {
                  console.warn('parse pcm native', e);
                }
              }
            });
            setStatus('connected');
            if (onConnected) onConnected();
          } catch (e) {
            console.warn('connect failed', e);
            setStatus('error');
          }
        }
      });
    } catch (e) {
      console.warn('native connect exception', e);
      setStatus('error');
    }
  };

  const disconnect = async () => {
    try {
      if (Platform.OS === 'web') {
        const d = deviceRef.current;
        if (d && d.gatt && d.gatt.connected) d.gatt.disconnect();
      } else {
        const dev = deviceRef.current;
        if (dev && dev.cancelConnection) await dev.cancelConnection();
      }
    } catch (e) { console.warn('disconnect error', e); }
    deviceRef.current = null;
    setStatus('idle');
    if (onDisconnected) onDisconnected();
  };

  const handleConnect = async () => {
    if (status === 'connected') return await disconnect();
    if (Platform.OS === 'web') await connectWeb();
    else await connectNative();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>BLE: {status}</Text>
      {Platform.OS !== 'web' && !bleManagerRef.current ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#b33', marginBottom: 8, textAlign: 'center' }}>
            Native BLE not available — install and link `react-native-ble-plx` to use BLE on device.
          </Text>
          <TouchableOpacity style={[styles.button, styles.buttonDisabled]} disabled>
            <Text style={[styles.buttonText, styles.buttonTextDisabled]}>Connect BLE</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.button, (status === 'scanning' || status === 'connecting') && styles.buttonDisabled]}
          onPress={handleConnect}
          disabled={status === 'scanning' || status === 'connecting'}
        >
          <Text style={styles.buttonText}>{status === 'connected' ? 'Disconnect' : 'Connect BLE'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  statusText: { fontSize: 13, color: '#444', marginBottom: 6 },
  button: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, backgroundColor: '#ef5350' },
  buttonText: { color: 'white', fontWeight: '700' },
  buttonDisabled: { backgroundColor: '#ddd' },
  buttonTextDisabled: { color: '#999' },
});
