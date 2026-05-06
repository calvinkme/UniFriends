import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ArrowLeft, UserPlus, Check } from "lucide-react-native";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ConnectionModal } from "@/components/ConnectionModal";
import { useDiscoveryStore } from "@/stores";
import type { ScoredProfile } from "@/types";

function ProfileRow({
  profile,
  connected,
  onConnect,
}: {
  profile: ScoredProfile;
  connected: boolean;
  onConnect: () => void;
}) {
  const yearLabel = profile.academicYear === 1 ? "1st Year" : profile.academicYear === 2 ? "2nd Year" : profile.academicYear === 3 ? "3rd Year" : "4th Year";
  const sharedInterests = profile.interests.slice(0, 3);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: Colors.surface.containerLow,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.outline.variant + "33",
      }}
    >
      <Avatar
        uri={profile.avatarUrl}
        name={`${profile.firstName} ${profile.lastName}`}
        size="md"
      />
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <Text
            style={{ fontFamily: "Manrope_700Bold", fontSize: 16, color: Colors.onSurface.DEFAULT, flexShrink: 1 }}
            numberOfLines={1}
          >
            {profile.firstName} {profile.lastName}
          </Text>
          <Badge label={yearLabel} />
        </View>
        <Text
          style={{ fontFamily: "WorkSans_500Medium", fontSize: 13, color: Colors.onSurface.variant, marginBottom: 6 }}
          numberOfLines={1}
        >
          {profile.degree}{profile.majors.length > 0 ? ` · ${profile.majors[0]}` : ""}
        </Text>
        {sharedInterests.length > 0 && (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {sharedInterests.map((interest) => (
              <View
                key={interest}
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 999,
                  backgroundColor: Colors.tertiary.container + "55",
                }}
              >
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 11, color: Colors.onTertiary.container }}>
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <Pressable
        onPress={connected ? undefined : onConnect}
        disabled={connected}
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: connected ? Colors.secondary.container : Colors.primary.DEFAULT,
        }}
        hitSlop={4}
      >
        {connected ? (
          <Check size={20} color={Colors.secondary.DEFAULT} />
        ) : (
          <UserPlus size={20} color={Colors.onPrimary.DEFAULT} />
        )}
      </Pressable>
    </View>
  );
}

export default function BrowseScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    scoredProfiles, connectedIds, showConnectionModal, connectionModalType, lastConnectedUser,
    loadProfiles, acceptProfileById, dismissConnectionModal,
  } = useDiscoveryStore();

  useEffect(() => {
    loadProfiles();
  }, []);

  const resultCount = scoredProfiles.length;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, height: 56, gap: 14 }}>
        <Pressable
          onPress={() => router.back()}
          style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
          hitSlop={8}
        >
          <ArrowLeft size={22} color={Colors.onSurface.DEFAULT} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 18, color: Colors.onSurface.DEFAULT }}>
            Results
          </Text>
          <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant }}>
            {resultCount} {resultCount === 1 ? "student" : "students"} found
          </Text>
        </View>
      </View>

      {resultCount > 0 ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {scoredProfiles.map((profile) => (
            <ProfileRow
              key={profile.id}
              profile={profile}
              connected={connectedIds.includes(profile.id)}
              onConnect={() => acceptProfileById(profile.id)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 }}>
          <Text
            style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT, textAlign: "center", marginBottom: 8 }}
          >
            No matches found
          </Text>
          <Text
            style={{ fontFamily: "WorkSans_400Regular", fontSize: 15, lineHeight: 22, color: Colors.onSurface.variant, textAlign: "center", marginBottom: 32 }}
          >
            Try adjusting your filters to discover more students
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={{ backgroundColor: Colors.primary.DEFAULT, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 }}
          >
            <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 15, color: Colors.onPrimary.DEFAULT }}>
              Adjust Filters
            </Text>
          </Pressable>
        </View>
      )}

      {lastConnectedUser && (
        <ConnectionModal
          visible={showConnectionModal}
          user={lastConnectedUser}
          mode={connectionModalType}
          onChat={() => {
            const userId = lastConnectedUser.id;
            dismissConnectionModal();
            setTimeout(() => router.push(`/chat/${userId}`), 300);
          }}
          onClose={dismissConnectionModal}
        />
      )}
    </View>
  );
}
