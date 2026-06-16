import { useAuthStore } from "@/src/stores/useAuthStore";
import { router } from "expo-router";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DisplayDocuments from "../components/displayDocuments";
import DocmentsInfo from "../components/documentsInfo";
const Home = () => {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  async function handleLogout() {
    await logout();
    router.replace("/(auth)/Login");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 15,
      }}
    >
      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Hello, Ajay
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
            <Image
              source={require("../../assets/images/account.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            ></Image>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 18,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginTop: 20,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 5,
          }}
        >
          <Image
            source={require("../../assets/images/search-interface-symbol.png")}
            style={{
              width: 20,
              height: 20,
              tintColor: "#64748b",
              marginRight: 12,
            }}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Search documents..."
            placeholderTextColor="#94a3b8"
            style={{
              flex: 1,
              fontSize: 16,
              color: "#0f172a",
              paddingVertical: 8,
            }}
            clearButtonMode="while-editing"
          />
        </View>
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

        {/* <Pressable onPress={handleLogout}>
          <Text
            style={{ backgroundColor: "lightcoral", padding: 10, margin: 10 }}
          >
            Logout
          </Text>
        </Pressable> */}

        <DocmentsInfo />
        <DisplayDocuments />
        {/* <Pressable onPress={() => router.push("/screens/testScreen")}>
          <Text
            style={{ backgroundColor: "lightgreen", padding: 10, margin: 10 }}
          >
            see the db
          </Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

export default Home;
