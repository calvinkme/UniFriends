import { View, Text, ScrollView, RefreshControl, Pressable, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { useEffect, useState, useCallback } from "react";
import { Colors } from "@/constants";
import { ProfileFeedCard } from "@/components/ProfileFeedCard";
import { ConnectionModal } from "@/components/ConnectionModal";
import { useDiscoveryStore, useProfileStore } from "@/stores";
import { CURRENT_USER } from "@/services/mockData";
import { USE_MOCK_DATA } from "@/constants/config";
export default function MainScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { currentUser, loadProfile } = useProfileStore();
  const {
    scoredProfiles,
    showConnectionModal,
    connectionModalType,
    lastConnectedUser,
    loadMainFeed,
    resetFeed,
    acceptProfileById,
    skipProfileById,
    dismissConnectionModal,
  } = useDiscoveryStore();

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    setIsLoading(true);
    Promise.resolve(loadMainFeed()).finally(() => setIsLoading(false));
  }, [currentUser, loadMainFeed]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMainFeed();
    setRefreshing(false);
  }, [loadMainFeed]);

  const user = currentUser ?? (USE_MOCK_DATA ? CURRENT_USER : null);

  const currentProfile = scoredProfiles[0];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 24,
          height: 56,
        }}
      >
        <Image
          source={require("@/brand_assets/logo.png")}
          style={{ width: 36, height: 36, borderRadius: 8 }}
          contentFit="contain"
        />
        <Text
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 20,
            letterSpacing: -0.3,
            color: Colors.onSurface.DEFAULT,
          }}
        >
          For You
        </Text>
      </View>

      {/* Profile Feed */}
      {currentProfile ? (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary.DEFAULT}
              colors={[Colors.primary.DEFAULT]}
            />
          }
        >
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: "WorkSans_600SemiBold",
                fontSize: 12,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: Colors.onSurface.variant,
                marginBottom: 8,
              }}
            >
              {scoredProfiles.length} match{scoredProfiles.length === 1 ? "" : "es"} in queue
            </Text>
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                fontSize: 15,
                lineHeight: 22,
                color: Colors.onSurface.variant,
              }}
            >
              Decide on this profile to unlock the next one.
            </Text>
          </View>

          <ProfileFeedCard
            profile={currentProfile}
            currentUserInterests={user?.interests ?? []}
            onConnect={acceptProfileById}
            onSkip={skipProfileById}
          />
        </ScrollView>
      ) : isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={Colors.primary.DEFAULT} />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 }}>
          <Text
            style={{
              fontFamily: "Manrope_700Bold",
              fontSize: 20,
              color: Colors.onSurface.DEFAULT,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            No more profiles
          </Text>
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 15,
              lineHeight: 22,
              color: Colors.onSurface.variant,
              textAlign: "center",
            }}
          >
            Refresh your matches to repopulate the feed with ranked students
          </Text>
          <Pressable
            onPress={resetFeed}
            style={{
              marginTop: 24,
              backgroundColor: Colors.primary.DEFAULT,
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 14,
            }}
          >
            <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 15, color: Colors.onPrimary.DEFAULT }}>
              Refresh Matches
            </Text>
          </Pressable>
        </View>
      )}

      {lastConnectedUser && (
        <ConnectionModal
          visible={showConnectionModal}
          user={lastConnectedUser}
          mode={connectionModalType}
          onChat={() => {
            const userId = lastConnectedUser.id;
            dismissConnectionModal();
            setTimeout(() => router.push(`/chat/${userId}`), 300);
          }}
          onClose={dismissConnectionModal}
        />
      )}
    </View>
  );
}
