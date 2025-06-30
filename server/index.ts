import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle routing for Medscape URL structure - simplified approach
const targetPath = '/debates/do-patients-benefit-from-routine-checks-for-cancer-metastases';

// Redirect root Replit URL to production Medscape URL
app.get('/', (req, res, next) => {
  const host = req.get('host');
  
  // If accessing from Replit domain, redirect to Medscape URL
  if (host && host.includes('replit.app')) {
    return res.redirect(301, `https://exp.medscape.com${targetPath}`);
  }
  
  // Otherwise continue normally
  next();
});

// Explicitly handle the target path
app.get(targetPath, (req, res, next) => {
  // Let this request continue to be handled by static serving or Vite
  next();
});

// Route filtering middleware
app.use((req, res, next) => {
  const isDevelopment = app.get("env") === "development";
  
  // In development, allow everything
  if (isDevelopment) {
    next();
    return;
  }
  
  // In production, log requests for debugging
  log(`Production request: ${req.method} ${req.path} from ${req.get('host')}`);
  
  // In production, only allow specific paths
  const allowedPaths = [
    targetPath,
    targetPath + '/',
    '/'
  ];
  
  // Allow static assets
  const isStaticAsset = req.path.startsWith('/assets/') || 
                       req.path.startsWith('/src/') || 
                       req.path.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map)$/);
  
  if (allowedPaths.includes(req.path) || isStaticAsset) {
    log(`Allowing request to: ${req.path}`);
    next();
  } else {
    log(`Blocking request to: ${req.path}`);
    res.status(404).send('Page not found');
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // Add a specific handler for the target path before serveStatic
    app.get(targetPath, (req, res) => {
      log(`Direct handler serving target path: ${req.path}`);
      const path = require('path');
      const fs = require('fs');
      
      // Log detailed environment info
      log(`Working directory: ${process.cwd()}`);
      log(`Module dirname: ${import.meta.dirname}`);
      log(`NODE_ENV: ${process.env.NODE_ENV}`);
      
      // Try multiple possible build paths
      const possiblePaths = [
        path.resolve(import.meta.dirname, "public"),
        path.resolve(process.cwd(), "dist", "public"),
        path.resolve(import.meta.dirname, "..", "dist", "public")
      ];
      
      let distPath = null;
      let indexPath = null;
      
      for (const testPath of possiblePaths) {
        const testIndex = path.resolve(testPath, "index.html");
        log(`Testing path: ${testPath}`);
        log(`Testing index: ${testIndex}`);
        log(`Path exists: ${fs.existsSync(testPath)}`);
        log(`Index exists: ${fs.existsSync(testIndex)}`);
        
        if (fs.existsSync(testIndex)) {
          distPath = testPath;
          indexPath = testIndex;
          log(`Found build files at: ${distPath}`);
          break;
        }
      }
      
      if (indexPath && fs.existsSync(indexPath)) {
        log(`Serving index.html from: ${indexPath}`);
        res.sendFile(indexPath);
      } else {
        log(`Index.html not found at: ${indexPath}`);
        log(`Build directory exists: ${fs.existsSync(distPath)}`);
        
        // Check all possible locations
        const altPaths = [
          path.resolve(process.cwd(), "dist", "public"),
          path.resolve(process.cwd(), "public"),
          path.resolve(import.meta.dirname, "..", "dist", "public")
        ];
        
        altPaths.forEach((altPath, i) => {
          log(`Alt path ${i + 1}: ${altPath} - exists: ${fs.existsSync(altPath)}`);
          if (fs.existsSync(altPath)) {
            const altIndex = path.join(altPath, "index.html");
            log(`Alt index ${i + 1}: ${altIndex} - exists: ${fs.existsSync(altIndex)}`);
          }
        });
        
        if (fs.existsSync(distPath)) {
          log(`Directory contents: ${fs.readdirSync(distPath).join(', ')}`);
        }
        
        // Check root directory contents
        log(`Root directory contents: ${fs.readdirSync(process.cwd()).join(', ')}`);
        
        res.status(503).send(`
          <!DOCTYPE html>
          <html>
          <head><title>Build Files Missing</title></head>
          <body>
            <h2>Deployment Debug Information</h2>
            <p>Working directory: ${process.cwd()}</p>
            <p>Looking for: ${indexPath}</p>
            <p>Build directory exists: ${fs.existsSync(distPath)}</p>
            <p>Check deployment logs for detailed path information.</p>
          </body>
          </html>
        `);
      }
    });
    
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
