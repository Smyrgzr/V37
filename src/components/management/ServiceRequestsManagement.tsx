"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CheckCircle, XCircle, Clock, Building2, User, Calendar } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ServiceRequest {
  id: string;
  centerName: string;
  contactPerson: string;
  serviceName: string;
  description: string;
  suggestedPrice: number;
  suggestedDuration: number;
  vehicleTypes: string[];
  category: string;
  status: "pending" | "approved" | "rejected";
  submissionDate: string;
  reviewDate?: string;
  reviewNotes?: string;
}

interface ServiceRequestsManagementProps {
  requests: ServiceRequest[];
  onApproveRequest: (id: string, notes?: string) => void;
  onRejectRequest: (id: string, reason: string) => void;
  onRequestMoreInfo: (id: string, message: string) => void;
}

export function ServiceRequestsManagement({
  requests,
  onApproveRequest,
  onRejectRequest,
  onRequestMoreInfo,
}: ServiceRequestsManagementProps) {
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | "info" | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredRequests = requests.filter(request => 
    statusFilter === "all" || request.status === statusFilter
  );

  const handleReview = () => {
    if (!selectedRequest || !reviewAction) return;

    switch (reviewAction) {
      case "approve":
        onApproveRequest(selectedRequest.id, reviewNotes);
        toast.success("Service request approved and added to global catalog");
        break;
      case "reject":
        onRejectRequest(selectedRequest.id, reviewNotes);
        toast.success("Service request rejected");
        break;
      case "info":
        onRequestMoreInfo(selectedRequest.id, reviewNotes);
        toast.success("Additional information requested");
        break;
    }

    setSelectedRequest(null);
    setReviewAction(null);
    setReviewNotes("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const pendingCount = requests.filter(r => r.status === "pending").length;
  const approvedCount = requests.filter(r => r.status === "approved").length;
  const rejectedCount = requests.filter(r => r.status === "rejected").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Service Requests Management</h2>
        <p className="text-muted-foreground">Review and manage new service suggestions from carwash centers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{requests.length}</div>
            <p className="text-xs text-muted-foreground">Total Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <Label>Filter by Status:</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service Requests ({filteredRequests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Details</TableHead>
                <TableHead>Requesting Center</TableHead>
                <TableHead>Pricing & Duration</TableHead>
                <TableHead>Vehicle Types</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.serviceName}</div>
                      <div className="text-sm text-muted-foreground">{request.description}</div>
                      <Badge variant="outline" className="mt-1 text-xs">{request.category}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{request.centerName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{request.contactPerson}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">${request.suggestedPrice}</div>
                      <div className="text-sm text-muted-foreground">{request.suggestedDuration} minutes</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {request.vehicleTypes.map(type => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{request.submissionDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {request.status === "pending" ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedRequest(request)}
                          >
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Service Request</DialogTitle>
                          </DialogHeader>
                          
                          {selectedRequest && (
                            <div className="space-y-6">
                              {/* Request Details */}
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Service Name</Label>
                                    <p className="text-sm">{selectedRequest.serviceName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Category</Label>
                                    <p className="text-sm">{selectedRequest.category}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label className="text-sm font-medium">Description</Label>
                                  <p className="text-sm mt-1">{selectedRequest.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Suggested Price</Label>
                                    <p className="text-sm">${selectedRequest.suggestedPrice}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Suggested Duration</Label>
                                    <p className="text-sm">{selectedRequest.suggestedDuration} minutes</p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Vehicle Types</Label>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {selectedRequest.vehicleTypes.map(type => (
                                      <Badge key={type} variant="outline" className="text-xs">
                                        {type}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="bg-muted p-4 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Building2 className="h-4 w-4" />
                                    <span className="font-medium">Requesting Center</span>
                                  </div>
                                  <p className="text-sm">{selectedRequest.centerName}</p>
                                  <p className="text-sm text-muted-foreground">Contact: {selectedRequest.contactPerson}</p>
                                  <p className="text-sm text-muted-foreground">Submitted: {selectedRequest.submissionDate}</p>
                                </div>
                              </div>

                              {/* Review Actions */}
                              <div className="space-y-4">
                                <Label className="text-sm font-medium">Review Action</Label>
                                <div className="flex gap-2">
                                  <Button
                                    variant={reviewAction === "approve" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setReviewAction("approve")}
                                  >
                                    <CheckCircle className="mr-1 h-4 w-4" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant={reviewAction === "reject" ? "destructive" : "outline"}
                                    size="sm"
                                    onClick={() => setReviewAction("reject")}
                                  >
                                    <XCircle className="mr-1 h-4 w-4" />
                                    Reject
                                  </Button>
                                  <Button
                                    variant={reviewAction === "info" ? "secondary" : "outline"}
                                    size="sm"
                                    onClick={() => setReviewAction("info")}
                                  >
                                    <Clock className="mr-1 h-4 w-4" />
                                    Request More Info
                                  </Button>
                                </div>

                                {reviewAction && (
                                  <div className="space-y-2">
                                    <Label htmlFor="reviewNotes">
                                      {reviewAction === "approve" && "Approval Notes (Optional)"}
                                      {reviewAction === "reject" && "Rejection Reason"}
                                      {reviewAction === "info" && "Information Request"}
                                    </Label>
                                    <Textarea
                                      id="reviewNotes"
                                      value={reviewNotes}
                                      onChange={(e) => setReviewNotes(e.target.value)}
                                      placeholder={
                                        reviewAction === "approve" 
                                          ? "Optional notes about the approval..."
                                          : reviewAction === "reject"
                                          ? "Please provide a reason for rejection..."
                                          : "What additional information do you need?"
                                      }
                                      required={reviewAction !== "approve"}
                                    />
                                  </div>
                                )}

                                <Button 
                                  onClick={handleReview} 
                                  className="w-full"
                                  disabled={!reviewAction || (reviewAction !== "approve" && !reviewNotes.trim())}
                                >
                                  {reviewAction === "approve" && "Approve & Add to Global Catalog"}
                                  {reviewAction === "reject" && "Reject Request"}
                                  {reviewAction === "info" && "Request Additional Information"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        {request.status === "approved" && "Added to catalog"}
                        {request.status === "rejected" && "Request denied"}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}