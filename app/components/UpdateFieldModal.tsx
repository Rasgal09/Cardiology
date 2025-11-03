// components/UpdateFieldModal.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Alert } from 'react-native';
import { X } from 'lucide-react-native';

// Nota: Asumiendo que esta es la paleta global
const Colors = {
    primary: "#F44336",
    primaryDark: "#8E271F",
    background: "#F5F7FA",
    cardBackground: "#FFFFFF",
    inputBorder: "#D1D9E6",
    inputBorderFocused: "#F44336",
    textPrimary: "#1A1F36",
    textPlaceholder: "#9CA3AF",
    white: "#FFFFFF",
    error: "#F44336",
    textSecondary: "#6B7280",
};

// --- Componente de Entrada reutilizable (de tu login) ---
function Input({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = "default",
}: {
    placeholder: string
    value: string
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    keyboardType?: "default" | "email-address" | "numeric"
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput
            style={[modalStyles.input, isFocused && modalStyles.inputFocused]}
            placeholder={placeholder}
            placeholderTextColor={Colors.textPlaceholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
}

/**
 * Formulario genérico para actualizar email o contraseña.
 * @param {string} fieldType - 'email' o 'password'
 * @param {function} onClose - Función para cerrar el modal
 * @param {function} onUpdate - Función que simula la llamada a la API
 */
export function UpdateFieldModal({ fieldType, onClose, onUpdate }: { fieldType: 'email' | 'password', onClose: () => void, onUpdate: (type: 'email' | 'password', value: string) => Promise<boolean> }) {
    const [newValue, setNewValue] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const title = fieldType === 'email' ? 'Actualizar Correo' : 'Cambiar Contraseña';
    const placeholder = fieldType === 'email' ? 'Nuevo correo electrónico' : 'Nueva contraseña (mín. 8 caracteres)';

    const handleAction = async () => {
        if (!newValue || !currentPassword) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }

        setIsLoading(true);
        // Aquí iría la lógica REAL para validar la contraseña actual con el backend
        // y luego actualizar el campo (email o password).
        
        // SIMULACIÓN DE LLAMADA A API
        const success = await onUpdate(fieldType, newValue);
        setIsLoading(false);

        if (success) {
            Alert.alert('Éxito', `${title} actualizado correctamente.`);
            onClose();
        } else {
            Alert.alert('Error', `No se pudo actualizar ${title}. Verifica tu contraseña actual.`);
        }
    };

    return (
        <View style={modalStyles.overlay}>
            <View style={modalStyles.modalContainer}>
                <View style={modalStyles.header}>
                    <Text style={modalStyles.title}>{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <X size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                <View style={modalStyles.formGroup}>
                    {/* Campo a actualizar */}
                    <Text style={modalStyles.label}>{placeholder}</Text>
                    <Input
                        placeholder={placeholder}
                        value={newValue}
                        onChangeText={setNewValue}
                        secureTextEntry={fieldType === 'password'}
                        keyboardType={fieldType === 'email' ? 'email-address' : 'default'}
                    />
                </View>

                <View style={modalStyles.formGroup}>
                    {/* Contraseña actual (para confirmación de seguridad) */}
                    <Text style={modalStyles.label}>Contraseña actual (Requerida)</Text>
                    <Input
                        placeholder="Ingresa tu contraseña actual"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity 
                    style={[modalStyles.button, isLoading && { opacity: 0.6 }]} 
                    onPress={handleAction} 
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    <Text style={modalStyles.buttonText}>
                        {isLoading ? 'Cargando...' : 'Guardar Cambios'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const modalStyles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    modalContainer: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: Colors.cardBackground,
        borderRadius: 20,
        padding: 24,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.cardBackground,
        borderWidth: 1.5,
        borderColor: Colors.inputBorder,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: Colors.textPrimary,
        fontWeight: "400",
    },
    inputFocused: {
        borderColor: Colors.inputBorderFocused,
        borderWidth: 2,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 15,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
});