import React from "react";
import { Text, View } from "react-native";
import { Battery, Bluetooth } from "lucide-react-native";
import { Colors } from "@/app/constants/Colors";
import styles from "./Scanner.styles";

export default function StatusCard({ bluetoothConnected }: { bluetoothConnected: boolean }) {
  return (
    <View style={styles.statusCard}>
      <Text style={styles.statusCardTitle}>Estado del Dispositivo</Text>
      <View style={styles.statusItem}>
        <Bluetooth size={20} color={Colors.primary} />
        <Text style={styles.statusLabel}>Bluetooth</Text>
        <Text style={[styles.statusValue, !bluetoothConnected && styles.statusValueDisconnected]}>
          {bluetoothConnected ? "Conectado" : "Desconectado"}
        </Text>
      </View>
      <View style={styles.statusSeparator} />
      <View style={styles.statusItem}>
        <Battery size={20} color={Colors.primary} />
        <Text style={styles.statusLabel}>Batería</Text>
        <Text style={styles.statusValue}>100%</Text>
      </View>
    </View>
  );
}