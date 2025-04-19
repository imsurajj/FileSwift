// Custom build script to handle build process safely
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create temp directory if it doesn't exist but don't use it for TEMP env vars
const tempDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log(`Created temp directory: ${tempDir}`);
}

// Set environment variables to avoid database connection issues
process.env.PRISMA_CLIENT_NO_SCHEMA_VALIDATION = 'true';
process.env.SKIP_DB_CONNECT = 'true';

console.log('Starting custom build...');

try {
  // Execute the actual Next.js build command with options to skip problematic parts
  execSync('next build --no-lint', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1', // Disable telemetry to reduce file accesses
    }
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  
  // Exit with error code 1 if the build fails
  process.exit(1);
} 