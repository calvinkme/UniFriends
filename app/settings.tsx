import { View, Text, ScrollView, Pressable, Switch, Alert, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Eye,
  HelpCircle,
  Palette,
  FileText,
  Shield,
  Trash2,
  User,
  LogOut,
  MessageCircle,
  Flag,
  Lock,
} from "lucide-react-native";
import { Colors } from "@/constants";
import { useAuthStore, useProfileStore } from "@/stores";
import { useSettingsStore } from "@/stores/settingsStore";
import { deleteAccount as deleteAccountFromDb } from "@/services/database";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { signOut, session } = useAuthStore();
  const { currentUser } = useProfileStore();
  const settings = useSettingsStore();
  const email = session?.user.email ?? currentUser?.email ?? "Not set";

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: signOut },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your account and all associated data. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Are you sure?",
              "Type DELETE to confirm account deletion.",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Yes, Delete Everything",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      const userId = session?.user?.id;
                      if (userId) {
                        await deleteAccountFromDb(userId);
                      }
                      await signOut();
                      Alert.alert("Account Deleted", "Your account and all data have been permanently deleted.");
                    } catch {
                      await signOut();
                      Alert.alert("Account Deleted", "Your account has been scheduled for deletion. Some data may take a few minutes to be fully removed.");
                    }
                  },
                },
              ],
            );
          },
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top }}>
      {/* Header */}
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
        <Text style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 18, color: Colors.onSurface.DEFAULT }}>
          Settings
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <SettingsSection label="Account">
          <SettingsRow
            icon={<User size={20} color={Colors.onSurface.variant} />}
            label="Email"
            value={email}
          />
          <SettingsRow
            icon={<Shield size={20} color={Colors.secondary.DEFAULT} />}
            label="Verification"
            value={currentUser?.isVerified ? "Verified" : "Not verified"}
            valueColor={currentUser?.isVerified ? Colors.secondary.DEFAULT : Colors.onSurface.variant}
          />
          <SettingsRow
            icon={<User size={20} color={Colors.onSurface.variant} />}
            label="University"
            value={currentUser?.university ?? "Not set"}
          />
          <SettingsLink
            icon={<Lock size={20} color={Colors.onSurface.variant} />}
            label="Change Password"
            onPress={() => router.push("/change-password")}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection label="Notifications">
          <SettingsToggle
            icon={<Bell size={20} color={Colors.onSurface.variant} />}
            label="New connection requests"
            value={settings.notifyNewRequests}
            onToggle={() => settings.toggleSetting("notifyNewRequests")}
          />
          <SettingsToggle
            icon={<MessageCircle size={20} color={Colors.onSurface.variant} />}
            label="Messages"
            value={settings.notifyMessages}
            onToggle={() => settings.toggleSetting("notifyMessages")}
          />
          <SettingsToggle
            icon={<Bell size={20} color={Colors.onSurface.variant} />}
            label="Group activity"
            value={settings.notifyGroupActivity}
            onToggle={() => settings.toggleSetting("notifyGroupActivity")}
          />
          <SettingsToggle
            icon={<Bell size={20} color={Colors.onSurface.variant} />}
            label="Weekly digest"
            value={settings.notifyWeeklyDigest}
            onToggle={() => settings.toggleSetting("notifyWeeklyDigest")}
          />
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection label="Privacy">
          <SettingsToggle
            icon={<Eye size={20} color={Colors.onSurface.variant} />}
            label="Profile visible"
            subtitle="When off, your profile is hidden from others"
            value={settings.profileVisible}
            onToggle={() => settings.toggleSetting("profileVisible")}
          />
          <SettingsToggle
            icon={<Eye size={20} color={Colors.onSurface.variant} />}
            label="Show online status"
            value={settings.showOnlineStatus}
            onToggle={() => settings.toggleSetting("showOnlineStatus")}
          />
          <SettingsToggle
            icon={<Eye size={20} color={Colors.onSurface.variant} />}
            label="Show academic year"
            value={settings.showAcademicYear}
            onToggle={() => settings.toggleSetting("showAcademicYear")}
          />
          <SettingsToggle
            icon={<Eye size={20} color={Colors.onSurface.variant} />}
            label="Show GPA ranking"
            value={settings.showGpa}
            onToggle={() => settings.toggleSetting("showGpa")}
          />
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection label="Appearance">
          <SettingsToggle
            icon={<Palette size={20} color={Colors.onSurface.variant} />}
            label="Dark mode"
            subtitle="Coming soon"
            value={settings.darkMode}
            onToggle={() => settings.toggleSetting("darkMode")}
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection label="Support">
          <SettingsLink
            icon={<HelpCircle size={20} color={Colors.onSurface.variant} />}
            label="Help Centre"
            onPress={() => router.push("/help")}
          />
          <SettingsLink
            icon={<Flag size={20} color={Colors.onSurface.variant} />}
            label="Report a Problem"
            onPress={() => Alert.alert("Report", "Report feature coming soon.")}
          />
          <SettingsLink
            icon={<MessageCircle size={20} color={Colors.onSurface.variant} />}
            label="Send Feedback"
            onPress={() => Linking.openURL("mailto:feedback@unifriends.app")}
          />
        </SettingsSection>

        {/* Legal */}
        <SettingsSection label="Legal">
          <SettingsLink
            icon={<FileText size={20} color={Colors.onSurface.variant} />}
            label="Terms of Service"
            onPress={() => Alert.alert("Terms", "Terms of Service coming soon.")}
          />
          <SettingsLink
            icon={<Shield size={20} color={Colors.onSurface.variant} />}
            label="Privacy Policy"
            onPress={() => Alert.alert("Privacy", "Privacy Policy coming soon.")}
          />
          <SettingsLink
            icon={<FileText size={20} color={Colors.onSurface.variant} />}
            label="Open Source Licences"
            onPress={() => Alert.alert("Licences", "Open Source Licences coming soon.")}
          />
        </SettingsSection>

        {/* Danger Zone */}
        <SettingsSection label="Account Actions">
          <SettingsLink
            icon={<LogOut size={20} color={Colors.primary.DEFAULT} />}
            label="Sign Out"
            labelColor={Colors.primary.DEFAULT}
            onPress={handleSignOut}
          />
          <SettingsLink
            icon={<Trash2 size={20} color={Colors.error.DEFAULT} />}
            label="Delete Account"
            labelColor={Colors.error.DEFAULT}
            onPress={handleDeleteAccount}
          />
        </SettingsSection>

        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 12,
            color: Colors.onSurface.variant + "88",
            textAlign: "center",
            marginTop: 24,
            marginBottom: 12,
          }}
        >
          UniFriends v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

/* ─── Reusable Settings Components ─── */

function SettingsSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
      <Text
        style={{
          fontFamily: "WorkSans_600SemiBold",
          fontSize: 12,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: Colors.onSurface.variant,
          marginBottom: 12,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          backgroundColor: Colors.surface.containerLow,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: Colors.outline.variant + "33",
          overflow: "hidden",
        }}
      >
        {children}
      </View>
    </View>
  );
}

function SettingsRow({
  icon,
  label,
  value,
  valueColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View
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
      {icon}
      <Text
        style={{
          fontFamily: "WorkSans_500Medium",
          fontSize: 15,
          color: Colors.onSurface.DEFAULT,
          flex: 1,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: "WorkSans_400Regular",
          fontSize: 14,
          color: valueColor ?? Colors.onSurface.variant,
          maxWidth: "50%",
        }}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

function SettingsToggle({
  icon,
  label,
  subtitle,
  value,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <View
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
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}>
          {label}
        </Text>
        {subtitle && (
          <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 12, color: Colors.onSurface.variant, marginTop: 2 }}>
            {subtitle}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: Colors.surface.containerHigh, true: Colors.primary.container }}
        thumbColor={value ? Colors.primary.DEFAULT : Colors.onSurface.variant}
      />
    </View>
  );
}

function SettingsLink({
  icon,
  label,
  labelColor,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  labelColor?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
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
      {icon}
      <Text
        style={{
          fontFamily: "WorkSans_500Medium",
          fontSize: 15,
          color: labelColor ?? Colors.onSurface.DEFAULT,
          flex: 1,
        }}
      >
        {label}
      </Text>
      <ChevronRight size={18} color={Colors.onSurface.variant + "66"} />
    </Pressable>
  );
}
