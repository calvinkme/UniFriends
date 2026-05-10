import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft, UserPlus, Check, BookOpen, GraduationCap, MapPin, Calendar } from "lucide-react-native";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ConnectionModal } from "@/components/ConnectionModal";
import { useDiscoveryStore } from "@/stores";

export default function ProfileDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    scoredProfiles, connectedIds, showConnectionModal, connectionModalType, lastConnectedUser,
    acceptProfileById, dismissConnectionModal,
  } = useDiscoveryStore();

  const profile = scoredProfiles.find((p) => p.id === id);

  if (!profile) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 18, color: Colors.onSurface.DEFAULT }}>
          Profile not found
        </Text>
        <Pressable onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.primary.DEFAULT }}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const connected = connectedIds.includes(profile.id);
  const yearLabel = profile.academicYear === 1 ? "1st Year" : profile.academicYear === 2 ? "2nd Year" : profile.academicYear === 3 ? "3rd Year" : "4th Year";

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
        <Text style={{ flex: 1, fontFamily: "Manrope_700Bold", fontSize: 18, color: Colors.onSurface.DEFAULT }}>
          Profile
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + Name */}
        <View style={{ alignItems: "center", marginTop: 16, marginBottom: 24 }}>
          <Avatar uri={profile.avatarUrl} name={`${profile.firstName} ${profile.lastName}`} size="lg" />
          <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 22, color: Colors.onSurface.DEFAULT, marginTop: 14 }}>
            {profile.firstName} {profile.lastName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 }}>
            <Badge label={yearLabel} />
            {profile.isOnline && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.secondary.DEFAULT }} />
                <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 12, color: Colors.secondary.DEFAULT }}>Online</Text>
              </View>
            )}
          </View>
        </View>

        {/* Bio */}
        {profile.bio ? (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 15, lineHeight: 23, color: Colors.onSurface.DEFAULT, textAlign: "center" }}>
              {profile.bio}
            </Text>
          </View>
        ) : null}

        {/* Connect button */}
        <Pressable
          onPress={connected ? undefined : () => acceptProfileById(profile.id)}
          disabled={connected}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            paddingVertical: 14,
            borderRadius: 14,
            backgroundColor: connected ? Colors.secondary.container : Colors.primary.DEFAULT,
            marginBottom: 28,
          }}
        >
          {connected ? (
            <Check size={20} color={Colors.secondary.DEFAULT} />
          ) : (
            <UserPlus size={20} color={Colors.onPrimary.DEFAULT} />
          )}
          <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 15, color: connected ? Colors.secondary.DEFAULT : Colors.onPrimary.DEFAULT }}>
            {connected ? "Connected" : "Connect"}
          </Text>
        </Pressable>

        {/* Details Section */}
        <View style={{ gap: 16 }}>
          {/* University */}
          <DetailRow icon={<MapPin size={18} color={Colors.primary.DEFAULT} />} label="University" value={profile.university} />

          {/* Degree */}
          <DetailRow icon={<GraduationCap size={18} color={Colors.primary.DEFAULT} />} label="Degree" value={profile.degree} />

          {/* Major(s) */}
          {profile.majors.length > 0 && (
            <DetailRow icon={<BookOpen size={18} color={Colors.primary.DEFAULT} />} label={profile.majors.length > 1 ? "Majors" : "Major"} value={profile.majors.join(", ")} />
          )}

          {/* Academic Year */}
          <DetailRow icon={<Calendar size={18} color={Colors.primary.DEFAULT} />} label="Year" value={yearLabel} />

          {/* Active Courses */}
          {profile.activeCourses.length > 0 && (
            <View style={{ backgroundColor: Colors.surface.containerLow, borderRadius: 14, padding: 16 }}>
              <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 14, color: Colors.onSurface.variant, marginBottom: 10 }}>
                Active Courses
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {profile.activeCourses.map((course) => (
                  <View key={course} style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: Colors.surface.container }}>
                    <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 13, color: Colors.onSurface.DEFAULT }}>{course}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Interests */}
          {profile.interests.length > 0 && (
            <View style={{ backgroundColor: Colors.surface.containerLow, borderRadius: 14, padding: 16 }}>
              <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 14, color: Colors.onSurface.variant, marginBottom: 10 }}>
                Interests
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {profile.interests.map((interest) => (
                  <View key={interest} style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: Colors.tertiary.container + "55" }}>
                    <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 13, color: Colors.onTertiary.container }}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Compatibility Score */}
          {profile.compatibilityScore > 0 && (
            <View style={{ backgroundColor: Colors.primary.fixed, borderRadius: 14, padding: 16, alignItems: "center" }}>
              <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 28, color: Colors.primary.DEFAULT }}>
                {Math.round(profile.compatibilityScore * 100)}%
              </Text>
              <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onPrimary.container, marginTop: 2 }}>
                Compatibility Score
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

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

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: Colors.surface.containerLow, borderRadius: 14, padding: 16 }}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 12, color: Colors.onSurface.variant, marginBottom: 2 }}>{label}</Text>
        <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}>{value}</Text>
      </View>
    </View>
  );
}
