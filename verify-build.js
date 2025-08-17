
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build...');

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist', 'public');
if (!fs.existsSync(distPath)) {
  console.error('❌ dist/public directory not found');
  process.exit(1);
}

// Check for essential files
const requiredFiles = ['index.html', 'assets'];
for (const file of requiredFiles) {
  const filePath = path.join(distPath, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${file} not found in dist/public`);
    process.exit(1);
  }
}

// Check HTML file for basic content
const htmlPath = path.join(distPath, 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

if (!htmlContent.includes('Vivaan') || !htmlContent.includes('birthday')) {
  console.error('❌ HTML content verification failed');
  process.exit(1);
}

console.log('✅ Build verification passed!');
console.log('🚀 Ready for deployment!');
