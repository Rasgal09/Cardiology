import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { s } from './Login.styles';
import { Colors } from '@/app/constants/Colors';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
};

export default function Input({
  placeholder, value, onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      style={[s.input, isFocused && s.inputFocused]}
      placeholder={placeholder}
      placeholderTextColor={Colors.darkGray}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}