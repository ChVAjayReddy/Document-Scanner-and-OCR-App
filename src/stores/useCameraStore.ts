import { create } from "zustand";
type CameraStore = {
  photoUri: string;
};
export const useCameraStore = create<CameraStore>((set) => ({
  photoUri: "",
}));
