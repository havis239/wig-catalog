const fs = require('fs');
const path = require('path');

const images = [
  { src: 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\f6d0b95e-01e8-442e-bcbf-b477252af354\\hero_wig_model_1776320747990.png', dest: 'frontend/public/images/hero_wig.png' },
  { src: 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\f6d0b95e-01e8-442e-bcbf-b477252af354\\wig_salon_studio_1776320782350.png', dest: 'frontend/public/images/studio.png' },
  { src: 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\f6d0b95e-01e8-442e-bcbf-b477252af354\\short_bob_wig_1776320877948.png', dest: 'backend/uploads/short_bob.png' },
  { src: 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\f6d0b95e-01e8-442e-bcbf-b477252af354\\curly_long_wig_1776320897902.png', dest: 'backend/uploads/curly_long.png' }
];

// Ensure directories exist
const dirs = ['frontend/public/images', 'backend/uploads'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

images.forEach(img => {
  try {
    if (fs.existsSync(img.src)) {
      fs.copyFileSync(img.src, img.dest);
      console.log(`Copied ${img.src} to ${img.dest}`);
    } else {
      console.error(`Source file not found: ${img.src}`);
    }
  } catch (err) {
    console.error(`Error copying ${img.src}:`, err);
  }
});
