#!/usr/bin/env node
// Ensure build files exist before starting the server
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function ensureBuild() {
  const distPath = path.join(process.cwd(), 'dist');
  const publicPath = path.join(distPath, 'public');
  const indexPath = path.join(publicPath, 'index.html');
  
  console.log('Checking build files...');
  
  if (!fs.existsSync(indexPath)) {
    console.log('Build files missing. Running build process...');
    try {
      await execAsync('npm run build');
      console.log('Build completed successfully.');
    } catch (error) {
      console.error('Build failed:', error.message);
      process.exit(1);
    }
  } else {
    console.log('Build files found.');
  }
  
  // Start the server
  console.log('Starting production server...');
  await execAsync('NODE_ENV=production node dist/index.js');
}

ensureBuild().catch(console.error);