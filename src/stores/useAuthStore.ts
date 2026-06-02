import { create } from "zustand";
import { authStorage } from "../storage/authStorage";
import { authState } from "../types/authState";
export const useAuthStore = create<authState>((set) => ({
  loading: false,
  token: null,
  isAuthenticated: false,
  login: async () => {
    await authStorage.setToken("Ajay123");
    set({ token: "Ajay123", isAuthenticated: true });
  },
  logout: async () => {
    await authStorage.deleteToken();
    set({ token: null, isAuthenticated: false });
  },
  initialize: async () => {
    set({ loading: true });
    const token = await authStorage.getToken();

    if (token) {
      set({ token, isAuthenticated: true });
    } else {
      set({ token: null, isAuthenticated: false });
    }
    set({ loading: false });
  },
}));
