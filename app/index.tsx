import { useAuthStore } from "@/src/stores/useAuthStore";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialize = useAuthStore((state) => state.initialize);
  const loading = useAuthStore((state) => state.loading);
  const hasInitialized = useAuthStore((state) => state.hasInitialized);
  useEffect(() => {
    const init = async () => {
      await initialize();
    };

    init();
  }, []);

  useEffect(() => {
    if (!loading && hasInitialized) {
      if (isAuthenticated) {
        router.replace("/(app)/Home");
      } else {
        router.replace("/(auth)/Login");
      }
    }
  }, [loading, isAuthenticated, hasInitialized]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
