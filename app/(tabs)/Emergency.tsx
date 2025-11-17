import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import EmergencyHeader from '@/app/components/tabs/Emergency/EmergencyHeader';
import EmergencyCallButton from '@/app/components/tabs/Emergency/EmergencyCallButton';
import EmergencyDisclaimer from '@/app/components/tabs/Emergency/EmergencyDisclaimer';
import { s } from '@/app/components/tabs/Emergency/Emergency.styles';

export default function EmergenciaScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.container}>
      <EmergencyHeader onBack={() => router.back()} />
      <View style={s.content}>
        <Text style={s.emergencyNumber}>911</Text>
        <Text style={s.statusText}>Emergencia - Servicio de Asistencia Inmediata</Text>

        <EmergencyCallButton phone="9612367031" />
        <Text style={s.buttonLabel}>LLAMAR AL 911</Text>

        <View style={s.separator} />
        <EmergencyDisclaimer />
      </View>
    </SafeAreaView>
  );
}