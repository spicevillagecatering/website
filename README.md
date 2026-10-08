# Spice Village Catering — Website

Premium catering website for **Spice Village Catering**, built with Next.js 14, Tailwind CSS and TypeScript.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Local Development](#local-development)
4. [Building for Production](#building-for-production)
5. [Environment Variables](#environment-variables)
6. [Deploy to AWS EC2](#deploy-to-aws-ec2)
   - [1. Launch EC2 Instance](#1-launch-ec2-instance)
   - [2. Connect & Configure Server](#2-connect--configure-server)
   - [3. Install Node.js](#3-install-nodejs)
   - [4. Clone & Build the App](#4-clone--build-the-app)
   - [5. Run with PM2](#5-run-with-pm2)
   - [6. Configure Nginx Reverse Proxy](#6-configure-nginx-reverse-proxy)
   - [7. SSL with Certbot (HTTPS)](#7-ssl-with-certbot-https)
   - [8. Auto-start on Reboot](#8-auto-start-on-reboot)
7. [Updating the Live Site](#updating-the-live-site)
8. [Adding Real Images](#adding-real-images)
9. [Useful PM2 Commands](#useful-pm2-commands)

---

## Project Structure

```
website/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx        # Sticky header, mobile hamburger menu
│   │   ├── Hero.tsx          # Full-viewport hero with CTA buttons
│   │   ├── About.tsx         # About section with stats
│   │   ├── Services.tsx      # 7 service cards grid
│   │   ├── Gallery.tsx       # CSS masonry photo gallery
│   │   ├── Reviews.tsx       # Video placeholders + testimonials
│   │   ├── Locations.tsx     # 4 branch location cards
│   │   ├── Contact.tsx       # Contact form → WhatsApp redirect
│   │   ├── Footer.tsx        # Dark footer with all links
│   │   └── WhatsApp.tsx      # Floating WhatsApp button
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── images/               # Place all your photos here
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | 18.x or 20.x LTS | Use [nvm](https://github.com/nvm-sh/nvm) to manage versions |
| npm | 9+ | Comes with Node |
| Git | Any recent | For cloning and deployments |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (hot reload at http://localhost:3000)
npm run dev

# 3. Lint check
npm run lint

# 4. Type check
npx tsc --noEmit
```

The dev server runs at **http://localhost:3000** with hot module replacement.

---

## Building for Production

```bash
# Build optimised static output
npm run build

# Start the production server locally (port 3000)
npm start
```

A successful build outputs something like:

```
Route (app)          Size     First Load JS
┌ ○ /                7.06 kB  94.3 kB
└ ○ /_not-found      873 B    88.1 kB
○ (Static)  prerendered as static content
```

---

## Environment Variables

Create a `.env.local` file for local overrides (never commit this file):

```bash
cp .env.example .env.local
```

`.env.example` (safe to commit):

```env
# WhatsApp business number (no + prefix, no spaces)
NEXT_PUBLIC_WA_NUMBER=353858189052

# Site URL — used for SEO canonical tags
NEXT_PUBLIC_SITE_URL=https://www.spicevillagecatering.ie
```

Access in code: `process.env.NEXT_PUBLIC_WA_NUMBER`

---

## Deploy to AWS EC2

### Architecture Overview

```
Internet → Route 53 (DNS) → EC2 Instance
                               ├── Nginx  (port 80/443, reverse proxy)
                               └── PM2    (Next.js on port 3000)
```

---

### 1. Launch EC2 Instance

1. Go to **AWS Console → EC2 → Launch Instance**
2. Choose **Ubuntu Server 24.04 LTS (HVM), SSD** (Free Tier eligible: `t2.micro` / recommended: `t3.small`)
3. Create or select a key pair — download the `.pem` file and keep it safe
4. **Security Group** — add these inbound rules:

   | Type  | Protocol | Port | Source    |
   |-------|----------|------|-----------|
   | SSH   | TCP      | 22   | Your IP   |
   | HTTP  | TCP      | 80   | 0.0.0.0/0 |
   | HTTPS | TCP      | 443  | 0.0.0.0/0 |

5. Storage: **20 GB** gp3 is sufficient
6. Launch the instance and note the **Public IPv4 address**

---

### 2. Connect & Configure Server

```bash
# On your local machine — fix key permissions (Mac/Linux)
chmod 400 your-key.pem

# SSH into the instance
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

Once connected, update the system:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl nginx
```

---

### 3. Install Node.js

Use **nvm** to install and manage Node.js:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node -v   # v20.x.x
npm -v    # 10.x.x
```

Install PM2 globally:

```bash
npm install -g pm2
```

---

### 4. Clone & Build the App

```bash
# Create app directory
sudo mkdir -p /var/www/spicevillage
sudo chown ubuntu:ubuntu /var/www/spicevillage

# Clone your repository
cd /var/www/spicevillage
git clone https://github.com/YOUR_USERNAME/spicevillage-website.git .

# Install dependencies
npm install

# Create production env file
cp .env.example .env.local
nano .env.local
# → Set NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com

# Build the app
npm run build
```

---

### 5. Run with PM2

```bash
# Start the Next.js production server
pm2 start npm --name "spicevillage" -- start

# Check it's running
pm2 status

# View live logs
pm2 logs spicevillage
```

The app is now running on **http://localhost:3000** inside the server.

---

### 6. Configure Nginx Reverse Proxy

Create a new Nginx site config:

```bash
sudo nano /etc/nginx/sites-available/spicevillage
```

Paste the following (replace `yourdomain.com`):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;

    # Static assets — cache aggressively
    location /_next/static/ {
        proxy_pass http://localhost:3000/_next/static/;
        proxy_http_version 1.1;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        proxy_pass http://localhost:3000/images/;
        proxy_http_version 1.1;
        expires 30d;
        add_header Cache-Control "public";
    }

    # All other requests → Next.js
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
}
```

Enable the site and test:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/spicevillage /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

Your site is now accessible at **http://YOUR_EC2_IP**.

---

### 7. SSL with Certbot (HTTPS)

> Requires a domain name pointed to the EC2 IP via DNS (A record).

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate (replace with your actual domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts — Certbot will update Nginx automatically

# Test auto-renewal
sudo certbot renew --dry-run
```

Certbot adds a cron job to renew certificates automatically every 60 days.

---

### 8. Auto-start on Reboot

```bash
# Save PM2 process list
pm2 save

# Generate systemd startup script
pm2 startup systemd -u ubuntu --hp /home/ubuntu

# Copy and run the command that pm2 outputs, e.g.:
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.x.x/bin \
  /home/ubuntu/.nvm/versions/node/v20.x.x/lib/node_modules/pm2/bin/pm2 \
  startup systemd -u ubuntu --hp /home/ubuntu
```

Now the app will restart automatically if the EC2 instance reboots.

---

## Updating the Live Site

Every time you push new code:

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Go to app directory
cd /var/www/spicevillage

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild
npm run build

# Restart PM2 (zero-downtime reload)
pm2 reload spicevillage
```

---

## Adding Real Images

1. Place image files in `public/images/` locally
2. Commit and push to Git, then pull on EC2
3. In each component, replace placeholder divs with `<Image>` (instructions are in every component file):

```tsx
// Before (placeholder)
<div className="img-ph w-full h-full" style={{ background: '...' }}>
  <span>Hero Banner Image · 1920 × 1080 px</span>
</div>

// After (real image)
import Image from 'next/image';
<Image
  src="/images/hero-banner.jpg"
  alt="Spice Village Catering"
  fill
  priority
  className="object-cover object-center"
/>
```

**Recommended image sizes:**

| Placeholder | File | Size |
|------------|------|------|
| Hero banner | `hero-banner.jpg` | 1920 × 1080 px |
| About portrait | `about-main.jpg` | 800 × 1000 px |
| About food square | `about-food.jpg` | 300 × 300 px |
| Service cards (×7) | `service-01.jpg` … `service-07.jpg` | 800 × 450 px |
| Gallery (×12) | `gallery-01.jpg` … `gallery-12.jpg` | Varied (see Gallery.tsx) |
| Review thumbnails (×4) | `review-01.jpg` … `review-04.jpg` | 720 × 1280 px (9:16) |
| Location photos (×4) | `location-clondalkin.jpg` etc. | 600 × 300 px |

---

## Useful PM2 Commands

```bash
pm2 status                  # List all processes and their status
pm2 logs spicevillage       # Tail live logs
pm2 logs spicevillage --lines 100   # Last 100 log lines
pm2 reload spicevillage     # Zero-downtime restart
pm2 restart spicevillage    # Hard restart
pm2 stop spicevillage       # Stop the process
pm2 delete spicevillage     # Remove from PM2
pm2 monit                   # Live CPU/memory dashboard
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Start production | `npm start` |
| Lint | `npm run lint` |
| Type check | `npx tsc --noEmit` |
| SSH to EC2 | `ssh -i your-key.pem ubuntu@EC2_IP` |
| Reload app | `pm2 reload spicevillage` |
| Nginx reload | `sudo systemctl reload nginx` |
| Check Nginx logs | `sudo tail -f /var/log/nginx/error.log` |

---

*Built with Next.js 14 · Tailwind CSS · TypeScript*  
*Spice Village Catering © 2025*
