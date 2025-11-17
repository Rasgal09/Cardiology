import { StyleSheet } from 'react-native';
import { Colors, shadow } from '@/app/theme/tokens';

export const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerWrap: { paddingHorizontal: 20, paddingTop: 10, marginBottom: 50 },
  content: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start',
    paddingTop: 80, paddingHorizontal: 30,
  },
  emergencyNumber: { fontSize: 100, fontWeight: '200', color: Colors.text, marginBottom: 10, letterSpacing: 4 },
  statusText: {
    fontSize: 16, fontWeight: '600', color: Colors.darkGray,
    textAlign: 'center', marginBottom: 70, textTransform: 'uppercase',
  },
  callButton: {
    width: 150, height: 150, borderRadius: 75, backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: Colors.primary, ...shadow.emergency,
  },
  innerButton: {
    width: '90%', height: '90%', borderRadius: 67, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  buttonLabel: { color: Colors.text, fontWeight: '700', fontSize: 15, letterSpacing: 1.5, marginTop: 25, marginBottom: 40, textTransform: 'uppercase' },
  separator: { width: '80%', height: 1, backgroundColor: Colors.border, marginBottom: 30 },
  disclaimer: { fontSize: 13, lineHeight: 20, color: Colors.darkGray, textAlign: 'center', paddingHorizontal: 10, fontWeight: '500' },
});