"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { getModuleName, MODULE_CONFIG } from "../../types/business-modules";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { 
  Plus, Edit, Trash2, Calendar, Percent, DollarSign, Target, TrendingUp, 
  Clock, TrendingDown, Sparkles, Brain, Zap, Users, Timer, QrCode,
  Share2, Building2, Globe, UserCheck, Filter, Download, Copy, ExternalLink,
  Mail, MessageSquare, Bell, Send, Eye, BarChart3, Award, Gift, Star, Tag,
  Activity, ArrowUpRight, ArrowDownRight, Smartphone, Heart, CheckCircle2, ChevronRight, ChevronLeft, Check
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";
import { AIInsights } from "./AIInsights";
import { BusinessModule } from "../../types/business-modules";
import { AddCampaignDialog } from "../dialogs/AddCampaignDialog";

interface CampaignManagementProps {
  campaigns?: any[];
  services?: any[];
  packages?: any[];
  branches?: any[];
  peakTimeAnalytics?: any;
  onCreateCampaign?: (campaign: any) => void;
  onEditCampaign?: (id: string, updates: any) => void;
  onDeleteCampaign?: (id: string) => void;
  onToggleCampaign?: (id: string) => void;
  userRole?: string;
}

export function CampaignManagement({
  campaigns = [],
  services = [],
  packages = [],
  branches = [],
  peakTimeAnalytics,
  onCreateCampaign,
  onEditCampaign,
  onDeleteCampaign,
  onToggleCampaign,
  userRole = "root_owner"
}: CampaignManagementProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAddCampaignDialogOpen, setIsAddCampaignDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("global");
  const [selectedCampaignView, setSelectedCampaignView] = useState("all");
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<BusinessModule | "all">("all");
  const [currentStep, setCurrentStep] = useState(1);

  // Get all available modules from branches
  const availableModules: BusinessModule[] = branches 
    ? Array.from(new Set(branches.flatMap(b => b.businessModules || []))) as BusinessModule[]
    : [];
  
  // Form state for creating campaigns
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "",
    description: "",
    discountValue: "",
    discountType: "percentage",
    scope: "",
    targetSegment: "",
    minPurchase: "",
    maxUses: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    daysOfWeek: [] as string[],
    targetModules: [] as BusinessModule[],
    autoActivate: true,
    sendNotification: true
  });

  const totalSteps = 4;
  const daysOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!newCampaign.name || !newCampaign.type) {
          toast.error("Please fill in campaign name and type");
          return false;
        }
        return true;
      case 2:
        if (!newCampaign.discountValue || !newCampaign.discountType) {
          toast.error("Please set discount value and type");
          return false;
        }
        return true;
      case 3:
        if (!newCampaign.startDate || !newCampaign.endDate) {
          toast.error("Please set campaign dates");
          return false;
        }
        if (new Date(newCampaign.endDate) < new Date(newCampaign.startDate)) {
          toast.error("End date must be after start date");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateCampaign = () => {
    const campaign = {
      id: `camp-${Date.now()}`,
      name: newCampaign.name,
      type: newCampaign.type,
      description: newCampaign.description,
      discountValue: newCampaign.discountValue,
      scope: newCampaign.scope || "All Branches",
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      isActive: newCampaign.autoActivate,
      performance: {
        usageCount: 0,
        revenue: 0,
        conversionRate: 0
      }
    };

    if (onCreateCampaign) {
      onCreateCampaign(campaign);
    }

    toast.success("Campaign created successfully!");
    
    // Reset form
    setNewCampaign({
      name: "",
      type: "",
      description: "",
      discountValue: "",
      discountType: "percentage",
      scope: "",
      targetSegment: "",
      minPurchase: "",
      maxUses: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      daysOfWeek: [],
      autoActivate: true,
      sendNotification: true
    });
    
    setCurrentStep(1);
    setIsCreateDialogOpen(false);
  };

  const toggleDayOfWeek = (day: string) => {
    setNewCampaign({
      ...newCampaign,
      daysOfWeek: newCampaign.daysOfWeek.includes(day)
        ? newCampaign.daysOfWeek.filter(d => d !== day)
        : [...newCampaign.daysOfWeek, day]
    });
  };

  // Enhanced Mock data for ROOT OWNER campaigns
  const globalCampaigns = [
    {
      id: "gc1",
      name: "Platform Launch Special",
      description: "Welcome discount for all new carwash centers joining the platform",
      type: "Percentage",
      discount: 25,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      centersUsing: 8,
      revenue: 45680,
      conversions: 234,
      impressions: 12450,
      clickRate: 4.2,
      avgOrderValue: 195
    },
    {
      id: "gc2",
      name: "Spring Clean Premium",
      description: "Seasonal campaign for premium services",
      type: "Fixed",
      discount: 20,
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      centersUsing: 12,
      revenue: 38920,
      conversions: 189,
      impressions: 9870,
      clickRate: 3.8,
      avgOrderValue: 206
    },
    {
      id: "gc3",
      name: "Summer Shine Bundle",
      description: "Premium detailing package discount for summer season",
      type: "Percentage",
      discount: 30,
      status: "active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      centersUsing: 15,
      revenue: 67890,
      conversions: 345,
      impressions: 18920,
      clickRate: 5.1,
      avgOrderValue: 197
    },
    {
      id: "gc4",
      name: "Fall Fleet Program",
      description: "Corporate fleet washing special rates",
      type: "Fixed",
      discount: 35,
      status: "active",
      startDate: "2024-09-01",
      endDate: "2024-11-30",
      centersUsing: 9,
      revenue: 52340,
      conversions: 156,
      impressions: 7650,
      clickRate: 4.5,
      avgOrderValue: 335
    },
    {
      id: "gc5",
      name: "Weekend Warrior",
      description: "Saturday-Sunday exclusive discount",
      type: "Percentage",
      discount: 15,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      centersUsing: 13,
      revenue: 29870,
      conversions: 267,
      impressions: 15340,
      clickRate: 3.6,
      avgOrderValue: 112
    },
    {
      id: "gc6",
      name: "New Year Fresh Start",
      description: "January promotion for premium wash packages",
      type: "Percentage",
      discount: 40,
      status: "scheduled",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      centersUsing: 0,
      revenue: 0,
      conversions: 0,
      impressions: 0,
      clickRate: 0,
      avgOrderValue: 0
    },
  ];

  const customerSegments = [
    {
      id: "seg1",
      name: "VIP Customers",
      description: "Customers with 10+ visits in the last 6 months",
      count: 1234,
      avgSpend: 156,
      activeCampaigns: 3,
      conversionRate: 68,
      monthlyGrowth: 12.5,
      ltv: 1847,
      churnRate: 3.2
    },
    {
      id: "seg2",
      name: "New Customers",
      description: "First time visitors in the last 30 days",
      count: 3456,
      avgSpend: 45,
      activeCampaigns: 5,
      conversionRate: 42,
      monthlyGrowth: 28.7,
      ltv: 287,
      churnRate: 35.6
    },
    {
      id: "seg3",
      name: "Premium Buyers",
      description: "Customers preferring premium services (avg $200+)",
      count: 890,
      avgSpend: 220,
      activeCampaigns: 2,
      conversionRate: 75,
      monthlyGrowth: 8.3,
      ltv: 3456,
      churnRate: 5.1
    },
    {
      id: "seg4",
      name: "Budget Conscious",
      description: "Price-sensitive customers using basic services",
      count: 2345,
      avgSpend: 35,
      activeCampaigns: 4,
      conversionRate: 58,
      monthlyGrowth: 15.2,
      ltv: 423,
      churnRate: 18.9
    },
    {
      id: "seg5",
      name: "Corporate Fleet",
      description: "Business accounts with multiple vehicles",
      count: 145,
      avgSpend: 850,
      activeCampaigns: 2,
      conversionRate: 92,
      monthlyGrowth: 5.6,
      ltv: 12450,
      churnRate: 2.3
    },
    {
      id: "seg6",
      name: "Seasonal Users",
      description: "Customers who visit only during specific seasons",
      count: 1876,
      avgSpend: 67,
      activeCampaigns: 3,
      conversionRate: 45,
      monthlyGrowth: -3.2,
      ltv: 534,
      churnRate: 42.5
    },
  ];

  const aiSuggestions = [
    {
      id: "ai1",
      name: "Early Morning Rush",
      timeSlot: "6:00 AM - 8:00 AM",
      discount: 30,
      type: "Percentage",
      predictedBookings: 450,
      predictedRevenue: 12840,
      confidence: 92,
      segment: "Working Professionals",
      reasoning: "Analysis shows 65% capacity drop during early hours. Price-sensitive professionals would respond well to 30% discount.",
      estimatedCost: 3870,
      roi: 232
    },
    {
      id: "ai2",
      name: "Midweek Boost",
      timeSlot: "Tuesday-Thursday 2PM-4PM",
      discount: 15,
      type: "Fixed",
      predictedBookings: 320,
      predictedRevenue: 8960,
      confidence: 87,
      segment: "Flexible Schedule",
      reasoning: "Midweek afternoons show 45% lower utilization. Fixed $15 discount appeals to cost-conscious customers.",
      estimatedCost: 4800,
      roi: 86
    },
    {
      id: "ai3",
      name: "Sunday Family Special",
      timeSlot: "Sunday 10AM-2PM",
      discount: 25,
      type: "Percentage",
      predictedBookings: 280,
      predictedRevenue: 9870,
      confidence: 89,
      segment: "Families",
      reasoning: "Sunday mornings have high family traffic but lower conversion. 25% discount would boost bookings by estimated 180%.",
      estimatedCost: 2468,
      roi: 300
    },
    {
      id: "ai4",
      name: "Premium Evening",
      timeSlot: "Monday-Friday 5PM-7PM",
      discount: 20,
      type: "Fixed",
      predictedBookings: 195,
      predictedRevenue: 15680,
      confidence: 94,
      segment: "After Work Premium",
      reasoning: "Evening slots show demand for quick premium services. $20 off premium packages would maximize high-value conversions.",
      estimatedCost: 3900,
      roi: 302
    },
  ];

  const qrCampaigns = [
    {
      id: "qr1",
      name: "Location QR - Downtown",
      qrCode: "QR-DWN-001",
      scans: 456,
      conversions: 234,
      revenue: 8920,
      location: "Downtown Branch",
      status: "active",
      conversionRate: 51.3,
      avgOrderValue: 38.12
    },
    {
      id: "qr2",
      name: "Flyer QR - Spring Promo",
      qrCode: "QR-SPR-002",
      scans: 789,
      conversions: 412,
      revenue: 15680,
      location: "All Branches",
      status: "active",
      conversionRate: 52.2,
      avgOrderValue: 38.06
    },
    {
      id: "qr3",
      name: "Business Card QR",
      qrCode: "QR-BC-003",
      scans: 234,
      conversions: 89,
      revenue: 4560,
      location: "All Branches",
      status: "active",
      conversionRate: 38.0,
      avgOrderValue: 51.24
    },
    {
      id: "qr4",
      name: "Social Media QR",
      qrCode: "QR-SM-004",
      scans: 1234,
      conversions: 567,
      revenue: 19870,
      location: "All Branches",
      status: "active",
      conversionRate: 45.9,
      avgOrderValue: 35.04
    },
    {
      id: "qr5",
      name: "Vehicle Sticker QR",
      qrCode: "QR-VS-005",
      scans: 678,
      conversions: 345,
      revenue: 12450,
      location: "All Branches",
      status: "active",
      conversionRate: 50.9,
      avgOrderValue: 36.09
    },
  ];

  const affiliates = [
    {
      id: "aff1",
      name: "Auto Dealership Partners",
      affiliateCode: "AFF-DEALER-001",
      partners: 12,
      referrals: 234,
      conversions: 156,
      revenue: 23450,
      commission: 2345,
      status: "active",
      conversionRate: 66.7,
      avgCommission: 15.03
    },
    {
      id: "aff2",
      name: "Corporate Fleet Program",
      affiliateCode: "AFF-FLEET-002",
      partners: 8,
      referrals: 445,
      conversions: 334,
      revenue: 45890,
      commission: 4589,
      status: "active",
      conversionRate: 75.1,
      avgCommission: 13.74
    },
    {
      id: "aff3",
      name: "Insurance Companies",
      affiliateCode: "AFF-INS-003",
      partners: 5,
      referrals: 189,
      conversions: 145,
      revenue: 18920,
      commission: 1892,
      status: "active",
      conversionRate: 76.7,
      avgCommission: 13.05
    },
    {
      id: "aff4",
      name: "Auto Repair Shops",
      affiliateCode: "AFF-REP-004",
      partners: 18,
      referrals: 567,
      conversions: 423,
      revenue: 35670,
      commission: 3567,
      status: "active",
      conversionRate: 74.6,
      avgCommission: 8.43
    },
  ];

  const carwashCampaigns = [
    {
      id: "cc1",
      centerName: "AutoWash Pro",
      campaignName: "Weekend Special",
      discount: 20,
      bookings: 156,
      revenue: 4680,
      status: "active",
      type: "Percentage",
      startDate: "2024-11-01",
      performance: 87
    },
    {
      id: "cc2",
      centerName: "SpeedWash Express",
      campaignName: "Express Bundle",
      discount: 15,
      bookings: 234,
      revenue: 6120,
      status: "active",
      type: "Fixed",
      startDate: "2024-11-15",
      performance: 92
    },
    {
      id: "cc3",
      centerName: "Elite Auto Spa",
      campaignName: "Premium Package Deal",
      discount: 30,
      bookings: 89,
      revenue: 8920,
      status: "active",
      type: "Percentage",
      startDate: "2024-12-01",
      performance: 78
    },
    {
      id: "cc4",
      centerName: "Shine & Go",
      campaignName: "Quick Wash Monday",
      discount: 10,
      bookings: 345,
      revenue: 5180,
      status: "active",
      type: "Fixed",
      startDate: "2024-10-28",
      performance: 95
    },
    {
      id: "cc5",
      centerName: "Crystal Clean",
      campaignName: "Family Sunday",
      discount: 25,
      bookings: 178,
      revenue: 7120,
      status: "active",
      type: "Percentage",
      startDate: "2024-11-10",
      performance: 84
    },
  ];

  // Enhanced Chart data
  const campaignPerformanceData = [
    { month: "Jan", revenue: 38450, conversions: 234, impressions: 12500, roi: 285 },
    { month: "Feb", revenue: 42300, conversions: 267, impressions: 14200, roi: 298 },
    { month: "Mar", revenue: 45680, conversions: 289, impressions: 15800, roi: 312 },
    { month: "Apr", revenue: 48920, conversions: 312, impressions: 16900, roi: 295 },
    { month: "May", revenue: 52340, conversions: 345, impressions: 18400, roi: 318 },
    { month: "Jun", revenue: 56780, conversions: 378, impressions: 19800, roi: 325 },
  ];

  const segmentDistributionData = [
    { name: "VIP", value: 18, color: "#9810FA", customers: 1234 },
    { name: "Premium", value: 12, color: "#155DFC", customers: 890 },
    { name: "Regular", value: 45, color: "#00A63E", customers: 2345 },
    { name: "New", value: 25, color: "#F54900", customers: 3456 },
  ];

  const channelPerformanceData = [
    { channel: "Email", campaigns: 12, conversions: 456, revenue: 18920, roi: 312 },
    { channel: "SMS", campaigns: 8, conversions: 234, revenue: 9870, roi: 285 },
    { channel: "Push", campaigns: 15, conversions: 678, revenue: 28450, roi: 398 },
    { channel: "QR Code", campaigns: 5, conversions: 890, revenue: 35670, roi: 456 },
    { channel: "Affiliate", campaigns: 4, conversions: 334, revenue: 45890, roi: 512 },
  ];

  const timeSlotData = [
    { time: "6-8 AM", utilization: 35, potential: 65, revenue: 4560 },
    { time: "8-10 AM", utilization: 78, potential: 22, revenue: 12890 },
    { time: "10-12 PM", utilization: 92, potential: 8, revenue: 18920 },
    { time: "12-2 PM", utilization: 65, potential: 35, revenue: 9870 },
    { time: "2-4 PM", utilization: 45, potential: 55, revenue: 7650 },
    { time: "4-6 PM", utilization: 88, potential: 12, revenue: 15680 },
    { time: "6-8 PM", utilization: 72, potential: 28, revenue: 11230 },
  ];

  const campaignTypeData = [
    { type: "Percentage", count: 24, revenue: 125670, avgConversion: 58 },
    { type: "Fixed Amount", count: 18, revenue: 98450, avgConversion: 52 },
    { type: "BOGO", count: 6, revenue: 45890, avgConversion: 71 },
    { type: "Bundle", count: 9, revenue: 67230, avgConversion: 65 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Campaign Management</h1>
          <p className="text-muted-foreground">
            {userRole === "root_owner" 
              ? "Platform-wide campaign management and analytics" 
              : "Create and manage marketing campaigns"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {userRole === "root_owner" && (
            <>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button variant="outline" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
            </>
          )}
          <Button className="gap-2" onClick={() => setIsAddCampaignDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <AIInsights
        insights={[
          {
            id: "campaign-performance",
            type: "prediction",
            title: "Campaign Performance Forecast",
            description: "Current 'Weekend Special' campaign predicted to generate 35% more bookings than last month based on early trends.",
            impact: "high",
            confidence: 0.88,
            trend: "up",
            metric: "Projected revenue",
            value: "+$4,200"
          },
          {
            id: "optimal-timing",
            type: "recommendation",
            title: "Optimal Campaign Timing",
            description: "Launch campaigns on Tuesday mornings for 23% higher open rates. Historical data shows peak engagement at 9-11 AM.",
            impact: "medium",
            confidence: 0.84,
            metric: "Engagement boost",
            value: "+23%",
            action: {
              label: "Schedule Campaign",
              onClick: () => setIsAddCampaignDialogOpen(true)
            }
          },
          {
            id: "underperforming",
            type: "alert",
            title: "Underperforming Campaign",
            description: "'Early Bird Special' has 68% lower conversion than similar campaigns. Consider adjusting discount or targeting.",
            impact: "high",
            action: {
              label: "Review Campaign",
              onClick: () => toast.info("Opening campaign analytics")
            }
          },
          {
            id: "segment-opportunity",
            type: "opportunity",
            title: "High-Value Segment Identified",
            description: "'Premium Buyers' segment shows 75% conversion rate. Increasing targeting could yield $8,500 additional revenue.",
            impact: "high",
            confidence: 0.91,
            metric: "Revenue opportunity",
            value: "+$8,500/month",
            action: {
              label: "Create Targeted Campaign",
              onClick: () => {
                setSelectedTab("segmentation");
                toast.success("Switched to segmentation view");
              }
            }
          }
        ]}
        title="Campaign Intelligence"
        dismissible={true}
      />

      {/* Module Filter */}
      {availableModules.length > 0 && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Filter Campaigns by Business Module</span>
              </div>
              <Select value={selectedModuleFilter} onValueChange={(value) => setSelectedModuleFilter(value as BusinessModule | "all")}>
                <SelectTrigger className="w-[220px] bg-white">
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  {availableModules.map((moduleId) => {
                    const config = MODULE_CONFIG[moduleId];
                    const Icon = config.icon;
                    return (
                      <SelectItem key={moduleId} value={moduleId}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{getModuleName(moduleId)}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            {selectedModuleFilter !== "all" && (
              <div className="mt-3 pt-3 border-t border-purple-300">
                <p className="text-xs text-purple-800">
                  Showing campaigns targeting <strong>{getModuleName(selectedModuleFilter)}</strong> module
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {userRole === "root_owner" ? (
        /* ROOT OWNER - Advanced Campaign Management */
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="bg-[#ececf0] p-1 h-9">
            <TabsTrigger value="global" className="data-[state=active]:bg-white">
              <Globe className="h-3 w-3 mr-1.5" />
              Global Campaigns
            </TabsTrigger>
            <TabsTrigger value="car-owners" className="data-[state=active]:bg-white">
              <Users className="h-3 w-3 mr-1.5" />
              Car Owners
            </TabsTrigger>
            <TabsTrigger value="ai-suggestions" className="data-[state=active]:bg-white">
              <Sparkles className="h-3 w-3 mr-1.5" />
              AI Suggestions
            </TabsTrigger>
            <TabsTrigger value="segmentation" className="data-[state=active]:bg-white">
              <Target className="h-3 w-3 mr-1.5" />
              Segmentation
            </TabsTrigger>
            <TabsTrigger value="qr-affiliate" className="data-[state=active]:bg-white">
              <QrCode className="h-3 w-3 mr-1.5" />
              QR & Affiliate
            </TabsTrigger>
            <TabsTrigger value="carwash" className="data-[state=active]:bg-white">
              <Building2 className="h-3 w-3 mr-1.5" />
              Carwash Campaigns
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
              <BarChart3 className="h-3 w-3 mr-1.5" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Global Campaigns Tab */}
          <TabsContent value="global" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Active Campaigns</p>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">15</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-[#00a63e]" />
                    <p className="text-xs text-[#00a63e]">+3 this month</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">$234,700</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                    <p className="text-xs text-[#00a63e]">+22% this month</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Centers Using</p>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">13/13</p>
                  <p className="text-xs text-[#00a63e] mt-1">100% adoption</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Avg Conversion</p>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">58.4%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-[#00a63e]" />
                    <p className="text-xs text-[#00a63e]">+4.2% improvement</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance Trends</CardTitle>
                  <CardDescription>Revenue and conversions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={campaignPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                      <YAxis yAxisId="left" stroke="#155DFC" style={{ fontSize: '12px' }} />
                      <YAxis yAxisId="right" orientation="right" stroke="#00A63E" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#155DFC" strokeWidth={2} name="Revenue ($)" />
                      <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#00A63E" strokeWidth={2} name="Conversions" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                  <CardDescription>Revenue by campaign channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={channelPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="channel" stroke="#666" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#155DFC" name="Revenue ($)" />
                      <Bar dataKey="roi" fill="#00A63E" name="ROI (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Status Filter */}
            <div className="flex items-center gap-3">
              <Button
                variant={selectedCampaignView === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCampaignView("all")}
              >
                All Campaigns
              </Button>
              <Button
                variant={selectedCampaignView === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCampaignView("active")}
              >
                Active
              </Button>
              <Button
                variant={selectedCampaignView === "scheduled" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCampaignView("scheduled")}
              >
                Scheduled
              </Button>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Global Campaigns</CardTitle>
                  <Badge variant="outline">{globalCampaigns.filter(c => selectedCampaignView === "all" || c.status === selectedCampaignView).length} campaigns</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Centers</TableHead>
                      <TableHead className="text-right">Impressions</TableHead>
                      <TableHead className="text-right">Conversions</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">AOV</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {globalCampaigns
                      .filter(c => selectedCampaignView === "all" || c.status === selectedCampaignView)
                      .map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-[200px]">{campaign.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{campaign.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {campaign.type === "Percentage" ? `${campaign.discount}%` : `$${campaign.discount}`}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div>
                            <p>{campaign.startDate}</p>
                            <p className="text-muted-foreground">{campaign.endDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{campaign.centersUsing}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div>
                            <p className="font-semibold">{campaign.conversions}</p>
                            <p className="text-xs text-muted-foreground">{campaign.clickRate}% CTR</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">${campaign.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${campaign.avgOrderValue}</TableCell>
                        <TableCell>
                          <Badge className={campaign.status === "active" ? "bg-[#00a63e] text-white border-0" : campaign.status === "scheduled" ? "bg-[#155DFC] text-white border-0" : "bg-[#cbced4] text-[#030213] border-0"}>
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => toast.info("View campaign details")}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => toast.info("Edit campaign")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => toast.success("Campaign duplicated")}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Car Owners Tab */}
          <TabsContent value="car-owners" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Distribution</CardTitle>
                  <CardDescription>Customer segments across platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={segmentDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name} ${entry.value}%`}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {segmentDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Impact</CardTitle>
                  <CardDescription>Customer acquisition via campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">New Customers</span>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-semibold">3,456</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3 text-[#00a63e]" />
                      <p className="text-xs text-[#00a63e]">+28.7% this month</p>
                    </div>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Returning Rate</span>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-semibold">68%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3 text-[#00a63e]" />
                      <p className="text-xs text-[#00a63e]">+12% improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Customer Campaigns</CardTitle>
                <CardDescription>Active campaigns targeting car owners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border-[#155DFC]/20 bg-[#155DFC]/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-[#155DFC] text-white border-0">Active</Badge>
                        <Users className="h-5 w-5 text-[#155DFC]" />
                      </div>
                      <h3 className="font-medium mb-2">First Visit Special</h3>
                      <p className="text-sm text-muted-foreground mb-4">30% off for new customers</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conversions</span>
                          <span className="font-semibold">1,234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-semibold">$34,560</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conv. Rate</span>
                          <span className="font-semibold text-[#00a63e]">42%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#00A63E]/20 bg-[#00A63E]/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-[#00A63E] text-white border-0">Active</Badge>
                        <Target className="h-5 w-5 text-[#00A63E]" />
                      </div>
                      <h3 className="font-medium mb-2">Loyalty Rewards</h3>
                      <p className="text-sm text-muted-foreground mb-4">20% for returning customers</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conversions</span>
                          <span className="font-semibold">890</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-semibold">$28,920</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conv. Rate</span>
                          <span className="font-semibold text-[#00a63e]">68%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#9810FA]/20 bg-[#9810FA]/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-[#9810FA] text-white border-0">Active</Badge>
                        <Sparkles className="h-5 w-5 text-[#9810FA]" />
                      </div>
                      <h3 className="font-medium mb-2">Premium Plus</h3>
                      <p className="text-sm text-muted-foreground mb-4">VIP exclusive offers</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conversions</span>
                          <span className="font-semibold">456</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-semibold">$45,680</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conv. Rate</span>
                          <span className="font-semibold text-[#00a63e]">75%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#F54900]/20 bg-[#F54900]/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-[#F54900] text-white border-0">Active</Badge>
                        <Gift className="h-5 w-5 text-[#F54900]" />
                      </div>
                      <h3 className="font-medium mb-2">Referral Program</h3>
                      <p className="text-sm text-muted-foreground mb-4">$20 for each friend referred</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Referrals</span>
                          <span className="font-semibold">567</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-semibold">$22,680</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conv. Rate</span>
                          <span className="font-semibold text-[#00a63e]">48%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#155DFC]/20 bg-[#155DFC]/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-[#155DFC] text-white border-0">Active</Badge>
                        <Heart className="h-5 w-5 text-[#155DFC]" />
                      </div>
                      <h3 className="font-medium mb-2">Birthday Special</h3>
                      <p className="text-sm text-muted-foreground mb-4">Free upgrade on birthday month</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conversions</span>
                          <span className="font-semibold">234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-semibold">$18,920</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conv. Rate</span>
                          <span className="font-semibold text-[#00a63e]">82%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#00A63E]/20 bg-[#00A63E]/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-[#00A63E] text-white border-0">Active</Badge>
                        <Award className="h-5 w-5 text-[#00A63E]" />
                      </div>
                      <h3 className="font-medium mb-2">Membership Tier</h3>
                      <p className="text-sm text-muted-foreground mb-4">Bronze, Silver, Gold rewards</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Members</span>
                          <span className="font-semibold">1,890</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-semibold">$67,450</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Retention</span>
                          <span className="font-semibold text-[#00a63e]">89%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Suggestions Tab */}
          <TabsContent value="ai-suggestions" className="space-y-6 mt-6">
            <Card className="border-[#9810FA]/20 bg-[#9810FA]/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 bg-[#9810FA] rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">AI-Powered Campaign Recommendations</h3>
                    <p className="text-sm text-muted-foreground">Machine learning analysis of booking patterns and customer behavior</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Predicted Impact</p>
                    <p className="text-2xl font-semibold">+1,245</p>
                    <p className="text-xs text-muted-foreground">Additional bookings</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Revenue Potential</p>
                    <p className="text-2xl font-semibold">$47,350</p>
                    <p className="text-xs text-[#00a63e]">Estimated increase</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Avg Confidence</p>
                    <p className="text-2xl font-semibold">90.5%</p>
                    <p className="text-xs text-muted-foreground">AI prediction accuracy</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Avg ROI</p>
                    <p className="text-2xl font-semibold">242%</p>
                    <p className="text-xs text-[#00a63e]">Return on investment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <Card key={suggestion.id} className="border-l-4" style={{ borderLeftColor: ["#155DFC", "#00A63E", "#9810FA", "#F54900"][index % 4] }}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium text-lg">{suggestion.name}</h3>
                              <Badge className="bg-[#9810FA] text-white border-0">
                                {suggestion.confidence}% Confidence
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{suggestion.timeSlot}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{suggestion.segment}</span>
                              </div>
                              <Badge variant="outline">
                                {suggestion.type === "Percentage" ? `${suggestion.discount}%` : `$${suggestion.discount}`} OFF
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#f3f3f5] rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-2">
                            <Brain className="h-4 w-4 text-[#9810FA] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium mb-1">AI Reasoning</p>
                              <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Predicted Bookings</p>
                            <p className="text-lg font-semibold">+{suggestion.predictedBookings}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Revenue Impact</p>
                            <p className="text-lg font-semibold">${suggestion.predictedRevenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Est. Cost</p>
                            <p className="text-lg font-semibold">${suggestion.estimatedCost.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">ROI Estimate</p>
                            <p className="text-lg font-semibold text-[#00a63e]">{suggestion.roi}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between">
                        <div className="space-y-2">
                          <Button className="w-full gap-2 bg-[#9810FA] hover:bg-[#9810FA]/90">
                            <Zap className="h-4 w-4" />
                            Deploy Campaign
                          </Button>
                          <Button variant="outline" className="w-full gap-2">
                            <Edit className="h-4 w-4" />
                            Customize
                          </Button>
                          <Button variant="outline" className="w-full gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-4 space-y-1">
                          <p>Recommended duration: {suggestion.predictedBookings > 400 ? "3 weeks" : "2 weeks"}</p>
                          <p>Best start date: Next Tuesday</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Segmentation Tab */}
          <TabsContent value="segmentation" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Target specific customer groups with tailored campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment, index) => (
                    <Card key={segment.id} className="border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-medium">{segment.name}</h3>
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  segment.conversionRate > 70 ? "border-[#00a63e] text-[#00a63e]" :
                                  segment.conversionRate > 50 ? "border-[#155DFC] text-[#155DFC]" :
                                  "border-[#F54900] text-[#F54900]"
                                )}
                              >
                                {segment.conversionRate}% conversion
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{segment.description}</p>
                          </div>
                          <Button size="sm" className="gap-2">
                            <Target className="h-3 w-3" />
                            Create Campaign
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Customers</p>
                            <p className="text-lg font-semibold">{segment.count.toLocaleString()}</p>
                          </div>
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Avg Spend</p>
                            <p className="text-lg font-semibold">${segment.avgSpend}</p>
                          </div>
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Active Campaigns</p>
                            <p className="text-lg font-semibold">{segment.activeCampaigns}</p>
                          </div>
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Conversion</p>
                            <p className="text-lg font-semibold text-[#00a63e]">{segment.conversionRate}%</p>
                          </div>
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Growth</p>
                            <p className={cn("text-lg font-semibold", segment.monthlyGrowth > 0 ? "text-[#00a63e]" : "text-[#d4183d]")}>
                              {segment.monthlyGrowth > 0 ? "+" : ""}{segment.monthlyGrowth}%
                            </p>
                          </div>
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">LTV</p>
                            <p className="text-lg font-semibold">${segment.ltv.toLocaleString()}</p>
                          </div>
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Churn</p>
                            <p className={cn("text-lg font-semibold", segment.churnRate < 10 ? "text-[#00a63e]" : "text-[#F54900]")}>
                              {segment.churnRate}%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR & Affiliate Tab */}
          <TabsContent value="qr-affiliate" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* QR Campaigns */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>QR Code Campaigns</CardTitle>
                      <CardDescription>Location-based and promotional QR codes</CardDescription>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-3 w-3" />
                      Generate QR
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-[#f3f3f5] rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Total Scans</p>
                      <p className="text-xl font-semibold">3,391</p>
                    </div>
                    <div className="bg-[#f3f3f5] rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Conversions</p>
                      <p className="text-xl font-semibold">1,647</p>
                    </div>
                    <div className="bg-[#f3f3f5] rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                      <p className="text-xl font-semibold">$61K</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {qrCampaigns.map((qr) => (
                      <Card key={qr.id} className="border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="size-16 bg-[#f3f3f5] rounded-lg flex items-center justify-center shrink-0">
                              <QrCode className="h-8 w-8 text-[#155DFC]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{qr.name}</h4>
                                <Badge className="bg-[#00a63e] text-white border-0">{qr.status}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">Code: {qr.qrCode} • {qr.location}</p>
                              <div className="grid grid-cols-4 gap-2 text-xs mb-3">
                                <div>
                                  <p className="text-muted-foreground">Scans</p>
                                  <p className="font-semibold">{qr.scans}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Conversions</p>
                                  <p className="font-semibold">{qr.conversions}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Conv. Rate</p>
                                  <p className="font-semibold text-[#00a63e]">{qr.conversionRate}%</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Revenue</p>
                                  <p className="font-semibold">${qr.revenue.toLocaleString()}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="gap-1 text-xs h-7">
                                  <Download className="h-3 w-3" />
                                  Download
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1 text-xs h-7">
                                  <Copy className="h-3 w-3" />
                                  Copy Link
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1 text-xs h-7">
                                  <BarChart3 className="h-3 w-3" />
                                  Analytics
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Affiliate Programs */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Affiliate Programs</CardTitle>
                      <CardDescription>Partner referral and commission tracking</CardDescription>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-3 w-3" />
                      New Program
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-[#f3f3f5] rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Partners</p>
                      <p className="text-xl font-semibold">43</p>
                    </div>
                    <div className="bg-[#f3f3f5] rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Referrals</p>
                      <p className="text-xl font-semibold">1,435</p>
                    </div>
                    <div className="bg-[#f3f3f5] rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Commission</p>
                      <p className="text-xl font-semibold">$12.4K</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {affiliates.map((aff) => (
                      <Card key={aff.id} className="border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="size-16 bg-[#00A63E]/10 rounded-lg flex items-center justify-center shrink-0">
                              <Share2 className="h-8 w-8 text-[#00A63E]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{aff.name}</h4>
                                <Badge className="bg-[#00a63e] text-white border-0">{aff.status}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">Code: {aff.affiliateCode} • {aff.partners} partners</p>
                              <div className="grid grid-cols-5 gap-2 text-xs mb-3">
                                <div>
                                  <p className="text-muted-foreground">Referrals</p>
                                  <p className="font-semibold">{aff.referrals}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Converted</p>
                                  <p className="font-semibold">{aff.conversions}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Conv. Rate</p>
                                  <p className="font-semibold text-[#00a63e]">{aff.conversionRate}%</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Revenue</p>
                                  <p className="font-semibold">${aff.revenue.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Commission</p>
                                  <p className="font-semibold text-[#9810FA]">${aff.commission.toLocaleString()}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="gap-1 text-xs h-7 w-full">
                                <ExternalLink className="h-3 w-3" />
                                View Partner Portal
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Carwash Campaigns Tab */}
          <TabsContent value="carwash" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Total Campaigns</p>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">{carwashCampaigns.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Across all centers</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">{carwashCampaigns.reduce((sum, c) => sum + c.bookings, 0)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-[#00a63e]" />
                    <p className="text-xs text-[#00a63e]">+15% this week</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">${carwashCampaigns.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-[#00a63e]" />
                    <p className="text-xs text-[#00a63e]">+18% growth</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Avg Performance</p>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-semibold">{Math.round(carwashCampaigns.reduce((sum, c) => sum + c.performance, 0) / carwashCampaigns.length)}%</p>
                  <p className="text-xs text-[#00a63e] mt-1">Exceeding target</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Carwash Center Campaigns</CardTitle>
                <CardDescription>Monitor campaigns created by individual carwash centers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Center Name</TableHead>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead className="text-right">Bookings</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Performance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {carwashCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.centerName}</TableCell>
                        <TableCell>{campaign.campaignName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{campaign.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {campaign.type === "Percentage" ? `${campaign.discount}%` : `$${campaign.discount}`}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{campaign.startDate}</TableCell>
                        <TableCell className="text-right font-semibold">{campaign.bookings}</TableCell>
                        <TableCell className="text-right font-semibold">${campaign.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={cn("h-2 rounded-full", campaign.performance >= 90 ? "bg-[#00a63e]" : campaign.performance >= 70 ? "bg-[#155DFC]" : "bg-[#F54900]")}
                                style={{ width: `${campaign.performance}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{campaign.performance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-[#00a63e] text-white border-0">{campaign.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Time Slot Utilization</CardTitle>
                  <CardDescription>Campaign opportunities by time slot</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={timeSlotData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="time" stroke="#666" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="utilization" fill="#155DFC" name="Current (%)" />
                      <Bar dataKey="potential" fill="#F54900" name="Potential (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Type Performance</CardTitle>
                  <CardDescription>Effectiveness by campaign type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaignTypeData.map((type, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{type.type}</h4>
                          <Badge variant="outline">{type.count} campaigns</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-semibold">${type.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Avg Conv.</p>
                            <p className="font-semibold text-[#00a63e]">{type.avgConversion}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Avg per Campaign</p>
                            <p className="font-semibold">${Math.round(type.revenue / type.count).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>ROI Trends</CardTitle>
                  <CardDescription>Return on investment over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={campaignPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="roi" stroke="#9810FA" fill="#9810FA" fillOpacity={0.2} strokeWidth={2} name="ROI (%)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        /* CARWASH OWNER/ADMIN - Standard Campaign Management */
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Active Campaigns</p>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{campaigns.filter(c => c.isActive).length}</p>
                <p className="text-xs text-muted-foreground mt-1">Running now</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Usage</p>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">234</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+18% this month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Campaign Revenue</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">$8,450</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+12% growth</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">42%</p>
                <p className="text-xs text-[#00a63e] mt-1">Above average</p>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Campaigns</CardTitle>
                  <CardDescription>Create and manage discount campaigns for your carwash</CardDescription>
                </div>
                <Button className="gap-2" onClick={() => setIsAddCampaignDialogOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Create Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {campaigns.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No campaigns yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Create your first campaign to attract more customers</p>
                  <Button onClick={() => setIsAddCampaignDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium">{campaign.name}</h3>
                              <Badge className={campaign.isActive ? "bg-[#00a63e] text-white border-0" : "bg-[#cbced4] text-[#030213] border-0"}>
                                {campaign.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{campaign.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => toast.info("Edit functionality coming soon")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => {
                              if (onDeleteCampaign) onDeleteCampaign(campaign.id);
                              toast.success("Campaign deleted");
                            }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Type</p>
                            <p className="text-sm font-semibold">
                              {campaign.type === "Percentage Discount" ? `${campaign.discountValue}%` : `${campaign.discountValue}`} OFF
                            </p>
                          </div>
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                            <p className="text-sm font-semibold">{campaign.startDate}</p>
                          </div>
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">End Date</p>
                            <p className="text-sm font-semibold">{campaign.endDate}</p>
                          </div>
                          <div className="bg-[#f3f3f5] rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Scope</p>
                            <p className="text-sm font-semibold">{campaign.scope}</p>
                          </div>
                        </div>

                        {campaign.performance && (
                          <div className="border-t border-border pt-4">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Usage Count</p>
                                <p className="font-semibold">{campaign.performance.usageCount}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Revenue</p>
                                <p className="font-semibold">${campaign.performance.revenue.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Conversion</p>
                                <p className="font-semibold text-[#00a63e]">{campaign.performance.conversionRate}%</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Multi-Step Create Campaign Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
        setIsCreateDialogOpen(open);
        if (!open) setCurrentStep(1);
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Step {currentStep} of {totalSteps}: {
                currentStep === 1 ? "Basic Information" :
                currentStep === 2 ? "Discount Settings" :
                currentStep === 3 ? "Schedule & Targeting" :
                "Review & Confirm"
              }
            </DialogDescription>
          </DialogHeader>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                  currentStep === step ? "bg-[#155DFC] text-white" :
                  currentStep > step ? "bg-[#00a63e] text-white" :
                  "bg-[#ececf0] text-muted-foreground"
                )}>
                  {currentStep > step ? <Check className="h-4 w-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={cn(
                    "flex-1 h-1 mx-2 rounded transition-colors",
                    currentStep > step ? "bg-[#00a63e]" : "bg-[#ececf0]"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Campaign Name *</Label>
                <Input 
                  placeholder="e.g., Summer Special 2024" 
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Campaign Type *</Label>
                <Select value={newCampaign.type} onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percentage Discount">Percentage Discount</SelectItem>
                    <SelectItem value="Fixed Discount">Fixed Amount Discount</SelectItem>
                    <SelectItem value="Buy One Get One">Buy One Get One (BOGO)</SelectItem>
                    <SelectItem value="Bundle Deal">Bundle Deal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  placeholder="Describe your campaign and what makes it special..." 
                  rows={4}
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">This will be shown to customers in the app</p>
              </div>
            </div>
          )}

          {/* Step 2: Discount Settings */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discount Type *</Label>
                  <Select value={newCampaign.discountType} onValueChange={(value) => setNewCampaign({ ...newCampaign, discountType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Discount Value *</Label>
                  <div className="relative">
                    <Input 
                      type="number" 
                      placeholder={newCampaign.discountType === "percentage" ? "e.g., 20" : "e.g., 15.00"}
                      value={newCampaign.discountValue}
                      onChange={(e) => setNewCampaign({ ...newCampaign, discountValue: e.target.value })}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {newCampaign.discountType === "percentage" ? "%" : "$"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Minimum Purchase Amount</Label>
                <Input 
                  type="number" 
                  placeholder="Optional - e.g., 50"
                  value={newCampaign.minPurchase}
                  onChange={(e) => setNewCampaign({ ...newCampaign, minPurchase: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Customers must spend at least this amount to use the campaign</p>
              </div>

              <div className="space-y-2">
                <Label>Maximum Uses per Customer</Label>
                <Input 
                  type="number" 
                  placeholder="Optional - leave empty for unlimited"
                  value={newCampaign.maxUses}
                  onChange={(e) => setNewCampaign({ ...newCampaign, maxUses: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Scope</Label>
                <Select value={newCampaign.scope} onValueChange={(value) => setNewCampaign({ ...newCampaign, scope: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Branches">All Branches</SelectItem>
                    <SelectItem value="Specific Branches">Specific Branches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Schedule & Targeting */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input 
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Input 
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input 
                    type="time"
                    value={newCampaign.startTime}
                    onChange={(e) => setNewCampaign({ ...newCampaign, startTime: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input 
                    type="time"
                    value={newCampaign.endTime}
                    onChange={(e) => setNewCampaign({ ...newCampaign, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Active Days of Week</Label>
                <div className="flex gap-2">
                  {daysOptions.map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={newCampaign.daysOfWeek.includes(day) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleDayOfWeek(day)}
                      className="flex-1"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Leave empty for all days</p>
              </div>

              <div className="space-y-2">
                <Label>Target Customer Segment</Label>
                <Select value={newCampaign.targetSegment} onValueChange={(value) => setNewCampaign({ ...newCampaign, targetSegment: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All customers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="new">New Customers Only</SelectItem>
                    <SelectItem value="vip">VIP Customers</SelectItem>
                    <SelectItem value="premium">Premium Buyers</SelectItem>
                    <SelectItem value="budget">Budget Conscious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Module Targeting */}
              {branches && branches.length > 0 && (() => {
                const allModules = branches.flatMap(b => b.businessModules || []);
                const uniqueModules: BusinessModule[] = Array.from(new Set(allModules)) as BusinessModule[];
                
                if (uniqueModules.length === 0) return null;

                const getModuleIcon = (moduleId: BusinessModule) => {
                  const icons = { in_bay: Car, tunnel: Zap, self_service: Wrench, mobile: Truck, manual_detailing: Users };
                  return icons[moduleId];
                };

                const getModuleLabel = (moduleId: BusinessModule) => {
                  const labels = { in_bay: "In-Bay Automatic", tunnel: "Tunnel Wash", self_service: "Self-Service", mobile: "Mobile Detailing", manual_detailing: "Manual Detailing" };
                  return labels[moduleId];
                };

                const toggleModule = (moduleId: BusinessModule) => {
                  setNewCampaign(prev => ({
                    ...prev,
                    targetModules: prev.targetModules.includes(moduleId)
                      ? prev.targetModules.filter(m => m !== moduleId)
                      : [...prev.targetModules, moduleId]
                  }));
                };

                return (
                  <div className="space-y-2">
                    <Label>Target Business Modules</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Select which business modules this campaign applies to (leave empty for all modules)
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {uniqueModules.map((moduleId) => {
                        const Icon = getModuleIcon(moduleId);
                        const isSelected = newCampaign.targetModules.includes(moduleId);
                        return (
                          <div
                            key={moduleId}
                            onClick={() => toggleModule(moduleId)}
                            className={cn(
                              "flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all",
                              isSelected 
                                ? "border-[#155DFC] bg-blue-50" 
                                : "border-gray-200 hover:border-gray-300"
                            )}
                          >
                            <Checkbox checked={isSelected} />
                            <Icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{getModuleLabel(moduleId)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <Card className="border-[#155DFC]/20 bg-[#155DFC]/5">
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Campaign Name</p>
                      <p className="font-medium">{newCampaign.name || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium">{newCampaign.type || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Discount</p>
                      <p className="font-medium">
                        {newCampaign.discountValue ? 
                          `${newCampaign.discountValue}${newCampaign.discountType === "percentage" ? "%" : "$"}` : 
                          "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Scope</p>
                      <p className="font-medium">{newCampaign.scope || "All Branches"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {newCampaign.startDate && newCampaign.endDate ? 
                          `${newCampaign.startDate} to ${newCampaign.endDate}` : 
                          "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Target Segment</p>
                      <p className="font-medium">{newCampaign.targetSegment || "All customers"}</p>
                    </div>
                  </div>

                  {newCampaign.description && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Description</p>
                      <p className="text-sm">{newCampaign.description}</p>
                    </div>
                  )}

                  {newCampaign.daysOfWeek.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Active Days</p>
                      <div className="flex gap-2">
                        {newCampaign.daysOfWeek.map((day) => (
                          <Badge key={day} variant="secondary">{day}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {(newCampaign.startTime || newCampaign.endTime) && (
                    <div>
                      <p className="text-sm text-muted-foreground">Time Restriction</p>
                      <p className="font-medium">
                        {newCampaign.startTime || "00:00"} - {newCampaign.endTime || "23:59"}
                      </p>
                    </div>
                  )}

                  {newCampaign.minPurchase && (
                    <div>
                      <p className="text-sm text-muted-foreground">Minimum Purchase</p>
                      <p className="font-medium">${newCampaign.minPurchase}</p>
                    </div>
                  )}

                  {newCampaign.maxUses && (
                    <div>
                      <p className="text-sm text-muted-foreground">Max Uses per Customer</p>
                      <p className="font-medium">{newCampaign.maxUses}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch 
                      checked={newCampaign.autoActivate}
                      onCheckedChange={(checked) => setNewCampaign({ ...newCampaign, autoActivate: checked })}
                    />
                    <div>
                      <p className="font-medium">Auto-activate campaign</p>
                      <p className="text-sm text-muted-foreground">Campaign will be active immediately after creation</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch 
                      checked={newCampaign.sendNotification}
                      onCheckedChange={(checked) => setNewCampaign({ ...newCampaign, sendNotification: checked })}
                    />
                    <div>
                      <p className="font-medium">Send push notification</p>
                      <p className="text-sm text-muted-foreground">Notify customers about this new campaign</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => {
                if (currentStep === 1) {
                  setIsCreateDialogOpen(false);
                  setCurrentStep(1);
                } else {
                  handlePreviousStep();
                }
              }}
            >
              {currentStep === 1 ? (
                "Cancel"
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </>
              )}
            </Button>

            <div className="flex gap-2">
              {currentStep < totalSteps ? (
                <Button onClick={handleNextStep}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleCreateCampaign} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Create Campaign
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Campaign Dialog */}
      <AddCampaignDialog
        open={isAddCampaignDialogOpen}
        onOpenChange={setIsAddCampaignDialogOpen}
        branches={branches}
        services={services}
        packages={packages}
        onAddCampaign={(campaign) => {
          if (onCreateCampaign) {
            onCreateCampaign(campaign);
          }
          toast.success(`Campaign "${campaign.name}" created successfully!`);
        }}
      />
    </div>
  );
}
