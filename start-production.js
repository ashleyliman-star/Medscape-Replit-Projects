#!/usr/bin/env node
// Production startup script that ensures everything is ready
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Starting production server...');
console.log('Working directory:', process.cwd());
console.log('Script directory:', __dirname);

// Check build files
const distPath = path.join(process.cwd(), 'dist');
const publicPath = path.join(distPath, 'public');
const indexPath = path.join(publicPath, 'index.html');
const serverPath = path.join(distPath, 'index.js');

console.log('Checking build files...');
console.log('Dist exists:', fs.existsSync(distPath));
console.log('Public exists:', fs.existsSync(publicPath));
console.log('Index.html exists:', fs.existsSync(indexPath));
console.log('Server exists:', fs.existsSync(serverPath));

if (fs.existsSync(distPath)) {
  console.log('Dist contents:', fs.readdirSync(distPath));
}

if (!fs.existsSync(serverPath)) {
  console.error('Server build file missing. Cannot start production server.');
  console.error('Expected file:', serverPath);
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error('Frontend build files missing. Cannot start production server.');
  console.error('Expected file:', indexPath);
  process.exit(1);
}

console.log('All build files verified. Starting server...');

// Set production environment
process.env.NODE_ENV = 'production';

// Import and start the server
try {
  await import('./dist/index.js');
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}