"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { 
  UserMinus, 
  Mail, 
  Phone, 
  Gift, 
  TrendingDown, 
  AlertTriangle,
  Search,
  Filter,
  Download,
  Send
} from "lucide-react";
import { cn } from "../ui/utils";

interface ChurnCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  totalVisits: number;
  lifetimeValue: number;
  churnRisk: number; // 0-100
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  factors: string[];
  recommendedAction: string;
  estimatedRetentionCost: number;
}

interface CustomerChurnPredictionProps {
  onNavigate?: (page: string) => void;
}

export function CustomerChurnPrediction({ onNavigate }: CustomerChurnPredictionProps) {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - would come from AI model in production
  const churnCustomers: ChurnCustomer[] = [
    {
      id: 'c1',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1-555-0101',
      lastVisit: '45 days ago',
      totalVisits: 24,
      lifetimeValue: 2850,
      churnRisk: 92,
      riskLevel: 'critical',
      factors: ['No visit in 45+ days', 'Declined last offer', 'Negative review (3★)'],
      recommendedAction: 'Immediate personal call + 30% discount offer',
      estimatedRetentionCost: 85,
    },
    {
      id: 'c2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1-555-0102',
      lastVisit: '38 days ago',
      totalVisits: 18,
      lifetimeValue: 1920,
      churnRisk: 88,
      riskLevel: 'critical',
      factors: ['Visit frequency down 60%', 'Competitor visit detected', 'Price sensitivity'],
      recommendedAction: 'Win-back email campaign + loyalty points bonus',
      estimatedRetentionCost: 60,
    },
    {
      id: 'c3',
      name: 'Sarah Thompson',
      email: 'sarah.t@email.com',
      phone: '+1-555-0103',
      lastVisit: '28 days ago',
      totalVisits: 32,
      lifetimeValue: 4200,
      churnRisk: 75,
      riskLevel: 'high',
      factors: ['Spending declined 40%', 'Downgraded to basic package', 'Long wait time complaints'],
      recommendedAction: 'Priority booking access + service quality check',
      estimatedRetentionCost: 125,
    },
    {
      id: 'c4',
      name: 'James Wilson',
      email: 'james.w@email.com',
      phone: '+1-555-0104',
      lastVisit: '22 days ago',
      totalVisits: 15,
      lifetimeValue: 1560,
      churnRisk: 68,
      riskLevel: 'high',
      factors: ['Visit gap increasing', 'No subscription renewal', 'Mobile app uninstalled'],
      recommendedAction: 'SMS re-engagement + first wash free offer',
      estimatedRetentionCost: 50,
    },
    {
      id: 'c5',
      name: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      phone: '+1-555-0105',
      lastVisit: '18 days ago',
      totalVisits: 42,
      lifetimeValue: 5880,
      churnRisk: 52,
      riskLevel: 'medium',
      factors: ['Seasonal pattern deviation', 'Reduced add-on purchases'],
      recommendedAction: 'Loyalty reward reminder + personalized offer',
      estimatedRetentionCost: 40,
    },
  ];

  const filteredCustomers = churnCustomers.filter(customer => {
    const matchesRisk = selectedRiskLevel === 'all' || customer.riskLevel === selectedRiskLevel;
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const stats = {
    totalAtRisk: churnCustomers.length,
    criticalCount: churnCustomers.filter(c => c.riskLevel === 'critical').length,
    potentialLTVLoss: churnCustomers.reduce((sum, c) => sum + c.lifetimeValue, 0),
    averageRetentionCost: Math.round(
      churnCustomers.reduce((sum, c) => sum + c.estimatedRetentionCost, 0) / churnCustomers.length
    ),
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleBulkAction = (action: string) => {
    // Handle bulk action for filtered customers
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">At-Risk Customers</p>
                <p className="text-2xl font-bold text-red-600">{stats.totalAtRisk}</p>
              </div>
              <UserMinus className="w-8 h-8 text-red-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Risk</p>
                <p className="text-2xl font-bold text-orange-600">{stats.criticalCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Potential LTV Loss</p>
                <p className="text-2xl font-bold">${stats.potentialLTVLoss.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-gray-400 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Retention Cost</p>
                <p className="text-2xl font-bold text-green-600">${stats.averageRetentionCost}</p>
              </div>
              <Gift className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Info */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <UserMinus className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 mb-1">AI Churn Prediction Model</h3>
              <p className="text-sm text-purple-700 mb-2">
                Using Gradient Boosting (LightGBM) trained on 50,000+ customer interactions with 89% accuracy.
                Predictions updated daily at 6 AM.
              </p>
              <div className="flex gap-4 text-sm text-purple-700">
                <span>• Model Accuracy: <strong>89%</strong></span>
                <span>• Last Updated: <strong>Today 6:00 AM</strong></span>
                <span>• Features: <strong>23 signals</strong></span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters & Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>At-Risk Customer List</CardTitle>
              <CardDescription>Customers predicted to churn in next 30 days</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={() => handleBulkAction('campaign')}>
                <Send className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Tabs value={selectedRiskLevel} onValueChange={(v: any) => setSelectedRiskLevel(v)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="critical">Critical</TabsTrigger>
                <TabsTrigger value="high">High</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Customer List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className={cn("border-l-4", getRiskColor(customer.riskLevel))}>
                <CardContent className="pt-4 pb-4">
                  {/* Customer Info */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{customer.name}</h4>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1 truncate">
                            <Mail className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{customer.email}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 flex-shrink-0" />
                            {customer.phone}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className={cn("text-xs whitespace-nowrap", getRiskColor(customer.riskLevel))}>
                        {customer.churnRisk}%
                      </Badge>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last visit:</span>
                        <strong>{customer.lastVisit}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Visits:</span>
                        <strong>{customer.totalVisits}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">LTV:</span>
                        <strong>${customer.lifetimeValue.toLocaleString()}</strong>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Churn Risk</span>
                        <span className="font-medium">{customer.churnRisk}%</span>
                      </div>
                      <Progress 
                        value={customer.churnRisk} 
                        className={cn(
                          "h-2",
                          customer.churnRisk >= 80 && "[&>div]:bg-red-600",
                          customer.churnRisk >= 60 && customer.churnRisk < 80 && "[&>div]:bg-orange-600",
                          customer.churnRisk >= 40 && customer.churnRisk < 60 && "[&>div]:bg-yellow-600"
                        )}
                      />
                    </div>

                    {/* Risk Factors */}
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground">Risk Factors:</p>
                      <div className="flex flex-wrap gap-1">
                        {customer.factors.map((factor, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* AI Recommendation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
                      <div className="flex items-start gap-2">
                        <Gift className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-blue-900 mb-1">AI Action:</p>
                          <p className="text-xs text-blue-700 leading-relaxed">{customer.recommendedAction}</p>
                          <p className="text-xs text-blue-600 mt-1.5">
                            Cost: ${customer.estimatedRetentionCost} | ROI: {Math.round(customer.lifetimeValue / customer.estimatedRetentionCost)}x
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t">
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Mail className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Phone className="w-3 h-3" />
                      </Button>
                      <Button variant="default" size="sm" className="h-8 px-2">
                        <Gift className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <UserMinus className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>No customers found matching your filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}