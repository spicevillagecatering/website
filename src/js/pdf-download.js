// PDF Download functionality for Menu Items
// Uses jsPDF library to generate PDFs with logo

/**
 * Get all menu items organized by category
 */
function getAllMenuItems() {
    const menuItems = {};
    const menuContents = document.querySelectorAll('.menu-content');
    
    menuContents.forEach(content => {
        const tabId = content.id.replace('-content', '');
        const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
        const categoryName = tabButton ? tabButton.textContent : tabId;
        
        // Handle combo category separately
        if (tabId === 'combo') {
            const comboItems = {
                'Appam With': [],
                'Fried Rice With': []
            };
            
            // Find all h4 headings in combo section
            const headings = content.querySelectorAll('h4');
            headings.forEach(heading => {
                const headingText = heading.textContent.trim();
                let categoryKey = null;
                
                if (headingText.includes('Appam')) {
                    categoryKey = 'Appam With';
                } else if (headingText.includes('Fried Rice')) {
                    categoryKey = 'Fried Rice With';
                }
                
                if (categoryKey) {
                    // Find the menu-grid that follows this heading
                    let nextElement = heading.nextElementSibling;
                    while (nextElement && !nextElement.classList.contains('menu-grid')) {
                        nextElement = nextElement.nextElementSibling;
                    }
                    
                    if (nextElement && nextElement.classList.contains('menu-grid')) {
                        nextElement.querySelectorAll('.menu-item-name').forEach(nameEl => {
                            const itemName = nameEl.textContent.trim();
                            const itemKey = itemName.toLowerCase().replace(/\s+/g, '-');
                            comboItems[categoryKey].push({
                                name: itemName,
                                description: typeof getMenuDescription !== 'undefined' ? getMenuDescription(itemKey) : 'Delicious and authentic preparation'
                            });
                        });
                    }
                }
            });
            
            if (comboItems['Appam With'].length > 0) {
                menuItems['Appam With'] = comboItems['Appam With'];
            }
            if (comboItems['Fried Rice With'].length > 0) {
                menuItems['Fried Rice With'] = comboItems['Fried Rice With'];
            }
        } else {
            const items = [];
            content.querySelectorAll('.menu-item-name').forEach(nameEl => {
                const itemName = nameEl.textContent.trim();
                const itemKey = itemName.toLowerCase().replace(/\s+/g, '-');
                items.push({
                    name: itemName,
                    description: typeof getMenuDescription !== 'undefined' ? getMenuDescription(itemKey) : 'Delicious and authentic preparation'
                });
            });
            
            if (items.length > 0) {
                menuItems[categoryName] = items;
            }
        }
    });
    
    return menuItems;
}

/**
 * Convert image to base64
 */
function getImageAsBase64(url) {
    return new Promise((resolve, reject) => {
        // Use fetch to get the image as blob, then convert to base64
        // This works better for same-origin images
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.blob();
            })
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            })
            .catch(() => {
                // Fallback to Image method if fetch fails
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    try {
                        const base64 = canvas.toDataURL('image/jpeg', 0.8);
                        resolve(base64);
                    } catch (e) {
                        reject(e);
                    }
                };
                img.onerror = reject;
                img.src = url;
            });
    });
}

/**
 * Generate complete menu PDF with all items
 */
async function generateCompleteMenuPDF() {
    try {
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            console.error('jsPDF library not loaded');
            alert('PDF library is loading. Please try again in a moment.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPos = margin;

        // Load logo
        try {
            const logoPaths = [
                './assets/images/logo/logo.jpg',
                '/assets/images/logo/logo.jpg',
                'assets/images/logo/logo.jpg',
                window.location.origin + '/assets/images/logo/logo.jpg'
            ];
            
            let logoBase64 = null;
            for (const logoPath of logoPaths) {
                try {
                    logoBase64 = await getImageAsBase64(logoPath);
                    break;
                } catch (e) {
                    continue;
                }
            }
            
            if (logoBase64) {
                const logoWidth = 50;
                const logoHeight = 30;
                const logoX = (pageWidth - logoWidth) / 2;
                doc.addImage(logoBase64, 'JPEG', logoX, yPos, logoWidth, logoHeight);
                yPos += logoHeight + 15;
            }
        } catch (error) {
            console.warn('Could not load logo:', error);
        }

        // Add company name
        doc.setFontSize(20);
        doc.setTextColor(198, 40, 40);
        doc.setFont('helvetica', 'bold');
        const companyName = 'Spice Village Catering';
        const companyNameWidth = doc.getTextWidth(companyName);
        doc.text(companyName, (pageWidth - companyNameWidth) / 2, yPos);
        yPos += 10;

        // Add tagline
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        const tagline = 'Authentic South Indian & Kerala Cuisine';
        const taglineWidth = doc.getTextWidth(tagline);
        doc.text(tagline, (pageWidth - taglineWidth) / 2, yPos);
        yPos += 15;

        // Add separator line
        doc.setDrawColor(198, 40, 40);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        // Add menu title
        doc.setFontSize(18);
        doc.setTextColor(198, 40, 40);
        doc.setFont('helvetica', 'bold');
        doc.text('Complete Menu', margin, yPos);
        yPos += 12;

        // Get all menu items
        const allMenuItems = getAllMenuItems();
        const categoryOrder = ['Starters', 'Salads', 'For Kids', 'Breads', 'Main Course', 'Appam With', 'Fried Rice With', 'Dessert'];

        // Add each category
        categoryOrder.forEach(category => {
            if (!allMenuItems[category] || allMenuItems[category].length === 0) {
                return;
            }

            // Check if we need a new page
            if (yPos > pageHeight - 40) {
                doc.addPage();
                yPos = margin;
            }

            // Category header
            doc.setFontSize(14);
            doc.setTextColor(198, 40, 40);
            doc.setFont('helvetica', 'bold');
            doc.text(category, margin, yPos);
            yPos += 8;

            // Category items
            allMenuItems[category].forEach((item, index) => {
                // Check if we need a new page
                if (yPos > pageHeight - 30) {
                    doc.addPage();
                    yPos = margin;
                }

                // Item name
                doc.setFontSize(11);
                doc.setTextColor(60, 60, 60);
                doc.setFont('helvetica', 'bold');
                doc.text(`• ${item.name}`, margin + 5, yPos);
                yPos += 6;

                // Item description
                if (item.description) {
                    doc.setFontSize(9);
                    doc.setTextColor(100, 100, 100);
                    doc.setFont('helvetica', 'normal');
                    const maxWidth = pageWidth - 2 * margin - 10;
                    const descLines = doc.splitTextToSize(item.description, maxWidth);
                    doc.text(descLines, margin + 10, yPos);
                    yPos += descLines.length * 4 + 3;
                } else {
                    yPos += 3;
                }
            });

            yPos += 5; // Space between categories
        });

        // Add separator before contact info
        yPos += 5;
        if (yPos > pageHeight - 40) {
            doc.addPage();
            yPos = margin;
        }
        doc.setDrawColor(198, 40, 40);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        // Add contact information
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text('For orders and inquiries:', margin, yPos);
        yPos += 6;
        doc.text('Phone: 085 818 9052 | 01 413 0573', margin, yPos);
        yPos += 6;
        doc.text('Email: info@spicevillagecatering.ie', margin, yPos);
        yPos += 6;
        doc.text('Website: www.spicevillagecatering.ie', margin, yPos);
        yPos += 6;
        doc.text('Address: C4 Station Road Business Park, Crag Avenue, Clondalkin, Dublin 22, D22DX52', margin, yPos);

        // Add footer on last page
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            const footerText = `Page ${i} of ${pageCount} | Generated on ${new Date().toLocaleDateString('en-IE', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}`;
            const footerWidth = doc.getTextWidth(footerText);
            doc.text(footerText, (pageWidth - footerWidth) / 2, pageHeight - 10);
        }

        // Save the PDF
        doc.save('Spice_Village_Complete_Menu.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    }
}

/**
 * Generate PDF for a single menu item
 */
async function generateMenuPDF(menuItemName, menuItemDescription, category) {
    try {
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            console.error('jsPDF library not loaded');
            alert('PDF library is loading. Please try again in a moment.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPos = margin;

        // Load logo
        try {
            // Try multiple logo paths
            const logoPaths = [
                './assets/images/logo/logo.jpg',
                '/assets/images/logo/logo.jpg',
                'assets/images/logo/logo.jpg',
                window.location.origin + '/assets/images/logo/logo.jpg'
            ];
            
            let logoBase64 = null;
            for (const logoPath of logoPaths) {
                try {
                    logoBase64 = await getImageAsBase64(logoPath);
                    break;
                } catch (e) {
                    continue;
                }
            }
            
            if (logoBase64) {
                // Add logo at the top (centered)
                const logoWidth = 50;
                const logoHeight = 30;
                const logoX = (pageWidth - logoWidth) / 2;
                doc.addImage(logoBase64, 'JPEG', logoX, yPos, logoWidth, logoHeight);
                yPos += logoHeight + 15;
            } else {
                console.warn('Could not load logo from any path');
            }
        } catch (error) {
            console.warn('Could not load logo:', error);
            // Continue without logo
        }

        // Add company name
        doc.setFontSize(20);
        doc.setTextColor(198, 40, 40); // Primary color #C62828
        doc.setFont('helvetica', 'bold');
        const companyName = 'Spice Village Catering';
        const companyNameWidth = doc.getTextWidth(companyName);
        doc.text(companyName, (pageWidth - companyNameWidth) / 2, yPos);
        yPos += 10;

        // Add tagline
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        const tagline = 'Authentic South Indian & Kerala Cuisine';
        const taglineWidth = doc.getTextWidth(tagline);
        doc.text(tagline, (pageWidth - taglineWidth) / 2, yPos);
        yPos += 15;

        // Add separator line
        doc.setDrawColor(198, 40, 40);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        // Add menu item category
        if (category) {
            doc.setFontSize(14);
            doc.setTextColor(150, 150, 150);
            doc.setFont('helvetica', 'italic');
            doc.text(`Category: ${category}`, margin, yPos);
            yPos += 8;
        }

        // Add menu item name
        doc.setFontSize(24);
        doc.setTextColor(198, 40, 40);
        doc.setFont('helvetica', 'bold');
        doc.text(menuItemName, margin, yPos);
        yPos += 12;

        // Add description
        if (menuItemDescription) {
            doc.setFontSize(12);
            doc.setTextColor(60, 60, 60);
            doc.setFont('helvetica', 'normal');
            
            // Split long descriptions into multiple lines
            const maxWidth = pageWidth - 2 * margin;
            const descriptionLines = doc.splitTextToSize(menuItemDescription, maxWidth);
            doc.text(descriptionLines, margin, yPos);
            yPos += descriptionLines.length * 6 + 10;
        }

        // Add separator line
        doc.setDrawColor(198, 40, 40);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 15;

        // Add contact information
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text('For orders and inquiries:', margin, yPos);
        yPos += 6;
        doc.text('Phone: 085 818 9052 | 01 413 0573', margin, yPos);
        yPos += 6;
        doc.text('Email: info@spicevillagecatering.ie', margin, yPos);
        yPos += 6;
        doc.text('Website: www.spicevillagecatering.ie', margin, yPos);
        yPos += 10;

        // Add footer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        const footerText = `Generated on ${new Date().toLocaleDateString('en-IE', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })}`;
        const footerWidth = doc.getTextWidth(footerText);
        doc.text(footerText, (pageWidth - footerWidth) / 2, pageHeight - 15);

        // Save the PDF
        const fileName = `${menuItemName.replace(/\s+/g, '_')}_Menu.pdf`;
        doc.save(fileName);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    }
}

/**
 * Initialize download buttons for menu items
 */
function initializeMenuDownloadButtons() {
    // Wait for jsPDF to load
    if (typeof window.jspdf === 'undefined') {
        // Load jsPDF from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            addDownloadButtons();
        };
        script.onerror = () => {
            console.error('Failed to load jsPDF library');
        };
        document.head.appendChild(script);
    } else {
        addDownloadButtons();
    }
}

/**
 * Add download buttons to menu item cards
 */
function addDownloadButtons() {
    const menuItemCards = document.querySelectorAll('.menu-item-card');
    
    menuItemCards.forEach((card) => {
        // Check if download button already exists
        if (card.querySelector('.menu-download-btn')) {
            return;
        }

        const menuItemName = card.querySelector('.menu-item-name')?.textContent || 'Menu Item';
        
        // Get description from menu-data.js if available
        const itemKey = menuItemName.toLowerCase().replace(/\s+/g, '-');
        const description = typeof getMenuDescription !== 'undefined' 
            ? getMenuDescription(itemKey) 
            : 'Delicious and authentic preparation';

        // Get category from parent tab
        let category = '';
        const menuContent = card.closest('.menu-content');
        if (menuContent) {
            const tabId = menuContent.id.replace('-content', '');
            const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
            if (tabButton) {
                category = tabButton.textContent;
            }
        }

        // Create download button
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'menu-download-btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
        downloadBtn.title = `Download ${menuItemName} as PDF`;
        downloadBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #C62828, #B71C1C);
            color: white;
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(198, 40, 40, 0.3);
            z-index: 10;
        `;

        // Hover effect
        downloadBtn.addEventListener('mouseenter', () => {
            downloadBtn.style.transform = 'scale(1.1)';
            downloadBtn.style.boxShadow = '0 4px 12px rgba(198, 40, 40, 0.5)';
        });

        downloadBtn.addEventListener('mouseleave', () => {
            downloadBtn.style.transform = 'scale(1)';
            downloadBtn.style.boxShadow = '0 2px 8px rgba(198, 40, 40, 0.3)';
        });

        // Click handler
        downloadBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            downloadBtn.disabled = true;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            try {
                await generateMenuPDF(menuItemName, description, category);
            } finally {
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
            }
        });

        // Make card position relative if not already
        if (getComputedStyle(card).position === 'static') {
            card.style.position = 'relative';
        }

        // Add button to card
        card.appendChild(downloadBtn);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeMenuDownloadButtons();
        initializeCompleteMenuDownload();
    });
} else {
    initializeMenuDownloadButtons();
    initializeCompleteMenuDownload();
}

// Initialize complete menu download buttons
function initializeCompleteMenuDownload() {
    // Load jsPDF if not already loaded
    if (typeof window.jspdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            setupDownloadButtons();
        };
        document.head.appendChild(script);
    } else {
        setupDownloadButtons();
    }
}

function setupDownloadButtons() {
    // Button near Explore Menu
    const downloadMenuBtn = document.getElementById('download-menu-btn');
    if (downloadMenuBtn) {
        downloadMenuBtn.addEventListener('click', async () => {
            downloadMenuBtn.disabled = true;
            const originalText = downloadMenuBtn.innerHTML;
            downloadMenuBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating PDF...';
            
            try {
                await generateCompleteMenuPDF();
            } finally {
                downloadMenuBtn.disabled = false;
                downloadMenuBtn.innerHTML = originalText;
            }
        });
    }

    // Button in menu section
    const downloadCompleteMenuBtn = document.getElementById('download-complete-menu-btn');
    if (downloadCompleteMenuBtn) {
        downloadCompleteMenuBtn.addEventListener('click', async () => {
            downloadCompleteMenuBtn.disabled = true;
            const originalText = downloadCompleteMenuBtn.innerHTML;
            downloadCompleteMenuBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating PDF...';
            
            try {
                await generateCompleteMenuPDF();
            } finally {
                downloadCompleteMenuBtn.disabled = false;
                downloadCompleteMenuBtn.innerHTML = originalText;
            }
        });
    }
}

// Re-initialize when menu tabs change (for dynamically loaded content)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-tab')) {
        setTimeout(() => {
            addDownloadButtons();
        }, 100);
    }
});

