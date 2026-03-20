import type { Express } from "express";
import { createServer, type Server } from "http";

const MEDSCAPE_API_BASE = "https://api.medscape.com/servicegateway/v2/auth/qnaservice";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "healthy" });
  });

  app.get("/api/poll/form/:questionnaireId/:formId", async (req, res) => {
    const { questionnaireId, formId } = req.params;
    const siteId = req.query.siteId || "2001";
    try {
      const url = `${MEDSCAPE_API_BASE}/questionnaire/${questionnaireId}/form/${formId}?aggregated=true&siteId=${siteId}`;
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "Cookie": req.headers.cookie || "",
        },
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response from poll form API:", response.status, text.slice(0, 200));
        return res.status(502).json({ error: "Unexpected response from poll service" });
      }
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Error fetching poll form:", error);
      res.status(502).json({ error: "Failed to fetch poll data" });
    }
  });

  app.post("/api/poll/results", async (req, res) => {
    try {
      const url = `${MEDSCAPE_API_BASE}/questionnaire/filter`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Cookie": req.headers.cookie || "",
        },
        body: JSON.stringify(req.body),
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response from poll results API:", response.status, text.slice(0, 200));
        return res.status(502).json({ error: "Unexpected response from poll service" });
      }
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Error fetching poll results:", error);
      res.status(502).json({ error: "Failed to fetch poll results" });
    }
  });

  app.post("/api/poll/submit", async (req, res) => {
    try {
      const url = `${MEDSCAPE_API_BASE}/save/userresponse?aggregated=true`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Cookie": req.headers.cookie || "",
        },
        body: JSON.stringify(req.body),
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response from poll submit API:", response.status, text.slice(0, 200));
        return res.status(502).json({ error: "Unexpected response from poll service" });
      }
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Error submitting poll response:", error);
      res.status(502).json({ error: "Failed to submit poll response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
