# Node.js Setup Guide for Spice Village Catering

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
This will start the server with auto-reload using nodemon.

### 3. Start Production Server
```bash
npm start
```

The website will be available at: `http://localhost:3000`

## 📁 Project Structure

```
website/
├── server.js              # Main Express server
├── config/
│   └── config.js          # Configuration file (contact info, settings)
├── routes/
│   └── api.js             # Custom API routes
├── assets/
│   └── images/            # Images folder
├── src/
│   ├── js/                # JavaScript files
│   └── input.css          # Tailwind CSS source
├── index.html             # Main HTML file
└── package.json           # Dependencies
```

## 🔧 Adding Custom Elements

### Adding Custom API Routes

1. **Edit `routes/api.js`** to add new endpoints:
```javascript
router.get('/your-endpoint', (req, res) => {
    res.json({ message: 'Your custom response' });
});
```

2. **Import in `server.js`**:
```javascript
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
```

### Adding Custom Configuration

Edit `config/config.js` to add new settings:
```javascript
module.exports = {
    // Your custom settings
    customFeature: {
        enabled: true,
        // ... more settings
    }
};
```

### Adding Custom Middleware

In `server.js`, add middleware:
```javascript
// Custom middleware example
app.use((req, res, next) => {
    // Your custom logic
    next();
});
```

## 📧 Contact Form Integration

The contact form currently redirects to WhatsApp. To add email functionality:

1. Install email package:
```bash
npm install nodemailer
```

2. Add email configuration in `config/config.js`

3. Update the contact route in `routes/api.js`

## 🎨 Custom Styling

- Edit `src/input.css` for Tailwind customizations
- Run `npm run build` to compile CSS
- Or use `npm run tailwind:watch` for auto-compilation

## 🔌 Adding More Features

### Database Integration
```bash
npm install mongoose  # For MongoDB
# or
npm install mysql2   # For MySQL
```

### Authentication
```bash
npm install express-session passport
```

### File Uploads
```bash
npm install multer
```

## 📝 Environment Variables

Create a `.env` file for sensitive data:
```
PORT=3000
NODE_ENV=development
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
```

Install dotenv:
```bash
npm install dotenv
```

Then in `server.js`:
```javascript
require('dotenv').config();
```

## 🚀 Deployment

### For Production:
1. Set `NODE_ENV=production`
2. Build CSS: `npm run build`
3. Start server: `npm start`

### Recommended Hosting:
- **Heroku**: Easy deployment with Git
- **DigitalOcean**: Full control
- **AWS/Google Cloud**: Scalable options

## 💡 Tips

- All custom routes go in `routes/api.js`
- Configuration goes in `config/config.js`
- Static files (images, CSS) go in `assets/`
- JavaScript modules go in `src/js/`

## 🆘 Need Help?

Check the main `README.md` for general website information, or refer to:
- Express.js documentation: https://expressjs.com/
- Node.js documentation: https://nodejs.org/

