import { View, Text, Pressable, Modal, ScrollView, TextInput } from "react-native";
import { X, ChevronDown } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Colors } from "@/constants";
import { UNIVERSITIES_DATA } from "@/constants/degrees";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { useFilterStore } from "@/stores";
import { AVAILABLE_INTERESTS, AVAILABLE_DEGREES } from "@/services/mockData";

const UNIVERSITY_NAMES = Object.keys(UNIVERSITIES_DATA);

type FilterSheetProps = {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
};

export function FilterSheet({ visible, onClose, onApply }: FilterSheetProps) {
  const {
    university,
    fieldOfStudy,
    major,
    academicYear,
    interests,
    setUniversity,
    setFieldOfStudy,
    setMajor,
    setAcademicYear,
    toggleInterest,
    resetFilters,
  } = useFilterStore();

  const [showUniDropdown, setShowUniDropdown] = useState(false);
  const [showDegreeDropdown, setShowDegreeDropdown] = useState(false);
  const yearLabels = ["Freshman", "Sophomore", "Junior", "Senior"];

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

  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleReset = () => {
    resetFilters();
    onApply();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}>
        <Pressable style={{ flex: 0.15 }} onPress={onClose} />
        <View
          style={{
            flex: 0.85,
            backgroundColor: Colors.background,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        >
          {/* Handle bar */}
          <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 8 }}>
            <View
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: Colors.outline.variant,
              }}
            />
          </View>

          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 24,
              paddingBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Manrope_800ExtraBold",
                fontSize: 22,
                letterSpacing: -0.3,
                color: Colors.onSurface.DEFAULT,
              }}
            >
              Filters
            </Text>
            <Pressable
              onPress={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.surface.containerHigh,
              }}
              hitSlop={8}
            >
              <X size={18} color={Colors.onSurface.variant} />
            </Pressable>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          >
            {/* University */}
            <View style={{ marginBottom: 28 }}>
              <Text
                style={{
                  fontFamily: "Manrope_700Bold",
                  fontSize: 16,
                  color: Colors.onSurface.DEFAULT,
                  marginBottom: 12,
                }}
              >
                University
              </Text>
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
                    fontSize: 15,
                    color: university ? Colors.onSurface.DEFAULT : Colors.onSurface.variant,
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
                    <X size={16} color={Colors.onSurface.variant} />
                  </Pressable>
                ) : (
                  <ChevronDown size={18} color={Colors.onSurface.variant} />
                )}
              </Pressable>
              {showUniDropdown && (
                <ScrollView
                  style={{
                    maxHeight: 200,
                    backgroundColor: Colors.surface.containerHigh,
                    borderRadius: 12,
                    marginTop: 8,
                  }}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                >
                  <Pressable
                    onPress={() => { setUniversity(null); setShowUniDropdown(false); }}
                    style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                  >
                    <Text
                      style={{
                        fontFamily: "WorkSans_400Regular",
                        fontSize: 14,
                        color: !university ? Colors.primary.DEFAULT : Colors.onSurface.DEFAULT,
                      }}
                    >
                      All Universities
                    </Text>
                  </Pressable>
                  {UNIVERSITY_NAMES.map((uni) => (
                    <Pressable
                      key={uni}
                      onPress={() => { setUniversity(uni); setShowUniDropdown(false); }}
                      style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                    >
                      <Text
                        style={{
                          fontFamily: "WorkSans_400Regular",
                          fontSize: 14,
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
            <View style={{ marginBottom: 28 }}>
              <Text
                style={{
                  fontFamily: "Manrope_700Bold",
                  fontSize: 16,
                  color: Colors.onSurface.DEFAULT,
                  marginBottom: 12,
                }}
              >
                Degree Program
              </Text>
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
                    fontSize: 15,
                    color: fieldOfStudy ? Colors.onSurface.DEFAULT : Colors.onSurface.variant,
                    flex: 1,
                  }}
                  numberOfLines={1}
                >
                  {fieldOfStudy ?? "All Fields"}
                </Text>
                <ChevronDown size={18} color={Colors.onSurface.variant} />
              </Pressable>
              {showDegreeDropdown && (
                <ScrollView
                  style={{
                    maxHeight: 200,
                    backgroundColor: Colors.surface.containerHigh,
                    borderRadius: 12,
                    marginTop: 8,
                  }}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                >
                  <Pressable
                    onPress={() => { setFieldOfStudy(null); setShowDegreeDropdown(false); }}
                    style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                  >
                    <Text
                      style={{
                        fontFamily: "WorkSans_400Regular",
                        fontSize: 14,
                        color: !fieldOfStudy ? Colors.primary.DEFAULT : Colors.onSurface.DEFAULT,
                      }}
                    >
                      All Fields
                    </Text>
                  </Pressable>
                  {degreeOptions.map((degree) => (
                    <Pressable
                      key={degree}
                      onPress={() => { setFieldOfStudy(degree); setShowDegreeDropdown(false); }}
                      style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                    >
                      <Text
                        style={{
                          fontFamily: "WorkSans_400Regular",
                          fontSize: 14,
                          color: fieldOfStudy === degree ? Colors.primary.DEFAULT : Colors.onSurface.DEFAULT,
                        }}
                        numberOfLines={1}
                      >
                        {degree}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Major */}
            <View style={{ marginBottom: 28 }}>
              <Text
                style={{
                  fontFamily: "Manrope_700Bold",
                  fontSize: 16,
                  color: Colors.onSurface.DEFAULT,
                  marginBottom: 12,
                }}
              >
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
                    fontSize: 15,
                    color: Colors.onSurface.DEFAULT,
                  }}
                />
              )}
            </View>

            {/* Academic Year */}
            <View style={{ marginBottom: 28 }}>
              <Text
                style={{
                  fontFamily: "Manrope_700Bold",
                  fontSize: 16,
                  color: Colors.onSurface.DEFAULT,
                  marginBottom: 12,
                }}
              >
                Academic Year
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {[1, 2, 3, 4].map((year) => {
                  const isSelected = academicYear === year;
                  return (
                    <Pressable
                      key={year}
                      onPress={() => setAcademicYear(year)}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 14,
                        borderRadius: 12,
                        backgroundColor: isSelected
                          ? Colors.primary.DEFAULT
                          : Colors.surface.containerLow,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "WorkSans_600SemiBold",
                          fontSize: 16,
                          color: isSelected ? Colors.onPrimary.DEFAULT : Colors.onSurface.variant,
                        }}
                      >
                        {year}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "WorkSans_500Medium",
                          fontSize: 8,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          marginTop: 2,
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
            <View style={{ marginBottom: 28 }}>
              <Text
                style={{
                  fontFamily: "Manrope_700Bold",
                  fontSize: 16,
                  color: Colors.onSurface.DEFAULT,
                  marginBottom: 12,
                }}
              >
                Interests
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {AVAILABLE_INTERESTS.slice(0, 15).map((interest) => (
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
          </ScrollView>

          {/* Footer Buttons */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              paddingHorizontal: 24,
              paddingTop: 12,
              paddingBottom: 32,
              borderTopWidth: 1,
              borderTopColor: Colors.outline.variant + "1A",
            }}
          >
            <View style={{ flex: 1 }}>
              <Button label="Reset" onPress={handleReset} variant="surface" fullWidth />
            </View>
            <View style={{ flex: 1 }}>
              <Button label="Apply Filters" onPress={handleApply} fullWidth />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
