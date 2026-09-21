#!/bin/bash
set -euo pipefail

APP_DIR=/var/www/nancy
REPO=https://github.com/n52933952-eng/nancy.git
DOMAIN=nancyajram.net
CDN=https://pub-d918eaf6d1224425b84c52d14cc1b420.r2.dev

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y git nginx curl

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

mkdir -p /var/www
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
else
  git -C "$APP_DIR" pull
fi

cd "$APP_DIR"
cat > .env.production <<EOF
NEXT_PUBLIC_SITE_URL=https://$DOMAIN
NEXT_PUBLIC_CDN_URL=$CDN
EOF

npm install
npm run build

pm2 delete nancy >/dev/null 2>&1 || true
pm2 start npm --name nancy -- start
pm2 save
pm2 startup systemd -u root --hp /root >/dev/null 2>&1 || true

cat > /etc/nginx/sites-available/nancy <<EOF
server {
  listen 80;
  server_name $DOMAIN www.$DOMAIN;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
EOF

ln -sfn /etc/nginx/sites-available/nancy /etc/nginx/sites-enabled/nancy
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "Site is running. After Cloudflare DNS is on, add HTTPS with:"
echo "apt-get install -y certbot python3-certbot-nginx && certbot --nginx -d $DOMAIN -d www.$DOMAIN"
