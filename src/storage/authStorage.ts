import AsyncStorage from "@react-native-async-storage/async-storage";
export const authStorage = {
  setToken: async (token: string) => {
    await AsyncStorage.setItem("token", token);
  },

  deleteToken: async () => {
    await AsyncStorage.removeItem("token");
  },
  getToken: async () => {
    const data = await AsyncStorage.getItem("token");
    return data;
  },
};
