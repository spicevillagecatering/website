# Quick Deployment Guide - DigitalOcean

## 🚀 Fast Track (5 Minutes)

### 1. Create Droplet
- Ubuntu 22.04, $6/month plan
- Note your IP address

### 2. Connect & Setup
```bash
ssh root@YOUR_IP
```

Then run:
```bash
# Upload server-setup.sh to server first, then:
chmod +x server-setup.sh
./server-setup.sh
```

### 3. Upload Website
**Option A: Using Git (Recommended)**
```bash
cd /var/www
git clone YOUR_GITHUB_REPO_URL spice-village-catering
cd spice-village-catering
npm install --production
npm run build
pm2 start server.js --name "spice-village"
pm2 save
pm2 startup
```

**Option B: Using SCP**
```bash
# On your local computer:
scp -r * root@YOUR_IP:/var/www/spice-village-catering
```

### 4. Configure Nginx
```bash
# Copy nginx-config.conf to server, then:
cp nginx-config.conf /etc/nginx/sites-available/spice-village
# Edit and replace YOUR_DOMAIN_OR_IP
nano /etc/nginx/sites-available/spice-village
ln -s /etc/nginx/sites-available/spice-village /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

### 5. Setup SSL (If you have domain)
```bash
certbot --nginx -d yourdomain.com
```

### 6. Done! 🎉
Visit `http://YOUR_IP` or `https://yourdomain.com`

## 📋 Essential Commands

```bash
# Restart app
pm2 restart spice-village

# View logs
pm2 logs spice-village

# Update website
cd /var/www/spice-village-catering
git pull
npm install
npm run build
pm2 restart spice-village
```

## 🔧 Troubleshooting

**Website not loading?**
```bash
pm2 status
systemctl status nginx
ufw status
```

**Need to check logs?**
```bash
pm2 logs spice-village
tail -f /var/log/nginx/error.log
```

---

**For detailed instructions, see `DEPLOY_DIGITALOCEAN.md`**

