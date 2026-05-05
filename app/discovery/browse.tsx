import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { X, Star, ArrowLeft } from "lucide-react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants";
import { Badge } from "@/components/ui/Badge";
import { ConnectionModal } from "@/components/ConnectionModal";
import { useDiscoveryStore } from "@/stores";
import type { UserProfile } from "@/types";

function ProfileCard({ user }: { user: UserProfile }) {
  const yearLabels: Record<number, string> = { 1: "Freshman", 2: "Sophomore", 3: "Junior", 4: "Senior" };
  const majorSummary = user.majors.length > 0 ? user.majors.join(", ") : user.degree;

  return (
    <View
      style={{ flex: 1, marginHorizontal: 16, borderRadius: 16, overflow: "hidden", backgroundColor: Colors.surface.DEFAULT }}
    >
      {/* Photo */}
      <View style={{ flex: 0.5 }}>
        {user.avatarUrl ? (
          <Image
            source={{ uri: user.avatarUrl }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={300}
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors.primary.container }}
          >
            <Text style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 64, color: Colors.onPrimary.container }}>
              {user.firstName[0]}{user.lastName[0]}
            </Text>
          </View>
        )}
      </View>

      {/* Info — scrollable for long content */}
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.surface.containerLow }}
        contentContainerStyle={{ padding: 22 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontFamily: "WorkSans_600SemiBold",
            fontSize: 11,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: Colors.onSurface.variant,
            marginBottom: 8,
          }}
        >
          {user.university}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <Text
            style={{
              fontFamily: "Manrope_800ExtraBold",
              fontSize: 24,
              letterSpacing: -0.5,
              color: Colors.onSurface.DEFAULT,
            }}
          >
            {user.firstName}, {user.academicYear === 1 ? "1st" : user.academicYear === 2 ? "2nd" : user.academicYear === 3 ? "3rd" : "4th"} Year
          </Text>
        </View>

        <Text
          style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT, marginBottom: 12 }}
        >
          {majorSummary}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Badge label={user.degree} />
          <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 13, color: Colors.onSurface.variant }}>
            {yearLabels[user.academicYear]}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 14,
            lineHeight: 22,
            color: Colors.onSurface.variant,
            marginBottom: 16,
          }}
        >
          {user.bio}
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {user.interests.map((interest) => (
            <View
              key={interest}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: Colors.tertiary.container + "66",
              }}
            >
              <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 12, color: Colors.onTertiary.container }}>
                {interest}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default function BrowseScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    profiles, currentIndex, showConnectionModal, connectionModalType, lastConnectedUser,
    loadProfiles, acceptProfile, skipProfile, dismissConnectionModal,
  } = useDiscoveryStore();

  useEffect(() => {
    loadProfiles();
  }, []);

  const currentProfile = profiles[currentIndex];
  const hasMoreProfiles = currentIndex < profiles.length;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 24, height: 56, gap: 16 }}>
        <Pressable
          onPress={() => router.back()}
          style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
          hitSlop={8}
        >
          <ArrowLeft size={22} color={Colors.onSurface.DEFAULT} />
        </Pressable>
        <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 18, color: Colors.onSurface.DEFAULT }}>
          Discover
        </Text>
      </View>

      {/* Card Area */}
      {hasMoreProfiles && currentProfile ? (
        <View style={{ flex: 1, paddingBottom: 16 }}>
          <ProfileCard key={currentProfile.id} user={currentProfile} />

          {/* Action Buttons */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 32, paddingVertical: 16, paddingHorizontal: 24 }}>
            <Pressable
              onPress={skipProfile}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.surface.containerHigh,
                shadowColor: Colors.onSurface.DEFAULT,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <X size={28} color={Colors.onSurface.variant} />
            </Pressable>
            <Pressable
              onPress={acceptProfile}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.primary.DEFAULT,
                shadowColor: Colors.primary.DEFAULT,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 4,
              }}
            >
              <Star size={28} color={Colors.onPrimary.DEFAULT} />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 }}>
          <Text
            style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT, textAlign: "center", marginBottom: 8 }}
          >
            No more profiles
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
