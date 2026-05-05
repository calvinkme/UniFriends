import { create } from "zustand";
import type { UserProfile, ScoredProfile } from "@/types";
import { MOCK_USERS, CURRENT_USER } from "@/services/mockData";
import { createConnection, getDiscoverableProfiles } from "@/services/database";
import { rankProfiles, rankAllProfiles } from "@/services/matchingAlgorithm";
import { useAuthStore } from "./authStore";
import { useConnectionStore } from "./connectionStore";
import { useProfileStore } from "./profileStore";
import { useFilterStore } from "./filterStore";
import { getBlockedUsers } from "@/services/database";

type DiscoveryStore = {
  // Legacy: index-based for browse.tsx swipe UI
  profiles: UserProfile[];
  currentIndex: number;
  // New: scored profiles for main feed
  scoredProfiles: ScoredProfile[];
  skippedIds: string[];
  connectedIds: string[];
  showConnectionModal: boolean;
  connectionModalType: "sent" | "matched";
  lastConnectedUser: UserProfile | null;
  loadProfiles: () => void;
  loadMainFeed: () => void;
  resetFeed: () => void;
  acceptProfile: () => void;
  skipProfile: () => void;
  acceptProfileById: (id: string) => void;
  skipProfileById: (id: string) => void;
  dismissConnectionModal: () => void;
};

function mapDbProfile(row: Record<string, unknown>): UserProfile {
  return {
    id: row.id as string,
    firstName: row.first_name as string,
    lastName: row.last_name as string,
    email: row.email as string | undefined,
    avatarUrl: (row.avatar_url as string) ?? "",
    university: row.university as string,
    degree: row.degree as string,
    majors: (row.majors as string[]) ?? [],
    age: (row.age as number) ?? 0,
    academicYear: row.academic_year as 1 | 2 | 3 | 4,
    gpaRanking: row.gpa_ranking as string | undefined,
    activeCourses: (row.active_courses as string[]) ?? [],
    bio: (row.bio as string) ?? "",
    interests: (row.interests as string[]) ?? [],
    isVerified: (row.is_verified as boolean) ?? false,
    isOnline: false,
    createdAt: row.created_at as string,
  };
}

function applyFilters(profiles: UserProfile[]): UserProfile[] {
  const { fieldOfStudy, major, academicYear, interests } = useFilterStore.getState();

  return profiles.filter((p) => {
    if (fieldOfStudy) {
      const lower = fieldOfStudy.toLowerCase();
      const matchesDegree = p.degree.toLowerCase().includes(lower);
      const matchesMajor = p.majors.some((m) => m.toLowerCase().includes(lower));
      if (!matchesDegree && !matchesMajor) return false;
    }
    if (major) {
      const lowerMajor = major.toLowerCase();
      if (!p.majors.some((m) => m.toLowerCase().includes(lowerMajor))) return false;
    }
    if (academicYear && p.academicYear !== academicYear) {
      return false;
    }
    if (interests.length > 0) {
      const lowerInterests = interests.map((i) => i.toLowerCase());
      const hasAny = p.interests.some((pi) => lowerInterests.includes(pi.toLowerCase()));
      if (!hasAny) return false;
    }
    return true;
  });
}

async function fetchDiscoverableProfiles(excludeIds: string[]): Promise<UserProfile[]> {
  const userId = useAuthStore.getState().session?.user?.id;
  let rawProfiles: UserProfile[] = [];

  let blockedIds: string[] = useConnectionStore.getState().blockedUserIds;
  try {
    if (userId) {
      const serverBlocked = await getBlockedUsers(userId);
      if (serverBlocked.length > 0) blockedIds = [...new Set([...blockedIds, ...serverBlocked])];
    }
  } catch {
    // Use local blocked list only
  }

  const allExcluded = [...new Set([...excludeIds, ...blockedIds])];

  try {
    if (userId) {
      const rows = await getDiscoverableProfiles({ excludeIds: allExcluded });
      if (rows && rows.length > 0) {
        rawProfiles = rows.map(mapDbProfile);
      }
    }
  } catch {
    // Fall through to mock data
  }

  const excluded = new Set(allExcluded);
  const fallbackProfiles = MOCK_USERS.filter((user) => !excluded.has(user.id));
  const seenIds = new Set(rawProfiles.map((user) => user.id));

  for (const fallbackProfile of fallbackProfiles) {
    if (!seenIds.has(fallbackProfile.id)) {
      rawProfiles.push(fallbackProfile);
    }
  }

  return rawProfiles;
}

export const useDiscoveryStore = create<DiscoveryStore>((set, get) => ({
  profiles: [],
  currentIndex: 0,
  scoredProfiles: [],
  skippedIds: [],
  connectedIds: [],
  showConnectionModal: false,
  connectionModalType: "sent",
  lastConnectedUser: null,

  loadProfiles: async () => {
    const currentUser = useProfileStore.getState().currentUser ?? CURRENT_USER;
    const { skippedIds, connectedIds } = get();
    const excludeIds = Array.from(new Set([currentUser.id, ...skippedIds, ...connectedIds]));
    const rawProfiles = await fetchDiscoverableProfiles(excludeIds);

    const filtered = applyFilters(rawProfiles);

    const scored = rankProfiles(currentUser, filtered);

    set({
      profiles: filtered,
      currentIndex: 0,
      scoredProfiles: scored,
    });
  },

  loadMainFeed: async () => {
    const currentUser = useProfileStore.getState().currentUser ?? CURRENT_USER;
    const { skippedIds, connectedIds } = get();
    const excludeIds = Array.from(new Set([currentUser.id, ...skippedIds, ...connectedIds]));

    let rawProfiles = await fetchDiscoverableProfiles(excludeIds);
    if (rawProfiles.length === 0) {
      rawProfiles = await fetchDiscoverableProfiles([currentUser.id]);
    }

    const filtered = applyFilters(rawProfiles);
    const scored = rankAllProfiles(currentUser, filtered);

    set({ scoredProfiles: scored });
  },

  resetFeed: async () => {
    set({
      profiles: [],
      currentIndex: 0,
      scoredProfiles: [],
      skippedIds: [],
      connectedIds: [],
      showConnectionModal: false,
      connectionModalType: "sent",
      lastConnectedUser: null,
    });

    await get().loadMainFeed();
  },

  // Legacy index-based (browse.tsx)
  acceptProfile: () => {
    const { profiles, currentIndex, connectedIds } = get();
    const currentProfile = profiles[currentIndex];
    if (!currentProfile) return;

    const result = useConnectionStore.getState().addPendingConnection(currentProfile, 0);
    const currentUserId = useAuthStore.getState().session?.user?.id;
    if (currentUserId && !currentProfile.id.startsWith("user-")) {
      createConnection(currentUserId, currentProfile.id).catch(() => {
        // Keep the local pending state even if the network call fails during development.
      });
    }

    set({
      connectedIds: [...connectedIds, currentProfile.id],
      currentIndex: currentIndex + 1,
      showConnectionModal: true,
      connectionModalType: result,
      lastConnectedUser: currentProfile,
    });
  },

  skipProfile: () => {
    const { profiles, currentIndex, skippedIds } = get();
    const currentProfile = profiles[currentIndex];
    if (!currentProfile) return;

    set({
      skippedIds: [...skippedIds, currentProfile.id],
      currentIndex: currentIndex + 1,
    });
  },

  // New ID-based (main feed)
  acceptProfileById: (id: string) => {
    const { scoredProfiles, connectedIds } = get();
    const profile = scoredProfiles.find((p) => p.id === id);
    if (!profile) return;

    const result = useConnectionStore.getState().addPendingConnection(profile, profile.compatibilityScore);
    const currentUserId = useAuthStore.getState().session?.user?.id;
    if (currentUserId && !profile.id.startsWith("user-")) {
      createConnection(currentUserId, profile.id).catch(() => {
        // Keep the local pending state even if the network call fails during development.
      });
    }

    set({
      connectedIds: [...connectedIds, id],
      scoredProfiles: scoredProfiles.filter((p) => p.id !== id),
      showConnectionModal: true,
      connectionModalType: result,
      lastConnectedUser: profile,
    });
  },

  skipProfileById: (id: string) => {
    const { scoredProfiles, skippedIds } = get();

    set({
      skippedIds: [...skippedIds, id],
      scoredProfiles: scoredProfiles.filter((p) => p.id !== id),
    });
  },

  dismissConnectionModal: () => {
    set({ showConnectionModal: false, lastConnectedUser: null });
  },
}));
