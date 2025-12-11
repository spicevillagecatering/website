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
                            let description = 'Delicious and authentic preparation';
                            try {
                                if (typeof window !== 'undefined' && typeof window.getMenuDescription === 'function') {
                                    description = window.getMenuDescription(itemKey) || description;
                                }
                            } catch (e) {
                                console.warn('Error getting description for', itemKey, ':', e);
                            }
                            comboItems[categoryKey].push({
                                name: itemName,
                                description: description
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
                let description = 'Delicious and authentic preparation';
                try {
                    if (typeof window !== 'undefined' && typeof window.getMenuDescription === 'function') {
                        description = window.getMenuDescription(itemKey) || description;
                    }
                } catch (e) {
                    console.warn('Error getting description for', itemKey, ':', e);
                }
                items.push({
                    name: itemName,
                    description: description
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
                                    let description = 'Delicious and authentic preparation';
                                    try {
                                        if (typeof window !== 'undefined' && typeof window.getMenuDescription === 'function') {
                                            description = window.getMenuDescription(itemKey) || description;
                                        }
                                    } catch (e) {
                                        console.warn('Error getting description for', itemKey, ':', e);
                                    }
                                    // Get quantity
                                    const quantityInput = card.querySelector('.menu-item-quantity');
                                    const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
                                    comboItems[categoryKey].push({
                                        name: itemName,
                                        description: description,
                                        quantity: quantity
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
                        let description = 'Delicious and authentic preparation';
                        try {
                            if (typeof window !== 'undefined' && typeof window.getMenuDescription === 'function') {
                                description = window.getMenuDescription(itemKey) || description;
                            }
                        } catch (e) {
                            console.warn('Error getting description for', itemKey, ':', e);
                        }
                        // Get quantity
                        const quantityInput = card.querySelector('.menu-item-quantity');
                        const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
                        items.push({
                            name: itemName,
                            description: description,
                            quantity: quantity
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

        // Add customer information if available
        const customerInfo = window._customerInfo;
        if (customerInfo) {
            doc.setFontSize(12);
            doc.setTextColor(60, 60, 60);
            doc.setFont('helvetica', 'bold');
            doc.text('Customer Information', margin, yPos);
            yPos += 8;
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            
            // Name
            doc.setFont('helvetica', 'bold');
            doc.text('Name:', margin, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(customerInfo.name, margin + 20, yPos);
            yPos += 6;
            
            // Address (if provided)
            if (customerInfo.address) {
                doc.setFont('helvetica', 'bold');
                doc.text('Address:', margin, yPos);
                doc.setFont('helvetica', 'normal');
                const addressLines = doc.splitTextToSize(customerInfo.address, pageWidth - 2 * margin - 20);
                doc.text(addressLines, margin + 20, yPos);
                yPos += addressLines.length * 5 + 2;
            }
            
            // Contact Number
            doc.setFont('helvetica', 'bold');
            doc.text('Contact:', margin, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(customerInfo.contact, margin + 20, yPos);
            yPos += 6;
            
            // Email (if provided)
            if (customerInfo.email) {
                doc.setFont('helvetica', 'bold');
                doc.text('Email:', margin, yPos);
                doc.setFont('helvetica', 'normal');
                doc.text(customerInfo.email, margin + 20, yPos);
                yPos += 6;
            }
            
            // Total Plates
            doc.setFont('helvetica', 'bold');
            doc.text('Total Plates:', margin, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(customerInfo.totalPlates.toString(), margin + 20, yPos);
            yPos += 8;
            
            // Add separator after customer info
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;
        }

        // Add custom menu title
        doc.setFontSize(18);
        doc.setTextColor(198, 40, 40);
        doc.setFont('helvetica', 'bold');
        doc.text('Custom Menu', margin, yPos);
        yPos += 8;
        
        // Add event details if provided (customerInfo already declared above)
        if (customerInfo && customerInfo.eventDate) {
            const eventDate = new Date(customerInfo.eventDate);
            const formattedDate = eventDate.toLocaleDateString('en-IE', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            doc.setFontSize(11);
            doc.setTextColor(60, 60, 60);
            doc.setFont('helvetica', 'bold');
            doc.text('Event Date:', margin, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(formattedDate, margin + 30, yPos);
            yPos += 6;
        }
        if (customerInfo && customerInfo.eventTime) {
            const timeValue = customerInfo.eventTime;
            const [hours, minutes] = timeValue.split(':');
            const hour24 = parseInt(hours);
            const hour12 = hour24 > 12 ? hour24 - 12 : (hour24 === 0 ? 12 : hour24);
            const ampm = hour24 >= 12 ? 'PM' : 'AM';
            const formattedTime = `${hour12}:${minutes} ${ampm}`;
            doc.setFontSize(11);
            doc.setTextColor(60, 60, 60);
            doc.setFont('helvetica', 'bold');
            doc.text('Event Time:', margin, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(formattedTime, margin + 30, yPos);
            yPos += 6;
        }
        if (customerInfo && customerInfo.eventVenue) {
            doc.setFontSize(11);
            doc.setTextColor(60, 60, 60);
            doc.setFont('helvetica', 'bold');
            doc.text('Venue:', margin, yPos);
            doc.setFont('helvetica', 'normal');
            const venueLines = doc.splitTextToSize(customerInfo.eventVenue, pageWidth - 2 * margin - 30);
            doc.text(venueLines, margin + 30, yPos);
            yPos += venueLines.length * 5 + 2;
        }
        if (customerInfo && customerInfo.eventParticipants) {
            doc.setFontSize(11);
            doc.setTextColor(60, 60, 60);
            doc.setFont('helvetica', 'bold');
            doc.text('Number of Participants:', margin, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(customerInfo.eventParticipants.toString(), margin + 50, yPos);
            yPos += 6;
        }
        
        // Add selected count
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'italic');
        const totalQuantity = Object.values(selectedItems).reduce((sum, items) => 
            sum + items.reduce((itemSum, item) => itemSum + (item.quantity || 1), 0), 0);
        doc.text(`(${totalSelected} items, ${totalQuantity} total plates)`, margin + 40, yPos);
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

                // Item name with quantity
                doc.setFontSize(11);
                doc.setTextColor(60, 60, 60);
                doc.setFont('helvetica', 'bold');
                const quantity = item.quantity || 1;
                const itemText = quantity > 1 ? `• ${item.name} (${quantity} plates)` : `• ${item.name}`;
                doc.text(itemText, margin + 5, yPos);
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

        // Add contact information section header
        doc.setFontSize(12);
        doc.setTextColor(198, 40, 40);
        doc.setFont('helvetica', 'bold');
        doc.text('Contact Information', margin, yPos);
        yPos += 8;
        
        // Add contact information
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'normal');
        doc.text('For orders and inquiries:', margin, yPos);
        yPos += 6;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(198, 40, 40);
        doc.text('Phone:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.text('085 818 9052 | 01 413 0573', margin + 18, yPos);
        yPos += 6;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(198, 40, 40);
        doc.text('Email:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.text('info@spicevillagecatering.ie', margin + 18, yPos);
        yPos += 6;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(198, 40, 40);
        doc.text('Website:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.text('www.spicevillagecatering.ie', margin + 18, yPos);
        yPos += 6;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(198, 40, 40);
        doc.text('Address:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        const addressText = 'C4 Station Road Business Park, Crag Avenue, Clondalkin, Dublin 22, D22DX52';
        const addressLines = doc.splitTextToSize(addressText, pageWidth - 2 * margin - 18);
        doc.text(addressLines, margin + 18, yPos);
        yPos += addressLines.length * 5 + 2;

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
        let checkbox = card.querySelector('.menu-item-checkbox');
        let quantityContainer = card.querySelector('.menu-item-quantity-container');
        
        // Create checkbox if it doesn't exist
        if (!checkbox) {
            checkbox = document.createElement('input');
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
            card.appendChild(checkbox);
        }
        
        // Create quantity input container if it doesn't exist
        if (!quantityContainer) {
            quantityContainer = document.createElement('div');
            quantityContainer.className = 'menu-item-quantity-container';
            quantityContainer.style.cssText = `
                position: absolute;
                top: 40px;
                left: 10px;
                display: none;
                align-items: center;
                gap: 5px;
                z-index: 20;
                background: rgba(255, 255, 255, 0.95);
                padding: 4px 8px;
                border-radius: 6px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            `;

            // Create quantity label
            const quantityLabel = document.createElement('label');
            quantityLabel.textContent = 'Qty:';
            quantityLabel.style.cssText = `
                font-size: 11px;
                font-weight: 600;
                color: #333;
                margin: 0;
            `;

            // Create quantity input
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.className = 'menu-item-quantity';
            quantityInput.min = '1';
            quantityInput.max = '999';
            quantityInput.value = '1';
            quantityInput.style.cssText = `
                width: 50px;
                height: 24px;
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 2px 6px;
                font-size: 12px;
                text-align: center;
                font-weight: 600;
            `;
            
            // Prevent clicks from propagating to parent elements
            quantityInput.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            quantityInput.addEventListener('mousedown', function(e) {
                e.stopPropagation();
            });
            quantityInput.addEventListener('focus', function(e) {
                e.stopPropagation();
            });

            quantityContainer.appendChild(quantityLabel);
            quantityContainer.appendChild(quantityInput);
            
            // Prevent clicks on container from propagating
            quantityContainer.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            card.appendChild(quantityContainer);
        }
        
        // Add/update event listener to show/hide quantity based on checkbox
        // Remove existing listeners by cloning the checkbox
        const newCheckbox = checkbox.cloneNode(true);
        checkbox.parentNode.replaceChild(newCheckbox, checkbox);
        checkbox = newCheckbox;
        
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                quantityContainer.style.display = 'flex';
            } else {
                quantityContainer.style.display = 'none';
                const quantityInput = quantityContainer.querySelector('.menu-item-quantity');
                if (quantityInput) {
                    quantityInput.value = '1';
                }
            }
        });
        
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
        
        // Show checkboxes and quantity inputs
        checkboxes.forEach(checkbox => {
            checkbox.style.display = 'block';
        });
        
        // Show quantity inputs for checked items
        const quantityContainers = document.querySelectorAll('.menu-item-quantity-container');
        quantityContainers.forEach(container => {
            const checkbox = container.parentElement.querySelector('.menu-item-checkbox');
            if (checkbox && checkbox.checked) {
                container.style.display = 'flex';
            }
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
        
        // Hide checkboxes and quantity inputs
        checkboxes.forEach(checkbox => {
            checkbox.style.display = 'none';
        });
        
        const quantityContainers = document.querySelectorAll('.menu-item-quantity-container');
        quantityContainers.forEach(container => {
            container.style.display = 'none';
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
        // Show quantity input for checked items
        const quantityContainer = checkbox.parentElement.querySelector('.menu-item-quantity-container');
        if (quantityContainer) {
            quantityContainer.style.display = 'flex';
        }
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
        // Hide quantity input for unchecked items
        const quantityContainer = checkbox.parentElement.querySelector('.menu-item-quantity-container');
        if (quantityContainer) {
            quantityContainer.style.display = 'none';
            const quantityInput = quantityContainer.querySelector('.menu-item-quantity');
            if (quantityInput) {
                quantityInput.value = '1';
            }
        }
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
    
    // Ensure quantity inputs are shown/hidden based on checkbox state
    checkboxes.forEach(checkbox => {
        const quantityContainer = checkbox.parentElement.querySelector('.menu-item-quantity-container');
        if (quantityContainer) {
            if (checkbox.checked) {
                quantityContainer.style.display = 'flex';
            } else {
                quantityContainer.style.display = 'none';
            }
        }
    });
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
        let description = 'Delicious and authentic preparation';
        try {
            if (typeof window !== 'undefined' && typeof window.getMenuDescription === 'function') {
                description = window.getMenuDescription(itemKey) || description;
            }
        } catch (e) {
            console.warn('Error getting description for', itemKey, ':', e);
        }

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
            e.preventDefault();
            
            // Check if jsPDF is loaded
            if (typeof window.jspdf === 'undefined') {
                alert('PDF library is loading. Please wait a moment and try again.');
                return;
            }
            
            downloadBtn.disabled = true;
            const originalHTML = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            try {
                await generateMenuPDF(menuItemName, description, category);
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Error generating PDF. Please try again. Error: ' + (error.message || 'Unknown error'));
            } finally {
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = originalHTML;
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
    
    // Generate custom PDF button - show modal instead of direct generation
    const generateCustomBtn = document.getElementById('generate-custom-pdf-btn');
    const customerModal = document.getElementById('customer-info-modal');
    const customerForm = document.getElementById('customer-info-form');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelFormBtn = document.getElementById('cancel-form-btn');
    
    if (generateCustomBtn && customerModal) {
        generateCustomBtn.addEventListener('click', () => {
            // Check if any items are selected first
            const selectedItems = getSelectedMenuItems();
            const totalSelected = Object.values(selectedItems).reduce((sum, items) => sum + items.length, 0);
            
            if (totalSelected === 0) {
                alert('Please select at least one menu item to generate a custom PDF.');
                return;
            }
            
            // Show modal
            customerModal.classList.remove('hidden');
            // Reset form
            customerForm.reset();
            // Hide error messages
            document.getElementById('name-error')?.classList.add('hidden');
            document.getElementById('contact-error')?.classList.add('hidden');
            document.getElementById('plates-error')?.classList.add('hidden');
        });
    }
    
    // Close modal handlers
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            customerModal?.classList.add('hidden');
        });
    }
    
    if (cancelFormBtn) {
        cancelFormBtn.addEventListener('click', () => {
            customerModal?.classList.add('hidden');
        });
    }
    
    // Close modal when clicking outside
    if (customerModal) {
        customerModal.addEventListener('click', (e) => {
            if (e.target === customerModal) {
                customerModal.classList.add('hidden');
            }
        });
    }
    
    // Form submission handler
    if (customerForm) {
        customerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('customer-name').value.trim();
            const address = document.getElementById('customer-address').value.trim();
            const contact = document.getElementById('customer-contact').value.trim();
            const totalPlates = document.getElementById('total-plates').value.trim();
            
            // Validation
            let isValid = true;
            const nameError = document.getElementById('name-error');
            const contactError = document.getElementById('contact-error');
            const platesError = document.getElementById('plates-error');
            
            if (!name) {
                nameError?.classList.remove('hidden');
                isValid = false;
            } else {
                nameError?.classList.add('hidden');
            }
            
            if (!contact) {
                contactError?.classList.remove('hidden');
                isValid = false;
            } else {
                contactError?.classList.add('hidden');
            }
            
            if (!totalPlates || parseInt(totalPlates) < 1) {
                platesError?.classList.remove('hidden');
                isValid = false;
            } else {
                platesError?.classList.add('hidden');
            }
            
            if (!isValid) {
                return;
            }
            
            // Store customer info for PDF generation
            window._customerInfo = {
                name: name,
                address: address,
                contact: contact,
                totalPlates: parseInt(totalPlates)
            };
            
            // Close modal
            customerModal.classList.add('hidden');
            
            // Disable submit button and show loading
            const submitBtn = document.getElementById('submit-form-btn');
            const originalSubmitText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating...';
            
            try {
                await generateCustomMenuPDF();
                // Clear customer info after successful generation
                window._customerInfo = null;
            } catch (error) {
                console.error('Error generating custom PDF:', error);
                alert('Error generating PDF. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalSubmitText;
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

