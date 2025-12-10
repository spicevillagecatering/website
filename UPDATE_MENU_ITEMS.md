# Menu Items Update Guide

All menu items need to follow this structure for hover descriptions and image paths:

## Structure Template

```html
<div class="menu-item bg-white rounded-xl shadow-lg overflow-hidden card-hover" data-item="item-key">
    <div class="h-48 bg-gray-200 flex items-center justify-center overflow-hidden relative">
        <img src="assets/images/menu/item-name.jpg" alt="Item Name" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="absolute flex items-center justify-center" style="display: none;">
            <i class="fas fa-image text-4xl text-gray-400"></i>
        </div>
    </div>
    <div class="p-6 relative">
        <h4 class="font-heading text-xl font-bold text-primary mb-2">Item Name</h4>
        <div class="menu-item-tooltip">Description text here</div>
    </div>
</div>
```

## Image File Naming Convention

Use kebab-case (lowercase with hyphens):
- `beef-cutlet.jpg`
- `chicken-65.jpg`
- `chicken-tikka.jpg`
- etc.

## Descriptions

All descriptions are available in `src/js/menu-data.js`. The tooltip will automatically show on hover.

## Quick Update Script

You can use the browser console to update all menu items at once, or manually update each section following the pattern shown in the Starters section.

