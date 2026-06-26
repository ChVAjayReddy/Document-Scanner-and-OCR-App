import { useAuthStore } from "@/src/stores/useAuthStore";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useAuth0 } from "react-native-auth0";
function Header() {
  const { clearSession } = useAuth0();
  const userDetails = useAuthStore((state) => state.userDetails);
  const logout = async () => {
    try {
      await clearSession();
      router.replace("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <View style={{ display: "flex", flexDirection: "column" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Hello, {userDetails?.name?.split("@")[0]}
        </Text>
        <Text>Welcome to ScanVault</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          marginLeft: "auto",
          justifyContent: "center",
        }}
      >
        <Pressable onPress={logout}>
          <Image
            source={{ uri: userDetails?.picture }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
            resizeMode="contain"
          ></Image>
        </Pressable>
      </View>
    </View>
  );
}
export default Header;
