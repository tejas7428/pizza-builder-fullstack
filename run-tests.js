const { exec } = require('child_process');
const path = require('path');

console.log('Running Pizza Builder Tests...');

// Run backend tests
console.log('Running backend tests...');
exec('cd backend && npm test', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running backend tests: ${error}`);
    return;
  }
  console.log('Backend tests completed!');
  console.log(stdout);
  
  // In a real project, you might also run frontend tests here
  // For now, we'll just note that frontend tests could be added
  console.log('Note: Frontend tests can be added in the frontend directory');
});