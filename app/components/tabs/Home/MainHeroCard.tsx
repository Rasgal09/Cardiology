import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HeartPulse } from "lucide-react-native";
import { Colors } from "@/app/constants/Colors";
import { s } from "./Home.styles";

export default function MainHeroCard({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={s.mainCard} onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.mainCardGradient}
      >
        <View style={s.mainCardIconContainer}>
          <HeartPulse size={48} color={Colors.white} strokeWidth={2.5} />
        </View>
        <Text style={s.mainCardTitle}>Comenzar{"\n"}Mediciones Hoy</Text>
        <Text style={s.mainCardSubtitle}>Toma tu pulso y presión arterial en segundos.</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}