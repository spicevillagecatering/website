# Spice Village Catering Website

A modern, responsive website for Spice Village Catering - Authentic South Indian Catering Service in Dublin, Ireland.

## 📋 Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Quick Start](#quick-start)
4. [Development](#development)
5. [Deployment](#deployment)
6. [Customization](#customization)
7. [AI & Chatbot Integration](#-ai--chatbot-integration)
8. [Contact](#contact)

## ✨ Features

- 🎨 Modern, attractive design with Tailwind CSS
- 📱 Fully responsive (mobile, tablet, desktop)
- 🍛 Comprehensive South Indian menu with interactive tabs
- 💬 WhatsApp integration for easy contact
- ⚡ Fast and optimized
- 🎯 Smooth scrolling and animations
- 📞 Contact information prominently displayed
- 🖼️ Image gallery and kitchen showcase
- 📝 Blog section for updates and recipes

## 📁 Project Structure

```
WebSite/
├── pages/                  # Individual page content files
│   ├── home.html
│   ├── about.html
│   ├── menu.html
│   ├── services.html
│   ├── blog.html
│   ├── gallery.html
│   ├── kitchen.html
│   └── contact.html
├── components/             # Reusable HTML components
│   ├── header.html
│   ├── footer.html
│   ├── topbar.html
│   └── floating-buttons.html
├── styles/                 # CSS stylesheets
│   └── main.css
├── scripts/                # Server-side scripts
│   ├── load-components.js
│   └── ai-integration.js  # AI & Chatbot integration helper
├── examples/               # Integration examples
│   └── chatbot-integration-example.js
├── src/                    # Source files
│   ├── input.css          # Tailwind CSS input
│   └── js/
│       ├── script.js      # Main JavaScript
│       └── menu-data.js   # Menu data
├── assets/                 # Static assets
│   └── images/            # Image files
├── routes/                 # API routes
│   └── api.js
├── config/                 # Configuration files
│   └── config.js
├── server.js              # Express server
├── package.json           # Dependencies
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Access the website:**
   - Open your browser and navigate to `http://localhost:3000`

### Build for Production

1. **Build Tailwind CSS:**
   ```bash
   npm run build
   ```

2. **The website is ready to deploy!**

## 💻 Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload (nodemon)
- `npm run build` - Build Tailwind CSS for production
- `npm run tailwind:watch` - Watch and rebuild Tailwind CSS on changes

### AI & Chatbot Setup

1. **Configure your chatbot** in `src/js/chatbot.js`
2. **Set environment variables** for API keys (see [AI & Chatbot Integration](#-ai--chatbot-integration))
3. **Test the integration** using the examples in `examples/chatbot-integration-example.js`

### Page Structure

The website uses a modular structure:
- **Pages**: Individual HTML content files in `pages/` directory
- **Components**: Reusable components (header, footer, etc.) in `components/` directory
- **Server**: Express.js server that combines components and pages dynamically

### Adding New Pages

1. Create a new HTML file in `pages/` directory
2. Add the route in `server.js`:
   ```javascript
   app.get('/new-page', (req, res) => {
       const pageContent = loadPageContent('new-page');
       const html = loadPageTemplate(pageContent, 'Page Title', 'Page Description');
       res.send(html);
   });
   ```

## 🌐 Deployment

### Deploy to DigitalOcean

1. **Create a DigitalOcean Droplet:**
   - Choose Ubuntu 22.04
   - Minimum 1GB RAM recommended

2. **Run server setup script:**
   ```bash
   chmod +x server-setup.sh
   ./server-setup.sh
   ```

3. **Upload website files:**
   - Use SFTP or Git to upload files to the server

4. **Configure Nginx:**
   - Use the provided `nginx-config.conf` as a template
   - Set up SSL with Certbot

5. **Start the server:**
   ```bash
   npm start
   ```

### Environment Variables

Create a `.env` file (optional):
```
PORT=3000
NODE_ENV=production
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize colors:
- `primary`: Deep Red (#C62828)
- `secondary`: Gold/Saffron (#F59E0B)
- `accent`: Fresh Green (#2E7D32)
- `dark`: Dark Background (#1A1A1A)
- `light`: Light Background (#FAF9F6)

### Menu Items

Edit `src/js/menu-data.js` to update menu items and descriptions.

### Images

Replace images in `assets/images/` directory:
- Logo: `assets/images/logo/logo.jpg`
- Menu images: `assets/images/menu/`
- Kitchen images: `assets/images/kitchen/`

### Contact Information

Update contact details in:
- `components/topbar.html`
- `components/header.html`
- `components/footer.html`
- `pages/contact.html`

## 🤖 AI & Chatbot Integration

The website includes a flexible AI and chatbot integration system that makes it easy to add chatbots and AI features.

### Quick Start

1. **Include the integration script:**
   ```html
   <script src="/scripts/ai-integration.js"></script>
   ```

2. **Initialize a chatbot:**
   ```javascript
   // Example: OpenAI Chatbot
   window.AIIntegration.initializeChatbot({
       type: 'openai',
       options: {
           apiKey: 'your-api-key',
           model: 'gpt-3.5-turbo',
           systemPrompt: 'You are a helpful assistant for Spice Village Catering.'
       },
       onMessage: (userMessage, botResponse) => {
           // Handle bot response
           console.log('Bot:', botResponse);
       }
   });
   ```

### Supported Chatbot Types

#### 1. OpenAI (GPT)
```javascript
window.AIIntegration.initializeChatbot({
    type: 'openai',
    options: {
        apiKey: 'your-openai-api-key',
        model: 'gpt-3.5-turbo', // or 'gpt-4'
        systemPrompt: 'Your custom system prompt'
    }
});
```

#### 2. Dialogflow
```javascript
window.AIIntegration.initializeChatbot({
    type: 'dialogflow',
    options: {
        projectId: 'your-project-id',
        languageCode: 'en',
        sessionId: 'unique-session-id'
    }
});
```

#### 3. Tawk.to
```javascript
window.AIIntegration.initializeChatbot({
    type: 'tawk',
    options: {
        propertyId: 'your-property-id',
        widgetId: 'your-widget-id'
    }
});
```

#### 4. Intercom
```javascript
window.AIIntegration.initializeChatbot({
    type: 'intercom',
    options: {
        appId: 'your-app-id'
    }
});
```

#### 5. Custom Chatbot
```javascript
window.AIIntegration.initializeChatbot({
    type: 'custom',
    options: {
        apiEndpoint: 'https://your-api.com/chat',
        apiKey: 'your-api-key'
    },
    onMessage: async (userMessage) => {
        // Your custom logic here
        const response = await fetch('https://your-api.com/chat', {
            method: 'POST',
            body: JSON.stringify({ message: userMessage })
        });
        return await response.json();
    }
});
```

### Using AI Services

For non-chatbot AI features (content generation, etc.):

```javascript
// Initialize AI Service
window.AIIntegration.initializeAIService({
    type: 'openai',
    options: {
        apiKey: 'your-api-key',
        model: 'gpt-3.5-turbo'
    }
});

// Generate content
const description = await window.AIIntegration.generateContent(
    'Write a menu description for Chicken Biryani'
);
```

### Available Functions

#### Chatbot Functions
- `initializeChatbot(config)` - Initialize a chatbot
- `sendMessage(message)` - Send a message to the chatbot
- `showChatbot()` - Show chatbot widget
- `hideChatbot()` - Hide chatbot widget

#### AI Service Functions
- `initializeAIService(config)` - Initialize AI service
- `generateContent(prompt, options)` - Generate AI content

### Server-Side Integration

For Node.js/server-side usage:

```javascript
const AI = require('./scripts/ai-integration');

// Initialize chatbot
AI.initializeChatbot({
    type: 'openai',
    options: {
        apiKey: process.env.OPENAI_API_KEY,
        model: 'gpt-3.5-turbo'
    }
});

// Send message
const response = await AI.sendMessage('What is your menu?');
```

### Examples

See `examples/chatbot-integration-example.js` for complete integration examples including:
- Dialogflow setup
- OpenAI integration
- Tawk.to widget
- Intercom integration
- Custom chatbot implementation
- AI content generation

### Security Notes

- **Never expose API keys in client-side code** - Use environment variables or server-side proxy
- **Validate user input** - Sanitize messages before sending to AI services
- **Rate limiting** - Implement rate limiting to prevent abuse
- **Error handling** - Always handle errors gracefully

### Environment Variables

Create a `.env` file for sensitive keys:
```
OPENAI_API_KEY=your-key-here
DIALOGFLOW_PROJECT_ID=your-project-id
TAWK_PROPERTY_ID=your-property-id
```

### API Routes

You can create API routes for chatbot functionality:

```javascript
// routes/api.js
router.post('/chatbot/message', async (req, res) => {
    const { message } = req.body;
    const AI = require('../scripts/ai-integration');
    const response = await AI.sendMessage(message);
    res.json({ response });
});
```

## 📞 Contact

- **WhatsApp**: 085 818 9052
- **Phone**: 01 413 0573
- **Email**: info@spicevillagecatering.ie
- **Location**: C4 Station Road Business Park, Crag Avenue, Clondalkin, Dublin 22, D22DX52

## 🔧 Technical Details

### Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, Tailwind CSS, JavaScript
- **Build Tool**: Tailwind CSS CLI
- **Server**: Express.js web server

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### SEO Features

- Meta tags for search engines
- Open Graph tags for social media
- Structured data (JSON-LD)
- Sitemap support
- Google Search Console verification

## 📝 License

MIT License - Feel free to use and modify as needed.

## 🆘 Support

For any issues or questions:
- Check the code comments in individual files
- Review the component structure in `components/` directory
- Contact: 085 818 9052 (WhatsApp)

---

**Spice Village Catering** - Bringing authentic South Indian flavors to your events in Ireland since 2009.
