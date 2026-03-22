# 🚀 Quick Deployment Guide - Start Here!

## Step 1: Setup Environment Files (5 minutes)

### Backend Environment
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and fill in:
```env
NODE_ENV=production
PORT=3003
MONGODB_URI=<Get from MongoDB Atlas - see below>
JWT_SECRET=<Generate - see below>
EMAIL_USER=<Your Gmail>
EMAIL_PASS=<Gmail App Password - see below>
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Frontend Environment
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:3003
```
(Update this after deploying backend)

---

## Step 2: Get MongoDB Connection String (10 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create New Cluster → M0 Free tier
4. Database Access → Add User (save username/password)
5. Network Access → Add IP → Allow from Anywhere (0.0.0.0/0)
6. Database → Connect → Connect Application
7. Copy connection string
8. Replace `<password>` with your database password
9. Paste into `backend/.env` as `MONGODB_URI`

---

## Step 3: Get Gmail App Password (5 minutes)

1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Search "App passwords"
4. Create new app password for "Mail"
5. Copy 16-character password
6. Paste into `backend/.env` as `EMAIL_PASS`
7. Add your Gmail as `EMAIL_USER`

---

## Step 4: Test Locally (2 minutes)

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 and test signup/login

---

## Step 5: Deploy Backend to Render (15 minutes)

### A. Push to GitHub
```bash
cd /Users/shivamkumarsagar/Desktop/Production_S
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### B. Deploy on Render
1. Go to https://render.com → Sign up with GitHub
2. New + → Web Service
3. Connect your repository
4. Settings:
   - **Name**: uber-backend
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Environment Variables (click Advanced):
   ```
   NODE_ENV=production
   PORT=3003
   MONGODB_URI=<paste your MongoDB URI>
   JWT_SECRET=<paste your generated secret>
   EMAIL_USER=<your Gmail>
   EMAIL_PASS=<your app password>
   ```

6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. **Copy your backend URL** (e.g., `https://uber-backend-xxxx.onrender.com`)

---

## Step 6: Deploy Frontend to Vercel (10 minutes)

### A. Update Frontend Environment
Edit `frontend/.env`:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Commit and push:
```bash
git add .
git commit -m "Update API URL"
git push
```

### B. Deploy on Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel login
vercel

# Follow prompts, then deploy to production:
vercel --prod
```

### C. Add Environment Variable in Vercel
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com`
4. Redeploy from dashboard

---

## Step 7: Update Backend CORS (5 minutes)

Edit `backend/src/app.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend-url.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}))
```

Commit and push to trigger Render redeployment:
```bash
git add .
git commit -m "Update CORS"
git push
```

---

## ✅ Done! Test Your App

Visit your Vercel URL and test:
- [ ] Signup with email
- [ ] Receive OTP email
- [ ] Login works
- [ ] Location suggestions work
- [ ] Ride booking works

---

## 🆘 Troubleshooting

**Backend not starting?**
- Check Render logs for errors
- Verify all environment variables are set

**Frontend can't connect?**
- Check VITE_API_URL is correct
- Verify backend CORS includes your frontend URL

**Email not sending?**
- Verify Gmail app password (not regular password)
- Check EMAIL_USER and EMAIL_PASS in Render

**Location suggestions not working?**
- Wait 30 seconds (Render free tier cold start)
- Check browser console for errors

---

## 📊 Deployment Status

- [ ] MongoDB Atlas setup
- [ ] Gmail app password obtained
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS updated
- [ ] App tested and working

---

## 🎉 Success!

Your app is live at:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com

Share it with the world! 🌍
