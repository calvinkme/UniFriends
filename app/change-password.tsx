import { View, Text, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ArrowLeft, Lock, Check, X } from "lucide-react-native";
import { Colors } from "@/constants";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/services/supabase";
import { useAuthStore } from "@/stores";

const PASSWORD_RULES = [
  { key: "length", label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { key: "upper", label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { key: "lower", label: "One lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
  { key: "number", label: "One number", test: (pw: string) => /[0-9]/.test(pw) },
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

export default function ChangePasswordScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isPasswordRecovery = useAuthStore((s) => s.isPasswordRecovery);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const allRulesMet = PASSWORD_RULES.every((r) => r.test(newPassword));
  const passwordsMatch = newPassword === confirmPassword;

  const getConfirmError = (): string | undefined => {
    if (!confirmTouched || confirmPassword.length === 0) return undefined;
    if (!passwordsMatch) return "Passwords do not match.";
    return undefined;
  };

  const handleSubmit = async () => {
    setConfirmTouched(true);
    setError(null);

    if (!allRulesMet || !passwordsMatch) return;

    setIsLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateError) throw updateError;
      useAuthStore.getState().setPasswordRecovery(false);
      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
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
            Password Updated
          </Text>
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 15,
              lineHeight: 22,
              color: Colors.onSurface.variant,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Your password has been changed successfully.
          </Text>
          <View style={{ width: "100%" }}>
            <Button
              label={isPasswordRecovery ? "Continue" : "Back to Settings"}
              onPress={() => {
                if (isPasswordRecovery) {
                  router.replace("/(tabs)/main");
                } else {
                  router.back();
                }
              }}
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
            <Lock size={28} color={Colors.primary.DEFAULT} />
          </View>
        </View>

        <Text
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 28,
            letterSpacing: -0.5,
            color: Colors.onSurface.DEFAULT,
            marginBottom: 8,
          }}
        >
          Change Password
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
          Enter a new password for your account.
        </Text>

        {error && (
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
            <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 14, color: "#C4474B", flex: 1 }}>
              {error}
            </Text>
          </View>
        )}

        <View className="gap-4">
          <View>
            <Input
              label="New Password"
              value={newPassword}
              onChangeText={(t) => { setNewPassword(t); setError(null); }}
              placeholder="Enter new password"
              secureTextEntry
            />
            {newPassword.length > 0 && (
              <View style={{ marginTop: 10, gap: 3 }}>
                {PASSWORD_RULES.map((rule) => (
                  <PasswordRule key={rule.key} label={rule.label} met={rule.test(newPassword)} />
                ))}
              </View>
            )}
          </View>
          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(t) => { setConfirmPassword(t); setError(null); }}
            onBlur={() => setConfirmTouched(true)}
            placeholder="Re-enter new password"
            secureTextEntry
            error={getConfirmError()}
          />
        </View>

        <View className="mt-8">
          <Button
            label={isLoading ? "Updating..." : "Update Password"}
            onPress={handleSubmit}
            fullWidth
            disabled={isLoading || !allRulesMet}
          />
        </View>

        {isLoading && (
          <ActivityIndicator size="small" color={Colors.primary.DEFAULT} style={{ marginTop: 16 }} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
