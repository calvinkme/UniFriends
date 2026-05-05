import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Edit2, Settings, LogOut } from "lucide-react-native";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useProfileStore, useAuthStore } from "@/stores";
import { useSettingsStore } from "@/stores/settingsStore";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { currentUser, loadProfile } = useProfileStore();
  const { signOut } = useAuthStore();
  const { showAcademicYear, showGpa } = useSettingsStore();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: signOut },
    ]);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!currentUser) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.variant }}>
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      {/* Header with quick actions */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, height: 56 }}>
        <Text
          style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 24, letterSpacing: -0.5, color: Colors.onSurface.DEFAULT }}
        >
          My Profile
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            onPress={() => router.push("/edit-profile")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.surface.containerHigh,
            }}
            hitSlop={4}
          >
            <Edit2 size={18} color={Colors.onSurface.DEFAULT} />
          </Pressable>
          <Pressable
            onPress={() => router.push("/settings")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.surface.containerHigh,
            }}
            hitSlop={4}
          >
            <Settings size={18} color={Colors.onSurface.DEFAULT} />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Hero Profile Section */}
        <View
          className="bg-surface-container rounded-xl p-6 items-center"
          style={{ borderWidth: 1, borderColor: Colors.outline.variant + "66" }}
        >
          <Avatar
            uri={currentUser.avatarUrl}
            name={`${currentUser.firstName} ${currentUser.lastName}`}
            size="xl"
            showRing
            showVerified={currentUser.isVerified}
          />
          <Text
            className="text-on-surface mt-4"
            style={{ fontFamily: "Manrope_700Bold", fontSize: 24, letterSpacing: -0.5 }}
          >
            {currentUser.firstName} {currentUser.lastName}
          </Text>
          <Text
            className="text-on-surface-variant mt-1"
            style={{ fontFamily: "WorkSans_500Medium", fontSize: 14 }}
          >
            B.Sc {currentUser.degree}
          </Text>
        </View>

        {/* Stats Grid */}
        {(showAcademicYear || showGpa) && (
          <View className="flex-row gap-3 mt-6">
            {showAcademicYear && (
              <View
                className="flex-1 bg-surface-container-low rounded-lg p-4 items-center"
                style={{ borderWidth: 1, borderColor: Colors.outline.variant + "33" }}
              >
                <Text
                  style={{
                    fontFamily: "WorkSans_600SemiBold", fontSize: 10,
                    letterSpacing: 1.5, textTransform: "uppercase",
                    color: Colors.onSurface.variant, marginBottom: 4,
                  }}
                >
                  Academic Year
                </Text>
                <Text style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 18, color: Colors.primary.DEFAULT }}>
                  Year {currentUser.academicYear}
                </Text>
              </View>
            )}
            {showGpa && (
              <View
                className="flex-1 bg-surface-container-low rounded-lg p-4 items-center"
                style={{ borderWidth: 1, borderColor: Colors.outline.variant + "33" }}
              >
                <Text
                  style={{
                    fontFamily: "WorkSans_600SemiBold", fontSize: 10,
                    letterSpacing: 1.5, textTransform: "uppercase",
                    color: Colors.onSurface.variant, marginBottom: 4,
                  }}
                >
                  GPA Ranking
                </Text>
                <Text style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 18, color: Colors.secondary.DEFAULT }}>
                  {currentUser.gpaRanking ?? "N/A"}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Active Courses */}
        <View className="mt-8">
          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold", fontSize: 12,
              letterSpacing: 1, textTransform: "uppercase",
              color: Colors.onSurface.variant, marginBottom: 12, paddingLeft: 4,
            }}
          >
            Active Courses
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {currentUser.activeCourses.map((course) => (
              <View
                key={course}
                className="px-3 py-1.5 bg-surface-container-high rounded-md"
                style={{ borderWidth: 1, borderColor: Colors.outline.variant + "4D" }}
              >
                <Text style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 12, color: Colors.onSurface.DEFAULT }}>
                  {course}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* About Me */}
        <View
          className="mt-8 bg-surface-container-low rounded-lg p-6"
          style={{ borderWidth: 1, borderColor: Colors.outline.variant + "33" }}
        >
          <Text
            className="text-on-surface mb-2"
            style={{ fontFamily: "Manrope_700Bold", fontSize: 18 }}
          >
            About Me
          </Text>
          <Text
            className="text-on-surface-variant mb-6"
            style={{ fontFamily: "WorkSans_400Regular", fontSize: 14, lineHeight: 23 }}
          >
            {currentUser.bio}
          </Text>

          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold", fontSize: 12,
              letterSpacing: 1, textTransform: "uppercase",
              color: Colors.onSurface.variant, marginBottom: 12,
            }}
          >
            Interests
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {currentUser.interests.map((interest) => (
              <View
                key={interest}
                className="px-2.5 py-1 rounded-md"
                style={{
                  backgroundColor: Colors.primary.DEFAULT + "1A",
                  borderWidth: 1,
                  borderColor: Colors.primary.DEFAULT + "33",
                }}
              >
                <Text
                  style={{
                    fontFamily: "WorkSans_600SemiBold", fontSize: 11,
                    color: Colors.primary.DEFAULT,
                  }}
                >
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View className="mt-8 gap-3 pb-8">
          <Button
            label="Edit Profile"
            onPress={() => router.push("/edit-profile")}
            variant="surface"
            fullWidth
            icon={<Edit2 size={18} color={Colors.onSurface.variant} />}
          />
          <Button
            label="Settings"
            onPress={() => router.push("/settings")}
            variant="surface"
            fullWidth
            icon={<Settings size={18} color={Colors.onSurface.variant} />}
          />
          <Button
            label="Sign Out"
            onPress={handleSignOut}
            variant="surface"
            fullWidth
            icon={<LogOut size={18} color={Colors.error.DEFAULT} />}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}
