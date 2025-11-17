import { StyleSheet } from 'react-native';
import { Colors } from '@/app/constants/Colors';

export const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#333' },

  // Scroll
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  // Main card (wrapper con sombra + gradient dentro)
  mainCardWrapper: {
    borderRadius: 15, marginBottom: 25, overflow: 'hidden',
    shadowColor: Colors.primaryDark, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 8, elevation: 8,
  },
  mainCardGradient: { padding: 25 },
  mainCardIcon: { marginBottom: 10 },
  mainCardTitle: { fontSize: 18, fontWeight: '800', color: Colors.white, marginBottom: 6 },
  mainCardText: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.95)', lineHeight: 20 },

  // Options
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 15 },
  optionsContainer: { gap: 12 },
  optionCard: {
    backgroundColor: Colors.white, borderRadius: 15, padding: 18,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 5,
  },
  optionHeader: { flexDirection: 'row', alignItems: 'center' },
  optionContent: { flex: 1 },
  optionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 3 },
  optionDescription: { fontSize: 13, color: '#666', lineHeight: 18 },
  optionArrow: { marginLeft: 15 },
});