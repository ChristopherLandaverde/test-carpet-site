# Premium Carpets Co - Test Site

A test website for demonstrating Chrome extension consent mode detection and GTM Consent Mode Inspector functionality.

## 🎯 Purpose

This is a test website for demonstrating Chrome extension consent mode detection, specifically designed to work with the GTM Consent Mode Inspector Chrome extension.

## 🏢 Business Context

- **Business**: Premium Carpets Co - Family-owned carpet e-commerce store
- **Established**: 1987
- **Specialty**: Premium handwoven carpets
- **Tech Stack**: HTML/CSS/JS with Cookiebot CMP and Google Consent Mode

## 🛠️ Technical Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **CMP**: Cookiebot Consent Management Platform
- **Analytics**: Google Tag Manager with Consent Mode
- **Tracking**: GA4, Facebook Pixel (with fake IDs for testing)
- **Development**: Live Server for local development

## 📁 Project Structure

```
├── index.html          # Homepage
├── about.html          # Company story
├── products.html       # Product catalog
├── contact.html        # Contact form
├── custom.html         # Design studio
├── assets/
│   ├── css/
│   │   └── styles.css  # Main styles
│   ├── js/
│   │   └── main.js     # Main JavaScript
│   └── images/         # Product images
├── package.json        # Dependencies
└── .cursorrules        # Project rules
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   - Site will open automatically at `http://localhost:3000`

## 🧪 Testing Consent Mode

This site is specifically designed to test the GTM Consent Mode Inspector Chrome extension:

### Test Scenarios:
- **Accept All**: Grant full consent to all cookies
- **Deny All**: Reject all non-essential cookies
- **Partial Consent**: Accept only necessary cookies
- **Custom Settings**: Modify specific consent categories

### Expected Behavior:
- DataLayer events should fire based on consent state
- Chrome extension should detect consent mode changes
- Tracking scripts should respect consent settings

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static site)
- `npm run deploy` - Deploy to Netlify
- `npm run test` - Run compatibility tests

## 🔧 Development Notes

- All tracking IDs are fake/test values
- Content is realistic but fictional
- Mobile-first responsive design
- Professional appearance for YouTube demos
- Semantic HTML5 structure

## 📄 License

MIT License - Feel free to use for testing and educational purposes.

---

**Note**: This is a test site for educational and demonstration purposes. All business information is fictional.
