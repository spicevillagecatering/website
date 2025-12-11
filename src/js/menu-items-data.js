// Centralized Menu Items Data
// This file contains all menu items organized by category with descriptions
// Easy to add, remove, or modify items

const MENU_ITEMS_DATA = {
    starters: {
        category: 'Starters',
        items: [
            {
                id: 'beef-cutlet',
                name: 'Beef Cutlet',
                description: 'Crispy and flavorful beef cutlets, perfectly spiced and fried to golden perfection',
                icon: 'fa-drumstick-bite'
            },
            {
                id: 'chicken-65',
                name: 'Chicken 65',
                description: 'Spicy and tangy deep-fried chicken pieces, a popular Indo-Chinese appetizer',
                icon: 'fa-pepper-hot'
            },
            {
                id: 'chicken-tikka',
                name: 'Chicken Tikka',
                description: 'Tender marinated chicken pieces, grilled to perfection with aromatic spices',
                icon: 'fa-fire'
            },
            {
                id: 'chicken-lollipop',
                name: 'Chicken Lollipop',
                description: 'Succulent chicken wings shaped like lollipops, crispy and spicy',
                icon: 'fa-utensils'
            },
            {
                id: 'chilly-paneer',
                name: 'Chilly Paneer',
                description: 'Soft paneer cubes tossed in a spicy, tangy sauce with bell peppers',
                icon: 'fa-cheese'
            },
            {
                id: 'gobi-manchurian',
                name: 'Gobi Manchurian',
                description: 'Crispy cauliflower florets in a sweet and spicy Manchurian sauce',
                icon: 'fa-seedling'
            }
        ]
    },
    salads: {
        category: 'Salads',
        items: [
            {
                id: 'fattoush-salad',
                name: 'Fattoush Salad',
                description: 'Fresh Middle Eastern salad with mixed greens, vegetables, and crispy pita bread',
                icon: 'fa-leaf'
            },
            {
                id: 'greek-salad',
                name: 'Greek Salad',
                description: 'Classic Mediterranean salad with feta cheese, olives, tomatoes, and cucumbers',
                icon: 'fa-bowl-food'
            },
            {
                id: 'fruit-salad',
                name: 'Fruit Salad',
                description: 'Fresh seasonal fruits mixed together, light and refreshing',
                icon: 'fa-apple-alt'
            },
            {
                id: 'mixed-veg-salad',
                name: 'Mixed Veg Salad',
                description: 'Colorful mix of fresh vegetables, crisp and healthy',
                icon: 'fa-carrot'
            }
        ]
    },
    kids: {
        category: 'For Kids',
        items: [
            {
                id: 'chicken-nuggets',
                name: 'Chicken Nuggets',
                description: 'Crispy golden chicken nuggets, perfect for kids',
                icon: 'fa-cookie-bite'
            },
            {
                id: 'tuna-sandwich',
                name: 'Tuna Sandwich',
                description: 'Fresh tuna salad sandwich on soft bread',
                icon: 'fa-fish'
            },
            {
                id: 'egg-sandwich',
                name: 'Egg Sandwich',
                description: 'Classic egg salad sandwich, creamy and delicious',
                icon: 'fa-egg'
            },
            {
                id: 'cheese-sandwich',
                name: 'Cheese Sandwich',
                description: 'Melted cheese sandwich, simple and satisfying',
                icon: 'fa-cheese'
            },
            {
                id: 'mix-slider-sandwich',
                name: 'Mix Slider Sandwich',
                description: 'Mini slider sandwiches with various fillings, fun-sized portions',
                icon: 'fa-hamburger'
            }
        ]
    },
    breads: {
        category: 'Breads',
        items: [
            {
                id: 'appam',
                name: 'Appam',
                description: 'Soft, fluffy South Indian rice pancakes with crispy edges',
                icon: 'fa-bread-slice'
            },
            {
                id: 'paratha',
                name: 'Paratha',
                description: 'Flaky, layered flatbread, perfect with curries',
                icon: 'fa-circle'
            },
            {
                id: 'idiyappam',
                name: 'Idiyappam',
                description: 'Delicate string hoppers made from rice flour, traditional South Indian',
                icon: 'fa-spaghetti-monster-flying'
            },
            {
                id: 'naan',
                name: 'Naan',
                description: 'Soft, pillowy leavened flatbread, baked in tandoor',
                icon: 'fa-bread-slice'
            }
        ]
    },
    main: {
        category: 'Main Course',
        items: [
            {
                id: 'chicken-biryani',
                name: 'Chicken Biryani',
                description: 'Fragrant basmati rice layered with spiced chicken, mint, and saffron',
                icon: 'fa-drumstick-bite'
            },
            {
                id: 'chicken-fried-rice',
                name: 'Chicken Fried Rice',
                description: 'Aromatic fried rice with tender chicken pieces and vegetables',
                icon: 'fa-bowl-rice'
            },
            {
                id: 'chicken-mandhi',
                name: 'Chicken Mandhi',
                description: 'Traditional Arabian-style spiced chicken with fragrant rice',
                icon: 'fa-utensils'
            },
            {
                id: 'chicken-kansa',
                name: 'Chicken Kansa',
                description: 'Rich and flavorful chicken curry, slow-cooked to perfection',
                icon: 'fa-fire'
            },
            {
                id: 'mutton-biryani',
                name: 'Mutton Biryani',
                description: 'Tender mutton cooked with aromatic spices and basmati rice',
                icon: 'fa-drumstick-bite'
            }
        ]
    },
    combo: {
        category: 'Combo',
        subcategories: {
            'appam-with': {
                name: 'Appam With',
                items: [
                    {
                        id: 'chicken-stew',
                        name: 'Chicken Stew',
                        description: 'Mild and creamy coconut-based chicken stew, perfect with appam',
                        icon: 'fa-drumstick-bite'
                    },
                    {
                        id: 'beef-stew',
                        name: 'Beef Stew',
                        description: 'Hearty beef stew with vegetables in a rich, flavorful gravy',
                        icon: 'fa-drumstick-bite'
                    },
                    {
                        id: 'mutton-curry',
                        name: 'Mutton Curry',
                        description: 'Spiced mutton curry with traditional South Indian flavors',
                        icon: 'fa-drumstick-bite'
                    },
                    {
                        id: 'pork-stew',
                        name: 'Pork Stew',
                        description: 'Tender pork cooked in a savory stew with aromatic spices',
                        icon: 'fa-drumstick-bite'
                    },
                    {
                        id: 'beef-roast',
                        name: 'Beef Roast',
                        description: 'Slow-roasted beef with spices, tender and flavorful',
                        icon: 'fa-drumstick-bite'
                    }
                ]
            },
            'fried-rice-with': {
                name: 'Fried Rice With',
                items: [
                    {
                        id: 'chicken-roast',
                        name: 'Chicken Roast',
                        description: 'Spiced and roasted chicken, crispy on the outside, juicy inside',
                        icon: 'fa-drumstick-bite'
                    },
                    {
                        id: 'pork-roast',
                        name: 'Pork Roast',
                        description: 'Succulent roasted pork with aromatic spices',
                        icon: 'fa-drumstick-bite'
                    },
                    {
                        id: 'beef-roast-2',
                        name: 'Beef Roast',
                        description: 'Slow-roasted beef with spices, tender and flavorful',
                        icon: 'fa-drumstick-bite'
                    },
                    {
                        id: 'chilli-chicken',
                        name: 'Chilli Chicken',
                        description: 'Spicy and tangy chicken in a flavorful chili sauce',
                        icon: 'fa-pepper-hot'
                    }
                ]
            }
        }
    },
    dessert: {
        category: 'Dessert',
        items: [
            {
                id: 'mango-pudding',
                name: 'Mango Pudding',
                description: 'Creamy mango pudding, sweet and refreshing',
                icon: 'fa-ice-cream'
            },
            {
                id: 'gulab-jamun',
                name: 'Gulab Jamun',
                description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
                icon: 'fa-candy-cane'
            },
            {
                id: 'payasam-variety',
                name: 'Variety of Payasam',
                description: 'Traditional South Indian sweet pudding, available in various flavors',
                icon: 'fa-bowl-food'
            }
        ]
    }
};

// Hook function to get menu items by category
function getMenuItemsByCategory(categoryId) {
    if (MENU_ITEMS_DATA[categoryId]) {
        return MENU_ITEMS_DATA[categoryId];
    }
    return null;
}

// Hook function to get all menu items
function getAllMenuItems() {
    return MENU_ITEMS_DATA;
}

// Hook function to get menu item by ID
function getMenuItemById(itemId) {
    for (const category in MENU_ITEMS_DATA) {
        const categoryData = MENU_ITEMS_DATA[category];
        
        // Check regular items
        if (categoryData.items) {
            const item = categoryData.items.find(i => i.id === itemId);
            if (item) return item;
        }
        
        // Check subcategories (for combo)
        if (categoryData.subcategories) {
            for (const subcat in categoryData.subcategories) {
                const subcatData = categoryData.subcategories[subcat];
                const item = subcatData.items.find(i => i.id === itemId);
                if (item) return item;
            }
        }
    }
    return null;
}

// Hook function to get description by item ID
function getMenuDescription(itemId) {
    const item = getMenuItemById(itemId);
    return item ? item.description : 'Delicious and authentic preparation';
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.MENU_ITEMS_DATA = MENU_ITEMS_DATA;
    window.getMenuItemsByCategory = getMenuItemsByCategory;
    window.getAllMenuItems = getAllMenuItems;
    window.getMenuItemById = getMenuItemById;
    window.getMenuDescription = getMenuDescription;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MENU_ITEMS_DATA,
        getMenuItemsByCategory,
        getAllMenuItems,
        getMenuItemById,
        getMenuDescription
    };
}

