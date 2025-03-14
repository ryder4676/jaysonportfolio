import { 
  User, InsertUser, 
  ProjectRequest, InsertProjectRequest, 
  WebsiteAnalysis, InsertWebsiteAnalysis,
  AiMessage, InsertAiMessage
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project request operations
  getAllProjectRequests(): Promise<ProjectRequest[]>;
  getProjectRequest(id: number): Promise<ProjectRequest | undefined>;
  createProjectRequest(request: InsertProjectRequest): Promise<ProjectRequest>;
  updateProjectRequestViewed(id: number, viewed: boolean): Promise<ProjectRequest | undefined>;
  
  // Website analysis operations
  getAllWebsiteAnalyses(): Promise<WebsiteAnalysis[]>;
  getWebsiteAnalysis(id: number): Promise<WebsiteAnalysis | undefined>;
  createWebsiteAnalysis(analysis: InsertWebsiteAnalysis): Promise<WebsiteAnalysis>;
  updateWebsiteAnalysis(id: number, analysis: Partial<WebsiteAnalysis>): Promise<WebsiteAnalysis | undefined>;
  updateWebsiteAnalysisViewed(id: number, viewed: boolean): Promise<WebsiteAnalysis | undefined>;
  
  // AI messages operations
  getAiMessagesBySession(sessionId: string): Promise<AiMessage[]>;
  createAiMessage(message: InsertAiMessage): Promise<AiMessage>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projectRequests: Map<number, ProjectRequest>;
  private websiteAnalyses: Map<number, WebsiteAnalysis>;
  private aiMessages: Map<number, AiMessage>;
  sessionStore: session.SessionStore;
  
  private userCurrentId: number;
  private projectRequestCurrentId: number;
  private websiteAnalysisCurrentId: number;
  private aiMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.projectRequests = new Map();
    this.websiteAnalyses = new Map();
    this.aiMessages = new Map();
    
    this.userCurrentId = 1;
    this.projectRequestCurrentId = 1;
    this.websiteAnalysisCurrentId = 1;
    this.aiMessageCurrentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired sessions every 24h
    });
    
    // Create default admin user
    this.createUser({
      username: "admin",
      password: "password123", // This would be hashed in production
      isAdmin: true,
      name: "Admin User",
      email: "admin@example.com"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project request methods
  async getAllProjectRequests(): Promise<ProjectRequest[]> {
    return Array.from(this.projectRequests.values()).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async getProjectRequest(id: number): Promise<ProjectRequest | undefined> {
    return this.projectRequests.get(id);
  }

  async createProjectRequest(request: InsertProjectRequest): Promise<ProjectRequest> {
    const id = this.projectRequestCurrentId++;
    const createdAt = new Date();
    const projectRequest: ProjectRequest = { 
      ...request, 
      id, 
      createdAt, 
      viewed: false 
    };
    
    this.projectRequests.set(id, projectRequest);
    return projectRequest;
  }

  async updateProjectRequestViewed(id: number, viewed: boolean): Promise<ProjectRequest | undefined> {
    const request = this.projectRequests.get(id);
    if (!request) return undefined;
    
    const updatedRequest = { ...request, viewed };
    this.projectRequests.set(id, updatedRequest);
    return updatedRequest;
  }

  // Website analysis methods
  async getAllWebsiteAnalyses(): Promise<WebsiteAnalysis[]> {
    return Array.from(this.websiteAnalyses.values()).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async getWebsiteAnalysis(id: number): Promise<WebsiteAnalysis | undefined> {
    return this.websiteAnalyses.get(id);
  }

  async createWebsiteAnalysis(analysis: InsertWebsiteAnalysis): Promise<WebsiteAnalysis> {
    const id = this.websiteAnalysisCurrentId++;
    const createdAt = new Date();
    const websiteAnalysis: WebsiteAnalysis = { 
      ...analysis, 
      id, 
      createdAt, 
      viewed: false,
      aiAnalysis: null
    };
    
    this.websiteAnalyses.set(id, websiteAnalysis);
    return websiteAnalysis;
  }

  async updateWebsiteAnalysis(id: number, partialAnalysis: Partial<WebsiteAnalysis>): Promise<WebsiteAnalysis | undefined> {
    const analysis = this.websiteAnalyses.get(id);
    if (!analysis) return undefined;
    
    const updatedAnalysis = { ...analysis, ...partialAnalysis };
    this.websiteAnalyses.set(id, updatedAnalysis);
    return updatedAnalysis;
  }

  async updateWebsiteAnalysisViewed(id: number, viewed: boolean): Promise<WebsiteAnalysis | undefined> {
    const analysis = this.websiteAnalyses.get(id);
    if (!analysis) return undefined;
    
    const updatedAnalysis = { ...analysis, viewed };
    this.websiteAnalyses.set(id, updatedAnalysis);
    return updatedAnalysis;
  }

  // AI messages methods
  async getAiMessagesBySession(sessionId: string): Promise<AiMessage[]> {
    return Array.from(this.aiMessages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  async createAiMessage(message: InsertAiMessage): Promise<AiMessage> {
    const id = this.aiMessageCurrentId++;
    const timestamp = new Date();
    const aiMessage: AiMessage = { ...message, id, timestamp };
    
    this.aiMessages.set(id, aiMessage);
    return aiMessage;
  }
}

export const storage = new MemStorage();
