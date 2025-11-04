import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Battery,
  Bluetooth,
  HeartPulse,
  Loader,
  Play,
  Upload,
  X
} from 'lucide-react-native';
import React from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StethoscopeLogo from '../components/Logo';
import Navbar from '../components/Navbar';
import { Colors } from '../constants/Colors';
import { getToken } from '../lib/auth';
import styles from "./Scanner.styles";
import BLEConnector from '../components/BLEConnector';

// --- COMPONENTE: Botón de Acción Principal (sin cambios) ---
const ActionButton = ({ onPress, text, icon: Icon, disabled }: { 
  onPress: () => void; 
  text: string; 
  icon: React.ElementType; 
  disabled?: boolean;
}) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={styles.startButtonWrapper} 
    disabled={disabled}
    activeOpacity={0.7}
  >
    <LinearGradient
      colors={disabled ? ['#AAA', '#999'] : [Colors.primary, Colors.primaryDark]} 
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.startButtonGradient}
    >
      <Icon size={30} color={Colors.white} style={{ marginRight: 10 }} />
      <Text style={styles.startButtonText}>{text}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default function ScannerScreen() {
  const router = useRouter();

  const [isScanning, setIsScanning] = React.useState(false);
  const [bluetoothConnected, setBluetoothConnected] = React.useState(false);

  const [file, setFile] = React.useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  // --- (Funciones de Sincronización, sin cambios) ---
  const handleStartScan = () => {
    if (isScanning) return; 
    setIsScanning(true);
    setTimeout(() => {
        setIsScanning(false);
    }, 3000); 
  };

  const handlePickDocument = async () => {
    if (isAnalyzing) return;
    setFile(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["audio/wav", "audio/x-wav", "audio/wave"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
    } catch (err) {
      console.error('Error al seleccionar el documento:', err);
    }
  };
  
  const handleCancelUpload = () => {
    setFile(null);
    setIsAnalyzing(false); 
  };

  // Simulate connect/disconnect for Bluetooth (replace with real BLE logic later)
  // BLE connection is handled by BLEConnector - we set bluetoothConnected via its callbacks

  const uploadFile = async (fileAsset: DocumentPicker.DocumentPickerAsset, mode: 'Reposo' | 'Actividad') => {
    const backendUrl = process.env.EXPO_PUBLIC_URL_BACK;
    if (!backendUrl) {
      throw new Error('La URL del servidor (EXPO_PUBLIC_URL_BACK) no está configurada.');
    }
    const url = `${backendUrl}/analysis/upload_wav`;
    const formData = new FormData();

    // Append file correctly depending on platform
    if (Platform.OS === 'web') {
      // On web, fetch the file URI to get a Blob and append it
      try {
        const fileResp = await fetch(fileAsset.uri);
        const blob = await fileResp.blob();
        formData.append('file', blob, fileAsset.name || 'upload.wav');
      } catch (err) {
        // Fallback: try to append as-is (some web providers already give a File-like object)
        // @ts-ignore
        formData.append('file', fileAsset as any);
      }
    } else {
      // React Native: append the { uri, name, type } object
      formData.append('file', {
        uri: fileAsset.uri,
        name: fileAsset.name || 'upload.wav',
        type: fileAsset.mimeType || 'audio/wav',
      } as any);
    }

    formData.append('mode', mode);

    // Build options and headers
    const options: any = {
      method: 'POST',
      body: formData,
    };

    // Credentials for web (cookies)
    if (Platform.OS === 'web') {
      options.credentials = 'include';
    }

    // Authorization header for mobile if token exists
    if (Platform.OS !== 'web') {
      try {
        const token = await getToken();
        if (token) {
          options.headers = {
            Authorization: `Bearer ${token}`,
          };
        }
      } catch (err) {
        console.warn('No se pudo obtener el token para la subida:', err);
      }
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error desconocido del servidor' }));
      throw new Error(errorData.message || 'No se pudo subir el archivo');
    }
    return response.json();
  };

  const handleStartAnalysis = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    console.log(`Iniciando análisis de: ${file.name}`);
    try {
      const result = await uploadFile(file, 'Reposo');
      console.log('Análisis completado:', result);
      Alert.alert('Éxito', 'El archivo ha sido analizado correctamente.');
    } catch (error) {
      console.error('Error en el análisis:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'No se pudo completar el análisis.');
    } finally {
      setIsAnalyzing(false);
      setFile(null); 
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Monitor de Escaneo</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- TARJETA ÚNICA DE ACCIÓN --- */}
        <View style={styles.scannerCard}>
          <Text style={styles.scannerCardTitle}>Configuración de Escaneo</Text>
          
          <View style={styles.logoAndStatus}>
            <StethoscopeLogo size={80} color={isScanning ? Colors.primary : '#AAA'} />
            <Text style={[styles.statusMessage, { color: isScanning ? Colors.primaryDark : '#666' }]}> 
              {isScanning ? 'ESCANEO EN CURSO...' : 'Listo para iniciar escaneo o subir un archivo .wav'}
            </Text>
          </View>
          
          {/* --- CONTROLES DE ESCANEO Y SUBIDA --- */}
            <>
              <ActionButton 
                onPress={handleStartScan} 
                text={isScanning ? 'CANCELAR ESCANEO' : 'INICIAR MEDICIÓN'} 
                icon={HeartPulse}
                disabled={isScanning || !bluetoothConnected} 
                />

              {/* Mensaje para el usuario cuando no hay conexión Bluetooth */}
              {!bluetoothConnected && (
                <Text style={styles.bluetoothWarning}>
                  Conecta el dispositivo vía Bluetooth para poder iniciar la medición.
                </Text>
              )}

              {/* --- SECCIÓN DE SUBIR ARCHIVO --- */}
              <View style={styles.sectionSeparator} />
              
              <Text style={styles.sectionTitle}>O analizar un archivo existente</Text>

              {/* El texto de estado ahora está DENTRO del fileActionContainer */}
              <View style={styles.fileActionContainer}>
                
                {!file && !isAnalyzing && (
                  <ActionButton 
                    onPress={handlePickDocument} 
                    text="SUBIR ARCHIVO .WAV" 
                    icon={Upload} 
                    disabled={isAnalyzing}
                  />
                )}
                
                {/* --- INICIO DE LA CORRECCIÓN --- */}
                {/* Esta es la lógica que muestra los botones y el nombre del archivo */}
                {file && !isAnalyzing && (
                  <>
                    {/* 1. Nombre del archivo (como pediste) */}
                    <Text style={styles.fileNameText}>
                      Archivo: {file.name}
                    </Text>

                    {/* 2. Contenedor para los nuevos botones */}
                    <View style={styles.analysisButtonContainer}>
                      <TouchableOpacity 
                        style={[styles.smallButton, styles.smallButtonCancel]} // Estilo nuevo
                        onPress={handleCancelUpload}
                        disabled={isAnalyzing}
                      >
                        <X size={20} color="#E53E3E" /> {/* Color rojo suave */}
                        <Text style={[styles.smallButtonText, styles.smallButtonTextCancel]}>Cancelar</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={[styles.smallButton, styles.smallButtonAnalyze]} // Estilo nuevo
                        onPress={handleStartAnalysis} 
                        disabled={isAnalyzing}
                      >
                        <Play size={20} color={Colors.primary} /> {/* Color primario */}
                        <Text style={[styles.smallButtonText, styles.smallButtonTextAnalyze]}>Iniciar Análisis</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {/* --- FIN DE LA CORRECCIÓN --- */}


                {isAnalyzing && (
                  // El estado de "Analizando" no ha cambiado
                  <View style={styles.analyzingContainer}>
                    <Loader size={30} color={Colors.primary} style={styles.loaderIcon} />
                    <Text style={styles.analyzingText}>Analizando...</Text>
                  </View>
                )}
              </View>
            </>
          {/* --- FIN DE LOS CONTROLES --- */}

        </View>


        {/* --- TARJETA DE ESTADO DEL DISPOSITIVO --- */}
  <View style={styles.statusCard}>
          {/* ... (sin cambios) ... */}
          <Text style={styles.statusCardTitle}>Estado del Dispositivo</Text>
          <View style={styles.statusItem}>
              <Bluetooth size={20} color={Colors.primary} />
              <Text style={styles.statusLabel}>Bluetooth</Text>
              <Text style={[styles.statusValue, !bluetoothConnected && styles.statusValueDisconnected]}>
                {bluetoothConnected ? 'Conectado' : 'Desconectado'}
              </Text>
          </View>
            <View style={styles.statusSeparator} />
            <View style={styles.statusItem}>
                <Battery size={20} color={Colors.primary} />
                <Text style={styles.statusLabel}>Batería</Text>
                <Text style={styles.statusValue}>100%</Text>
            </View>
    {/* BLE connector component: works on web (Web Bluetooth) and native (react-native-ble-plx if installed) */}
    <BLEConnector
      onConnected={() => setBluetoothConnected(true)}
      onDisconnected={() => setBluetoothConnected(false)}
      onPCMFrame={(samples) => {
        // handle incoming PCM frames for debugging/tests
        console.debug('PCM frame length:', samples.length);
        // For now we just log; you can process or forward this to analysis flow
      }}
    />
        </View>
        
      </ScrollView>

      <Navbar />
    </SafeAreaView>
  );
}