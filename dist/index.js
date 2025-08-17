// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  birthdayWishes;
  generatedSayaris;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.birthdayWishes = /* @__PURE__ */ new Map();
    this.generatedSayaris = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getBirthdayWishes() {
    return Array.from(this.birthdayWishes.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async createBirthdayWish(insertWish) {
    const id = randomUUID();
    const wish = {
      ...insertWish,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.birthdayWishes.set(id, wish);
    return wish;
  }
  async getGeneratedSayaris() {
    return Array.from(this.generatedSayaris.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async createGeneratedSayari(insertSayari) {
    const id = randomUUID();
    const sayari = {
      ...insertSayari,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.generatedSayaris.set(id, sayari);
    return sayari;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var birthdayWishes = pgTable("birthday_wishes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderName: text("sender_name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var generatedSayaris = pgTable("generated_sayaris", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  mood: text("mood").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertBirthdayWishSchema = createInsertSchema(birthdayWishes).omit({
  id: true,
  createdAt: true
});
var insertSayariSchema = createInsertSchema(generatedSayaris).omit({
  id: true,
  createdAt: true
});

// server/services/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "default_key"
});
async function generateSayari(request) {
  const moodPrompts = {
    happy: "Generate a happy and joyful Hinglish sayari (2-4 lines) for Vivaan's birthday. Use a mix of Hindi and English words naturally. Make it celebratory and warm.",
    flirty: "Generate a playful and charming Hinglish sayari (2-4 lines) about Vivaan's charismatic personality. Use a mix of Hindi and English words naturally. Keep it fun and light-hearted.",
    funny: "Generate a humorous and entertaining Hinglish sayari (2-4 lines) about Vivaan's fun-loving nature. Use a mix of Hindi and English words naturally. Make it witty and amusing.",
    motivational: "Generate an inspiring and motivational Hinglish sayari (2-4 lines) about Vivaan's leadership qualities. Use a mix of Hindi and English words naturally. Make it uplifting and encouraging."
  };
  const systemPrompt = `You are a creative Hinglish poetry generator specializing in sayaris (short poems) for birthday celebrations. 
  
  Key guidelines:
  - Mix Hindi and English words naturally in the same sentence
  - Keep sayaris short (2-4 lines maximum)
  - Make them personal and heartfelt for someone named Vivaan
  - Use common Hinglish expressions and words
  - Include birthday-themed elements
  - Ensure proper rhythm and flow
  - Reference Vivaan's groups: "The Global Hub", "The Gossip Edge", "TeamX"
  - Highlight his qualities: leadership, sayari skills, group management, charm
  
  Respond with JSON in this exact format: { "sayari": "your generated sayari here", "mood": "${request.mood}" }`;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: moodPrompts[request.mood]
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 200,
      temperature: 0.8
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      sayari: result.sayari || "Vivaan bhai, aap toh sabse pyaare ho! Happy Birthday! \u{1F389}",
      mood: request.mood
    };
  } catch (error) {
    console.error("Failed to generate sayari:", error);
    const fallbackSayaris = {
      happy: "Khushi se bhari hai teri har subah,\nHappy Birthday Vivaan Bhai! \u{1F389}",
      flirty: "Tere style mein hai kaisi baat,\nDil churane wala jaadoo! \u{1F609}",
      funny: "Group mein aata hai toh comedy central ban jaata hai,\nHappy Birthday funny wale! \u{1F602}",
      motivational: "Leader banne ka talent, Vivaan bhai mein hai natural,\nHappy Birthday champion! \u{1F4AA}"
    };
    return {
      sayari: fallbackSayaris[request.mood],
      mood: request.mood
    };
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/wishes", async (req, res) => {
    try {
      const wishes = await storage.getBirthdayWishes();
      res.json(wishes);
    } catch (error) {
      console.error("Error fetching wishes:", error);
      res.status(500).json({ message: "Failed to fetch birthday wishes" });
    }
  });
  app2.post("/api/wishes", async (req, res) => {
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
  app2.post("/api/sayaris/generate", async (req, res) => {
    try {
      const { mood } = req.body;
      if (!mood || !["happy", "flirty", "funny", "motivational"].includes(mood)) {
        return res.status(400).json({ message: "Invalid mood. Must be one of: happy, flirty, funny, motivational" });
      }
      const sayariResponse = await generateSayari({ mood });
      const savedSayari = await storage.createGeneratedSayari({
        mood: sayariResponse.mood,
        content: sayariResponse.sayari
      });
      res.json(sayariResponse);
    } catch (error) {
      console.error("Error generating sayari:", error);
      res.status(500).json({ message: "Failed to generate sayari" });
    }
  });
  app2.get("/api/sayaris", async (req, res) => {
    try {
      const sayaris = await storage.getGeneratedSayaris();
      res.json(sayaris);
    } catch (error) {
      console.error("Error fetching sayaris:", error);
      res.status(500).json({ message: "Failed to fetch sayaris" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
