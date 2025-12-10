# DigitalOcean Deployment Checklist

Use this checklist to track your deployment progress.

## Pre-Deployment

- [ ] DigitalOcean account created
- [ ] Payment method added to DigitalOcean
- [ ] Domain name purchased (optional but recommended)
- [ ] Website tested locally (`npm run dev`)
- [ ] All images uploaded to `assets/images/`
- [ ] Logo uploaded to `assets/images/logo/logo.png`
- [ ] Git repository created (GitHub/GitLab/Bitbucket)
- [ ] Code pushed to repository

## Server Setup

- [ ] Droplet created (Ubuntu 22.04, $6-12/month)
- [ ] Droplet IP address noted
- [ ] Connected to server via SSH
- [ ] Server updated (`apt update && apt upgrade`)
- [ ] Node.js 18.x installed
- [ ] PM2 installed globally
- [ ] Nginx installed
- [ ] Certbot installed (for SSL)
- [ ] Git installed
- [ ] Firewall configured

## Application Deployment

- [ ] Website files uploaded to `/var/www/spice-village-catering`
- [ ] Dependencies installed (`npm install --production`)
- [ ] CSS built (`npm run build`)
- [ ] PM2 process started
- [ ] PM2 startup script configured
- [ ] Application running on port 3000

## Nginx Configuration

- [ ] Nginx configuration file created
- [ ] Domain/IP updated in config
- [ ] Site enabled (symlink created)
- [ ] Default site removed
- [ ] Nginx config tested (`nginx -t`)
- [ ] Nginx reloaded

## SSL Certificate (If using domain)

- [ ] Domain DNS configured (A record pointing to droplet IP)
- [ ] DNS propagated (checked with `ping`)
- [ ] SSL certificate obtained (`certbot --nginx`)
- [ ] Auto-renewal tested (`certbot renew --dry-run`)
- [ ] HTTPS redirect working

## Testing

- [ ] Website loads at IP address or domain
- [ ] Homepage displays correctly
- [ ] Menu section works
- [ ] WhatsApp button functional
- [ ] Contact form works
- [ ] QR code generates
- [ ] All images load correctly
- [ ] Mobile menu works
- [ ] SSL certificate valid (if using domain)
- [ ] HTTPS redirects working (if using domain)

## Post-Deployment

- [ ] Deployment script created (`deploy.sh`)
- [ ] Backup strategy in place
- [ ] Monitoring set up (PM2 monit)
- [ ] Log rotation configured
- [ ] Documentation saved locally
- [ ] Team members have access (if applicable)

## Maintenance

- [ ] Regular update schedule planned
- [ ] Backup schedule established
- [ ] Monitoring alerts configured
- [ ] SSL renewal automated
- [ ] Security updates scheduled

## Notes

- Droplet IP: _______________________
- Domain: _______________________
- SSH Key Location: _______________________
- Git Repository: _______________________
- Deployment Date: _______________________

---

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

