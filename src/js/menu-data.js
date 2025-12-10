// Menu item descriptions for hover tooltips
const menuDescriptions = {
    // Starters
    'beef-cutlet': 'Crispy and flavorful beef cutlets, perfectly spiced and fried to golden perfection',
    'chicken-65': 'Spicy and tangy deep-fried chicken pieces, a popular Indo-Chinese appetizer',
    'chicken-tikka': 'Tender marinated chicken pieces, grilled to perfection with aromatic spices',
    'chicken-lollipop': 'Succulent chicken wings shaped like lollipops, crispy and spicy',
    'chilly-paneer': 'Soft paneer cubes tossed in a spicy, tangy sauce with bell peppers',
    'gobi-manchurian': 'Crispy cauliflower florets in a sweet and spicy Manchurian sauce',
    
    // Salads
    'fattoush-salad': 'Fresh Middle Eastern salad with mixed greens, vegetables, and crispy pita bread',
    'greek-salad': 'Classic Mediterranean salad with feta cheese, olives, tomatoes, and cucumbers',
    'fruit-salad': 'Fresh seasonal fruits mixed together, light and refreshing',
    'mixed-veg-salad': 'Colorful mix of fresh vegetables, crisp and healthy',
    
    // For Kids
    'chicken-nuggets': 'Crispy golden chicken nuggets, perfect for kids',
    'tuna-sandwich': 'Fresh tuna salad sandwich on soft bread',
    'egg-sandwich': 'Classic egg salad sandwich, creamy and delicious',
    'cheese-sandwich': 'Melted cheese sandwich, simple and satisfying',
    'mix-slider-sandwich': 'Mini slider sandwiches with various fillings, fun-sized portions',
    
    // Breads
    'appam': 'Soft, fluffy South Indian rice pancakes with crispy edges',
    'paratha': 'Flaky, layered flatbread, perfect with curries',
    'idiyappam': 'Delicate string hoppers made from rice flour, traditional South Indian',
    'naan': 'Soft, pillowy leavened flatbread, baked in tandoor',
    
    // Main Course
    'chicken-biryani': 'Fragrant basmati rice layered with spiced chicken, mint, and saffron',
    'chicken-fried-rice': 'Aromatic fried rice with tender chicken pieces and vegetables',
    'chicken-mandhi': 'Traditional Arabian-style spiced chicken with fragrant rice',
    'chicken-kansa': 'Rich and flavorful chicken curry, slow-cooked to perfection',
    'mutton-biryani': 'Tender mutton cooked with aromatic spices and basmati rice',
    
    // Combo - Appam With
    'chicken-stew': 'Mild and creamy coconut-based chicken stew, perfect with appam',
    'beef-stew': 'Hearty beef stew with vegetables in a rich, flavorful gravy',
    'mutton-curry': 'Spiced mutton curry with traditional South Indian flavors',
    'pork-stew': 'Tender pork cooked in a savory stew with aromatic spices',
    'beef-roast': 'Slow-roasted beef with spices, tender and flavorful',
    
    // Combo - Fried Rice With
    'chicken-roast': 'Spiced and roasted chicken, crispy on the outside, juicy inside',
    'pork-roast': 'Succulent roasted pork with aromatic spices',
    'chilli-chicken': 'Spicy and tangy chicken in a flavorful chili sauce',
    
    // Dessert
    'mango-pudding': 'Creamy mango pudding, sweet and refreshing',
    'gulab-jamun': 'Soft milk dumplings soaked in rose-flavored sugar syrup',
    'payasam-variety': 'Traditional South Indian sweet pudding, available in various flavors'
};

// Function to get description
function getMenuDescription(itemKey) {
    return menuDescriptions[itemKey] || 'Delicious and authentic preparation';
}

