import React from 'react';
import { Text } from 'react-native';
import { s } from './Emergency.styles';

export default function EmergencyDisclaimer() {
  return <Text style={s.disclaimer}>Use esta función solo en caso de necesidad real.</Text>;
}