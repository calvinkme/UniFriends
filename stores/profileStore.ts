import { create } from "zustand";
import type { UserProfile } from "@/types";
import { useAuthStore } from "./authStore";
import { CURRENT_USER } from "@/services/mockData";
import { USE_MOCK_DATA } from "@/constants/config";
import { supabase } from "@/services/supabase";

type ProfileStore = {
  currentUser: UserProfile | null;
  isSaving: boolean;
  loadProfile: () => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
};

function toDbColumns(updates: Partial<UserProfile>): Record<string, unknown> {
  const map: Record<string, unknown> = {};
  if (updates.firstName !== undefined) map.first_name = updates.firstName;
  if (updates.lastName !== undefined) map.last_name = updates.lastName;
  if (updates.avatarUrl !== undefined) map.avatar_url = updates.avatarUrl;
  if (updates.university !== undefined) map.university = updates.university;
  if (updates.degree !== undefined) map.degree = updates.degree;
  if (updates.majors !== undefined) map.majors = updates.majors;
  if (updates.age !== undefined) map.age = updates.age;
  if (updates.academicYear !== undefined) map.academic_year = updates.academicYear;
  if (updates.bio !== undefined) map.bio = updates.bio;
  if (updates.interests !== undefined) map.interests = updates.interests;
  if (updates.activeCourses !== undefined) map.active_courses = updates.activeCourses;
  if (updates.gpaRanking !== undefined) map.gpa_ranking = updates.gpaRanking;
  return map;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  currentUser: null,
  isSaving: false,

  loadProfile: () => {
    const authProfile = useAuthStore.getState().profile;
    set({ currentUser: authProfile ?? (USE_MOCK_DATA ? CURRENT_USER : null) });
  },

  updateProfile: async (updates) => {
    const userId = useAuthStore.getState().session?.user?.id;

    set((state) => ({
      currentUser: state.currentUser
        ? { ...state.currentUser, ...updates }
        : null,
    }));

    if (userId) {
      set({ isSaving: true });
      try {
        const dbUpdates = toDbColumns(updates);
        if (Object.keys(dbUpdates).length > 0) {
          const { error } = await supabase
            .from("profiles")
            .update(dbUpdates)
            .eq("id", userId);
          if (error) throw error;
        }
        useAuthStore.getState().setProfile(get().currentUser);
      } finally {
        set({ isSaving: false });
      }
    }
  },
}));
