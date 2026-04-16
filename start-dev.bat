@echo off
echo ========================================
echo Pizza Builder - Development Server
echo ========================================

echo.
echo Installing dependencies...
call npm install
cd backend
call npm install
cd ..
cd frontend
call npm install
cd ..

echo.
echo Starting development servers...
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:5000
echo.

cd backend
start "Backend Server" cmd /k "npm run dev"
cd ..
cd frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

echo Servers started successfully!
echo Press any key to exit...
pause >nul