import authService from "@/src/services/authService";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
type loginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<loginForm>({ defaultValues: { email: "", password: "" } });
  async function onSubmit(data: loginForm) {
    const response = await authService.loginUser(data.email, data.password);
    await login(response.token);
    router.replace("/(app)/Home");
  }
  return (
    <View>
      <Text>Login Here</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="email...!"
            value={value}
            onChangeText={onChange}
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
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            secureTextEntry
            placeholder="password...!"
            value={value}
            onChangeText={onChange}
          />
        )}
        rules={{
          required: "password is required",
          minLength: { value: 8, message: "min 8 characters required" },
        }}
      ></Controller>
      {errors.email && <Text>{errors.email.message}</Text>}
      {errors.password && <Text>{errors.password.message}</Text>}
      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};
export default Login;
