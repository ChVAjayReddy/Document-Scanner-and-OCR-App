import { create } from "zustand";
import { authStorage } from "../storage/authStorage";
import { authState } from "../types/authState";
export const authStore = create<authState>((set) => ({
  token: null,
  isAuthenticated: false,
  login: () => {
    authStorage.setToken("Ajay123");
    set({ token: authStorage.getToken(), isAuthenticated: true });
  },
  logout: () => {
    authStorage.deleteToken();
    set({ token: null, isAuthenticated: false });
  },
  initialize: () => {
    if (authStorage.getToken()) {
      set({ token: authStorage.getToken(), isAuthenticated: true });
    }
  },
}));
