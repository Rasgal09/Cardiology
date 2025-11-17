import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Colors } from '@/app/constants/Colors';
import { s } from './Care.styles';

type IconProps = { size?: number; color?: string; strokeWidth?: number; style?: any };
type IconType = React.ComponentType<IconProps>;

export default function CareOptionCard({
  title, description, icon: Icon, onPress,
}: { title: string; description: string; icon: IconType; onPress: () => void }) {
  return (
    <TouchableOpacity style={s.optionCard} onPress={onPress} activeOpacity={0.7}>
      <View style={s.optionHeader}>
        <Icon size={24} color={Colors.primary} strokeWidth={2.5} style={{ marginRight: 15 }} />
        <View style={s.optionContent}>
          <Text style={s.optionTitle}>{title}</Text>
          <Text style={s.optionDescription}>{description}</Text>
        </View>
        <ChevronRight size={20} color={'#999'} style={s.optionArrow} />
      </View>
    </TouchableOpacity>
  );
}