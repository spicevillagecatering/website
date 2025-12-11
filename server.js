const express = require('express');
const path = require('path');
const fs = require('fs');
const config = require('./config/config');
const { loadComponent, loadPageTemplate } = require('./scripts/load-components');

const app = express();
const PORT = config.server.port;

// Serve static files from the root directory
app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Helper function to load page content
function loadPageContent(pageName) {
    const pagePath = path.join(__dirname, 'pages', `${pageName}.html`);
    try {
        return fs.readFileSync(pagePath, 'utf8');
    } catch (error) {
        console.error(`Error loading page ${pageName}:`, error);
        return '<div class="container mx-auto px-6 py-24"><h1>Page not found</h1></div>';
    }
}

// Main route - serve home page
app.get('/', (req, res) => {
    const pageContent = loadPageContent('home');
    const html = loadPageTemplate(
        pageContent,
        'Spice Village Catering | South Indian Catering Services | Wedding & Corporate Catering Dublin Ireland',
        'Spice Village Catering - Ireland\'s premier South Indian catering service. Authentic Kerala cuisine, wedding catering, corporate events, buffet services in Dublin. 15+ years experience.'
    );
    res.send(html);
});

// Route for other pages
const pages = ['about', 'menu', 'services', 'blog', 'gallery', 'kitchen', 'contact'];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        const pageContent = loadPageContent(page);
        const titles = {
            about: 'About Us | Spice Village Catering',
            menu: 'Menu | South Indian Catering Menu | Spice Village',
            services: 'Catering Services | Wedding, Corporate & Private Events',
            blog: 'Blog | Spice Village Catering',
            gallery: 'Gallery | Spice Village Catering',
            kitchen: 'Our Kitchen | Spice Village Catering',
            contact: 'Contact Us | Book Your Event | Spice Village Catering'
        };
        const descriptions = {
            about: 'Learn about Spice Village Catering - Ireland\'s premier South Indian catering service with 15+ years of experience.',
            menu: 'Explore our authentic South Indian and Kerala catering menu featuring appam, biryani, dosa, and traditional dishes.',
            services: 'Professional catering services for weddings, corporate events, private parties, and festivals in Dublin, Ireland.',
            blog: 'Read our latest blog posts about South Indian cuisine, catering tips, and stories from our kitchen.',
            gallery: 'View our gallery of delicious South Indian dishes and event setups.',
            kitchen: 'Take a behind-the-scenes look at our professional kitchen where authentic South Indian cuisine is prepared.',
            contact: 'Contact Spice Village Catering to book your event. We serve Dublin, Cork, Galway and all across Ireland.'
        };
        const html = loadPageTemplate(
            pageContent,
            titles[page] || 'Spice Village Catering',
            descriptions[page] || 'Spice Village Catering - Authentic South Indian catering in Ireland'
        );
        res.send(html);
    });
});

// Legacy route for old index.html (redirect to home)
app.get('/index.html', (req, res) => {
    res.redirect('/');
});

// Import custom API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Spice Village Catering server running on http://localhost:${PORT}`);
    console.log(`📝 Pages available: /, /about, /menu, /services, /blog, /gallery, /kitchen, /contact`);
});

