import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bluetooth, Battery } from 'lucide-react-native';
import StethoscopeLogo from '../components/Logo';
import Navbar from '../components/Navbar';
import { Colors } from '../constants/Colors';

export default function ScannerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={28} color={Colors.primary} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scanner</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.scannerCard}>
          <View style={styles.logoContainer}>
            <StethoscopeLogo size={140} color={Colors.white} />
          </View>

          <Text style={styles.scannerTitle}>Iniciar escaneo</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.modeButton}>
              <Text style={styles.modeButtonText}>En reposo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modeButton}>
              <Text style={styles.modeButtonText}>Actividad física</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Iniciar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Estado del dispositivo</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Bluetooth size={20} color={Colors.white} />
              <Text style={styles.statusText}>Conectado</Text>
            </View>
            <View style={styles.statusItem}>
              <Battery size={20} color={Colors.white} />
              <Text style={styles.statusText}>100%</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  scannerCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    marginBottom: 24,
  },
  scannerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  modeButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  modeButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  startButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 48,
    paddingVertical: 48,
    borderRadius: 100,
  },
  startButtonText: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  statusCard: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 16,
    padding: 20,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});