# Deployment Guide

Complete guide for deploying Spice Village Catering website to production.

## 📋 Table of Contents

1. [Quick Deployment](#quick-deployment)
2. [DigitalOcean Setup](#digitalocean-setup)
3. [Server Configuration](#server-configuration)
4. [SSL Setup](#ssl-setup)
5. [Nginx Configuration](#nginx-configuration)
6. [Troubleshooting](#troubleshooting)

## 🚀 Quick Deployment

### Prerequisites

- DigitalOcean account (or similar VPS provider)
- Domain name (optional but recommended)
- SSH access to server

### Steps

1. **Create Droplet:**
   - Ubuntu 22.04 LTS
   - Minimum 1GB RAM
   - Choose your preferred region

2. **Run Setup Script:**
   ```bash
   chmod +x server-setup.sh
   ./server-setup.sh
   ```

3. **Upload Files:**
   ```bash
   scp -r * user@your-server-ip:/var/www/spicevillage/
   ```

4. **Install Dependencies:**
   ```bash
   ssh user@your-server-ip
   cd /var/www/spicevillage
   npm install --production
   ```

5. **Start Server:**
   ```bash
   npm start
   ```

## 🌐 DigitalOcean Setup

### 1. Create Droplet

- **Image**: Ubuntu 22.04 LTS
- **Plan**: Basic ($6/month minimum)
- **Region**: Choose closest to your users
- **Authentication**: SSH keys (recommended)

### 2. Initial Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### 3. Configure Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## ⚙️ Server Configuration

### Using PM2 (Recommended)

```bash
# Start application
pm2 start server.js --name spicevillage

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Environment Variables

Create `.env` file:
```
PORT=3000
NODE_ENV=production
```

## 🔒 SSL Setup

### Using Certbot (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (already configured)
sudo certbot renew --dry-run
```

## 🌍 Nginx Configuration

### Basic Configuration

Edit `/etc/nginx/sites-available/spicevillage`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/spicevillage /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 Troubleshooting

### Server Not Starting

1. Check Node.js version: `node --version`
2. Check dependencies: `npm install`
3. Check port: Ensure port 3000 is available
4. Check logs: `pm2 logs spicevillage`

### Nginx Issues

1. Test configuration: `sudo nginx -t`
2. Check error logs: `sudo tail -f /var/log/nginx/error.log`
3. Restart Nginx: `sudo systemctl restart nginx`

### SSL Certificate Issues

1. Check certificate: `sudo certbot certificates`
2. Renew manually: `sudo certbot renew`
3. Check domain DNS: Ensure A record points to server IP

## 📊 Monitoring

### PM2 Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs spicevillage

# Monitor resources
pm2 monit
```

### Server Resources

```bash
# Check disk space
df -h

# Check memory
free -h

# Check CPU
top
```

## 🔄 Updates

### Updating the Website

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Install new dependencies:**
   ```bash
   npm install
   ```

3. **Restart application:**
   ```bash
   pm2 restart spicevillage
   ```

## 📝 Checklist

- [ ] Server created and accessible
- [ ] Node.js and npm installed
- [ ] Application files uploaded
- [ ] Dependencies installed
- [ ] PM2 configured
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Firewall rules set
- [ ] Monitoring setup
- [ ] Backup strategy in place

---

For detailed deployment instructions, refer to the main README.md file.

