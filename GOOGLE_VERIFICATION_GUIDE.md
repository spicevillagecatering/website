# Google Search Console Verification Guide

## Overview
Google Search Console verification allows you to verify ownership of your website and access valuable SEO tools and data.

## How to Get Your Verification Code

### Step 1: Access Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account

### Step 2: Add Your Property
1. Click "Add Property" or use the property selector
2. Enter your website URL: `https://www.spicevillagecatering.ie` (or your domain)
3. Click "Continue"

### Step 3: Choose Verification Method
1. Select **"HTML tag"** as your verification method
2. You'll see a meta tag like this:
   ```html
   <meta name="google-site-verification" content="abc123xyz789..." />
   ```
3. Copy the **content value** (the code after `content="`)

### Step 4: Add Verification Code to Your Website
1. Open `index.html` in your editor
2. Find this line (around line 44):
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
3. Replace `YOUR_VERIFICATION_CODE` with the actual code you copied
4. Save the file

### Step 5: Verify
1. Go back to Google Search Console
2. Click "Verify"
3. If successful, you'll see a confirmation message

## Example

**Before:**
```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

**After (with actual code):**
```html
<meta name="google-site-verification" content="abc123xyz789def456ghi012jkl345mno678pqr901stu234vwx567yz" />
```

## Important Notes

- ✅ The verification code is unique to your website
- ✅ Keep it secure - don't share it publicly
- ✅ Once verified, you don't need to remove the tag
- ✅ The tag must be in the `<head>` section of your HTML
- ✅ Make sure your website is live and accessible before verifying

## What You Get After Verification

Once verified, you can:
- Submit your sitemap
- Monitor search performance
- See which keywords bring traffic
- Check for indexing issues
- View search analytics
- Get email alerts for issues

## Troubleshooting

### Verification Failed?
1. **Check the code is correct** - Copy/paste the exact code
2. **Ensure website is live** - The site must be accessible online
3. **Wait a few minutes** - Sometimes it takes time for changes to propagate
4. **Check the tag location** - Must be in `<head>` section
5. **Clear cache** - Clear browser cache and try again

### Alternative Verification Methods
If HTML tag doesn't work, you can also use:
- **HTML file upload** - Upload a verification file to your server
- **DNS record** - Add a TXT record to your domain
- **Google Analytics** - If you already have GA set up
- **Google Tag Manager** - If you use GTM

## Next Steps After Verification

1. **Submit Sitemap**
   - Go to Sitemaps section
   - Submit: `https://www.spicevillagecatering.ie/sitemap.xml`

2. **Request Indexing**
   - Use URL Inspection tool
   - Request indexing for important pages

3. **Monitor Performance**
   - Check Search Performance regularly
   - Monitor Core Web Vitals
   - Review search queries

## Support

- [Google Search Console Help](https://support.google.com/webmasters)
- [Verification Methods](https://support.google.com/webmasters/answer/9008080)

