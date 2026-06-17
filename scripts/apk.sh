#!/usr/bin/env bash
#
# Build a release APK to hand to testers.
#   npm run apk            # assembleRelease
#   npm run apk -- clean   # clean build first
#
# The APK is signed with the debug keystore (the RN template default), so it
# installs on any device for testing. It is NOT a Play Store upload build —
# generate a real keystore before publishing (reactnative.dev/docs/signed-apk-android).

# shellcheck source=scripts/_lib.sh
. "$(dirname "${BASH_SOURCE[0]}")/_lib.sh"

cd "$ROOT_DIR"
ensure_node

if [ "${1:-}" = "clean" ]; then
  step "Cleaning previous Android build"
  ( cd android && ./gradlew clean )
fi

step "Building release APK"
( cd android && ./gradlew assembleRelease )

APK="$ROOT_DIR/android/app/build/outputs/apk/release/app-release.apk"
[ -f "$APK" ] || die "Build finished but APK not found at $APK"

size="$(du -h "$APK" | cut -f1)"
step "APK ready"
ok "$APK"
info "Size: $size"
info "Signed with the debug keystore — fine for testers, not for the Play Store."

# Open the output folder so the file is easy to grab and share.
if [ "$(uname)" = "Darwin" ] && have open; then
  open "$(dirname "$APK")"
fi
