/**
 * Test script to verify the Pizza Builder application setup
 * This script checks if both frontend and backend are properly configured
 */

const { exec } = require('child_process');
const path = require('path');

// Function to execute shell commands
const executeCommand = (command, cwd) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

// Function to check if a port is in use
const checkPort = (port) => {
  return new Promise((resolve) => {
    const command = process.platform === 'win32' 
      ? `netstat -an | findstr :${port}` 
      : `lsof -i :${port}`;
    
    exec(command, (error, stdout) => {
      resolve(stdout.includes(port.toString()));
    });
  });
};

// Main test function
const testSetup = async () => {
  console.log('🧪 Testing Pizza Builder Application Setup...\n');
  
  try {
    // Check if we're in the right directory
    const projectRoot = path.resolve(__dirname);
    console.log(`📁 Project root: ${projectRoot}`);
    
    // Check backend directory
    const backendPath = path.join(projectRoot, 'backend');
    const frontendPath = path.join(projectRoot, 'frontend');
    
    console.log('\n📂 Checking directory structure...');
    if (require('fs').existsSync(backendPath)) {
      console.log('✅ Backend directory found');
    } else {
      console.log('❌ Backend directory not found');
      return;
    }
    
    if (require('fs').existsSync(frontendPath)) {
      console.log('✅ Frontend directory found');
    } else {
      console.log('❌ Frontend directory not found');
      return;
    }
    
    // Check backend package.json
    console.log('\n📦 Checking backend setup...');
    try {
      const backendPackage = require(path.join(backendPath, 'package.json'));
      console.log(`✅ Backend package.json found (${backendPackage.name})`);
    } catch (err) {
      console.log('❌ Backend package.json not found or invalid');
      return;
    }
    
    // Check frontend package.json
    console.log('\n📦 Checking frontend setup...');
    try {
      const frontendPackage = require(path.join(frontendPath, 'package.json'));
      console.log(`✅ Frontend package.json found (${frontendPackage.name})`);
    } catch (err) {
      console.log('❌ Frontend package.json not found or invalid');
      return;
    }
    
    // Check if required files exist
    console.log('\n📄 Checking required files...');
    const requiredFiles = [
      { path: path.join(backendPath, '.env.example'), name: 'Backend .env.example' },
      { path: path.join(backendPath, 'server.js'), name: 'Backend server.js' },
      { path: path.join(backendPath, 'seed.js'), name: 'Backend seed.js' },
      { path: path.join(frontendPath, 'index.html'), name: 'Frontend index.html' },
      { path: path.join(frontendPath, 'vite.config.js'), name: 'Frontend vite.config.js' }
    ];
    
    for (const file of requiredFiles) {
      if (require('fs').existsSync(file.path)) {
        console.log(`✅ ${file.name} found`);
      } else {
        console.log(`❌ ${file.name} not found`);
      }
    }
    
    // Check if ports are available
    console.log('\n🔌 Checking port availability...');
    const backendPort = 5000;
    const frontendPort = 3000;
    
    const isBackendPortUsed = await checkPort(backendPort);
    const isFrontendPortUsed = await checkPort(frontendPort);
    
    if (isBackendPortUsed) {
      console.log(`⚠️  Port ${backendPort} (backend) is already in use`);
    } else {
      console.log(`✅ Port ${backendPort} (backend) is available`);
    }
    
    if (isFrontendPortUsed) {
      console.log(`⚠️  Port ${frontendPort} (frontend) is already in use`);
    } else {
      console.log(`✅ Port ${frontendPort} (frontend) is available`);
    }
    
    // Check Node.js version
    console.log('\n⚙️  Checking Node.js version...');
    try {
      const { stdout } = await executeCommand('node --version', projectRoot);
      const version = stdout.trim();
      console.log(`✅ Node.js version: ${version}`);
      
      // Check if version is >= 14
      const versionNumber = parseInt(version.replace('v', '').split('.')[0]);
      if (versionNumber >= 14) {
        console.log('✅ Node.js version is compatible');
      } else {
        console.log('⚠️  Node.js version might be too old (requires v14 or higher)');
      }
    } catch (err) {
      console.log('❌ Failed to check Node.js version');
    }
    
    // Check npm version
    console.log('\n⚙️  Checking npm version...');
    try {
      const { stdout } = await executeCommand('npm --version', projectRoot);
      const version = stdout.trim();
      console.log(`✅ npm version: ${version}`);
    } catch (err) {
      console.log('❌ Failed to check npm version');
    }
    
    console.log('\n🎉 Setup check completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Configure your .env files in both frontend and backend directories');
    console.log('2. Run "npm install" in both frontend and backend directories');
    console.log('3. Run "npm run seed" in the backend directory to populate initial data');
    console.log('4. Start the backend server with "npm run dev" in the backend directory');
    console.log('5. Start the frontend server with "npm run dev" in the frontend directory');
    
  } catch (error) {
    console.error('❌ Error during setup test:', error);
  }
};

// Run the test
testSetup();