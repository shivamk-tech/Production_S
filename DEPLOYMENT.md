# Uber Clone - Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)
- Render account (for backend) or Railway/Heroku
- Vercel/Netlify account (for frontend)
- Gmail account (for email OTP)

---

## Part 1: Prepare Your Code

### 1. Install Missing Backend Dependencies
```bash
cd backend
npm install bcrypt cors nodemailer
```

### 2. Update Backend for Production
The backend is already configured with proper CORS and cookie settings.

---

## Part 2: Setup MongoDB Atlas (Database)

### 1. Create MongoDB Atlas Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up for free tier
- Create a new cluster (M0 Free tier)

### 2. Configure Database Access
- Go to "Database Access" → Add New Database User
- Create username and password (save these!)
- Set privileges to "Read and write to any database"

### 3. Configure Network Access
- Go to "Network Access" → Add IP Address
- Click "Allow Access from Anywhere" (0.0.0.0/0)
- Confirm

### 4. Get Connection String
- Go to "Database" → Click "Connect"
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your database user password
- Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/uber?retryWrites=true&w=majority`

---

## Part 3: Setup Email Service (Gmail)

### 1. Enable 2-Factor Authentication
- Go to Google Account settings
- Security → 2-Step Verification → Enable

### 2. Generate App Password
- Go to Security → 2-Step Verification
- Scroll down to "App passwords"
- Select app: "Mail", device: "Other (Custom name)"
- Name it "Uber Clone"
- Copy the 16-character password (save this!)

---

## Part 4: Deploy Backend to Render

### 1. Push Code to GitHub
```bash
cd /Users/shivamkumarsagar/Desktop/Production_S
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Create Render Account
- Go to https://render.com
- Sign up with GitHub

### 3. Create New Web Service
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Configure:
  - **Name**: uber-backend
  - **Region**: Oregon (US West)
  - **Branch**: main
  - **Root Directory**: backend
  - **Runtime**: Node
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Plan**: Free

### 4. Add Environment Variables
Click "Advanced" → Add Environment Variables:

```
NODE_ENV=production
PORT=3003
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key_here_make_it_long_and_secure
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
```

To generate JWT_SECRET, run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 5. Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Copy your backend URL (e.g., `https://uber-backend.onrender.com`)

---

## Part 5: Deploy Frontend to Vercel

### 1. Update Frontend Environment Variables
Create `.env` file in frontend folder:
```bash
cd frontend
```

Create file: `frontend/.env`
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### 2. Build Frontend Locally (Test)
```bash
npm run build
```

### 3. Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? uber-clone-frontend
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### 4. Add Environment Variable in Vercel Dashboard
- Go to Vercel Dashboard → Your Project
- Settings → Environment Variables
- Add: `VITE_API_URL` = `https://your-backend-url.onrender.com`
- Redeploy

---

## Part 6: Update Backend CORS for Production

After deploying frontend, update backend CORS:

In `backend/src/app.js`, update:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'],
  credentials: true
}))
```

Commit and push changes to trigger redeployment.

---

## Part 7: Testing

### 1. Test Backend
Visit: `https://your-backend-url.onrender.com/api/auth/me`
Should return 401 (expected when not logged in)

### 2. Test Frontend
- Visit your Vercel URL
- Try signup/login
- Test ride booking
- Check location suggestions

---

## Troubleshooting

### Backend Issues
- **500 Error**: Check Render logs for errors
- **Database Connection**: Verify MongoDB connection string
- **Email Not Sending**: Check Gmail app password

### Frontend Issues
- **API Errors**: Verify VITE_API_URL is correct
- **CORS Errors**: Update backend CORS origin
- **Build Errors**: Check console for missing dependencies

### Common Fixes
```bash
# Backend - View logs
# Go to Render Dashboard → Your Service → Logs

# Frontend - Rebuild
cd frontend
npm run build
vercel --prod
```

---

## Environment Variables Summary

### Backend (.env)
```
NODE_ENV=production
PORT=3003
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Alternative Deployment Options

### Backend Alternatives
- **Railway**: Similar to Render, easier setup
- **Heroku**: Paid plans only now
- **AWS EC2**: More complex, full control
- **DigitalOcean**: App Platform

### Frontend Alternatives
- **Netlify**: Similar to Vercel
- **GitHub Pages**: Static only
- **Cloudflare Pages**: Fast CDN

---

## Post-Deployment Checklist

- [ ] Backend is accessible
- [ ] Database connection works
- [ ] Email OTP sending works
- [ ] Frontend loads correctly
- [ ] Login/Signup works
- [ ] Ride booking works
- [ ] Location suggestions work
- [ ] Real-time updates work (Socket.io)
- [ ] Mobile responsive
- [ ] HTTPS enabled (automatic on Vercel/Render)

---

## Monitoring & Maintenance

### Free Tier Limitations
- **Render Free**: Spins down after 15 min inactivity (cold starts)
- **MongoDB Atlas Free**: 512MB storage
- **Vercel Free**: 100GB bandwidth/month

### Keep Backend Alive
Use a service like UptimeRobot to ping your backend every 5 minutes.

---

## Need Help?

Common issues:
1. **Cold starts**: First request takes 30-60 seconds on free tier
2. **CORS errors**: Update backend origin list
3. **Cookie issues**: Check sameSite settings
4. **Socket.io**: May need additional configuration for production

---

## Success! 🎉

Your Uber clone is now live and accessible worldwide!

- Frontend: https://your-app.vercel.app
- Backend: https://your-backend.onrender.com
