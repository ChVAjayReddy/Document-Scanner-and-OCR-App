import { useAuthStore } from "@/src/stores/useAuthStore";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
const Home = () => {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  async function handleLogout() {
    await logout();
    router.replace("/(auth)/Login");
  }
  return (
    <View>
      <Text>Welcome to the Home Screen</Text>
      <Text>welcome {token}</Text>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;
