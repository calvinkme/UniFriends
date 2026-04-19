import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Colors } from "@/constants";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useOnboardingStore } from "@/stores";

const YEARS = [
  { value: 1 as const, label: "1st Year", subtitle: "Freshman" },
  { value: 2 as const, label: "2nd Year", subtitle: "Sophomore" },
  { value: 3 as const, label: "3rd Year", subtitle: "Junior" },
  { value: 4 as const, label: "4th Year", subtitle: "Senior" },
];

export default function YearScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { academicYear, setAcademicYear } = useOnboardingStore();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ProgressBar currentStep={3} totalSteps={5} />

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

      <View className="flex-1 px-8">
        <Text
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 28,
            letterSpacing: -0.5,
            color: Colors.onSurface.DEFAULT,
            marginBottom: 8,
          }}
        >
          What year are you in?
        </Text>
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 15,
            color: Colors.onSurface.variant,
            lineHeight: 22,
            marginBottom: 32,
          }}
        >
          We'll help you find students in similar stages
        </Text>

        <View className="gap-3">
          {YEARS.map((year) => {
            const selected = academicYear === year.value;
            return (
              <Pressable
                key={year.value}
                onPress={() => setAcademicYear(year.value)}
                className="h-20 rounded-xl flex-row items-center px-6 active:scale-[0.98]"
                style={{
                  backgroundColor: selected
                    ? Colors.primary.DEFAULT
                    : Colors.surface.containerLow,
                  borderWidth: selected ? 0 : 1,
                  borderColor: Colors.outline.variant + "4D",
                }}
              >
                <View className="flex-1">
                  <Text
                    style={{
                      fontFamily: "Manrope_700Bold",
                      fontSize: 18,
                      color: selected
                        ? Colors.onPrimary.DEFAULT
                        : Colors.onSurface.DEFAULT,
                    }}
                  >
                    {year.label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "WorkSans_400Regular",
                      fontSize: 13,
                      color: selected
                        ? Colors.onPrimary.DEFAULT + "CC"
                        : Colors.onSurface.variant,
                      marginTop: 2,
                    }}
                  >
                    {year.subtitle}
                  </Text>
                </View>
                {selected && (
                  <View
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: Colors.onPrimary.DEFAULT + "33" }}
                  >
                    <Text style={{ color: Colors.onPrimary.DEFAULT, fontSize: 16 }}>✓</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="px-8" style={{ paddingBottom: insets.bottom + 24 }}>
        <Button
          label="Continue"
          onPress={() => router.push("/(onboarding)/interests")}
          fullWidth
          disabled={!academicYear}
        />
      </View>
    </View>
  );
}
