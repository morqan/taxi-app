#!/usr/bin/env bash
#
# Build & run the app on Android — a real device (USB) or an emulator.
#   npm run android:dev          # auto: use a connected device, else boot an emulator
#   AVD_NAME=Pixel_7 npm run android:dev   # pick a specific emulator to boot
#
# Preference order: a connected USB device wins; otherwise a running emulator;
# otherwise the first available AVD is booted automatically.

# shellcheck source=scripts/_lib.sh
. "$(dirname "${BASH_SOURCE[0]}")/_lib.sh"

cd "$ROOT_DIR"
ensure_node

# --- locate the Android SDK --------------------------------------------------
SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
if [ -z "$SDK" ]; then
  if [ -d "$HOME/Library/Android/sdk" ]; then SDK="$HOME/Library/Android/sdk"
  elif [ -d "$HOME/Android/Sdk" ]; then SDK="$HOME/Android/Sdk"
  fi
fi
[ -n "$SDK" ] || die "Android SDK not found. Set ANDROID_HOME to your SDK path."
export ANDROID_HOME="$SDK"
export PATH="$SDK/platform-tools:$SDK/emulator:$PATH"
have adb || die "adb not found under $SDK/platform-tools."

# --- inspect currently attached, authorized devices --------------------------
authorized="$(adb devices | awk 'NR>1 && $2=="device" {print $1}')"
unauthorized="$(adb devices | awk 'NR>1 && $2=="unauthorized" {print $1}')"
physical="$(printf '%s\n' "$authorized" | grep -v '^emulator-' | grep . || true)"

if [ -n "$unauthorized" ]; then
  warn "A device is connected but unauthorized — accept the 'Allow USB debugging' prompt on the phone."
fi

target="$(printf '%s\n' "$physical" | head -n1)"
[ -z "$target" ] && target="$(printf '%s\n' "$authorized" | grep . | head -n1)"

# --- no device? boot an emulator --------------------------------------------
if [ -z "$target" ]; then
  have emulator || die "No device connected and no Android emulator binary found ($SDK/emulator)."
  avds="$(emulator -list-avds 2>/dev/null | grep . || true)"
  [ -n "$avds" ] || die "No device connected and no AVDs exist. Create one in Android Studio > Device Manager."

  AVD="${AVD_NAME:-$(printf '%s\n' "$avds" | head -n1)}"
  step "No device connected — booting emulator: $AVD"
  emulator -avd "$AVD" -netdelay none -netspeed full >/dev/null 2>&1 &

  info "Waiting for the emulator to come online..."
  adb wait-for-device
  until [ "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do
    sleep 2
  done
  ok "Emulator booted"
  target="$(adb devices | awk 'NR>1 && $2=="device" {print $1}' | head -n1)"
else
  case "$target" in
    emulator-*) step "Using running emulator: $target" ;;
    *)          step "Using USB device: $target" ;;
  esac
fi

info "Building and installing on: $target"
exec npx --no-install react-native run-android --deviceId "$target" "$@"
