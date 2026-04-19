import { create } from "zustand";

type OnboardingState = {
  firstName: string;
  lastName: string;
  university: string;
  degree: string;
  majors: string[];
  age: string;
  academicYear: 1 | 2 | 3 | 4 | null;
  interests: string[];
  bio: string;
  avatarUri: string | null;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setName: (firstName: string, lastName: string) => void;
  setAge: (age: string) => void;
  setUniversity: (university: string) => void;
  setDegree: (degree: string) => void;
  toggleMajor: (major: string) => void;
  clearMajors: () => void;
  setAcademicYear: (year: 1 | 2 | 3 | 4) => void;
  toggleInterest: (interest: string) => void;
  setBio: (bio: string) => void;
  setAvatarUri: (uri: string | null) => void;
  reset: () => void;
};

const initialState = {
  firstName: "",
  lastName: "",
  university: "",
  degree: "",
  majors: [] as string[],
  age: "",
  academicYear: null as 1 | 2 | 3 | 4 | null,
  interests: [] as string[],
  bio: "",
  avatarUri: null as string | null,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setFirstName: (firstName) => set({ firstName }),

  setLastName: (lastName) => set({ lastName }),

  setName: (firstName, lastName) => set({ firstName, lastName }),

  setAge: (age) => set({ age }),

  setUniversity: (university) => set({ university }),

  setDegree: (degree) => set({ degree }),

  toggleMajor: (major) =>
    set((state) => {
      if (state.majors.includes(major)) {
        return { majors: state.majors.filter((m) => m !== major) };
      }
      if (state.majors.length >= 2) return state;
      return { majors: [...state.majors, major] };
    }),

  clearMajors: () => set({ majors: [] }),

  setAcademicYear: (year) => set({ academicYear: year }),

  toggleInterest: (interest) =>
    set((state) => {
      const exists = state.interests.some(
        (i) => i.toLowerCase() === interest.toLowerCase()
      );
      return {
        interests: exists
          ? state.interests.filter(
              (i) => i.toLowerCase() !== interest.toLowerCase()
            )
          : [...state.interests, interest],
      };
    }),

  setBio: (bio) => set({ bio }),

  setAvatarUri: (uri) => set({ avatarUri: uri }),

  reset: () => set(initialState),
}));
