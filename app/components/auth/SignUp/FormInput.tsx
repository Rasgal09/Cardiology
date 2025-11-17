import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { s } from "./SignUp.styles";
import { Colors } from "@/app/constants/Colors";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  error?: string;
};

export default function FormInput({
  label, placeholder, value, onChangeText,
  secureTextEntry = false, keyboardType = "default",
  autoCapitalize = "sentences", autoCorrect = true, error,
}: Props) {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;

  return (
    <View style={s.inputGroup}>
      <Text style={s.inputLabel}>{label}</Text>
      <TextInput
        style={[
          s.input,
          focused && s.inputFocused,
          hasError && s.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.darkGray}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {hasError && <Text style={s.errorText}>{error}</Text>}
    </View>
  );
}