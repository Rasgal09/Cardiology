import { StyleSheet } from "react-native";
import { Colors } from "@/app/constants/Colors";

export const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: "center" },
  content: { paddingHorizontal: 24 },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },

  welcomeText: {
    fontSize: 24, fontWeight: "700", color: Colors.text,
    marginBottom: 12, letterSpacing: -0.5, textAlign: "center",
  },
  subtitleText: {
    fontSize: 16, color: Colors.darkGray, fontWeight: "400",
    textAlign: "center", lineHeight: 24,
  },

  buttonContainer: { marginTop: 32, width: "100%" },

  // icono de estado
  iconContainer: {
    width: 72, height: 72, borderRadius: 36,
    justifyContent: "center", alignItems: "center", marginBottom: 24,
  },
  iconText: { color: Colors.white, fontSize: 32, fontWeight: "bold" },
});