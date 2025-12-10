# Hero Section Food Images Guide

## 🖼️ Image Slider Setup

The hero section now features an animated food image slider that automatically cycles through 5 food images.

## 📁 Image Locations

The slider looks for these images in `assets/images/menu/`:

1. **chicken-biryani.jpg** - First slide
2. **mutton-biryani.jpg** - Second slide
3. **chicken-65.jpg** - Third slide
4. **chicken-tikka.jpg** - Fourth slide
5. **gulab-jamun.jpg** - Fifth slide

## 📝 How to Add Your Images

### Step 1: Prepare Your Images

- **Format**: JPG or PNG
- **Size**: Recommended 1920x1080px (Full HD) or larger
- **Aspect Ratio**: 16:9 (landscape)
- **File Size**: Keep under 1MB per image for fast loading
- **Quality**: High-quality, well-lit food photography

### Step 2: Name Your Files

Save your images with these exact names:
- `chicken-biryani.jpg`
- `mutton-biryani.jpg`
- `chicken-65.jpg`
- `chicken-tikka.jpg`
- `gulab-jamun.jpg`

### Step 3: Upload Images

Place all images in: `assets/images/menu/`

### Step 4: Test

1. Refresh your website
2. The slider should automatically start cycling through your images
3. Each image displays for about 4 seconds
4. The animation loops continuously

## 🎨 Customizing the Slider

### Change Images

Edit `index.html` and find the `.slider-container` section. Update the `src` attributes:

```html
<img src="assets/images/menu/YOUR-IMAGE-1.jpg" alt="Description" class="slider-item">
<img src="assets/images/menu/YOUR-IMAGE-2.jpg" alt="Description" class="slider-item">
<!-- Add more images as needed -->
```

### Adjust Animation Speed

In the CSS section, find `@keyframes slide` and the `.slider-container` animation:

```css
.slider-container {
    animation: slide 20s infinite; /* Change 20s to adjust speed */
}
```

- **Faster**: Lower number (e.g., `15s`)
- **Slower**: Higher number (e.g., `30s`)

### Add More Images

1. Add more `<img>` tags in the slider container
2. Update the width percentage:
   - 2 images: `width: 200%`, each image `width: 50%`
   - 3 images: `width: 300%`, each image `width: 33.33%`
   - 5 images: `width: 500%`, each image `width: 20%` (current)
   - 6 images: `width: 600%`, each image `width: 16.67%`

3. Update the `@keyframes slide` percentages accordingly

## 🎯 Recommended Images

For best visual impact, use:
- **High-quality food photography**
- **Bright, appetizing images**
- **Consistent lighting and style**
- **Images that showcase your best dishes**

## 🔄 Fallback Images

If images are not found, the slider uses Unsplash placeholder images. Once you upload your images, they will automatically replace the placeholders.

## ✨ Features

- ✅ **Automatic sliding** - Images change every 4 seconds
- ✅ **Smooth transitions** - Elegant fade effect
- ✅ **Pause on hover** - Animation pauses when you hover over the hero section
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Overlay effect** - Red gradient overlay maintains text readability

## 🐛 Troubleshooting

**Images not showing?**
- Check file names match exactly (case-sensitive)
- Verify images are in `assets/images/menu/` folder
- Check file permissions
- Clear browser cache

**Slider not animating?**
- Check browser console for errors
- Verify CSS is loaded
- Ensure JavaScript is enabled

**Images look stretched?**
- Use images with 16:9 aspect ratio
- Recommended size: 1920x1080px or larger

---

**Your hero section will look amazing with your food images! 🍛✨**

