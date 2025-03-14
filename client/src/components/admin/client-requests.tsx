import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ProjectRequest } from "@shared/schema";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Eye, CheckCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function ClientRequests() {
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null);
  const [open, setOpen] = useState(false);

  // Fetch client requests
  const { data: requests, isLoading, error } = useQuery<ProjectRequest[]>({
    queryKey: ["/api/project-requests"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Mark request as viewed
  const markAsViewedMutation = useMutation({
    mutationFn: async ({ id, viewed }: { id: number; viewed: boolean }) => {
      const res = await apiRequest("PUT", `/api/project-requests/${id}/viewed`, { viewed });
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate the requests cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["/api/project-requests"] });
    },
  });

  const handleMarkAsViewed = (id: number, viewed: boolean) => {
    markAsViewedMutation.mutate({ id, viewed });
  };

  const openRequestDetails = (request: ProjectRequest) => {
    setSelectedRequest(request);
    setOpen(true);
    
    // If the request is not viewed yet, mark it as viewed
    if (!request.viewed) {
      handleMarkAsViewed(request.id, true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-gray-500">Loading client requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 px-4 text-center">
        <p className="text-red-500 font-medium">Error loading client requests</p>
        <p className="text-gray-500 text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="py-8 px-4 text-center border rounded-lg">
        <p className="text-gray-500 font-medium">No client requests yet</p>
        <p className="text-gray-400 text-sm mt-2">Client requests will appear here when submitted</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Total: {requests.length} {requests.length === 1 ? "request" : "requests"}
          </h3>
          <p className="text-xs text-gray-400">
            {requests.filter(req => !req.viewed).length} unread
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/project-requests"] })}
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
              <TableHead>Client</TableHead>
              <TableHead>Project Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id} className={!request.viewed ? "bg-blue-50" : ""}>
                <TableCell>
                  {request.viewed ? (
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
                  <div className="font-medium">{request.name}</div>
                  <div className="text-xs text-gray-500">{request.email}</div>
                </TableCell>
                <TableCell>
                  <span className="capitalize">{request.projectType.replace("-", " ")}</span>
                </TableCell>
                <TableCell>
                  <span title={new Date(request.createdAt).toLocaleString()}>
                    {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => openRequestDetails(request)}
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

      {/* Request Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Project Request from {selectedRequest.name}
                  {!selectedRequest.viewed && <Badge variant="secondary" className="ml-2">New</Badge>}
                </DialogTitle>
                <DialogDescription>
                  Submitted {formatDistanceToNow(new Date(selectedRequest.createdAt), { addSuffix: true })}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                    <div className="mt-1 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedRequest.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedRequest.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedRequest.phone}</p>
                      {selectedRequest.company && (
                        <p><span className="font-medium">Company:</span> {selectedRequest.company}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Project Details</h4>
                    <div className="mt-1 text-sm">
                      <p><span className="font-medium">Type:</span> {selectedRequest.projectType.replace("-", " ")}</p>
                      <p><span className="font-medium">Timeline:</span> {selectedRequest.timeline}</p>
                      <p><span className="font-medium">Budget:</span> {selectedRequest.budgetRange}</p>
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="description">
                    <AccordionTrigger>Project Description</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {selectedRequest.projectDescription || "No description provided"}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="features">
                    <AccordionTrigger>Selected Features</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedRequest.features.map((feature, index) => (
                          <Badge key={index} variant="outline">{feature.replace("-", " ")}</Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="audience">
                    <AccordionTrigger>Target Audience & Competitors</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Target Audience:</p>
                          <p className="text-sm text-gray-700">{selectedRequest.targetAudience || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Competitors/Inspiration:</p>
                          <p className="text-sm text-gray-700">{selectedRequest.competitors || "Not specified"}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="priorities">
                    <AccordionTrigger>Project Priorities</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {selectedRequest.priorities && (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <p className="text-sm font-medium">Speed</p>
                              <p className="text-sm text-gray-700">Priority: {selectedRequest.priorities.speed}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">Quality</p>
                              <p className="text-sm text-gray-700">Priority: {selectedRequest.priorities.quality}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">Cost</p>
                              <p className="text-sm text-gray-700">Priority: {selectedRequest.priorities.cost}</p>
                            </div>
                          </div>
                        )}
                        {selectedRequest.additionalInfo && (
                          <div className="mt-4">
                            <p className="text-sm font-medium">Additional Information:</p>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRequest.additionalInfo}</p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-between pt-4">
                  <Button
                    variant={selectedRequest.viewed ? "outline" : "default"}
                    onClick={() => handleMarkAsViewed(selectedRequest.id, !selectedRequest.viewed)}
                    disabled={markAsViewedMutation.isPending}
                  >
                    {markAsViewedMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : selectedRequest.viewed ? (
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
