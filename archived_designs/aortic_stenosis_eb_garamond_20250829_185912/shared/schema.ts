import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const pollResponses = pgTable("poll_responses", {
  id: serial("id").primaryKey(),
  debateId: text("debate_id").notNull(),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  debateId: text("debate_id").notNull(),
  authorName: text("author_name").notNull(),
  content: text("content").notNull(),
  likes: integer("likes").default(0).notNull(),
  parentId: integer("parent_id"), // null for top-level comments, references comment id for replies
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const commentsRelations = relations(comments, ({ one, many }) => ({
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
  }),
  replies: many(comments),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPollResponseSchema = createInsertSchema(pollResponses).pick({
  debateId: true,
  response: true,
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  debateId: true,
  authorName: true,
  content: true,
  parentId: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPollResponse = z.infer<typeof insertPollResponseSchema>;
export type PollResponse = typeof pollResponses.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;
