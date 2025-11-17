import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Alert, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "@/app/components/Navbar";
import { getToken } from "@/app/lib/auth";
import styles from "@/app/components/tabs/Scanner/Scanner.styles";
import ScannerHeader from "@/app/components/tabs/Scanner/ScannerHeader";
import LogoStatus from "@/app/components/tabs/Scanner/LogoStatus";
import ActionButton from "@/app/components/tabs/Scanner/ActionButton";
import FileUploadSection from "@/app/components/tabs/Scanner/FileUploadSection";
import StatusCard from "@/app/components/tabs/Scanner/StatusCard";
import { HeartPulse } from "lucide-react-native";

export default function ScannerScreen() {
  const [isScanning, setIsScanning] = React.useState(false);
  const [bluetoothConnected, setBluetoothConnected] = React.useState(false);
  const [file, setFile] = React.useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const handleStartScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const handlePickDocument = async () => {
    if (isAnalyzing) return;
    setFile(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["audio/wav", "audio/x-wav", "audio/wave"],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets?.length) setFile(result.assets[0]);
    } catch (err) {
      console.error("Error al seleccionar el documento:", err);
    }
  };

  const handleCancelUpload = () => {
    setFile(null);
    setIsAnalyzing(false);
  };

  const uploadFile = async (fileAsset: DocumentPicker.DocumentPickerAsset, mode: "Reposo" | "Actividad") => {
    const backendUrl = process.env.EXPO_PUBLIC_URL_BACK;
    if (!backendUrl) throw new Error("La URL del servidor (EXPO_PUBLIC_URL_BACK) no está configurada.");
    const url = `${backendUrl}/analysis/upload_wav`;
    const formData = new FormData();

    if (Platform.OS === "web") {
      try {
        const fileResp = await fetch(fileAsset.uri);
        const blob = await fileResp.blob();
        formData.append("file", blob, fileAsset.name || "upload.wav");
      } catch {
        // @ts-ignore
        formData.append("file", fileAsset as any);
      }
    } else {
      formData.append("file", {
        uri: fileAsset.uri,
        name: fileAsset.name || "upload.wav",
        type: fileAsset.mimeType || "audio/wav",
      } as any);
    }

    formData.append("mode", mode);

    const options: any = { method: "POST", body: formData };
    if (Platform.OS === "web") options.credentials = "include";

    if (Platform.OS !== "web") {
      try {
        const token = await getToken();
        if (token) options.headers = { Authorization: `Bearer ${token}` };
      } catch (err) {
        console.warn("No se pudo obtener el token para la subida:", err);
      }
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Error desconocido del servidor" }));
      throw new Error(errorData.message || "No se pudo subir el archivo");
    }
    return response.json();
  };

  const handleStartAnalysis = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const result = await uploadFile(file, "Reposo");
      console.log("Análisis completado:", result);
      Alert.alert("Éxito", "El archivo ha sido analizado correctamente.");
    } catch (error) {
      console.error("Error en el análisis:", error);
      Alert.alert("Error", error instanceof Error ? error.message : "No se pudo completar el análisis.");
    } finally {
      setIsAnalyzing(false);
      setFile(null);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScannerHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Tarjeta principal */}
        <View style={styles.scannerCard}>
          <Text style={styles.scannerCardTitle}>Configuración de Escaneo</Text>

          <LogoStatus isScanning={isScanning} />

          {/* Controles */}
          <ActionButton
            onPress={handleStartScan}
            text={isScanning ? "CANCELAR ESCANEO" : "INICIAR MEDICIÓN"}
            icon={HeartPulse}
            disabled={isScanning || !bluetoothConnected}
          />

          {!bluetoothConnected && (
            <Text style={styles.bluetoothWarning}>
              Conecta el dispositivo vía Bluetooth para poder iniciar la medición.
            </Text>
          )}

          <FileUploadSection
            file={file}
            isAnalyzing={isAnalyzing}
            onPick={handlePickDocument}
            onCancel={handleCancelUpload}
            onAnalyze={handleStartAnalysis}
          />
        </View>

        {/* Estado del dispositivo */}
        <StatusCard bluetoothConnected={bluetoothConnected} />

        {/* BLE connector (mantiene callbacks de estado) */}
      </ScrollView>

      <Navbar />
    </SafeAreaView>
  );
}
