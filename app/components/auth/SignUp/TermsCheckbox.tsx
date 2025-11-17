import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { s } from "./SignUp.styles";

export default function TermsCheckbox({
  checked, onToggle, errorText,
}: { checked: boolean; onToggle: () => void; errorText?: string }) {
  return (
    <>
      <View style={s.termsRow}>
        <TouchableOpacity style={[s.checkbox, checked && s.checkboxActive]} onPress={onToggle} activeOpacity={0.7}>
          {checked && <Text style={s.checkboxCheck}>✓</Text>}
        </TouchableOpacity>
        <Text style={s.termsText}>
          Acepto los <Text style={s.termsLink}>Términos y Condiciones</Text> y la{" "}
          <Text style={s.termsLink}>Política de Privacidad</Text>
        </Text>
      </View>
      {!!errorText && <Text style={[s.errorText, { marginBottom: 16 }]}>{errorText}</Text>}
    </>
  );
}