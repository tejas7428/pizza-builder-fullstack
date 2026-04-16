# Windows Development Setup Guide

This guide provides specific instructions for setting up the Pizza Builder application on Windows systems, addressing common issues like PowerShell execution policies.

## Prerequisites

1. **Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
2. **MongoDB**: Install MongoDB Community Server or sign up for MongoDB Atlas
3. **Git**: Download and install from [git-scm.com](https://git-scm.com/)

## PowerShell Execution Policy Fix

Windows restricts script execution by default. To fix this:

1. Open PowerShell as Administrator
2. Run the following command:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Confirm with `Y` when prompted

Alternatively, you can use Command Prompt instead of PowerShell for running npm commands.

## Setting Up the Project

### 1. Clone or Download the Repository

If using Git:
```cmd
git clone <repository-url>
cd pizza-builder
```

### 2. Install Dependencies

Using Command Prompt (recommended on Windows):
```cmd
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

Or using the convenience script in Command Prompt:
```cmd
npm run install:all
```

### 3. Configure Environment Variables

#### Backend Configuration
1. Navigate to the `backend` directory
2. Copy `.env.example` to `.env`:
   ```cmd
   copy .env.example .env
   ```
3. Edit the `.env` file with your configuration

#### Frontend Configuration
1. Navigate to the `frontend` directory
2. Copy `.env.example` to `.env`:
   ```cmd
   copy .env.example .env
   ```
3. Edit the `.env` file with your configuration

### 4. Seed Initial Data

From the `backend` directory:
```cmd
npm run seed
```

### 5. Run the Application

#### Option 1: Using Command Prompt (Recommended)
```cmd
# From the root directory
npm run dev
```

#### Option 2: Running Servers Separately

Terminal 1 - Backend:
```cmd
cd backend
npm run dev
```

Terminal 2 - Frontend:
```cmd
cd frontend
npm run dev
```

## Troubleshooting Common Windows Issues

### npm.ps1 Cannot Be Loaded

**Problem**: Error message about npm.ps1 script not being able to run

**Solution**: 
1. Use Command Prompt instead of PowerShell, OR
2. Change PowerShell execution policy as described above

### Path Issues

**Problem**: Commands not found or path errors

**Solution**: 
1. Use forward slashes `/` or escaped backslashes `\\` in paths
2. Ensure you're in the correct directory before running commands

### Port Already in Use

**Problem**: Error that port 3000 or 5000 is already in use

**Solution**:
1. Find and kill the processes using those ports:
   ```cmd
   netstat -ano | findstr :3000
   taskkill /PID <PID_NUMBER> /F
   ```
2. Or change the ports in the configuration files

### MongoDB Connection Issues

**Problem**: Cannot connect to MongoDB

**Solution**:
1. Ensure MongoDB service is running:
   - Search for "Services" in Windows
   - Find "MongoDB Server" and ensure it's running
2. Check your connection string format:
   - Local: `mongodb://localhost:27017/pizza-builder`
   - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/pizza-builder`

## Running Tests on Windows

### Backend Tests
```cmd
cd backend
npm test
```

### Frontend Tests
```cmd
cd frontend
npm test
```

If you encounter issues with the test scripts, you can run them directly:
```cmd
cd backend
npx jest
```

## Development Tips for Windows

1. **Use Command Prompt**: For the most reliable experience, use Command Prompt instead of PowerShell for npm commands

2. **IDE Recommendations**: 
   - Visual Studio Code with integrated terminal
   - WebStorm
   - Atom with terminal packages

3. **File Watching Issues**: 
   If you experience issues with file watching in Vite:
   ```cmd
   cd frontend
   set VITE_WATCH_IGNORED=!node_modules! & npm run dev
   ```

4. **Environment Variables**: 
   On Windows Command Prompt, set environment variables like this:
   ```cmd
   set NODE_ENV=development
   ```

5. **Concurrent Processes**: 
   If the concurrent development server has issues:
   ```cmd
   # Run backend in one terminal
   cd backend
   npm run dev
   
   # Run frontend in another terminal
   cd frontend
   npm run dev
   ```

## Useful Windows Commands

### Process Management
```cmd
# Find processes using a port
netstat -ano | findstr :3000

# Kill a process by PID
taskkill /PID <PID_NUMBER> /F

# List all running Node processes
tasklist | findstr node
```

### File Operations
```cmd
# Copy file
copy source.txt destination.txt

# Copy file and rename
copy .env.example .env

# List directory contents
dir

# Change directory
cd directory_name

# Go up one directory
cd ..
```

## Additional Resources

1. **Node.js on Windows**: https://nodejs.org/en/download/
2. **MongoDB Community Server**: https://www.mongodb.com/try/download/community
3. **Git for Windows**: https://git-scm.com/download/win
4. **Visual Studio Code**: https://code.visualstudio.com/

Following these guidelines should help you successfully set up and run the Pizza Builder application on Windows without encountering common issues.