import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const birthdayWishes = pgTable("birthday_wishes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderName: text("sender_name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const generatedSayaris = pgTable("generated_sayaris", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  mood: text("mood").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBirthdayWishSchema = createInsertSchema(birthdayWishes).omit({
  id: true,
  createdAt: true,
});

export const insertSayariSchema = createInsertSchema(generatedSayaris).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type BirthdayWish = typeof birthdayWishes.$inferSelect;
export type InsertBirthdayWish = z.infer<typeof insertBirthdayWishSchema>;
export type GeneratedSayari = typeof generatedSayaris.$inferSelect;
export type InsertSayari = z.infer<typeof insertSayariSchema>;
