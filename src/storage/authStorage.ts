import { storage } from "./mmkv";
export const authStorage = {
  setToken: (token: string) => {
    storage.set("token", token);
  },

  deleteToken: () => {
    storage.remove("token");
  },
  getToken: () => {
    return storage.getString("token");
  },
};
