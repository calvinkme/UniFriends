# UniFriends

A mobile app that helps university students make friends. It works a bit like a swipe-based
dating app, but the goal is friendship: students are matched with people in the same cohort,
often studying the same degree and units.

Built with **React Native (Expo)**, **TypeScript** and **Supabase**.

## Features

- **Hinge-style onboarding:** one question per screen (name, university, year, interests, bio).
- **Compatibility matching:** a custom scoring algorithm that weights degree and major most
  heavily, then interests and hobbies (`services/matchingAlgorithm.ts`), with fuzzy matching
  for degree names (`services/fuzzyMatch.ts`).
- **Discovery:** browse profiles and say yes or no to a connection.
- **Filters:** narrow people down by degree, major, year and interests.
- **Chat:** one-to-one messaging with your connections.
- **Groups:** add connections to a group yourself, or generate a group of a size you choose
  from compatibility scores, with support for partial groups and pending invites.
- **Accounts:** email sign-up with verification, Google sign-in, password reset by deep link.
- **Push notifications:** a Supabase Edge Function sends them (`supabase/functions/push-notification`).
- **University data:** degrees and majors for five Australian universities
  (`constants/degrees.ts`).

## Tech stack

| Area | Tools |
| --- | --- |
| App | React Native, Expo, Expo Router, TypeScript |
| Styling | NativeWind (Tailwind CSS) |
| State | Zustand (`stores/`) |
| Backend | Supabase (Postgres, Auth, Edge Functions) |
| Builds | EAS Build, Expo dev client |

## Getting started

```bash
npm install
cp .env.example .env      # add your own Supabase URL and anon key, and Google web client ID
npx expo start
```

Run on a device or emulator with `npm run android` or `npm run ios` (requires a dev build).
Type-check with `npm run typecheck`.

## Project layout

```
app/          screens and routes (auth, onboarding, tabs, chat, discovery, settings)
components/   shared UI components
services/     auth, database, matching algorithm, notifications, Supabase client
stores/       app state
supabase/     SQL and Edge Functions
constants/    degrees, config
```

## Status

Personal project, in active development.
