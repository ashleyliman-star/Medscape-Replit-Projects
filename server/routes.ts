import type { Express, Request } from "express";
import { createServer, type Server } from "http";

const MEDSCAPE_API_BASE = "https://api.medscape.com/servicegateway/v2/auth/qnaservice";

function getForwardHeaders(req: Request) {
  const headers: Record<string, string> = {
    "Accept": "application/json",
  };
  if (req.headers.cookie) {
    headers["Cookie"] = req.headers.cookie;
  }
  if (req.headers["user-agent"]) {
    headers["User-Agent"] = req.headers["user-agent"];
  }
  if (req.headers["accept-language"]) {
    headers["Accept-Language"] = req.headers["accept-language"];
  }
  if (req.headers["referer"]) {
    headers["Referer"] = req.headers["referer"];
  }
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (clientIp) {
    headers["X-Forwarded-For"] = Array.isArray(clientIp) ? clientIp[0] : clientIp;
  }
  return headers;
}

async function proxyToMedscape(
  url: string,
  options: RequestInit,
  res: any,
  label: string
) {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await response.text();
    console.error(`Non-JSON response from ${label}: ${response.status}`, text.slice(0, 200));
    return res.status(response.status >= 400 ? response.status : 502).json({
      error: "Poll service temporarily unavailable",
      status: response.status,
    });
  }
  const data = await response.json();
  res.status(response.status).json(data);
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "healthy" });
  });

  app.get("/api/poll/form/:questionnaireId/:formId", async (req, res) => {
    const { questionnaireId, formId } = req.params;
    const siteId = req.query.siteId || "2001";
    try {
      const url = `${MEDSCAPE_API_BASE}/questionnaire/${questionnaireId}/form/${formId}?aggregated=true&siteId=${siteId}`;
      await proxyToMedscape(url, {
        method: "GET",
        headers: { ...getForwardHeaders(req) },
      }, res, "poll form API");
    } catch (error) {
      console.error("Error fetching poll form:", error);
      res.status(502).json({ error: "Failed to fetch poll data" });
    }
  });

  app.post("/api/poll/results", async (req, res) => {
    try {
      const url = `${MEDSCAPE_API_BASE}/questionnaire/filter`;
      await proxyToMedscape(url, {
        method: "POST",
        headers: { ...getForwardHeaders(req), "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }, res, "poll results API");
    } catch (error) {
      console.error("Error fetching poll results:", error);
      res.status(502).json({ error: "Failed to fetch poll results" });
    }
  });

  app.post("/api/poll/submit", async (req, res) => {
    try {
      const url = `${MEDSCAPE_API_BASE}/save/userresponse?aggregated=true`;
      await proxyToMedscape(url, {
        method: "POST",
        headers: { ...getForwardHeaders(req), "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }, res, "poll submit API");
    } catch (error) {
      console.error("Error submitting poll response:", error);
      res.status(502).json({ error: "Failed to submit poll response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
