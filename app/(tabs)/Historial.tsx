import { useRouter } from 'expo-router';
import { Activity, ArrowLeft, ChevronLeft, ChevronRight, Download } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { Colors } from '../constants/Colors';

export default function HistorialScreen() {
  const router = useRouter();

  const recordings = [
    { id: 1, time: '12:00 pm', status: 'Realizado en reposo' },
    { id: 2, time: '12:00 pm', status: 'Realizado en reposo' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={28} color={Colors.white} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.monthSelector}>
          <TouchableOpacity>
            <ChevronLeft size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.monthText}>Octubre</Text>
          <TouchableOpacity>
            <ChevronRight size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Generar y descargar resumen mensual</Text>
          <Download size={20} color={Colors.primary} />
        </TouchableOpacity>

        <View style={styles.daysRow}>
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
            <View key={index} style={styles.dayBox}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>

        {recordings.map((recording) => (
          <TouchableOpacity
            key={recording.id}
            style={styles.recordingCard}
            onPress={() => router.push('/Individual')}
          >
            <Activity size={32} color={Colors.primary} strokeWidth={2} />
            <View style={styles.recordingInfo}>
              <Text style={styles.recordingTitle}>Fonocardiograma {recording.time}</Text>
              <Text style={styles.recordingStatus}>{recording.status}</Text>
            </View>
            <TouchableOpacity>
              <Download size={24} color={Colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  downloadButton: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  downloadButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayBox: {
    width: 40,
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  recordingCard: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  recordingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recordingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  recordingStatus: {
    fontSize: 12,
    color: Colors.darkGray,
  },
});