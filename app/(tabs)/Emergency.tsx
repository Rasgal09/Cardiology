import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, PhoneCall } from 'lucide-react-native'; 

// --- PALETA DE COLORES PERSONALIZADA ---
export const Colors = {
    primary: '#F44336',     // Rojo principal (Urgencia)
    primaryDark: '#8E271F', // Rojo oscuro
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    darkGray: '#666666',
    text: '#333333',        // Texto principal oscuro
    textLight: '#FFFFFF',   // Texto sobre fondos oscuros
    background: '#FFFFFF',  // Fondo principal (Claro)
    border: '#E0E0E0',
};

export default function EmergenciaScreen() {
    const router = useRouter();

    async function makeEmergencyCall() {
        
        // ¡IMPORTANTE! Reemplaza este número de prueba por el número de emergencia real ('911', '112', etc.)
        const numberToCall = '9612367031'; 
        
        const url = `tel:${numberToCall}`;

        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(
                    'Error de Dispositivo',
                    'Tu dispositivo no soporta la función de llamada (tel:).'
                );
            }
        } catch (error) {
            console.error('Error al intentar llamar:', error);
            Alert.alert('Error', 'Ocurrió un error al intentar iniciar la llamada.');
        }
    }

    return (
        <SafeAreaView style={newStyles.container}>
            {/* --- CABECERA (Header) --- */}
            <View style={newStyles.header}>
                <TouchableOpacity style={newStyles.backButton} onPress={() => router.back()}>
                    {/* Flecha y texto en color oscuro sobre fondo claro */}
                    <ArrowLeft size={24} color={Colors.text} strokeWidth={2} />
                    <Text style={newStyles.headerTitle}>VOLVER</Text>
                </TouchableOpacity>
            </View>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <View style={newStyles.content}>
                
                <Text style={newStyles.emergencyNumber}>911</Text>
                
                <Text style={newStyles.statusText}>
                    Emergencia - Servicio de Asistencia Inmediata
                </Text>

                {/* --- BOTÓN DE LLAMADA CENTRAL --- */}
                <TouchableOpacity 
                    // Usamos el color principal de acción (rojo) para el borde y el fondo interno.
                    style={[newStyles.callButton, { borderColor: Colors.primary }]} 
                    onPress={makeEmergencyCall}
                    activeOpacity={0.8}
                >
                    <View style={[newStyles.innerButton, { backgroundColor: Colors.primary }]}>
                        <PhoneCall 
                            size={48} 
                            color={Colors.textLight} // Texto en blanco sobre el rojo
                            strokeWidth={2} 
                        />
                    </View>
                </TouchableOpacity>
                
                <Text style={newStyles.buttonLabel}>
                    LLAMAR AL 911
                </Text>

                {/* --- SEPARADOR DISCRETO --- */}
                <View style={newStyles.separator} />

                {/* --- ADVERTENCIA --- */}
                <Text style={newStyles.disclaimerText}>
                    Use esta función solo en caso de necesidad real.
                </Text>
            </View>
        </SafeAreaView>
    );
}

// --- ESTILOS MEJORADOS (Urgencia y Contraste) ---
const newStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background, // Fondo blanco para mayor contraste
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 50,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: Colors.text,
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500', 
    },
    content: {
        flex: 1,
        alignItems: 'center',
        // Centramos el contenido un poco más alto
        justifyContent: 'flex-start', 
        paddingTop: 80, 
        paddingHorizontal: 30,
    },
    emergencyNumber: {
        fontSize: 100,
        fontWeight: '200', // Más ligero para elegancia
        color: Colors.text,
        marginBottom: 10,
        letterSpacing: 4,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.darkGray, // Gris oscuro en lugar de atenuado
        textAlign: 'center',
        marginBottom: 70,
        textTransform: 'uppercase',
    },
    // Contenedor principal del botón con efecto de borde
    callButton: {
        width: 150, 
        height: 150, 
        borderRadius: 75,
        backgroundColor: Colors.white, // Fondo del círculo blanco
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5, // Borde más grueso
        shadowColor: Colors.primary, // Sombra roja para darle un toque de urgencia
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    // Contenedor interno que maneja el color de acción
    innerButton: {
        width: '90%',
        height: '90%',
        borderRadius: 67,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: Colors.text,
        fontWeight: '700', // Texto más fuerte para la etiqueta de acción
        fontSize: 15,
        letterSpacing: 1.5,
        marginTop: 25,
        marginBottom: 40,
        textTransform: 'uppercase',
    },
    separator: {
        width: '80%',
        height: 1,
        backgroundColor: Colors.border,
        marginBottom: 30,
    },
    disclaimerText: {
        fontSize: 13,
        lineHeight: 20,
        color: Colors.darkGray,
        textAlign: 'center',
        paddingHorizontal: 10,
        fontWeight: '500',
    }
});