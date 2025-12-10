#!/bin/bash

# Deployment script for Spice Village Catering
# Run this script on your DigitalOcean server after initial setup

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/spice-village-catering || exit

# Pull latest changes (if using Git)
if [ -d .git ]; then
    echo "📥 Pulling latest changes from Git..."
    git pull origin main
fi

# Install/update dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build Tailwind CSS
echo "🎨 Building CSS..."
npm run build

# Restart PM2 process
echo "🔄 Restarting application..."
pm2 restart spice-village || pm2 start server.js --name "spice-village"

# Show status
echo "✅ Deployment complete!"
echo "📊 Application status:"
pm2 status

echo "📝 Recent logs:"
pm2 logs spice-village --lines 10 --nostream

