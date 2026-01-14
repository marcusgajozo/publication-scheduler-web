import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
}

interface AuthActions {
  saveToken: (token: string) => void;
  deleteToken: () => void;
}

const INITIAL_STATE = {
  token: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,

        saveToken: (token) => set({ token }),
        deleteToken: () => set(INITIAL_STATE),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
