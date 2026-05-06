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

export default function TermsScreen() {
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
          Terms of Service
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

        <Section title="1. Acceptance of Terms">
          <P>
            By creating an account or using UniFriends, you agree to be bound by these Terms of Service. If you do not agree, do not use the app. We may update these terms from time to time, and your continued use constitutes acceptance of any changes.
          </P>
        </Section>

        <Section title="2. Eligibility">
          <P>
            UniFriends is intended for university students aged 18 and older. By using the app, you represent that you are at least 18 years old and are currently enrolled at, or recently graduated from, a recognised university or higher education institution.
          </P>
        </Section>

        <Section title="3. Account Registration">
          <P>
            You must provide accurate and complete information when creating your account, including a valid email address and your university affiliation. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.
          </P>
          <P>
            You agree to notify us immediately of any unauthorised use of your account. We are not liable for any loss arising from unauthorised access to your account.
          </P>
        </Section>

        <Section title="4. User Conduct">
          <P>
            You agree to use UniFriends in a respectful and lawful manner. You must not use the app to harass, bully, threaten, or intimidate other users. You must not impersonate another person or misrepresent your identity, university, or academic credentials.
          </P>
          <P>
            You must not post or share content that is obscene, hateful, discriminatory, defamatory, or otherwise objectionable. You must not use the app for commercial solicitation, advertising, or spam.
          </P>
          <P>
            You must not attempt to gain unauthorised access to other users' accounts, the app's systems, or any data not intended for you.
          </P>
        </Section>

        <Section title="5. Connections and Matching">
          <P>
            UniFriends uses a compatibility algorithm to suggest potential connections based on shared interests, academic background, and other profile information. Connection suggestions are not endorsements or guarantees of compatibility.
          </P>
          <P>
            When you send a connection request, the other user may accept or decline at their discretion. Mutual connections enable direct messaging. You may block or report users at any time.
          </P>
        </Section>

        <Section title="6. Messaging and Groups">
          <P>
            Messages sent through UniFriends are intended for personal, non-commercial communication between connected users. Group chats are subject to the same conduct rules as direct messages. You are solely responsible for the content of your messages.
          </P>
          <P>
            We reserve the right to review reported messages and take action, including removing content or suspending accounts, if messages violate these terms.
          </P>
        </Section>

        <Section title="7. User Content">
          <P>
            You retain ownership of the content you post on UniFriends, including your profile information, photos, and messages. By posting content, you grant UniFriends a non-exclusive, worldwide, royalty-free licence to use, display, and distribute your content solely for the purpose of operating and improving the app.
          </P>
          <P>
            You must not post content that infringes on the intellectual property rights of others. We may remove content that violates these terms without prior notice.
          </P>
        </Section>

        <Section title="8. Privacy">
          <P>
            Your use of UniFriends is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information. By using the app, you consent to the practices described in the Privacy Policy.
          </P>
        </Section>

        <Section title="9. Account Termination">
          <P>
            You may delete your account at any time through the app settings. Upon deletion, your profile, connections, and messages will be permanently removed. We reserve the right to suspend or terminate accounts that violate these terms, without prior notice.
          </P>
        </Section>

        <Section title="10. Disclaimers">
          <P>
            UniFriends is provided on an "as is" and "as available" basis. We do not guarantee that the app will be uninterrupted, error-free, or secure. We do not endorse or verify the identity or credentials of any user. You interact with other users at your own risk.
          </P>
          <P>
            We are not responsible for any interactions, disputes, or harm that may arise between users, whether online or in person.
          </P>
        </Section>

        <Section title="11. Limitation of Liability">
          <P>
            To the maximum extent permitted by law, UniFriends and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the app, including but not limited to loss of data, loss of profits, or personal injury.
          </P>
        </Section>

        <Section title="12. Changes to These Terms">
          <P>
            We may modify these Terms of Service at any time. We will notify users of material changes through the app or by email. Your continued use of UniFriends after changes are posted constitutes acceptance of the updated terms.
          </P>
        </Section>

        <Section title="13. Contact">
          <P>
            If you have questions about these Terms of Service, please contact us at support@unifriends.app.
          </P>
        </Section>
      </ScrollView>
    </View>
  );
}
