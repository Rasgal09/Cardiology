import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/app/constants/Colors";
import styles from "./Scanner.styles";

export default function ActionButton({
  onPress, text, icon: Icon, disabled,
}: {
  onPress: () => void;
  text: string;
  icon: React.ElementType;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.startButtonWrapper} disabled={disabled} activeOpacity={0.7}>
      <LinearGradient
        colors={disabled ? ["#AAA", "#999"] : [Colors.primary, Colors.primaryDark]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.startButtonGradient}
      >
        <Icon size={30} color={Colors.white} style={{ marginRight: 10 }} />
        <Text style={styles.startButtonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}