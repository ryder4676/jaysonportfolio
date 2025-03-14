import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  isAdmin: true,
});

// Project request table schema
export const projectRequests = pgTable("project_requests", {
  id: serial("id").primaryKey(),
  projectType: text("project_type").notNull(),
  features: text("features").array().notNull(),
  projectDescription: text("project_description"),
  targetAudience: text("target_audience"),
  competitors: text("competitors"),
  timeline: text("timeline"),
  budgetRange: text("budget_range"),
  priorities: json("priorities").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  viewed: boolean("viewed").default(false).notNull(),
});

export const insertProjectRequestSchema = createInsertSchema(projectRequests).omit({
  id: true,
  createdAt: true,
  viewed: true,
});

// Website analysis schema
export const websiteAnalyses = pgTable("website_analyses", {
  id: serial("id").primaryKey(),
  websiteUrl: text("website_url").notNull(),
  painPoints: text("pain_points"),
  improvementAreas: text("improvement_areas").array(),
  budget: text("budget"),
  email: text("email").notNull(),
  aiAnalysis: json("ai_analysis"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  viewed: boolean("viewed").default(false).notNull(),
});

export const insertWebsiteAnalysisSchema = createInsertSchema(websiteAnalyses).omit({
  id: true,
  aiAnalysis: true,
  createdAt: true,
  viewed: true,
});

// AI Message schema (for storing AI chat history)
export const aiMessages = pgTable("ai_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(), // user or assistant
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertAiMessageSchema = createInsertSchema(aiMessages).omit({
  id: true,
  timestamp: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ProjectRequest = typeof projectRequests.$inferSelect;
export type InsertProjectRequest = z.infer<typeof insertProjectRequestSchema>;

export type WebsiteAnalysis = typeof websiteAnalyses.$inferSelect;
export type InsertWebsiteAnalysis = z.infer<typeof insertWebsiteAnalysisSchema>;

export type AiMessage = typeof aiMessages.$inferSelect;
export type InsertAiMessage = z.infer<typeof insertAiMessageSchema>;
