import { create } from "zustand";
import type { FilterState } from "@/types";

type FilterStore = FilterState & {
  setFieldOfStudy: (value: string | null) => void;
  setAcademicYear: (value: number | null) => void;
  toggleInterest: (interest: string) => void;
  setProximity: (km: number) => void;
  resetFilters: () => void;
};

const initialState: FilterState = {
  fieldOfStudy: null,
  academicYear: null,
  interests: [],
  proximityKm: 5,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setFieldOfStudy: (value) => set({ fieldOfStudy: value }),
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
