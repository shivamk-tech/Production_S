# 🚀 Deploy to GitHub Pages

## ⚠️ Important Note

GitHub Pages only supports **static frontend** deployment. You'll need:
- Frontend on GitHub Pages (free)
- Backend on a hosting platform (Render/Railway/Heroku)

GitHub Pages cannot run Node.js backend servers.

---

## Option 1: Frontend on GitHub Pages + Backend Elsewhere

### Step 1: Deploy Backend to Render (Free, Required)
```bash
# Backend MUST be hosted somewhere to handle API requests
# Render is free and takes 10 minutes
```

1. Go to https://render.com
2. Sign up with GitHub
3. New + → Web Service
4. Connect: tushar-1226/Production_S
5. Root Directory: `backend`
6. Build: `npm install`
7. Start: `npm start`
8. Add environment variables:
   - NODE_ENV=production
   - PORT=3003
   - MONGO_URI=mongodb+srv://yt:FtptCqVlBAPNeQC8@firstcluster.jtdgrph.mongodb.net/UberUsers
   - JWT_SECRET=40e84cceda4d1e241448624f711221edcb3cfc4a8dbde1bc6749c7c0a1dc34d5
   - EMAIL_USER=shivanshi2081031@gmail.com
   - EMAIL_PASS=enybjrxpaiephhsp
9. Deploy and copy URL

### Step 2: Deploy Frontend to GitHub Pages

Update frontend config:
```bash
cd /Users/shivamkumarsagar/Desktop/Production_S/frontend
```

Edit `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Production_S/',  // Add this line
})
```

Edit `.env`:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

Install gh-pages:
```bash
npm install --save-dev gh-pages
```

Update `package.json` scripts:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Deploy:
```bash
npm run deploy
```

### Step 3: Enable GitHub Pages
1. Go to https://github.com/tushar-1226/Production_S
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages` → `/ (root)`
5. Save

Your app will be live at:
`https://tushar-1226.github.io/Production_S/`

---

## Option 2: Everything on GitHub (Static Demo Only)

If you want ONLY frontend on GitHub without backend functionality:

```bash
cd frontend
npm run build
```

This creates a static site but:
- ❌ No login/signup (needs backend)
- ❌ No ride booking (needs backend)
- ❌ No real-time updates (needs backend)
- ✅ Only UI/design visible

---

## Recommended: Use Free Hosting Platforms

**Best option for full functionality:**

1. **Backend**: Render (free) - 10 minutes
2. **Frontend**: Vercel (free) - 5 minutes

Both are free and give you a working app with all features.

---

## Quick Deploy Commands

```bash
# If you choose GitHub Pages for frontend:
cd /Users/shivamkumarsagar/Desktop/Production_S/frontend

# Update vite.config.js (add base: '/Production_S/')
# Update .env with backend URL
# Update package.json (add deploy scripts)

npm install --save-dev gh-pages
npm run deploy

# Enable GitHub Pages in repo settings
```

Your frontend will be at: `https://tushar-1226.github.io/Production_S/`

But you still need backend on Render/Railway for the app to work!
