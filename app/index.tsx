import { useAuthStore } from "@/src/stores/useAuthStore";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialize = useAuthStore((state) => state.initialize);
  const loading = useAuthStore((state) => state.loading);
  useEffect(() => {
    const init = async () => {
      await initialize();
    };

    init();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace("/(auth)/login");
      } else {
        router.replace("/(auth)/signup");
      }
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
