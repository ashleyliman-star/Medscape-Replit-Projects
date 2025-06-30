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
      const distPath = path.resolve(import.meta.dirname, "public");
      const indexPath = path.resolve(distPath, "index.html");
      
      if (fs.existsSync(indexPath)) {
        log(`Serving index.html from: ${indexPath}`);
        res.sendFile(indexPath);
      } else {
        log(`Index.html not found at: ${indexPath}`);
        log(`Build directory exists: ${fs.existsSync(distPath)}`);
        if (fs.existsSync(distPath)) {
          log(`Directory contents: ${fs.readdirSync(distPath).join(', ')}`);
        }
        
        // Emergency fallback - serve a functional debate page
        log(`Serving emergency fallback page`);
        res.status(200).send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Medical Debate: Cancer Surveillance - Medscape</title>
            <meta name="robots" content="noindex, nofollow">
            <meta property="og:title" content="Medical Debate: Cancer Surveillance in Asymptomatic Patients">
            <meta property="og:description" content="Expert perspectives on routine surveillance for cancer metastases. Educational content for healthcare professionals.">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; max-width: 800px; margin: 0 auto; }
              .header { border-bottom: 3px solid #0066cc; padding-bottom: 20px; margin-bottom: 30px; }
              .question { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .side { margin: 20px 0; padding: 20px; border-left: 4px solid #0066cc; }
              .poll { background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 30px 0; }
              button { background: #0066cc; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
              .note { font-style: italic; color: #666; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Medical Debate: Is routine surveillance for cancer metastases a good idea in asymptomatic patients?</h1>
              <p><strong>Educational content for healthcare professionals</strong></p>
            </div>
            
            <div class="question">
              <h2>The Question</h2>
              <p>Routine surveillance for cancer metastases in asymptomatic patients remains a topic of significant debate. This discussion examines the evidence for and against systematic monitoring approaches.</p>
            </div>
            
            <div class="side">
              <h3>YES - Routine surveillance is worth it</h3>
              <p><strong>Early detection enables intervention:</strong> Regular monitoring can identify metastases at stages when treatment options may be more effective.</p>
              <p><strong>Patient peace of mind:</strong> Systematic surveillance provides psychological reassurance for patients and families.</p>
              <p><strong>Treatment planning:</strong> Regular monitoring allows for better coordination of care and treatment planning.</p>
            </div>
            
            <div class="side" style="border-left-color: #cc6600;">
              <h3>NO - Selective surveillance is more appropriate</h3>
              <p><strong>Limited survival benefit:</strong> Studies show minimal impact on overall survival from routine surveillance in asymptomatic patients.</p>
              <p><strong>Resource allocation:</strong> Healthcare resources may be better allocated to higher-yield interventions.</p>
              <p><strong>Quality of life considerations:</strong> Frequent testing can increase anxiety and impact patient quality of life.</p>
            </div>
            
            <div class="poll">
              <h3>What's your perspective?</h3>
              <p>This is a simplified fallback version. The full interactive debate is temporarily unavailable.</p>
              <button onclick="alert('Thank you for your interest. The full interactive version will be available shortly.')">Vote: Yes - Routine surveillance</button>
              <button onclick="alert('Thank you for your interest. The full interactive version will be available shortly.')" style="background: #cc6600; margin-left: 10px;">Vote: No - Selective surveillance</button>
            </div>
            
            <div class="note">
              <p><strong>Note:</strong> This debate is for educational purposes and should not replace clinical judgment. The full interactive version includes detailed expert arguments, polling results, and additional resources.</p>
            </div>
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
