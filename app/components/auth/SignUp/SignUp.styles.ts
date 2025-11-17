import { StyleSheet } from "react-native";
import { Colors } from "@/app/constants/Colors";

export const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },

  headerSection: { alignItems: "center", marginBottom: 48 },
  welcomeText: {
    fontSize: 28, fontWeight: "700", color: Colors.text, marginBottom: 8,
    letterSpacing: -0.5, textAlign: "center",
  },
  subtitleText: { fontSize: 15, color: Colors.darkGray, fontWeight: "400", textAlign: "center" },

  formSection: { flex: 1 },
  formCard: {
    backgroundColor: Colors.white, borderRadius: 20, padding: 24,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06,
    shadowRadius: 8, elevation: 3,
  },

  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: "600", color: Colors.text, marginBottom: 8, letterSpacing: 0.2 },
  input: {
    backgroundColor: Colors.white, borderWidth: 1.5, borderColor: "#D1D9E6", borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: Colors.text, fontWeight: "400",
  },
  inputFocused: { borderColor: Colors.primary, borderWidth: 2 },
  inputError: { borderColor: Colors.error, borderWidth: 2 },
  errorText: { color: Colors.error, fontSize: 12, marginTop: 5 },

  buttonContainer: { marginTop: 4 },
  button: {
    backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24,
    alignItems: "center", justifyContent: "center", shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: "700", letterSpacing: 0.5 },

  loginLinkContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 24 },
  loginLinkText: { fontSize: 15, color: Colors.darkGray, fontWeight: "400" },
  loginLink: { fontSize: 15, color: Colors.primary, fontWeight: "700" },

  termsRow: { flexDirection: "row", alignItems: "center", marginTop: 4, marginBottom: 8 },
  checkbox: {
    width: 20, height: 20, borderWidth: 2, borderColor: "#D1D9E6", borderRadius: 4,
    marginRight: 12, justifyContent: "center", alignItems: "center",
  },
  checkboxActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkboxCheck: { color: Colors.white, fontWeight: "bold", fontSize: 12 },
  termsText: { fontSize: 13, color: Colors.darkGray, lineHeight: 18, flex: 1 },
  termsLink: { color: Colors.primary, fontWeight: "600" },
});