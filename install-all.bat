@echo off
echo ========================================
echo Pizza Builder - Installing Dependencies
echo ========================================

echo.
echo Installing root dependencies...
call npm install

echo.
echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo All dependencies installed successfully!
echo.
echo Next steps:
echo 1. Configure your .env files in both frontend and backend directories
echo 2. Run "npm run seed" in the backend directory to populate initial data
echo 3. Start the development servers with "start-dev.bat" or "npm run dev"
echo.
pause