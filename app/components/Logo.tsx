import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';
import LogoSvg from './LogoSvg';

interface StethoscopeLogoProps {
  size?: number;
  color?: string;
}

export default function StethoscopeLogo({ 
  size = 120, 
  color = Colors.primary 
}: StethoscopeLogoProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>      
      <LogoSvg width={size} height={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});