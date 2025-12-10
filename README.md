# Spice Village Catering Website

A modern, responsive website for Spice Village Catering - Authentic South Indian Catering Service.

## Features

- 🎨 Modern, attractive design with Tailwind CSS
- 📱 Fully responsive (mobile, tablet, desktop)
- 🍛 Comprehensive South Indian menu
- 💬 WhatsApp integration for easy contact
- ⚡ Fast and optimized with Vite
- 🎯 Smooth scrolling and animations
- 📞 Contact information prominently displayed

## Tech Stack

- **HTML5** - Structure
- **Tailwind CSS** - Styling
- **JavaScript** - Interactivity
- **Vite** - Build tool and dev server
- **Node.js** - Package management

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build Tailwind CSS:
```bash
npm run tailwind:watch
```

Or for a one-time build:
```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css
```

3. Start development server:
```bash
npm run dev
```

The website will open at `http://localhost:3000`

### Build for Production

1. Build Tailwind CSS:
```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
```

2. Build with Vite:
```bash
npm run build
```

## Project Structure

```
website/
├── index.html          # Main HTML file
├── package.json        # Node.js dependencies
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── vite.config.js      # Vite configuration
├── src/
│   ├── input.css       # Tailwind CSS input file
│   └── js/
│       └── script.js    # JavaScript functionality
└── dist/
    └── output.css      # Compiled Tailwind CSS (generated)
```

## Contact Information

- **WhatsApp**: 085 818 9052
- **Landline**: 01 413 0573

## Customization

### Replacing Images

All image placeholders are marked with `<i class="fas fa-image">` icons. Simply replace these with your actual images:

1. Create an `assets/images/` folder
2. Add your images
3. Update the `src` attributes in `index.html`

### Colors

Edit `tailwind.config.js` to customize colors:
- `primary`: Deep Red (#C62828)
- `secondary`: Gold/Saffron (#F59E0B)
- `accent`: Fresh Green (#2E7D32)

### Menu Items

Edit the menu sections in `index.html` to add, remove, or modify menu items.

## WhatsApp Integration

The website includes WhatsApp integration:
- Floating WhatsApp button (bottom right)
- WhatsApp links throughout the site
- Contact form redirects to WhatsApp

WhatsApp number format: `353858189052` (international format)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use and modify as needed.

## 🚀 Deployment

### Deploy to DigitalOcean

Complete deployment guide available:
- **Full Guide**: See `DEPLOY_DIGITALOCEAN.md` for detailed instructions
- **Quick Guide**: See `DEPLOYMENT_QUICK_GUIDE.md` for fast deployment
- **Checklist**: Use `DEPLOYMENT_CHECKLIST.md` to track progress

### Quick Deploy Steps

1. Create DigitalOcean droplet (Ubuntu 22.04)
2. Run `server-setup.sh` on the server
3. Upload website files
4. Configure Nginx using `nginx-config.conf`
5. Set up SSL with Certbot
6. Done! 🎉

## Support

For any issues or questions, please contact:
- WhatsApp: 085 818 9052
- Phone: 01 413 0573

