#!/bin/bash

# Initial server setup script for DigitalOcean
# Run this ONCE when first setting up your server

echo "🔧 Setting up Spice Village Catering server..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2
echo "📦 Installing PM2..."
npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
apt install nginx -y
systemctl start nginx
systemctl enable nginx

# Install Certbot for SSL
echo "📦 Installing Certbot..."
apt install certbot python3-certbot-nginx -y

# Install Git
echo "📦 Installing Git..."
apt install git -y

# Configure Firewall
echo "🔥 Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Create project directory
echo "📁 Creating project directory..."
mkdir -p /var/www/spice-village-catering

# Set permissions
chown -R $USER:$USER /var/www/spice-village-catering

echo "✅ Server setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Upload your website files to /var/www/spice-village-catering"
echo "2. Run: cd /var/www/spice-village-catering && npm install"
echo "3. Run: pm2 start server.js --name 'spice-village'"
echo "4. Configure Nginx (see DEPLOY_DIGITALOCEAN.md)"
echo "5. Set up SSL certificate with Certbot"

