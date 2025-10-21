import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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
    const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
    const [isCalling, setIsCalling] = useState(false);

    // FUNCIÓN PARA REPRODUCIR EL AUDIO
    async function playCallSound() {
        if (isCalling) {
            // Si ya está sonando, detenemos el audio (simulando colgar)
            sound?.stopAsync();
            setIsCalling(false);
            setSound(undefined);
            return;
        }

        setIsCalling(true);
        
        try {
            // Cargar y reproducir el audio
            const { sound } = await Audio.Sound.createAsync(CALL_SOUND);
            setSound(sound);
            
            await sound.playAsync();

            // Agregar un listener para resetear el estado cuando termine
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsCalling(false);
                    setSound(undefined);
                    sound.unloadAsync(); 
                }
            });

        } catch (error) {
            console.error('Error al reproducir el audio:', error);
            Alert.alert('Error de Audio', 'No se pudo reproducir el audio de emergencia.');
            setIsCalling(false);
        }
    }

    // Limpieza: Descargar el audio cuando el componente se desmonte
    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    // 🌟 2. CORRECCIÓN: Renombrar la variable a Mayúscula 🌟
    const ButtonIcon: LucideIcon = isCalling ? PhoneOff : Phone;
    const buttonText = isCalling ? 'FINALIZAR LLAMADA' : 'LLAMAR AL 911';

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <ArrowLeft size={28} color={Colors.white} strokeWidth={2.5} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.emergencyNumber}>911</Text>
                
                <Text style={styles.statusText}>
                    {isCalling ? 'Llamando...' : 'Pulsa para contactar'}
                </Text>

                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.iconCircle} onPress={playCallSound}>
                        <View style={[styles.innerCircle, { backgroundColor: isCalling ? Colors.primaryDark : Colors.primary }]}>
                            <Text style={styles.buttonLabel}>
                                {buttonText}
                            </Text>
                            <View style={styles.iconWrapper}>
                                {/* 🌟 3. CORRECCIÓN: Usar la variable con Mayúscula 🌟 */}
                                <ButtonIcon 
                                    size={60} 
                                    color={Colors.white}
                                    strokeWidth={2.5} 
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.disclaimerText}>
                    *Esto es solo una simulación. No se realizará una llamada real.
                </Text>
            </View>
        </SafeAreaView>
    );
}

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