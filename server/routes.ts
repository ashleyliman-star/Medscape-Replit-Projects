import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPollResponseSchema, insertCommentSchema } from "@shared/schema";
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

  // Comments API routes
  
  // Create a new comment
  app.post("/api/comments", async (req, res) => {
    try {
      const validatedData = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(validatedData);
      res.json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get comments for a debate
  app.get("/api/comments/:debateId", async (req, res) => {
    try {
      const { debateId } = req.params;
      const comments = await storage.getCommentsByDebateId(debateId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Like a comment
  app.post("/api/comments/:commentId/like", async (req, res) => {
    try {
      const commentId = parseInt(req.params.commentId);
      if (isNaN(commentId)) {
        res.status(400).json({ message: "Invalid comment ID" });
        return;
      }
      const comment = await storage.likeComment(commentId);
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get replies for a comment
  app.get("/api/comments/:commentId/replies", async (req, res) => {
    try {
      const commentId = parseInt(req.params.commentId);
      if (isNaN(commentId)) {
        res.status(400).json({ message: "Invalid comment ID" });
        return;
      }
      const replies = await storage.getCommentReplies(commentId);
      res.json(replies);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
