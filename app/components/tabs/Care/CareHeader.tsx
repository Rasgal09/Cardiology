import React from 'react';
import { View, Text } from 'react-native';
import { s } from './Care.styles';

export default function CareHeader() {
  return (
    <View style={s.header}>
      <Text style={s.headerTitle}>Cuidados del Corazón</Text>
      <View style={{ width: 24 }} />
    </View>
  );
}