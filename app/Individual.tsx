import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Play, Download } from 'lucide-react-native';
import Svg, { Polyline } from 'react-native-svg';
import { Colors } from './constants/Colors';

export default function IndividualScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={28} color={Colors.white} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fonocardiograma 12:20 pm</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.chartCard}>
          <Svg width="100%" height={150} viewBox="0 0 300 100">
            <Polyline
              points="0,50 20,45 40,30 60,55 80,25 100,60 120,35 140,50 160,40 180,55 200,30 220,50 240,45 260,35 280,50 300,45"
              fill="none"
              stroke={Colors.primary}
              strokeWidth="3"
            />
          </Svg>
        </View>

        <View style={styles.audioPlayer}>
          <TouchableOpacity style={styles.playButton}>
            <Play size={20} color={Colors.primary} fill={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.waveform}>
            {[...Array(20)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.waveformBar,
                  { height: Math.random() * 20 + 10 },
                ]}
              />
            ))}
          </View>
          <TouchableOpacity>
            <Download size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>
            Descripción del Fonocardiograma:
          </Text>
          <Text style={styles.descriptionText}>
            Muestra una línea de registro que fluctúa en amplitud (verticalmente) a lo largo del tiempo (horizontalmente), representando los sonidos producidos por los latidos del corazón. La línea base plana se interrumpe por complejos de ondas más grandes y más pequeñas que se repiten de forma rítmica.
          </Text>
          <Text style={styles.descriptionText}>
            El patrón visible se caracteriza por grupos de ondas que representan los ruidos cardíacos primarios y la actividad durante los ciclos sistólico y diastólico:
          </Text>
          <Text style={styles.descriptionText}>
            <Text style={styles.bold}>1. Ruidos Cardíacos (S1 y S2):</Text> Dentro de cada grupo se observan dos picos de mayor amplitud (más altos), que corresponden al primero ruido (S1) y segundo ruido (S2). Estos indican que el cierre de las válvulas cardíacas.
          </Text>
          <Text style={styles.descriptionText}>
            <Text style={styles.bold}>2. Sístole y Diástole:</Text> El espacio entre el primer ruido grande de un latido y el segundo ruido grande del intervalo de menor amplitud.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  audioPlayer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: 30,
  },
  waveformBar: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  descriptionCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.white,
    lineHeight: 20,
    marginBottom: 12,
  },
  bold: {
    fontWeight: '700',
  },
});