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

// Export function for custom menu page
window.generateCustomMenuPDFFromPage = async function() {
    try {
        return await generateCustomMenuPDF();
    } catch (error) {
        console.error('Error in generateCustomMenuPDFFromPage:', error);
        throw error;
    }
};

// Make sure the function is available globally
if (typeof window !== 'undefined') {
    window.generateCustomMenuPDF = generateCustomMenuPDF;
    window.getSelectedMenuItems = getSelectedMenuItems;
}

/**
 * Convert image to base64
 */
function getImageAsBase64(url) {
    return new Promise((resolve, reject) => {
        // Add timeout to prevent infinite waiting
        const timeout = setTimeout(() => {
            reject(new Error('Image load timeout'));
        }, 10000); // 10 second timeout
        
        // Use fetch to get the image as blob, then convert to base64
        // This works better for same-origin images
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.blob();
            })
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    clearTimeout(timeout);
                    resolve(reader.result);
                };
                reader.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error('FileReader error'));
                };
                reader.readAsDataURL(blob);
            })
            .catch(() => {
                // Fallback to Image method if fetch fails
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    clearTimeout(timeout);
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        const base64 = canvas.toDataURL('image/jpeg', 0.8);
                        resolve(base64);
                    } catch (e) {
                        reject(e);
                    }
                };
                img.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error('Image load failed'));
                };
                img.src = url;
            });
    });
}

/**
 * Get selected menu items organized by category (works for both main page and custom menu page)
 */
function getSelectedMenuItems() {
    // Check if we're on the custom menu page
    if (typeof window.getSelectedMenuItemsFromPage === 'function') {
        return window.getSelectedMenuItemsFromPage();
    }
    
    // Original function for main page
    return getSelectedMenuItemsFromMainPage();
}

/**
 * Get selected menu items from main page
 */
function getSelectedMenuItemsFromMainPage() {
    const selectedItems = {};
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
                    let nextElement = heading.nextElementSibling;
                    while (nextElement && !nextElement.classList.contains('menu-grid')) {
                        nextElement = nextElement.nextElementSibling;
                    }
                    
                    if (nextElement && nextElement.classList.contains('menu-grid')) {
                        nextElement.querySelectorAll('.menu-item-card').forEach(card => {
                            const checkbox = card.querySelector('.menu-item-checkbox');
                            if (checkbox && checkbox.checked) {
                                const nameEl = card.querySelector('.menu-item-name');
                                if (nameEl) {
                                    const itemName = nameEl.textContent.trim();
                                    const itemKey = itemName.toLowerCase().replace(/\s+/g, '-');
                                    comboItems[categoryKey].push({
                                        name: itemName,
                                        description: typeof getMenuDescription !== 'undefined' ? getMenuDescription(itemKey) : 'Delicious and authentic preparation'
                                    });
                                }
                            }
                        });
                    }
                }
            });
            
            if (comboItems['Appam With'].length > 0) {
                selectedItems['Appam With'] = comboItems['Appam With'];
            }
            if (comboItems['Fried Rice With'].length > 0) {
                selectedItems['Fried Rice With'] = comboItems['Fried Rice With'];
            }
        } else {
            const items = [];
            content.querySelectorAll('.menu-item-card').forEach(card => {
                const checkbox = card.querySelector('.menu-item-checkbox');
                if (checkbox && checkbox.checked) {
                    const nameEl = card.querySelector('.menu-item-name');
                    if (nameEl) {
                        const itemName = nameEl.textContent.trim();
                        const itemKey = itemName.toLowerCase().replace(/\s+/g, '-');
                        items.push({
                            name: itemName,
                            description: typeof getMenuDescription !== 'undefined' ? getMenuDescription(itemKey) : 'Delicious and authentic preparation'
                        });
                    }
                }
            });
            
            if (items.length > 0) {
                selectedItems[categoryName] = items;
            }
        }
    });
    
    return selectedItems;
}

/**
 * Generate custom menu PDF with selected items
 */
async function generateCustomMenuPDF() {
    // Prevent concurrent PDF generation
    if (window._generatingPDF) {
        throw new Error('PDF generation already in progress');
    }
    
    window._generatingPDF = true;
    try {
        const selectedItems = getSelectedMenuItems();
        
        // Check if any items are selected
        const totalSelected = Object.values(selectedItems).reduce((sum, items) => sum + items.length, 0);
        if (totalSelected === 0) {
            window._generatingPDF = false;
            alert('Please select at least one menu item to generate a custom PDF.');
            return;
        }
        
        if (typeof window.jspdf === 'undefined') {
            window._generatingPDF = false;
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

        // Load logo with error handling to prevent stack overflow
        try {
            const logoPaths = [
                './assets/images/logo/logo.jpg',
                '/assets/images/logo/logo.jpg',
                'assets/images/logo/logo.jpg',
                window.location.origin + '/assets/images/logo/logo.jpg'
            ];
            
            let logoBase64 = null;
            let logoLoaded = false;
            for (const logoPath of logoPaths) {
                if (logoLoaded) break;
                try {
                    logoBase64 = await Promise.race([
                        getImageAsBase64(logoPath),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
                    ]);
                    logoLoaded = true;
                    break;
                } catch (e) {
                    // Continue to next path
                    continue;
                }
            }
            
            if (logoBase64 && logoLoaded) {
                const logoWidth = 50;
                const logoHeight = 30;
                const logoX = (pageWidth - logoWidth) / 2;
                doc.addImage(logoBase64, 'JPEG', logoX, yPos, logoWidth, logoHeight);
                yPos += logoHeight + 15;
            }
        } catch (error) {
            console.warn('Could not load logo:', error);
            // Continue without logo - don't throw error
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

        // Add custom menu title
        doc.setFontSize(18);
        doc.setTextColor(198, 40, 40);
        doc.setFont('helvetica', 'bold');
        doc.text('Custom Menu', margin, yPos);
        yPos += 8;
        
        // Add selected count
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'italic');
        doc.text(`(${totalSelected} items selected)`, margin + 40, yPos);
        yPos += 12;

        // Get category order
        const categoryOrder = ['Starters', 'Salads', 'For Kids', 'Breads', 'Main Course', 'Appam With', 'Fried Rice With', 'Dessert'];

        // Add each category that has selected items
        categoryOrder.forEach(category => {
            if (!selectedItems[category] || selectedItems[category].length === 0) {
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
            selectedItems[category].forEach((item, index) => {
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
            const footerText = `Page ${i} of ${pageCount} | Custom Menu | Generated on ${new Date().toLocaleDateString('en-IE', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}`;
            const footerWidth = doc.getTextWidth(footerText);
            doc.text(footerText, (pageWidth - footerWidth) / 2, pageHeight - 10);
        }

        // Save the PDF
        doc.save('Spice_Village_Custom_Menu.pdf');
    } catch (error) {
        console.error('Error generating custom PDF:', error);
        const errorMessage = error.message || 'Unknown error occurred';
        if (errorMessage.includes('Maximum call stack') || errorMessage.includes('stack')) {
            alert('Error generating PDF: The operation was too complex. Please try selecting fewer items or try again.');
        } else {
            alert('Error generating PDF: ' + errorMessage);
        }
    } finally {
        window._generatingPDF = false;
    }
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

        // Load logo with error handling to prevent stack overflow
        try {
            const logoPaths = [
                './assets/images/logo/logo.jpg',
                '/assets/images/logo/logo.jpg',
                'assets/images/logo/logo.jpg',
                window.location.origin + '/assets/images/logo/logo.jpg'
            ];
            
            let logoBase64 = null;
            let logoLoaded = false;
            for (const logoPath of logoPaths) {
                if (logoLoaded) break;
                try {
                    logoBase64 = await Promise.race([
                        getImageAsBase64(logoPath),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
                    ]);
                    logoLoaded = true;
                    break;
                } catch (e) {
                    // Continue to next path
                    continue;
                }
            }
            
            if (logoBase64 && logoLoaded) {
                const logoWidth = 50;
                const logoHeight = 30;
                const logoX = (pageWidth - logoWidth) / 2;
                doc.addImage(logoBase64, 'JPEG', logoX, yPos, logoWidth, logoHeight);
                yPos += logoHeight + 15;
            }
        } catch (error) {
            console.warn('Could not load logo:', error);
            // Continue without logo - don't throw error
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

        // Load logo with error handling to prevent stack overflow
        try {
            // Try multiple logo paths
            const logoPaths = [
                './assets/images/logo/logo.jpg',
                '/assets/images/logo/logo.jpg',
                'assets/images/logo/logo.jpg',
                window.location.origin + '/assets/images/logo/logo.jpg'
            ];
            
            let logoBase64 = null;
            let logoLoaded = false;
            for (const logoPath of logoPaths) {
                if (logoLoaded) break;
                try {
                    logoBase64 = await Promise.race([
                        getImageAsBase64(logoPath),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
                    ]);
                    logoLoaded = true;
                    break;
                } catch (e) {
                    // Continue to next path
                    continue;
                }
            }
            
            if (logoBase64 && logoLoaded) {
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
            // Continue without logo - don't throw error
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
    // Add checkboxes first
    addCheckboxesToMenuItems();
    
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
 * Add checkboxes to menu item cards for customization
 */
function addCheckboxesToMenuItems() {
    const menuItemCards = document.querySelectorAll('.menu-item-card');
    
    menuItemCards.forEach((card) => {
        // Check if checkbox already exists
        if (card.querySelector('.menu-item-checkbox')) {
            return;
        }

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'menu-item-checkbox';
        checkbox.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            width: 24px;
            height: 24px;
            cursor: pointer;
            z-index: 20;
            accent-color: #C62828;
            display: none;
            background: white;
            border-radius: 4px;
        `;

        // Add checkbox to card
        card.appendChild(checkbox);
        
        // Make card position relative if not already
        if (getComputedStyle(card).position === 'static') {
            card.style.position = 'relative';
        }
    });
}

/**
 * Toggle customize mode
 */
function toggleCustomizeMode() {
    const customizeControls = document.getElementById('customize-controls');
    const toggleBtn = document.getElementById('toggle-customize-btn');
    const checkboxes = document.querySelectorAll('.menu-item-checkbox');
    const menuCards = document.querySelectorAll('.menu-item-card');
    
    if (customizeControls.classList.contains('hidden')) {
        // Enable customize mode
        customizeControls.classList.remove('hidden');
        toggleBtn.innerHTML = '<i class="fas fa-times mr-2"></i> Exit Customize';
        toggleBtn.classList.remove('bg-gray-200', 'text-gray-700');
        toggleBtn.classList.add('bg-primary', 'text-white', 'hover:bg-red-700');
        
        // Show checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.style.display = 'block';
        });
        
        // Add visual indicator to cards
        menuCards.forEach(card => {
            card.classList.add('customize-mode');
        });
        
        updateSelectedCount();
    } else {
        // Disable customize mode
        customizeControls.classList.add('hidden');
        toggleBtn.innerHTML = '<i class="fas fa-edit mr-2"></i> Customize Menu';
        toggleBtn.classList.remove('bg-primary', 'text-white', 'hover:bg-red-700');
        toggleBtn.classList.add('bg-gray-200', 'text-gray-700');
        
        // Hide checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.style.display = 'none';
        });
        
        // Remove visual indicator from cards
        menuCards.forEach(card => {
            card.classList.remove('customize-mode');
        });
    }
}

/**
 * Select all menu items
 */
function selectAllMenuItems() {
    const checkboxes = document.querySelectorAll('.menu-item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    updateSelectedCount();
}

/**
 * Deselect all menu items
 */
function deselectAllMenuItems() {
    const checkboxes = document.querySelectorAll('.menu-item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    updateSelectedCount();
}

/**
 * Update selected count display
 */
function updateSelectedCount() {
    const checkboxes = document.querySelectorAll('.menu-item-checkbox');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const selectedCountEl = document.getElementById('selected-count');
    
    if (selectedCountEl) {
        selectedCountEl.textContent = `${checkedCount} item${checkedCount !== 1 ? 's' : ''} selected`;
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

// Initialize complete menu download buttons
function initializeCompleteMenuDownload() {
    // Wait a bit for jsPDF to load if it was just added to the page
    const checkAndSetup = () => {
        if (typeof window.jspdf !== 'undefined') {
            setupDownloadButtons();
        } else {
            // If jsPDF is not loaded, try loading it
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => {
                setupDownloadButtons();
            };
            script.onerror = () => {
                console.error('Failed to load jsPDF library');
                // Try alternative CDN
                const altScript = document.createElement('script');
                altScript.src = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
                altScript.onload = () => {
                    setupDownloadButtons();
                };
                document.head.appendChild(altScript);
            };
            document.head.appendChild(script);
        }
    };
    
    // Try immediately, then retry after a short delay
    checkAndSetup();
    setTimeout(checkAndSetup, 500);
}

// Initialize customize menu functionality
function initializeCustomizeMenu() {
    // Add checkboxes to menu items
    addCheckboxesToMenuItems();
    
    // Toggle customize mode button
    const toggleBtn = document.getElementById('toggle-customize-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleCustomizeMode);
    }
    
    // Select all button
    const selectAllBtn = document.getElementById('select-all-btn');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', selectAllMenuItems);
    }
    
    // Deselect all button
    const deselectAllBtn = document.getElementById('deselect-all-btn');
    if (deselectAllBtn) {
        deselectAllBtn.addEventListener('click', deselectAllMenuItems);
    }
    
    // Generate custom PDF button
    const generateCustomBtn = document.getElementById('generate-custom-pdf-btn');
    if (generateCustomBtn) {
        generateCustomBtn.addEventListener('click', async () => {
            generateCustomBtn.disabled = true;
            const originalText = generateCustomBtn.innerHTML;
            generateCustomBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating...';
            
            try {
                await generateCustomMenuPDF();
            } catch (error) {
                console.error('Error generating custom PDF:', error);
                alert('Error generating PDF. Please try again.');
            } finally {
                generateCustomBtn.disabled = false;
                generateCustomBtn.innerHTML = originalText;
            }
        });
    }
    
    // Update count when checkboxes change
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('menu-item-checkbox')) {
            updateSelectedCount();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeMenuDownloadButtons();
        initializeCompleteMenuDownload();
        initializeCustomizeMenu();
    });
} else {
    // DOM already loaded, initialize immediately
    initializeMenuDownloadButtons();
    initializeCompleteMenuDownload();
    initializeCustomizeMenu();
}

function setupDownloadButtons() {
    console.log('Setting up download buttons...');
    
    // Button near Explore Menu
    const downloadMenuBtn = document.getElementById('download-menu-btn');
    if (downloadMenuBtn) {
        console.log('Found download-menu-btn');
        // Remove existing event listeners by cloning the button
        const newBtn = downloadMenuBtn.cloneNode(true);
        downloadMenuBtn.parentNode.replaceChild(newBtn, downloadMenuBtn);
        
        newBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Download menu button clicked');
            
            if (typeof window.jspdf === 'undefined') {
                alert('PDF library is still loading. Please wait a moment and try again.');
                return;
            }
            
            newBtn.disabled = true;
            const originalText = newBtn.innerHTML;
            newBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating PDF...';
            
            try {
                await generateCompleteMenuPDF();
                console.log('PDF generated successfully');
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Error generating PDF. Please try again. Error: ' + error.message);
            } finally {
                newBtn.disabled = false;
                newBtn.innerHTML = originalText;
            }
        });
    } else {
        console.warn('Download menu button not found');
    }

    // Button in menu section
    const downloadCompleteMenuBtn = document.getElementById('download-complete-menu-btn');
    if (downloadCompleteMenuBtn) {
        console.log('Found download-complete-menu-btn');
        // Remove existing event listeners by cloning the button
        const newBtn = downloadCompleteMenuBtn.cloneNode(true);
        downloadCompleteMenuBtn.parentNode.replaceChild(newBtn, downloadCompleteMenuBtn);
        
        newBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Download complete menu button clicked');
            
            if (typeof window.jspdf === 'undefined') {
                alert('PDF library is still loading. Please wait a moment and try again.');
                return;
            }
            
            newBtn.disabled = true;
            const originalText = newBtn.innerHTML;
            newBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating PDF...';
            
            try {
                await generateCompleteMenuPDF();
                console.log('PDF generated successfully');
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Error generating PDF. Please try again. Error: ' + error.message);
            } finally {
                newBtn.disabled = false;
                newBtn.innerHTML = originalText;
            }
        });
    } else {
        console.warn('Download complete menu button not found');
    }
    
    console.log('Download buttons setup complete');
}

// Re-initialize when menu tabs change (for dynamically loaded content)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-tab')) {
        setTimeout(() => {
            addDownloadButtons();
            addCheckboxesToMenuItems();
        }, 100);
    }
});

