import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPollResponseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit poll response
  app.post("/api/poll", async (req, res) => {
    try {
      const validatedData = insertPollResponseSchema.parse(req.body);
      const response = await storage.createPollResponse(validatedData);
      res.json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get poll statistics
  app.get("/api/poll/:debateId/stats", async (req, res) => {
    try {
      const { debateId } = req.params;
      const stats = await storage.getPollStats(debateId);
      
      // Calculate total and percentages
      const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
      const percentages: Record<string, number> = {};
      
      for (const [option, count] of Object.entries(stats)) {
        percentages[option] = total > 0 ? Math.round((count / total) * 100) : 0;
      }
      
      res.json({ 
        counts: stats, 
        percentages, 
        total,
        responses: await storage.getPollResponsesByDebateId(debateId)
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
