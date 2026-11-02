import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronDown, Sparkles, ArrowRight, X } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Colors } from "@/constants";
import { UNIVERSITIES_DATA } from "@/constants/degrees";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useFilterStore } from "@/stores";
import { useProfileStore } from "@/stores";
import { AVAILABLE_INTERESTS, AVAILABLE_DEGREES } from "@/services/mockData";

const UNIVERSITY_NAMES = Object.keys(UNIVERSITIES_DATA);

export default function DiscoveryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { currentUser, loadProfile } = useProfileStore();
  const {
    university, fieldOfStudy, major, academicYear, interests,
    setUniversity, setFieldOfStudy, setMajor, setAcademicYear, toggleInterest,
  } = useFilterStore();

  const [showUniDropdown, setShowUniDropdown] = useState(false);
  const [showDegreeDropdown, setShowDegreeDropdown] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const degreeOptions = useMemo(() => {
    if (university) {
      const uniData = UNIVERSITIES_DATA[university];
      return uniData ? uniData.map((d) => d.degree) : [];
    }
    return AVAILABLE_DEGREES;
  }, [university]);

  const majorOptions = useMemo(() => {
    if (university && fieldOfStudy) {
      const uniData = UNIVERSITIES_DATA[university];
      if (uniData) {
        const degreeEntry = uniData.find(
          (d) => d.degree.toLowerCase() === fieldOfStudy.toLowerCase(),
        );
        return degreeEntry?.majors ?? null;
      }
    }
    return null;
  }, [university, fieldOfStudy]);

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

        {/* University */}
        <View className="mb-10">
          <View className="flex-row items-center justify-between mb-4">
            <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT }}>
              University
            </Text>
            <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 14, color: Colors.tertiary.DEFAULT }}>
              Optional
            </Text>
          </View>
          <Pressable
            onPress={() => { setShowUniDropdown(!showUniDropdown); setShowDegreeDropdown(false); }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: Colors.surface.containerHigh,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                fontSize: 16,
                color: university ? Colors.onSurface.DEFAULT : Colors.outline.DEFAULT,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {university ?? "All Universities"}
            </Text>
            {university ? (
              <Pressable
                onPress={(e) => { e.stopPropagation(); setUniversity(null); setShowUniDropdown(false); }}
                hitSlop={8}
              >
                <X size={18} color={Colors.onSurface.variant} />
              </Pressable>
            ) : (
              <ChevronDown size={20} color={Colors.onSurface.variant} />
            )}
          </Pressable>
          {showUniDropdown && (
            <ScrollView
              style={{
                maxHeight: 240,
                backgroundColor: Colors.surface.containerHigh,
                borderRadius: 12,
                marginTop: 8,
              }}
              showsVerticalScrollIndicator={false}
            >
              {UNIVERSITY_NAMES.map((uni) => (
                <Pressable
                  key={uni}
                  onPress={() => {
                    setUniversity(uni);
                    setShowUniDropdown(false);
                  }}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "WorkSans_400Regular",
                      fontSize: 15,
                      color: university === uni ? Colors.primary.DEFAULT : Colors.onSurface.DEFAULT,
                    }}
                    numberOfLines={1}
                  >
                    {uni}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Degree Program */}
        <View className="mb-10">
          <View className="flex-row items-center justify-between mb-4">
            <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT }}>
              Degree Program
            </Text>
            {fieldOfStudy && (
              <Pressable onPress={() => setFieldOfStudy(null)} hitSlop={8}>
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 14, color: Colors.tertiary.DEFAULT }}>
                  Clear
                </Text>
              </Pressable>
            )}
          </View>
          <Pressable
            onPress={() => { setShowDegreeDropdown(!showDegreeDropdown); setShowUniDropdown(false); }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: Colors.surface.containerHigh,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                fontSize: 16,
                color: fieldOfStudy ? Colors.onSurface.DEFAULT : Colors.outline.DEFAULT,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {fieldOfStudy ?? "Select a degree"}
            </Text>
            <ChevronDown size={20} color={Colors.onSurface.variant} />
          </Pressable>
          {showDegreeDropdown && (
            <ScrollView
              style={{
                maxHeight: 240,
                backgroundColor: Colors.surface.containerHigh,
                borderRadius: 12,
                marginTop: 8,
              }}
              showsVerticalScrollIndicator={false}
            >
              {degreeOptions.length > 0 ? (
                degreeOptions.map((degree) => (
                  <Pressable
                    key={degree}
                    onPress={() => {
                      setFieldOfStudy(degree);
                      setShowDegreeDropdown(false);
                    }}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "WorkSans_400Regular",
                        fontSize: 15,
                        color: fieldOfStudy === degree ? Colors.primary.DEFAULT : Colors.onSurface.DEFAULT,
                      }}
                      numberOfLines={1}
                    >
                      {degree}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <View style={{ padding: 16 }}>
                  <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 14, color: Colors.onSurface.variant }}>
                    No degrees found for this university
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>

        {/* Major */}
        <View className="mb-12">
          <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 20, color: Colors.onSurface.DEFAULT, marginBottom: 12 }}>
            Major
          </Text>
          {majorOptions && majorOptions.length > 0 ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {majorOptions.map((m) => (
                <Chip
                  key={m}
                  label={m}
                  selected={major === m}
                  onPress={() => setMajor(major === m ? null : m)}
                  onRemove={() => setMajor(null)}
                />
              ))}
            </View>
          ) : (
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
          )}
          {!majorOptions && major && (
            <Text
              style={{
                fontFamily: "WorkSans_300Light",
                fontSize: 12,
                color: Colors.onSurface.variant,
                marginTop: 6,
              }}
            >
              Typo-tolerant — close matches will still be found
            </Text>
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

        {/* Show Results CTA */}
        <View className="pt-4 pb-8">
          <Button
            label="Find Students"
            onPress={() => router.push("/discovery/browse")}
            fullWidth
            icon={<ArrowRight size={20} color={Colors.onPrimary.DEFAULT} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
