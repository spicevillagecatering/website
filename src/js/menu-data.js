// This file now uses the centralized menu-items-data.js
// Keeping this for backward compatibility

// Function to get description - now uses centralized data
function getMenuDescription(itemKey) {
    if (typeof window !== 'undefined' && window.getMenuDescription) {
        return window.getMenuDescription(itemKey);
    }
    return 'Delicious and authentic preparation';
}

