import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";

const isExpoGo = Constants.appOwnership === "expo";

async function getNotifications() {
  const Notifications = await import("expo-notifications");
  return Notifications;
}

// Set up notification handler (only outside Expo Go)
if (!isExpoGo) {
  getNotifications()
    .then((Notifications) => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
    })
    .catch(() => {
      if (__DEV__) console.log("Notifications not available in this environment");
    });
}

export async function registerForPushNotifications(): Promise<string | null> {
  if (isExpoGo) return null;
  if (!Device.isDevice) return null;

  const Notifications = await getNotifications();

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") return null;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#7c6f5b",
    });

    await Notifications.setNotificationChannelAsync("messages", {
      name: "Messages",
      description: "Chat message notifications",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#7c6f5b",
    });

    await Notifications.setNotificationChannelAsync("connections", {
      name: "Connection Requests",
      description: "New connection request notifications",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  if (!projectId) return null;

  try {
    const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
    return tokenData.data;
  } catch {
    return null;
  }
}

export async function notifyNewMessage(
  senderName: string,
  _messageText: string,
  conversationId: string,
) {
  if (isExpoGo) return;
  const Notifications = await getNotifications();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: senderName,
      body: "Sent you a message",
      data: { type: "message", conversationId },
      sound: true,
      ...(Platform.OS === "android" ? { channelId: "messages" } : {}),
    },
    trigger: null,
  });
}

export async function notifyConnectionRequest(
  requesterName: string,
  userId: string,
) {
  if (isExpoGo) return;
  const Notifications = await getNotifications();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Connection Request",
      body: `${requesterName} wants to connect with you!`,
      data: { type: "connection_request", userId },
      sound: true,
      ...(Platform.OS === "android" ? { channelId: "connections" } : {}),
    },
    trigger: null,
  });
}

export async function notifyMutualMatch(matchName: string, userId: string) {
  if (isExpoGo) return;
  const Notifications = await getNotifications();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "It's a Match!",
      body: `You and ${matchName} are now connected. Say hello!`,
      data: { type: "match", userId },
      sound: true,
      ...(Platform.OS === "android" ? { channelId: "connections" } : {}),
    },
    trigger: null,
  });
}

export async function notifyGroupActivity(
  groupName: string,
  activityText: string,
  groupId: string,
) {
  if (isExpoGo) return;
  const Notifications = await getNotifications();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: groupName,
      body: activityText,
      data: { type: "group", groupId },
      sound: true,
    },
    trigger: null,
  });
}

export async function getBadgeCount(): Promise<number> {
  if (isExpoGo) return 0;
  const Notifications = await getNotifications();
  return Notifications.getBadgeCountAsync();
}

export async function setBadgeCount(count: number) {
  if (isExpoGo) return;
  const Notifications = await getNotifications();
  await Notifications.setBadgeCountAsync(count);
}

export async function clearAllNotifications() {
  if (isExpoGo) return;
  const Notifications = await getNotifications();
  await Notifications.dismissAllNotificationsAsync();
}

// Re-export types (these are type-only and don't trigger side effects)
export type { Notification, NotificationResponse } from "expo-notifications";
export type { EventSubscription } from "expo-modules-core";

// Lazy listener helpers
export async function addNotificationReceivedListener(
  ...args: Parameters<typeof import("expo-notifications").addNotificationReceivedListener>
) {
  if (isExpoGo) return { remove: () => {} };
  const Notifications = await getNotifications();
  return Notifications.addNotificationReceivedListener(...args);
}

export async function addNotificationResponseReceivedListener(
  ...args: Parameters<typeof import("expo-notifications").addNotificationResponseReceivedListener>
) {
  if (isExpoGo) return { remove: () => {} };
  const Notifications = await getNotifications();
  return Notifications.addNotificationResponseReceivedListener(...args);
}
