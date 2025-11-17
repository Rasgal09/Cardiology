import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Settings } from "lucide-react-native";
import { s } from "./Home.styles";
import { Colors } from "@/app/constants/Colors";

export default function HomeHeader({ dateLabel, userName, onSettings }: {
  dateLabel: string;
  userName: string;
  onSettings: () => void;
}) {
  return (
    <View style={s.header}>
      <View style={s.headerTextGroup}>
        <Text style={s.headerSubtitle}>Hoy es {dateLabel}</Text>
        <Text style={s.headerTitleImproved}>Hola, {userName} 👋</Text>
      </View>

      <TouchableOpacity style={s.settingsButtonImproved} onPress={onSettings} activeOpacity={0.7}>
        <Settings size={22} color={Colors.darkGray} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}