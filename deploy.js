#!/usr/bin/env node
// Production deployment script that ensures build files exist
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function deploy() {
  console.log('🚀 Starting deployment process...');
  
  // Check if we need to build
  const distPath = path.join(process.cwd(), 'dist');
  const publicPath = path.join(distPath, 'public');
  const indexPath = path.join(publicPath, 'index.html');
  const serverPath = path.join(distPath, 'index.js');
  
  const needsBuild = !fs.existsSync(indexPath) || !fs.existsSync(serverPath);
  
  if (needsBuild) {
    console.log('📦 Build files missing, running build process...');
    try {
      const { stdout, stderr } = await execAsync('npm run build');
      console.log('✅ Build completed successfully');
      if (stderr) console.log('Build warnings:', stderr);
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  } else {
    console.log('✅ Build files already exist');
  }
  
  // Verify build files
  if (!fs.existsSync(indexPath)) {
    console.error('❌ Frontend build failed - index.html not found');
    process.exit(1);
  }
  
  if (!fs.existsSync(serverPath)) {
    console.error('❌ Backend build failed - server index.js not found');
    process.exit(1);
  }
  
  console.log('✅ All build files verified');
  console.log('🌟 Starting production server...');
  
  // Start the production server
  process.env.NODE_ENV = 'production';
  await import('../dist/index.js');
}

deploy().catch((error) => {
  console.error('❌ Deployment failed:', error);
  process.exit(1);
});