import "../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import {
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
} from "@expo-google-fonts/work-sans";
import { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { Colors } from "@/constants";
import { useAuthStore, useSettingsStore, useConnectionStore } from "@/stores";
import { useRealtimeAllMessages } from "@/hooks/useRealtimeMessages";
import { savePushToken } from "@/services/database";
import {
  registerForPushNotifications,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
} from "@/services/notifications";
import type { Notification, NotificationResponse, EventSubscription } from "@/services/notifications";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
  });

  const { session, profile, isLoading, initialize } = useAuthStore();
  const { setPushToken } = useSettingsStore();
  const { loadConversations } = useConnectionStore();
  const [authInitialized, setAuthInitialized] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  const notificationListener = useRef<EventSubscription | null>(null);
  const responseListener = useRef<EventSubscription | null>(null);

  // Global Realtime listener for messages in non-active conversations
  useRealtimeAllMessages();

  // Initialize auth on mount
  useEffect(() => {
    initialize().then(() => setAuthInitialized(true));
  }, []);

  // Load Supabase conversations once authenticated with a profile
  useEffect(() => {
    if (authInitialized && session && profile) {
      loadConversations();
    }
  }, [authInitialized, session, profile]);

  // Register push notifications after auth is ready
  useEffect(() => {
    if (!authInitialized || !session) return;

    registerForPushNotifications().then((token) => {
      if (token) {
        setPushToken(token);
        // Save token to Supabase for cross-device push notifications
        const platform = Platform.OS === "ios" ? "ios" : Platform.OS === "android" ? "android" : "web";
        savePushToken(session.user.id, token, platform);
      }
    });

    // Listen for incoming notifications while app is open
    notificationListener.current = addNotificationReceivedListener(
      (_notification: Notification) => {
        // Notification received in foreground — the handler config
        // in notifications.ts controls whether it shows an alert
      },
    );

    // Listen for user tapping on a notification
    responseListener.current = addNotificationResponseReceivedListener(
      (response: NotificationResponse) => {
        const data = response.notification.request.content.data;

        if (data?.type === "message" && data.conversationId) {
          // Navigate to the chat screen
          // Extract userId from conversationId (format: "convo-{userId}")
          const userId = (data.conversationId as string).replace("convo-", "");
          router.push(`/chat/${userId}`);
        } else if (data?.type === "connection_request" || data?.type === "match") {
          // Navigate to connections tab
          router.push("/(tabs)/connections");
        }
      },
    );

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [authInitialized, session]);

  // Hide splash when both fonts and auth are ready
  useEffect(() => {
    if ((fontsLoaded || fontError) && authInitialized) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, authInitialized]);

  // Auth-based routing
  useEffect(() => {
    if (!authInitialized || isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboardingGroup = segments[0] === "(onboarding)";

    if (!session) {
      if (!inAuthGroup) {
        setTimeout(() => router.replace("/(auth)/login"), 0);
      }
    } else if (!profile) {
      if (!inOnboardingGroup) {
        setTimeout(() => router.replace("/(onboarding)/name"), 0);
      }
    } else {
      if (inAuthGroup || inOnboardingGroup) {
        setTimeout(() => router.replace("/(tabs)/main"), 0);
      }
    }
  }, [session, profile, isLoading, authInitialized, segments]);

  if ((!fontsLoaded && !fontError) || !authInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary.DEFAULT} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="edit-profile" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="settings" options={{ animation: "slide_from_right" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
