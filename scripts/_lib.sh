#!/usr/bin/env bash
#
# Shared helpers for the project dev scripts (metro / ios / android / apk).
# Sourced by the other scripts in this folder — not meant to be run directly.

set -euo pipefail

# --- pretty output -----------------------------------------------------------
if [ -t 1 ]; then
  _c_reset='\033[0m'; _c_blue='\033[34m'; _c_green='\033[32m'
  _c_yellow='\033[33m'; _c_red='\033[31m'; _c_bold='\033[1m'
else
  _c_reset=''; _c_blue=''; _c_green=''; _c_yellow=''; _c_red=''; _c_bold=''
fi

info() { printf "${_c_blue}▸${_c_reset} %s\n" "$*"; }
ok()   { printf "${_c_green}✓${_c_reset} %s\n" "$*"; }
warn() { printf "${_c_yellow}!${_c_reset} %s\n" "$*"; }
step() { printf "\n${_c_bold}%s${_c_reset}\n" "$*"; }
die()  { printf "${_c_red}✗ %s${_c_reset}\n" "$*" >&2; exit 1; }

# Absolute path to the repo root (this file lives in <root>/scripts).
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

have() { command -v "$1" >/dev/null 2>&1; }

# Switch to the Node version pinned in .nvmrc (22) when nvm is available.
# A no-op if nvm is not installed — we just warn if the running Node is too old.
ensure_node() {
  if [ -s "$HOME/.nvm/nvm.sh" ]; then
    export NVM_DIR="$HOME/.nvm"
    # shellcheck disable=SC1091
    . "$HOME/.nvm/nvm.sh"
    nvm use >/dev/null 2>&1 || nvm install >/dev/null 2>&1 || true
  fi
  have node || die "Node.js not found. Install Node 22 (see .nvmrc)."
  local major
  major="$(node -p 'process.versions.node.split(".")[0]')"
  if [ "$major" -lt 22 ]; then
    warn "Node $(node -v) detected, but this project needs Node >=22 (.nvmrc). Run: nvm use"
  fi
}

# React Native CLI through the local install.
rn() { npx --no-install react-native "$@"; }
