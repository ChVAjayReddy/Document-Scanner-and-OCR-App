import { AxiosInstance, create, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores/useAuthStore";
const api: AxiosInstance = create({ timeout: 2000 });
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default api;
