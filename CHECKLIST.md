# 📋 Deployment Checklist

## Pre-Deployment
- [ ] All code committed to Git
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] Backend builds without errors
- [ ] Frontend builds without errors (`npm run build`)

## Environment Setup
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created (M0 Free tier)
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0)
- [ ] MongoDB connection string obtained
- [ ] Gmail 2FA enabled
- [ ] Gmail app password generated
- [ ] JWT secret generated

## Backend Configuration
- [ ] `backend/.env` file created
- [ ] `NODE_ENV=production` set
- [ ] `PORT=3003` set
- [ ] `MONGODB_URI` configured
- [ ] `JWT_SECRET` configured
- [ ] `EMAIL_USER` configured
- [ ] `EMAIL_PASS` configured

## Frontend Configuration
- [ ] `frontend/.env` file created
- [ ] `VITE_API_URL` configured

## GitHub Setup
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Repository is public or accessible

## Backend Deployment (Render)
- [ ] Render account created
- [ ] New Web Service created
- [ ] GitHub repository connected
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] All environment variables added
- [ ] Deployment successful
- [ ] Backend URL copied
- [ ] Backend accessible (test /api/auth/me)

## Frontend Deployment (Vercel)
- [ ] Vercel CLI installed
- [ ] Vercel account created
- [ ] Frontend `.env` updated with backend URL
- [ ] Changes committed and pushed
- [ ] Deployed to Vercel
- [ ] Environment variable added in Vercel dashboard
- [ ] Redeployed after env var update
- [ ] Frontend URL copied
- [ ] Frontend loads correctly

## Post-Deployment Configuration
- [ ] Backend CORS updated with frontend URL
- [ ] Changes committed and pushed
- [ ] Backend redeployed automatically
- [ ] CORS working (no errors in browser console)

## Testing
- [ ] Frontend loads without errors
- [ ] Backend API responds
- [ ] Signup flow works
  - [ ] Email input accepted
  - [ ] OTP email received
  - [ ] OTP verification works
  - [ ] User created in database
- [ ] Login flow works
  - [ ] Email input accepted
  - [ ] OTP email received
  - [ ] OTP verification works
  - [ ] User logged in
- [ ] Location features work
  - [ ] Location suggestions appear
  - [ ] Current location works
  - [ ] Map displays correctly
- [ ] Ride booking works
  - [ ] Can select pickup/dropoff
  - [ ] Fare calculation works
  - [ ] Ride creation works
- [ ] Real-time features work
  - [ ] Socket.io connects
  - [ ] Location updates work
  - [ ] Ride status updates work

## Performance & Monitoring
- [ ] Backend responds within acceptable time
- [ ] Frontend loads quickly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] HTTPS enabled (automatic)

## Optional Enhancements
- [ ] Custom domain configured
- [ ] UptimeRobot monitoring setup (keep backend alive)
- [ ] Error tracking setup (Sentry)
- [ ] Analytics setup (Google Analytics)

## Documentation
- [ ] README.md updated with live URLs
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Known issues documented

## Final Checks
- [ ] All features tested on production
- [ ] No sensitive data in code
- [ ] .env files not committed
- [ ] Error handling works
- [ ] User experience is smooth

---

## 🎉 Deployment Complete!

**Live URLs:**
- Frontend: ___________________________
- Backend: ___________________________

**Credentials:**
- MongoDB: ___________________________
- Render: ___________________________
- Vercel: ___________________________

**Date Deployed:** ___________________________

---

## Notes & Issues

(Add any notes or issues encountered during deployment)

_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________
