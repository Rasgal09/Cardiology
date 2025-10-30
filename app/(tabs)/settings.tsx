// React, React Native y Expo
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Funciones y hooks
import { useAuth } from '../context/AuthContext';

// Estilos y constantes
import { Colors } from '../constants/Colors';

// Librerías
import { 
    ArrowLeft, LogOut, Mail, Lock, Bell, CheckCircle, 
    Share2, Info, ChevronRight 
} from 'lucide-react-native';

// --- Componente de Ítem de Configuración ---
const SettingItem = ({ title, icon: IconComponent, onPress, isLast = false }: any) => (
    <TouchableOpacity style={[styles.settingItem, isLast && styles.settingItemLast]} onPress={onPress}>
        <View style={styles.settingIconTextGroup}>
            <IconComponent size={20} color={Colors.darkGray} />
            <Text style={styles.settingItemText}>{title}</Text>
        </View>
        <ChevronRight size={18} color={Colors.darkGray} />
    </TouchableOpacity>
);

// --- COMPONENTE PRINCIPAL ---
export default function SettingsScreen() {
    const router = useRouter();
    const { logout } = useAuth();

    // ------------------------------------------
    // FUNCIONES DE MANEJO DE DATOS (PREPARADAS)
    // ------------------------------------------

    const handleUpdateProfile = (setting: string) => {
        // COMENTARIO: En una aplicación real, aquí se abriría un modal o una nueva pantalla 
        // con un formulario para que el usuario ingrese la nueva información (ej. nuevo email).
        
        // El botón 'Guardar' dentro de ese formulario llamaría a la API:
        
        // EJEMPLO DE LÓGICA (Aún no funcional):
        // try {
        //    await database.users.update(setting, newValue); // ⬅️ LÓGICA DE BASE DE DATOS / BACKEND
        //    Alert.alert("Éxito", `${setting} actualizado correctamente.`);
        // } catch (error) {
        //    Alert.alert("Error", "No se pudo actualizar la información.");
        // }
        Alert.alert('Funcionalidad Pendiente', `Abrir formulario para ${setting}.`);
    };

    const handleLogout = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que quieres cerrar la sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar Sesión',
                    onPress: async () => {
                        await logout();
                        router.replace('/(auth)/Login');
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    // ------------------------------------------
    // RENDERIZADO
    // ------------------------------------------

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.text} strokeWidth={2.5} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ajustes y Configuración</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* --- SECCIÓN 1: CUENTA DE USUARIO --- */}
                <Text style={styles.sectionTitle}>Cuenta</Text>
                <View style={styles.card}>
                    <SettingItem 
                        title="Cambiar Correo Electrónico" 
                        icon={Mail} 
                        onPress={() => handleUpdateProfile('Correo')}
                    />
                    <SettingItem 
                        title="Cambiar Contraseña" 
                        icon={Lock} 
                        onPress={() => handleUpdateProfile('Contraseña')}
                        isLast={true} // Marca el último ítem para no tener separador
                    />
                </View>

                {/* --- SECCIÓN 2: PREFERENCIAS DE LA APP --- */}
                <Text style={styles.sectionTitle}>Preferencias</Text>
                <View style={styles.card}>
                    <SettingItem 
                        title="Notificaciones" 
                        icon={Bell} 
                        onPress={() => handleUpdateProfile('Notificaciones')}
                    />
                    <SettingItem 
                        title="Permisos de Dispositivo" 
                        icon={CheckCircle} 
                        onPress={() => handleUpdateProfile('Permisos')}
                        isLast={true}
                    />
                </View>

                {/* --- SECCIÓN 3: ACERCA DE --- */}
                <Text style={styles.sectionTitle}>Acerca de</Text>
                <View style={styles.card}>
                    <SettingItem 
                        title="Compartir Aplicación" 
                        icon={Share2} 
                        onPress={() => Alert.alert('Compartir', '¡Comparte esta app con tus amigos!')}
                    />
                    <SettingItem 
                        title="Información Legal" 
                        icon={Info} 
                        onPress={() => Alert.alert('Información', 'Términos y Condiciones / Política de Privacidad')}
                        isLast={true}
                    />
                </View>

                {/* --- BOTÓN DE CIERRE DE SESIÓN --- */}
                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={handleLogout}
                    activeOpacity={0.8}
                >
                    <LogOut size={22} color={Colors.white} style={styles.logoutIcon} />
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>

            </ScrollView>
            {/* COMENTARIO: La Navbar no siempre se muestra en la pantalla de Configuración. 
               Si quieres ocultarla, simplemente no la renderices aquí. */}
            {/* <Navbar /> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    // --- HEADER ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text,
        marginLeft: 15,
    },
    // --- SCROLL CONTENT ---
    scrollContent: {
        padding: 20,
        paddingBottom: 40, // Espacio al final del scroll
    },
    // --- SECCIONES Y TARJETAS ---
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.darkGray,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 5,
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    // --- ÍTEMS DE CONFIGURACIÓN ---
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingItemLast: {
        borderBottomWidth: 0,
    },
    settingIconTextGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    settingItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
    },
    // --- BOTÓN DE LOGOUT ---
    logoutButton: {
        backgroundColor: Colors.primaryDark,
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    logoutIcon: {
        marginRight: 10,
    },
    logoutButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
});