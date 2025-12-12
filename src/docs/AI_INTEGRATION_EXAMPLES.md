# AI Integration Examples - Component-by-Component Guide

This document provides specific code examples for integrating AI features into each existing Letwash component.

---

## Table of Contents

1. [AnalyticsManagement.tsx](#analyticsmanagement)
2. [BookingManagement.tsx](#bookingmanagement)
3. [CapacityPlanningManagement.tsx](#capacityplanningmanagement)
4. [CustomerManagement.tsx](#customermanagement)
5. [CampaignManagement.tsx](#campaignmanagement)
6. [ReviewFeedbackManagement.tsx](#reviewfeedbackmanagement)
7. [RevenueManagement.tsx](#revenuemanagement)
8. [ServiceRequestsManagement.tsx](#servicerequestsmanagement)
9. [EmployeesManagement.tsx](#employeesmanagement)
10. [BranchManagement.tsx](#branchmanagement)

---

## AnalyticsManagement

### AI Features to Add:
- Predictive analytics section
- AI-generated insights
- Anomaly detection alerts
- What-if analysis tool

### Code Example:

```typescript
// Add to AnalyticsManagement.tsx

import { Sparkles, TrendingUp, AlertTriangle, Brain } from 'lucide-react';

// Add new state for AI insights
const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
const [demandForecast, setDemandForecast] = useState<DemandForecast | null>(null);
const [anomalies, setAnomalies] = useState<Anomaly[]>([]);

// Fetch AI insights
useEffect(() => {
  const fetchAIInsights = async () => {
    try {
      const response = await fetch(`/api/ai/analytics/insights?branchId=${selectedBranch}`);
      const data = await response.json();
      setAiInsights(data.insights);
      setDemandForecast(data.forecast);
      setAnomalies(data.anomalies);
    } catch (error) {
      console.error('Failed to fetch AI insights:', error);
    }
  };
  
  fetchAIInsights();
}, [selectedBranch, dateRange]);

// Add AI Insights Section in JSX
<Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Brain className="h-5 w-5 text-purple-600" />
      AI-Powered Insights
    </CardTitle>
    <CardDescription>
      Predictive analytics and intelligent recommendations
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Demand Forecast */}
    {demandForecast && (
      <div className="p-4 border border-purple-200 rounded-lg bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900">7-Day Demand Forecast</h3>
          <Badge variant="secondary" className="bg-purple-100">
            {demandForecast.confidence}% confident
          </Badge>
        </div>
        <div className="text-gray-900 mb-1">
          {demandForecast.totalBookings} expected bookings
        </div>
        <div className="flex items-center gap-2 text-green-700">
          <TrendingUp className="h-4 w-4" />
          <span>{demandForecast.trend} vs last week</span>
        </div>
        <div className="mt-3 text-gray-600">
          Peak: {demandForecast.peakDay} at {demandForecast.peakHour}
        </div>
      </div>
    )}

    {/* AI Insights */}
    <div className="space-y-2">
      <h4 className="text-gray-700">Key Insights</h4>
      {aiInsights.map((insight, idx) => (
        <Alert key={idx} className={insight.type === 'positive' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}>
          <Sparkles className="h-4 w-4" />
          <AlertDescription className="text-gray-700">
            {insight.message}
          </AlertDescription>
        </Alert>
      ))}
    </div>

    {/* Anomaly Detection */}
    {anomalies.length > 0 && (
      <div className="space-y-2">
        <h4 className="text-gray-700 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          Anomalies Detected
        </h4>
        {anomalies.map((anomaly, idx) => (
          <div key={idx} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="text-gray-900 mb-1">{anomaly.title}</div>
            <div className="text-gray-600">{anomaly.description}</div>
            <Button variant="link" className="p-0 h-auto mt-2 text-orange-700">
              Investigate →
            </Button>
          </div>
        ))}
      </div>
    )}

    <Button variant="outline" className="w-full gap-2">
      <Brain className="h-4 w-4" />
      View Full AI Dashboard
    </Button>
  </CardContent>
</Card>
```

### TypeScript Interfaces:

```typescript
interface AIInsight {
  id: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  message: string;
  timestamp: string;
  confidence: number;
}

interface DemandForecast {
  totalBookings: number;
  confidence: number;
  trend: string;
  peakDay: string;
  peakHour: string;
  predictions: Array<{
    date: string;
    hour?: number;
    bookings: number;
  }>;
}

interface Anomaly {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: string;
}
```

---

## BookingManagement

### AI Features to Add:
- Smart time slot recommendations
- No-show prediction
- Booking optimization suggestions
- Wait time predictions

### Code Example:

```typescript
// Add to BookingManagement.tsx

import { Sparkles, Clock, AlertTriangle, Zap } from 'lucide-react';

// Add state for AI features
const [smartSlots, setSmartSlots] = useState<SmartSlot[]>([]);
const [showNoShowRisk, setShowNoShowRisk] = useState(false);

// Fetch smart slot recommendations
const fetchSmartSlots = async (serviceIds: string[], customerPreferences?: any) => {
  try {
    const response = await fetch('/api/ai/schedule/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        branchId: selectedBranch,
        serviceIds,
        customerPreferences,
      }),
    });
    const data = await response.json();
    setSmartSlots(data.recommendedSlots);
  } catch (error) {
    console.error('Failed to fetch smart slots:', error);
  }
};

// Add AI-Enhanced Time Slot Selector
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Sparkles className="h-5 w-5 text-purple-600" />
      AI-Recommended Time Slots
    </CardTitle>
    <CardDescription>
      Optimized booking times based on demand and preferences
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-3">
    {smartSlots.map((slot, idx) => (
      <div
        key={idx}
        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
          selectedSlot === slot.startTime
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
        }`}
        onClick={() => setSelectedSlot(slot.startTime)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-purple-600" />
            <div>
              <div className="text-gray-900">
                {new Date(slot.startTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </div>
              <div className="text-gray-600">{slot.reason}</div>
            </div>
          </div>
          <div className="text-right">
            <Badge
              variant="secondary"
              className={
                slot.confidence > 80
                  ? 'bg-green-100 text-green-700'
                  : slot.confidence > 60
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
              }
            >
              {slot.confidence}% match
            </Badge>
            <div className="text-gray-600 mt-1">
              ~{slot.expectedWaitTime}min wait
            </div>
          </div>
        </div>
        {slot.confidence > 85 && (
          <div className="flex items-center gap-2 mt-2 text-purple-700">
            <Zap className="h-3 w-3" />
            <span className="text-sm">Best time for this service</span>
          </div>
        )}
      </div>
    ))}
  </CardContent>
</Card>

// Add No-Show Risk Indicator in Booking Details
{bookingDetails && (
  <Alert className={
    bookingDetails.noShowRisk > 70 
      ? 'bg-red-50 border-red-200' 
      : bookingDetails.noShowRisk > 40 
        ? 'bg-yellow-50 border-yellow-200' 
        : 'bg-green-50 border-green-200'
  }>
    <AlertTriangle className="h-4 w-4" />
    <AlertDescription>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-900 mb-1">
            No-Show Risk: {bookingDetails.noShowRisk}%
          </div>
          <div className="text-gray-600">
            {bookingDetails.noShowRisk > 70
              ? 'High risk - Consider requiring deposit or confirmation call'
              : bookingDetails.noShowRisk > 40
                ? 'Medium risk - Send reminder notification'
                : 'Low risk - Customer has good attendance history'}
          </div>
        </div>
        {bookingDetails.noShowRisk > 40 && (
          <Button size="sm" variant="outline">
            Take Action
          </Button>
        )}
      </div>
    </AlertDescription>
  </Alert>
)}
```

### TypeScript Interfaces:

```typescript
interface SmartSlot {
  startTime: string;
  endTime: string;
  confidence: number;
  reason: string;
  expectedWaitTime: number;
  bayUtilization: number;
  demandLevel: 'low' | 'medium' | 'high';
}

interface BookingWithAI extends Booking {
  noShowRisk: number;
  customerSegment: string;
  recommendedActions: string[];
  predictedServiceTime: number;
}
```

---

## CapacityPlanningManagement

### AI Features to Add:
- Dynamic capacity recommendations
- Demand heatmap
- Optimal slot configuration
- Resource allocation suggestions

### Code Example:

```typescript
// Add to CapacityPlanningManagement.tsx

import { Brain, TrendingUp, Calendar, Zap } from 'lucide-react';

// Add state
const [capacityRecommendations, setCapacityRecommendations] = useState<CapacityRecommendation[]>([]);
const [demandHeatmap, setDemandHeatmap] = useState<DemandHeatmap | null>(null);

// Fetch AI recommendations
useEffect(() => {
  const fetchCapacityInsights = async () => {
    const response = await fetch(`/api/ai/capacity/recommendations?branchId=${branchId}`);
    const data = await response.json();
    setCapacityRecommendations(data.recommendations);
    setDemandHeatmap(data.heatmap);
  };
  
  fetchCapacityInsights();
}, [branchId]);

// Add AI Recommendations Section
<Card className="border-purple-200">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Brain className="h-5 w-5 text-purple-600" />
      AI Capacity Optimization
    </CardTitle>
    <CardDescription>
      Data-driven recommendations for optimal capacity planning
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Demand Heatmap */}
    {demandHeatmap && (
      <div>
        <h4 className="text-gray-700 mb-3">Weekly Demand Heatmap</h4>
        <div className="grid grid-cols-8 gap-1">
          <div></div>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-gray-600 text-sm p-2">
              {day}
            </div>
          ))}
          {demandHeatmap.hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="text-right text-gray-600 text-sm p-2">
                {hour}:00
              </div>
              {demandHeatmap.data[hour].map((demand, dayIdx) => (
                <div
                  key={dayIdx}
                  className={`p-2 rounded text-center ${
                    demand > 80
                      ? 'bg-red-500 text-white'
                      : demand > 60
                        ? 'bg-orange-400 text-white'
                        : demand > 40
                          ? 'bg-yellow-300 text-gray-900'
                          : demand > 20
                            ? 'bg-green-300 text-gray-900'
                            : 'bg-blue-100 text-gray-700'
                  }`}
                  title={`${demand}% demand`}
                >
                  {demand}%
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-600">Very High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <span className="text-gray-600">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-300 rounded"></div>
            <span className="text-gray-600">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-300 rounded"></div>
            <span className="text-gray-600">Low</span>
          </div>
        </div>
      </div>
    )}

    {/* Recommendations */}
    <div className="space-y-3">
      <h4 className="text-gray-700">Optimization Recommendations</h4>
      {capacityRecommendations.map((rec, idx) => (
        <div key={idx} className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg">
                {rec.type === 'increase' ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <Calendar className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <h5 className="text-gray-900 mb-1">{rec.title}</h5>
                <p className="text-gray-600">{rec.description}</p>
                <div className="flex items-center gap-2 mt-2 text-green-700">
                  <Zap className="h-3 w-3" />
                  <span className="text-sm">{rec.impact}</span>
                </div>
              </div>
            </div>
            <Button size="sm" className="gap-2">
              Apply
            </Button>
          </div>
        </div>
      ))}
    </div>

    {/* Auto-Optimization Toggle */}
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-gray-900 mb-1">Auto-Optimization</h4>
          <p className="text-gray-600">
            Let AI automatically adjust capacity based on predicted demand
          </p>
        </div>
        <Switch
          checked={autoOptimization}
          onCheckedChange={setAutoOptimization}
        />
      </div>
    </div>
  </CardContent>
</Card>
```

### TypeScript Interfaces:

```typescript
interface CapacityRecommendation {
  id: string;
  type: 'increase' | 'decrease' | 'redistribute';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  timeRange: {
    start: string;
    end: string;
  };
  currentCapacity: number;
  recommendedCapacity: number;
}

interface DemandHeatmap {
  hours: number[];
  data: Record<number, number[]>; // hour -> [Mon, Tue, Wed, Thu, Fri, Sat, Sun] demand percentages
  weekRange: {
    start: string;
    end: string;
  };
}
```

---

## CustomerManagement

### AI Features to Add:
- Customer 360 AI profile
- Segment classification
- Churn risk indicator
- Lifetime value prediction
- Next-best-action recommendations

### Code Example:

```typescript
// Add to CustomerManagement.tsx

import { Brain, TrendingUp, AlertTriangle, Target, Star } from 'lucide-react';

// Add AI insights to customer data
const [customerAI, setCustomerAI] = useState<CustomerAIInsights | null>(null);

// Fetch AI insights for selected customer
const fetchCustomerAI = async (customerId: string) => {
  const response = await fetch(`/api/ai/customers/${customerId}/insights`);
  const data = await response.json();
  setCustomerAI(data);
};

// Add AI Insights Panel in Customer Details
{selectedCustomer && (
  <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Brain className="h-5 w-5 text-purple-600" />
        AI Customer Intelligence
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Customer Segment */}
      <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
        <div>
          <div className="text-gray-600 mb-1">Segment</div>
          <div className="text-gray-900">{customerAI.segment}</div>
        </div>
        <Badge
          variant={
            customerAI.segmentValue === 'high'
              ? 'default'
              : customerAI.segmentValue === 'medium'
                ? 'secondary'
                : 'outline'
          }
        >
          {customerAI.segmentValue} value
        </Badge>
      </div>

      {/* Churn Risk */}
      <div className="p-3 bg-white border rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-600">Churn Risk</div>
          <Badge
            variant={
              customerAI.churnRisk > 70
                ? 'destructive'
                : customerAI.churnRisk > 40
                  ? 'secondary'
                  : 'outline'
            }
          >
            {customerAI.churnRisk}%
          </Badge>
        </div>
        <Progress value={customerAI.churnRisk} className="mb-2" />
        {customerAI.churnRisk > 40 && (
          <Alert className="bg-orange-50 border-orange-200 mt-3">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-gray-700">
              {customerAI.churnReason}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Lifetime Value */}
      <div className="p-3 bg-white border rounded-lg">
        <div className="text-gray-600 mb-2">Predicted Lifetime Value</div>
        <div className="flex items-baseline gap-2">
          <span className="text-gray-900">${customerAI.lifetimeValue.toLocaleString()}</span>
          <span className="text-green-700 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {customerAI.lifetimeValueGrowth}
          </span>
        </div>
        <Progress value={customerAI.lifetimeValuePercentile} className="mt-2" />
        <div className="text-gray-600 mt-1">
          Top {customerAI.lifetimeValuePercentile}% of customers
        </div>
      </div>

      {/* Recommended Services */}
      <div>
        <h4 className="text-gray-700 mb-2 flex items-center gap-2">
          <Star className="h-4 w-4 text-purple-600" />
          Recommended Services
        </h4>
        <div className="space-y-2">
          {customerAI.recommendedServices.map((service, idx) => (
            <div key={idx} className="p-3 bg-white border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900">{service.name}</div>
                  <div className="text-gray-600">{service.reason}</div>
                </div>
                <Badge variant="secondary">{service.confidence}% match</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next-Best-Action */}
      <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-300">
        <div className="flex items-start gap-3">
          <Target className="h-5 w-5 text-purple-700 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-gray-900 mb-2">Recommended Action</h4>
            <p className="text-gray-700 mb-3">{customerAI.nextBestAction.description}</p>
            <div className="flex items-center gap-2">
              <Button size="sm" className="gap-2">
                {customerAI.nextBestAction.actionLabel}
              </Button>
              <span className="text-gray-600">
                Expected impact: {customerAI.nextBestAction.expectedImpact}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)}

// Add AI Segment Badges in Customer Table
<TableCell>
  <div className="flex items-center gap-2">
    <span>{customer.name}</span>
    {customer.aiSegment && (
      <Badge
        variant="outline"
        className={
          customer.aiSegment === 'VIP Regulars'
            ? 'border-purple-300 text-purple-700'
            : customer.aiSegment === 'At-Risk'
              ? 'border-orange-300 text-orange-700'
              : 'border-gray-300 text-gray-700'
        }
      >
        {customer.aiSegment}
      </Badge>
    )}
  </div>
</TableCell>
```

### TypeScript Interfaces:

```typescript
interface CustomerAIInsights {
  customerId: string;
  segment: string;
  segmentValue: 'high' | 'medium' | 'low';
  churnRisk: number;
  churnReason: string;
  lifetimeValue: number;
  lifetimeValueGrowth: string;
  lifetimeValuePercentile: number;
  recommendedServices: Array<{
    serviceId: string;
    name: string;
    reason: string;
    confidence: number;
  }>;
  nextBestAction: {
    type: 'retention' | 'upsell' | 'winback' | 'engage';
    description: string;
    actionLabel: string;
    expectedImpact: string;
  };
  predictedNextVisit: string;
  engagementScore: number;
}
```

---

## CampaignManagement

### AI Features to Add:
- Campaign performance prediction
- Audience optimization
- A/B test suggestions
- Send time optimization

### Code Example:

```typescript
// Add to CampaignManagement.tsx

import { Brain, Target, TrendingUp, Users, Clock } from 'lucide-react';

// Add AI state
const [campaignPrediction, setCampaignPrediction] = useState<CampaignPrediction | null>(null);
const [audienceOptimization, setAudienceOptimization] = useState<AudienceOptimization | null>(null);

// Predict campaign performance
const predictCampaignPerformance = async (campaignData: CampaignDraft) => {
  const response = await fetch('/api/ai/campaigns/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(campaignData),
  });
  const data = await response.json();
  setCampaignPrediction(data);
};

// Add AI Campaign Assistant in Create/Edit Form
<Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Brain className="h-5 w-5 text-purple-600" />
      AI Campaign Assistant
    </CardTitle>
    <CardDescription>
      Optimize your campaign before launch
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Performance Prediction */}
    {campaignPrediction && (
      <div className="p-4 bg-white border rounded-lg">
        <h4 className="text-gray-900 mb-3">Predicted Performance</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-600 mb-1">Expected Reach</div>
            <div className="text-gray-900">
              {campaignPrediction.expectedReach.toLocaleString()} customers
            </div>
            <Progress value={75} className="mt-2" />
          </div>
          <div>
            <div className="text-gray-600 mb-1">Conversion Rate</div>
            <div className="text-gray-900">{campaignPrediction.conversionRate}%</div>
            <Progress value={campaignPrediction.conversionRate} className="mt-2" />
          </div>
          <div>
            <div className="text-gray-600 mb-1">Expected Revenue</div>
            <div className="text-green-700">
              ${campaignPrediction.expectedRevenue.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Predicted ROI</div>
            <div className={campaignPrediction.roi > 200 ? 'text-green-700' : 'text-orange-700'}>
              {campaignPrediction.roi}%
            </div>
          </div>
        </div>
        <Badge
          variant={campaignPrediction.confidence > 80 ? 'default' : 'secondary'}
          className="mt-3"
        >
          {campaignPrediction.confidence}% confidence
        </Badge>
      </div>
    )}

    {/* Audience Optimization */}
    <div className="p-4 bg-white border rounded-lg">
      <h4 className="text-gray-900 mb-3 flex items-center gap-2">
        <Users className="h-4 w-4 text-purple-600" />
        Audience Optimization
      </h4>
      {audienceOptimization && (
        <>
          <Alert className="bg-blue-50 border-blue-200 mb-3">
            <Target className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-gray-700">
              {audienceOptimization.recommendation}
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current audience size:</span>
              <span className="text-gray-900">{audienceOptimization.currentSize}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Recommended size:</span>
              <span className="text-green-700">{audienceOptimization.recommendedSize}</span>
            </div>
            <Button variant="outline" className="w-full mt-2">
              Apply Optimization
            </Button>
          </div>
        </>
      )}
    </div>

    {/* Send Time Optimization */}
    <div className="p-4 bg-white border rounded-lg">
      <h4 className="text-gray-900 mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4 text-purple-600" />
        Optimal Send Time
      </h4>
      <div className="space-y-2">
        <div className="p-3 border-2 border-green-300 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-900">Tuesday, 2:00 PM</div>
              <div className="text-gray-600">Best time for this audience</div>
            </div>
            <Badge className="bg-green-600">Recommended</Badge>
          </div>
          <div className="flex items-center gap-2 mt-2 text-green-700">
            <TrendingUp className="h-3 w-3" />
            <span className="text-sm">35% higher open rate expected</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Monday 10AM', 'Wednesday 6PM', 'Thursday 3PM'].map((time) => (
            <div key={time} className="p-2 border rounded text-center hover:bg-gray-50 cursor-pointer">
              <div className="text-gray-900 text-sm">{time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* A/B Test Suggestions */}
    <div className="p-4 bg-white border rounded-lg">
      <h4 className="text-gray-900 mb-3">A/B Test Suggestions</h4>
      <div className="space-y-2">
        <div className="p-3 border rounded-lg">
          <div className="text-gray-900 mb-1">Test discount levels</div>
          <div className="text-gray-600">20% off vs 25% off vs $5 flat discount</div>
        </div>
        <div className="p-3 border rounded-lg">
          <div className="text-gray-900 mb-1">Test subject lines</div>
          <div className="text-gray-600">Urgency-based vs Value-based messaging</div>
        </div>
      </div>
      <Button variant="outline" className="w-full mt-3">
        Set Up A/B Test
      </Button>
    </div>
  </CardContent>
</Card>
```

---

## ReviewFeedbackManagement

### AI Features to Add:
- Sentiment analysis dashboard
- Automatic response suggestions
- Topic extraction
- Trend detection

### Code Example:

```typescript
// Add to ReviewFeedbackManagement.tsx

import { Brain, MessageSquare, TrendingUp, AlertTriangle } from 'lucide-react';

// Add AI state
const [sentimentAnalysis, setSentimentAnalysis] = useState<SentimentAnalysis | null>(null);
const [responsesuggestion, setResponseSuggestion] = useState<string>('');

// Analyze sentiment for a review
const analyzeSentiment = async (reviewText: string, reviewId: string) => {
  const response = await fetch('/api/ai/sentiment/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: reviewText, reviewId }),
  });
  const data = await response.json();
  return data;
};

// Generate response suggestion
const generateResponse = async (reviewText: string, sentiment: string) => {
  const response = await fetch('/api/ai/reviews/suggest-response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: reviewText, sentiment }),
  });
  const data = await response.json();
  setResponseSuggestion(data.suggestion);
};

// Add Sentiment Dashboard
<Card className="border-purple-200">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Brain className="h-5 w-5 text-purple-600" />
      AI Sentiment Analysis
    </CardTitle>
    <CardDescription>Real-time feedback intelligence</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Overall Sentiment Score */}
    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-gray-900">Overall Sentiment</h4>
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          {sentimentAnalysis.overallScore.toFixed(1)} / 5.0
        </Badge>
      </div>
      <Progress value={(sentimentAnalysis.overallScore / 5) * 100} className="mb-3" />
      <div className="flex items-center gap-2 text-green-700">
        <TrendingUp className="h-4 w-4" />
        <span>+0.3 points vs last month</span>
      </div>
    </div>

    {/* Sentiment Breakdown */}
    <div className="grid grid-cols-3 gap-3">
      <div className="p-3 border rounded-lg">
        <div className="text-gray-600 mb-2">Positive</div>
        <div className="text-green-700">{sentimentAnalysis.positive}%</div>
        <Progress value={sentimentAnalysis.positive} className="mt-2" />
      </div>
      <div className="p-3 border rounded-lg">
        <div className="text-gray-600 mb-2">Neutral</div>
        <div className="text-gray-700">{sentimentAnalysis.neutral}%</div>
        <Progress value={sentimentAnalysis.neutral} className="mt-2" />
      </div>
      <div className="p-3 border rounded-lg">
        <div className="text-gray-600 mb-2">Negative</div>
        <div className="text-red-700">{sentimentAnalysis.negative}%</div>
        <Progress value={sentimentAnalysis.negative} className="mt-2" />
      </div>
    </div>

    {/* Topic Analysis */}
    <div>
      <h4 className="text-gray-700 mb-3">Common Topics</h4>
      <div className="flex flex-wrap gap-2">
        {sentimentAnalysis.topics.map((topic) => (
          <Badge
            key={topic.name}
            variant="outline"
            className={
              topic.sentiment > 0.5
                ? 'border-green-300 text-green-700'
                : topic.sentiment < -0.2
                  ? 'border-red-300 text-red-700'
                  : 'border-gray-300 text-gray-700'
            }
          >
            {topic.name} ({topic.count})
          </Badge>
        ))}
      </div>
    </div>

    {/* Critical Issues */}
    {sentimentAnalysis.criticalIssues.length > 0 && (
      <Alert className="bg-red-50 border-red-200">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription>
          <div className="text-gray-900 mb-2">Critical Issues Detected</div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {sentimentAnalysis.criticalIssues.map((issue, idx) => (
              <li key={idx}>{issue}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
    )}
  </CardContent>
</Card>

// Add AI Response Generator in Review Details
{selectedReview && (
  <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-purple-600" />
        AI Response Assistant
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="p-3 bg-white border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-700">Sentiment:</span>
          <Badge
            variant={
              selectedReview.aiSentiment === 'positive'
                ? 'default'
                : selectedReview.aiSentiment === 'negative'
                  ? 'destructive'
                  : 'secondary'
            }
          >
            {selectedReview.aiSentiment}
          </Badge>
          <Badge variant="outline">
            {selectedReview.aiScore.toFixed(2)} score
          </Badge>
        </div>
        {selectedReview.aiTopics.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Topics:</span>
            <div className="flex flex-wrap gap-1">
              {selectedReview.aiTopics.map((topic) => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-gray-700">Suggested Response</label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => generateResponse(selectedReview.text, selectedReview.aiSentiment)}
          >
            Regenerate
          </Button>
        </div>
        <Textarea
          value={responseSuggestion}
          onChange={(e) => setResponseSuggestion(e.target.value)}
          rows={5}
          className="font-normal"
        />
        <div className="flex items-center gap-2 mt-2">
          <Button className="gap-2">
            Post Response
          </Button>
          <Button variant="outline">
            Edit & Post
          </Button>
        </div>
      </div>

      {selectedReview.aiUrgency === 'high' && (
        <Alert className="bg-orange-50 border-orange-200">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-gray-700">
            This review requires immediate attention. Consider personal follow-up.
          </AlertDescription>
        </Alert>
      )}
    </CardContent>
  </Card>
)}
```

---

## Summary of Integration Approach

### Common Patterns Across All Components:

1. **Visual AI Indicators**
   - Purple/blue gradient backgrounds for AI features
   - Brain/Sparkles icons to denote AI functionality
   - Confidence scores and badges
   - Clear "AI-powered" labeling

2. **API Integration Structure**
   ```typescript
   // Standard pattern for AI API calls
   const fetchAIInsights = async (params) => {
     try {
       const response = await fetch('/api/ai/[feature]/[action]', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(params),
       });
       const data = await response.json();
       return data;
     } catch (error) {
       console.error('AI API Error:', error);
       // Fallback to non-AI functionality
     }
   };
   ```

3. **Progressive Enhancement**
   - All AI features are additions, not replacements
   - Components work without AI (graceful degradation)
   - AI insights complement existing data
   - Users can opt-out or ignore AI suggestions

4. **Consistent UX Patterns**
   - Recommendations always show confidence scores
   - Predictions include confidence intervals
   - Action buttons for immediate implementation
   - Clear explanations of "why" for each suggestion

5. **Performance Considerations**
   - Lazy loading of AI insights
   - Caching of predictions
   - Async loading with loading states
   - Error boundaries for AI failures

---

## Next Steps for Implementation:

1. **Choose Your Priority Features** (from AI_INTEGRATION_STRATEGY.md)
2. **Set Up AI Backend** (cloud ML services)
3. **Implement Data Pipelines** (collect and prepare data)
4. **Start with One Component** (e.g., Analytics or Booking)
5. **Test and Iterate** (measure impact, adjust)
6. **Roll Out Gradually** (expand to more components)

The key is to start small with high-value, low-complexity features and expand based on user feedback and measured impact.
