#!/bin/bash

echo "🚀 Uber Clone - Quick Deployment Script"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Check if .env files exist
if [ ! -f backend/.env ]; then
    echo "⚠️  WARNING: backend/.env not found!"
    echo "   Copy backend/.env.example to backend/.env and fill in your values"
    exit 1
fi

if [ ! -f frontend/.env ]; then
    echo "⚠️  WARNING: frontend/.env not found!"
    echo "   Copy frontend/.env.example to frontend/.env and fill in your values"
    exit 1
fi

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..
echo "✅ Backend dependencies installed"

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo "✅ Frontend dependencies installed"

# Test backend build
echo ""
echo "🧪 Testing backend..."
cd backend
if node -e "require('./src/app.js')" 2>/dev/null; then
    echo "✅ Backend code is valid"
else
    echo "❌ Backend has errors - please fix before deploying"
    exit 1
fi
cd ..

# Test frontend build
echo ""
echo "🧪 Building frontend..."
cd frontend
if npm run build; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed - please fix before deploying"
    exit 1
fi
cd ..

# Git add and commit
echo ""
echo "📝 Committing changes..."
git add .
git commit -m "Prepare for deployment" || echo "No changes to commit"

echo ""
echo "✅ Pre-deployment checks complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Create a GitHub repository"
echo "2. Run: git remote add origin YOUR_GITHUB_REPO_URL"
echo "3. Run: git push -u origin main"
echo "4. Follow DEPLOYMENT.md for detailed deployment instructions"
echo ""
echo "🎉 Good luck with your deployment!"
