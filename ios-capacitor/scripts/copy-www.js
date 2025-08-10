
// Minimal build script: ensure www assets are present (already in place for this repo)
const fs = require('fs');
if (!fs.existsSync('www/index.html')) {
  console.error('www/index.html not found. Put your web assets in ios-capacitor/www');
  process.exit(1);
}
console.log('www assets are ready.');
