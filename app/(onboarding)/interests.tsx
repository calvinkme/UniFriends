import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";
import { ArrowLeft, X, Check } from "lucide-react-native";
import { Colors, toTitleCase } from "@/constants";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useOnboardingStore } from "@/stores";
import { AVAILABLE_INTERESTS } from "@/services/mockData";

const MIN_INTERESTS = 3;

export default function InterestsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { interests, toggleInterest } = useOnboardingStore();
  const [query, setQuery] = useState("");

  const canContinue = interests.length >= MIN_INTERESTS;

  // Filter predefined interests by search query
  const filteredInterests = useMemo(
    () =>
      query.trim().length > 0
        ? AVAILABLE_INTERESTS.filter((i) =>
            i.toLowerCase().includes(query.toLowerCase())
          )
        : AVAILABLE_INTERESTS,
    [query]
  );

  // Check if the typed query already exists in predefined or selected interests
  const queryMatchesExisting = useMemo(
    () =>
      AVAILABLE_INTERESTS.some(
        (i) => i.toLowerCase() === query.trim().toLowerCase()
      ) ||
      interests.some(
        (i) => i.toLowerCase() === query.trim().toLowerCase()
      ),
    [query, interests]
  );

  const isSelected = (interest: string) =>
    interests.some((i) => i.toLowerCase() === interest.toLowerCase());

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
    >
      <View className="flex-1" style={{ paddingTop: insets.top }}>
        <ProgressBar currentStep={4} totalSteps={5} />

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

      <View className="px-8 mb-2">
        <Text
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 28,
            letterSpacing: -0.5,
            color: Colors.onSurface.DEFAULT,
            marginBottom: 8,
          }}
        >
          Pick your interests
        </Text>
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 15,
            color: Colors.onSurface.variant,
            lineHeight: 22,
          }}
        >
          Choose at least {MIN_INTERESTS} or type your own
        </Text>
        <Text
          style={{
            fontFamily: "WorkSans_600SemiBold",
            fontSize: 13,
            color: canContinue ? Colors.secondary.DEFAULT : Colors.primary.DEFAULT,
            marginTop: 8,
          }}
        >
          {interests.length} selected{!canContinue && ` · ${MIN_INTERESTS - interests.length} more needed`}
        </Text>
      </View>

      {/* Selected chips */}
      {interests.length > 0 && (
        <View className="px-8 mb-3">
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {interests.map((interest) => (
              <View
                key={interest}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: Colors.tertiary.container,
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
                    color: Colors.onTertiary.container,
                  }}
                  numberOfLines={1}
                >
                  {interest}
                </Text>
                <Pressable
                  onPress={() => toggleInterest(interest)}
                  hitSlop={8}
                  style={{
                    marginLeft: 6,
                    padding: 4,
                    borderRadius: 12,
                    backgroundColor: Colors.onTertiary.container + "1A",
                  }}
                >
                  <X size={14} color={Colors.onTertiary.container} />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Search input */}
      <View className="px-8 mb-3">
        <Input
          label=""
          value={query}
          onChangeText={setQuery}
          placeholder="Search or type a new interest..."
        />
      </View>

      <ScrollView
        className="flex-1 px-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 140, 140) }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        automaticallyAdjustKeyboardInsets
      >
        {/* Custom add option */}
        {query.trim().length > 0 && !queryMatchesExisting && (
          <Pressable
            onPress={() => {
              toggleInterest(toTitleCase(query.trim()));
              setQuery("");
            }}
            className="mb-3 px-4 py-3 rounded-xl flex-row items-center gap-2 active:scale-[0.98]"
            style={{
              backgroundColor: Colors.primary.DEFAULT + "14",
              borderWidth: 1,
              borderColor: Colors.primary.DEFAULT + "33",
            }}
          >
            <Text
              style={{
                fontFamily: "WorkSans_600SemiBold",
                fontSize: 14,
                color: Colors.primary.DEFAULT,
              }}
            >
              + Add "{toTitleCase(query.trim())}"
            </Text>
          </Pressable>
        )}

        <View className="flex-row flex-wrap gap-2.5">
          {filteredInterests.map((interest) => {
            const selected = isSelected(interest);
            return (
              <Pressable
                key={interest}
                onPress={() => toggleInterest(interest)}
                className="px-4 py-2.5 rounded-full flex-row items-center gap-1.5 active:scale-[0.97]"
                style={{
                  backgroundColor: selected
                    ? Colors.tertiary.container
                    : Colors.surface.containerHigh,
                  borderWidth: selected ? 0 : 1,
                  borderColor: Colors.outline.variant + "33",
                }}
              >
                <Text
                  style={{
                    fontFamily: "WorkSans_500Medium",
                    fontSize: 14,
                    color: selected
                      ? Colors.onTertiary.container
                      : Colors.onSurface.variant,
                  }}
                >
                  {interest}
                </Text>
                {selected && <X size={14} color={Colors.onTertiary.container} />}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

        <View className="px-8" style={{ paddingBottom: insets.bottom + 24 }}>
          <Button
            label="Continue"
            onPress={() => router.push("/(onboarding)/bio")}
            fullWidth
            disabled={!canContinue}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
