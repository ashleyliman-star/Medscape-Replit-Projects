import { users, pollResponses, type User, type InsertUser, type InsertPollResponse, type PollResponse } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPollResponse(response: InsertPollResponse): Promise<PollResponse>;
  getPollResponsesByDebateId(debateId: string): Promise<PollResponse[]>;
  getPollStats(debateId: string): Promise<Record<string, number>>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private pollResponses: Map<number, PollResponse>;
  private currentUserId: number;
  private currentPollId: number;

  constructor() {
    this.users = new Map();
    this.pollResponses = new Map();
    this.currentUserId = 1;
    this.currentPollId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPollResponse(insertResponse: InsertPollResponse): Promise<PollResponse> {
    const id = this.currentPollId++;
    const response: PollResponse = { ...insertResponse, id };
    this.pollResponses.set(id, response);
    return response;
  }

  async getPollResponsesByDebateId(debateId: string): Promise<PollResponse[]> {
    return Array.from(this.pollResponses.values()).filter(
      (response) => response.debateId === debateId,
    );
  }

  async getPollStats(debateId: string): Promise<Record<string, number>> {
    const responses = await this.getPollResponsesByDebateId(debateId);
    const stats: Record<string, number> = {
      'yes': 0,
      'no': 0,
    };

    responses.forEach((response) => {
      if (stats[response.response] !== undefined) {
        stats[response.response]++;
      }
    });

    return stats;
  }
}

export const storage = new MemStorage();
