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
import * as Linking from "expo-linking";
import { Colors } from "@/constants";
import { supabase } from "@/services/supabase";
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

  const { session, profile, isLoading, isPasswordRecovery, initialize } = useAuthStore();
  const { setPushToken } = useSettingsStore();
  const { loadConversations } = useConnectionStore();
  const [authInitialized, setAuthInitialized] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  const notificationListener = useRef<EventSubscription | null>(null);
  const responseListener = useRef<EventSubscription | null>(null);
  const processedUrl = useRef<string | null>(null);

  // Global Realtime listener for messages in non-active conversations
  useRealtimeAllMessages();

  // Initialize auth on mount
  useEffect(() => {
    initialize().then(() => setAuthInitialized(true));
  }, []);

  // Handle deep links for password recovery
  useEffect(() => {
    if (!authInitialized) return;

    function handleDeepLink(url: string | null) {
      if (!url || url === processedUrl.current) return;

      const hashIndex = url.indexOf("#");
      if (hashIndex === -1) return;

      const params = new URLSearchParams(url.substring(hashIndex + 1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        processedUrl.current = url;
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }
    }

    Linking.getInitialURL().then(handleDeepLink);
    const subscription = Linking.addEventListener("url", (event) =>
      handleDeepLink(event.url),
    );

    return () => subscription.remove();
  }, [authInitialized]);

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

    addNotificationReceivedListener(
      (_notification: Notification) => {},
    ).then((sub) => {
      notificationListener.current = sub as EventSubscription;
    });

    addNotificationResponseReceivedListener(
      (response: NotificationResponse) => {
        const data = response.notification.request.content.data;

        if (data?.type === "message" && data.conversationId) {
          const userId = (data.conversationId as string).replace("convo-", "");
          router.push(`/chat/${userId}`);
        } else if (data?.type === "connection_request" || data?.type === "match") {
          router.push("/(tabs)/connections");
        }
      },
    ).then((sub) => {
      responseListener.current = sub as EventSubscription;
    });

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
    } else if (isPasswordRecovery) {
      setTimeout(() => router.replace("/change-password"), 0);
    } else {
      if (inAuthGroup || inOnboardingGroup) {
        setTimeout(() => router.replace("/(tabs)/main"), 0);
      }
    }
  }, [session, profile, isLoading, authInitialized, segments, isPasswordRecovery]);

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
        <Stack.Screen name="change-password" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="terms" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="privacy" options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="licences" options={{ animation: "slide_from_right" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
