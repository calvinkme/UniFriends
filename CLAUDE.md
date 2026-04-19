# CLAUDE.md — Mobile App Rules (React Native + Expo)

## Always Do First
- **Read the project `spec.md` and `TODO.md`** before writing any code each session.
- **Check `brand_assets/`** for logos, color palettes, icons, and style guides. Use real assets over placeholders.
- **Run `npx expo start`** and confirm the dev server is live before making changes.
**Invoke the `frontend-design` skill** before building any new screen or UI component — use it for design thinking, color/typography direction, and aesthetic guardrails. Adapt its web guidance to mobile (e.g. spatial composition → screen layout, hover states → press states).

## Tech Stack
- **Framework:** React Native with Expo (latest SDK)
- **Styling:** NativeWind (Tailwind for RN) — utility-first, consistent tokens
- **Navigation:** Expo Router (file-based routing)
- **State:** Zustand or Redux Toolkit (pick one per project, stay consistent)
- **TypeScript:** Always. No `any` types. Strict mode enabled.
- **Icons:** `expo-symbols` (iOS) + `lucide-react-native` or custom SVGs

## Reference Images / Wireframes
- If a reference image or wireframe is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content where needed. Do not improve or add to the design.
- If wireframes exist in `wireframes/` or `flows/`, read them before implementing any screen.
- If no reference: design from scratch with high craft (see guardrails below).
- After implementing a screen, take a screenshot on the emulator/simulator, compare against reference, fix mismatches. Do at least 2 comparison rounds.

## Screenshot Workflow
- Use Expo's built-in screenshot or the platform emulator/simulator screenshot tool.
- Save screenshots to `./screenshots/` with descriptive names: `home-screen-v1.png`, `profile-dark-v2.png`.
- When comparing against reference, be specific: "touch target is 36px but should be 48px min", "bottom tab icons are 20px but reference shows 24px", "card has no safe area padding on iPhone 15".
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, touch target sizing, safe areas.

## Platform Rules
- **Always handle safe areas.** Use `SafeAreaProvider` and `useSafeAreaInsets` from `react-native-safe-area-context`. Never hardcode status bar heights.
- **Respect platform conventions:**
  - iOS: Follow Human Interface Guidelines — large titles, SF-style spacing, swipe-back navigation, bottom sheets over modals where possible.
  - Android: Follow Material Design 3 — FABs, top app bars, system back gesture support, proper ripple effects.
- **Touch targets:** Minimum 48×48dp. No exceptions. Use `hitSlop` when the visual element is smaller.
- **Keyboard handling:** Every input screen must handle keyboard avoidance properly. Use `KeyboardAvoidingView` or `react-native-keyboard-aware-scroll-view`. Test with both text and numeric keyboards.
- **Permissions:** Always check and request at point of use, not on app launch. Use `expo-permissions` or the specific module's permission API. Explain to the user why the permission is needed.

## Navigation Patterns
- Use Expo Router's file-based routing. Screens go in `app/` directory.
- Stack navigators for linear flows (onboarding, checkout).
- Tab navigator for main app sections (max 5 tabs).
- Never nest more than 2 levels of stack navigation without good reason.
- All navigation transitions should feel native — no custom animated transitions unless the design specifically calls for them.

## Anti-Generic Guardrails
- **Colors:** Never use default NativeWind/Tailwind palette as-is (blue-500, indigo-600, etc.). Define a custom brand palette in `tailwind.config.js` and derive all colors from it.
- **Typography:** Use at least 2 font weights (e.g. regular + semibold). Load custom fonts via `expo-font` if the design calls for them. Apply tight letter-spacing on headings, generous line-height (1.6–1.7) on body text.
- **Shadows:** Use platform-appropriate elevation. iOS: layered `shadowOffset`/`shadowRadius`/`shadowColor`. Android: `elevation` property. Never flat — add subtle depth.
- **Spacing:** Use consistent spacing tokens (4, 8, 12, 16, 24, 32, 48). Never random values. Define a spacing scale and stick to it.
- **Lists:** Use `FlashList` over `FlatList` for long lists. Always provide `estimatedItemSize`. Never render more than what's visible.
- **Loading states:** Every async operation needs a loading indicator. Use skeleton screens over spinners where possible. Never leave the user staring at a blank screen.
- **Error states:** Every screen that fetches data needs an error state with a retry action. Don't just show "Something went wrong" — be specific.
- **Empty states:** Every list/feed needs a designed empty state, not just blank space.
- **Interactive states:** Every `Pressable`/`TouchableOpacity` needs visual feedback. Use opacity changes (0.7), scale transforms, or platform ripple effects. No silent taps.
- **Animations:** Only animate `transform` and `opacity`. Use `react-native-reanimated` for complex animations, not the Animated API. Worklet-based animations run on the UI thread — always prefer this.
- **Images:** Use `expo-image` (not `Image` from react-native). It handles caching, blurhash placeholders, and transitions. Always specify dimensions or aspect ratios.

## Performance Budget
- **Cold start:** Target < 2 seconds on mid-range devices.
- **JS bundle:** Keep under 5MB. Monitor with `npx expo export` and check bundle size.
- **Memory:** Profile with Flipper or React Native DevTools. No memory leaks from unsubscribed listeners or unmounted state updates.
- **Re-renders:** Use `React.memo`, `useMemo`, and `useCallback` intentionally (not everywhere). Profile with React DevTools before optimizing.
- **Hermes:** Always enabled (default in modern Expo). Verify in `app.json`.

## Project Structure
```
app/                    # Expo Router screens
  (tabs)/               # Tab navigator group
    index.tsx           # Home tab
    profile.tsx         # Profile tab
    _layout.tsx         # Tab layout config
  _layout.tsx           # Root layout
  onboarding/           # Stack group for onboarding flow
components/             # Reusable UI components
  ui/                   # Primitives (Button, Input, Card)
  features/             # Feature-specific composites
hooks/                  # Custom hooks
services/               # API clients, auth, storage
stores/                 # Zustand/Redux stores
constants/              # Colors, spacing, config
types/                  # TypeScript type definitions
assets/                 # Fonts, images, icons
brand_assets/           # Logos, color guides (check first!)
wireframes/             # Reference designs
screenshots/            # Comparison screenshots
spec.md                 # Project requirements & milestones
TODO.md                 # Task breakdown
CLAUDE.md               # This file
```

## Testing
- Test on **both iOS and Android** before marking a screen as done.
- Test with **large font / accessibility sizes** enabled.
- Test with **dark mode** if the app supports it.
- Test with **slow network** (use Network Link Conditioner or Android emulator throttling).
- Test **landscape orientation** if the app supports it, otherwise lock to portrait in `app.json`.

## App Store / Play Store Prep
- App icons: Provide 1024×1024 source icon. Use `expo-build-properties` for adaptive icons on Android.
- Splash screen: Configure via `expo-splash-screen`. Keep it simple — logo on brand color.
- `app.json` must include: `name`, `slug`, `version`, `orientation`, `icon`, `splash`, `ios.bundleIdentifier`, `android.package`, `ios.supportsTablet`.
- Use EAS Build for both platforms: `eas build --platform all`.
- Use EAS Submit for store uploads: `eas submit`.

## Hard Rules
- Do not add screens, features, or navigation not in the spec/reference
- Do not "improve" a reference design — match it
- Do not skip safe area handling on any screen
- Do not use inline styles for anything reused more than once — extract to NativeWind classes or a component
- Do not use `any` in TypeScript
- Do not ignore Android — test both platforms every session
- Do not use deprecated APIs (`AsyncStorage` → use `expo-secure-store` or `@react-native-async-storage/async-storage`)
- Do not hardcode strings that will face users — extract to a constants/i18n file for future localization
- Every PR/commit: one feature or fix. Keep changes reviewable.
