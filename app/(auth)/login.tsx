import authService from "@/src/services/authService";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { SafeAreaView } from "react-native-safe-area-context";
type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { authorize } = useAuth0();
  // const login = useAuthStore((state) => state.login);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginForm>({ defaultValues: { email: "", password: "" } });

  async function onSubmit(data: LoginForm) {
    const response = await authService.loginUser(data.email, data.password);
    // await login(response.token);
    router.replace("/(app)/Home");
  }
  const login = async () => {
    try {
      await authorize({
        scope: "openid profile email",
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            padding: 20,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/6962598.png")}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            ></Image>
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: " #0F172A",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            {" "}
            ScanVault
          </Text>

          <Text
            style={{ fontSize: 16, color: " #0F172A", textAlign: "center" }}
          >
            Scan • Extract • Store
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: " #0F172A",
              marginVertical: 20,
              textAlign: "center",
            }}
          >
            Welcome Back! Glad to see you, again!
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 5,
                  backgroundColor: "#dfdfdf",
                  textAlign: "center",
                  height: 50,
                  borderColor: errors.email ? "red" : "#dfdfdf",
                }}
              />
            )}
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            }}
          ></Controller>
          <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
            {errors.email?.message}
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                secureTextEntry
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 5,
                  backgroundColor: "#dfdfdf",
                  textAlign: "center",
                  height: 50,
                  borderColor: errors.password ? "red" : "#dfdfdf",
                }}
              />
            )}
            rules={{
              required: "password is required",
              minLength: { value: 8, message: "min 8 characters required" },
            }}
          ></Controller>
          <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
            {errors.password?.message}
          </Text>

          <Pressable onPress={handleSubmit(onSubmit)}>
            <Text
              style={{
                borderWidth: 1,
                padding: 10,
                marginTop: 20,
                borderRadius: 5,
                backgroundColor: "#2563EB",
                textAlign: "center",
                color: "white",

                height: 50,
              }}
            >
              Sign In
            </Text>
          </Pressable>
          <Text style={{ marginTop: 30, textAlign: "center" }}>
            Or Sign In with
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "lightblue",
              }}
            >
              <Pressable onPress={login}>
                <Image
                  source={require("../../assets/images/Google_Favicon_2025.svg.png")}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                  onError={(e) =>
                    console.log("Image load error:", e.nativeEvent?.error)
                  }
                />
              </Pressable>
            </View>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "lightblue",
              }}
            >
              <Image
                source={require("../../assets/images/Facebook_f_logo_(2021).svg.png")}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
                onError={(e) =>
                  console.log("Image load error:", e.nativeEvent?.error)
                }
              />
            </View>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "lightblue",
              }}
            >
              <Image
                source={require("../../assets/images/Apple_logo_black.svg.png")}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
                onError={(e) =>
                  console.log("Image load error:", e.nativeEvent?.error)
                }
              />
            </View>
          </View>
        </View>
        <Text style={{ margin: 30, textAlign: "center" }}>
          Don`{""}t have an account?
          <Text style={{ color: "blue" }}>Sign Up</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default Login;
