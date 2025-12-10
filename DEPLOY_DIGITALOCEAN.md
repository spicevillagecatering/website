# Deploying Spice Village Catering to DigitalOcean

Complete guide to deploy your Node.js website on DigitalOcean.

## 📋 Prerequisites

- DigitalOcean account (sign up at https://www.digitalocean.com)
- Domain name (optional, but recommended)
- SSH client (built into Mac/Linux, use PuTTY for Windows)

## 🚀 Step 1: Create a DigitalOcean Droplet

### 1.1 Create New Droplet

1. Log in to DigitalOcean
2. Click **"Create"** → **"Droplets"**
3. Choose configuration:
   - **Image**: Ubuntu 22.04 (LTS)
   - **Plan**: Basic Plan
     - **Regular Intel**: $6/month (1GB RAM) - Good for starting
     - **Regular Intel**: $12/month (2GB RAM) - Recommended
   - **Datacenter**: Choose closest to your users
   - **Authentication**: 
     - **SSH keys** (recommended) OR
     - **Password** (easier for beginners)
4. Click **"Create Droplet"**
5. Wait 1-2 minutes for droplet to be created
6. Note your droplet's **IP address** (e.g., 164.92.xxx.xxx)

## 🔐 Step 2: Connect to Your Server

### 2.1 Connect via SSH

**On Mac/Linux:**
```bash
ssh root@YOUR_DROPLET_IP
```

**On Windows (using PowerShell or Command Prompt):**
```bash
ssh root@YOUR_DROPLET_IP
```

If using password authentication, enter the password when prompted.

### 2.2 Initial Server Setup

Once connected, update the system:

```bash
apt update && apt upgrade -y
```

## 📦 Step 3: Install Node.js and NPM

### 3.1 Install Node.js (Version 18 LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
```

### 3.2 Verify Installation

```bash
node -v    # Should show v18.x.x
npm -v     # Should show version number
```

### 3.3 Install PM2 (Process Manager)

PM2 keeps your Node.js app running even after you disconnect:

```bash
npm install -g pm2
```

## 🔧 Step 4: Install Nginx (Web Server)

Nginx will serve your website and handle SSL:

```bash
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

### 4.1 Check Nginx Status

```bash
systemctl status nginx
```

You should see "active (running)". Visit `http://YOUR_DROPLET_IP` in your browser to see Nginx welcome page.

## 📁 Step 5: Upload Your Website Files

### 5.1 Option A: Using Git (Recommended)

**On your local computer:**

1. Initialize Git (if not already):
```bash
cd D:\SpiceVillage_Catering\website
git init
git add .
git commit -m "Initial commit"
```

2. Create a GitHub repository and push:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

**On your server:**

```bash
# Install Git
apt install git -y

# Clone your repository
cd /var/www
git clone YOUR_GITHUB_REPO_URL spice-village-catering
cd spice-village-catering
```

### 5.2 Option B: Using SCP (Direct Upload)

**On your local computer (Windows PowerShell):**

```powershell
# Navigate to your website folder
cd D:\SpiceVillage_Catering\website

# Upload all files
scp -r * root@YOUR_DROPLET_IP:/var/www/spice-village-catering
```

**On Mac/Linux:**

```bash
cd /path/to/website
scp -r * root@YOUR_DROPLET_IP:/var/www/spice-village-catering
```

**On your server:**

```bash
mkdir -p /var/www/spice-village-catering
# Files will be uploaded here
```

## 📦 Step 6: Install Dependencies and Build

**On your server:**

```bash
cd /var/www/spice-village-catering

# Install dependencies
npm install --production

# Build Tailwind CSS (if needed)
npm run build
```

## 🚀 Step 7: Configure and Start Your Application

### 7.1 Update Server Configuration

Edit `config/config.js` to set production port:

```bash
nano config/config.js
```

Update if needed (default port 3000 is fine).

### 7.2 Start with PM2

```bash
cd /var/www/spice-village-catering
pm2 start server.js --name "spice-village"
pm2 save
pm2 startup
```

The last command will show you a command to run - copy and execute it.

### 7.3 Check PM2 Status

```bash
pm2 status
pm2 logs spice-village
```

Your app should now be running on port 3000.

## 🌐 Step 8: Configure Nginx as Reverse Proxy

### 8.1 Create Nginx Configuration

```bash
nano /etc/nginx/sites-available/spice-village
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve static files directly
    location /assets {
        alias /var/www/spice-village-catering/assets;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

**Replace `YOUR_DOMAIN_OR_IP` with:**
- Your domain name (if you have one): `spicevillagecatering.ie`
- OR your droplet IP: `164.92.xxx.xxx`

Save and exit (Ctrl+X, then Y, then Enter).

### 8.2 Enable the Site

```bash
ln -s /etc/nginx/sites-available/spice-village /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default  # Remove default site
nginx -t  # Test configuration
systemctl reload nginx
```

## 🔒 Step 9: Set Up SSL Certificate (Let's Encrypt)

### 9.1 Install Certbot

```bash
apt install certbot python3-certbot-nginx -y
```

### 9.2 Get SSL Certificate

**If you have a domain:**

```bash
certbot --nginx -d spicevillagecatering.ie -d www.spicevillagecatering.ie
```

Follow the prompts:
- Enter your email
- Agree to terms
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

**If you don't have a domain:**
Skip this step - you can add SSL later when you get a domain.

### 9.3 Auto-Renewal

Certbot sets up auto-renewal automatically. Test it:

```bash
certbot renew --dry-run
```

## 🌍 Step 10: Configure Domain (Optional but Recommended)

### 10.1 Point Domain to Droplet

1. Go to your domain registrar (where you bought the domain)
2. Find DNS settings
3. Add/Update A record:
   - **Type**: A
   - **Name**: @ (or leave blank)
   - **Value**: YOUR_DROPLET_IP
   - **TTL**: 3600 (or default)

4. Add CNAME for www:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: spicevillagecatering.ie (or your domain)
   - **TTL**: 3600

### 10.2 Wait for DNS Propagation

DNS changes can take 5 minutes to 48 hours. Check with:

```bash
ping spicevillagecatering.ie
```

## 🔥 Step 11: Configure Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

## ✅ Step 12: Verify Deployment

1. Visit your website:
   - `http://YOUR_DROPLET_IP` (if no domain)
   - `https://spicevillagecatering.ie` (if domain configured)

2. Check all features:
   - Homepage loads
   - Menu displays
   - WhatsApp button works
   - Contact form works
   - QR code generates

## 🔄 Step 13: Set Up Auto-Deployment (Optional)

### 13.1 Create Deployment Script

```bash
nano /var/www/spice-village-catering/deploy.sh
```

Paste:

```bash
#!/bin/bash
cd /var/www/spice-village-catering
git pull origin main
npm install --production
npm run build
pm2 restart spice-village
echo "Deployment complete!"
```

Make it executable:

```bash
chmod +x /var/www/spice-village-catering/deploy.sh
```

### 13.2 Use GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml` in your repository for automatic deployment.

## 📊 Step 14: Monitoring and Maintenance

### 14.1 PM2 Commands

```bash
pm2 status              # Check app status
pm2 logs spice-village  # View logs
pm2 restart spice-village  # Restart app
pm2 stop spice-village     # Stop app
pm2 monit               # Monitor resources
```

### 14.2 Update Your Website

**Method 1: Manual Update**

```bash
cd /var/www/spice-village-catering
git pull
npm install --production
npm run build
pm2 restart spice-village
```

**Method 2: Using Deploy Script**

```bash
/var/www/spice-village-catering/deploy.sh
```

### 14.3 View Logs

```bash
# Application logs
pm2 logs spice-village

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## 🛠️ Troubleshooting

### Website Not Loading

1. Check PM2:
```bash
pm2 status
pm2 logs spice-village
```

2. Check Nginx:
```bash
systemctl status nginx
nginx -t
```

3. Check firewall:
```bash
ufw status
```

### Port Already in Use

```bash
# Find what's using port 3000
lsof -i :3000
# Kill the process if needed
pm2 delete spice-village
pm2 start server.js --name "spice-village"
```

### SSL Certificate Issues

```bash
# Renew certificate manually
certbot renew
# Check certificate status
certbot certificates
```

## 💰 Cost Estimation

- **Droplet**: $6-12/month
- **Domain**: ~$10-15/year
- **Total**: ~$7-13/month

## 📝 Quick Reference Commands

```bash
# Connect to server
ssh root@YOUR_DROPLET_IP

# Restart application
pm2 restart spice-village

# View logs
pm2 logs spice-village

# Update website
cd /var/www/spice-village-catering && git pull && npm install && pm2 restart spice-village

# Check Nginx
systemctl status nginx
nginx -t

# Check firewall
ufw status
```

## 🔐 Security Best Practices

1. **Change SSH Port** (optional but recommended)
2. **Disable root login** (create a new user)
3. **Set up fail2ban** (protect against brute force)
4. **Keep system updated**: `apt update && apt upgrade`
5. **Use strong passwords** or SSH keys
6. **Regular backups** of your website files

## 📞 Support

- DigitalOcean Docs: https://docs.digitalocean.com
- DigitalOcean Community: https://www.digitalocean.com/community
- PM2 Docs: https://pm2.keymetrics.io/docs/

## ✅ Deployment Checklist

- [ ] DigitalOcean account created
- [ ] Droplet created
- [ ] Connected via SSH
- [ ] Node.js installed
- [ ] PM2 installed
- [ ] Nginx installed
- [ ] Website files uploaded
- [ ] Dependencies installed
- [ ] PM2 started
- [ ] Nginx configured
- [ ] SSL certificate installed (if domain)
- [ ] Domain DNS configured (if domain)
- [ ] Firewall configured
- [ ] Website tested and working

---

**Your website should now be live! 🎉**

