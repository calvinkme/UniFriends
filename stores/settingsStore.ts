import { create } from "zustand";

type SettingsStore = {
  // Notifications
  notifyNewRequests: boolean;
  notifyMessages: boolean;
  notifyGroupActivity: boolean;
  notifyWeeklyDigest: boolean;
  pushToken: string | null;
  // Privacy
  profileVisible: boolean;
  showOnlineStatus: boolean;
  showAcademicYear: boolean;
  showGpa: boolean;
  // Preferences
  darkMode: boolean;
  // Actions
  toggleSetting: (key: ToggleableKey) => void;
  setPushToken: (token: string | null) => void;
};

type ToggleableKey =
  | "notifyNewRequests"
  | "notifyMessages"
  | "notifyGroupActivity"
  | "notifyWeeklyDigest"
  | "profileVisible"
  | "showOnlineStatus"
  | "showAcademicYear"
  | "showGpa"
  | "darkMode";

export const useSettingsStore = create<SettingsStore>((set) => ({
  notifyNewRequests: true,
  notifyMessages: true,
  notifyGroupActivity: true,
  notifyWeeklyDigest: false,
  pushToken: null,
  profileVisible: true,
  showOnlineStatus: true,
  showAcademicYear: true,
  showGpa: true,
  darkMode: false,

  toggleSetting: (key) => {
    set((state) => ({ [key]: !state[key] }));
  },

  setPushToken: (token) => set({ pushToken: token }),
}));
