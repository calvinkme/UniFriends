import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="name" />
      <Stack.Screen name="university" />
      <Stack.Screen name="year" />
      <Stack.Screen name="interests" />
      <Stack.Screen name="bio" />
    </Stack>
  );
}
