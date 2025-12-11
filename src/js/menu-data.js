// This file now uses the centralized menu-items-data.js
// Keeping this for backward compatibility

// Function to get description - now uses centralized data
// This file is kept for backward compatibility but delegates to menu-items-data.js

// Since menu-items-data.js loads first and sets window.getMenuDescription,
// we just ensure it exists and don't interfere with it
if (typeof window !== 'undefined') {
    // If the function from menu-items-data.js doesn't exist yet, provide a fallback
    // Otherwise, do nothing - let menu-items-data.js handle it
    if (!window.getMenuDescription) {
        window.getMenuDescription = function(itemKey) {
            return 'Delicious and authentic preparation';
        };
    }
    // Note: We don't define a local getMenuDescription function to avoid conflicts
    // All code should use window.getMenuDescription which is set by menu-items-data.js
}

