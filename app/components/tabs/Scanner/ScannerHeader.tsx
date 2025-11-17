import React from "react";
import { View, Text } from "react-native";
import styles from "./Scanner.styles";

export default function ScannerHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Monitor de Escaneo</Text>
      <View style={{ width: 24 }} />
    </View>
  );
}