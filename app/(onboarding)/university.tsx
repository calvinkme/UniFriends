import { View, Text, Pressable, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useCallback, useMemo } from "react";
import { ArrowLeft, Check, ChevronDown, X } from "lucide-react-native";
import { Colors, getUniversityData, toTitleCase } from "@/constants";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useOnboardingStore } from "@/stores";
import { searchUniversities, isInSystemUniversity } from "@/services/universities";

export default function UniversityScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    university,
    degree,
    majors,
    setUniversity,
    setDegree,
    toggleMajor,
    clearMajors,
  } = useOnboardingStore();
  const [uniQuery, setUniQuery] = useState(university);
  const [degreeQuery, setDegreeQuery] = useState(degree);
  const [majorQuery, setMajorQuery] = useState("");
  const [uniSuggestions, setUniSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDegreePicker, setShowDegreePicker] = useState(!!university);
  const [showMajorPicker, setShowMajorPicker] = useState(!!degree);
  const [degreeConfirmed, setDegreeConfirmed] = useState(!!degree);

  // Get available degrees for selected university
  const uniData = useMemo(() => getUniversityData(university), [university]);
  const availableDegrees = useMemo(
    () => uniData?.map((d) => d.degree) || [],
    [uniData]
  );

  // Filter degrees by search query
  const filteredDegrees = useMemo(
    () =>
      availableDegrees.filter((d) =>
        d.toLowerCase().includes(degreeQuery.toLowerCase())
      ),
    [availableDegrees, degreeQuery]
  );

  // Get majors for selected degree
  const degreeMajors = useMemo(
    () =>
      uniData?.find((d) => d.degree.toLowerCase() === degree.toLowerCase())?.majors ||
      [],
    [uniData, degree]
  );

  // Filter majors by search query
  const filteredMajors = useMemo(
    () =>
      degreeMajors.filter((m) =>
        m.toLowerCase().includes(majorQuery.toLowerCase())
      ),
    [degreeMajors, majorQuery]
  );

  const hasMajors = degreeMajors.length > 0;
  const canContinue = university.length > 0 && degree.length > 0;

  const handleUniSearch = useCallback(async (query: string) => {
    setUniQuery(query);
    if (query.length < 2) {
      setUniSuggestions([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchUniversities(query);
      setUniSuggestions(results);
    } catch {
      setUniSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const selectUniversity = (name: string) => {
    setUniversity(name);
    setUniQuery(name);
    setDegree("");
    clearMajors();
    setDegreeQuery("");
    setMajorQuery("");
    setUniSuggestions([]);
    setShowDegreePicker(true);
    setDegreeConfirmed(false);
  };

  const selectDegree = (degreeSelected: string) => {
    setDegree(degreeSelected);
    setDegreeQuery(degreeSelected);
    clearMajors();
    setMajorQuery("");
    setDegreeConfirmed(true);
    setShowMajorPicker(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
    >
      <View className="flex-1" style={{ paddingTop: insets.top }}>
        <ProgressBar currentStep={2} totalSteps={5} />

        {/* Header */}
        <View className="flex-row items-center px-4 h-12">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
            hitSlop={8}
          >
            <ArrowLeft size={22} color={Colors.onSurface.DEFAULT} />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 32,
            paddingBottom: Math.max(insets.bottom + 140, 140),
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
          automaticallyAdjustKeyboardInsets
        >
        <Text
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 28,
            letterSpacing: -0.5,
            color: Colors.onSurface.DEFAULT,
            marginBottom: 8,
          }}
        >
          Your university
        </Text>
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 15,
            color: Colors.onSurface.variant,
            lineHeight: 22,
            marginBottom: 24,
          }}
        >
          We'll connect you with students nearby
        </Text>

        {/* University search */}
        <Input
          label="University"
          value={uniQuery}
          onChangeText={handleUniSearch}
          placeholder="Search your university..."
        />

        {isSearching && (
          <ActivityIndicator
            size="small"
            color={Colors.primary.DEFAULT}
            style={{ marginTop: 8 }}
          />
        )}

        {uniSuggestions.length > 0 && (
          <View
            className="mt-2 rounded-xl overflow-hidden"
            style={{
              maxHeight: 200,
              borderWidth: 1,
              borderColor: Colors.outline.variant + "4D",
              backgroundColor: Colors.surface.containerLow,
            }}
          >
            <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
              {uniSuggestions.map((item) => {
                const inSystem = isInSystemUniversity(item);
                return (
                  <Pressable
                    key={item}
                    onPress={() => selectUniversity(item)}
                    className="px-4 py-3 flex-row items-center justify-between active:bg-surface-container-high"
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: Colors.outline.variant + "33",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "WorkSans_400Regular",
                        fontSize: 14,
                        color: Colors.onSurface.DEFAULT,
                        flex: 1,
                      }}
                      numberOfLines={1}
                    >
                      {item}
                    </Text>
                    {inSystem && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                          marginLeft: 8,
                        }}
                      >
                        <Check size={13} color={Colors.primary.DEFAULT} />
                        <Text
                          style={{
                            fontFamily: "WorkSans_500Medium",
                            fontSize: 11,
                            color: Colors.primary.DEFAULT,
                          }}
                        >
                          Degrees
                        </Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Degree selection */}
        {showDegreePicker && (
          <View className="mt-6">
            <Text
              style={{
                fontFamily: "WorkSans_600SemiBold",
                fontSize: 12,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: Colors.onSurface.variant,
                marginBottom: 12,
              }}
            >
              Degree
            </Text>

            {degreeConfirmed ? (
              <Pressable
                onPress={() => {
                  setDegreeConfirmed(false);
                  setDegreeQuery(degree);
                }}
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
                    fontFamily: "WorkSans_500Medium",
                    fontSize: 14,
                    color: Colors.onSurface.DEFAULT,
                    flex: 1,
                  }}
                  numberOfLines={1}
                >
                  {degree}
                </Text>
                <ChevronDown size={18} color={Colors.onSurface.variant} />
              </Pressable>
            ) : (
              <>
                <Input
                  label=""
                  value={degreeQuery}
                  onChangeText={(text) => {
                    setDegreeQuery(text);
                    setDegreeConfirmed(false);
                  }}
                  placeholder="Search degree..."
                />
                {(filteredDegrees.length > 0 || (degreeQuery.trim().length > 0 && !availableDegrees.some(
                  (d) => d.toLowerCase() === degreeQuery.trim().toLowerCase()
                ))) && (
                  <View
                    className="mt-2 rounded-xl overflow-hidden"
                    style={{
                      maxHeight: 200,
                      borderWidth: 1,
                      borderColor: Colors.outline.variant + "4D",
                      backgroundColor: Colors.surface.containerLow,
                    }}
                  >
                    <ScrollView
                      nestedScrollEnabled
                      keyboardShouldPersistTaps="handled"
                    >
                      {filteredDegrees.map((deg, idx) => (
                        <Pressable
                          key={`${deg}-${idx}`}
                          onPress={() => selectDegree(deg)}
                          className="px-4 py-3 flex-row items-center justify-between active:bg-surface-container-high"
                          style={{
                            borderBottomWidth: 0.5,
                            borderBottomColor: Colors.outline.variant + "33",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "WorkSans_400Regular",
                              fontSize: 14,
                              color: Colors.onSurface.DEFAULT,
                            }}
                            numberOfLines={1}
                          >
                            {deg}
                          </Text>
                          {degree === deg && (
                            <Check size={18} color={Colors.primary.DEFAULT} />
                          )}
                        </Pressable>
                      ))}
                      {degreeQuery.trim().length > 0 && !availableDegrees.some(
                        (d) => d.toLowerCase() === degreeQuery.trim().toLowerCase()
                      ) && (
                        <Pressable
                          onPress={() => selectDegree(toTitleCase(degreeQuery))}
                          className="px-4 py-3 flex-row items-center gap-2 active:bg-surface-container-high"
                          style={{
                            borderBottomWidth: 0.5,
                            borderBottomColor: Colors.outline.variant + "33",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "WorkSans_600SemiBold",
                              fontSize: 14,
                              color: Colors.primary.DEFAULT,
                            }}
                          >
                            + Add "{toTitleCase(degreeQuery)}"
                          </Text>
                        </Pressable>
                      )}
                    </ScrollView>
                  </View>
                )}
              </>
            )}
          </View>
        )}

        {/* Majors / Minors selection */}
        {showMajorPicker && degreeConfirmed && (
          <View className="mt-6">
            <Text
              style={{
                fontFamily: "WorkSans_600SemiBold",
                fontSize: 12,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: Colors.onSurface.variant,
                marginBottom: 4,
              }}
            >
              Majors / Minors
            </Text>
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                fontSize: 12,
                color: Colors.onSurface.variant + "99",
                marginBottom: 12,
              }}
            >
              Select up to 2
            </Text>

            {/* Selected chips */}
            {majors.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                {majors.map((m) => (
                  <View
                    key={m}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: Colors.primary.DEFAULT + "1A",
                      borderRadius: 20,
                      paddingLeft: 14,
                      paddingRight: 6,
                      paddingVertical: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "WorkSans_500Medium",
                        fontSize: 13,
                        color: Colors.primary.DEFAULT,
                      }}
                      numberOfLines={1}
                    >
                      {m}
                    </Text>
                    <Pressable
                      onPress={() => toggleMajor(m)}
                      hitSlop={8}
                      style={{
                        marginLeft: 6,
                        padding: 4,
                        borderRadius: 12,
                        backgroundColor: Colors.primary.DEFAULT + "1A",
                      }}
                    >
                      <X size={14} color={Colors.primary.DEFAULT} />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}

            {/* Search + list */}
            {majors.length < 2 && (
              <Input
                label=""
                value={majorQuery}
                onChangeText={setMajorQuery}
                placeholder={hasMajors ? "Search major or minor..." : "Type your major..."}
              />
            )}
            {majors.length < 2 && (filteredMajors.length > 0 || (majorQuery.trim().length > 0 && !degreeMajors.some(
              (m) => m.toLowerCase() === majorQuery.trim().toLowerCase()
            ))) && (
              <View
                className="mt-2 rounded-xl overflow-hidden"
                style={{
                  maxHeight: 200,
                  borderWidth: 1,
                  borderColor: Colors.outline.variant + "4D",
                  backgroundColor: Colors.surface.containerLow,
                }}
              >
                <ScrollView
                  nestedScrollEnabled
                  keyboardShouldPersistTaps="handled"
                >
                  {filteredMajors.map((maj) => (
                    <Pressable
                      key={maj}
                      onPress={() => { toggleMajor(maj); setMajorQuery(""); }}
                      className="px-4 py-3 flex-row items-center justify-between active:bg-surface-container-high"
                      style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: Colors.outline.variant + "33",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "WorkSans_400Regular",
                          fontSize: 14,
                          color: majors.includes(maj)
                            ? Colors.primary.DEFAULT
                            : Colors.onSurface.DEFAULT,
                        }}
                        numberOfLines={1}
                      >
                        {maj}
                      </Text>
                      {majors.includes(maj) && (
                        <Check size={18} color={Colors.primary.DEFAULT} />
                      )}
                    </Pressable>
                  ))}
                  {majorQuery.trim().length > 0 && !degreeMajors.some(
                    (m) => m.toLowerCase() === majorQuery.trim().toLowerCase()
                  ) && !majors.some(
                    (m) => m.toLowerCase() === toTitleCase(majorQuery).toLowerCase()
                  ) && (
                    <Pressable
                      onPress={() => {
                        const normalized = toTitleCase(majorQuery);
                        toggleMajor(normalized);
                        setMajorQuery("");
                      }}
                      className="px-4 py-3 flex-row items-center gap-2 active:bg-surface-container-high"
                      style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: Colors.outline.variant + "33",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "WorkSans_600SemiBold",
                          fontSize: 14,
                          color: Colors.primary.DEFAULT,
                        }}
                      >
                        + Add "{toTitleCase(majorQuery)}"
                      </Text>
                    </Pressable>
                  )}
                </ScrollView>
              </View>
            )}

            {!hasMajors && majorQuery.length === 0 && majors.length === 0 && (
              <Text
                style={{
                  fontFamily: "WorkSans_400Regular",
                  fontSize: 12,
                  color: Colors.onSurface.variant + "99",
                  marginTop: 4,
                }}
              >
                No predefined majors — type to add your own (optional)
              </Text>
            )}
          </View>
        )}
      </ScrollView>

        <View className="px-8" style={{ paddingBottom: insets.bottom + 24 }}>
          <Button
            label="Continue"
            onPress={() => router.push("/(onboarding)/year")}
            fullWidth
            disabled={!canContinue}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
