#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/alchaar-web}"
BRANCH="${BRANCH:-prod}"
UNIT_NAME="alchaar-web"

cd "$APP_DIR"
git config --global --add safe.directory "$APP_DIR" || true
git fetch origin "+refs/heads/$BRANCH:refs/remotes/origin/$BRANCH"
git checkout --force -B "$BRANCH" "origin/$BRANCH"

podman build --tag localhost/alchaar-web:latest .

export XDG_RUNTIME_DIR="/run/user/$(id -u)"
export DBUS_SESSION_BUS_ADDRESS="unix:path=$XDG_RUNTIME_DIR/bus"
mkdir -p "$HOME/.config/containers/systemd"
cp -f ops/quadlet/*.container "$HOME/.config/containers/systemd/"
systemctl --user daemon-reload
systemctl --user enable "$UNIT_NAME"
systemctl --user restart "$UNIT_NAME"
systemctl --user --no-pager --full status "$UNIT_NAME"
