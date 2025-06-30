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
    next();
  } else {
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
