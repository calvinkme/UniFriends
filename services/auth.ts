import { makeRedirectUri } from "expo-auth-session";
import { supabase } from "./supabase";

const redirectUri = makeRedirectUri({
  scheme: "unifriends",
  path: "auth/callback",
});

let googleSignInConfigured = false;

function getGoogleSignIn() {
  try {
    const {
      GoogleSignin,
      isSuccessResponse,
    } = require("@react-native-google-signin/google-signin");

    if (!googleSignInConfigured) {
      GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true,
      });
      googleSignInConfigured = true;
    }

    return { GoogleSignin, isSuccessResponse };
  } catch {
    throw new Error(
      "Google Sign-In requires a development build. Please install the latest dev client APK."
    );
  }
}

function friendlyAuthError(error: { message: string; status?: number }): Error {
  const msg = error.message.toLowerCase();
  if (msg.includes("invalid login credentials")) {
    return new Error("Invalid login credentials. Check your email and password.");
  }
  if (msg.includes("email not confirmed")) {
    return new Error("Email not confirmed. Please verify your email first.");
  }
  if (msg.includes("user already registered") || msg.includes("already been registered")) {
    return new Error("An account with this email already exists. Try signing in.");
  }
  if (msg.includes("signup is not allowed") || msg.includes("signups not allowed")) {
    return new Error("Sign ups are currently disabled. Please try again later.");
  }
  if (msg.includes("rate limit") || msg.includes("too many requests") || error.status === 429) {
    return new Error("Too many requests. Please wait a moment and try again.");
  }
  return new Error(error.message);
}

// Email auth
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw friendlyAuthError(error);
  return data;
}

export async function verifyOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });
  if (error) throw friendlyAuthError(error);
  return data;
}

export async function resendVerificationEmail(email: string) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });
  if (error) throw friendlyAuthError(error);
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw friendlyAuthError(error);
  return data;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUri,
  });
  if (error) throw friendlyAuthError(error);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function onAuthStateChange(callback: (session: unknown) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}

// OAuth providers
export async function signInWithGoogle() {
  const { GoogleSignin, isSuccessResponse } = getGoogleSignIn();

  await GoogleSignin.hasPlayServices();
  const response = await GoogleSignin.signIn();

  if (!isSuccessResponse(response)) {
    throw new Error("Google sign-in was cancelled.");
  }

  const idToken = response.data.idToken;
  if (!idToken) {
    throw new Error("No ID token returned from Google.");
  }

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  });
  if (error) throw friendlyAuthError(error);
  return data;
}

