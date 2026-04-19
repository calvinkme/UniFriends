import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";

// Configure how notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Register for push notifications and return the Expo push token.
 * Returns null if running on a simulator or permissions are denied.
 */
export async function registerForPushNotifications(): Promise<string | null> {
  // Push notifications only work on physical devices
  if (!Device.isDevice) {
    console.log("Push notifications require a physical device");
    return null;
  }

  const isExpoGoAndroid =
    Platform.OS === "android" &&
    Constants.appOwnership === "expo";

  if (isExpoGoAndroid) {
    console.log(
      "Remote push notifications are not available in Expo Go on Android. Use a development build to test push tokens.",
    );
    return null;
  }

  // Check existing permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Request permission if not already granted
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Push notification permission denied");
    return null;
  }

  // Android requires a notification channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#7c6f5b",
      sound: "default",
    });

    await Notifications.setNotificationChannelAsync("messages", {
      name: "Messages",
      description: "Chat message notifications",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#7c6f5b",
      sound: "default",
    });

    await Notifications.setNotificationChannelAsync("connections", {
      name: "Connection Requests",
      description: "New connection request notifications",
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: "default",
    });
  }

  // Get the Expo push token
  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  if (!projectId) {
    console.log("Missing EAS project ID for Expo push token registration");
    return null;
  }

  const tokenData = await Notifications.getExpoPushTokenAsync({
    projectId,
  });

  return tokenData.data;
}

/**
 * Schedule a local notification for an incoming message.
 */
export async function notifyNewMessage(
  senderName: string,
  messageText: string,
  conversationId: string,
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: senderName,
      body: messageText,
      data: { type: "message", conversationId },
      sound: "default",
      ...(Platform.OS === "android" ? { channelId: "messages" } : {}),
    },
    trigger: null, // Show immediately
  });
}

/**
 * Schedule a local notification for a new connection request.
 */
export async function notifyConnectionRequest(
  requesterName: string,
  userId: string,
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Connection Request",
      body: `${requesterName} wants to connect with you!`,
      data: { type: "connection_request", userId },
      sound: "default",
      ...(Platform.OS === "android" ? { channelId: "connections" } : {}),
    },
    trigger: null,
  });
}

/**
 * Schedule a local notification for a mutual match.
 */
export async function notifyMutualMatch(matchName: string, userId: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "It's a Match!",
      body: `You and ${matchName} are now connected. Say hello!`,
      data: { type: "match", userId },
      sound: "default",
      ...(Platform.OS === "android" ? { channelId: "connections" } : {}),
    },
    trigger: null,
  });
}

/**
 * Schedule a local notification for group activity.
 */
export async function notifyGroupActivity(
  groupName: string,
  activityText: string,
  groupId: string,
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: groupName,
      body: activityText,
      data: { type: "group", groupId },
      sound: "default",
    },
    trigger: null,
  });
}

/**
 * Get the count of pending notifications (badge number).
 */
export async function getBadgeCount(): Promise<number> {
  return Notifications.getBadgeCountAsync();
}

/**
 * Set the badge count.
 */
export async function setBadgeCount(count: number) {
  await Notifications.setBadgeCountAsync(count);
}

/**
 * Clear all delivered notifications.
 */
export async function clearAllNotifications() {
  await Notifications.dismissAllNotificationsAsync();
}

// Re-export types and subscription helpers for use in components
export {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
} from "expo-notifications";
export type { Notification, NotificationResponse } from "expo-notifications";
export type { EventSubscription } from "expo-modules-core";
