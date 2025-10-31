@echo off
echo ========================================
echo    VedaVerse Setup Script (No Docker)
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Create new React TypeScript app
echo 📦 Creating new React TypeScript application...
cd /d c:\Projects
npx create-react-app vedaverse-frontend --template typescript
cd vedaverse-frontend

echo.
echo 📥 Installing required dependencies...

REM Install Material-UI and other dependencies
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install react-hook-form @hookform/resolvers yup
npm install firebase axios
npm install @fontsource/roboto

echo.
echo 📁 Creating directory structure...

REM Create required directories
mkdir src\config 2>nul
mkdir src\hooks 2>nul
mkdir src\services 2>nul
mkdir src\components\auth 2>nul
mkdir public\images 2>nul

echo.
echo 🔥 Creating Firebase configuration...

REM Create Firebase config file
(
echo import { initializeApp } from 'firebase/app';
echo import { getAuth } from 'firebase/auth';
echo import { getFirestore } from 'firebase/firestore';
echo import { getStorage } from 'firebase/storage';
echo.
echo const firebaseConfig = {
echo   apiKey: "AIzaSyASvybUhmC1F0f-xo6dvtbjFPiSkanXB-8",
echo   authDomain: "vedaverse-app.firebaseapp.com",
echo   projectId: "vedaverse-app",
echo   storageBucket: "vedaverse-app.firebasestorage.app",
echo   messagingSenderId: "487346652887",
echo   appId: "1:487346652887:web:8737bd81c43f7294f79292",
echo   measurementId: "G-BJH807NNXD"
echo };
echo.
echo const app = initializeApp^(firebaseConfig^);
echo export const auth = getAuth^(app^);
echo export const db = getFirestore^(app^);
echo export const storage = getStorage^(app^);
echo export default app;
) > src\config\firebase.ts

echo.
echo 🔧 Creating environment configuration...

REM Create .env.local file
(
echo # Firebase Configuration
echo REACT_APP_FIREBASE_API_KEY=AIzaSyASvybUhmC1F0f-xo6dvtbjFPiSkanXB-8
echo REACT_APP_FIREBASE_AUTH_DOMAIN=vedaverse-app.firebaseapp.com
echo REACT_APP_FIREBASE_PROJECT_ID=vedaverse-app
echo REACT_APP_FIREBASE_STORAGE_BUCKET=vedaverse-app.firebasestorage.app
echo REACT_APP_FIREBASE_MESSAGING_SENDER_ID=487346652887
echo REACT_APP_FIREBASE_APP_ID=1:487346652887:web:8737bd81c43f7294f79292
echo REACT_APP_FIREBASE_MEASUREMENT_ID=G-BJH807NNXD
echo.
echo # API Configuration
echo REACT_APP_API_URL=http://localhost:5000/api
) > .env.local

echo.
echo 📋 Setup completed! Next steps:
echo.
echo 1. Copy your existing components:
echo    - Copy from: c:\Projects\Veda_Verse\src\components\*
echo    - Copy to:   c:\Projects\vedaverse-frontend\src\components\
echo.
echo 2. Copy your images:
echo    - Copy from: c:\Projects\Veda_Verse\public\images\*
echo    - Copy to:   c:\Projects\vedaverse-frontend\public\images\
echo.
echo 3. Convert components from .js to .tsx
echo.
echo 4. Start the development server:
echo    cd c:\Projects\vedaverse-frontend
echo    npm start
echo.
echo 🎉 Your VedaVerse app will be ready at http://localhost:3000
echo.

REM Ask if user wants to copy files automatically
echo.
set /p COPY_FILES="Do you want to copy files automatically? (y/n): "
if /i "%COPY_FILES%"=="y" (
    echo.
    echo 📂 Copying components...
    xcopy "c:\Projects\Veda_Verse\src\components\*" "src\components\" /E /I /Y 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Components copied successfully
    ) else (
        echo ⚠️  Could not copy components automatically
        echo Please copy manually from c:\Projects\Veda_Verse\src\components\
    )
    
    echo.
    echo 📂 Copying images...
    xcopy "c:\Projects\Veda_Verse\public\images\*" "public\images\" /E /I /Y 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Images copied successfully
    ) else (
        echo ⚠️  Could not copy images automatically
        echo Please copy manually from c:\Projects\Veda_Verse\public\images\
    )
)

echo.
set /p START_APP="Do you want to start the development server now? (y/n): "
if /i "%START_APP%"=="y" (
    echo.
    echo 🚀 Starting development server...
    echo Your app will open at http://localhost:3000
    start cmd /k "npm start"
)

echo.
echo 📚 Documentation files created in c:\Projects\Veda_Verse\:
echo    - SIMPLE_SETUP_GUIDE.md
echo    - COMPONENT_CONVERSION_GUIDE.md
echo.
echo Happy coding! 🎉
pause