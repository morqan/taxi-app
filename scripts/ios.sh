#!/usr/bin/env bash
#
# Build & run the app on an iOS Simulator.
#   npm run ios:sim                       # default simulator
#   npm run ios:sim -- "iPhone 16 Pro"   # a specific simulator by name
#
# Installs CocoaPods on first run (when ios/Pods is missing). macOS only.

# shellcheck source=scripts/_lib.sh
. "$(dirname "${BASH_SOURCE[0]}")/_lib.sh"

cd "$ROOT_DIR"

[ "$(uname)" = "Darwin" ] || die "iOS builds require macOS."
have xcrun || die "Xcode command line tools not found. Install Xcode."
ensure_node

# --- CocoaPods (install once, or when the lockfile is newer than the install) -
if [ ! -d ios/Pods ] || [ ios/Podfile.lock -nt ios/Pods/Manifest.lock ] 2>/dev/null; then
  step "Installing CocoaPods dependencies"
  if [ -f Gemfile ] && have bundle; then
    ( cd ios && bundle exec pod install )
  elif have pod; then
    ( cd ios && pod install )
  else
    die "CocoaPods not found. Install it: 'bundle install' or 'sudo gem install cocoapods'."
  fi
  ok "Pods ready"
fi

# --- simulator selection -----------------------------------------------------
SIM="${1:-${IOS_SIMULATOR:-}}"

step "Launching app on iOS Simulator"
if [ -n "$SIM" ]; then
  info "Simulator: $SIM"
  exec npx --no-install react-native run-ios --simulator "$SIM"
else
  info "Using the default simulator (pass a name to override, e.g. \"iPhone 16 Pro\")."
  exec npx --no-install react-native run-ios
fi
