"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Alert, AlertDescription } from "../../ui/alert";
import { TrendingUp, AlertCircle, Star, BarChart3, Target, Sparkles } from "lucide-react";

interface ReviewTrendingKeywordsProps {
  reviews: any[];
}

export function ReviewTrendingKeywords({ reviews }: ReviewTrendingKeywordsProps) {
  // Mock data - in real app would be calculated from reviews
  const positiveKeywords = [
    { keyword: "professional", count: 87, trend: "+12%", percentage: 100 },
    { keyword: "thorough", count: 76, trend: "+8%", percentage: 87 },
    { keyword: "friendly", count: 64, trend: "+5%", percentage: 73 },
    { keyword: "quick", count: 58, trend: "+15%", percentage: 67 },
    { keyword: "quality", count: 52, trend: "+3%", percentage: 60 },
    { keyword: "clean", count: 47, trend: "+7%", percentage: 54 },
    { keyword: "excellent", count: 41, trend: "+10%", percentage: 47 },
    { keyword: "detailed", count: 38, trend: "+4%", percentage: 44 }
  ];

  const negativeKeywords = [
    { keyword: "waiting", count: 23, trend: "+18%", percentage: 100, color: "bg-orange-500" },
    { keyword: "expensive", count: 15, trend: "+12%", percentage: 65, color: "bg-orange-500" },
    { keyword: "rushed", count: 12, trend: "+5%", percentage: 52, color: "bg-red-500" },
    { keyword: "missed spot", count: 8, trend: "-3%", percentage: 35, color: "bg-orange-500" },
    { keyword: "communication", count: 6, trend: "+8%", percentage: 26, color: "bg-orange-500" },
    { keyword: "rude", count: 3, trend: "-15%", percentage: 13, color: "bg-red-500" }
  ];

  const topServices = [
    { service: "Premium Wax Application", mentions: 45, rating: 4.9, trend: "+8%" },
    { service: "Interior Deep Clean", mentions: 38, rating: 4.8, trend: "+12%" },
    { service: "Exterior Wash & Shine", mentions: 32, rating: 4.7, trend: "+5%" },
    { service: "Full Detailing Package", mentions: 28, rating: 4.6, trend: "+3%" },
    { service: "Express Wash", mentions: 24, rating: 4.5, trend: "+15%" },
    { service: "Ceramic Coating", mentions: 19, rating: 4.9, trend: "+22%" }
  ];

  const sentimentTrends = [
    { label: "Positive Sentiment", percentage: 78, change: "+5%", color: "bg-green-500", isPositive: true },
    { label: "Neutral Sentiment", percentage: 15, change: "0%", color: "bg-yellow-500", isPositive: null },
    { label: "Negative Sentiment", percentage: 7, change: "-5%", color: "bg-red-500", isPositive: false }
  ];

  const competitorComparison = [
    { metric: "Average Rating", yours: 4.7, industry: 4.3, isHigherBetter: true },
    { metric: "Response Rate", yours: 92, industry: 67, isHigherBetter: true },
    { metric: "Photo Reviews", yours: 34, industry: 18, isHigherBetter: true },
    { metric: "Response Time", yours: 2.5, industry: 8.2, isHigherBetter: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-1">Trending Keywords & Insights</h2>
        <p className="text-sm text-muted-foreground">
          AI-powered analysis of customer feedback and sentiment trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Sentiment Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">+71</div>
            <p className="text-xs text-muted-foreground mt-1">Very Positive</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Trending Up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Positive keywords rising</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">Issues to address</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Industry Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Top 15%</div>
            <p className="text-xs text-muted-foreground mt-1">In your category</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Positive Keywords */}
        <Card className="border-green-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <CardTitle>Top Positive Keywords</CardTitle>
                <CardDescription>Most mentioned positive words this month</CardDescription>
              </div>
              <Badge className="bg-green-500">{positiveKeywords.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positiveKeywords.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-medium text-sm">{item.keyword}</span>
                      <Badge variant="secondary" className="text-xs text-green-600">
                        {item.trend}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Keywords Requiring Attention */}
        <Card className="border-orange-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <CardTitle>Keywords Requiring Attention</CardTitle>
                <CardDescription>Negative mentions to address</CardDescription>
              </div>
              <Badge className="bg-orange-500">{negativeKeywords.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {negativeKeywords.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-medium text-sm">{item.keyword}</span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${item.trend.startsWith('+') ? 'text-orange-600' : 'text-green-600'}`}
                      >
                        {item.trend}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}

              <Alert className="mt-4 border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 text-xs">
                  <strong>Action Required:</strong> "Waiting" mentions increased by 18%. Consider reviewing queue management.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Service Mentions & Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <div className="flex-1">
                <CardTitle>Most Reviewed Services</CardTitle>
                <CardDescription>Services mentioned in reviews</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{item.service}</p>
                      <Badge variant="secondary" className="text-xs text-green-600">
                        {item.trend}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.mentions} mentions</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{item.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Trends */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <CardTitle>Sentiment Trends (Last 30 Days)</CardTitle>
                <CardDescription>How customer sentiment has changed</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentimentTrends.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.percentage}%</span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          item.isPositive === true ? 'text-green-600' : 
                          item.isPositive === false ? 'text-orange-600' : 
                          'text-gray-600'
                        }`}
                      >
                        {item.change}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}

              <Alert className="mt-4 border-green-200 bg-green-50">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 text-xs">
                  <strong>Great news!</strong> Customer satisfaction improved by 5% this month. Keep up the excellent work!
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Benchmarking */}
      <Card className="border-purple-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            <div className="flex-1">
              <CardTitle>Competitive Benchmarking</CardTitle>
              <CardDescription>How you compare to industry standards</CardDescription>
            </div>
            <Badge className="bg-purple-500">Premium Insights</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {competitorComparison.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-sm">{item.metric}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Your Performance</p>
                    <div className="text-2xl font-bold text-blue-600">
                      {item.metric.includes('Time') ? `${item.yours}h` : 
                       item.metric.includes('Rate') || item.metric.includes('Photo') ? `${item.yours}%` : 
                       item.yours}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Industry Average</p>
                    <div className="text-2xl font-bold text-gray-500">
                      {item.metric.includes('Time') ? `${item.industry}h` : 
                       item.metric.includes('Rate') || item.metric.includes('Photo') ? `${item.industry}%` : 
                       item.industry}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(item.isHigherBetter && item.yours > item.industry) || 
                   (!item.isHigherBetter && item.yours < item.industry) ? (
                    <>
                      <Badge className="bg-green-500 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Above Average
                      </Badge>
                      <span className="text-xs text-green-600 font-medium">
                        {item.isHigherBetter ? 
                          `+${Math.round(((item.yours - item.industry) / item.industry) * 100)}%` :
                          `-${Math.round(((item.industry - item.yours) / item.industry) * 100)}%`}
                      </span>
                    </>
                  ) : (
                    <>
                      <Badge className="bg-orange-500 text-xs">
                        Improvement Area
                      </Badge>
                      <span className="text-xs text-orange-600 font-medium">
                        {!item.isHigherBetter ? 
                          `+${Math.round(((item.yours - item.industry) / item.industry) * 100)}%` :
                          `-${Math.round(((item.industry - item.yours) / item.industry) * 100)}%`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI-Powered Insights */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <div className="flex-1">
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Automated recommendations based on your reviews</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm mb-1">Capitalize on "Professional" Mentions</h4>
              <p className="text-xs text-muted-foreground">
                87 customers mentioned "professional" service. Consider highlighting this in your marketing materials.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm mb-1">Address Wait Time Concerns</h4>
              <p className="text-xs text-muted-foreground">
                "Waiting" mentions up 18%. Review your queue management system or set clearer expectations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Star className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm mb-1">Promote Ceramic Coating Service</h4>
              <p className="text-xs text-muted-foreground">
                Ceramic Coating has 4.9 rating with +22% trend. Consider featuring it more prominently.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
