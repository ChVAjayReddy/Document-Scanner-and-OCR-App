import { Stack } from "expo-router";
import { Auth0Provider } from "react-native-auth0";

export default function RootLayout() {
  return (
    <Auth0Provider
      domain={"dev-mx4otlbmkij2d82s.us.auth0.com"}
      clientId={"WY60KcIoM3vQVHoHSPIJZrKYBnEKha24"}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </Auth0Provider>
  );
}
