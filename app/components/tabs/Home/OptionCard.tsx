import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { Colors } from "@/app/constants/Colors";
import { s } from "./Home.styles";

type IconProps = { size?: number; color?: string; strokeWidth?: number; style?: any };
type IconType = React.ComponentType<IconProps>;

export default function OptionCard({
  title, icon: Icon, onPress,
}: { title: string; icon: IconType; onPress: () => void }) {
  return (
    <TouchableOpacity style={s.cardSecondary} onPress={onPress} activeOpacity={0.7}>
      <View style={s.cardSecondaryContent}>
        <View style={s.iconContainer}>
          <Icon size={26} color={Colors.primary} strokeWidth={2.5} />
        </View>
        <View style={s.cardSecondaryTextContainer}>
          <Text style={s.cardSecondaryTitle}>{title}</Text>
        </View>
        <ChevronRight size={22} color="#999" strokeWidth={2.5} />
      </View>
    </TouchableOpacity>
  );
}