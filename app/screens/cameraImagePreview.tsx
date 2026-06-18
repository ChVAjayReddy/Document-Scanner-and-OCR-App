import { addDocument } from "@/src/database/documentRepository";
import { performOCR } from "@/src/services/ocrService";
import { useCameraStore } from "@/src/stores/useCameraStore";
import { useDocumentStore } from "@/src/stores/useDocumentStore";
import { AntDesign } from "@expo/vector-icons";
import { File, Paths } from "expo-file-system";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const ImagePreview = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      addDocument(title, description, file.uri);
      loadDocuments();
      router.replace("/(app)/Home");
      performOCR(file.uri);
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
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="check" size={20} color="#ffffff" />
          <Text style={[styles.actionText, styles.confirmText]}>Save</Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Required for Android back button
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Save Document</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.modalClose}
              >
                <AntDesign name="close" size={18} color="#6b7280" />
              </Pressable>
            </View>
            <Text style={styles.modalDescription}>
              Add a title and description before adding this scan to your
              library.
            </Text>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              placeholder="Document title"
              placeholderTextColor="#9ca3af"
              style={styles.modalInput}
              value={title}
              onChangeText={setTitle}
            />
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              placeholder="Add a short description"
              placeholderTextColor="#9ca3af"
              style={[styles.modalInput, styles.modalTextarea]}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalActionButton, styles.modalCancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalActionText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalActionButton, styles.modalConfirmButton]}
                onPress={handleSave}
              >
                <Text style={[styles.modalActionText, styles.modalConfirmText]}>
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.66)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 440,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 16,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  modalClose: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
  modalDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalInput: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    marginBottom: 18,
  },
  modalTextarea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inputLabel: {
    color: "#4b5563",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  modalActionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCancelButton: {
    marginRight: 12,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  modalConfirmButton: {
    backgroundColor: "#2563eb",
    shadowColor: "#2563eb",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  modalActionText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  modalConfirmText: {
    color: "#ffffff",
  },
});

export default ImagePreview;
