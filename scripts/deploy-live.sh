#!/bin/bash
set -euo pipefail

APP_DIR=/var/www/nancy

cd "$APP_DIR"
git fetch origin main
git reset --hard origin/main

export NODE_OPTIONS=--max-old-space-size=1536

npm install
npm run build

cd "$APP_DIR/nancy-admin"
npm install
npm run build

cp "$APP_DIR/scripts/nginx-nancy.conf" /etc/nginx/sites-available/nancy
ln -sfn /etc/nginx/sites-available/nancy /etc/nginx/sites-enabled/nancy
rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/nancy-admin
nginx -t
systemctl reload nginx

pm2 restart nancy
echo DEPLOY_DONE
