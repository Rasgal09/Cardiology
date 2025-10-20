import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, PhoneOff } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

export default function EmergenciaScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={28} color={Colors.white} strokeWidth={2.5} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.emergencyNumber}>911</Text>
        <Text style={styles.statusText}>Contactando con</Text>
        <Text style={styles.statusText}>contacto</Text>
        <Text style={styles.statusText}>de emergencia</Text>

        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <PhoneOff size={60} color={Colors.primary} strokeWidth={2.5} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyNumber: {
    fontSize: 120,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 40,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
  },
  iconContainer: {
    marginTop: 80,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});