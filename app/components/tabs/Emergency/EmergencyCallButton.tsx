import React from 'react';
import { TouchableOpacity, View, Alert, Linking } from 'react-native';
import { PhoneCall } from 'lucide-react-native';
import { Colors } from '@/app/theme/tokens';
import { s } from './Emergency.styles';

export default function EmergencyCallButton({ phone }: { phone: string }) {
  const makeCall = async () => {
    const url = `tel:${phone}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Error de Dispositivo', 'Tu dispositivo no soporta la función de llamada (tel:).');
        return;
      }
      await Linking.openURL(url);
    } catch (e) {
      console.error('Error al intentar llamar:', e);
      Alert.alert('Error', 'Ocurrió un error al intentar iniciar la llamada.');
    }
  };

  return (
    <TouchableOpacity style={s.callButton} onPress={makeCall} activeOpacity={0.8}>
      <View style={s.innerButton}>
        <PhoneCall size={48} color={Colors.textLight} strokeWidth={2} />
      </View>
    </TouchableOpacity>
  );
}
