"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Search,
  Building2,
  User,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  Package,
  Crown,
  Heart,
  AlertTriangle,
  Zap,
  Target,
  ArrowUp,
  ArrowDown,
  Minus,
  MoreVertical,
  FileText,
  Star,
  Truck,
  Briefcase,
  Filter,
  MapPin,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../ui/utils";
import { AddCustomerDialog } from "../dialogs/AddCustomerDialog";

interface CustomerB2B {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  fleetSize: number;
  contractType: "monthly" | "quarterly" | "annual";
  contractStatus: "active" | "expiring" | "expired";
  contractRenewalDate: string;
  monthlyRevenue: number;
  totalRevenue: number;
  lastServiceDate: string;
  lifecycle: "prospect" | "active" | "at-risk" | "churned";
  accountManager?: string;
  discountTier: number;
}

interface CustomerB2C {
  id: string;
  name: string;
  email: string;
  phone: string;
  carModel: string;
  licensePlate: string;
  totalBookings: number;
  totalSpent: number;
  lastVisit: string;
  lifecycle: "prospect" | "active" | "at-risk" | "churned" | "reactivated";
  loyaltyPoints: number;
  membershipTier: "bronze" | "silver" | "gold" | "platinum";
  registeredDate: string;
  preferredServices: string[];
}

const mockB2BCustomers: CustomerB2B[] = [
  {
    id: "b2b-1",
    companyName: "Metro Logistics Inc",
    contactPerson: "Robert Johnson",
    email: "robert.j@metrologistics.com",
    phone: "+1 (555) 234-5678",
    fleetSize: 45,
    contractType: "annual",
    contractStatus: "active",
    contractRenewalDate: "2025-03-15",
    monthlyRevenue: 4500,
    totalRevenue: 48000,
    lastServiceDate: "2024-12-07",
    lifecycle: "active",
    accountManager: "Sarah Chen",
    discountTier: 15,
  },
  {
    id: "b2b-2",
    companyName: "QuickDeliver Corp",
    contactPerson: "Maria Garcia",
    email: "m.garcia@quickdeliver.com",
    phone: "+1 (555) 345-6789",
    fleetSize: 28,
    contractType: "monthly",
    contractStatus: "expiring",
    contractRenewalDate: "2024-12-31",
    monthlyRevenue: 2800,
    totalRevenue: 28000,
    lastServiceDate: "2024-12-05",
    lifecycle: "at-risk",
    accountManager: "Mike Wilson",
    discountTier: 10,
  },
  {
    id: "b2b-3",
    companyName: "CityWide Taxis",
    contactPerson: "James Lee",
    email: "j.lee@citywideataxi.com",
    phone: "+1 (555) 456-7890",
    fleetSize: 67,
    contractType: "annual",
    contractStatus: "active",
    contractRenewalDate: "2025-06-20",
    monthlyRevenue: 6700,
    totalRevenue: 75000,
    lastServiceDate: "2024-12-08",
    lifecycle: "active",
    accountManager: "Emily Davis",
    discountTier: 20,
  },
  {
    id: "b2b-4",
    companyName: "TechStart Ventures",
    contactPerson: "Alex Turner",
    email: "alex@techstart.io",
    phone: "+1 (555) 567-8901",
    fleetSize: 12,
    contractType: "quarterly",
    contractStatus: "active",
    contractRenewalDate: "2025-02-01",
    monthlyRevenue: 1200,
    totalRevenue: 14400,
    lastServiceDate: "2024-12-06",
    lifecycle: "active",
    accountManager: "Sarah Chen",
    discountTier: 8,
  },
];

const mockB2CCustomers: CustomerB2C[] = [
  {
    id: "b2c-1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 111-2222",
    carModel: "Tesla Model 3",
    licensePlate: "ABC 1234",
    totalBookings: 24,
    totalSpent: 840,
    lastVisit: "2024-12-07",
    lifecycle: "active",
    loyaltyPoints: 420,
    membershipTier: "gold",
    registeredDate: "2024-01-15",
    preferredServices: ["Premium Wash", "Interior Detail"],
  },
  {
    id: "b2c-2",
    name: "Emily Johnson",
    email: "emily.j@email.com",
    phone: "+1 (555) 222-3333",
    carModel: "Honda Civic",
    licensePlate: "XYZ 5678",
    totalBookings: 18,
    totalSpent: 540,
    lastVisit: "2024-12-05",
    lifecycle: "active",
    loyaltyPoints: 270,
    membershipTier: "silver",
    registeredDate: "2024-02-20",
    preferredServices: ["Basic Wash", "Tire Shine"],
  },
  {
    id: "b2c-3",
    name: "Michael Davis",
    email: "m.davis@email.com",
    phone: "+1 (555) 333-4444",
    carModel: "BMW X5",
    licensePlate: "BMW 2023",
    totalBookings: 42,
    totalSpent: 1890,
    lastVisit: "2024-12-08",
    lifecycle: "active",
    loyaltyPoints: 945,
    membershipTier: "platinum",
    registeredDate: "2023-11-10",
    preferredServices: ["Full Service", "Premium Wax", "Interior Detail"],
  },
  {
    id: "b2c-4",
    name: "Sarah Wilson",
    email: "sarah.w@email.com",
    phone: "+1 (555) 444-5555",
    carModel: "Toyota Camry",
    licensePlate: "DEF 9012",
    totalBookings: 6,
    totalSpent: 180,
    lastVisit: "2024-09-15",
    lifecycle: "at-risk",
    loyaltyPoints: 90,
    membershipTier: "bronze",
    registeredDate: "2024-05-01",
    preferredServices: ["Basic Wash"],
  },
  {
    id: "b2c-5",
    name: "David Martinez",
    email: "david.m@email.com",
    phone: "+1 (555) 555-6666",
    carModel: "Ford F-150",
    licensePlate: "TRUCK1",
    totalBookings: 2,
    totalSpent: 90,
    lastVisit: "2024-12-02",
    lifecycle: "prospect",
    loyaltyPoints: 45,
    membershipTier: "bronze",
    registeredDate: "2024-11-28",
    preferredServices: ["Exterior Wash"],
  },
];

interface EnhancedCustomerHubProps {
  branches?: any[];
  selectedBranchFilter?: string;
  onBranchFilterChange?: (branchId: string) => void;
}

export function EnhancedCustomerHub({
  branches = [],
  selectedBranchFilter = "all",
  onBranchFilterChange,
}: EnhancedCustomerHubProps) {
  const [showBranchSelector, setShowBranchSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState<"all" | "b2b" | "b2c">("all");
  const [lifecycleFilter, setLifecycleFilter] = useState<string>("all");
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);

  // Get selected branch
  const selectedBranch = branches.find((b) => b.id === selectedBranchFilter);

  const getLifecycleBadge = (lifecycle: string) => {
    switch (lifecycle) {
      case "prospect":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700"><Target size={12} className="mr-1" /> Prospect</Badge>;
      case "active":
        return <Badge className="bg-green-600 text-white"><Zap size={12} className="mr-1" /> Active</Badge>;
      case "at-risk":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300"><AlertTriangle size={12} className="mr-1" /> At Risk</Badge>;
      case "churned":
        return <Badge variant="destructive"><TrendingDown size={12} className="mr-1" /> Churned</Badge>;
      case "reactivated":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700"><TrendingUp size={12} className="mr-1" /> Reactivated</Badge>;
      default:
        return <Badge variant="outline">{lifecycle}</Badge>;
    }
  };

  const getMembershipBadge = (tier: string) => {
    switch (tier) {
      case "platinum":
        return <Badge className="bg-purple-600 text-white"><Crown size={12} className="mr-1" /> Platinum</Badge>;
      case "gold":
        return <Badge className="bg-yellow-600 text-white"><Star size={12} className="mr-1" /> Gold</Badge>;
      case "silver":
        return <Badge variant="outline" className="bg-gray-100"><Star size={12} className="mr-1" /> Silver</Badge>;
      case "bronze":
        return <Badge variant="outline" className="bg-orange-100 text-orange-700"><Star size={12} className="mr-1" /> Bronze</Badge>;
      default:
        return <Badge variant="outline">{tier}</Badge>;
    }
  };

  const getContractStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600 text-white">Active</Badge>;
      case "expiring":
        return <Badge className="bg-orange-600 text-white">Expiring Soon</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Statistics
  const b2bStats = {
    total: mockB2BCustomers.length,
    active: mockB2BCustomers.filter(c => c.lifecycle === "active").length,
    atRisk: mockB2BCustomers.filter(c => c.lifecycle === "at-risk").length,
    totalFleet: mockB2BCustomers.reduce((sum, c) => sum + c.fleetSize, 0),
    monthlyRevenue: mockB2BCustomers.reduce((sum, c) => sum + c.monthlyRevenue, 0),
    totalRevenue: mockB2BCustomers.reduce((sum, c) => sum + c.totalRevenue, 0),
  };

  const b2cStats = {
    total: mockB2CCustomers.length,
    active: mockB2CCustomers.filter(c => c.lifecycle === "active").length,
    atRisk: mockB2CCustomers.filter(c => c.lifecycle === "at-risk").length,
    totalBookings: mockB2CCustomers.reduce((sum, c) => sum + c.totalBookings, 0),
    totalSpent: mockB2CCustomers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgSpent: Math.round(mockB2CCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / mockB2CCustomers.length),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Mobile: Branch Selector */}
      {branches.length > 0 && (
        <div className="md:hidden relative mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBranchSelector(!showBranchSelector)}
            className="h-9 px-3 gap-2"
          >
            <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center">
              <MapPin size={12} className="text-blue-600" />
            </div>
            <span className="text-xs font-medium">
              {selectedBranchFilter === "all"
                ? "All Branches"
                : selectedBranch?.name || "Branch"}
            </span>
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform",
                showBranchSelector && "rotate-180"
              )}
            />
          </Button>

          {/* Branch Dropdown */}
          <AnimatePresence>
            {showBranchSelector && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setShowBranchSelector(false)}
                />
                {/* Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="fixed left-4 right-4 top-[72px] bg-white border border-neutral-200 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-3 border-b border-neutral-200">
                    <h3 className="text-sm font-semibold text-neutral-900">Select Branch</h3>
                  </div>
                  
                  {/* Branch List */}
                  <div className="max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        if (onBranchFilterChange) {
                          onBranchFilterChange("all");
                        }
                        setShowBranchSelector(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-3 transition-colors",
                        selectedBranchFilter === "all"
                          ? "bg-blue-50 text-blue-900"
                          : "hover:bg-neutral-50"
                      )}
                    >
                      <span className="text-sm font-medium">All Branches</span>
                      {selectedBranchFilter === "all" && (
                        <CheckCircle size={16} className="text-blue-600" />
                      )}
                    </button>
                    <Separator />
                    {branches.map((branch) => (
                      <button
                        key={branch.id}
                        onClick={() => {
                          if (onBranchFilterChange) {
                            onBranchFilterChange(branch.id);
                          }
                          setShowBranchSelector(false);
                        }}
                        className={cn(
                          "w-full flex items-start justify-between p-3 transition-colors",
                          selectedBranchFilter === branch.id
                            ? "bg-blue-50 text-blue-900"
                            : "hover:bg-neutral-50"
                        )}
                      >
                        <div className="text-left">
                          <p className="text-sm font-semibold">{branch.name}</p>
                          <p className="text-xs text-neutral-600 mt-0.5">{branch.city}</p>
                        </div>
                        {selectedBranchFilter === branch.id && (
                          <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950 mb-1 flex items-center gap-2 hidden md:flex">
            <Users className="text-blue-600" size={24} />
            Enhanced Customer Hub
          </h1>
          <p className="text-sm text-muted-foreground hidden md:block">
            B2B Fleet Management & B2C Customer Lifecycle Analytics
          </p>
          
          {/* Mobile: Page Title */}
          <div className="md:hidden">
            <h1 className="text-xl font-semibold text-neutral-900">Customers</h1>
            <p className="text-sm text-neutral-600 mt-0.5">B2B & B2C customer management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <FileText size={16} className="mr-2" />
            Export Data
          </Button>
          <Button onClick={() => setIsAddCustomerDialogOpen(true)}>
            <User size={16} className="mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Tabs for B2B vs B2C */}
      <Tabs value={selectedSegment} onValueChange={(value: any) => setSelectedSegment(value)} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="b2b" className="flex items-center gap-2">
            <Building2 size={14} />
            B2B Fleet
          </TabsTrigger>
          <TabsTrigger value="b2c" className="flex items-center gap-2">
            <User size={14} />
            B2C Individual
          </TabsTrigger>
        </TabsList>

        {/* B2B Fleet Management Tab */}
        <TabsContent value="b2b" className="space-y-6 mt-6">
          {/* B2B Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card className="border-2 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">{b2bStats.total}</div>
                <div className="text-xs text-muted-foreground">B2B Clients</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{b2bStats.active}</div>
                <div className="text-xs text-muted-foreground">Active Contracts</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-orange-200">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-orange-600">{b2bStats.atRisk}</div>
                <div className="text-xs text-muted-foreground">At Risk</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600">{b2bStats.totalFleet}</div>
                <div className="text-xs text-muted-foreground">Total Vehicles</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-lg font-bold text-neutral-950">${(b2bStats.monthlyRevenue / 1000).toFixed(1)}K</div>
                <div className="text-xs text-muted-foreground">Monthly MRR</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-200">
              <CardContent className="pt-6">
                <div className="text-lg font-bold text-green-600">${(b2bStats.totalRevenue / 1000).toFixed(0)}K</div>
                <div className="text-xs text-muted-foreground">Total Revenue</div>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    placeholder="Search by company name, contact person, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter size={16} className="mr-2" />
                      Lifecycle: {lifecycleFilter === "all" ? "All" : lifecycleFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("all")}>All Stages</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("prospect")}>Prospects</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("active")}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("at-risk")}>At Risk</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("churned")}>Churned</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* B2B Customer Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 size={20} />
                B2B Fleet Customers ({mockB2BCustomers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Fleet Size</TableHead>
                      <TableHead>Contract</TableHead>
                      <TableHead>MRR</TableHead>
                      <TableHead>Lifecycle</TableHead>
                      <TableHead>Account Manager</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockB2BCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold flex items-center gap-2">
                              <Briefcase size={14} className="text-muted-foreground" />
                              {customer.companyName}
                            </div>
                            <div className="text-xs text-muted-foreground">{customer.discountTier}% Discount Tier</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{customer.contactPerson}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail size={10} /> {customer.email}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Phone size={10} /> {customer.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Truck size={16} className="text-blue-600" />
                            <span className="font-semibold">{customer.fleetSize}</span>
                            <span className="text-xs text-muted-foreground">vehicles</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {getContractStatusBadge(customer.contractStatus)}
                            <div className="text-xs text-muted-foreground mt-1 capitalize">{customer.contractType}</div>
                            <div className="text-xs text-muted-foreground">Renews: {customer.contractRenewalDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-green-600">
                            ${customer.monthlyRevenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Total: ${(customer.totalRevenue / 1000).toFixed(0)}K
                          </div>
                        </TableCell>
                        <TableCell>{getLifecycleBadge(customer.lifecycle)}</TableCell>
                        <TableCell>
                          <div className="text-sm">{customer.accountManager}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.info("Viewing customer details...")}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success("Contract renewal email sent")}>
                                Send Renewal Reminder
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info("Generating invoice...")}>
                                Generate Invoice
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toast.warning("Edit not implemented yet")}>
                                Edit Contract
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* B2C Individual Customers Tab */}
        <TabsContent value="b2c" className="space-y-6 mt-6">
          {/* B2C Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card className="border-2 border-purple-200">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600">{b2cStats.total}</div>
                <div className="text-xs text-muted-foreground">B2C Customers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{b2cStats.active}</div>
                <div className="text-xs text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-orange-200">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-orange-600">{b2cStats.atRisk}</div>
                <div className="text-xs text-muted-foreground">At Risk</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">{b2cStats.totalBookings}</div>
                <div className="text-xs text-muted-foreground">Total Bookings</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-200">
              <CardContent className="pt-6">
                <div className="text-lg font-bold text-green-600">${b2cStats.totalSpent.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Spent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-lg font-bold text-neutral-950">${b2cStats.avgSpent}</div>
                <div className="text-xs text-muted-foreground">Avg CLV</div>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    placeholder="Search by name, email, car model, or license plate..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter size={16} className="mr-2" />
                      Lifecycle: {lifecycleFilter === "all" ? "All" : lifecycleFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("all")}>All Stages</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("prospect")}>Prospects</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("active")}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("at-risk")}>At Risk</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("reactivated")}>Reactivated</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLifecycleFilter("churned")}>Churned</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* B2C Customer Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} />
                B2C Individual Customers ({mockB2CCustomers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Loyalty</TableHead>
                      <TableHead>Lifecycle</TableHead>
                      <TableHead>Preferred Services</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockB2CCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold">{customer.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail size={10} /> {customer.email}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Phone size={10} /> {customer.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm font-medium">{customer.carModel}</div>
                            <div className="text-xs text-muted-foreground">{customer.licensePlate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm font-semibold">{customer.totalBookings} visits</div>
                            <div className="text-xs text-green-600 font-semibold">${customer.totalSpent} spent</div>
                            <div className="text-xs text-muted-foreground">Last: {customer.lastVisit}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {getMembershipBadge(customer.membershipTier)}
                            <div className="text-xs text-muted-foreground mt-1">
                              {customer.loyaltyPoints} points
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getLifecycleBadge(customer.lifecycle)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {customer.preferredServices.slice(0, 2).map((service, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {customer.preferredServices.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{customer.preferredServices.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.info("Viewing customer profile...")}>
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success("Booking reminder sent")}>
                                Send Booking Reminder
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info("Applying loyalty reward...")}>
                                Apply Loyalty Reward
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toast.warning("Edit not implemented yet")}>
                                Edit Customer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Customers Combined View */}
        <TabsContent value="all" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* B2B Summary Card */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Building2 size={20} />
                  B2B Fleet Customers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{b2bStats.total}</div>
                    <div className="text-sm text-muted-foreground">Companies</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{b2bStats.totalFleet}</div>
                    <div className="text-sm text-muted-foreground">Vehicles</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                    <span className="text-lg font-bold text-green-600">${(b2bStats.monthlyRevenue / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Revenue</span>
                    <span className="text-lg font-bold">${(b2bStats.totalRevenue / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => setSelectedSegment("b2b")}>
                  View B2B Customers
                  <ArrowUp size={16} className="ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* B2C Summary Card */}
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <User size={20} />
                  B2C Individual Customers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{b2cStats.total}</div>
                    <div className="text-sm text-muted-foreground">Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{b2cStats.totalBookings}</div>
                    <div className="text-sm text-muted-foreground">Total Visits</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Total Revenue</span>
                    <span className="text-lg font-bold text-green-600">${b2cStats.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg CLV</span>
                    <span className="text-lg font-bold">${b2cStats.avgSpent}</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => setSelectedSegment("b2c")}>
                  View B2C Customers
                  <ArrowUp size={16} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Lifecycle Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Lifecycle Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {["prospect", "active", "at-risk", "reactivated", "churned"].map((stage) => {
                  const b2bCount = mockB2BCustomers.filter(c => c.lifecycle === stage).length;
                  const b2cCount = mockB2CCustomers.filter(c => c.lifecycle === stage).length;
                  const total = b2bCount + b2cCount;
                  
                  return (
                    <div key={stage} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        {getLifecycleBadge(stage)}
                        <span className="text-2xl font-bold">{total}</span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>B2B: {b2bCount}</div>
                        <div>B2C: {b2cCount}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Customer Dialog */}
      <AddCustomerDialog
        open={isAddCustomerDialogOpen}
        onOpenChange={setIsAddCustomerDialogOpen}
        onAddCustomer={(customer, type) => {
          console.log(`New ${type} customer added:`, customer);
          // In real app, this would add to appropriate customer list
        }}
      />
    </div>
  );
}