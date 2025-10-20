import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

export default function CuidadosScreen() {
  const router = useRouter();

  const careOptions = [
    {
      title: 'Alimentación saludable',
      description: 'Para cuidar tu corazón, adopta hábitos de vida saludables: mantén una dieta rica en frutas, verduras y granos integrales, haz ejercicio regularmente, controla tu peso, evita el tabaco y el consumo excesivo de alcohol, maneja el estrés, y realiza chequeos médicos periódicos para vigilar la presión arterial, el colesterol y la glucosa',
    },
    {
      title: 'Actividad física',
      description: 'Realiza ejercicio regularmente para mantener tu corazón saludable',
    },
    {
      title: 'Hábitos y costumbres',
      description: 'Mantén buenos hábitos para cuidar tu salud cardiovascular',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.navigate('/(tabs)/Home')}>
          <ArrowLeft size={28} color={Colors.primary} strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Para cuidar tu corazón, adopta hábitos de vida saludables: mantén una dieta rica en frutas, verduras y granos integrales, haz ejercicio regularmente, controla tu peso, evita el tabaco y el consumo excesivo de alcohol, maneja el estrés, y realiza chequeos médicos periódicos para vigilar la presión arterial, el colesterol y la glucosa
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {careOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              activeOpacity={0.8}
            >
              <Text style={styles.optionText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.white,
    lineHeight: 20,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
});