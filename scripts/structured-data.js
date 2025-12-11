/**
 * Structured Data (JSON-LD) Generator
 * 
 * Generates structured data for SEO and Google Rich Results
 */

const structuredData = {
    /**
     * Get Organization Schema
     */
    getOrganizationSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            "@id": "https://www.spicevillagecatering.ie/#organization",
            "name": "Spice Village Catering",
            "alternateName": "Spice Village",
            "url": "https://www.spicevillagecatering.ie",
            "logo": "https://www.spicevillagecatering.ie/assets/images/logo/logo.jpg",
            "image": "https://www.spicevillagecatering.ie/assets/images/logo/logo.jpg",
            "description": "Authentic South Indian and Kerala catering services in Dublin, Ireland. Specializing in wedding catering, corporate events, private parties, and buffet services. 15+ years of experience serving traditional Kerala cuisine including appam, biryani, dosa, and Kerala sadya.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "C4 Station Road Business Park, Crag Avenue",
                "addressLocality": "Clondalkin",
                "addressRegion": "Dublin",
                "postalCode": "D22DX52",
                "addressCountry": "IE"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 53.321,
                "longitude": -6.397
            },
            "telephone": "+353858189052",
            "email": "info@spicevillagecatering.ie",
            "priceRange": "$$",
            "servesCuisine": ["South Indian", "Kerala", "Indian", "Vegetarian", "Non-Vegetarian"],
            "menu": "https://www.spicevillagecatering.ie/menu",
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "21:00"
            },
            "sameAs": [
                "https://www.instagram.com/spicevillage_catering",
                "https://www.facebook.com/spicevillagelucan"
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "5000",
                "bestRating": "5",
                "worstRating": "1"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Catering Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Wedding Catering Services",
                            "description": "Complete wedding catering packages with South Indian buffet"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Corporate Catering Services",
                            "description": "Professional catering for corporate events and office parties"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Private Event Catering",
                            "description": "Customized catering for birthdays, anniversaries, and private parties"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Buffet Catering Service",
                            "description": "South Indian buffet catering with live counters"
                        }
                    }
                ]
            }
        };
    },

    /**
     * Get LocalBusiness Schema
     */
    getLocalBusinessSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://www.spicevillagecatering.ie/#localbusiness",
            "name": "Spice Village Catering",
            "image": "https://www.spicevillagecatering.ie/assets/images/logo/logo.jpg",
            "description": "South Indian catering services in Dublin, Ireland. Kerala cuisine specialists offering wedding catering, corporate catering, and private event catering.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "C4 Station Road Business Park, Crag Avenue",
                "addressLocality": "Clondalkin",
                "addressRegion": "Dublin",
                "postalCode": "D22DX52",
                "addressCountry": "IE"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 53.321,
                "longitude": -6.397
            },
            "url": "https://www.spicevillagecatering.ie",
            "telephone": "+353858189052",
            "priceRange": "$$",
            "areaServed": {
                "@type": "Country",
                "name": "Ireland"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Catering Services",
                "itemListElement": [
                    {
                        "@type": "OfferCatalog",
                        "name": "South Indian Catering",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "MenuItem",
                                    "name": "Kerala Sadya Catering",
                                    "description": "Traditional Kerala sadya with authentic dishes"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "MenuItem",
                                    "name": "Appam Catering Service",
                                    "description": "Fresh appam with various curries"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "MenuItem",
                                    "name": "Dosa Catering",
                                    "description": "Authentic South Indian dosa varieties"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "MenuItem",
                                    "name": "Indian Biryani Catering",
                                    "description": "Traditional chicken and mutton biryani"
                                }
                            }
                        ]
                    }
                ]
            }
        };
    },

    /**
     * Get Breadcrumb Schema
     */
    getBreadcrumbSchema(currentPage = 'Home') {
        const breadcrumbs = [
            { name: "Home", url: "https://www.spicevillagecatering.ie/" },
            { name: "About", url: "https://www.spicevillagecatering.ie/about" },
            { name: "Menu", url: "https://www.spicevillagecatering.ie/menu" },
            { name: "Services", url: "https://www.spicevillagecatering.ie/services" },
            { name: "Contact", url: "https://www.spicevillagecatering.ie/contact" }
        ];

        const itemListElement = breadcrumbs
            .filter(item => item.name !== currentPage || currentPage === 'Home')
            .map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }));

        if (currentPage !== 'Home') {
            const currentItem = breadcrumbs.find(item => item.name === currentPage);
            if (currentItem) {
                itemListElement.push({
                    "@type": "ListItem",
                    "position": itemListElement.length + 1,
                    "name": currentPage,
                    "item": currentItem.url
                });
            }
        }

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
        };
    },

    /**
     * Get FAQ Schema
     */
    getFAQSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What types of events does Spice Village Catering serve?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Spice Village Catering provides South Indian catering services for weddings, corporate events, private parties, birthdays, anniversaries, housewarmings, festivals, and community events. We cater to events of all sizes, from intimate gatherings to large celebrations with 100+ guests."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What cuisine does Spice Village Catering specialize in?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We specialize in authentic South Indian and Kerala cuisine, including traditional dishes like appam, dosa, biryani, Kerala sadya, and various vegetarian and non-vegetarian options. Our menu features authentic recipes passed down through generations."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Where is Spice Village Catering located?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Spice Village Catering is located at C4 Station Road Business Park, Crag Avenue, Clondalkin, Dublin 22, D22DX52, Ireland. We serve clients throughout Dublin and across Ireland."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Does Spice Village Catering offer buffet services?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, we offer comprehensive buffet catering services including South Indian buffet, wedding buffet packages, corporate buffet catering, and live buffet counters. Our buffet menus can be customized to suit your event needs."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How do I book Spice Village Catering for my event?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can book our catering services by calling us at 085 818 9052 or 01 413 0573, messaging us on WhatsApp, emailing info@spicevillagecatering.ie, or filling out the contact form on our website. We recommend booking in advance, especially for weddings and large events."
                    }
                }
            ]
        };
    },

    /**
     * Get WebPage Schema
     */
    getWebPageSchema(pageTitle, pageDescription, pageUrl) {
        return {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": pageUrl,
            "inLanguage": "en-IE",
            "isPartOf": {
                "@type": "WebSite",
                "name": "Spice Village Catering",
                "url": "https://www.spicevillagecatering.ie"
            },
            "about": {
                "@type": "FoodEstablishment",
                "name": "Spice Village Catering"
            }
        };
    },

    /**
     * Generate all structured data scripts for a page
     */
    generateAllSchemas(pageTitle = 'Home', pageDescription = '', pageUrl = 'https://www.spicevillagecatering.ie/') {
        const schemas = [
            this.getOrganizationSchema(),
            this.getLocalBusinessSchema(),
            this.getBreadcrumbSchema(pageTitle),
            this.getFAQSchema()
        ];

        if (pageTitle !== 'Home') {
            schemas.push(this.getWebPageSchema(pageTitle, pageDescription, pageUrl));
        }

        return schemas.map(schema => 
            `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`
        ).join('\n    ');
    }
};

module.exports = structuredData;

