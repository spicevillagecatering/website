// Helper function to load HTML components
// This will be used by the server to include components in pages

const fs = require('fs');
const path = require('path');

function loadComponent(componentName) {
    const componentPath = path.join(__dirname, '..', 'components', `${componentName}.html`);
    try {
        return fs.readFileSync(componentPath, 'utf8');
    } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
        return '';
    }
}

function loadPageTemplate(pageContent, pageTitle, pageDescription) {
    const topbar = loadComponent('topbar');
    const header = loadComponent('header');
    const footer = loadComponent('footer');
    const floatingButtons = loadComponent('floating-buttons');
    
    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary SEO Meta Tags -->
    <title>${pageTitle}</title>
    <meta name="description" content="${pageDescription}">
    <meta name="keywords" content="Spice Village Catering, South Indian Catering, Indian Catering Services, Catering Near Me, Authentic Indian Catering, Kerala Catering Service, Wedding Catering Services, Private Event Catering, Buffet Catering Service">
    <meta name="author" content="Spice Village Catering">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.spicevillagecatering.ie/">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="restaurant">
    <meta property="og:url" content="https://www.spicevillagecatering.ie/">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageDescription}">
    <meta property="og:image" content="https://www.spicevillagecatering.ie/assets/images/logo/logo.png">
    <meta property="og:site_name" content="Spice Village Catering">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageTitle}">
    <meta name="twitter:description" content="${pageDescription}">
    <meta name="twitter:image" content="https://www.spicevillagecatering.ie/assets/images/logo/logo.png">
    
    <!-- Favicons -->
    <link rel="icon" type="image/x-icon" href="/assets/images/logo/logo.jpg">
    <link rel="shortcut icon" href="/assets/images/logo/logo.jpg">
    
    <!-- Google Search Console Verification -->
    <meta name="google-site-verification" content="UM5-Os14bH-Hxqum0QI0jTifJpGc5cDU-L9B2waxwgM" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">

    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#C62828',
                        secondary: '#F59E0B',
                        accent: '#2E7D32',
                        dark: '#1A1A1A',
                        light: '#FAF9F6',
                    },
                    fontFamily: {
                        heading: ['"Playfair Display"', 'serif'],
                        body: ['"Lato"', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    
    <!-- Custom Styles -->
    <link rel="stylesheet" href="/styles/main.css">
</head>

<body class="font-body bg-light text-gray-800 antialiased overflow-x-hidden">
    ${floatingButtons}
    ${topbar}
    ${header}
    
    ${pageContent}
    
    ${footer}
    
    <!-- Scripts -->
    <script src="/src/js/menu-data.js"></script>
    <script src="/src/js/script.js"></script>
    <script src="/src/js/chatbot.js"></script>
</body>
</html>`;
}

module.exports = { loadComponent, loadPageTemplate };

