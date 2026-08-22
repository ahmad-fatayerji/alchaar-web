#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/alchaar-web-staging}"
BRANCH="staging"
UNIT_NAME="alchaar-web-staging"

cd "$APP_DIR"
git config --global --add safe.directory "$APP_DIR" || true
git fetch origin "+refs/heads/$BRANCH:refs/remotes/origin/$BRANCH"
git checkout --force -B "$BRANCH" "origin/$BRANCH"

podman build --tag localhost/alchaar-web-staging:latest .

export XDG_RUNTIME_DIR="/run/user/$(id -u)"
export DBUS_SESSION_BUS_ADDRESS="unix:path=$XDG_RUNTIME_DIR/bus"
mkdir -p "$HOME/.config/containers/systemd"
cp -f ops/quadlet/alchaar-web-staging.container \
  "$HOME/.config/containers/systemd/alchaar-web-staging.container"
systemctl --user daemon-reload
systemctl --user restart "$UNIT_NAME"
systemctl --user --no-pager --full status "$UNIT_NAME"

if ! curl --fail --silent --show-error \
  --retry 20 --retry-all-errors --retry-delay 1 \
  http://127.0.0.1:3001/ >/dev/null; then
  echo "ERROR: staging did not become healthy on 127.0.0.1:3001" >&2
  podman logs --tail 100 alchaar-web-staging >&2 || true
  exit 1
fi
