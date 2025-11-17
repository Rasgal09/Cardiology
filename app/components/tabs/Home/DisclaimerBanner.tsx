import React from "react";
import { Text, View } from "react-native";
import { AlertTriangle } from "lucide-react-native";
import { s } from "./Home.styles";

export default function DisclaimerBanner() {
  return (
    <View style={s.disclaimerContainer}>
      <View style={s.disclaimerIconContainer}>
        <AlertTriangle size={22} color={"#F59E0B"} strokeWidth={2.5} />
      </View>
      <Text style={s.disclaimerText}>
        Esta aplicación no sustituye el diagnóstico ni la consulta de un profesional médico. 
        Utiliza la información como referencia.
      </Text>
    </View>
  );
}