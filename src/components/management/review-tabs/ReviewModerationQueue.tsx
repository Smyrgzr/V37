"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Alert, AlertDescription } from "../../ui/alert";
import { CheckCircle2, AlertCircle, Reply, EyeOff, Star } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Review {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  reviewText: string;
  photos: string[];
  serviceName: string;
  branchId: string;
  branchName: string;
  date: string;
  status: "pending" | "published" | "hidden";
  response?: {
    text: string;
    respondedBy: string;
    respondedAt: string;
  };
  helpful: number;
  notHelpful: number;
  verified: boolean;
}

interface ReviewModerationQueueProps {
  reviews: Review[];
  onToggleVisibility: (reviewId: string) => void;
  onSelectForResponse: (review: Review) => void;
}

export function ReviewModerationQueue({
  reviews,
  onToggleVisibility,
  onSelectForResponse
}: ReviewModerationQueueProps) {
  const pendingReviews = reviews.filter(r => r.status === "pending");

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const handlePublishAll = () => {
    pendingReviews.forEach(r => onToggleVisibility(r.id));
    toast.success(`${pendingReviews.length} reviews published successfully`);
  };

  return (
    <div className="space-y-4">
      {/* Alert for pending reviews */}
      {pendingReviews.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            You have {pendingReviews.length} reviews waiting for moderation. Please review and publish or hide them.
          </AlertDescription>
        </Alert>
      )}

      {/* Moderation Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingReviews.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting moderation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Moderation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground mt-1">Reviews approved</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Reviews List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pending Reviews Queue</CardTitle>
              <CardDescription>Reviews awaiting moderation</CardDescription>
            </div>
            {pendingReviews.length > 0 && (
              <Button size="sm" onClick={handlePublishAll}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Publish All ({pendingReviews.length})
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingReviews.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                <p className="text-sm text-muted-foreground">
                  No reviews pending moderation. Great job keeping up with customer feedback!
                </p>
              </div>
            ) : (
              pendingReviews.map(review => (
                <div key={review.id} className="border rounded-lg p-4 space-y-4 hover:border-primary/50 transition-colors">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.customerAvatar} />
                        <AvatarFallback className="text-lg">{review.customerName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{review.customerName}</h4>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{review.branchName}</span>
                          <span>•</span>
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{new Date(review.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    {renderStars(review.rating)}
                  </div>

                  {/* Service Badge */}
                  <Badge variant="secondary" className="text-xs">
                    {review.serviceName}
                  </Badge>

                  {/* Review Text */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm leading-relaxed">{review.reviewText}</p>
                  </div>

                  {/* Photos if any */}
                  {review.photos.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{review.photos.length} photo{review.photos.length > 1 ? 's' : ''} attached</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        onToggleVisibility(review.id);
                        toast.success("Review published successfully");
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Publish
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => onSelectForResponse(review)}
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Respond & Publish
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        onToggleVisibility(review.id);
                        toast.success("Review hidden");
                      }}
                    >
                      <EyeOff className="h-4 w-4 mr-1" />
                      Hide
                    </Button>
                  </div>

                  {/* Priority Indicator */}
                  {review.rating <= 2 && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800 text-xs">
                        <strong>Low rating alert:</strong> Consider responding personally to address concerns.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Moderation Tips */}
      {pendingReviews.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-sm text-blue-900">Moderation Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 space-y-2">
            <p>• Respond to negative reviews within 24 hours to show you care</p>
            <p>• Thank customers for positive feedback to encourage more reviews</p>
            <p>• Never hide reviews unless they violate guidelines</p>
            <p>• Use templates for consistency but personalize when possible</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
