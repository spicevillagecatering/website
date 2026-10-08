#!/usr/bin/env bash
# Manual one-command deploy:  EC2_HOST=1.2.3.4 EC2_USER=ubuntu EC2_KEY=~/key.pem ./deploy/deploy.sh
set -euo pipefail
: "${EC2_HOST:?set EC2_HOST}" "${EC2_USER:=ubuntu}" "${EC2_KEY:?set EC2_KEY}"
APP_DIR="${APP_DIR:-/home/ubuntu/spicevillage}"
SSH="ssh -i $EC2_KEY -o StrictHostKeyChecking=accept-new"

npm ci
npx tsc --noEmit
npm run build

rsync -az --delete -e "$SSH" \
  --exclude node_modules --exclude .git --exclude .github --exclude ".env*" \
  ./ "$EC2_USER@$EC2_HOST:$APP_DIR/"

$SSH "$EC2_USER@$EC2_HOST" \
  "cd $APP_DIR && npm ci --omit=dev && (pm2 reload spicevillage || pm2 start npm --name spicevillage -- start) && pm2 save"
echo "Deployed to $EC2_HOST"
