"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  Star, 
  MessageSquare, 
  Image as ImageIcon, 
  TrendingUp, 
  TrendingDown,
  Eye,
  EyeOff,
  Reply,
  Filter,
  Search,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  MapPin,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  FileText,
  Award,
  Target,
  Zap,
  Mail
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { ReviewModerationQueue } from "./review-tabs/ReviewModerationQueue";
import { ReviewTemplates } from "./review-tabs/ReviewTemplates";
import { ReviewTrendingKeywords } from "./review-tabs/ReviewTrendingKeywords";

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

interface ReviewFeedbackManagementProps {
  reviews: Review[];
  branches: any[];
  onRespondToReview: (reviewId: string, response: string) => void;
  onToggleReviewVisibility: (reviewId: string) => void;
  userRole: "root_owner" | "carwash_owner" | "carwash_admin";
  assignedBranches?: string[];
}

export function ReviewFeedbackManagement({
  reviews,
  branches,
  onRespondToReview,
  onToggleReviewVisibility,
  userRole,
  assignedBranches
}: ReviewFeedbackManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState("");
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // Filter reviews based on user role
  const accessibleReviews = userRole === "carwash_admin" && assignedBranches
    ? reviews.filter(review => assignedBranches.includes(review.branchId))
    : reviews;

  // Filter reviews based on search and filters
  const filteredReviews = accessibleReviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.reviewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === "all" || review.branchId === selectedBranch;
    const matchesRating = selectedRating === "all" || review.rating === parseInt(selectedRating);
    const matchesStatus = selectedStatus === "all" || review.status === selectedStatus;

    return matchesSearch && matchesBranch && matchesRating && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    totalReviews: accessibleReviews.length,
    averageRating: accessibleReviews.length > 0 
      ? (accessibleReviews.reduce((sum, r) => sum + r.rating, 0) / accessibleReviews.length).toFixed(1)
      : "0.0",
    pendingReviews: accessibleReviews.filter(r => r.status === "pending").length,
    responseRate: accessibleReviews.length > 0
      ? Math.round((accessibleReviews.filter(r => r.response).length / accessibleReviews.length) * 100)
      : 0,
    withPhotos: accessibleReviews.filter(r => r.photos.length > 0).length,
    fiveStarCount: accessibleReviews.filter(r => r.rating === 5).length,
    fourStarCount: accessibleReviews.filter(r => r.rating === 4).length,
    threeStarCount: accessibleReviews.filter(r => r.rating === 3).length,
    twoStarCount: accessibleReviews.filter(r => r.rating === 2).length,
    oneStarCount: accessibleReviews.filter(r => r.rating === 1).length,
  };

  // Calculate rating distribution percentages
  const getRatingPercentage = (count: number) => {
    return accessibleReviews.length > 0 ? (count / accessibleReviews.length) * 100 : 0;
  };

  // Get trend comparison (mock - in real app would compare to previous period)
  const getTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(Math.round(change)),
      direction: change >= 0 ? "up" : "down"
    };
  };

  const averageRatingTrend = getTrend(parseFloat(stats.averageRating), 4.5);
  const totalReviewsTrend = getTrend(stats.totalReviews, stats.totalReviews - 15);

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const starSize = size === "sm" ? 16 : 20;
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={starSize}
            className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const handleRespondToReview = () => {
    if (selectedReview && responseText.trim()) {
      onRespondToReview(selectedReview.id, responseText);
      setResponseText("");
      setSelectedReview(null);
      toast.success("Response posted successfully");
    }
  };

  const handleViewPhotos = (photos: string[]) => {
    setSelectedPhotos(photos);
    setShowPhotoGallery(true);
  };

  const getStatusBadge = (status: Review["status"]) => {
    switch (status) {
      case "published":
        return <Badge variant="default" className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" />Published</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "hidden":
        return <Badge variant="outline"><EyeOff className="h-3 w-3 mr-1" />Hidden</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-2xl font-bold">{stats.averageRating}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              {averageRatingTrend.direction === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={averageRatingTrend.direction === "up" ? "text-green-500" : "text-red-500"}>
                {averageRatingTrend.value}%
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-2xl font-bold">{stats.totalReviews}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">{totalReviewsTrend.value}%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Reply className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-2xl font-bold">{stats.responseRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {accessibleReviews.filter(r => r.response).length} of {stats.totalReviews} responded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.withPhotos} reviews with photos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all-reviews" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all-reviews">All Reviews</TabsTrigger>
          <TabsTrigger value="moderation">
            Moderation
            {stats.pendingReviews > 0 && (
              <Badge className="ml-2 bg-orange-500">{stats.pendingReviews}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>

        {/* All Reviews Tab */}
        <TabsContent value="all-reviews" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters & Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {branches
                      .filter(b => userRole === "carwash_owner" || assignedBranches?.includes(b.id))
                      .map(branch => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>

                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredReviews.length === 0 ? (
              <Card className="lg:col-span-2">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">No reviews found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3 flex-1">
                          <Avatar>
                            <AvatarImage src={review.customerAvatar} />
                            <AvatarFallback>{review.customerName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{review.customerName}</h4>
                              {review.verified && (
                                <Badge variant="outline" className="text-xs">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Verified Customer
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {review.branchName}
                              </div>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(review.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(review.status)}
                        </div>
                      </div>

                      {/* Rating & Service */}
                      <div className="flex items-center gap-4">
                        {renderStars(review.rating, "lg")}
                        <Badge variant="secondary">{review.serviceName}</Badge>
                      </div>

                      {/* Review Text */}
                      <p className="text-sm">{review.reviewText}</p>

                      {/* Photos */}
                      {review.photos.length > 0 && (
                        <div className="flex gap-2">
                          {review.photos.slice(0, 4).map((photo, idx) => (
                            <div
                              key={idx}
                              className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => handleViewPhotos(review.photos)}
                            >
                              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-blue-500" />
                              </div>
                            </div>
                          ))}
                          {review.photos.length > 4 && (
                            <div
                              className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center cursor-pointer hover:bg-muted transition-colors"
                              onClick={() => handleViewPhotos(review.photos)}
                            >
                              <span className="text-sm font-medium">+{review.photos.length - 4}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Response */}
                      {review.response && (
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Reply className="h-4 w-4" />
                            Response from {review.response.respondedBy}
                          </div>
                          <p className="text-sm">{review.response.text}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.response.respondedAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {review.helpful}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsDown className="h-4 w-4" />
                            {review.notHelpful}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!review.response && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedReview(review)}
                            >
                              <Reply className="h-4 w-4 mr-1" />
                              Respond
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              onToggleReviewVisibility(review.id);
                              toast.success(
                                review.status === "hidden" 
                                  ? "Review published successfully" 
                                  : "Review hidden successfully"
                              );
                            }}
                          >
                            {review.status === "hidden" ? (
                              <>
                                <Eye className="h-4 w-4 mr-1" />
                                Publish
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-4 w-4 mr-1" />
                                Hide
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Breakdown of customer ratings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = rating === 5 ? stats.fiveStarCount
                    : rating === 4 ? stats.fourStarCount
                    : rating === 3 ? stats.threeStarCount
                    : rating === 2 ? stats.twoStarCount
                    : stats.oneStarCount;
                  const percentage = getRatingPercentage(count);

                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{rating}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Top Performing Services */}
            <Card>
              <CardHeader>
                <CardTitle>Top Rated Services</CardTitle>
                <CardDescription>Services with highest ratings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Premium Wax Application", rating: 4.9, reviews: 45 },
                  { name: "Interior Cleaning", rating: 4.8, reviews: 67 },
                  { name: "Exterior Wash", rating: 4.7, reviews: 89 },
                  { name: "Complete Care Package", rating: 4.6, reviews: 34 },
                  { name: "Tire Shine & Treatment", rating: 4.5, reviews: 52 }
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.reviews} reviews</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Branch Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Branch Performance</CardTitle>
                <CardDescription>Average ratings by branch</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {branches
                  .filter(b => userRole === "carwash_owner" || assignedBranches?.includes(b.id))
                  .slice(0, 5)
                  .map((branch) => {
                    const branchReviews = accessibleReviews.filter(r => r.branchId === branch.id);
                    const avgRating = branchReviews.length > 0
                      ? (branchReviews.reduce((sum, r) => sum + r.rating, 0) / branchReviews.length).toFixed(1)
                      : "0.0";

                    return (
                      <div key={branch.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{branch.name}</p>
                          <p className="text-xs text-muted-foreground">{branchReviews.length} reviews</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {renderStars(Math.round(parseFloat(avgRating)))}
                          <span className="text-sm font-medium w-8">{avgRating}</span>
                        </div>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            {/* Recent Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Sentiment</CardTitle>
                <CardDescription>Analysis of review feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Positive Sentiment</span>
                    <span className="text-sm font-medium text-green-600">78%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "78%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Neutral Sentiment</span>
                    <span className="text-sm font-medium text-yellow-600">15%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: "15%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Negative Sentiment</span>
                    <span className="text-sm font-medium text-red-600">7%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: "7%" }} />
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <h4 className="text-sm font-medium">Common Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {["professional", "quick", "thorough", "friendly", "clean", "quality"].map(keyword => (
                      <Badge key={keyword} variant="secondary">{keyword}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Photo Gallery Tab */}
        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Photos</CardTitle>
              <CardDescription>Photos uploaded by customers with their reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {accessibleReviews
                  .filter(r => r.photos.length > 0)
                  .flatMap(r => r.photos.map(photo => ({ photo, review: r })))
                  .slice(0, 12)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 cursor-pointer hover:opacity-80 transition-opacity group"
                      onClick={() => handleViewPhotos([item.photo])}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-blue-500" />
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3">
                        <div className="flex items-center gap-1 mb-1">
                          {renderStars(item.review.rating)}
                        </div>
                        <p className="text-xs text-center line-clamp-2">{item.review.customerName}</p>
                        <p className="text-xs text-white/80">{item.review.serviceName}</p>
                      </div>
                    </div>
                  ))}
              </div>
              {accessibleReviews.filter(r => r.photos.length > 0).length === 0 && (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No photos yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Customer photos will appear here once they're uploaded
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Moderation Queue Tab */}
        <TabsContent value="moderation" className="space-y-4">
          <ReviewModerationQueue
            reviews={accessibleReviews}
            onToggleVisibility={onToggleReviewVisibility}
            onSelectForResponse={setSelectedReview}
          />
        </TabsContent>

        {/* Response Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <ReviewTemplates
            onUseTemplate={(text) => setResponseText(text)}
          />
        </TabsContent>

        {/* Trending Keywords Tab */}
        <TabsContent value="trending" className="space-y-4">
          <ReviewTrendingKeywords
            reviews={accessibleReviews}
          />
        </TabsContent>
      </Tabs>

      {/* Response Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Review</DialogTitle>
            <DialogDescription>
              Write a response to {selectedReview?.customerName}'s review
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {selectedReview && renderStars(selectedReview.rating)}
              </div>
              <p className="text-sm">{selectedReview?.reviewText}</p>
            </div>
            <Textarea
              placeholder="Write your response..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedReview(null)}>
                Cancel
              </Button>
              <Button onClick={handleRespondToReview} disabled={!responseText.trim()}>
                Post Response
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Gallery Dialog */}
      <Dialog open={showPhotoGallery} onOpenChange={setShowPhotoGallery}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customer Photos</DialogTitle>
            <DialogDescription>
              View photos uploaded by customers with their reviews
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {selectedPhotos.map((photo, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-24 w-24 text-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}