const express = require('express');
const path = require('path');
const config = require('./config/config');

const app = express();
const PORT = config.server.port;

// Serve static files from the root directory
app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Main route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Import custom API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// API route for contact form submission (handled in routes/api.js)
// You can add more custom routes in routes/api.js

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Spice Village Catering server running on http://localhost:${PORT}`);
    console.log(`📝 Add custom routes in server.js to extend functionality`);
});

