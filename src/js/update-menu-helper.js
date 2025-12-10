// Helper script to update all menu items with hover descriptions and proper image paths
// This can be run in the browser console to update all menu items at once

function updateMenuItems() {
    const menuItemsMap = {
        // Salads
        'Fattoush Salad': { key: 'fattoush-salad', desc: 'Fresh Middle Eastern salad with mixed greens, vegetables, and crispy pita bread' },
        'Greek Salad': { key: 'greek-salad', desc: 'Classic Mediterranean salad with feta cheese, olives, tomatoes, and cucumbers' },
        'Fruit Salad': { key: 'fruit-salad', desc: 'Fresh seasonal fruits mixed together, light and refreshing' },
        'Mixed Veg Salad': { key: 'mixed-veg-salad', desc: 'Colorful mix of fresh vegetables, crisp and healthy' },
        
        // For Kids
        'Chicken Nuggets': { key: 'chicken-nuggets', desc: 'Crispy golden chicken nuggets, perfect for kids' },
        'Tuna Sandwich': { key: 'tuna-sandwich', desc: 'Fresh tuna salad sandwich on soft bread' },
        'Egg Sandwich': { key: 'egg-sandwich', desc: 'Classic egg salad sandwich, creamy and delicious' },
        'Cheese Sandwich': { key: 'cheese-sandwich', desc: 'Melted cheese sandwich, simple and satisfying' },
        'Mix Slider Sandwich': { key: 'mix-slider-sandwich', desc: 'Mini slider sandwiches with various fillings, fun-sized portions' },
        
        // Breads
        'Appam': { key: 'appam', desc: 'Soft, fluffy South Indian rice pancakes with crispy edges' },
        'Paratha': { key: 'paratha', desc: 'Flaky, layered flatbread, perfect with curries' },
        'Idiyappam': { key: 'idiyappam', desc: 'Delicate string hoppers made from rice flour, traditional South Indian' },
        'Naan': { key: 'naan', desc: 'Soft, pillowy leavened flatbread, baked in tandoor' },
        
        // Main Course
        'Chicken Biryani': { key: 'chicken-biryani', desc: 'Fragrant basmati rice layered with spiced chicken, mint, and saffron' },
        'Chicken Fried Rice': { key: 'chicken-fried-rice', desc: 'Aromatic fried rice with tender chicken pieces and vegetables' },
        'Chicken Mandhi': { key: 'chicken-mandhi', desc: 'Traditional Arabian-style spiced chicken with fragrant rice' },
        'Chicken Kansa': { key: 'chicken-kansa', desc: 'Rich and flavorful chicken curry, slow-cooked to perfection' },
        'Mutton Biryani': { key: 'mutton-biryani', desc: 'Tender mutton cooked with aromatic spices and basmati rice' },
        
        // Combo - Appam With
        'Chicken Stew': { key: 'chicken-stew', desc: 'Mild and creamy coconut-based chicken stew, perfect with appam' },
        'Beef Stew': { key: 'beef-stew', desc: 'Hearty beef stew with vegetables in a rich, flavorful gravy' },
        'Mutton Curry': { key: 'mutton-curry', desc: 'Spiced mutton curry with traditional South Indian flavors' },
        'Pork Stew': { key: 'pork-stew', desc: 'Tender pork cooked in a savory stew with aromatic spices' },
        'Beef Roast': { key: 'beef-roast', desc: 'Slow-roasted beef with spices, tender and flavorful' },
        
        // Combo - Fried Rice With
        'Chicken Roast': { key: 'chicken-roast', desc: 'Spiced and roasted chicken, crispy on the outside, juicy inside' },
        'Pork Roast': { key: 'pork-roast', desc: 'Succulent roasted pork with aromatic spices' },
        'Chilli Chicken': { key: 'chilli-chicken', desc: 'Spicy and tangy chicken in a flavorful chili sauce' },
        
        // Dessert
        'Mango Pudding': { key: 'mango-pudding', desc: 'Creamy mango pudding, sweet and refreshing' },
        'Gulab Jamun': { key: 'gulab-jamun', desc: 'Soft milk dumplings soaked in rose-flavored sugar syrup' },
        'Variety of Payasam': { key: 'payasam-variety', desc: 'Traditional South Indian sweet pudding, available in various flavors' }
    };
    
    // This function can be used to programmatically update menu items
    // For now, manual updates are recommended for better control
    return menuItemsMap;
}

