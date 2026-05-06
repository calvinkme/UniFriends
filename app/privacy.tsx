import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Colors } from "@/constants";

const EFFECTIVE_DATE = "6 May 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 28 }}>
      <Text
        style={{
          fontFamily: "Manrope_700Bold",
          fontSize: 16,
          color: Colors.onSurface.DEFAULT,
          marginBottom: 10,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function P({ children }: { children: string }) {
  return (
    <Text
      style={{
        fontFamily: "WorkSans_400Regular",
        fontSize: 14,
        lineHeight: 23,
        color: Colors.onSurface.variant,
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={{ flexDirection: "row", paddingLeft: 8, marginBottom: 6 }}>
      <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 14, color: Colors.onSurface.variant, marginRight: 8 }}>
        {"•"}
      </Text>
      <Text
        style={{
          fontFamily: "WorkSans_400Regular",
          fontSize: 14,
          lineHeight: 23,
          color: Colors.onSurface.variant,
          flex: 1,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

export default function PrivacyScreen() {
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
          Privacy Policy
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontFamily: "WorkSans_500Medium",
            fontSize: 13,
            color: Colors.onSurface.variant,
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          Effective date: {EFFECTIVE_DATE}
        </Text>

        <P>
          UniFriends is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your choices regarding your data.
        </P>

        <Section title="1. Information We Collect">
          <P>When you create an account and use UniFriends, we may collect the following information:</P>
          <Bullet>Account information: your name, email address, date of birth, and password.</Bullet>
          <Bullet>Profile information: your university, degree, majors, academic year, GPA ranking, bio, interests, active courses, and profile photo.</Bullet>
          <Bullet>Connection data: your connection requests, accepted connections, blocked users, and group memberships.</Bullet>
          <Bullet>Messages: the content of direct messages and group chats you send and receive through the app.</Bullet>
          <Bullet>Usage data: how you interact with the app, including screens viewed, features used, and time spent.</Bullet>
          <Bullet>Device information: your device type, operating system, and push notification tokens.</Bullet>
        </Section>

        <Section title="2. How We Use Your Information">
          <P>We use the information we collect to:</P>
          <Bullet>Create and maintain your account and profile.</Bullet>
          <Bullet>Match you with other students using our compatibility algorithm, which considers shared interests, academic background, and courses.</Bullet>
          <Bullet>Enable messaging and group chat functionality between connected users.</Bullet>
          <Bullet>Send you notifications about new connections, messages, and group activity (which you can control in Settings).</Bullet>
          <Bullet>Enforce our Terms of Service and respond to reports of inappropriate behaviour.</Bullet>
          <Bullet>Improve the app, fix bugs, and develop new features.</Bullet>
        </Section>

        <Section title="3. Information Sharing">
          <P>We do not sell your personal information. We may share your information in the following circumstances:</P>
          <Bullet>With other users: your profile information (name, university, degree, interests, bio, and photo) is visible to other users through the discovery and connection features. You can control visibility of academic year and GPA in your privacy settings.</Bullet>
          <Bullet>With service providers: we use third-party services (such as Supabase for data storage and authentication, and Expo for push notifications) that process data on our behalf under strict confidentiality agreements.</Bullet>
          <Bullet>For legal compliance: we may disclose information if required by law, court order, or government request, or if necessary to protect the safety of our users.</Bullet>
        </Section>

        <Section title="4. Data Storage and Security">
          <P>
            Your data is stored securely using industry-standard encryption and access controls. We use Supabase as our backend infrastructure, which provides encryption at rest and in transit. While we take reasonable measures to protect your information, no system is completely secure, and we cannot guarantee absolute security.
          </P>
        </Section>

        <Section title="5. Data Retention">
          <P>
            We retain your personal information for as long as your account is active. When you delete your account, we permanently remove your profile, connections, and messages. Some anonymised, aggregated data may be retained for analytics purposes.
          </P>
        </Section>

        <Section title="6. Your Rights and Choices">
          <P>You have the following rights regarding your personal information:</P>
          <Bullet>Access and update: you can view and edit your profile information at any time through the app.</Bullet>
          <Bullet>Privacy controls: you can toggle visibility of your profile, online status, academic year, and GPA ranking in Settings.</Bullet>
          <Bullet>Notification preferences: you can customise which notifications you receive in Settings.</Bullet>
          <Bullet>Block users: you can block any user to prevent them from seeing your profile or contacting you.</Bullet>
          <Bullet>Delete your account: you can permanently delete your account and all associated data from Settings.</Bullet>
        </Section>

        <Section title="7. Children's Privacy">
          <P>
            UniFriends is not intended for anyone under the age of 18. We do not knowingly collect personal information from children. If we become aware that a user is under 18, we will promptly delete their account and associated data.
          </P>
        </Section>

        <Section title="8. Third-Party Links">
          <P>
            The app may contain links to external websites or services. We are not responsible for the privacy practices of third-party services. We encourage you to review the privacy policies of any external services you access through the app.
          </P>
        </Section>

        <Section title="9. Changes to This Policy">
          <P>
            We may update this Privacy Policy from time to time. We will notify you of material changes through the app or by email. Your continued use of UniFriends after changes are posted constitutes acceptance of the updated policy.
          </P>
        </Section>

        <Section title="10. Contact Us">
          <P>
            If you have questions or concerns about this Privacy Policy or how your data is handled, please contact us at privacy@unifriends.app.
          </P>
        </Section>
      </ScrollView>
    </View>
  );
}
