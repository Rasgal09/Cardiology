import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../constants/Colors';

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
      <Svg width={size} height={size} viewBox="0 0 200 200">
        {/* Estetoscopio */}
        <Path
          d="M60 40 C60 40, 50 60, 50 80 C50 100, 60 120, 80 130 L80 160 C80 170, 90 180, 100 180 C110 180, 120 170, 120 160 L120 130 C140 120, 150 100, 150 80 C150 60, 140 40, 140 40"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <Circle cx="100" cy="180" r="12" fill={color} />
        
        {/* Corazón pixelado */}
        <Circle cx="160" cy="90" r="4" fill={color} />
        <Circle cx="168" cy="90" r="4" fill={color} />
        <Circle cx="176" cy="90" r="4" fill={color} />
        <Circle cx="156" cy="98" r="4" fill={color} />
        <Circle cx="164" cy="98" r="4" fill={color} />
        <Circle cx="172" cy="98" r="4" fill={color} />
        <Circle cx="180" cy="98" r="4" fill={color} />
        <Circle cx="152" cy="106" r="4" fill={color} />
        <Circle cx="160" cy="106" r="4" fill={color} />
        <Circle cx="168" cy="106" r="4" fill={color} />
        <Circle cx="176" cy="106" r="4" fill={color} />
        <Circle cx="184" cy="106" r="4" fill={color} />
        <Circle cx="156" cy="114" r="4" fill={color} />
        <Circle cx="164" cy="114" r="4" fill={color} />
        <Circle cx="172" cy="114" r="4" fill={color} />
        <Circle cx="180" cy="114" r="4" fill={color} />
        <Circle cx="160" cy="122" r="4" fill={color} />
        <Circle cx="168" cy="122" r="4" fill={color} />
        <Circle cx="176" cy="122" r="4" fill={color} />
        <Circle cx="164" cy="130" r="4" fill={color} />
        <Circle cx="172" cy="130" r="4" fill={color} />
        <Circle cx="168" cy="138" r="4" fill={color} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});