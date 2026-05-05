import { View, Text, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ArrowLeft, Mail, Check } from "lucide-react-native";
import { Colors } from "@/constants";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { resetPassword } from "@/services/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmailValid = EMAIL_REGEX.test(email.trim());

  const getEmailError = (): string | undefined => {
    if (error) return error;
    if (!emailTouched || email.length === 0) return undefined;
    if (!isEmailValid) return "Please enter a valid email address.";
    return undefined;
  };

  const handleSubmit = async () => {
    setEmailTouched(true);
    setError(null);

    if (!email.trim() || !isEmailValid) return;

    setIsLoading(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <View
        className="flex-1 bg-background px-8"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 24 }}
      >
        <View className="flex-row items-center h-14">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
            hitSlop={8}
          >
            <ArrowLeft size={22} color={Colors.onSurface.DEFAULT} />
          </Pressable>
        </View>

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 80 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.secondary.container,
              marginBottom: 24,
            }}
          >
            <Check size={28} color={Colors.secondary.DEFAULT} />
          </View>
          <Text
            style={{
              fontFamily: "Manrope_800ExtraBold",
              fontSize: 24,
              letterSpacing: -0.5,
              color: Colors.onSurface.DEFAULT,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Check Your Email
          </Text>
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 15,
              lineHeight: 22,
              color: Colors.onSurface.variant,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            We've sent a password reset link to
          </Text>
          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 15,
              color: Colors.primary.DEFAULT,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            {email.trim()}
          </Text>
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 13,
              lineHeight: 20,
              color: Colors.onSurface.variant,
              textAlign: "center",
            }}
          >
            Click the link in the email to reset your password. If you don't see it, check your spam folder.
          </Text>

          <View style={{ marginTop: 32, width: "100%" }}>
            <Button
              label="Back to Sign In"
              onPress={() => router.back()}
              fullWidth
            />
          </View>
        </View>
      </View>
    );
  }

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

        {/* Icon */}
        <View style={{ alignItems: "center", marginTop: 24, marginBottom: 24 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primary.container,
            }}
          >
            <Mail size={28} color={Colors.primary.DEFAULT} />
          </View>
        </View>

        {/* Title */}
        <Text
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 28,
            letterSpacing: -0.5,
            color: Colors.onSurface.DEFAULT,
            marginBottom: 8,
          }}
        >
          Forgot Password?
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
          Enter the email address you used to create your account and we'll send you a link to reset your password.
        </Text>

        {/* Form */}
        <Input
          label="Email"
          value={email}
          onChangeText={(text) => { setEmail(text); setError(null); }}
          onBlur={() => setEmailTouched(true)}
          placeholder="you@university.edu"
          keyboardType="email-address"
          autoCapitalize="none"
          error={getEmailError()}
        />

        <View className="mt-8">
          <Button
            label={isLoading ? "Sending..." : "Send Reset Link"}
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

        {/* Back to sign in */}
        <Pressable onPress={() => router.back()} className="mt-6 items-center">
          <Text
            style={{
              fontFamily: "WorkSans_500Medium",
              fontSize: 14,
              color: Colors.primary.DEFAULT,
            }}
          >
            Back to Sign In
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
