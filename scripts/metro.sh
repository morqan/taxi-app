#!/usr/bin/env bash
#
# Start the Metro bundler.
#   npm run metro              # start Metro
#   npm run metro -- --reset-cache
#
# Any extra args are forwarded to `react-native start`.

# shellcheck source=scripts/_lib.sh
. "$(dirname "${BASH_SOURCE[0]}")/_lib.sh"

cd "$ROOT_DIR"
ensure_node

step "Starting Metro bundler"
info "Press Ctrl+C to stop. Keep this running while you launch iOS/Android."
exec npx --no-install react-native start "$@"
