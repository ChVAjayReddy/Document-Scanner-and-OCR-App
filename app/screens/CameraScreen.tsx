import { addDocument } from "@/src/database/documentRepository";
import { CameraView, useCameraPermissions } from "expo-camera";
import { File, Paths } from "expo-file-system";
import { useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();

    if (!photo) return;
    console.log("Photo taken:", photo);
    try {
      const file = new File(Paths.cache, photo.uri.split("cache/")[1]);
      file.move(Paths.document);
      setPhotoUri(file.uri);
      console.log(file.uri, "photouri");
      addDocument("Invoice", "ElectricyBill", file.uri);
    } catch (error) {
      console.error("Error saving photo:", error);
    }
  };

  if (!permission) {
    return <Text>Checking permissions...</Text>;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>Camera permission is required</Text>

        <Pressable onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View>
      <CameraView
        style={{
          height: 500,
          width: "100%",
        }}
        facing="back"
        ref={cameraRef}
      />
      <Pressable onPress={takePicture}>
        <Text>Take Picture</Text>
      </Pressable>
      <Image
        source={{
          uri: "file:///data/user/0/host.exp.exponent/files/2c59d714-d6b8-42a0-9209-dfbfe1d9a82b.jpg",
        }}
        style={{ width: 200, height: 200 }}
      ></Image>
      <Image
        source={{
          uri: "file:///data/user/0/host.exp.exponent/files/65b96068-bcbc-4a82-a55e-8f81f9e6cdb6.jpg",
        }}
        style={{ width: 200, height: 200 }}
      ></Image>
      <Text>Ajay</Text>
      {photoUri && (
        <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}

export default CameraScreen;
