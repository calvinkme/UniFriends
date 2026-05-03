import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  ExternalLink,
} from "lucide-react-native";
import { Colors } from "@/constants";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_SECTIONS: { title: string; items: FaqItem[] }[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "How do I create an account?",
        answer:
          "Tap \"Continue with Email\" on the login screen, enter your email and choose a password that meets the requirements (8+ characters, uppercase, lowercase, number, and special character). You'll receive a 6-digit verification code to confirm your email.",
      },
      {
        question: "How do I set up my profile?",
        answer:
          "After verifying your email, you'll be guided through onboarding: enter your name and age, select your university and degree, choose your academic year, pick your interests, and write a short bio. You can also upload a profile photo.",
      },
      {
        question: "Can I change my profile information later?",
        answer:
          "Yes! Go to your Profile tab and tap \"Edit Profile\" to update your name, bio, university, degree, majors, academic year, interests, and profile photo at any time.",
      },
    ],
  },
  {
    title: "Connections",
    items: [
      {
        question: "How does matching work?",
        answer:
          "UniFriends uses a compatibility algorithm that considers shared interests, courses, and academic background to suggest the best matches for you. Each profile shows a compatibility percentage score.",
      },
      {
        question: "What happens when I connect with someone?",
        answer:
          "When you tap the star button on someone's profile, a connection request is sent. If the other person has already sent you a request, you'll be matched immediately and can start chatting. Otherwise, they'll see your request in their Connections tab.",
      },
      {
        question: "Can I undo a skip?",
        answer:
          "Currently, skipped profiles are hidden until you refresh your feed. Tap \"Refresh Matches\" on the main screen to bring back all profiles, including ones you previously skipped.",
      },
    ],
  },
  {
    title: "Privacy & Safety",
    items: [
      {
        question: "Who can see my profile?",
        answer:
          "By default, your profile is visible to other verified university students. You can toggle \"Profile visible\" off in Settings > Privacy to hide your profile from discovery.",
      },
      {
        question: "Can I hide my academic year or GPA?",
        answer:
          "Yes. Go to Settings > Privacy and toggle off \"Show academic year\" or \"Show GPA ranking\". These details will be hidden from your public profile.",
      },
      {
        question: "How do I report someone?",
        answer:
          "If you encounter inappropriate behaviour, go to Settings > Support > Report a Problem and describe the issue. Our team will review and take action.",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        question: "How do I sign out?",
        answer:
          "Go to your Profile tab and tap \"Sign Out\", or go to Settings > Account Actions > Sign Out.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Go to Settings > Account Actions > Delete Account. This will permanently remove your profile, connections, and messages. This action cannot be undone.",
      },
      {
        question: "I forgot my password. What do I do?",
        answer:
          "On the sign-in screen, try signing up again with the same email — you'll receive a new verification code. If issues persist, contact us at support@unifriends.app.",
      },
    ],
  },
];

function FaqAccordion({ item }: { item: FaqItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.outline.variant + "33",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Text
          style={{
            fontFamily: "WorkSans_500Medium",
            fontSize: 15,
            color: Colors.onSurface.DEFAULT,
            flex: 1,
          }}
        >
          {item.question}
        </Text>
        {expanded ? (
          <ChevronUp size={18} color={Colors.onSurface.variant} />
        ) : (
          <ChevronDown size={18} color={Colors.onSurface.variant} />
        )}
      </View>
      {expanded && (
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 14,
            lineHeight: 22,
            color: Colors.onSurface.variant,
            marginTop: 10,
          }}
        >
          {item.answer}
        </Text>
      )}
    </Pressable>
  );
}

export default function HelpScreen() {
  const insets = useSafeAreaInsets();

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
        <Text
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 18,
            color: Colors.onSurface.DEFAULT,
          }}
        >
          Help Centre
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <View style={{ paddingHorizontal: 24, marginTop: 8, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              fontSize: 15,
              lineHeight: 22,
              color: Colors.onSurface.variant,
            }}
          >
            Find answers to common questions below. Can't find what you're looking for? Reach out to our team.
          </Text>
        </View>

        {/* FAQ Sections */}
        {FAQ_SECTIONS.map((section) => (
          <View key={section.title} style={{ marginBottom: 24, paddingHorizontal: 24 }}>
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
              {section.title}
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
              {section.items.map((item) => (
                <FaqAccordion key={item.question} item={item} />
              ))}
            </View>
          </View>
        ))}

        {/* Contact Section */}
        <View style={{ paddingHorizontal: 24, marginTop: 8 }}>
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
            Still need help?
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
            <Pressable
              onPress={() => Linking.openURL("mailto:support@unifriends.app")}
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
              <Mail size={20} color={Colors.primary.DEFAULT} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "WorkSans_500Medium",
                    fontSize: 15,
                    color: Colors.onSurface.DEFAULT,
                  }}
                >
                  Email Support
                </Text>
                <Text
                  style={{
                    fontFamily: "WorkSans_400Regular",
                    fontSize: 12,
                    color: Colors.onSurface.variant,
                    marginTop: 2,
                  }}
                >
                  support@unifriends.app
                </Text>
              </View>
              <ExternalLink size={16} color={Colors.onSurface.variant + "66"} />
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL("mailto:feedback@unifriends.app")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 14,
                gap: 14,
              }}
            >
              <MessageCircle size={20} color={Colors.primary.DEFAULT} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "WorkSans_500Medium",
                    fontSize: 15,
                    color: Colors.onSurface.DEFAULT,
                  }}
                >
                  Send Feedback
                </Text>
                <Text
                  style={{
                    fontFamily: "WorkSans_400Regular",
                    fontSize: 12,
                    color: Colors.onSurface.variant,
                    marginTop: 2,
                  }}
                >
                  feedback@unifriends.app
                </Text>
              </View>
              <ExternalLink size={16} color={Colors.onSurface.variant + "66"} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
