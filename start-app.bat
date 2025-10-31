@echo off
echo ========================================
echo       VedaVerse - Quick Setup
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo Node.js found! Version:
node --version

echo.
echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo     Installation Complete! 
echo ========================================
echo.
echo Starting VedaVerse development server...
echo The app will open in your browser at:
echo http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================

call npm start

pause