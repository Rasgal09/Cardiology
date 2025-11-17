import { StyleSheet } from "react-native";
import { Colors } from "@/app/constants/Colors";

export const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },

  // Header
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 24, paddingVertical: 20, backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: "#F0F0F0",
  },
  headerTextGroup: { flexDirection: "column", alignItems: "flex-start" },
  headerSubtitle: { fontSize: 14, fontWeight: "400", color: "#666", marginBottom: 4 },
  headerTitleImproved: { fontSize: 26, fontWeight: "700", color: "#1A1A1A", letterSpacing: 0.3 },
  settingsButtonImproved: { padding: 8, backgroundColor: "#F5F5F5", borderRadius: 12 },

  // Scroll
  content: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20 },

  // Hero card
  mainCard: {
    borderRadius: 24, marginBottom: 32, overflow: "hidden",
    elevation: 12, shadowColor: Colors.primaryDark, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 12,
  },
  mainCardGradient: { padding: 32, minHeight: 220, justifyContent: "center" },
  mainCardIconContainer: { marginBottom: 16 },
  mainCardTitle: {
    fontSize: 32, fontWeight: "800", color: Colors.white, lineHeight: 38, letterSpacing: 0.5, marginBottom: 8,
  },
  mainCardSubtitle: {
    fontSize: 15, fontWeight: "500", color: "rgba(255,255,255,0.95)", letterSpacing: 0.3, lineHeight: 22,
  },

  // Section title
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#1A1A1A", marginBottom: 16, letterSpacing: 0.3 },

  // Option cards
  cardSecondary: {
    backgroundColor: Colors.white, borderRadius: 18, marginBottom: 14, overflow: "hidden",
    elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8,
    borderWidth: 1, borderColor: "#F0F0F0",
  },
  cardSecondaryContent: { flexDirection: "row", alignItems: "center", paddingVertical: 20, paddingHorizontal: 20 },
  iconContainer: {
    marginRight: 16, width: 48, height: 48, borderRadius: 14,
    backgroundColor: "rgba(244, 67, 54, 0.08)", alignItems: "center", justifyContent: "center",
  },
  cardSecondaryTextContainer: { flex: 1, justifyContent: "center" },
  cardSecondaryTitle: { fontSize: 17, fontWeight: "600", color: "#1A1A1A", letterSpacing: 0.2 },

  // Disclaimer
  disclaimerContainer: {
    flexDirection: "row", alignItems: "flex-start", padding: 15, borderRadius: 10,
    backgroundColor: "#FFFBE6", borderLeftWidth: 4, borderLeftColor: "#FFC107", marginTop: 20,
  },
  disclaimerIconContainer: { marginRight: 12, marginTop: 2 },
  disclaimerText: { flex: 1, fontSize: 12, color: "#666", marginLeft: 10, lineHeight: 18, textAlign: "left" },
});