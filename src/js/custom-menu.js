// Custom Menu Page Functionality
// Handles menu item selection and PDF generation on the custom menu page

document.addEventListener('DOMContentLoaded', () => {
    initializeCustomMenuPage();
});

function initializeCustomMenuPage() {
    // Initialize menu tabs
    initializeMenuTabs();
    
    // Setup checkboxes
    setupCheckboxes();
    
    // Setup buttons
    setupButtons();
    
    // Update initial count
    updateSelectionCount();
}

function initializeMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const contents = document.querySelectorAll('.menu-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function setupCheckboxes() {
    const checkboxes = document.querySelectorAll('.menu-item-checkbox');
    const cards = document.querySelectorAll('.menu-item-card');
    
    // Style checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            width: 24px;
            height: 24px;
            cursor: pointer;
            z-index: 20;
            accent-color: #F59E0B;
        `;
    });
    
    // Add click handlers
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            const card = cards[index];
            if (checkbox.checked) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
            updateSelectionCount();
        });
    });
    
    // Make cards clickable
    cards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Don't toggle if clicking the checkbox directly
            if (e.target.type === 'checkbox') return;
            
            const checkbox = card.querySelector('.menu-item-checkbox');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
}

function setupButtons() {
    // Select All
    const selectAllBtn = document.getElementById('select-all-btn');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.menu-item-checkbox');
            const cards = document.querySelectorAll('.menu-item-card');
            checkboxes.forEach(checkbox => checkbox.checked = true);
            cards.forEach(card => card.classList.add('selected'));
            updateSelectionCount();
        });
    }
    
    // Deselect All
    const deselectAllBtn = document.getElementById('deselect-all-btn');
    if (deselectAllBtn) {
        deselectAllBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.menu-item-checkbox');
            const cards = document.querySelectorAll('.menu-item-card');
            checkboxes.forEach(checkbox => checkbox.checked = false);
            cards.forEach(card => card.classList.remove('selected'));
            updateSelectionCount();
        });
    }
    
    // Generate PDF
    const generatePdfBtn = document.getElementById('generate-pdf-btn');
    if (generatePdfBtn) {
        generatePdfBtn.addEventListener('click', async () => {
            const selectedCount = getSelectedCount();
            if (selectedCount === 0) {
                alert('Please select at least one menu item to generate a custom PDF.');
                return;
            }
            
            // Check if jsPDF is loaded
            if (typeof window.jspdf === 'undefined') {
                alert('PDF library is loading. Please wait a moment and try again.');
                return;
            }
            
            generatePdfBtn.disabled = true;
            const originalText = generatePdfBtn.innerHTML;
            generatePdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating PDF...';
            
            try {
                // Try to use the function from pdf-download.js first
                if (typeof window.generateCustomMenuPDFFromPage === 'function') {
                    await window.generateCustomMenuPDFFromPage();
                } else if (typeof generateCustomMenuPDF === 'function') {
                    await generateCustomMenuPDF();
                } else {
                    // Use local fallback implementation
                    await generateCustomMenuPDFLocal();
                }
            } catch (error) {
                console.error('Error generating PDF:', error);
                const errorMessage = error.message || 'Unknown error occurred';
                if (errorMessage.includes('Maximum call stack') || errorMessage.includes('stack')) {
                    alert('Error generating PDF: Maximum call stack size exceeded. Please try selecting fewer items or refresh the page.');
                } else {
                    alert('Error generating PDF: ' + errorMessage);
                }
            } finally {
                window._generatingPDF = false;
                generatePdfBtn.disabled = false;
                generatePdfBtn.innerHTML = originalText;
            }
        });
    }
}

function updateSelectionCount() {
    const count = getSelectedCount();
    const countEl = document.getElementById('selected-count');
    if (countEl) {
        countEl.textContent = count;
    }
}

function getSelectedCount() {
    const checkboxes = document.querySelectorAll('.menu-item-checkbox');
    return Array.from(checkboxes).filter(cb => cb.checked).length;
}

// Local fallback implementation
async function generateCustomMenuPDFLocal() {
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
        alert('PDF library is loading. Please wait a moment and try again.');
        return;
    }
    
    // Get selected items using the page-specific function
    const selectedItems = window.getSelectedMenuItemsFromPage();
    const totalSelected = Object.values(selectedItems).reduce((sum, items) => sum + items.length, 0);
    
    if (totalSelected === 0) {
        alert('Please select at least one menu item to generate a custom PDF.');
        return;
    }
    
    // Use the generateCustomMenuPDF from pdf-download.js if available
    // Prevent infinite recursion by checking if we're already in a call
    if (window._generatingPDF) {
        throw new Error('PDF generation already in progress');
    }
    
    if (typeof window.generateCustomMenuPDFFromPage === 'function') {
        window._generatingPDF = true;
        try {
            return await window.generateCustomMenuPDFFromPage();
        } finally {
            window._generatingPDF = false;
        }
    }
    
    if (typeof generateCustomMenuPDF === 'function') {
        window._generatingPDF = true;
        try {
            return await generateCustomMenuPDF();
        } finally {
            window._generatingPDF = false;
        }
    }
    
    // Direct implementation as fallback
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

    // Add separator
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
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'italic');
    doc.text(`(${totalSelected} items selected)`, margin + 40, yPos);
    yPos += 12;

    // Add selected items
    const categoryOrder = ['Starters', 'Salads', 'For Kids', 'Breads', 'Main Course', 'Appam With', 'Fried Rice With', 'Dessert'];
    
    categoryOrder.forEach(category => {
        if (!selectedItems[category] || selectedItems[category].length === 0) {
            return;
        }

        if (yPos > pageHeight - 40) {
            doc.addPage();
            yPos = margin;
        }

        doc.setFontSize(14);
        doc.setTextColor(198, 40, 40);
        doc.setFont('helvetica', 'bold');
        doc.text(category, margin, yPos);
        yPos += 8;

        selectedItems[category].forEach((item) => {
            if (yPos > pageHeight - 30) {
                doc.addPage();
                yPos = margin;
            }

            doc.setFontSize(11);
            doc.setTextColor(60, 60, 60);
            doc.setFont('helvetica', 'bold');
            doc.text(`• ${item.name}`, margin + 5, yPos);
            yPos += 6;

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

        yPos += 5;
    });

    // Add contact info
    yPos += 5;
    if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = margin;
    }
    doc.setDrawColor(198, 40, 40);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

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

    // Add footer
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

    doc.save('Spice_Village_Custom_Menu.pdf');
}

// Export function for pdf-download.js to use
window.getSelectedMenuItemsFromPage = function() {
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
                                    const itemKey = card.getAttribute('data-item') || itemName.toLowerCase().replace(/\s+/g, '-');
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
                        const itemKey = card.getAttribute('data-item') || itemName.toLowerCase().replace(/\s+/g, '-');
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
};

// Wait for pdf-download.js to load
window.addEventListener('load', () => {
    // The function should be available from pdf-download.js
    // If not, wait a bit and try again
    setTimeout(() => {
        if (typeof window.generateCustomMenuPDF === 'function' && !window.generateCustomMenuPDFFromPage) {
            window.generateCustomMenuPDFFromPage = window.generateCustomMenuPDF;
        }
    }, 500);
});

