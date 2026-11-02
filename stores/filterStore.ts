import { create } from "zustand";
import type { FilterState } from "@/types";

type FilterStore = FilterState & {
  setUniversity: (value: string | null) => void;
  setFieldOfStudy: (value: string | null) => void;
  setMajor: (value: string | null) => void;
  setAcademicYear: (value: number | null) => void;
  toggleInterest: (interest: string) => void;
  setProximity: (km: number) => void;
  resetFilters: () => void;
};

const initialState: FilterState = {
  university: null,
  fieldOfStudy: null,
  major: null,
  academicYear: null,
  interests: [],
  proximityKm: 5,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setUniversity: (value) => set({ university: value, fieldOfStudy: null, major: null }),
  setFieldOfStudy: (value) => set({ fieldOfStudy: value, major: null }),
  setMajor: (value) => set({ major: value }),
  setAcademicYear: (value) =>
    set((state) => ({
      academicYear: state.academicYear === value ? null : value,
    })),
  toggleInterest: (interest) =>
    set((state) => ({
      interests: state.interests.includes(interest)
        ? state.interests.filter((i) => i !== interest)
        : [...state.interests, interest],
    })),
  setProximity: (km) => set({ proximityKm: km }),
  resetFilters: () => set(initialState),
}));
