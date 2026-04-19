import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants";

type AvatarSize = "sm" | "md" | "lg" | "xl";

type AvatarProps = {
  uri?: string;
  name?: string;
  size?: AvatarSize;
  showOnline?: boolean;
  isOnline?: boolean;
  showRing?: boolean;
  showVerified?: boolean;
};

const sizeMap: Record<AvatarSize, { container: number; text: string; dot: number; ringWidth: number }> = {
  sm: { container: 32, text: "text-xs", dot: 10, ringWidth: 1.5 },
  md: { container: 48, text: "text-base", dot: 12, ringWidth: 2 },
  lg: { container: 64, text: "text-lg", dot: 14, ringWidth: 2 },
  xl: { container: 112, text: "text-2xl", dot: 18, ringWidth: 2.5 },
};

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  uri,
  name,
  size = "md",
  showOnline = false,
  isOnline = false,
  showRing = false,
  showVerified = false,
}: AvatarProps) {
  const config = sizeMap[size];

  return (
    <View style={{ position: "relative" }}>
      {showRing ? (
        <View
          style={{
            padding: config.ringWidth,
            borderRadius: 9999,
            borderWidth: config.ringWidth,
            borderColor: Colors.primary.container,
          }}
        >
          {uri ? (
            <Image
              source={{ uri }}
              style={{
                width: config.container,
                height: config.container,
                borderRadius: 9999,
                borderWidth: 2,
                borderColor: Colors.background,
              }}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View
              style={{
                width: config.container,
                height: config.container,
                borderRadius: 9999,
                backgroundColor: Colors.primary.container,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text className={`${config.text} font-headline text-on-primary-container`}>
                {getInitials(name)}
              </Text>
            </View>
          )}
        </View>
      ) : uri ? (
        <Image
          source={{ uri }}
          style={{
            width: config.container,
            height: config.container,
            borderRadius: size === "md" || size === "sm" ? 12 : 9999,
          }}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View
          style={{
            width: config.container,
            height: config.container,
            borderRadius: size === "md" || size === "sm" ? 12 : 9999,
            backgroundColor: Colors.primary.container,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text className={`${config.text} font-headline text-on-primary-container`}>
            {getInitials(name)}
          </Text>
        </View>
      )}

      {showOnline && isOnline && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: config.dot,
            height: config.dot,
            borderRadius: 9999,
            backgroundColor: Colors.secondary.DEFAULT,
            borderWidth: 2,
            borderColor: Colors.background,
          }}
        />
      )}

      {showVerified && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: Colors.primary.DEFAULT,
            borderRadius: 9999,
            padding: 4,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 12, lineHeight: 12 }}>✓</Text>
        </View>
      )}
    </View>
  );
}
