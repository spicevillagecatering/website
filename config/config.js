// Configuration file for Spice Village Catering
// Customize settings here

module.exports = {
    // Server configuration
    server: {
        port: process.env.PORT || 3000,
        environment: process.env.NODE_ENV || 'development'
    },
    
    // Contact information
    contact: {
        whatsapp: '085 818 9052',
        phone: '01 413 0573',
        emails: [
            'info@spicevillagecatering.ie',
            'spicevillagecatering22@gmail.com'
        ],
        instagram: 'https://www.instagram.com/spicevillagecatering'
    },
    
    // Website settings
    website: {
        name: 'Spice Village Catering',
        description: 'Authentic South Indian Catering Service',
        location: 'Dublin, Ireland'
    },
    
    // Add more configuration as needed
    // customSettings: { ... }
};

