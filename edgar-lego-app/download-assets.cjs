const fs = require('fs');
const path = require('path');
const http = require('http');

// Key assets to download from Figma
const assets = {
  'box-image.png': 'http://localhost:3845/assets/e937d40ba2209d3d38dc91c053c5c7504a6910d7.png',
  'vector-119.svg': 'http://localhost:3845/assets/d7972f3f4224e6b8b0de83c405f57bb8b0253645.svg',
  'vector-120.svg': 'http://localhost:3845/assets/65b9159966776da2ea7ce377356462d1d8530b92.svg',
  'vector-123.svg': 'http://localhost:3845/assets/423cb9c2ca48938ca87fe0074d1313a428b6e39b.svg',
  'vector-121.svg': 'http://localhost:3845/assets/07d17e38d4e8013339741b697ee9e734e067034a.svg',
};

const assetsDir = path.join(__dirname, 'src', 'assets', 'images');

// Create assets directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Download function
function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(assetsDir, filename);
    const file = fs.createWriteStream(filePath);

    http.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      console.error(`✗ Failed to download ${filename}:`, err.message);
      reject(err);
    });
  });
}

// Download all assets
async function downloadAllAssets() {
  console.log('Downloading Figma assets...\n');

  for (const [filename, url] of Object.entries(assets)) {
    try {
      await downloadFile(url, filename);
    } catch (error) {
      // Continue with other downloads even if one fails
    }
  }

  console.log('\nAsset download complete!');
  console.log(`Assets saved to: ${assetsDir}`);
}

downloadAllAssets();
