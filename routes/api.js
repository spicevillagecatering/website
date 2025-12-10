// Custom API routes - Add your custom endpoints here
// This file can be imported in server.js for better organization

const express = require('express');
const router = express.Router();

// Example: Menu API
router.get('/menu', (req, res) => {
    res.json({
        success: true,
        data: {
            // Add your menu data structure here
            categories: ['Starters', 'Salads', 'For Kids', 'Breads', 'Main Course', 'Combo', 'Dessert']
        }
    });
});

// Example: Contact API
router.post('/contact', express.json(), (req, res) => {
    const { name, email, phone, message } = req.body;
    
    // Add your contact form handling logic here
    // e.g., send email, save to database, etc.
    
    res.json({
        success: true,
        message: 'Thank you for contacting us!'
    });
});

// Add more custom routes as needed
// router.get('/custom-endpoint', (req, res) => { ... });

module.exports = router;

