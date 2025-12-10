# Quick Start Guide

## Option 1: Use Immediately (No Installation Required)

The website is ready to use right now! Simply open `index.html` in your web browser. It uses Tailwind CSS via CDN, so no build process is needed.

## Option 2: Local Development with Build Process

If you want to use the local Tailwind build process:

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build Tailwind CSS:**
   ```bash
   npx tailwindcss -i ./src/input.css -o ./dist/output.css
   ```

4. **Update index.html** to use local CSS:
   - Change line 22 from CDN to: `<link rel="stylesheet" href="./dist/output.css">`

5. **Start development server (optional):**
   ```bash
   npm run dev
   ```

## Current Setup

- ✅ Website works immediately (using Tailwind CDN)
- ✅ All features functional
- ✅ WhatsApp integration ready
- ✅ South Indian menu included
- ✅ Responsive design
- ✅ Contact information displayed

## Next Steps

1. Replace image placeholders with your actual images
2. Update social media links (currently set to "#")
3. Customize colors in `tailwind.config.js` if needed
4. Add your logo to replace the placeholder

## Contact Information

- **WhatsApp**: 085 818 9052
- **Landline**: 01 413 0573

The WhatsApp button is already configured and will open a chat with the pre-filled message!

