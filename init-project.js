const { exec } = require('child_process');
const path = require('path');

console.log('Initializing Pizza Builder Project...');

// Install backend dependencies
console.log('Installing backend dependencies...');
exec('cd backend && npm install', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing backend dependencies: ${error}`);
    return;
  }
  console.log('Backend dependencies installed successfully!');
  
  // Install frontend dependencies
  console.log('Installing frontend dependencies...');
  exec('cd frontend && npm install', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing frontend dependencies: ${error}`);
      return;
    }
    console.log('Frontend dependencies installed successfully!');
    console.log('Project initialization complete!');
    console.log('To start the project:');
    console.log('1. Start the backend: cd backend && npm run dev');
    console.log('2. Start the frontend: cd frontend && npm run dev');
  });
});