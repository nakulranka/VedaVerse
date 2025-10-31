#!/bin/bash

echo "🚀 VedaVerse Deployment Checker"
echo "================================"

# Check if build exists
if [ -d "build" ]; then
    echo "✅ Build folder exists"
    echo "📦 Build size: $(du -sh build | cut -f1)"
else
    echo "❌ Build folder missing - run 'npm run build' first"
    exit 1
fi

# Check environment variables
echo ""
echo "🔧 Environment Variables Check:"
if grep -q "REACT_APP_FIREBASE" .env 2>/dev/null; then
    echo "✅ Firebase environment variables found in .env"
else
    echo "⚠️  No .env file found - make sure to set environment variables in your deployment platform"
fi

# Check for common files
echo ""
echo "📄 Deployment Files Check:"
[ -f "netlify.toml" ] && echo "✅ netlify.toml exists"
[ -f "vercel.json" ] && echo "✅ vercel.json exists"
[ -f "firebase.json" ] && echo "✅ firebase.json exists"
[ -f "Dockerfile" ] && echo "✅ Dockerfile exists"

echo ""
echo "🎯 Quick Deploy Commands:"
echo "Netlify: npm run build && netlify deploy --prod --dir=build"
echo "Vercel:  npm run build && vercel --prod"
echo "Firebase: npm run build && firebase deploy"

echo ""
echo "🌐 Your app will be accessible at the provided URL after deployment!"
echo "Don't forget to update Firebase Auth authorized domains! 🔒"