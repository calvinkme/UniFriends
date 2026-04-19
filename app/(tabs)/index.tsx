import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/constants";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useFilterStore } from "@/stores";
import { useProfileStore } from "@/stores";
import { AVAILABLE_INTERESTS, AVAILABLE_DEGREES } from "@/services/mockData";

export default function DiscoveryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { currentUser, loadProfile } = useProfileStore();
  const {
    fieldOfStudy, academicYear, interests, proximityKm,
    setFieldOfStudy, setAcademicYear, toggleInterest, setProximity,
  } = useFilterStore();

  const [showDegreeDropdown, setShowDegreeDropdown] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const yearLabels = ["Freshman", "Sophomore", "Junior", "Senior"];

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <View className="flex-row items-center gap-3">
          <Text
            className="text-2xl text-primary"
            style={{ fontFamily: "Manrope_800ExtraBold", letterSpacing: -0.5 }}
          >
            UniFriends
          </Text>
        </View>
        <Avatar
          uri={currentUser?.avatarUrl}
          name={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : undefined}
          size="sm"
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View className="mb-12 pt-8">
          <Text
            className="text-primary mb-4"
            style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 40, letterSpacing: -0.8, lineHeight: 48 }}
          >
            Find Your{"\n"}Circle
          </Text>
          <Text
            className="text-on-surface-variant"
            style={{ fontFamily: "WorkSans_400Regular", fontSize: 18, lineHeight: 28, maxWidth: 320 }}
          >
            Customize your discovery to find students who share your academic journey and creative pursuits.
          </Text>
        </View>

        {/* Field of Study */}
        <View className="mb-12">
          <View className="flex-row items-center justify-between mb-4">
            <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT }}>
              Field of Study
            </Text>
            <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 14, color: Colors.tertiary.DEFAULT }}>
              Select Major
            </Text>
          </View>
          <Pressable
            onPress={() => setShowDegreeDropdown(!showDegreeDropdown)}
            className="flex-row items-center justify-between bg-surface-container-high rounded-xl px-4 py-4"
          >
            <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 16, color: Colors.onSurface.DEFAULT }}>
              {fieldOfStudy ?? "Computer Science & AI"}
            </Text>
            <ChevronDown size={20} color={Colors.onSurface.variant} />
          </Pressable>
          {showDegreeDropdown && (
            <View className="bg-surface-container-high rounded-xl mt-2 overflow-hidden">
              {AVAILABLE_DEGREES.map((degree) => (
                <Pressable
                  key={degree}
                  onPress={() => {
                    setFieldOfStudy(degree);
                    setShowDegreeDropdown(false);
                  }}
                  className="px-4 py-3 active:bg-surface-container-highest"
                >
                  <Text
                    style={{
                      fontFamily: "WorkSans_400Regular",
                      fontSize: 15,
                      color: fieldOfStudy === degree ? Colors.primary.DEFAULT : Colors.onSurface.DEFAULT,
                    }}
                  >
                    {degree}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Academic Year */}
        <View className="mb-12">
          <Text
            style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT, marginBottom: 24 }}
          >
            Academic Year
          </Text>
          <View className="flex-row gap-3">
            {[1, 2, 3, 4].map((year) => {
              const isSelected = academicYear === year;
              return (
                <Pressable
                  key={year}
                  onPress={() => setAcademicYear(year)}
                  className={`flex-1 items-center justify-center py-4 rounded-xl ${
                    isSelected ? "bg-primary" : "bg-surface-container-low active:bg-surface-container-high"
                  }`}
                  style={isSelected ? {
                    shadowColor: Colors.primary.container,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 4,
                  } : undefined}
                >
                  <Text
                    style={{
                      fontFamily: "WorkSans_600SemiBold",
                      fontSize: 18,
                      color: isSelected ? Colors.onPrimary.DEFAULT : Colors.onSurface.variant,
                    }}
                  >
                    {year}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "WorkSans_500Medium",
                      fontSize: 9,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      marginTop: 4,
                      color: isSelected ? Colors.onPrimary.DEFAULT + "CC" : Colors.onSurface.variant,
                    }}
                  >
                    {yearLabels[year - 1]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Interests */}
        <View className="mb-12">
          <View className="flex-row items-center justify-between mb-4">
            <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT }}>
              Academic & Creative Hobbies
            </Text>
            <Sparkles size={20} color={Colors.secondary.DEFAULT} />
          </View>
          <View className="flex-row flex-wrap gap-2">
            {AVAILABLE_INTERESTS.slice(0, 12).map((interest) => (
              <Chip
                key={interest}
                label={interest}
                selected={interests.includes(interest)}
                onPress={() => toggleInterest(interest)}
                onRemove={() => toggleInterest(interest)}
              />
            ))}
          </View>
        </View>

        {/* Proximity Slider */}
        <View className="mb-12">
          <View className="flex-row items-end justify-between mb-6">
            <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT }}>
              Proximity
            </Text>
            <View className="items-end">
              <Text
                style={{ fontFamily: "Manrope_700Bold", fontSize: 24, color: Colors.primary.DEFAULT }}
              >
                {proximityKm} km
              </Text>
              <Text
                style={{
                  fontFamily: "WorkSans_500Medium",
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: Colors.onSurface.variant,
                }}
              >
                Campus Radius
              </Text>
            </View>
          </View>
          <View className="px-2">
            <View className="h-1 bg-surface-variant rounded-full overflow-hidden">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${(proximityKm / 50) * 100}%` }}
              />
            </View>
            {/* Simple pressable slider track */}
            <Pressable
              onPress={(e) => {
                const ratio = Math.max(0.02, Math.min(1, e.nativeEvent.locationX / 300));
                setProximity(Math.round(ratio * 50));
              }}
              className="h-10 -mt-5 justify-center"
            />
          </View>
          <View className="flex-row justify-between mt-2">
            <Text
              style={{
                fontFamily: "WorkSans_500Medium", fontSize: 10,
                letterSpacing: 1.5, textTransform: "uppercase", color: Colors.onSurface.variant,
              }}
            >
              Main Campus
            </Text>
            <Text
              style={{
                fontFamily: "WorkSans_500Medium", fontSize: 10,
                letterSpacing: 1.5, textTransform: "uppercase", color: Colors.onSurface.variant,
              }}
            >
              Greater Area
            </Text>
          </View>
        </View>

        {/* Show Results CTA */}
        <View className="pt-4 pb-8">
          <Button
            label="Show Results"
            onPress={() => router.push("/discovery/browse")}
            fullWidth
            icon={<ArrowRight size={20} color={Colors.onPrimary.DEFAULT} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
