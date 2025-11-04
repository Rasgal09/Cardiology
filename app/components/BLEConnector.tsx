import React, { useEffect, useRef, useState } from 'react';
import { Platform, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

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
    try {
      setStatus('scanning');
      const options: any = {
        filters: [{ services: [serviceUuid] }],
        optionalServices: [serviceUuid],
      };
      const device = await (navigator as any).bluetooth.requestDevice(options);
      deviceRef.current = device;
      setStatus('connecting');
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(serviceUuid);
      const char = await service.getCharacteristic(pcmCharUuid);
      await char.startNotifications();
      char.addEventListener('characteristicvaluechanged', (ev: any) => {
        const dv: DataView = ev.target.value; // DataView
        // Copy into Int16Array
        const buffer = dv.buffer.slice(dv.byteOffset, dv.byteOffset + dv.byteLength);
        const samples = new Int16Array(buffer);
        if (onPCMFrame) onPCMFrame(samples);
      });
      device.addEventListener('gattserverdisconnected', () => {
        setStatus('idle');
        if (onDisconnected) onDisconnected();
      });
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
      <TouchableOpacity style={styles.button} onPress={handleConnect}>
        <Text style={styles.buttonText}>{status === 'connected' ? 'Disconnect' : 'Connect BLE'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  statusText: { fontSize: 13, color: '#444', marginBottom: 6 },
  button: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, backgroundColor: '#ef5350' },
  buttonText: { color: 'white', fontWeight: '700' },
});
