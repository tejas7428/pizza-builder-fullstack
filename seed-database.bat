@echo off
echo ========================================
echo Pizza Builder - Seeding Database
echo ========================================

echo.
echo Seeding initial data...
cd backend
call npm run seed
cd ..

echo.
echo Database seeding completed!
echo.
echo This created:
echo - An admin user (admin@example.com / admin123)
echo - A sample user (user@example.com / user123)
echo - 5 pizza bases
echo - 5 sauces
echo - 5 cheeses
echo - 8 veggies
echo - 6 meats
echo.
pause