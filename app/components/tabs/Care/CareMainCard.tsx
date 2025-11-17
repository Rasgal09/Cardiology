import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HeartHandshake } from 'lucide-react-native';
import { Colors } from '@/app/constants/Colors';
import { s } from './Care.styles';

export default function CareMainCard({ text }: { text: string }) {
  return (
    <View style={s.mainCardWrapper}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={s.mainCardGradient}
      >
        <HeartHandshake size={34} color={Colors.white} strokeWidth={2} style={s.mainCardIcon} />
        <Text style={s.mainCardTitle}>Consejo Esencial</Text>
        <Text style={s.mainCardText}>{text}</Text>
      </LinearGradient>
    </View>
  );
}