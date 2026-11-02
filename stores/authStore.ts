import { create } from "zustand";
import { supabase } from "@/services/supabase";
import type { Session } from "@supabase/supabase-js";
import type { UserProfile } from "@/types";

type AuthState = {
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isPasswordRecovery: boolean;
  initialize: () => Promise<void>;
  setSession: (session: Session | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setPasswordRecovery: (value: boolean) => void;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  profile: null,
  isLoading: true,
  isPasswordRecovery: false,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ session });

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, avatar_url, university, degree, majors, age, academic_year, gpa_ranking, active_courses, bio, interests, is_verified, created_at")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          set({
            profile: {
              id: profile.id,
              firstName: profile.first_name,
              lastName: profile.last_name,
              email: session.user.email,
              age: profile.age ?? 0,
              avatarUrl: profile.avatar_url ?? "",
              university: profile.university,
              degree: profile.degree,
              majors: profile.majors ?? [],
              academicYear: profile.academic_year,
              gpaRanking: profile.gpa_ranking,
              activeCourses: profile.active_courses ?? [],
              bio: profile.bio ?? "",
              interests: profile.interests ?? [],
              isVerified: profile.is_verified ?? false,
              isOnline: true,
              createdAt: profile.created_at,
            },
          });
        }
      }
    } catch {
      // Session expired or network error — user will be sent to login
    } finally {
      set({ isLoading: false });
    }

    // Subscribe to auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      set({ session });
      if (event === "PASSWORD_RECOVERY") {
        set({ isPasswordRecovery: true });
      }
      if (!session) {
        set({ profile: null, isPasswordRecovery: false });
      }
    });
  },

  setSession: (session) => set({ session }),

  setProfile: (profile) => set({ profile }),

  setPasswordRecovery: (value) => set({ isPasswordRecovery: value }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, profile: null, isPasswordRecovery: false });
  },
}));
