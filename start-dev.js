const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Pizza Builder Development Servers...');

// Start backend server
console.log('Starting backend server...');
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend server
console.log('Starting frontend server...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});