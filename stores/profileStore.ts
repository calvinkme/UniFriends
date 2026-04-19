import { create } from "zustand";
import type { UserProfile } from "@/types";
import { useAuthStore } from "./authStore";
import { CURRENT_USER } from "@/services/mockData";

type ProfileStore = {
  currentUser: UserProfile | null;
  loadProfile: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  currentUser: null,

  loadProfile: () => {
    // Try to get profile from auth store (real data), fall back to mock
    const authProfile = useAuthStore.getState().profile;
    set({ currentUser: authProfile ?? CURRENT_USER });
  },

  updateProfile: (updates) => {
    set((state) => ({
      currentUser: state.currentUser
        ? { ...state.currentUser, ...updates }
        : null,
    }));
  },
}));
