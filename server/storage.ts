import { type User, type InsertUser, type BirthdayWish, type InsertBirthdayWish, type GeneratedSayari, type InsertSayari } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getBirthdayWishes(): Promise<BirthdayWish[]>;
  createBirthdayWish(wish: InsertBirthdayWish): Promise<BirthdayWish>;
  
  getGeneratedSayaris(): Promise<GeneratedSayari[]>;
  createGeneratedSayari(sayari: InsertSayari): Promise<GeneratedSayari>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private birthdayWishes: Map<string, BirthdayWish>;
  private generatedSayaris: Map<string, GeneratedSayari>;

  constructor() {
    this.users = new Map();
    this.birthdayWishes = new Map();
    this.generatedSayaris = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBirthdayWishes(): Promise<BirthdayWish[]> {
    return Array.from(this.birthdayWishes.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createBirthdayWish(insertWish: InsertBirthdayWish): Promise<BirthdayWish> {
    const id = randomUUID();
    const wish: BirthdayWish = {
      ...insertWish,
      id,
      createdAt: new Date(),
    };
    this.birthdayWishes.set(id, wish);
    return wish;
  }

  async getGeneratedSayaris(): Promise<GeneratedSayari[]> {
    return Array.from(this.generatedSayaris.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createGeneratedSayari(insertSayari: InsertSayari): Promise<GeneratedSayari> {
    const id = randomUUID();
    const sayari: GeneratedSayari = {
      ...insertSayari,
      id,
      createdAt: new Date(),
    };
    this.generatedSayaris.set(id, sayari);
    return sayari;
  }
}

export const storage = new MemStorage();
