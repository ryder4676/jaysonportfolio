import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateProjectSuggestions, analyzeWebsite, generateAiResponse } from "./openai";
import { sendNewClientNotification, sendWebsiteAnalysisNotification } from "./twilio";
import { insertProjectRequestSchema, insertWebsiteAnalysisSchema, insertAiMessageSchema } from "@shared/schema";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { nanoid } from "nanoid";
import { z } from "zod";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // Project requests routes
  app.post("/api/project-requests", async (req, res) => {
    try {
      const validatedData = insertProjectRequestSchema.parse(req.body);
      const newRequest = await storage.createProjectRequest(validatedData);
      
      // Send SMS notification
      await sendNewClientNotification(
        newRequest.name,
        newRequest.projectType,
        newRequest.email
      );
      
      res.status(201).json(newRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error creating project request:", error);
        res.status(500).json({ error: "Failed to create project request" });
      }
    }
  });

  app.get("/api/project-requests", ensureAdmin, async (req, res) => {
    try {
      const requests = await storage.getAllProjectRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching project requests:", error);
      res.status(500).json({ error: "Failed to fetch project requests" });
    }
  });

  app.put("/api/project-requests/:id/viewed", ensureAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { viewed } = req.body;
      
      if (typeof viewed !== "boolean") {
        return res.status(400).json({ error: "Invalid viewed status" });
      }
      
      const updatedRequest = await storage.updateProjectRequestViewed(id, viewed);
      
      if (!updatedRequest) {
        return res.status(404).json({ error: "Project request not found" });
      }
      
      res.json(updatedRequest);
    } catch (error) {
      console.error("Error updating project request:", error);
      res.status(500).json({ error: "Failed to update project request" });
    }
  });

  // Website analysis routes
  app.post("/api/website-analyses", async (req, res) => {
    try {
      const validatedData = insertWebsiteAnalysisSchema.parse(req.body);
      const newAnalysis = await storage.createWebsiteAnalysis(validatedData);
      
      // Send SMS notification
      await sendWebsiteAnalysisNotification(
        newAnalysis.websiteUrl,
        newAnalysis.email
      );
      
      // Trigger AI analysis in the background
      analyzeWebsite(
        newAnalysis.websiteUrl,
        newAnalysis.painPoints || "",
        newAnalysis.improvementAreas || []
      ).then(async (aiAnalysis) => {
        await storage.updateWebsiteAnalysis(newAnalysis.id, { aiAnalysis });
      }).catch(error => {
        console.error("AI analysis background processing error:", error);
      });
      
      res.status(201).json(newAnalysis);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error creating website analysis:", error);
        res.status(500).json({ error: "Failed to create website analysis" });
      }
    }
  });

  app.get("/api/website-analyses", ensureAdmin, async (req, res) => {
    try {
      const analyses = await storage.getAllWebsiteAnalyses();
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching website analyses:", error);
      res.status(500).json({ error: "Failed to fetch website analyses" });
    }
  });

  app.get("/api/website-analyses/:id", ensureAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const analysis = await storage.getWebsiteAnalysis(id);
      
      if (!analysis) {
        return res.status(404).json({ error: "Website analysis not found" });
      }
      
      res.json(analysis);
    } catch (error) {
      console.error("Error fetching website analysis:", error);
      res.status(500).json({ error: "Failed to fetch website analysis" });
    }
  });

  app.put("/api/website-analyses/:id/viewed", ensureAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { viewed } = req.body;
      
      if (typeof viewed !== "boolean") {
        return res.status(400).json({ error: "Invalid viewed status" });
      }
      
      const updatedAnalysis = await storage.updateWebsiteAnalysisViewed(id, viewed);
      
      if (!updatedAnalysis) {
        return res.status(404).json({ error: "Website analysis not found" });
      }
      
      res.json(updatedAnalysis);
    } catch (error) {
      console.error("Error updating website analysis:", error);
      res.status(500).json({ error: "Failed to update website analysis" });
    }
  });

  // AI Features routes
  app.post("/api/ai/suggestions", async (req, res) => {
    try {
      const { projectType, selectedFeatures } = req.body;
      
      if (!projectType || !Array.isArray(selectedFeatures)) {
        return res.status(400).json({ error: "Invalid request data" });
      }
      
      const suggestions = await generateProjectSuggestions(projectType, selectedFeatures);
      res.json({ suggestions });
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
      res.status(500).json({ error: "Failed to generate suggestions" });
    }
  });

  app.post("/api/ai/chat", async (req, res) => {
    try {
      // Ensure session ID exists
      if (!req.session.aiChatId) {
        req.session.aiChatId = nanoid();
      }
      
      const { message } = req.body;
      const sessionId = req.session.aiChatId;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }
      
      // Save user message
      await storage.createAiMessage({
        sessionId,
        role: "user",
        content: message
      });
      
      // Get conversation history
      const history = await storage.getAiMessagesBySession(sessionId);
      const formattedHistory = history.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Generate AI response
      const aiResponse = await generateAiResponse(formattedHistory, message);
      
      // Save AI response
      await storage.createAiMessage({
        sessionId,
        role: "assistant",
        content: aiResponse
      });
      
      res.json({ message: aiResponse });
    } catch (error) {
      console.error("Error in AI chat:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}

function ensureAdmin(req: Request, res: Response, next: Function) {
  if (req.isAuthenticated() && req.user && req.user.isAdmin) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "dev-secret-change-this",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      req.login(user, (err) => {
        if (err) return next(err);
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });
      
      req.login(user, (err) => {
        if (err) return next(err);
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user as any;
    res.json(userWithoutPassword);
  });
}
