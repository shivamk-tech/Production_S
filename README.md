# Production_S - Uber Clone

A full-stack ride-sharing application built with React, Node.js, Express, MongoDB, and Socket.io.

## 🚀 Features

- **User Authentication**: Email OTP-based signup and login
- **Real-time Ride Tracking**: Live location updates using Socket.io
- **Interactive Maps**: Leaflet integration with routing
- **Location Suggestions**: Auto-complete address search
- **Multiple Vehicle Types**: Cab, Auto, Moto options
- **Ride Management**: Accept, start, and complete rides
- **Driver & Rider Dashboards**: Separate interfaces for drivers and riders

## 📁 Project Structure

```
Production_S/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── app.js
│   ├── .env.example
│   └── package.json
├── frontend/         # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
├── DEPLOYMENT.md     # Detailed deployment guide
└── deploy.sh         # Quick deployment script
```

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Leaflet (Maps)
- Socket.io Client
- Axios
- React Router

### Backend
- Node.js
- Express 5
- MongoDB + Mongoose
- Socket.io
- JWT Authentication
- Nodemailer (Email OTP)
- bcrypt

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Gmail account (for OTP emails)

### 1. Clone and Install

```bash
cd Production_S

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Setup Environment Variables

**Backend** (`backend/.env`):
```env
NODE_ENV=development
PORT=3003
MONGODB_URI=mongodb://localhost:27017/uber
JWT_SECRET=your_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:3003
```

### 3. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit: http://localhost:5173

## 📦 Deployment

For detailed deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Quick Deploy

```bash
# Run pre-deployment checks
./deploy.sh

# Follow the instructions in DEPLOYMENT.md
```

### Deployment Platforms

- **Backend**: Render, Railway, or Heroku
- **Frontend**: Vercel or Netlify
- **Database**: MongoDB Atlas (Free tier)

## 🔑 Key Features Implementation

### Authentication Flow
1. User enters email
2. OTP sent via email
3. User verifies OTP
4. JWT token stored in HTTP-only cookie

### Ride Flow
1. Rider selects pickup and dropoff locations
2. System calculates fare and distance
3. Rider books ride
4. Available drivers see pending rides
5. Driver accepts ride
6. Real-time location tracking begins
7. Driver starts ride
8. Driver completes ride
9. Rider confirms arrival

## 🐛 Troubleshooting

### Common Issues

**Location suggestions not working:**
- Check if backend is running
- Verify VITE_API_URL in frontend/.env

**Login not working:**
- Check Gmail app password is correct
- Verify JWT_SECRET is set
- Check browser cookies are enabled

**Socket.io connection failed:**
- Ensure backend and frontend URLs match
- Check CORS configuration

## 📝 API Endpoints

### Authentication
- `POST /api/auth/send-email-otp` - Send signup OTP
- `POST /api/auth/verify-email-otp` - Verify signup OTP
- `POST /api/auth/send-login-otp` - Send login OTP
- `POST /api/auth/verify-login-otp` - Verify login OTP
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout user

### Rides
- `POST /api/ride/create-rides` - Create new ride
- `GET /api/ride/pending-rides` - Get pending rides (drivers)
- `PATCH /api/ride/:id/accept` - Accept ride
- `PATCH /api/ride/:id/start` - Start ride
- `PATCH /api/ride/:id/complete` - Complete ride

### Maps
- `GET /api/maps/suggestions` - Get location suggestions
- `GET /api/maps/reverse-geocode` - Reverse geocode coordinates

## 🤝 Contributing

This is a practice project for production-level development.

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Shivam Kumar Sagar

---

**Ready to deploy?** Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions!
