import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState, useMemo } from "react";
import { ArrowLeft, Camera, ChevronDown } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors, UNIVERSITIES_DATA, getUniversityData, toTitleCase } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import { useProfileStore } from "@/stores";
import { AVAILABLE_INTERESTS } from "@/services/mockData";

const ACADEMIC_YEARS = [1, 2, 3, 4] as const;

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const { currentUser, updateProfile } = useProfileStore();

  const [firstName, setFirstName] = useState(currentUser?.firstName ?? "");
  const [lastName, setLastName] = useState(currentUser?.lastName ?? "");
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl ?? "");
  const [university, setUniversity] = useState(currentUser?.university ?? "");
  const [degree, setDegree] = useState(currentUser?.degree ?? "");
  const [majors, setMajors] = useState<string[]>(currentUser?.majors ?? []);
  const [age, setAge] = useState(currentUser?.age?.toString() ?? "");
  const [academicYear, setAcademicYear] = useState<1 | 2 | 3 | 4>(currentUser?.academicYear ?? 1);
  const [bio, setBio] = useState(currentUser?.bio ?? "");
  const [interests, setInterests] = useState<string[]>(currentUser?.interests ?? []);
  const [activeCourses, setActiveCourses] = useState(currentUser?.activeCourses?.join(", ") ?? "");
  const [gpaRanking, setGpaRanking] = useState(currentUser?.gpaRanking ?? "");
  const [interestSearch, setInterestSearch] = useState("");

  // Dropdown visibility states
  const [showUniPicker, setShowUniPicker] = useState(false);
  const [showDegreePicker, setShowDegreePicker] = useState(false);
  const [showMajorPicker, setShowMajorPicker] = useState(false);

  const [degreeSearch, setDegreeSearch] = useState("");
  const [majorSearch, setMajorSearch] = useState("");

  const uniData = useMemo(() => getUniversityData(university), [university]);
  const universities = useMemo(() => Object.keys(UNIVERSITIES_DATA), []);

  const degreesForUni = useMemo(() => {
    if (!uniData) return [];
    return uniData.map((d) => d.degree);
  }, [uniData]);

  const filteredDegrees = useMemo(() => {
    if (!degreeSearch.trim()) return degreesForUni;
    return degreesForUni.filter((d) =>
      d.toLowerCase().includes(degreeSearch.toLowerCase()),
    );
  }, [degreesForUni, degreeSearch]);

  const majorsForDegree = useMemo(() => {
    if (!uniData || !degree) return [];
    const found = uniData.find((d) => d.degree.toLowerCase() === degree.toLowerCase());
    return found?.majors ?? [];
  }, [uniData, degree]);

  const filteredMajors = useMemo(() => {
    if (!majorSearch.trim()) return majorsForDegree;
    return majorsForDegree.filter((m) =>
      m.toLowerCase().includes(majorSearch.toLowerCase()),
    );
  }, [majorsForDegree, majorSearch]);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "We need access to your photos to update your profile picture.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatarUrl(result.assets[0].uri);
    }
  };

  const filteredInterests = useMemo(() => {
    if (!interestSearch.trim()) return AVAILABLE_INTERESTS;
    return AVAILABLE_INTERESTS.filter((i) =>
      i.toLowerCase().includes(interestSearch.toLowerCase()),
    );
  }, [interestSearch]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) => {
      const exists = prev.some(
        (i) => i.toLowerCase() === interest.toLowerCase()
      );
      return exists
        ? prev.filter((i) => i.toLowerCase() !== interest.toLowerCase())
        : prev.length < 8
          ? [...prev, interest]
          : prev;
    });
  };

  const toggleMajor = (major: string) => {
    setMajors((prev) =>
      prev.includes(major)
        ? prev.filter((m) => m !== major)
        : prev.length < 3
          ? [...prev, major]
          : prev,
    );
  };

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert("Required", "First and last name are required.");
      return;
    }

    const coursesList = activeCourses
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 16 || parsedAge > 99) {
      Alert.alert("Invalid Age", "Please enter an age between 16 and 99.");
      return;
    }

    updateProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      avatarUrl,
      university,
      degree,
      majors,
      age: parsedAge,
      academicYear,
      bio: bio.trim(),
      interests,
      activeCourses: coursesList,
      gpaRanking: gpaRanking.trim() || undefined,
    });

    router.back();
  };

  const hasChanges =
    firstName !== (currentUser?.firstName ?? "") ||
    lastName !== (currentUser?.lastName ?? "") ||
    avatarUrl !== (currentUser?.avatarUrl ?? "") ||
    age !== (currentUser?.age?.toString() ?? "") ||
    university !== (currentUser?.university ?? "") ||
    degree !== (currentUser?.degree ?? "") ||
    JSON.stringify(majors) !== JSON.stringify(currentUser?.majors ?? []) ||
    academicYear !== (currentUser?.academicYear ?? 1) ||
    bio !== (currentUser?.bio ?? "") ||
    JSON.stringify(interests) !== JSON.stringify(currentUser?.interests ?? []) ||
    activeCourses !== (currentUser?.activeCourses?.join(", ") ?? "") ||
    gpaRanking !== (currentUser?.gpaRanking ?? "");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
    >
      <View style={{ flex: 1, paddingTop: insets.top }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            height: 56,
          }}
        >
          <Pressable
            onPress={() => {
              if (hasChanges) {
                Alert.alert("Unsaved Changes", "Discard your changes?", [
                  { text: "Keep Editing", style: "cancel" },
                  { text: "Discard", style: "destructive", onPress: () => router.back() },
                ]);
              } else {
                router.back();
              }
            }}
            style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
            hitSlop={8}
          >
            <ArrowLeft size={22} color={Colors.onSurface.DEFAULT} />
          </Pressable>
          <Text style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 18, color: Colors.onSurface.DEFAULT }}>
            Edit Profile
          </Text>
          <Pressable onPress={handleSave} hitSlop={8}>
            <Text
              style={{
                fontFamily: "Manrope_700Bold",
                fontSize: 15,
                color: hasChanges ? Colors.primary.DEFAULT : Colors.onSurface.variant + "66",
              }}
            >
              Save
            </Text>
          </Pressable>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: Math.max(insets.bottom + 140, 140),
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
          automaticallyAdjustKeyboardInsets
        >
          {/* Avatar */}
          <View style={{ alignItems: "center", marginTop: 16, marginBottom: 32 }}>
            <Pressable onPress={handlePickImage}>
              <Avatar
                uri={avatarUrl}
                name={`${firstName} ${lastName}`}
                size="xl"
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: Colors.primary.DEFAULT,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 3,
                  borderColor: Colors.background,
                }}
              >
                <Camera size={16} color={Colors.onPrimary.DEFAULT} />
              </View>
            </Pressable>
            <Text
              style={{
                fontFamily: "WorkSans_500Medium",
                fontSize: 13,
                color: Colors.onSurface.variant,
                marginTop: 12,
              }}
            >
              Tap to change photo
            </Text>
          </View>

          {/* Name Fields */}
          <SectionHeader label="Personal Info" />
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
            <View style={{ flex: 1 }}>
              <Input label="First Name" value={firstName} onChangeText={setFirstName} placeholder="First name" />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Last Name" value={lastName} onChangeText={setLastName} placeholder="Last name" />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Input
              label="Age"
              value={age}
              onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ""))}
              placeholder="e.g. 19"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>

          <Input
            label="Bio"
            value={bio}
            onChangeText={(t) => setBio(t.slice(0, 300))}
            placeholder="Tell others about yourself..."
            multiline
          />
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 12,
              color: Colors.onSurface.variant,
              textAlign: "right",
              marginTop: 4,
              marginBottom: 16,
            }}
          >
            {bio.length}/300
          </Text>

          {/* Academic Info */}
          <SectionHeader label="Academic Info" />

          {/* University Picker */}
          <DropdownField
            label="University"
            value={university || "Select university"}
            isPlaceholder={!university}
            isOpen={showUniPicker}
            onToggle={() => {
              setShowUniPicker(!showUniPicker);
              setShowDegreePicker(false);
              setShowMajorPicker(false);
            }}
          />
          {showUniPicker && (
            <PickerList
              items={universities}
              selected={university}
              onSelect={(u) => {
                setUniversity(u);
                setDegree("");
                setMajors([]);
                setShowUniPicker(false);
              }}
            />
          )}

          {/* Degree Picker */}
          <DropdownField
            label="Degree"
            value={degree || "Select degree"}
            isPlaceholder={!degree}
            isOpen={showDegreePicker}
            onToggle={() => {
              if (!university) {
                Alert.alert("Select University", "Please select a university first.");
                return;
              }
              setShowDegreePicker(!showDegreePicker);
              setShowUniPicker(false);
              setShowMajorPicker(false);
            }}
          />
          {showDegreePicker && (
            <>
              <View style={{ marginBottom: 8 }}>
                <Input
                  label=""
                  value={degreeSearch}
                  onChangeText={setDegreeSearch}
                  placeholder="Search or type a degree..."
                />
              </View>
              <PickerList
                items={filteredDegrees}
                selected={degree}
                onSelect={(d) => {
                  setDegree(d);
                  setMajors([]);
                  setDegreeSearch("");
                  setShowDegreePicker(false);
                }}
                customOption={
                  degreeSearch.trim().length > 0 && !degreesForUni.some(
                    (d) => d.toLowerCase() === degreeSearch.trim().toLowerCase()
                  )
                    ? `+ Add "${toTitleCase(degreeSearch)}"`
                    : undefined
                }
                onCustom={() => {
                  setDegree(toTitleCase(degreeSearch));
                  setMajors([]);
                  setDegreeSearch("");
                  setShowDegreePicker(false);
                }}
              />
            </>
          )}

          {/* Majors */}
          {degree.length > 0 && (
            <>
              <DropdownField
                label={`Majors (${majors.length}/3)`}
                value={majors.length > 0 ? majors.join(", ") : "Select majors"}
                isPlaceholder={majors.length === 0}
                isOpen={showMajorPicker}
                onToggle={() => {
                  setShowMajorPicker(!showMajorPicker);
                  setShowUniPicker(false);
                  setShowDegreePicker(false);
                }}
              />
              {showMajorPicker && (
                <View style={{ marginBottom: 16 }}>
                  {majors.length < 3 && (
                    <View style={{ marginBottom: 8 }}>
                      <Input
                        label=""
                        value={majorSearch}
                        onChangeText={setMajorSearch}
                        placeholder={majorsForDegree.length > 0 ? "Search or type a major..." : "Type your major..."}
                      />
                    </View>
                  )}
                  {filteredMajors.length > 0 && (
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 8,
                        paddingHorizontal: 4,
                      }}
                    >
                      {filteredMajors.map((m) => (
                        <Chip
                          key={m}
                          label={m}
                          selected={majors.includes(m)}
                          onPress={() => toggleMajor(m)}
                          onRemove={() => toggleMajor(m)}
                        />
                      ))}
                    </View>
                  )}
                  {majorSearch.trim().length > 0 && !majorsForDegree.some(
                    (m) => m.toLowerCase() === majorSearch.trim().toLowerCase()
                  ) && !majors.some(
                    (m) => m.toLowerCase() === toTitleCase(majorSearch).toLowerCase()
                  ) && majors.length < 3 && (
                    <Pressable
                      onPress={() => {
                        const normalized = toTitleCase(majorSearch);
                        toggleMajor(normalized);
                        setMajorSearch("");
                      }}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderRadius: 12,
                        backgroundColor: Colors.primary.DEFAULT + "14",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "WorkSans_600SemiBold",
                          fontSize: 14,
                          color: Colors.primary.DEFAULT,
                        }}
                      >
                        + Add "{toTitleCase(majorSearch)}"
                      </Text>
                    </Pressable>
                  )}
                  {majorsForDegree.length === 0 && majorSearch.length === 0 && majors.length === 0 && (
                    <Text
                      style={{
                        fontFamily: "WorkSans_400Regular",
                        fontSize: 12,
                        color: Colors.onSurface.variant + "99",
                      }}
                    >
                      No predefined majors — type to add your own
                    </Text>
                  )}
                </View>
              )}
            </>
          )}

          {/* Academic Year */}
          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 12,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: Colors.onSurface.variant,
              marginBottom: 8,
              marginTop: 8,
            }}
          >
            Academic Year
          </Text>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
            {ACADEMIC_YEARS.map((y) => (
              <Pressable
                key={y}
                onPress={() => setAcademicYear(y)}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 10,
                  alignItems: "center",
                  backgroundColor: academicYear === y ? Colors.primary.DEFAULT : Colors.surface.containerHigh,
                  borderWidth: 1,
                  borderColor: academicYear === y ? Colors.primary.DEFAULT : Colors.outline.variant + "4D",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Manrope_700Bold",
                    fontSize: 15,
                    color: academicYear === y ? Colors.onPrimary.DEFAULT : Colors.onSurface.DEFAULT,
                  }}
                >
                  Year {y}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* GPA */}
          <Input
            label="GPA Ranking (optional)"
            value={gpaRanking}
            onChangeText={setGpaRanking}
            placeholder="e.g. Top 10%"
          />
          <View style={{ height: 16 }} />

          {/* Active Courses */}
          <Input
            label="Active Courses (comma-separated)"
            value={activeCourses}
            onChangeText={setActiveCourses}
            placeholder="e.g. Machine Learning, Data Ethics"
            multiline
          />
          <View style={{ height: 24 }} />

          {/* Interests */}
          <SectionHeader label={`Interests (${interests.length}/8)`} />

          {/* Selected custom interests (not in predefined list) */}
          {interests.filter(
            (i) => !AVAILABLE_INTERESTS.some((a) => a.toLowerCase() === i.toLowerCase())
          ).length > 0 && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              {interests
                .filter((i) => !AVAILABLE_INTERESTS.some((a) => a.toLowerCase() === i.toLowerCase()))
                .map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    selected
                    onPress={() => toggleInterest(interest)}
                    onRemove={() => toggleInterest(interest)}
                  />
                ))}
            </View>
          )}

          {interests.length < 8 && (
            <View style={{ marginBottom: 12 }}>
              <Input
                label=""
                value={interestSearch}
                onChangeText={setInterestSearch}
                placeholder="Search or type a new interest..."
              />
            </View>
          )}

          {interestSearch.trim().length > 0 &&
            !AVAILABLE_INTERESTS.some(
              (i) => i.toLowerCase() === interestSearch.trim().toLowerCase()
            ) &&
            !interests.some(
              (i) => i.toLowerCase() === interestSearch.trim().toLowerCase()
            ) &&
            interests.length < 8 && (
              <Pressable
                onPress={() => {
                  toggleInterest(toTitleCase(interestSearch.trim()));
                  setInterestSearch("");
                }}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 12,
                  backgroundColor: Colors.primary.DEFAULT + "14",
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: "WorkSans_600SemiBold",
                    fontSize: 14,
                    color: Colors.primary.DEFAULT,
                  }}
                >
                  + Add "{toTitleCase(interestSearch.trim())}"
                </Text>
              </Pressable>
            )}

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {filteredInterests.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                selected={interests.some((i) => i.toLowerCase() === interest.toLowerCase())}
                onPress={() => toggleInterest(interest)}
                onRemove={() => toggleInterest(interest)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <Text
      style={{
        fontFamily: "Manrope_700Bold",
        fontSize: 16,
        color: Colors.onSurface.DEFAULT,
        marginBottom: 16,
        marginTop: 8,
      }}
    >
      {label}
    </Text>
  );
}

function DropdownField({
  label,
  value,
  isPlaceholder,
  isOpen,
  onToggle,
}: {
  label: string;
  value: string;
  isPlaceholder: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text
        style={{
          fontFamily: "WorkSans_600SemiBold",
          fontSize: 12,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: Colors.onSurface.variant,
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
      <Pressable
        onPress={onToggle}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderRadius: 12,
          backgroundColor: isOpen ? Colors.surface.containerLowest : Colors.surface.containerHigh,
          borderWidth: isOpen ? 1 : 0,
          borderColor: Colors.primary.DEFAULT + "66",
        }}
      >
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 15,
            color: isPlaceholder ? Colors.outline.DEFAULT : Colors.onSurface.DEFAULT,
            flex: 1,
          }}
          numberOfLines={2}
        >
          {value}
        </Text>
        <ChevronDown
          size={18}
          color={Colors.onSurface.variant}
          style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
        />
      </Pressable>
    </View>
  );
}

function PickerList({
  items,
  selected,
  onSelect,
  customOption,
  onCustom,
}: {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
  customOption?: string;
  onCustom?: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: Colors.surface.containerLow,
        borderRadius: 12,
        marginBottom: 16,
        maxHeight: 240,
        borderWidth: 1,
        borderColor: Colors.outline.variant + "33",
      }}
    >
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator keyboardShouldPersistTaps="handled">
        {items.map((item) => (
          <Pressable
            key={item}
            onPress={() => onSelect(item)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.outline.variant + "33",
              backgroundColor: item === selected ? Colors.primary.DEFAULT + "14" : "transparent",
            }}
          >
            <Text
              style={{
                fontFamily: item === selected ? "Manrope_700Bold" : "WorkSans_400Regular",
                fontSize: 15,
                color: item === selected ? Colors.primary.DEFAULT : Colors.onSurface.DEFAULT,
              }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
        {customOption && onCustom && (
          <Pressable
            onPress={onCustom}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.outline.variant + "33",
            }}
          >
            <Text
              style={{
                fontFamily: "WorkSans_600SemiBold",
                fontSize: 15,
                color: Colors.primary.DEFAULT,
              }}
            >
              {customOption}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}
