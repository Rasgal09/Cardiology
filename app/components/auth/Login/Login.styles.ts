import { StyleSheet } from 'react-native';
import { Colors } from '@/app/constants/Colors';

export const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },

  // header
  headerSection: { alignItems: 'center', marginBottom: 48 },
  logoContainer: { marginBottom: 32, alignItems: 'center' },
  welcomeText: {
    fontSize: 28, fontWeight: '700', color: Colors.text, marginBottom: 8, letterSpacing: -0.5, textAlign: 'center',
  },
  subtitleText: { fontSize: 15, color: Colors.darkGray, fontWeight: '400', textAlign: 'center' },

  // form
  formSection: { flex: 1 },
  formCard: {
    backgroundColor: Colors.white, borderRadius: 20, padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: 8, letterSpacing: 0.2 },

  // input
  input: {
    backgroundColor: Colors.white, borderWidth: 1.5, borderColor: '#D1D9E6',
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: Colors.text,
    fontWeight: '400',
  },
  inputFocused: { borderColor: Colors.primary, borderWidth: 2 },

  // misc
  forgotPasswordContainer: { alignItems: 'flex-end', marginTop: 4, marginBottom: 28 },
  forgotPasswordText: { fontSize: 14, color: Colors.primary, fontWeight: '600' },

  // button
  buttonContainer: { marginTop: 4 },
  button: {
    backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },

  // sign up
  signUpContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 28, marginBottom: 20 },
  signUpQuestion: { fontSize: 15, color: Colors.darkGray, fontWeight: '400' },
  signUpLink: { fontSize: 15, color: Colors.primary, fontWeight: '700' },
});