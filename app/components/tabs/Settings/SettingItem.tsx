import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Colors } from '@/app/constants/Colors';
import { s } from './Settings.styles';

type IconProps = { size?: number; color?: string; strokeWidth?: number };
type IconType = React.ComponentType<IconProps>;

export default function SettingItem({
  title, icon: Icon, onPress, isLast = false,
}: { title: string; icon: IconType; onPress: () => void; isLast?: boolean }) {
  return (
    <TouchableOpacity style={[s.settingItem, isLast && s.settingItemLast]} onPress={onPress} activeOpacity={0.7}>
      <View style={s.settingIconTextGroup}>
        <Icon size={20} color={Colors.darkGray} />
        <Text style={s.settingItemText}>{title}</Text>
      </View>
      <ChevronRight size={18} color={Colors.darkGray} />
    </TouchableOpacity>
  );
}