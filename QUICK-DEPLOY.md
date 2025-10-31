# 🚀 Quick GitHub + Netlify Deployment

## Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial VedaVerse deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/VedaVerse.git
git push -u origin main
```

## Step 2: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Click "Deploy site"

## Step 3: Add Environment Variables
In Netlify dashboard > Site Settings > Environment Variables:
```
REACT_APP_FIREBASE_API_KEY=AIzaSyBqJNJDnqzgvGRE_lh7VBgCJKj8TqJ6xvE
REACT_APP_FIREBASE_AUTH_DOMAIN=vedaverse-app.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=vedaverse-app
REACT_APP_FIREBASE_STORAGE_BUCKET=vedaverse-app.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=245240288434
REACT_APP_FIREBASE_APP_ID=1:245240288434:web:8f7b8b3e8f7b8b3e8f7b8b
```

## Step 4: Update Firebase Auth Domains
1. Go to Firebase Console > Authentication > Settings
2. Add your Netlify domain to authorized domains
3. Example: `your-app-name.netlify.app`

## Done! ✨
Your app will redeploy automatically on every git push!