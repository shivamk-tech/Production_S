const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const rideRoutes = require('./routes/ride.routes')
const mapsRoutes = require('./routes/maps.routes')

const app = express()

const FRONTEND_URL = process.env.FRONTEND_URL || "https://uber-zeta-henna.vercel.app"

// Allow multiple Vercel URLs
const allowedOrigins = [
  FRONTEND_URL,
  "https://uber-zeta-henna.vercel.app",
  "http://localhost:5173"
]

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    // Check if origin matches any allowed pattern
    if (allowedOrigins.includes(origin) || origin.includes('vercel.app')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/ride', rideRoutes)
app.use('/api/maps', mapsRoutes)

module.exports = app