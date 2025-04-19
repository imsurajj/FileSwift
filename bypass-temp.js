/**
 * This script helps with building on Windows systems by cleaning temp files
 * Run this before attempting to build if you're having permission issues
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Attempting to clean temporary files...');

// Try to clean Windows temp folders
try {
  // Get the Windows temp directory
  const winTempDir = process.env.TEMP || process.env.TMP || 'C:/Users/TEMP';
  console.log(`Windows temp directory: ${winTempDir}`);
  
  // Look for MEI temporary directories
  const meiPattern = path.join(winTempDir, '_MEI*');
  console.log(`Looking for patterns like: ${meiPattern}`);
  
  // Try using PowerShell to clean those directories
  console.log('Attempting to clean with PowerShell...');
  execSync(`powershell -Command "Get-ChildItem -Path '${winTempDir}' -Filter '_MEI*' -Directory | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue"`, { stdio: 'inherit' });
  
  console.log('Temporary files cleaning completed.');
  console.log('You can now try running "yarn build" again.');
} catch (error) {
  console.error('Failed to clean temporary files:', error.message);
  console.log('You may need to manually delete the _MEI* folders in your Windows temp directory.');
  console.log('For Vercel deployment, this error can be ignored as it only affects local builds.');
} 