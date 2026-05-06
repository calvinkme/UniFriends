import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft, ExternalLink } from "lucide-react-native";
import { Colors } from "@/constants";

type LicenceEntry = {
  name: string;
  licence: string;
  url: string;
};

const LIBRARIES: LicenceEntry[] = [
  { name: "React", licence: "MIT", url: "https://github.com/facebook/react" },
  { name: "React Native", licence: "MIT", url: "https://github.com/facebook/react-native" },
  { name: "Expo", licence: "MIT", url: "https://github.com/expo/expo" },
  { name: "Expo Router", licence: "MIT", url: "https://github.com/expo/expo" },
  { name: "Zustand", licence: "MIT", url: "https://github.com/pmndrs/zustand" },
  { name: "NativeWind", licence: "MIT", url: "https://github.com/marklawlor/nativewind" },
  { name: "Tailwind CSS", licence: "MIT", url: "https://github.com/tailwindlabs/tailwindcss" },
  { name: "Supabase JS", licence: "MIT", url: "https://github.com/supabase/supabase-js" },
  { name: "Lucide React Native", licence: "ISC", url: "https://github.com/lucide-icons/lucide" },
  { name: "React Native Reanimated", licence: "MIT", url: "https://github.com/software-mansion/react-native-reanimated" },
  { name: "React Native Gesture Handler", licence: "MIT", url: "https://github.com/software-mansion/react-native-gesture-handler" },
  { name: "React Native Screens", licence: "MIT", url: "https://github.com/software-mansion/react-native-screens" },
  { name: "React Native Safe Area Context", licence: "MIT", url: "https://github.com/th3rdwave/react-native-safe-area-context" },
  { name: "React Native SVG", licence: "MIT", url: "https://github.com/software-mansion/react-native-svg" },
  { name: "FlashList", licence: "MIT", url: "https://github.com/Shopify/flash-list" },
  { name: "Expo Image", licence: "MIT", url: "https://github.com/expo/expo" },
  { name: "Expo Image Picker", licence: "MIT", url: "https://github.com/expo/expo" },
  { name: "Expo Notifications", licence: "MIT", url: "https://github.com/expo/expo" },
  { name: "Expo Secure Store", licence: "MIT", url: "https://github.com/expo/expo" },
  { name: "RN Emoji Keyboard", licence: "MIT", url: "https://github.com/TheWidlarzGroup/rn-emoji-keyboard" },
  { name: "React Native Keyboard Aware ScrollView", licence: "MIT", url: "https://github.com/APSL/react-native-keyboard-aware-scroll-view" },
  { name: "Manrope Font", licence: "OFL-1.1", url: "https://github.com/sharanda/manrope" },
  { name: "Work Sans Font", licence: "OFL-1.1", url: "https://github.com/weiweihuanghuang/Work-Sans" },
];

function LicenceRow({ entry }: { entry: LicenceEntry }) {
  return (
    <Pressable
      onPress={() => Linking.openURL(entry.url)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.outline.variant + "33",
        gap: 14,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "WorkSans_500Medium",
            fontSize: 15,
            color: Colors.onSurface.DEFAULT,
          }}
        >
          {entry.name}
        </Text>
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 12,
            color: Colors.onSurface.variant,
            marginTop: 2,
          }}
        >
          {entry.licence}
        </Text>
      </View>
      <ExternalLink size={16} color={Colors.onSurface.variant + "66"} />
    </Pressable>
  );
}

export default function LicencesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          height: 56,
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
          hitSlop={8}
        >
          <ArrowLeft size={22} color={Colors.onSurface.DEFAULT} />
        </Pressable>
        <Text
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 18,
            color: Colors.onSurface.DEFAULT,
          }}
        >
          Open Source Licences
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 24, marginTop: 8, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 15,
              lineHeight: 22,
              color: Colors.onSurface.variant,
            }}
          >
            UniFriends is built with the help of the following open source software. Tap any library to view its source repository.
          </Text>
        </View>

        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              backgroundColor: Colors.surface.containerLow,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: Colors.outline.variant + "33",
              overflow: "hidden",
            }}
          >
            {LIBRARIES.map((entry) => (
              <LicenceRow key={entry.name} entry={entry} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
