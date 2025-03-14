import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { WebsiteAnalysis } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Eye, CheckCircle, Clock, AlertTriangle, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function WebsiteAnalyses() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<WebsiteAnalysis | null>(null);
  const [open, setOpen] = useState(false);

  // Fetch website analyses
  const { data: analyses, isLoading, error } = useQuery<WebsiteAnalysis[]>({
    queryKey: ["/api/website-analyses"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Mark analysis as viewed
  const markAsViewedMutation = useMutation({
    mutationFn: async ({ id, viewed }: { id: number; viewed: boolean }) => {
      const res = await apiRequest("PUT", `/api/website-analyses/${id}/viewed`, { viewed });
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate the analyses cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["/api/website-analyses"] });
    },
  });

  const handleMarkAsViewed = (id: number, viewed: boolean) => {
    markAsViewedMutation.mutate({ id, viewed });
  };

  const openAnalysisDetails = (analysis: WebsiteAnalysis) => {
    setSelectedAnalysis(analysis);
    setOpen(true);
    
    // If the analysis is not viewed yet, mark it as viewed
    if (!analysis.viewed) {
      handleMarkAsViewed(analysis.id, true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-gray-500">Loading website analyses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 px-4 text-center">
        <p className="text-red-500 font-medium">Error loading website analyses</p>
        <p className="text-gray-500 text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  if (!analyses || analyses.length === 0) {
    return (
      <div className="py-8 px-4 text-center border rounded-lg">
        <p className="text-gray-500 font-medium">No website analyses yet</p>
        <p className="text-gray-400 text-sm mt-2">Website analysis requests will appear here when submitted</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Total: {analyses.length} {analyses.length === 1 ? "analysis" : "analyses"}
          </h3>
          <p className="text-xs text-gray-400">
            {analyses.filter(analysis => !analysis.viewed).length} unread
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/website-analyses"] })}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="overflow-hidden border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analyses.map((analysis) => (
              <TableRow key={analysis.id} className={!analysis.viewed ? "bg-blue-50" : ""}>
                <TableCell>
                  {analysis.viewed ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Viewed</span>
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>New</span>
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="font-medium truncate max-w-[200px]" title={analysis.websiteUrl}>
                    {analysis.websiteUrl}
                  </div>
                  <div className="text-xs text-gray-500">
                    {analysis.improvementAreas && analysis.improvementAreas.length > 0 ? (
                      <span>{analysis.improvementAreas.length} areas for improvement</span>
                    ) : (
                      <span>No specific areas</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{analysis.email}</div>
                </TableCell>
                <TableCell>
                  <span title={new Date(analysis.createdAt).toLocaleString()}>
                    {formatDistanceToNow(new Date(analysis.createdAt), { addSuffix: true })}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => openAnalysisDetails(analysis)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Analysis Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedAnalysis && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Website Analysis: {selectedAnalysis.websiteUrl}
                  {!selectedAnalysis.viewed && <Badge variant="secondary" className="ml-2">New</Badge>}
                </DialogTitle>
                <DialogDescription className="flex items-center justify-between">
                  <span>Submitted {formatDistanceToNow(new Date(selectedAnalysis.createdAt), { addSuffix: true })}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => window.open(selectedAnalysis.websiteUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Visit Website</span>
                  </Button>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                    <div className="mt-1 text-sm">
                      <p><span className="font-medium">Email:</span> {selectedAnalysis.email}</p>
                      <p><span className="font-medium">Budget:</span> {selectedAnalysis.budget}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Improvement Areas</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedAnalysis.improvementAreas && selectedAnalysis.improvementAreas.length > 0 ? (
                        selectedAnalysis.improvementAreas.map((area, index) => (
                          <Badge key={index} variant="outline">{area.replace("-", " ")}</Badge>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No specific areas selected</span>
                      )}
                    </div>
                  </div>
                </div>

                {selectedAnalysis.painPoints && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Pain Points</h4>
                    <div className="p-3 bg-gray-50 rounded-md text-sm">
                      {selectedAnalysis.painPoints}
                    </div>
                  </div>
                )}

                <Separator />

                {selectedAnalysis.aiAnalysis ? (
                  <Tabs defaultValue="summary">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="issues">Issues</TabsTrigger>
                      <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                      <TabsTrigger value="costs">Cost Estimates</TabsTrigger>
                      <TabsTrigger value="raw">Raw Data</TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="py-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Analysis Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {selectedAnalysis.aiAnalysis.summary}
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="issues" className="py-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Identified Issues</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            {selectedAnalysis.aiAnalysis.issues.designIssues && selectedAnalysis.aiAnalysis.issues.designIssues.length > 0 && (
                              <AccordionItem value="design">
                                <AccordionTrigger>
                                  Design Issues ({selectedAnalysis.aiAnalysis.issues.designIssues.length})
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-2">
                                    {selectedAnalysis.aiAnalysis.issues.designIssues.map((issue, index) => (
                                      <li key={index} className="text-sm p-2 border rounded">
                                        <div className="flex justify-between">
                                          <p>{issue.description}</p>
                                          <Badge 
                                            variant={
                                              issue.priority === "High" ? "destructive" :
                                              issue.priority === "Medium" ? "default" : "outline"
                                            }
                                          >
                                            {issue.priority} Priority
                                          </Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Estimated Cost: {issue.estimatedCost}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            )}
                            
                            {selectedAnalysis.aiAnalysis.issues.performanceIssues && selectedAnalysis.aiAnalysis.issues.performanceIssues.length > 0 && (
                              <AccordionItem value="performance">
                                <AccordionTrigger>
                                  Performance Issues ({selectedAnalysis.aiAnalysis.issues.performanceIssues.length})
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-2">
                                    {selectedAnalysis.aiAnalysis.issues.performanceIssues.map((issue, index) => (
                                      <li key={index} className="text-sm p-2 border rounded">
                                        <div className="flex justify-between">
                                          <p>{issue.description}</p>
                                          <Badge 
                                            variant={
                                              issue.priority === "High" ? "destructive" :
                                              issue.priority === "Medium" ? "default" : "outline"
                                            }
                                          >
                                            {issue.priority} Priority
                                          </Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Estimated Cost: {issue.estimatedCost}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            )}
                            
                            {selectedAnalysis.aiAnalysis.issues.responsiveIssues && selectedAnalysis.aiAnalysis.issues.responsiveIssues.length > 0 && (
                              <AccordionItem value="responsive">
                                <AccordionTrigger>
                                  Responsive Design Issues ({selectedAnalysis.aiAnalysis.issues.responsiveIssues.length})
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-2">
                                    {selectedAnalysis.aiAnalysis.issues.responsiveIssues.map((issue, index) => (
                                      <li key={index} className="text-sm p-2 border rounded">
                                        <div className="flex justify-between">
                                          <p>{issue.description}</p>
                                          <Badge 
                                            variant={
                                              issue.priority === "High" ? "destructive" :
                                              issue.priority === "Medium" ? "default" : "outline"
                                            }
                                          >
                                            {issue.priority} Priority
                                          </Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Estimated Cost: {issue.estimatedCost}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            )}
                            
                            {selectedAnalysis.aiAnalysis.issues.functionalityIssues && selectedAnalysis.aiAnalysis.issues.functionalityIssues.length > 0 && (
                              <AccordionItem value="functionality">
                                <AccordionTrigger>
                                  Functionality Issues ({selectedAnalysis.aiAnalysis.issues.functionalityIssues.length})
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-2">
                                    {selectedAnalysis.aiAnalysis.issues.functionalityIssues.map((issue, index) => (
                                      <li key={index} className="text-sm p-2 border rounded">
                                        <div className="flex justify-between">
                                          <p>{issue.description}</p>
                                          <Badge 
                                            variant={
                                              issue.priority === "High" ? "destructive" :
                                              issue.priority === "Medium" ? "default" : "outline"
                                            }
                                          >
                                            {issue.priority} Priority
                                          </Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Estimated Cost: {issue.estimatedCost}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            )}
                          </Accordion>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="recommendations" className="py-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-4">
                            {selectedAnalysis.aiAnalysis.recommendations && selectedAnalysis.aiAnalysis.recommendations.map((rec, index) => (
                              <li key={index} className="p-3 border rounded-md">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium">{rec.description}</h4>
                                  <Badge 
                                    variant={
                                      rec.priority === "High" ? "destructive" :
                                      rec.priority === "Medium" ? "default" : "outline"
                                    }
                                  >
                                    {rec.priority} Priority
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-gray-500">Estimated Cost:</span> {rec.estimatedCost}
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Estimated Time:</span> {rec.estimatedTime}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="costs" className="py-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Cost & Timeline Estimates</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-md">
                              <h3 className="font-medium mb-2">Total Estimated Cost</h3>
                              <div className="text-2xl font-bold">
                                {selectedAnalysis.aiAnalysis.totalEstimatedCost.low} - {selectedAnalysis.aiAnalysis.totalEstimatedCost.high}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">Depending on final scope and specific requirements</p>
                            </div>
                            <div className="p-4 border rounded-md">
                              <h3 className="font-medium mb-2">Total Estimated Timeline</h3>
                              <div className="text-2xl font-bold">
                                {selectedAnalysis.aiAnalysis.totalEstimatedTime}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">From project start to completion</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="raw" className="py-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Raw Analysis Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="whitespace-pre-wrap text-xs p-4 bg-gray-100 rounded-md overflow-auto max-h-[400px]">
                            {JSON.stringify(selectedAnalysis.aiAnalysis, null, 2)}
                          </pre>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="py-8 text-center">
                    <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-900">AI Analysis Pending</h3>
                    <p className="text-gray-500 mt-1">The AI is still processing this website. Check back soon.</p>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button
                    variant={selectedAnalysis.viewed ? "outline" : "default"}
                    onClick={() => handleMarkAsViewed(selectedAnalysis.id, !selectedAnalysis.viewed)}
                    disabled={markAsViewedMutation.isPending}
                  >
                    {markAsViewedMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : selectedAnalysis.viewed ? (
                      "Mark as Unread"
                    ) : (
                      "Mark as Read"
                    )}
                  </Button>
                  <Button variant="default" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
