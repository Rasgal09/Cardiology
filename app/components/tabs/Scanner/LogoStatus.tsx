import React from "react";
import { Text, View } from "react-native";
import StethoscopeLogo from "@/app/components/Logo";
import { Colors } from "@/app/constants/Colors";
import styles from "./Scanner.styles";

export default function LogoStatus({ isScanning }: { isScanning: boolean }) {
  return (
    <View style={styles.logoAndStatus}>
      <StethoscopeLogo size={80} color={isScanning ? Colors.primary : "#AAA"} />
      <Text style={[styles.statusMessage, { color: isScanning ? Colors.primaryDark : "#666" }]}>
        {isScanning ? "ESCANEO EN CURSO..." : "Listo para iniciar escaneo o subir un archivo .wav"}
      </Text>
    </View>
  );
}