@echo off
echo ====================================
echo EcoFinds Marketplace Quick Setup
echo ====================================
echo.

echo Step 1: Cloning repository...
git clone https://github.com/MadheshN-eng/oodo.git
cd oodo

echo.
echo Step 2: Setting up Backend...
cd ecofinde-backend
call npm install

echo.
echo Creating .env file...
echo MONGODB_URI=mongodb://localhost:27017/ecofinde > .env
echo JWT_SECRET=your-super-secret-jwt-key-change-this >> .env
echo PORT=5000 >> .env

echo.
echo Step 3: Setting up Frontend...
cd ..\ecofinde-frontend
call npm install

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo To start the application:
echo 1. Open terminal in ecofinde-backend folder and run: npm run dev
echo 2. Open another terminal in ecofinde-frontend folder and run: npm start
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:5000
echo.
echo Note: Make sure MongoDB is running on your system!
echo.
pause
