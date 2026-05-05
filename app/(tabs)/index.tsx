import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
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
    fieldOfStudy, major, academicYear, interests,
    setFieldOfStudy, setMajor, setAcademicYear, toggleInterest,
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

        {/* Degree Program */}
        <View className="mb-12">
          <View className="flex-row items-center justify-between mb-4">
            <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT }}>
              Degree Program
            </Text>
            <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 14, color: Colors.tertiary.DEFAULT }}>
              Select Degree
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

        {/* Major */}
        <View className="mb-12">
          <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT, marginBottom: 12 }}>
            Major
          </Text>
          <TextInput
            value={major ?? ""}
            onChangeText={(text) => setMajor(text || null)}
            placeholder="e.g. Artificial Intelligence"
            placeholderTextColor={Colors.outline.DEFAULT}
            style={{
              backgroundColor: Colors.surface.containerHigh,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontFamily: "WorkSans_400Regular",
              fontSize: 16,
              color: Colors.onSurface.DEFAULT,
            }}
          />
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
