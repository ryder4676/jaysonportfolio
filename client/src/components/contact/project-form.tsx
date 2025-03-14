import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { insertProjectRequestSchema } from "@shared/schema";
import { CheckCircle } from "lucide-react";

// Define the form schema for each step
const projectTypeSchema = z.object({
  projectType: z.string().min(1, "Please select a project type"),
});

const featuresSchema = z.object({
  features: z.array(z.string()).min(1, "Select at least one feature"),
});

const detailsSchema = z.object({
  projectDescription: z.string().min(10, "Please provide more details about your project"),
  targetAudience: z.string().min(1, "Please describe your target audience"),
  competitors: z.string().optional(),
  timeline: z.string().min(1, "Please select a timeline"),
});

const budgetSchema = z.object({
  budgetRange: z.string().min(1, "Please select a budget range"),
  priorities: z.object({
    speed: z.string(),
    quality: z.string(),
    cost: z.string(),
  }),
  additionalInfo: z.string().optional(),
});

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

// Combine schemas for the final form submission
const formSchema = projectTypeSchema
  .merge(featuresSchema)
  .merge(detailsSchema)
  .merge(budgetSchema)
  .merge(contactSchema);

// Feature options based on project type
const featureOptions = {
  website: [
    { id: "responsive", label: "Responsive Design" },
    { id: "cms", label: "Content Management System" },
    { id: "seo", label: "SEO Optimization" },
    { id: "blog", label: "Blog/News Section" },
    { id: "contact", label: "Contact Forms" },
    { id: "analytics", label: "Analytics Integration" },
    { id: "multilingual", label: "Multilingual Support" },
    { id: "social", label: "Social Media Integration" },
  ],
  ecommerce: [
    { id: "product-management", label: "Product Management" },
    { id: "shopping-cart", label: "Shopping Cart & Checkout" },
    { id: "payment-gateway", label: "Payment Gateway Integration" },
    { id: "inventory", label: "Inventory Management" },
    { id: "order-management", label: "Order Management" },
    { id: "customer-accounts", label: "Customer Accounts" },
    { id: "product-search", label: "Advanced Search & Filtering" },
    { id: "recommendations", label: "Product Recommendations" },
    { id: "analytics", label: "Sales Analytics Dashboard" },
  ],
  "web-app": [
    { id: "user-auth", label: "User Authentication" },
    { id: "database", label: "Database Integration" },
    { id: "apis", label: "Third-party API Integration" },
    { id: "dashboard", label: "Admin Dashboard" },
    { id: "reporting", label: "Reporting Features" },
    { id: "notifications", label: "Real-time Notifications" },
    { id: "file-upload", label: "File Upload/Management" },
    { id: "subscription", label: "Subscription Management" },
  ],
  "mobile-app": [
    { id: "ios", label: "iOS Development" },
    { id: "android", label: "Android Development" },
    { id: "cross-platform", label: "Cross-platform (React Native/Flutter)" },
    { id: "offline", label: "Offline Functionality" },
    { id: "push", label: "Push Notifications" },
    { id: "geolocation", label: "Geolocation Features" },
    { id: "camera", label: "Camera/Media Integration" },
    { id: "in-app-purchase", label: "In-app Purchases" },
  ],
  dashboard: [
    { id: "data-visualization", label: "Data Visualization" },
    { id: "user-management", label: "User Management" },
    { id: "reporting", label: "Reporting Tools" },
    { id: "export", label: "Data Export (CSV/Excel)" },
    { id: "alerts", label: "Alerts & Notifications" },
    { id: "api-integration", label: "API Integrations" },
    { id: "real-time", label: "Real-time Updates" },
    { id: "filtering", label: "Advanced Filtering & Sorting" },
  ],
  redesign: [
    { id: "ui-ux", label: "UI/UX Improvements" },
    { id: "performance", label: "Performance Optimization" },
    { id: "responsive", label: "Mobile Responsiveness" },
    { id: "seo", label: "SEO Optimization" },
    { id: "content", label: "Content Restructuring" },
    { id: "branding", label: "Brand Alignment" },
    { id: "analytics", label: "Analytics Integration" },
    { id: "accessibility", label: "Accessibility Improvements" },
  ],
};

type FeatureOptions = typeof featureOptions;
type ProjectType = keyof FeatureOptions;

// AI Assistant messages based on the current step
const aiAssistantMessages = {
  1: "Let's start by understanding what type of application you need. This will help me guide you through the most relevant options.",
  2: "Great choice! Have you considered these features for your project? They can significantly enhance user experience and functionality.",
  3: "Have you thought about your target audience and competitors? This information helps me create a more tailored solution for your business needs.",
  4: "Understanding your budget helps me prioritize features and suggest the most cost-effective approach. What's your approximate budget range?",
  5: "Great! I just need your contact details so I can prepare a tailored project plan and reach out to discuss next steps.",
};

type FormStep = 1 | 2 | 3 | 4 | 5;

export default function ProjectForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const totalSteps = 5;
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectType | null>(null);
  const [formData, setFormData] = useState<any>({
    projectType: "",
    features: [],
    projectDescription: "",
    targetAudience: "",
    competitors: "",
    timeline: "",
    budgetRange: "",
    priorities: {
      speed: "",
      quality: "",
      cost: "",
    },
    additionalInfo: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    termsAccepted: false,
  });
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  // Get the current step's schema
  const getStepSchema = (step: FormStep) => {
    switch (step) {
      case 1:
        return projectTypeSchema;
      case 2:
        return featuresSchema;
      case 3:
        return detailsSchema;
      case 4:
        return budgetSchema;
      case 5:
        return contactSchema;
      default:
        return z.object({});
    }
  };

  // Form setup with the current step's schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(getStepSchema(currentStep)),
    defaultValues: formData,
  });

  // Mutation for submitting the form
  const submitMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const res = await apiRequest("POST", "/api/project-requests", data);
      return await res.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      toast({
        title: "Request submitted successfully!",
        description: "We'll get back to you within 24 hours.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error submitting request",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation for getting AI suggestions
  const suggestionsMutation = useMutation({
    mutationFn: async ({ projectType, selectedFeatures }: { projectType: string; selectedFeatures: string[] }) => {
      const res = await apiRequest("POST", "/api/ai/suggestions", { projectType, selectedFeatures });
      return await res.json();
    },
    onSuccess: (data) => {
      setAiSuggestions(data.suggestions || []);
    },
    onError: () => {
      setAiSuggestions([]);
    },
  });

  // Handle next step
  const handleNext = async (data: any) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    // If moving from project type to features, get AI suggestions
    if (currentStep === 1 && data.projectType) {
      setSelectedProjectType(data.projectType as ProjectType);
      suggestionsMutation.mutate({
        projectType: data.projectType,
        selectedFeatures: [],
      });
    }

    // If on the last step, submit the form
    if (currentStep === totalSteps) {
      submitMutation.mutate(updatedFormData);
    } else {
      setCurrentStep((prev) => (prev < totalSteps ? (prev + 1) as FormStep : prev));
    }
  };

  // Handle back button
  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? (prev - 1) as FormStep : prev));
  };

  // Update features when they are selected/deselected
  const handleFeatureChange = (feature: string, checked: boolean) => {
    const currentFeatures = form.getValues("features") || [];
    const updatedFeatures = checked
      ? [...currentFeatures, feature]
      : currentFeatures.filter((f) => f !== feature);
    
    form.setValue("features", updatedFeatures, { shouldValidate: true });
    
    // Get new AI suggestions based on selected features
    if (selectedProjectType) {
      suggestionsMutation.mutate({
        projectType: selectedProjectType,
        selectedFeatures: updatedFeatures,
      });
    }
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-4">What type of project are you interested in?</h3>
            <div className="mb-4 relative bg-blue-50 rounded-lg p-4 border-l-4 border-primary">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="text-primary h-5 w-5">💬</div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">AI Assistant:</span>{" "}
                    <span>{aiAssistantMessages[1]}</span>
                  </p>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="col-span-2">
                      <FormLabel className="text-base">Project Type</FormLabel>
                      <FormDescription>Select the type of project you need</FormDescription>
                    </div>
                    <label className={`flex p-4 border ${field.value === "website" ? "border-primary bg-blue-50" : "border-gray-200"} rounded-lg cursor-pointer hover:bg-gray-50`}>
                      <FormControl>
                        <input
                          type="radio"
                          className="h-4 w-4 text-primary border-gray-300 mt-1"
                          checked={field.value === "website"}
                          onChange={() => field.onChange("website")}
                        />
                      </FormControl>
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">Business Website</span>
                        <span className="block text-sm text-gray-500">From $3,000</span>
                      </div>
                    </label>

                    <label className={`flex p-4 border ${field.value === "ecommerce" ? "border-primary bg-blue-50" : "border-gray-200"} rounded-lg cursor-pointer hover:bg-gray-50`}>
                      <FormControl>
                        <input
                          type="radio"
                          className="h-4 w-4 text-primary border-gray-300 mt-1"
                          checked={field.value === "ecommerce"}
                          onChange={() => field.onChange("ecommerce")}
                        />
                      </FormControl>
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">E-commerce Store</span>
                        <span className="block text-sm text-gray-500">From $7,500</span>
                      </div>
                    </label>

                    <label className={`flex p-4 border ${field.value === "web-app" ? "border-primary bg-blue-50" : "border-gray-200"} rounded-lg cursor-pointer hover:bg-gray-50`}>
                      <FormControl>
                        <input
                          type="radio"
                          className="h-4 w-4 text-primary border-gray-300 mt-1"
                          checked={field.value === "web-app"}
                          onChange={() => field.onChange("web-app")}
                        />
                      </FormControl>
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">Web Application</span>
                        <span className="block text-sm text-gray-500">From $8,000</span>
                      </div>
                    </label>

                    <label className={`flex p-4 border ${field.value === "mobile-app" ? "border-primary bg-blue-50" : "border-gray-200"} rounded-lg cursor-pointer hover:bg-gray-50`}>
                      <FormControl>
                        <input
                          type="radio"
                          className="h-4 w-4 text-primary border-gray-300 mt-1"
                          checked={field.value === "mobile-app"}
                          onChange={() => field.onChange("mobile-app")}
                        />
                      </FormControl>
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">Mobile Application</span>
                        <span className="block text-sm text-gray-500">From $10,000</span>
                      </div>
                    </label>

                    <label className={`flex p-4 border ${field.value === "dashboard" ? "border-primary bg-blue-50" : "border-gray-200"} rounded-lg cursor-pointer hover:bg-gray-50`}>
                      <FormControl>
                        <input
                          type="radio"
                          className="h-4 w-4 text-primary border-gray-300 mt-1"
                          checked={field.value === "dashboard"}
                          onChange={() => field.onChange("dashboard")}
                        />
                      </FormControl>
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">Admin Dashboard</span>
                        <span className="block text-sm text-gray-500">From $5,000</span>
                      </div>
                    </label>

                    <label className={`flex p-4 border ${field.value === "redesign" ? "border-primary bg-blue-50" : "border-gray-200"} rounded-lg cursor-pointer hover:bg-gray-50`}>
                      <FormControl>
                        <input
                          type="radio"
                          className="h-4 w-4 text-primary border-gray-300 mt-1"
                          checked={field.value === "redesign"}
                          onChange={() => field.onChange("redesign")}
                        />
                      </FormControl>
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">Website Redesign</span>
                        <span className="block text-sm text-gray-500">From $2,500</span>
                      </div>
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case 2:
        return (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-4">What features do you need?</h3>
            <div className="mb-6 relative bg-blue-50 rounded-lg p-4 border-l-4 border-primary">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="text-primary h-5 w-5">💬</div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">AI Assistant:</span>{" "}
                    <span>{aiAssistantMessages[2]}</span>
                  </p>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <div className="space-y-3">
                    {selectedProjectType && featureOptions[selectedProjectType].map((option) => (
                      <div key={option.id} className="flex items-start">
                        <FormControl>
                          <Checkbox
                            checked={form.getValues("features")?.includes(option.id)}
                            onCheckedChange={(checked) => handleFeatureChange(option.id, checked as boolean)}
                          />
                        </FormControl>
                        <div className="ml-3">
                          <FormLabel className="font-medium text-sm text-gray-900">{option.label}</FormLabel>
                        </div>
                      </div>
                    ))}
                  </div>
                  <FormMessage />

                  {aiSuggestions.length > 0 && (
                    <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <h4 className="font-semibold text-amber-800 mb-2">AI Suggestions</h4>
                      <ul className="space-y-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <span className="text-amber-500">💡</span>
                            </div>
                            <div className="ml-2">
                              <p className="text-sm text-gray-700">{suggestion.suggestion}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-xs font-medium text-gray-500 mr-2">{suggestion.category}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded ${
                                  suggestion.impact === "High" 
                                    ? "bg-red-100 text-red-800" 
                                    : suggestion.impact === "Medium" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : "bg-green-100 text-green-800"
                                }`}>
                                  {suggestion.impact} Impact
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </FormItem>
              )}
            />
          </>
        );

      case 3:
        return (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tell me more about your project</h3>
            <div className="mb-6 relative bg-blue-50 rounded-lg p-4 border-l-4 border-primary">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="text-primary h-5 w-5">💬</div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">AI Assistant:</span>{" "}
                    <span>{aiAssistantMessages[3]}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project, goals, and vision..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Who are your customers or users?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="competitors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitors or Inspiration</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Any websites or apps you admire?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Timeline</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timeline" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Less than 1 month">Less than 1 month</SelectItem>
                        <SelectItem value="1-2 months">1-2 months</SelectItem>
                        <SelectItem value="3-6 months">3-6 months</SelectItem>
                        <SelectItem value="6+ months">6+ months</SelectItem>
                        <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Budget and Priorities</h3>
            <div className="mb-6 relative bg-blue-50 rounded-lg p-4 border-l-4 border-primary">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="text-primary h-5 w-5">💬</div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">AI Assistant:</span>{" "}
                    <span>{aiAssistantMessages[4]}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="budgetRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Under $5,000">Under $5,000</SelectItem>
                        <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="$10,000 - $25,000">$10,000 - $25,000</SelectItem>
                        <SelectItem value="$25,000 - $50,000">$25,000 - $50,000</SelectItem>
                        <SelectItem value="$50,000+">$50,000+</SelectItem>
                        <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">Project Priorities (Rank from 1-3)</FormLabel>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-24 text-sm text-gray-500">Speed</span>
                    <div className="ml-2 flex-1">
                      <FormField
                        control={form.control}
                        name="priorities.speed"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-2"
                              >
                                <div className="flex items-center">
                                  <RadioGroupItem value="1" id="speed-1" />
                                  <FormLabel htmlFor="speed-1" className="ml-1 text-xs text-gray-500">1</FormLabel>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroupItem value="2" id="speed-2" />
                                  <FormLabel htmlFor="speed-2" className="ml-1 text-xs text-gray-500">2</FormLabel>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroupItem value="3" id="speed-3" />
                                  <FormLabel htmlFor="speed-3" className="ml-1 text-xs text-gray-500">3</FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="w-24 text-sm text-gray-500">Quality</span>
                    <div className="ml-2 flex-1">
                      <FormField
                        control={form.control}
                        name="priorities.quality"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-2"
                              >
                                <div className="flex items-center">
                                  <RadioGroupItem value="1" id="quality-1" />
                                  <FormLabel htmlFor="quality-1" className="ml-1 text-xs text-gray-500">1</FormLabel>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroupItem value="2" id="quality-2" />
                                  <FormLabel htmlFor="quality-2" className="ml-1 text-xs text-gray-500">2</FormLabel>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroupItem value="3" id="quality-3" />
                                  <FormLabel htmlFor="quality-3" className="ml-1 text-xs text-gray-500">3</FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="w-24 text-sm text-gray-500">Cost</span>
                    <div className="ml-2 flex-1">
                      <FormField
                        control={form.control}
                        name="priorities.cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-2"
                              >
                                <div className="flex items-center">
                                  <RadioGroupItem value="1" id="cost-1" />
                                  <FormLabel htmlFor="cost-1" className="ml-1 text-xs text-gray-500">1</FormLabel>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroupItem value="2" id="cost-2" />
                                  <FormLabel htmlFor="cost-2" className="ml-1 text-xs text-gray-500">2</FormLabel>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroupItem value="3" id="cost-3" />
                                  <FormLabel htmlFor="cost-3" className="ml-1 text-xs text-gray-500">3</FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any other information you'd like to share..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );

      case 5:
        return (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Contact Information</h3>
            <div className="mb-6 relative bg-blue-50 rounded-lg p-4 border-l-4 border-primary">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="text-primary h-5 w-5">💬</div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">AI Assistant:</span>{" "}
                    <span>{aiAssistantMessages[5]}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name (if applicable)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to be contacted about my project request. My information will be handled as described in the Privacy Policy.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Request Submitted Successfully</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Thank you for your project request! I'll review your information and get back to you within 24 hours with a personalized project plan and quote.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-8">
        {/* Progress Bar */}
        <div className="relative pt-1 mb-8">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-blue-100">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primary">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)}>
            {renderStepContent()}
            
            <div className="mt-6 flex space-x-3">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              <Button 
                type="submit" 
                className="flex-1"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {currentStep === totalSteps ? "Submitting..." : "Loading..."}
                  </>
                ) : (
                  currentStep === totalSteps ? "Submit Request" : "Continue"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
}
