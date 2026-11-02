import { View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Mail } from "lucide-react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants";
import Animated, { FadeInUp } from "react-native-reanimated";
import { signInWithGoogle } from "@/services/auth";
import { useAuthStore } from "@/stores";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { initialize } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      await initialize();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Please try again.";
      Alert.alert("Login Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      className="flex-1 bg-background px-8"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 24 }}
    >
      {/* Top spacer + branding */}
      <View className="flex-1 items-center justify-center">
        <Animated.View entering={FadeInUp.duration(600).delay(100)}>
          <Image
            source={require("@/brand_assets/logo.png")}
            style={{ width: 96, height: 96, borderRadius: 24, marginBottom: 20 }}
            contentFit="contain"
          />
        </Animated.View>
        <Animated.Text
          entering={FadeInUp.duration(600).delay(200)}
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 32,
            letterSpacing: -0.5,
            color: Colors.onSurface.DEFAULT,
          }}
        >
          UniFriends
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.duration(600).delay(300)}
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 16,
            color: Colors.onSurface.variant,
            marginTop: 8,
            textAlign: "center",
            lineHeight: 24,
          }}
        >
          Find your university crew
        </Animated.Text>
      </View>

      {/* Auth buttons */}
      <View className="gap-3 mb-4">
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={Colors.primary.DEFAULT}
            style={{ marginBottom: 8 }}
          />
        )}

        <Pressable
          onPress={handleGoogleSignIn}
          disabled={isLoading}
          className="h-14 rounded-xl flex-row items-center justify-center gap-3 bg-surface-container-lowest active:scale-[0.98]"
          style={{
            borderWidth: 1,
            borderColor: Colors.outline.variant + "66",
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 20 }}>G</Text>
          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 15,
              color: Colors.onSurface.DEFAULT,
            }}
          >
            Continue with Google
          </Text>
        </Pressable>

        {/* Divider */}
        <View className="flex-row items-center gap-4 my-2">
          <View className="flex-1 h-px bg-outline-variant/30" />
          <Text
            style={{
              fontFamily: "WorkSans_500Medium",
              fontSize: 12,
              color: Colors.onSurface.variant,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            or
          </Text>
          <View className="flex-1 h-px bg-outline-variant/30" />
        </View>

        <Pressable
          onPress={() => router.push("/(auth)/email")}
          disabled={isLoading}
          className="h-14 rounded-xl flex-row items-center justify-center gap-3 bg-primary active:scale-[0.98]"
          style={{ opacity: isLoading ? 0.5 : 1 }}
        >
          <Mail size={18} color={Colors.onPrimary.DEFAULT} />
          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 15,
              color: Colors.onPrimary.DEFAULT,
            }}
          >
            Continue with Email
          </Text>
        </Pressable>
      </View>

      {/* Footer */}
      <Text
        style={{
          fontFamily: "WorkSans_400Regular",
          fontSize: 12,
          color: Colors.onSurface.variant + "99",
          textAlign: "center",
          lineHeight: 18,
        }}
      >
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );
}
