import React, { useState } from 'react';
import {
  Brain,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  AlertTriangle,
  Target,
  Zap,
  BarChart3,
  Lightbulb,
  Clock,
  Star,
  MessageSquare,
  Shield,
  ChevronRight,
  Sparkles,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';

interface AIDashboardProps {
  userRole: 'root_owner' | 'carwash_owner' | 'carwash_admin';
  branchId?: string;
  carwashOwnerId?: string;
}

export default function AIDashboard({ userRole, branchId, carwashOwnerId }: AIDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data - In production, this would come from AI service APIs
  const aiInsights = {
    demandForecast: {
      next7Days: 156,
      confidence: 92,
      trend: '+12%',
      peakDay: 'Saturday',
      peakHour: '10 AM - 12 PM',
    },
    customerSegments: [
      { name: 'VIP Regulars', count: 234, percentage: 18, trend: '+5%', value: 'high' },
      { name: 'Growing Customers', count: 567, percentage: 43, trend: '+15%', value: 'medium' },
      { name: 'At-Risk', count: 89, percentage: 7, trend: '-3%', value: 'critical' },
      { name: 'Occasional', count: 421, percentage: 32, trend: '+2%', value: 'low' },
    ],
    revenueOptimization: {
      currentRevenue: 45680,
      optimizedRevenue: 52340,
      potential: '+14.6%',
      actions: 3,
    },
    sentimentScore: {
      overall: 4.6,
      trend: '+0.3',
      positive: 87,
      negative: 5,
      neutral: 8,
    },
    smartRecommendations: [
      {
        id: 1,
        type: 'capacity',
        priority: 'high',
        title: 'Increase Saturday morning capacity',
        description: 'Our AI predicts 23% more demand this Saturday. Consider adding 2 more time slots.',
        impact: '+$1,200 potential revenue',
        action: 'Adjust Schedule',
      },
      {
        id: 2,
        type: 'customer',
        priority: 'critical',
        title: '89 customers at risk of churning',
        description: 'These customers haven\'t visited in 45+ days. Launch a win-back campaign.',
        impact: 'Retain $12,400 lifetime value',
        action: 'Create Campaign',
      },
      {
        id: 3,
        type: 'pricing',
        priority: 'medium',
        title: 'Premium package pricing opportunity',
        description: 'Your premium package is underpriced by 15% compared to demand elasticity.',
        impact: '+$890/month',
        action: 'Review Pricing',
      },
      {
        id: 4,
        type: 'operations',
        priority: 'low',
        title: 'Optimize employee shifts',
        description: 'Tuesday afternoons are overstaffed. Reduce by 1 worker to save costs.',
        impact: '-$480/month costs',
        action: 'Update Schedule',
      },
    ],
    upcomingAlerts: [
      {
        date: 'Tomorrow',
        type: 'demand',
        message: 'High demand predicted (180% of average)',
        action: 'Review capacity',
      },
      {
        date: 'Next Week',
        type: 'maintenance',
        message: 'Bay 3 equipment maintenance recommended',
        action: 'Schedule service',
      },
      {
        date: 'This Month',
        type: 'campaign',
        message: 'Best time to launch spring promotion',
        action: 'Plan campaign',
      },
    ],
    modelMetrics: {
      demandAccuracy: 94,
      segmentationQuality: 88,
      sentimentAccuracy: 91,
      predictionSpeed: '0.3s',
      modelsActive: 8,
    },
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case 'capacity':
        return Calendar;
      case 'customer':
        return Users;
      case 'pricing':
        return DollarSign;
      case 'operations':
        return Activity;
      default:
        return Lightbulb;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">AI Intelligence Dashboard</h1>
              <p className="text-gray-600">
                AI-powered insights and recommendations for your business
              </p>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="gap-2">
          <Sparkles className="h-3 w-3" />
          {aiInsights.modelMetrics.modelsActive} AI Models Active
        </Badge>
      </div>

      {/* AI Health Status Alert */}
      <Alert className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <Sparkles className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-gray-700">
          All AI models are operational. Last updated: 2 minutes ago • Avg accuracy: {aiInsights.modelMetrics.demandAccuracy}%
        </AlertDescription>
      </Alert>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-gradient-to-br from-white to-purple-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-700">Demand Forecast</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{aiInsights.demandForecast.next7Days} bookings</div>
            <p className="text-gray-600">Next 7 days</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-green-700 bg-green-100">
                {aiInsights.demandForecast.trend}
              </Badge>
              <span className="text-gray-500">{aiInsights.demandForecast.confidence}% confident</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-700">Revenue Potential</CardTitle>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">
              ${aiInsights.revenueOptimization.optimizedRevenue.toLocaleString()}
            </div>
            <p className="text-gray-600">Optimized monthly</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-blue-700 bg-blue-100">
                {aiInsights.revenueOptimization.potential} potential
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-white to-green-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-700">Sentiment Score</CardTitle>
              <Star className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{aiInsights.sentimentScore.overall} / 5.0</div>
            <p className="text-gray-600">Customer sentiment</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-green-700 bg-green-100">
                {aiInsights.sentimentScore.trend}
              </Badge>
              <span className="text-gray-500">{aiInsights.sentimentScore.positive}% positive</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-white to-orange-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-700">At-Risk Customers</CardTitle>
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">
              {aiInsights.customerSegments.find((s) => s.name === 'At-Risk')?.count}
            </div>
            <p className="text-gray-600">Need attention</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-orange-700 bg-orange-100">
                $12.4K at stake
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="gap-2">
            <Lightbulb className="h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="customers" className="gap-2">
            <Users className="h-4 w-4" />
            Customer Intelligence
          </TabsTrigger>
          <TabsTrigger value="predictions" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            AI Performance
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Smart Recommendations Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                  Top Recommendations
                </CardTitle>
                <CardDescription>AI-generated action items for maximum impact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.smartRecommendations.slice(0, 3).map((rec) => {
                  const Icon = getPriorityIcon(rec.type);
                  return (
                    <div key={rec.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg mt-0.5">
                          <Icon className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-gray-900">{rec.title}</h4>
                            <Badge variant={getPriorityColor(rec.priority)}>
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mt-1">{rec.description}</p>
                          <p className="text-green-700 mt-2">{rec.impact}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Button variant="outline" className="w-full gap-2">
                  View All Recommendations
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Upcoming Alerts
                </CardTitle>
                <CardDescription>Proactive notifications from AI models</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.upcomingAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{alert.date}</span>
                        <Badge variant="outline">{alert.type}</Badge>
                      </div>
                      <p className="text-gray-600 mt-1">{alert.message}</p>
                      <Button variant="link" className="p-0 h-auto mt-2">
                        {alert.action} →
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Overview</CardTitle>
              <CardDescription>Real-time metrics from all active AI models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-gray-600 mb-2">Demand Forecast</div>
                  <div className="flex items-center gap-2">
                    <Progress value={aiInsights.modelMetrics.demandAccuracy} className="flex-1" />
                    <span className="text-gray-900">{aiInsights.modelMetrics.demandAccuracy}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Segmentation</div>
                  <div className="flex items-center gap-2">
                    <Progress value={aiInsights.modelMetrics.segmentationQuality} className="flex-1" />
                    <span className="text-gray-900">{aiInsights.modelMetrics.segmentationQuality}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Sentiment</div>
                  <div className="flex items-center gap-2">
                    <Progress value={aiInsights.modelMetrics.sentimentAccuracy} className="flex-1" />
                    <span className="text-gray-900">{aiInsights.modelMetrics.sentimentAccuracy}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Response Time</div>
                  <div className="text-gray-900">{aiInsights.modelMetrics.predictionSpeed}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Active Models</div>
                  <div className="text-gray-900">{aiInsights.modelMetrics.modelsActive} models</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All AI Recommendations</CardTitle>
              <CardDescription>
                Prioritized actions based on potential impact and urgency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiInsights.smartRecommendations.map((rec) => {
                const Icon = getPriorityIcon(rec.type);
                return (
                  <div
                    key={rec.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
                        <Icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-gray-900">{rec.title}</h3>
                              <Badge variant={getPriorityColor(rec.priority)}>
                                {rec.priority}
                              </Badge>
                              <Badge variant="outline">{rec.type}</Badge>
                            </div>
                            <p className="text-gray-600">{rec.description}</p>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-2 text-green-700">
                                <TrendingUp className="h-4 w-4" />
                                <span>{rec.impact}</span>
                              </div>
                            </div>
                          </div>
                          <Button className="gap-2">
                            {rec.action}
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Intelligence Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segmentation</CardTitle>
                <CardDescription>AI-powered customer groups based on behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.customerSegments.map((segment) => (
                  <div key={segment.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Users className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-gray-900">{segment.name}</div>
                          <div className="text-gray-600">
                            {segment.count} customers ({segment.percentage}%)
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            segment.value === 'critical'
                              ? 'destructive'
                              : segment.value === 'high'
                                ? 'default'
                                : 'secondary'
                          }
                        >
                          {segment.value} value
                        </Badge>
                        <div className="text-gray-600 mt-1">{segment.trend}</div>
                      </div>
                    </div>
                    <Progress value={segment.percentage} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Prevention</CardTitle>
                <CardDescription>Customers at risk and recommended actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-gray-700">
                    89 customers haven't visited in 45+ days and are at risk of churning
                  </AlertDescription>
                </Alert>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900">High-value at-risk</span>
                      <Badge variant="destructive">23 customers</Badge>
                    </div>
                    <Progress value={78} className="mb-2" />
                    <p className="text-gray-600">78% churn probability • $8,900 LTV at stake</p>
                    <Button className="w-full mt-3 gap-2">
                      <Target className="h-4 w-4" />
                      Create Win-Back Campaign
                    </Button>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900">Medium-risk</span>
                      <Badge variant="secondary">66 customers</Badge>
                    </div>
                    <Progress value={45} className="mb-2" />
                    <p className="text-gray-600">45% churn probability • $3,500 LTV at stake</p>
                    <Button variant="outline" className="w-full mt-3 gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Send Re-engagement Offer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Demand Forecast</CardTitle>
                <CardDescription>7-day booking predictions with confidence intervals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">Next 7 Days Total</span>
                    <Badge variant="secondary" className="bg-purple-100">
                      {aiInsights.demandForecast.confidence}% confident
                    </Badge>
                  </div>
                  <div className="text-gray-900 mb-1">
                    {aiInsights.demandForecast.next7Days} bookings
                  </div>
                  <div className="text-green-700">{aiInsights.demandForecast.trend} vs last week</div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-700">Peak Periods</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-900">{aiInsights.demandForecast.peakDay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-900">{aiInsights.demandForecast.peakHour}</span>
                  </div>
                </div>
                <Alert className="bg-blue-50 border-blue-200">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-gray-700">
                    Consider increasing capacity during peak hours to capture additional revenue
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Optimization</CardTitle>
                <CardDescription>AI-suggested pricing and package adjustments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <div className="text-gray-700 mb-3">Optimized Monthly Revenue</div>
                  <div className="text-gray-900 mb-1">
                    ${aiInsights.revenueOptimization.optimizedRevenue.toLocaleString()}
                  </div>
                  <div className="text-green-700">
                    {aiInsights.revenueOptimization.potential} potential increase
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-700 mb-2">Recommended Actions ({aiInsights.revenueOptimization.actions})</div>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Adjust premium package pricing</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Enable dynamic weekend pricing</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Create upsell package bundle</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Performance</CardTitle>
              <CardDescription>Accuracy metrics and health status for all active models</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">Demand Forecasting</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Healthy
                    </Badge>
                  </div>
                  <Progress value={aiInsights.modelMetrics.demandAccuracy} className="mb-2" />
                  <div className="text-gray-900">{aiInsights.modelMetrics.demandAccuracy}% accuracy</div>
                  <div className="text-gray-600 mt-1">Last trained: 2 days ago</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">Customer Segmentation</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Healthy
                    </Badge>
                  </div>
                  <Progress value={aiInsights.modelMetrics.segmentationQuality} className="mb-2" />
                  <div className="text-gray-900">{aiInsights.modelMetrics.segmentationQuality}% quality</div>
                  <div className="text-gray-600 mt-1">Last trained: 5 days ago</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">Sentiment Analysis</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Healthy
                    </Badge>
                  </div>
                  <Progress value={aiInsights.modelMetrics.sentimentAccuracy} className="mb-2" />
                  <div className="text-gray-900">{aiInsights.modelMetrics.sentimentAccuracy}% accuracy</div>
                  <div className="text-gray-600 mt-1">Last trained: 1 day ago</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">Churn Prediction</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Healthy
                    </Badge>
                  </div>
                  <Progress value={89} className="mb-2" />
                  <div className="text-gray-900">89% accuracy</div>
                  <div className="text-gray-600 mt-1">Last trained: 3 days ago</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">Price Optimization</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Healthy
                    </Badge>
                  </div>
                  <Progress value={92} className="mb-2" />
                  <div className="text-gray-900">92% accuracy</div>
                  <div className="text-gray-600 mt-1">Last trained: 1 day ago</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">No-Show Prediction</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      Retraining
                    </Badge>
                  </div>
                  <Progress value={86} className="mb-2" />
                  <div className="text-gray-900">86% accuracy</div>
                  <div className="text-gray-600 mt-1">Retraining in progress...</div>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-gray-700">
                  All models are monitored 24/7 for accuracy drift. Automatic retraining is triggered when
                  performance drops below thresholds.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Statistics</CardTitle>
              <CardDescription>AI infrastructure metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-gray-600 mb-1">Predictions Today</div>
                  <div className="text-gray-900">12,847</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Avg Response Time</div>
                  <div className="text-gray-900">{aiInsights.modelMetrics.predictionSpeed}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Active Models</div>
                  <div className="text-gray-900">{aiInsights.modelMetrics.modelsActive}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">System Uptime</div>
                  <div className="text-gray-900">99.97%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-lg shadow-sm">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-0.5 text-sm font-medium">Unlock More AI Features</h3>
              <p className="text-gray-600 text-xs">
                Get access to advanced predictive models, custom AI training, and priority support
              </p>
            </div>
            <Button size="sm" className="gap-2">
              Upgrade Plan
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}