import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "mock-key-for-development" 
});

// Type interfaces
interface ProjectSuggestion {
  suggestion: string;
  category: string;
  impact: "High" | "Medium" | "Low";
}

interface WebsiteAnalysisResult {
  summary: string;
  issues: {
    designIssues: {
      description: string;
      priority: "High" | "Medium" | "Low";
      estimatedCost: string;
    }[];
    performanceIssues: {
      description: string;
      priority: "High" | "Medium" | "Low";
      estimatedCost: string;
    }[];
    responsiveIssues: {
      description: string;
      priority: "High" | "Medium" | "Low";
      estimatedCost: string;
    }[];
    functionalityIssues: {
      description: string;
      priority: "High" | "Medium" | "Low";
      estimatedCost: string;
    }[];
  };
  recommendations: {
    description: string;
    estimatedCost: string;
    estimatedTime: string;
    priority: "High" | "Medium" | "Low";
  }[];
  totalEstimatedCost: {
    low: string;
    high: string;
  };
  totalEstimatedTime: string;
}

// Generate suggestions based on project type and existing features
export async function generateProjectSuggestions(
  projectType: string,
  selectedFeatures: string[]
): Promise<ProjectSuggestion[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are an expert web and mobile application developer assistant. Your job is to suggest additional features that the client might not have considered based on their selected project type and features. Provide practical, valuable suggestions that would enhance their project."
        },
        {
          role: "user",
          content: 
            `Project Type: ${projectType}\nSelected Features: ${selectedFeatures.join(", ")}\n\nProvide 3-5 additional feature suggestions that would enhance this project type. Format the response as a JSON array of objects with these properties: "suggestion" (string), "category" (string), and "impact" (string - either "High", "Medium", or "Low").`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.suggestions || [];
  } catch (error) {
    console.error("Error generating project suggestions:", error);
    // Return fallback suggestions in case of API error
    return [
      {
        suggestion: "Consider adding analytics to track user behavior",
        category: "Analytics",
        impact: "Medium"
      },
      {
        suggestion: "Implement user feedback collection mechanisms",
        category: "User Engagement",
        impact: "High"
      }
    ];
  }
}

// Analyze website and provide recommendations
export async function analyzeWebsite(
  websiteUrl: string,
  painPoints: string,
  improvementAreas: string[]
): Promise<WebsiteAnalysisResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are an expert web developer and UI/UX specialist. Your task is to analyze a website and provide detailed recommendations for improvements based on best practices. You should evaluate design, performance, mobile responsiveness, and functionality. Provide realistic cost and time estimates."
        },
        {
          role: "user",
          content: 
            `Analyze this website: ${websiteUrl}\n\nUser-reported pain points: ${painPoints}\n\nAreas they want to improve: ${improvementAreas.join(", ")}\n\nProvide a detailed analysis with issues found, recommendations, and cost estimates. Format your response as a JSON object with these properties: "summary" (string), "issues" (object with categories), "recommendations" (array), "totalEstimatedCost" (object with low and high ranges), and "totalEstimatedTime" (string).`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error) {
    console.error("Error analyzing website:", error);
    // Return a simple error analysis in case of API failure
    return {
      summary: "Unable to complete full analysis due to technical issues",
      issues: {
        designIssues: [
          {
            description: "Analysis unavailable at this time",
            priority: "Medium" as const,
            estimatedCost: "Varies"
          }
        ],
        performanceIssues: [],
        responsiveIssues: [],
        functionalityIssues: []
      },
      recommendations: [
        {
          description: "Please try again later or contact support for a manual analysis",
          estimatedCost: "N/A",
          estimatedTime: "N/A",
          priority: "Medium" as const
        }
      ],
      totalEstimatedCost: {
        low: "N/A",
        high: "N/A"
      },
      totalEstimatedTime: "N/A"
    };
  }
}

// Generate AI response for the conversation
export async function generateAiResponse(
  conversationHistory: { role: string; content: string }[],
  newUserMessage: string
): Promise<string> {
  try {
    // Add system prompt at the beginning if not present
    let messages = [...conversationHistory];
    if (!messages.some(msg => msg.role === "system")) {
      messages.unshift({
        role: "system",
        content: "You are a helpful assistant that guides users through the process of defining their web or mobile application project requirements. Ask questions to understand their needs better, make suggestions, and provide expertise about development considerations they might not have thought about."
      });
    }
    
    // Add the new user message
    messages.push({ role: "user", content: newUserMessage });
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 500
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}
