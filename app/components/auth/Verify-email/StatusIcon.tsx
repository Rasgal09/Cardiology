import React from "react";
import { Text, View } from "react-native";
import { s } from "./Verify.styles";
import { Colors } from "@/app/constants/Colors";

export default function StatusIcon({ kind }: { kind: "success" | "error" }) {
  const bg = kind === "success" ? Colors.success : Colors.error;
  const char = kind === "success" ? "✓" : "x";
  return (
    <View style={[s.iconContainer, { backgroundColor: bg }]}>
      <Text style={s.iconText}>{char}</Text>
    </View>
  );
}