import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Colors } from '@/app/theme/tokens';

export default function EmergencyHeader({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <ArrowLeft size={24} color={Colors.text} strokeWidth={2} />
        <Text style={styles.title}>VOLVER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 10, marginBottom: 50 },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  title: { color: Colors.text, marginLeft: 8, fontSize: 16, fontWeight: '500' },
});