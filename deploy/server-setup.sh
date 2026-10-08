#!/usr/bin/env bash
# ONE-TIME server prep. Run on the EC2 box:  sudo bash server-setup.sh yourdomain.com
# Backs up the existing site + nginx config, then points nginx at the Next.js app (PM2, port 3000).
set -euo pipefail
DOMAIN="${1:?usage: server-setup.sh yourdomain.com}"
APP_DIR=/var/www/spicevillage
BACKUP=/root/site-backup-$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP"
cp -a /etc/nginx "$BACKUP/nginx"
[ -d /var/www ] && cp -a /var/www "$BACKUP/www" || true
echo "Backup saved to $BACKUP"

command -v node >/dev/null || { curl -fsSL https://deb.nodesource.com/setup_20.x | bash -; apt-get install -y nodejs; }
command -v nginx >/dev/null || apt-get install -y nginx
command -v pm2   >/dev/null || npm install -g pm2

mkdir -p "$APP_DIR"; chown -R "${SUDO_USER:-ubuntu}":"${SUDO_USER:-ubuntu}" "$APP_DIR"

cat > /etc/nginx/sites-available/spicevillage <<NGINX
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;

    location /_next/static/ { proxy_pass http://127.0.0.1:3000; add_header Cache-Control "public, max-age=31536000, immutable"; }
    location /videos/       { proxy_pass http://127.0.0.1:3000; add_header Cache-Control "public, max-age=604800"; }
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NGINX

# Disable the old site's config (kept in the backup), enable the new one
rm -f /etc/nginx/sites-enabled/default
for f in /etc/nginx/sites-enabled/*; do [ "$f" != /etc/nginx/sites-enabled/spicevillage ] && echo "Disabling old site: $f" && rm -f "$f"; done
ln -sf /etc/nginx/sites-available/spicevillage /etc/nginx/sites-enabled/spicevillage
nginx -t && systemctl reload nginx

sudo -u "${SUDO_USER:-ubuntu}" bash -c 'pm2 startup systemd -u "$USER" --hp "$HOME" | tail -1 | bash' || true
echo "Server ready. Run the first deploy, then: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
