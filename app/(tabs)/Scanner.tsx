import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bluetooth, Battery, HeartPulse } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StethoscopeLogo from '../components/Logo';
import Navbar from '../components/Navbar';
import { Colors } from '../constants/Colors';

// --- COMPONENTE: Botón de Inicio Principal (con Degradado) ---
const StartScanButton = ({ onPress, text }: { onPress: () => void; text: string }) => (
  <TouchableOpacity onPress={onPress} style={styles.startButtonWrapper}>
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.startButtonGradient}
    >
      <HeartPulse size={30} color={Colors.white} style={{ marginRight: 10 }} />
      <Text style={styles.startButtonText}>{text}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default function ScannerScreen() {
  const router = useRouter();
  const [scanMode, setScanMode] = React.useState('Reposo');
  const [isScanning, setIsScanning] = React.useState(false); // Simulamos el estado de escaneo

  const handleStartScan = () => {
    setIsScanning(true);
    // Simula una acción y detiene después de un tiempo
    setTimeout(() => {
        setIsScanning(false);
    }, 3000); 
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={'#444'} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Monitor de Escaneo</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- TARJETA PRINCIPAL DE ACCIÓN (BLANCA) --- */}
        <View style={styles.scannerCard}>
          <Text style={styles.scannerCardTitle}>Configuración de Escaneo</Text>
          
          {/* Logo y estado visual */}
          <View style={styles.logoAndStatus}>
            <StethoscopeLogo size={80} color={isScanning ? Colors.primary : '#AAA'} />
            <Text style={[styles.statusMessage, { color: isScanning ? Colors.primaryDark : '#666' }]}>
                {isScanning ? 'ESCANENADO EN CURSO...' : 'Selecciona el modo y comienza.'}
            </Text>
          </View>

          {/* Selector de Modo (Segmented Control Style) */}
          <View style={styles.modeSelector}>
            <TouchableOpacity 
                style={[styles.modeButton, scanMode === 'Reposo' && styles.modeButtonActive]}
                onPress={() => setScanMode('Reposo')}
            >
                <Text style={[styles.modeButtonText, scanMode === 'Reposo' && styles.modeButtonTextActive]}>En Reposo</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.modeButton, scanMode === 'Actividad' && styles.modeButtonActive]}
                onPress={() => setScanMode('Actividad')}
            >
                <Text style={[styles.modeButtonText, scanMode === 'Actividad' && styles.modeButtonTextActive]}>Actividad Física</Text>
            </TouchableOpacity>
          </View>
          
          {/* Botón de Inicio (CON DEGRADADO) */}
          <StartScanButton 
            onPress={handleStartScan} 
            text={isScanning ? 'CANCELAR ESCANEO' : 'INICIAR MEDICIÓN'} 
          />

        </View>

        {/* --- TARJETA DE ESTADO DEL DISPOSITIVO (Limpieza) --- */}
        <View style={styles.statusCard}>
            <Text style={styles.statusCardTitle}>Estado del Dispositivo</Text>
            
            <View style={styles.statusItem}>
                <Bluetooth size={20} color={Colors.primary} />
                <Text style={styles.statusLabel}>Bluetooth</Text>
                <Text style={styles.statusValue}>Conectado</Text>
            </View>
            <View style={styles.statusSeparator} />
            <View style={styles.statusItem}>
                <Battery size={20} color={Colors.primary} />
                <Text style={styles.statusLabel}>Batería</Text>
                <Text style={styles.statusValue}>100%</Text>
            </View>
            
            <TouchableOpacity style={styles.connectButton}>
                <Text style={styles.connectButtonText}>Buscar dispositivos</Text>
            </TouchableOpacity>
        </View>
        
      </ScrollView>

      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
  },
  // --- HEADER ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  // --- TARJETA PRINCIPAL DE ACCIÓN (BLANCA) ---
  scannerCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    // Sombra limpia
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
  },
  scannerCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  logoAndStatus: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusMessage: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },

  // --- SELECTOR DE MODO (Segmented Control) ---
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#EAEAEA', // Gris muy claro para el fondo del control
    borderRadius: 10,
    padding: 3,
    marginBottom: 25,
    width: '100%',
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  modeButtonActive: {
    backgroundColor: Colors.white,
    // Sombra solo en el segmento activo para levantarlo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  modeButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  modeButtonTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },

  // --- START BUTTON (DEGRADADO) ---
  startButtonWrapper: {
    width: '100%',
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    // Sombra del CTA
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  startButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
  },

  // --- TARJETA DE ESTADO (BLANCA Y LIMPIA) ---
  statusCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
  },
  statusCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  statusSeparator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
  },
  connectButton: {
    marginTop: 15,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  connectButtonText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 15,
  }
});