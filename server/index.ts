import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { ROOT_CONTEXT, BASE_PATH } from "@shared/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve attached assets under the root context
app.use(`${BASE_PATH}/attached_assets`, express.static('attached_assets'));

// Serve robots.txt file only for the specific debate page path
app.get(`${BASE_PATH}/debates/does-asymptomatic-aortic-stenosis-warrant-early-intervention/robots.txt`, (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

// Handle routing with root context
app.use((req, res, next) => {
  const debatePath = `${BASE_PATH}/debates/does-asymptomatic-aortic-stenosis-warrant-early-intervention`;
  const host = req.get('host') || '';
  
  // Health check and API routes stay outside the context
  if (req.path === '/health' || req.path.startsWith('/api/')) {
    return next();
  }
  
  // Block root access on exp.medscape.com domain
  if (host.includes('exp.medscape.com') && req.path === '/') {
    return res.status(404).send('Page not found');
  }
  
  // If accessing the specific debate path under context, serve the app
  if (req.path === debatePath || req.path === debatePath + '/') {
    req.url = `${BASE_PATH}/`;
    next();
  }
  // If accessing the context root, serve the app
  else if (req.path === BASE_PATH || req.path === `${BASE_PATH}/`) {
    next();
  }
  // Allow access to assets under the context path (Vite dev assets, built assets)
  else if (req.path.startsWith(`${BASE_PATH}/`)) {
    next();
  }
  // For development, allow root access and redirect to context
  else if (req.path === '/' && app.get('env') === 'development') {
    return res.redirect(`${BASE_PATH}/`);
  }
  // Block all other paths
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
    log(`root context: ${BASE_PATH}`);
  });
})();
