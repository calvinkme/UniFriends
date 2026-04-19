import { View, Text, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { X, Star, ArrowLeft, Undo2 } from "lucide-react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants";
import { Badge } from "@/components/ui/Badge";
import { ConnectionModal } from "@/components/ConnectionModal";
import { useDiscoveryStore } from "@/stores";
import type { UserProfile } from "@/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

function ProfileCard({ user, onSkip, onConnect }: { user: UserProfile; onSkip: () => void; onConnect: () => void }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const handleSwipeRight = () => onConnect();
  const handleSwipeLeft = () => onSkip();

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.3;
      rotation.value = (event.translationX / SCREEN_WIDTH) * 15;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 });
        runOnJS(handleSwipeRight)();
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 });
        runOnJS(handleSwipeLeft)();
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const yearLabels: Record<number, string> = { 1: "Freshman", 2: "Sophomore", 3: "Junior", 4: "Senior" };
  const majorSummary = user.majors.length > 0 ? user.majors.join(", ") : user.degree;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[animatedStyle, { flex: 1 }]}
        className="mx-4 rounded-2xl overflow-hidden bg-surface"
      >
        {/* Photo */}
        <View style={{ flex: 0.6 }}>
          {user.avatarUrl ? (
            <Image
              source={{ uri: user.avatarUrl }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <View
              className="flex-1 items-center justify-center"
              style={{ backgroundColor: Colors.primary.container }}
            >
              <Text style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 64, color: Colors.onPrimary.container }}>
                {user.firstName[0]}{user.lastName[0]}
              </Text>
            </View>
          )}
          {/* Gradient overlay */}
          <View
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
              backgroundColor: "transparent",
            }}
          />
        </View>

        {/* Info */}
        <View className="flex-1 p-6 bg-surface-container-low">
          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 11,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: Colors.onSurface.variant,
              marginBottom: 8,
            }}
          >
            {user.university}
          </Text>
          <View className="flex-row items-center gap-3 mb-2">
            <Text
              className="text-on-surface"
              style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 24, letterSpacing: -0.5 }}
            >
              {user.firstName}, {user.academicYear === 1 ? "1st" : user.academicYear === 2 ? "2nd" : user.academicYear === 3 ? "3rd" : "4th"} Year
            </Text>
          </View>

          <Text
            style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT, marginBottom: 12 }}
            numberOfLines={2}
          >
            {majorSummary}
          </Text>

          <View className="flex-row items-center gap-2 mb-4">
            <Badge label={user.degree} />
            <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 13, color: Colors.onSurface.variant }}>
              {yearLabels[user.academicYear]}
            </Text>
          </View>

          <Text
            className="text-on-surface-variant mb-4"
            style={{ fontFamily: "WorkSans_400Regular", fontSize: 14, lineHeight: 22 }}
            numberOfLines={3}
          >
            {user.bio}
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {user.interests.slice(0, 4).map((interest) => (
              <View
                key={interest}
                className="px-3 py-1.5 rounded-full"
                style={{ backgroundColor: Colors.tertiary.container + "66" }}
              >
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 12, color: Colors.onTertiary.container }}>
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

export default function BrowseScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    profiles, currentIndex, showConnectionModal, lastConnectedUser,
    loadProfiles, acceptProfile, skipProfile, dismissConnectionModal,
  } = useDiscoveryStore();

  useEffect(() => {
    loadProfiles();
  }, []);

  const currentProfile = profiles[currentIndex];
  const hasMoreProfiles = currentIndex < profiles.length;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
        {/* Header */}
        <View className="flex-row items-center px-6 h-14 gap-4">
          <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center" hitSlop={8}>
            <ArrowLeft size={22} color={Colors.onSurface.DEFAULT} />
          </Pressable>
          <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 18, color: Colors.onSurface.DEFAULT }}>
            Discover
          </Text>
        </View>

        {/* Card Area */}
        {hasMoreProfiles && currentProfile ? (
          <View className="flex-1 pb-4">
            <ProfileCard
              key={currentProfile.id}
              user={currentProfile}
              onSkip={skipProfile}
              onConnect={acceptProfile}
            />

            {/* Action Buttons */}
            <View className="flex-row items-center justify-center gap-8 py-4 px-6">
              <Pressable
                onPress={skipProfile}
                className="w-16 h-16 rounded-full items-center justify-center bg-surface-container-high active:scale-[0.95]"
                style={{
                  shadowColor: Colors.onSurface.DEFAULT,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.06,
                  shadowRadius: 12,
                  elevation: 3,
                }}
              >
                <X size={28} color={Colors.onSurface.variant} />
              </Pressable>
              <Pressable
                onPress={acceptProfile}
                className="w-16 h-16 rounded-full items-center justify-center bg-primary active:scale-[0.95]"
                style={{
                  shadowColor: Colors.primary.DEFAULT,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <Star size={28} color={Colors.onPrimary.DEFAULT} />
              </Pressable>
            </View>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center px-8">
            <Text
              className="text-on-surface text-center mb-2"
              style={{ fontFamily: "Manrope_700Bold", fontSize: 20 }}
            >
              No more profiles
            </Text>
            <Text
              className="text-on-surface-variant text-center mb-8"
              style={{ fontFamily: "WorkSans_400Regular", fontSize: 15, lineHeight: 22 }}
            >
              Try adjusting your filters to discover more students
            </Text>
            <Pressable
              onPress={() => router.back()}
              className="bg-primary px-6 py-3 rounded-xl active:scale-[0.98]"
            >
              <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 15, color: Colors.onPrimary.DEFAULT }}>
                Adjust Filters
              </Text>
            </Pressable>
          </View>
        )}

        {/* Connection Modal */}
        {showConnectionModal && lastConnectedUser && (
          <ConnectionModal user={lastConnectedUser} onDismiss={dismissConnectionModal} />
        )}
      </View>
    </GestureHandlerRootView>
  );
}
