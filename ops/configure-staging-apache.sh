#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/alchaar-web-staging}"
SITE_NAME="staging.alchaarpharmacy.com"
SOURCE="$APP_DIR/ops/apache/$SITE_NAME.conf"
TARGET="/etc/apache2/sites-available/$SITE_NAME.conf"

if ! sudo -n true 2>/dev/null; then
  echo "ERROR: passwordless sudo is required to configure Apache." >&2
  exit 1
fi

sudo install -o root -g root -m 0644 "$SOURCE" "$TARGET"
sudo a2enmod proxy proxy_http headers
sudo a2ensite "$SITE_NAME"
sudo apache2ctl configtest
sudo systemctl reload apache2

echo "Apache is proxying http://$SITE_NAME to http://127.0.0.1:3001."
echo "After DNS resolves, enable TLS with:"
echo "  sudo certbot --apache -d $SITE_NAME --redirect"
