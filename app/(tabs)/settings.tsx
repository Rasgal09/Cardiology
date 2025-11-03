// SettingsScreen.tsx

// React, React Native y Expo
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Funciones y hooks
import { useAuth } from '../context/AuthContext';
// SIMULACIÓN de funciones de actualización (NO REALES)
import { loginWeb, loginMobile } from '../lib/auth'; // Usaremos estas funciones simuladas como base

// Componentes
import { UpdateFieldModal } from '../components/UpdateFieldModal'; // 🌟 Importamos el nuevo componente

// Estilos y constantes
import { Colors } from '../constants/Colors'; // Asumo que esta es la paleta original

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

    // 🌟 ESTADOS PARA EL MODAL DE ACTUALIZACIÓN 🌟
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'email' | 'password'>('email');

    // ------------------------------------------
    // FUNCIONES DE MANEJO DE DATOS
    // ------------------------------------------

    const openUpdateModal = (type: 'email' | 'password') => {
        setModalType(type);
        setModalVisible(true);
    };

    /**
     * Función que SIMULA la lógica de actualizar un campo.
     * En una app real, esta función llamaría a tu API de backend.
     * @param type 'email' o 'password'
     * @param value El nuevo valor a guardar
     * @returns Promise<boolean> - true si la actualización es exitosa.
     */
    const handleUpdateApi = async (type: 'email' | 'password', value: string): Promise<boolean> => {
        // SIMULACIÓN DE LLAMADA A API
        console.log(`Intentando actualizar ${type} a: ${value}`);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula un retraso de red
        
        // En una app real, aquí se enviarían la contraseña actual y el nuevo valor
        // al backend. Si el backend responde 200/204 y la contraseña es correcta, devuelve true.

        // Por ahora, siempre devolvemos true para que el flujo de UI funcione.
        return true; 
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
                        // 🌟 LLAMA A LA FUNCIÓN QUE ABRE EL MODAL 🌟
                        onPress={() => openUpdateModal('email')}
                    />
                    <SettingItem 
                        title="Cambiar Contraseña" 
                        icon={Lock} 
                        // 🌟 LLAMA A LA FUNCIÓN QUE ABRE EL MODAL 🌟
                        onPress={() => openUpdateModal('password')}
                        isLast={true}
                    />
                </View>

                {/* --- SECCIÓN 2: PREFERENCIAS DE LA APP --- */}
                <Text style={styles.sectionTitle}>Preferencias</Text>
                <View style={styles.card}>
                    <SettingItem 
                        title="Notificaciones" 
                        icon={Bell} 
                        onPress={() => Alert.alert('Funcionalidad Pendiente', 'Abrir ajustes de Notificaciones')}
                    />
                    <SettingItem 
                        title="Permisos de Dispositivo" 
                        icon={CheckCircle} 
                        onPress={() => Alert.alert('Funcionalidad Pendiente', 'Abrir ajustes de Permisos')}
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
            
            {/* 🌟 MODAL DE ACTUALIZACIÓN DE CAMPO 🌟 */}
            {isModalVisible && (
                <UpdateFieldModal 
                    fieldType={modalType}
                    onClose={() => setModalVisible(false)}
                    onUpdate={handleUpdateApi} // Lógica de API simulada
                />
            )}
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
        paddingBottom: 40, 
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