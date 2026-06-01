# Brayan Ruelas — Portfolio

Personal portfolio website for Brayan Ruelas — Information Systems graduate focused on Backend Development, Cybersecurity, and Data Analytics.

## 🚀 Live Site

> Deploy to GitHub Pages and update this link!
> `https://[your-username].github.io/portfolio`

## 📁 Project Structure

```
portfolio/
├── index.html       # Main HTML page
├── css/
│   └── style.css    # All styles (dark theme)
├── js/
│   └── main.js      # Interactivity & project management
└── README.md
```

## ✨ Features

- Dark & moody aesthetic with animated elements
- **Add/remove projects** dynamically (saved to localStorage)
- Animated role cycling in the hero section
- Animated counters in About section
- Mobile responsive with hamburger menu
- Contact form (connect to Formspree for real emails)
- Smooth scroll and fade-in animations

## 🛠️ Customize

### Update your info
Open `index.html` and update:
- Your email in the contact section
- Your GitHub / LinkedIn URLs
- About section text
- Skills tags

### Add projects via UI
Click **+ Add Project** on the live site to add projects — they're saved in your browser's localStorage.

### Connect the contact form
1. Sign up at [formspree.io](https://formspree.io)
2. Get your form endpoint
3. Update the `<form>` tag in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
   And remove the `id="contactForm"` JS override.

## 🌐 Deploy to GitHub Pages

1. Push this folder to a GitHub repo (e.g. `portfolio`)
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your site goes live at `https://[username].github.io/portfolio`

## 🎨 Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript
- Google Fonts: Syne + Space Mono
- No dependencies or build tools needed
