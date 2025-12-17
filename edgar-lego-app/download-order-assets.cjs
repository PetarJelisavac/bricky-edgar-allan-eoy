const https = require('https');
const fs = require('fs');
const path = require('path');

const assets = [
  {
    url: 'http://localhost:3845/assets/e937d40ba2209d3d38dc91c053c5c7504a6910d7.png',
    filename: 'box-1-image.png'
  },
  {
    url: 'http://localhost:3845/assets/3e412dcaa35a620eed08b1c19c39a01146824fc6.png',
    filename: 'image-16.png'
  }
];

const outputDir = path.join(__dirname, 'src', 'assets', 'images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadAsset(asset) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(outputDir, asset.filename);
    const file = fs.createWriteStream(outputPath);

    const request = https.get(asset.url.replace('https:', 'http:'), (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded ${asset.filename}`);
        resolve();
      });
    });

    request.on('error', (err) => {
      fs.unlink(outputPath, () => {});
      console.error(`✗ Failed to download ${asset.filename}:`, err.message);
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('Starting asset downloads...\n');

  for (const asset of assets) {
    try {
      await downloadAsset(asset);
    } catch (error) {
      console.error(`Error downloading ${asset.filename}`);
    }
  }

  console.log('\nDownload complete!');
}

downloadAll();
