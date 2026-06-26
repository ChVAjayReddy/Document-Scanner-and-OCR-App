import { router } from "expo-router";
import { Pressable, Text } from "react-native";
const ScanButton = () => {
  return (
    <Pressable
      onPress={() => router.push("/screens/CameraScreen")}
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        borderRadius: 18,
        paddingVertical: 16,
        paddingHorizontal: 24,
        marginTop: 20,
        marginBottom: 20,
        shadowColor: "#0f172a",
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        + Scan the Document
      </Text>
    </Pressable>
  );
};
export default ScanButton;
