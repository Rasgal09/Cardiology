import { StyleSheet } from 'react-native';
import { Colors } from '@/app/constants/Colors';

export const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 15,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: '#EEE',
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: Colors.text, marginLeft: 15 },

  // Scroll
  scrollContent: { padding: 20, paddingBottom: 40 },

  // Sections & cards
  sectionTitle: {
    fontSize: 14, fontWeight: '700', color: Colors.darkGray,
    marginTop: 15, marginBottom: 10, marginLeft: 5, textTransform: 'uppercase',
  },
  card: {
    backgroundColor: Colors.white, borderRadius: 12, overflow: 'hidden', marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 3,
  },

  // Items
  settingItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  settingItemLast: { borderBottomWidth: 0 },
  settingIconTextGroup: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  settingItemText: { fontSize: 16, fontWeight: '500', color: Colors.text },

  // Logout
  logoutButton: {
    backgroundColor: Colors.primaryDark, borderRadius: 12, paddingVertical: 15,
    alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 10,
  },
  logoutIcon: { marginRight: 10 },
  logoutButtonText: { color: Colors.white, fontSize: 18, fontWeight: '700' },
});