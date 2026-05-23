# 📚 Civics Project Website — Setup Guide

## ✏️ How to Edit Your Content

**Open ONE file: `src/content.js`**

Everything on the website — every word, stat, card, question, and source — is in that one file.
Just change the text between the quotes. Don't delete any commas, brackets, or curly braces.

---

## 🚀 Running It Locally

```bash
# 1. Install dependencies (only needed once)
npm install

# 2. Start the development server
npm run dev

# 3. Open your browser to:
http://localhost:5173
```

---

## 🌐 Publishing for FREE (So Anyone Can Visit)

You have two great free options. Both give you a shareable link like:
`https://your-project-name.vercel.app`

---

### Option A — Vercel (Recommended, easiest)

1. **Create a free account** at [vercel.com](https://vercel.com) (sign up with GitHub)

2. **Push your project to GitHub:**
   - Go to [github.com](https://github.com) → New Repository → name it (e.g. `civics-project`)
   - Follow GitHub's instructions to upload your files

3. **Deploy on Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import" next to your GitHub repo
   - Leave all settings as default
   - Click **Deploy**
   - In ~60 seconds you'll get a live link like `https://civics-project.vercel.app`

4. **Share that link!** Anyone in the world can visit it. ✅

---

### Option B — Netlify (Also free)

1. Run this command to build the site:
   ```bash
   npm run build
   ```
   This creates a `dist/` folder.

2. Go to [netlify.com/drop](https://app.netlify.com/drop)

3. **Drag and drop your `dist/` folder** onto the page.

4. You instantly get a free link like `https://amazing-project-abc123.netlify.app`

5. You can rename it to something nicer in Netlify's settings.

---

### Can I get a custom domain (like myproject.com)?

Free domains (.com, .org) aren't available for free, but:
- Both Vercel and Netlify give you a **free subdomain** that looks great for a school project
- If you want a real domain, [Namecheap.com](https://namecheap.com) sells them for ~$9/year

---

## 📁 Project Structure

```
src/
├── content.js          ← ✏️  EDIT THIS FILE — all your text lives here
├── App.jsx             ← main app (don't need to touch this)
├── index.css           ← colors and design (only edit if you want to change colors)
├── components/
│   ├── Nav.jsx         ← navigation bar
│   └── AnimatedSection.jsx
└── sections/
    ├── Hero.jsx        ← the top section
    ├── IssueSection.jsx     ← your topic cards
    ├── ActionSection.jsx    ← the checklist
    ├── SolutionsSection.jsx ← solution cards
    ├── QuizSection.jsx      ← the quiz
    ├── CitationsSection.jsx ← your bibliography
    └── Footer.jsx
```

---

## 🎨 Changing Colors

Open `src/index.css` and look for the `:root` block at the top.
Change `--accent: #4ade80;` to any color hex code you want.
[ColorHunt.co](https://colorhunt.co) is a great place to find nice colors.

---

## ❓ Common Issues

**"command not found: npm"** → Install Node.js from [nodejs.org](https://nodejs.org) first

**The site looks broken** → Make sure you didn't accidentally delete a comma or bracket in `content.js`

**I want more cards** → Copy-paste an existing card block in `content.js` and change the text
