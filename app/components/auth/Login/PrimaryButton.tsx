import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { s } from './Login.styles';

export default function PrimaryButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={s.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={s.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}