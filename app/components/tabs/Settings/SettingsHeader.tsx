import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Colors } from '@/app/constants/Colors';
import { s } from './Settings.styles';

export default function SettingsHeader({ onBack }: { onBack: () => void }) {
  return (
    <View style={s.header}>
      <TouchableOpacity onPress={onBack} style={s.backButton} activeOpacity={0.7}>
        <ArrowLeft size={24} color={Colors.text} strokeWidth={2.5} />
      </TouchableOpacity>
      <Text style={s.headerTitle}>Ajustes y Configuración</Text>
    </View>
  );
}