# taxi-app

A React Native rider app for taxi booking. Rebuilt in 2026 on a modern stack from the
legacy version (RN 0.59.9, Ignite, 2019). The modernization history lives in `decision.md`
and `EXECUTION-PLAN.md`; architecture decisions are in `docs/adr/ADR-001`.

## Stack

- **React Native 0.86** (bare CLI) + **React 19** + **TypeScript 5.8** (strict)
- **Redux Toolkit + RTK Query** — state and data fetching
- **React Navigation v7** (native-stack + bottom-tabs)
- **NativeWind v4** (Tailwind) — styling
- **i18next** — localization (az / ru / en, with automatic language detection)
- **MSW** — mock backend for development
- **react-native-keychain** — session tokens (not AsyncStorage)
- **react-native-config** — environment variables
- Maps: **Leaflet** in a WebView + a free OSM stack (**Nominatim** geocoding, **OSRM** routing)

## Prerequisites

- **Node 22** (see `.nvmrc`) — required by RN 0.86
- **Watchman** (recommended on macOS)
- **iOS:** macOS + Xcode + CocoaPods (`bundle install`, or `sudo gem install cocoapods`)
- **Android:** Android Studio with an SDK + at least one emulator (AVD), or a USB device
  with USB debugging enabled. `adb` must be on your `PATH` (or `ANDROID_HOME` set).

## Setup

```sh
nvm use                  # Node 22
npm install
cp .env.example .env      # API_URL, USE_MOCK=true, GOOGLE_MAPS_API_KEY
```

With `USE_MOCK=true` the app runs against the MSW mock — no real backend needed.

## Running the app

The dev scripts live in `scripts/` and handle the boilerplate for you (Node version,
CocoaPods, device/emulator selection).

```sh
npm run metro            # 1. start the Metro bundler (keep it running)
npm run ios:sim          # 2. build & run on an iOS Simulator
npm run android:dev      # 3. build & run on Android (USB device, else an emulator)
npm run apk              # 4. build a release APK to share with testers
```

Notes:

- **`npm run metro`** — starts the bundler. Pass `-- --reset-cache` to clear the cache.
- **`npm run ios:sim`** — installs CocoaPods on first run, then launches the Simulator.
  Target a specific device with `npm run ios:sim -- "iPhone 16 Pro"`.
- **`npm run android:dev`** — uses a connected USB device if one is present; otherwise it
  boots an emulator automatically. Pick the emulator with `AVD_NAME=Pixel_7 npm run android:dev`.
- **`npm run apk`** — runs `assembleRelease` and prints the APK path
  (`android/app/build/outputs/apk/release/app-release.apk`), opening the folder on macOS.
  The APK is signed with the debug keystore, so it installs on any device for testing —
  it is **not** a Play Store build. Use `npm run apk -- clean` for a clean build.

## Scripts

| Script                            | What it does                                 |
| --------------------------------- | -------------------------------------------- |
| `npm run metro`                   | Start the Metro bundler                      |
| `npm run ios:sim`                 | Build & run on an iOS Simulator              |
| `npm run android:dev`             | Build & run on an Android device or emulator |
| `npm run apk`                     | Build a release APK for testers              |
| `npm run typecheck`               | `tsc --noEmit`                               |
| `npm run lint` / `lint:fix`       | ESLint 9 (flat config)                       |
| `npm run format` / `format:check` | Prettier                                     |
| `npm run build`                   | Build the JS bundle (`react-native bundle`)  |

Pre-commit (husky + lint-staged) runs lint + typecheck. CI (GitHub Actions):
`install → typecheck → lint → format → build`.

## Status

A modern **scaffold** is in place (navigation, screens, a mock-backed API layer, i18n,
map preview). **Automated tests are out of scope** (owner's decision). A production MVP
still needs a real backend, a payment provider, real-time tracking, and the driver app —
see the "Remaining" section in `decision.md`.

## Structure

```
src/
  api/          # baseApi (RTK Query) + DTO types
  features/     # auth, orders, payments, profile, promo, news, geo — by feature
  components/ui # primitives (Button, Input, Card, Screen)
  navigation/   # Root / Auth / Main (tabs + detail stack)
  i18n/         # i18next + az/ru/en dictionaries
  mocks/        # MSW (db + handlers)
  store/        # Redux store + typed hooks
  theme/        # colors
```
