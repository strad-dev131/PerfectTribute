import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBirthdayWishSchema, insertSayariSchema } from "@shared/schema";
import { generateSayari } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all birthday wishes
  app.get("/api/wishes", async (req, res) => {
    try {
      const wishes = await storage.getBirthdayWishes();
      res.json(wishes);
    } catch (error) {
      console.error("Error fetching wishes:", error);
      res.status(500).json({ message: "Failed to fetch birthday wishes" });
    }
  });

  // Create a new birthday wish
  app.post("/api/wishes", async (req, res) => {
    try {
      const validatedData = insertBirthdayWishSchema.parse(req.body);
      const wish = await storage.createBirthdayWish(validatedData);
      res.json(wish);
    } catch (error) {
      console.error("Error creating wish:", error);
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({ message: "Invalid wish data provided" });
      } else {
        res.status(500).json({ message: "Failed to create birthday wish" });
      }
    }
  });

  // Generate a new sayari
  app.post("/api/sayaris/generate", async (req, res) => {
    try {
      const { mood } = req.body;
      
      if (!mood || !["happy", "flirty", "funny", "motivational"].includes(mood)) {
        return res.status(400).json({ message: "Invalid mood. Must be one of: happy, flirty, funny, motivational" });
      }

      const sayariResponse = await generateSayari({ mood });
      
      // Store the generated sayari
      const savedSayari = await storage.createGeneratedSayari({
        mood: sayariResponse.mood,
        content: sayariResponse.sayari,
      });

      res.json(sayariResponse);
    } catch (error) {
      console.error("Error generating sayari:", error);
      res.status(500).json({ message: "Failed to generate sayari" });
    }
  });

  // Get all generated sayaris
  app.get("/api/sayaris", async (req, res) => {
    try {
      const sayaris = await storage.getGeneratedSayaris();
      res.json(sayaris);
    } catch (error) {
      console.error("Error fetching sayaris:", error);
      res.status(500).json({ message: "Failed to fetch sayaris" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
