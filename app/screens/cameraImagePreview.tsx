import { addDocument } from "@/src/database/documentRepository";
import { performOCR } from "@/src/services/ocrService";
import { useCameraStore } from "@/src/stores/useCameraStore";
import { useDocumentStore } from "@/src/stores/useDocumentStore";
import { AntDesign } from "@expo/vector-icons";
import { File, Paths } from "expo-file-system";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ImagePreview = () => {
  const photoUri = useCameraStore((state) => state.photoUri);
  const loadDocuments = useDocumentStore((state) => state.loadDocuments);
  function handleDiscard() {
    const file = new File(Paths.cache, photoUri.split("cache/")[1]);
    file.delete();
    router.replace("/screens/CameraScreen");
  }
  function handleSave() {
    try {
      const file = new File(Paths.cache, photoUri.split("cache/")[1]);
      file.move(Paths.document);
      addDocument("Invoice", "ElectricyBill", file.uri);
      console.log(file.uri);
      performOCR(file.uri);
      loadDocuments();
      router.replace("/(app)/Home");
    } catch (error) {
      console.error("Error saving photo:", error);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Preview Capture</Text>
        <Text style={styles.headerSubtitle}>
          Review the scan before saving it to your document library.
        </Text>
      </View>

      <View style={styles.card}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholder}>
            <AntDesign name="picture" size={40} color="#9ca3af" />
            <Text style={styles.placeholderText}>No image available</Text>
          </View>
        )}
      </View>

      <View style={styles.actionRow}>
        <Pressable
          style={[styles.actionButton, styles.cancelButton]}
          onPress={handleDiscard}
        >
          <AntDesign name="close" size={20} color="#ef4444" />
          <Text style={[styles.actionText, styles.cancelText]}>Discard</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.confirmButton]}
          onPress={handleSave}
        >
          <AntDesign name="check" size={20} color="#ffffff" />
          <Text style={[styles.actionText, styles.confirmText]}>Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  previewImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    backgroundColor: "#f3f4f6",
  },
  placeholder: {
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f3f4f6",
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cancelButton: {
    marginRight: 12,
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
  },
  confirmButton: {
    backgroundColor: "#2563eb",
  },
  actionText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
  },
  cancelText: {
    color: "#111827",
  },
  confirmText: {
    color: "#ffffff",
  },
});

export default ImagePreview;
