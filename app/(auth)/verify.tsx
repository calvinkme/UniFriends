import { View, Text, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { Colors } from "@/constants";
import { Button } from "@/components/ui/Button";
import { verifyOtp, resendVerificationEmail } from "@/services/auth";
import { useAuthStore } from "@/stores";

const CODE_LENGTH = 6;

export default function VerifyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { initialize } = useAuthStore();

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Auto-focus first input on mount
  useEffect(() => {
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow digits
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    // Auto-advance to next input
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits filled
    if (digit && index === CODE_LENGTH - 1 && newCode.every((d) => d !== "")) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
    }
  };

  const handleVerify = async (verificationCode?: string) => {
    const fullCode = verificationCode ?? code.join("");
    if (fullCode.length !== CODE_LENGTH) {
      Alert.alert("Incomplete Code", "Please enter the full 6-digit verification code.");
      return;
    }

    if (!email) {
      Alert.alert("Error", "Email address is missing. Please go back and try again.");
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtp(email, fullCode);
      await initialize();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Please try again.";
      Alert.alert("Verification Failed", message);
      // Clear code on failure
      setCode(Array(CODE_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;

    try {
      await resendVerificationEmail(email);
      setResendCooldown(60);
      Alert.alert("Code Sent", "A new verification code has been sent to your email.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Please try again.";
      Alert.alert("Resend Failed", message);
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
          Verify Your Email
        </Text>
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 15,
            color: Colors.onSurface.variant,
            lineHeight: 22,
            marginBottom: 8,
          }}
        >
          We sent a 6-digit verification code to
        </Text>
        <Text
          style={{
            fontFamily: "WorkSans_600SemiBold",
            fontSize: 15,
            color: Colors.primary.DEFAULT,
            marginBottom: 32,
          }}
        >
          {email}
        </Text>

        {/* Code Input */}
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
          {Array.from({ length: CODE_LENGTH }).map((_, i) => (
            <TextInput
              key={i}
              ref={(ref) => { inputRefs.current[i] = ref; }}
              value={code[i]}
              onChangeText={(text) => handleCodeChange(text, i)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              style={{
                width: 48,
                height: 56,
                borderRadius: 12,
                backgroundColor: code[i]
                  ? Colors.surface.containerLowest
                  : Colors.surface.containerHigh,
                borderWidth: code[i] ? 2 : 1,
                borderColor: code[i]
                  ? Colors.primary.DEFAULT
                  : Colors.outline.variant + "66",
                textAlign: "center",
                fontSize: 22,
                fontFamily: "Manrope_700Bold",
                color: Colors.onSurface.DEFAULT,
              }}
            />
          ))}
        </View>

        {/* Verify Button */}
        <View className="mt-8">
          <Button
            label={isLoading ? "Verifying..." : "Verify"}
            onPress={() => handleVerify()}
            fullWidth
            disabled={isLoading || code.some((d) => d === "")}
          />
        </View>

        {isLoading && (
          <ActivityIndicator
            size="small"
            color={Colors.primary.DEFAULT}
            style={{ marginTop: 16 }}
          />
        )}

        {/* Resend */}
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 14,
              color: Colors.onSurface.variant,
            }}
          >
            Didn't receive the code?
          </Text>
          <Pressable
            onPress={handleResend}
            disabled={resendCooldown > 0}
            style={{ marginTop: 8 }}
          >
            <Text
              style={{
                fontFamily: "WorkSans_600SemiBold",
                fontSize: 14,
                color: resendCooldown > 0
                  ? Colors.onSurface.variant + "66"
                  : Colors.primary.DEFAULT,
              }}
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend Code"}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
