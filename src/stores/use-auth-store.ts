import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface LoginState {
  token: string | null;
}

interface LoginActions {
  signIn: (token: string) => void;
  logout: () => void;
}

const INITIAL_STATE = {
  token: null,
};

export const useAuthStore = create<LoginState & LoginActions>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,

        signIn: (token) => set({ token }),
        logout: () => set(INITIAL_STATE),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
