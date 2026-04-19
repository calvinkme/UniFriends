import { View, Text, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react-native";
import { Colors } from "@/constants";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signIn, signUp } from "@/services/auth";
import { useAuthStore } from "@/stores";

function PasswordRule({ label, met }: { label: string; met: boolean }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      {met ? (
        <Check size={14} color={Colors.secondary.DEFAULT} />
      ) : (
        <X size={14} color={Colors.onSurface.variant} />
      )}
      <Text
        style={{
          fontFamily: "WorkSans_400Regular",
          fontSize: 12,
          color: met ? Colors.secondary.DEFAULT : Colors.onSurface.variant,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function EmailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { initialize } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (pw: string): string | null => {
    if (pw.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(pw)) return "Password must contain at least one capital letter.";
    if (!/[0-9]/.test(pw)) return "Password must contain at least one number.";
    return null;
  };

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    if (isSignUp) {
      const pwError = validatePassword(password);
      if (pwError) {
        Alert.alert("Weak Password", pwError);
        return;
      }
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp(email.trim(), password);
        // Navigate to verification screen after sign-up
        router.replace({ pathname: "/(auth)/verify", params: { email: email.trim() } });
        return;
      } else {
        await signIn(email.trim(), password);
      }
      await initialize();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Please try again.";
      Alert.alert(isSignUp ? "Sign Up Failed" : "Sign In Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
    >
      <View
        className="flex-1 px-8"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 24 }}
      >
        {/* Header */}
        <View className="flex-row items-center h-14">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
            hitSlop={8}
          >
            <ArrowLeft size={22} color={Colors.onSurface.DEFAULT} />
          </Pressable>
        </View>

        {/* Title */}
        <Text
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 28,
            letterSpacing: -0.5,
            color: Colors.onSurface.DEFAULT,
            marginBottom: 8,
            marginTop: 16,
          }}
        >
          {isSignUp ? "Create Account" : "Welcome Back"}
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
          {isSignUp
            ? "Sign up with your email to get started"
            : "Sign in to your existing account"}
        </Text>

        {/* Form */}
        <View className="gap-4">
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@university.edu"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View>
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder={isSignUp ? "Create a password" : "Enter your password"}
              secureTextEntry
            />
            {isSignUp && password.length > 0 && (
              <View style={{ marginTop: 8, gap: 2 }}>
                <PasswordRule label="At least 6 characters" met={password.length >= 6} />
                <PasswordRule label="One capital letter" met={/[A-Z]/.test(password)} />
                <PasswordRule label="One number" met={/[0-9]/.test(password)} />
              </View>
            )}
          </View>
        </View>

        <View className="mt-8">
          <Button
            label={isLoading ? "..." : isSignUp ? "Sign Up" : "Sign In"}
            onPress={handleSubmit}
            fullWidth
            disabled={isLoading}
          />
        </View>

        {isLoading && (
          <ActivityIndicator
            size="small"
            color={Colors.primary.DEFAULT}
            style={{ marginTop: 16 }}
          />
        )}

        {/* Toggle */}
        <Pressable onPress={() => setIsSignUp(!isSignUp)} className="mt-6 items-center">
          <Text
            style={{
              fontFamily: "WorkSans_500Medium",
              fontSize: 14,
              color: Colors.primary.DEFAULT,
            }}
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
