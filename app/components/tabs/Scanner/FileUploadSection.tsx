import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Loader, Play, Upload, X } from "lucide-react-native";
import ActionButton from "./ActionButton";
import { Colors } from "@/app/constants/Colors";
import styles from "./Scanner.styles";

export default function FileUploadSection({
  file, isAnalyzing, onPick, onCancel, onAnalyze,
}: {
  file: { name?: string } | null;
  isAnalyzing: boolean;
  onPick: () => void;
  onCancel: () => void;
  onAnalyze: () => void;
}) {
  return (
    <>
      <View style={styles.sectionSeparator} />
      <Text style={styles.sectionTitle}>O analizar un archivo existente</Text>

      <View style={styles.fileActionContainer}>
        {!file && !isAnalyzing && (
          <ActionButton onPress={onPick} text="SUBIR ARCHIVO .WAV" icon={Upload} disabled={isAnalyzing} />
        )}

        {file && !isAnalyzing && (
          <>
            <Text style={styles.fileNameText}>Archivo: {file.name}</Text>

            <View style={styles.analysisButtonContainer}>
              <TouchableOpacity style={[styles.smallButton, styles.smallButtonCancel]} onPress={onCancel}>
                <X size={20} color="#E53E3E" />
                <Text style={[styles.smallButtonText, styles.smallButtonTextCancel]}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.smallButton, styles.smallButtonAnalyze]} onPress={onAnalyze}>
                <Play size={20} color={Colors.primary} />
                <Text style={[styles.smallButtonText, styles.smallButtonTextAnalyze]}>Iniciar Análisis</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {isAnalyzing && (
          <View style={styles.analyzingContainer}>
            <Loader size={30} color={Colors.primary} style={styles.loaderIcon} />
            <Text style={styles.analyzingText}>Analizando...</Text>
          </View>
        )}
      </View>
    </>
  );
}