import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { insertWebsiteAnalysisSchema } from "@shared/schema";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define improvement areas for the website analysis
const improvementAreas = [
  { id: "design", label: "Visual Design" },
  { id: "performance", label: "Performance" },
  { id: "responsiveness", label: "Mobile Responsiveness" },
  { id: "seo", label: "SEO Optimization" },
  { id: "functionality", label: "Functionality/Features" },
  { id: "content", label: "Content Structure" },
];

// Create schema for the form validation
const formSchema = z.object({
  websiteUrl: z.string().url("Please enter a valid URL"),
  painPoints: z.string().optional(),
  improvementAreas: z.array(z.string()).min(1, "Please select at least one area for improvement"),
  budget: z.string().min(1, "Please select your budget"),
  email: z.string().email("Please enter a valid email address"),
});

export default function AnalyzerForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteUrl: "",
      painPoints: "",
      improvementAreas: [],
      budget: "",
      email: "",
    },
  });

  const analyzerMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await apiRequest("POST", "/api/website-analyses", values);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Analysis request submitted",
        description: "We'll send you a confirmation email and a detailed analysis within 48 hours.",
      });
      setIsSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error submitting analysis request",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    analyzerMutation.mutate(values);
  }

  if (isSubmitted) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="rounded-md bg-green-900 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-300">Analysis Request Submitted</h3>
                <div className="mt-2 text-sm text-green-200">
                  <p>
                    Thank you for submitting your website for analysis. You should receive a confirmation email shortly. I'll review your site thoroughly and send a detailed report to your email within 48 hours. This will include actionable recommendations, visual mockups, cost estimates, and a timeline for improvements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Your Website URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com" 
                      className="bg-gray-700 border-gray-700 text-white focus:ring-primary focus:border-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="painPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    What challenges are you facing with your current site?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Slow loading, not mobile-friendly, outdated design, etc."
                      className="bg-gray-700 border-gray-700 text-white focus:ring-primary focus:border-primary resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-400">
                    Help us understand your specific concerns so we can focus on them.
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="improvementAreas"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-gray-300">Areas you'd like to improve</FormLabel>
                    <FormDescription className="text-gray-400">
                      Select all that apply to your website.
                    </FormDescription>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                    {improvementAreas.map((area) => (
                      <FormField
                        key={area.id}
                        control={form.control}
                        name="improvementAreas"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={area.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(area.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, area.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== area.id
                                          )
                                        );
                                  }}
                                  className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:text-white"
                                />
                              </FormControl>
                              <FormLabel className="text-gray-300 font-normal">
                                {area.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage className="mt-2 text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Approximate Budget</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-700 border-gray-700 text-white focus:ring-primary focus:border-primary">
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="Under $1,000">Under $1,000</SelectItem>
                      <SelectItem value="$1,000 - $3,000">$1,000 - $3,000</SelectItem>
                      <SelectItem value="$3,000 - $5,000">$3,000 - $5,000</SelectItem>
                      <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="$10,000+">$10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email Address</FormLabel>
                  <FormDescription className="text-gray-400">
                    We'll send the analysis report to this email address.
                  </FormDescription>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      className="bg-gray-700 border-gray-700 text-white focus:ring-primary focus:border-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-blue-600 text-white"
              disabled={analyzerMutation.isPending}
            >
              {analyzerMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Analyze My Website"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
