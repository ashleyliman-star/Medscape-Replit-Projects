import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve attached assets
app.use('/attached_assets', express.static('attached_assets'));

// Serve robots.txt file only for the specific debate page path
app.get('/debates/does-asymptomatic-aortic-stenosis-warrant-early-intervention/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

// Handle routing for specific debate page only
app.use((req, res, next) => {
  const targetPath = '/debates/does-asymptomatic-aortic-stenosis-warrant-early-intervention';
  const host = req.get('host') || '';
  
  // Block root access on exp.medscape.com domain
  if (host.includes('exp.medscape.com') && req.path === '/') {
    return res.status(404).send('Page not found');
  }
  
  // If accessing the specific debate path or admin path, serve the app
  if (req.path === targetPath || req.path === targetPath + '/' || req.path === targetPath + '/icd-admin' || req.path === targetPath + '/icd-admin/') {
    req.url = '/'; // Rewrite to root for the app
    next();
  }
  // Allow access to necessary assets, API routes, and health check
  else if (req.path.startsWith('/src/') || req.path.startsWith('/@') || req.path.startsWith('/node_modules/') || req.path.includes('.') || req.path.startsWith('/api/') || req.path.startsWith('/attached_assets/') || req.path === '/health') {
    next();
  }
  // For development, allow root access
  else if (req.path === '/' && app.get('env') === 'development') {
    next();
  }
  // Block all other paths - let them be handled by other services on exp.medscape.com
  else {
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

  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
