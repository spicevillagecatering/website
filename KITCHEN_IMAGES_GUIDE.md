# Kitchen Images Guide

This document provides instructions for adding kitchen images to the Spice Village Catering website.

## Overview

The website includes a "Kitchen" section that currently displays placeholder images. These placeholders should be replaced with actual kitchen photographs.

## Image Requirements

### Recommended Specifications
- **Format**: JPG or PNG
- **Size**: Minimum 800x600px (larger is better for high-resolution displays)
- **Aspect Ratio**: 4:3 or 16:9
- **File Size**: Optimize images to be under 500KB for faster loading
- **Quality**: High quality, well-lit, professional photos

## Image Categories

The kitchen section displays 6 different kitchen images:

1. **Main Kitchen Area** (`kitchen-main.jpg`)
   - Overall view of the main kitchen workspace
   - Should show the general layout and equipment

2. **Cooking Station** (`kitchen-cooking.jpg`)
   - Close-up of active cooking areas
   - Chefs preparing dishes

3. **Spice Preparation Area** (`kitchen-spices.jpg`)
   - Area where spices are prepared and mixed
   - Spice containers, grinding equipment

4. **Food Preparation Area** (`kitchen-preparation.jpg`)
   - Food prep stations
   - Vegetables, ingredients being prepared

5. **Chef at Work** (`kitchen-chef.jpg`)
   - Chef actively cooking
   - Professional cooking action shots

6. **Final Presentation Area** (`kitchen-presentation.jpg`)
   - Plating and presentation area
   - Final dishes being prepared for service

## File Structure

Save all kitchen images to:
```
assets/images/kitchen/
```

## File Naming Convention

Use the following naming convention:
- `kitchen-main.jpg` - Main kitchen area
- `kitchen-cooking.jpg` - Cooking station
- `kitchen-spices.jpg` - Spice preparation
- `kitchen-preparation.jpg` - Food preparation
- `kitchen-chef.jpg` - Chef at work
- `kitchen-presentation.jpg` - Final presentation

## How to Replace Images

1. **Prepare Your Images**
   - Take or select high-quality kitchen photos
   - Resize and optimize them according to the specifications above
   - Name them according to the convention

2. **Save Images**
   - Create the `assets/images/kitchen/` directory if it doesn't exist
   - Save all 6 images to this directory

3. **Update HTML**
   - Open `index.html`
   - Find the "Kitchen Section" (search for `id="kitchen"`)
   - Replace the placeholder image URLs with your actual image paths
   - Example: Change `https://images.unsplash.com/...` to `assets/images/kitchen/kitchen-main.jpg`

4. **Update Alt Text**
   - Update the `alt` attributes to describe your actual images
   - Remove "Placeholder" from alt text

## Example HTML Update

**Before (Placeholder):**
```html
<img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" 
     alt="Main Kitchen Area - Placeholder" 
     class="w-full h-full object-cover">
```

**After (Actual Image):**
```html
<img src="assets/images/kitchen/kitchen-main.jpg" 
     alt="Main Kitchen Area at Spice Village Catering" 
     class="w-full h-full object-cover">
```

## Image Optimization Tips

1. **Use Image Compression Tools**
   - Tools like TinyPNG, ImageOptim, or Squoosh
   - Reduce file size without significant quality loss

2. **Consider WebP Format**
   - Modern browsers support WebP format
   - Better compression than JPG/PNG
   - Update file extensions if using WebP

3. **Responsive Images**
   - Consider using `srcset` for different screen sizes
   - Provide different resolutions for mobile/desktop

## Testing

After adding images:
1. Test on different devices (mobile, tablet, desktop)
2. Check loading speed
3. Verify images display correctly
4. Ensure alt text is descriptive for accessibility

## Notes

- All placeholder images are currently using Unsplash placeholder URLs
- The section includes documentation notes that will be visible until images are replaced
- Remove the documentation note div after adding actual images

## Support

If you need help with image optimization or implementation, refer to the main README or contact the development team.

