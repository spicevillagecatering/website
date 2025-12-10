# Quick Start - Node.js Server

## 🚀 Installation & Setup

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Version 14+ recommended

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   npm run dev
   ```
   This starts the server with auto-reload on file changes.

   Or for production:
   ```bash
   npm start
   ```

4. **Open Your Browser**
   - Visit: `http://localhost:3000`
   - The website is now running on Node.js!

## ✅ What's Been Updated

### Top Bar (Centered)
- ✅ Centered contact information
- ✅ Added emails: info@spicevillagecatering.ie and spicevillagecatering22@gmail.com
- ✅ Added Instagram link

### Header Logo
- ✅ Logo now displays from `assets/images/logo/logo.png`
- ✅ Falls back to icon if logo not found

### Node.js Structure
- ✅ Express server setup (`server.js`)
- ✅ Custom API routes (`routes/api.js`)
- ✅ Configuration file (`config/config.js`)
- ✅ Modular structure for easy customization

## 📁 File Structure

```
website/
├── server.js              # Main server (Express)
├── config/
│   └── config.js          # Settings & contact info
├── routes/
│   └── api.js             # Custom API endpoints
├── assets/
│   └── images/
│       ├── logo/          # Your logo here
│       └── menu/          # Menu images here
├── src/
│   └── js/                # JavaScript files
└── index.html             # Main page
```

## 🎯 Adding Custom Features

### Example: Add a New API Endpoint

1. Edit `routes/api.js`:
```javascript
router.get('/your-endpoint', (req, res) => {
    res.json({ message: 'Hello!' });
});
```

2. The endpoint will be available at: `http://localhost:3000/api/your-endpoint`

### Example: Update Configuration

Edit `config/config.js` to change contact info, settings, etc.

## 📝 Next Steps

1. **Upload Logo**: Place your logo at `assets/images/logo/logo.png`
2. **Upload Menu Images**: Add images to `assets/images/menu/`
3. **Customize**: Add your custom features in `routes/api.js`

## 🔧 Troubleshooting

- **Port already in use?** Change PORT in `config/config.js`
- **Module not found?** Run `npm install`
- **Server not starting?** Check Node.js version (need 14+)

## 📚 More Info

See `README_NODEJS.md` for detailed documentation on:
- Adding database integration
- Email functionality
- Authentication
- Deployment options

