import { create } from "zustand";
import { authStorage } from "../storage/authStorage";
import { authState } from "../types/authState";
export const useAuthStore = create<authState>((set) => ({
  loading: false,
  hasInitialized: false,
  token: null,
  isAuthenticated: false,
  login: async (token: string) => {
    await authStorage.setToken(token);
    set({ token, isAuthenticated: true, hasInitialized: true });
  },
  logout: async () => {
    await authStorage.deleteToken();
    set({ token: null, isAuthenticated: false, hasInitialized: true });
  },
  initialize: async () => {
    set({ loading: true });
    const token = await authStorage.getToken();

    if (token) {
      set({ token, isAuthenticated: true, hasInitialized: true });
    } else {
      set({ token: null, isAuthenticated: false, hasInitialized: true });
    }
    set({ loading: false });
  },
}));
