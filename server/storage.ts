import { users, pollResponses, comments, type User, type InsertUser, type InsertPollResponse, type PollResponse, type Comment, type InsertComment } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPollResponse(response: InsertPollResponse): Promise<PollResponse>;
  getPollResponsesByDebateId(debateId: string): Promise<PollResponse[]>;
  getPollStats(debateId: string): Promise<Record<string, number>>;
  createComment(comment: InsertComment): Promise<Comment>;
  getCommentsByDebateId(debateId: string): Promise<Comment[]>;
  likeComment(commentId: number): Promise<Comment>;
  getCommentReplies(commentId: number): Promise<Comment[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createPollResponse(insertResponse: InsertPollResponse): Promise<PollResponse> {
    const [response] = await db
      .insert(pollResponses)
      .values(insertResponse)
      .returning();
    return response;
  }

  async getPollResponsesByDebateId(debateId: string): Promise<PollResponse[]> {
    return await db
      .select()
      .from(pollResponses)
      .where(eq(pollResponses.debateId, debateId));
  }

  async getPollStats(debateId: string): Promise<Record<string, number>> {
    const responses = await this.getPollResponsesByDebateId(debateId);
    const stats: Record<string, number> = {};
    
    for (const response of responses) {
      stats[response.response] = (stats[response.response] || 0) + 1;
    }
    
    return stats;
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const [comment] = await db
      .insert(comments)
      .values(insertComment)
      .returning();
    return comment;
  }

  async getCommentsByDebateId(debateId: string): Promise<Comment[]> {
    return await db
      .select()
      .from(comments)
      .where(eq(comments.debateId, debateId))
      .orderBy(comments.createdAt);
  }

  async likeComment(commentId: number): Promise<Comment> {
    const [comment] = await db
      .update(comments)
      .set({ likes: sql`${comments.likes} + 1` })
      .where(eq(comments.id, commentId))
      .returning();
    return comment;
  }

  async getCommentReplies(commentId: number): Promise<Comment[]> {
    return await db
      .select()
      .from(comments)
      .where(eq(comments.parentId, commentId))
      .orderBy(comments.createdAt);
  }
}

export const storage = new DatabaseStorage();