import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "@/constants";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useOnboardingStore } from "@/stores";

export default function NameScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { firstName, lastName, age, setFirstName, setLastName, setAge } = useOnboardingStore();

  const parsedAge = parseInt(age, 10);
  const validAge = !isNaN(parsedAge) && parsedAge >= 16 && parsedAge <= 99;
  const canContinue = firstName.trim().length >= 2 && lastName.trim().length >= 2 && validAge;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
    >
      <View className="flex-1" style={{ paddingTop: insets.top }}>
        <ProgressBar currentStep={1} totalSteps={5} />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 32,
            paddingTop: 32,
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
            What's your name?
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
            This is how other students will see you
          </Text>

          <View className="gap-4">
            <Input
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="e.g. Alex"
            />
            <Input
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
              placeholder="e.g. Thompson"
            />
            <Input
              label="Age"
              value={age}
              onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ""))}
              placeholder="e.g. 19"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
        </ScrollView>

        <View className="px-8" style={{ paddingBottom: insets.bottom + 24 }}>
          <Button
            label="Continue"
            onPress={() => router.push("/(onboarding)/university")}
            fullWidth
            disabled={!canContinue}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
