import { View, Text, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { ArrowLeft, Check, X } from "lucide-react-native";
import { Colors } from "@/constants";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signIn, signUp } from "@/services/auth";
import { useAuthStore } from "@/stores";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_RULES = [
  { key: "length", label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { key: "upper", label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { key: "lower", label: "One lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
  { key: "number", label: "One number", test: (pw: string) => /[0-9]/.test(pw) },
  { key: "special", label: "One special character (!@#$...)", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
] as const;

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

function parseAuthError(err: unknown, isSignUp: boolean): { field: "email" | "password" | "general"; message: string } {
  const raw = err instanceof Error ? err.message : "Something went wrong. Please try again.";
  const lower = raw.toLowerCase();

  if (lower.includes("invalid login credentials") || lower.includes("invalid password")) {
    return { field: "password", message: "Incorrect password. Please try again." };
  }
  if (lower.includes("email not confirmed")) {
    return { field: "email", message: "Email not verified. Please check your inbox." };
  }
  if (lower.includes("user not found") || lower.includes("no user found")) {
    return { field: "email", message: "No account found with this email." };
  }
  if (lower.includes("user already registered") || lower.includes("already been registered")) {
    return { field: "email", message: "An account with this email already exists." };
  }
  if (lower.includes("rate limit") || lower.includes("too many requests")) {
    return { field: "general", message: "Too many attempts. Please wait a moment." };
  }
  if (lower.includes("network") || lower.includes("fetch")) {
    return { field: "general", message: "Network error. Check your connection." };
  }

  return { field: "general", message: raw };
}

export default function EmailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { initialize } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [serverError, setServerError] = useState<{ field: "email" | "password" | "general"; message: string } | null>(null);

  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const allPasswordRulesMet = PASSWORD_RULES.every((r) => r.test(password));

  const getEmailError = useCallback((): string | undefined => {
    if (serverError?.field === "email") return serverError.message;
    if (!emailTouched || email.length === 0) return undefined;
    if (!isEmailValid) return "Please enter a valid email address.";
    return undefined;
  }, [email, emailTouched, isEmailValid, serverError]);

  const getPasswordError = useCallback((): string | undefined => {
    if (serverError?.field === "password") return serverError.message;
    if (!isSignUp && passwordTouched && password.length === 0) return "Password is required.";
    return undefined;
  }, [password, passwordTouched, isSignUp, serverError]);

  const canSubmit = (): boolean => {
    if (!email.trim() || !isEmailValid) return false;
    if (!password.trim()) return false;
    if (isSignUp && !allPasswordRulesMet) return false;
    return true;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (serverError?.field === "email") setServerError(null);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (serverError?.field === "password") setServerError(null);
  };

  const handleSubmit = async () => {
    setEmailTouched(true);
    setPasswordTouched(true);
    setServerError(null);

    if (!canSubmit()) return;

    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp(email.trim(), password);
        router.replace({ pathname: "/(auth)/verify", params: { email: email.trim() } });
        return;
      } else {
        await signIn(email.trim(), password);
      }
      await initialize();
    } catch (err) {
      const parsed = parseAuthError(err, isSignUp);
      setServerError(parsed);
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

        {/* General server error banner */}
        {serverError?.field === "general" && (
          <View
            style={{
              backgroundColor: "#C4474B" + "14",
              borderRadius: 12,
              padding: 14,
              marginBottom: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <X size={18} color="#C4474B" />
            <Text
              style={{
                fontFamily: "WorkSans_500Medium",
                fontSize: 14,
                color: "#C4474B",
                flex: 1,
              }}
            >
              {serverError.message}
            </Text>
          </View>
        )}

        {/* Form */}
        <View className="gap-4">
          <Input
            label="Email"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={() => setEmailTouched(true)}
            placeholder="you@university.edu"
            keyboardType="email-address"
            autoCapitalize="none"
            error={getEmailError()}
          />
          <View>
            <Input
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={() => setPasswordTouched(true)}
              placeholder={isSignUp ? "Create a password" : "Enter your password"}
              secureTextEntry
              error={getPasswordError()}
            />
            {isSignUp && password.length > 0 && (
              <View style={{ marginTop: 10, gap: 3 }}>
                {PASSWORD_RULES.map((rule) => (
                  <PasswordRule key={rule.key} label={rule.label} met={rule.test(password)} />
                ))}
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
        <Pressable onPress={() => { setIsSignUp(!isSignUp); setServerError(null); }} className="mt-6 items-center">
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
