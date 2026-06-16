import { useCameraStore } from "@/src/stores/useCameraStore";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);
  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();

    if (!photo) return;
    useCameraStore.setState({ photoUri: photo.uri });
    router.push("/screens/cameraImagePreview");
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.centeredScreen}>
        <Text style={styles.statusText}>Checking camera permissions...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.centeredScreen}>
        <Text style={styles.permissionTitle}>Camera access required</Text>
        <Text style={styles.permissionSubtitle}>
          Please grant camera permission to capture documents.
        </Text>
        <Pressable style={styles.primaryButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Capture Document</Text>
        <Text style={styles.headerSubtitle}>
          Tap the shutter button to scan and save receipts, invoices, or notes.
        </Text>
      </View>

      <View style={styles.cameraWrapper}>
        <CameraView style={styles.cameraView} facing="back" ref={cameraRef} />
      </View>

      <View style={styles.actionContainer}>
        <Pressable style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureInner} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  centeredScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 24,
  },
  statusText: {
    color: "#374151",
    fontSize: 16,
    textAlign: "center",
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
  },
  permissionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: "#1d4ed8",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#6b7280",
    lineHeight: 22,
  },
  cameraWrapper: {
    marginHorizontal: 24,
    borderRadius: 20,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cameraView: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  viewfinder: {
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 20,
  },
  actionContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  captureInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2563eb",
  },
  captureLabel: {
    marginTop: 12,
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
});

export default CameraScreen;
