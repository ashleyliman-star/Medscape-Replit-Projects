// Build verification script for deployment troubleshooting
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('=== Build Check Report ===');
console.log('Node version:', process.version);
console.log('Working directory:', process.cwd());
console.log('Script location:', __dirname);

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
console.log('Package.json exists:', fs.existsSync(packageJsonPath));

// Check build directory
const distPath = path.join(process.cwd(), 'dist');
const publicPath = path.join(distPath, 'public');
const indexPath = path.join(publicPath, 'index.html');

console.log('Dist directory exists:', fs.existsSync(distPath));
console.log('Public directory exists:', fs.existsSync(publicPath));
console.log('Index.html exists:', fs.existsSync(indexPath));

if (fs.existsSync(distPath)) {
  console.log('Dist contents:', fs.readdirSync(distPath));
}

if (fs.existsSync(publicPath)) {
  console.log('Public contents:', fs.readdirSync(publicPath));
}

// Check if build files are in wrong location
const clientDistPath = path.join(process.cwd(), 'client', 'dist');
console.log('Client/dist exists:', fs.existsSync(clientDistPath));

console.log('=== End Report ===');