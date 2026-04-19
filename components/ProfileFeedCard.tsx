import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { X, Star, CheckCircle } from "lucide-react-native";
import { Colors } from "@/constants";
import { Badge } from "@/components/ui/Badge";
import type { ScoredProfile } from "@/types";

type ProfileFeedCardProps = {
  profile: ScoredProfile;
  currentUserInterests: string[];
  onConnect: (id: string) => void;
  onSkip: (id: string) => void;
};

const yearLabels: Record<number, string> = {
  1: "Freshman",
  2: "Sophomore",
  3: "Junior",
  4: "Senior",
};

export function ProfileFeedCard({ profile, currentUserInterests, onConnect, onSkip }: ProfileFeedCardProps) {
  const sharedInterests = new Set(
    currentUserInterests.map((i) => i.toLowerCase()),
  );
  const majorSummary = profile.majors.length > 0 ? profile.majors.join(", ") : profile.degree;

  return (
    <View
      style={{
        backgroundColor: Colors.surface.containerLow,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: Colors.outline.variant + "26",
      }}
    >
      {/* Photo */}
      <View style={{ aspectRatio: 4 / 5, width: "100%" }}>
        {profile.avatarUrl ? (
          <Image
            source={{ uri: profile.avatarUrl }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={300}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primary.container,
            }}
          >
            <Text
              style={{
                fontFamily: "Manrope_800ExtraBold",
                fontSize: 72,
                color: Colors.onPrimary.container,
              }}
            >
              {profile.firstName[0]}
              {profile.lastName[0]}
            </Text>
          </View>
        )}
      </View>

      {/* Name & Compatibility */}
      <View style={{ padding: 20, paddingBottom: 0 }}>
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
          {profile.university}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Text
            style={{
              fontFamily: "Manrope_800ExtraBold",
              fontSize: 24,
              letterSpacing: -0.5,
              color: Colors.onSurface.DEFAULT,
              flexShrink: 1,
            }}
            numberOfLines={1}
          >
            {profile.firstName} {profile.lastName}
          </Text>
          {profile.isVerified && (
            <CheckCircle size={18} color={Colors.primary.DEFAULT} fill={Colors.primary.container} />
          )}
        </View>
        <Text
          style={{
            fontFamily: "WorkSans_500Medium",
            fontSize: 15,
            color: Colors.onSurface.DEFAULT,
            marginBottom: 10,
          }}
          numberOfLines={2}
        >
          {majorSummary}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <Badge label={profile.degree} />
          <Text
            style={{
              fontFamily: "WorkSans_500Medium",
              fontSize: 13,
              color: Colors.onSurface.variant,
            }}
          >
            {yearLabels[profile.academicYear]} · Year {profile.academicYear}
          </Text>
        </View>
      </View>

      {/* Compatibility Score */}
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: Colors.primary.DEFAULT + "14",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: Colors.primary.DEFAULT + "26",
            alignSelf: "flex-start",
          }}
        >
          <Star size={14} color={Colors.primary.DEFAULT} fill={Colors.primary.DEFAULT} />
          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 13,
              color: Colors.primary.DEFAULT,
            }}
          >
            {profile.compatibilityScore}% Compatible
          </Text>
        </View>
      </View>

      {/* Bio */}
      {profile.bio ? (
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 16,
            backgroundColor: Colors.surface.container,
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 15,
              lineHeight: 24,
              color: Colors.onSurface.DEFAULT,
            }}
          >
            {profile.bio}
          </Text>
        </View>
      ) : null}

      {/* Interests */}
      {profile.interests.length > 0 && (
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: Colors.onSurface.variant,
              marginBottom: 10,
            }}
          >
            Interests
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {profile.interests.map((interest) => {
              const isShared = sharedInterests.has(interest.toLowerCase());
              return (
                <View
                  key={interest}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 999,
                    backgroundColor: isShared
                      ? Colors.tertiary.container
                      : Colors.surface.containerHigh,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "WorkSans_500Medium",
                      fontSize: 12,
                      color: isShared
                        ? Colors.onTertiary.container
                        : Colors.onSurface.variant,
                    }}
                  >
                    {interest}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Active Courses */}
      {profile.activeCourses.length > 0 && (
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: Colors.onSurface.variant,
              marginBottom: 10,
            }}
          >
            Active Courses
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {profile.activeCourses.map((course) => (
              <View
                key={course}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 6,
                  backgroundColor: Colors.surface.containerHigh,
                  borderWidth: 1,
                  borderColor: Colors.outline.variant + "4D",
                }}
              >
                <Text
                  style={{
                    fontFamily: "WorkSans_600SemiBold",
                    fontSize: 12,
                    color: Colors.onSurface.DEFAULT,
                  }}
                >
                  {course}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          paddingVertical: 20,
          borderTopWidth: 1,
          borderTopColor: Colors.outline.variant + "1A",
        }}
      >
        <Pressable
          onPress={() => onSkip(profile.id)}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
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
          <X size={24} color={Colors.onSurface.variant} />
        </Pressable>
        <Pressable
          onPress={() => onConnect(profile.id)}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
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
          <Star size={24} color={Colors.onPrimary.DEFAULT} />
        </Pressable>
      </View>
    </View>
  );
}
