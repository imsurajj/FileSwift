// Custom build script to handle Windows temp file permission issues
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create temp directory if it doesn't exist
const tempDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log(`Created temp directory: ${tempDir}`);
}

// Set environment variables to bypass the problematic temp folder
process.env.TEMP = tempDir;
process.env.TMP = tempDir;
process.env.PRISMA_CLIENT_NO_SCHEMA_VALIDATION = 'true';
process.env.SKIP_DB_CONNECT = 'true';

console.log('Starting custom build with modified environment...');
console.log(`Using temp directory: ${tempDir}`);

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