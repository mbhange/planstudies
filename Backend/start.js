const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting PlanStudies Backend...');

// First, set up the database
console.log('📋 Step 1: Setting up database...');
const setupProcess = spawn('node', ['setup.js'], { 
  cwd: __dirname, 
  stdio: 'inherit' 
});

setupProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Database setup completed successfully!');
    console.log('🚀 Step 2: Starting server...');
    
    // Start the server
    const serverProcess = spawn('node', ['server.js'], { 
      cwd: __dirname, 
      stdio: 'inherit' 
    });

    serverProcess.on('close', (code) => {
      console.log(`Server process exited with code ${code}`);
    });
  } else {
    console.error('❌ Database setup failed. Please check your MySQL connection.');
    process.exit(1);
  }
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...');
  process.exit(0);
});
