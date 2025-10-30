import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, PhoneOff, LucideIcon } from 'lucide-react-native'; // Asegúrate de importar LucideIcon si es necesario
import { Colors } from '../constants/Colors';
import { Audio } from 'expo-av';

// 🌟 1. IMPORTAR EL ARCHIVO DE AUDIO 🌟
// Asegúrate de que esta ruta sea correcta para tu proyecto
const CALL_SOUND = require('../../assets/audio/llamadodeemergencia.mp3'); 

export default function EmergenciaScreen() {
    const router = useRouter();

    // 👇 FUNCIÓN DE LLAMADA MODIFICADA
    async function makeEmergencyCall() {
        
        // 🌟 ¡CAMBIO IMPORTANTE PARA PRUEBAS! 🌟
        // El número que se marcará en el teléfono.
        const numberToCall = '9612367031'; 
        
        // El número que ve el usuario sigue siendo '911' en la UI.
        
        const url = `tel:${numberToCall}`;

        try {
            // Verifica si el dispositivo puede manejar esta URL
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Abre el marcador del teléfono con el NÚMERO DE PRUEBA
                await Linking.openURL(url);
            } else {
                Alert.alert(
                    'Error',
                    'No se puede realizar esta llamada. Tu dispositivo no lo permite.'
                );
            }
        } catch (error) {
            console.error('Error al intentar llamar:', error);
            Alert.alert('Error', 'Ocurrió un error al intentar iniciar la llamada.');
        }
    }

    // El estado 'isCalling' y 'sound' ya no son necesarios

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <ArrowLeft size={28} color={Colors.white} strokeWidth={2.5} />
            </TouchableOpacity>

            <View style={styles.content}>
            
            {/* ESTO SIGUE MOSTRANDO 911 */}
                <Text style={styles.emergencyNumber}>911</Text> 
                
                <Text style={styles.statusText}>
                    {'Pulsa para contactar'}
                </Text>

                <View style={styles.iconContainer}>
                    {/* El onPress ahora llama a la función de llamada real */}
                    <TouchableOpacity style={styles.iconCircle} onPress={makeEmergencyCall}>
                        <View style={[styles.innerCircle, { backgroundColor: Colors.primary }]}>
                            
                            {/* ESTO SIGUE MOSTRANDO "LLAMAR AL 911" */}
                            <Text style={styles.buttonLabel}>
                                {'LLAMAR AL 911'} 
                            </Text>
                            <View style={styles.iconWrapper}>
                                <Phone // Se usa el ícono de Teléfono
                                    size={60} 
                                    color={Colors.white}
                                    strokeWidth={2.5} 
                                />
                      _       </View>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.disclaimerText}>
                    {/* Puedes mantener este texto o ajustarlo para tus pruebas */}
                    *Al pulsar se abrirá el marcador de tu teléfono para llamar al 911.
                </Text>
            </View>
        </SafeAreaView>
    );
}

// ... (Los estilos 'styles' de abajo son exactamente los mismos)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    backButton: {
        marginBottom: 40,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emergencyNumber: {
        fontSize: 100,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 40,
    },
    statusText: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.white,
        textAlign: 'center',
        marginBottom: 8,
    },
    iconContainer: {
        marginTop: 60,
        marginBottom: 40,
    },
    iconCircle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    innerCircle: {
        width: '90%',
        height: '90%',
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        padding: 10,
    },
    iconWrapper: {
        marginTop: 10,
    },
    buttonLabel: {
        color: Colors.white,
        fontWeight: '800',
        fontSize: 12,
        letterSpacing: 1.5,
    },
    disclaimerText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
    }
});