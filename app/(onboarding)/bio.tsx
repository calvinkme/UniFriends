import { View, Text, Pressable, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ArrowLeft, Camera, AlertTriangle } from "lucide-react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useOnboardingStore, useAuthStore } from "@/stores";
import { supabase } from "@/services/supabase";

export default function BioScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const store = useOnboardingStore();
  const { session, setProfile } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarWarning, setAvatarWarning] = useState<string | null>(null);

  const canContinue = store.bio.trim().length >= 10;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Needed", "We need access to your photos to set your profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      store.setAvatarUri(result.assets[0].uri);
    }
  };

  const handleComplete = async () => {
    if (!session?.user) return;

    setIsSubmitting(true);
    try {
      let avatarUrl = "";

      // Upload avatar if selected — wrapped in its own try-catch so avatar
      // failure doesn't block profile creation
      if (store.avatarUri) {
        try {
          const fileExt = store.avatarUri.split(".").pop() ?? "jpg";
          const filePath = `${session.user.id}.${fileExt}`;

          // Use FormData for React Native compatibility instead of fetch-to-blob
          const formData = new FormData();
          formData.append("file", {
            uri: store.avatarUri,
            name: filePath,
            type: `image/${fileExt}`,
          } as unknown as Blob);

          const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, formData, { upsert: true });

          if (!uploadError) {
            const { data: urlData } = supabase.storage
              .from("avatars")
              .getPublicUrl(filePath);
            avatarUrl = urlData.publicUrl;
          } else {
            setAvatarWarning("Photo upload failed — your profile was saved without a photo. You can add one later.");
          }
        } catch {
          setAvatarWarning("Photo upload failed — your profile was saved without a photo. You can add one later.");
        }
      }

      // Insert profile
      const profileData = {
        id: session.user.id,
        first_name: store.firstName,
        last_name: store.lastName,
        university: store.university,
        degree: store.degree,
        majors: store.majors,
        age: parseInt(store.age, 10),
        academic_year: store.academicYear,
        bio: store.bio,
        interests: store.interests,
        avatar_url: avatarUrl || null,
        active_courses: [],
        is_verified: false,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(profileData)
        .select()
        .single();

      if (error) throw error;

      // Update auth store with the new profile
      setProfile({
        id: session.user.id,
        firstName: store.firstName,
        lastName: store.lastName,
        avatarUrl,
        university: store.university,
        degree: store.degree,
        majors: store.majors,
        age: parseInt(store.age, 10),
        academicYear: store.academicYear!,
        activeCourses: [],
        bio: store.bio,
        interests: store.interests,
        isVerified: false,
        isOnline: true,
        createdAt: profileData.created_at,
      });

      store.reset();
      router.replace("/(tabs)");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Please try again.";
      Alert.alert("Profile Save Failed", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
    >
      <View className="flex-1" style={{ paddingTop: insets.top }}>
        <ProgressBar currentStep={5} totalSteps={5} />

      {/* Header */}
      <View className="flex-row items-center px-4 h-12">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
          hitSlop={8}
        >
          <ArrowLeft size={22} color={Colors.onSurface.DEFAULT} />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 32,
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
          Almost done!
        </Text>
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 15,
            color: Colors.onSurface.variant,
            lineHeight: 22,
            marginBottom: 24,
          }}
        >
          Tell others about yourself (photo is optional)
        </Text>

        {/* Avatar picker */}
        <View className="items-center mb-8">
          <Text
            style={{
              fontFamily: "WorkSans_500Medium",
              fontSize: 12,
              color: Colors.onSurface.variant,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Profile Photo (Optional)
          </Text>
          <Pressable
            onPress={pickImage}
            className="w-28 h-28 rounded-full items-center justify-center overflow-hidden active:scale-[0.97]"
            style={{
              backgroundColor: Colors.surface.containerHigh,
              borderWidth: 2,
              borderColor: Colors.primary.DEFAULT + "66",
              borderStyle: "dashed",
            }}
          >
            {store.avatarUri ? (
              <Image
                source={{ uri: store.avatarUri }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            ) : (
              <View className="items-center gap-1">
                <Camera size={28} color={Colors.primary.DEFAULT} />
                <Text
                  style={{
                    fontFamily: "WorkSans_500Medium",
                    fontSize: 11,
                    color: Colors.primary.DEFAULT,
                  }}
                >
                  Add photo
                </Text>
              </View>
            )}
          </Pressable>
          {store.avatarUri && (
            <Pressable onPress={pickImage} className="mt-2">
              <Text
                style={{
                  fontFamily: "WorkSans_500Medium",
                  fontSize: 13,
                  color: Colors.primary.DEFAULT,
                }}
              >
                Change photo
              </Text>
            </Pressable>
          )}
        </View>

        {/* Bio input */}
        <Input
          label="About You"
          value={store.bio}
          onChangeText={store.setBio}
          placeholder="Tell other students what makes you interesting..."
          multiline
        />
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 12,
            color: Colors.onSurface.variant + "99",
            marginTop: 4,
          }}
        >
          Minimum 10 characters · {store.bio.length} written
        </Text>
      </ScrollView>

        <View className="px-8" style={{ paddingBottom: insets.bottom + 24 }}>
          {avatarWarning && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#E8A23D" + "1A",
                borderRadius: 12,
                padding: 14,
                marginBottom: 12,
              }}
            >
              <AlertTriangle size={18} color="#E8A23D" />
              <Text
                style={{
                  fontFamily: "WorkSans_500Medium",
                  fontSize: 13,
                  color: "#E8A23D",
                  flex: 1,
                  lineHeight: 18,
                }}
              >
                {avatarWarning}
              </Text>
            </View>
          )}
          {isSubmitting && (
            <ActivityIndicator
              size="small"
              color={Colors.primary.DEFAULT}
              style={{ marginBottom: 12 }}
            />
          )}
          <Button
            label={isSubmitting ? "Setting up..." : "Complete Profile"}
            onPress={handleComplete}
            fullWidth
            disabled={!canContinue || isSubmitting}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
