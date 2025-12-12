"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  DollarSign, 
  Package, 
  Lightbulb, 
  Star,
  Search,
  Filter,
  ChevronDown,
  Settings,
  Eye,
  EyeOff,
  MapPin,
  Car,
  Sparkles,
  MoreVertical,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ServiceCatalog } from "./ServiceCatalog";
import { AIInsights } from "./AIInsights";

interface GlobalService {
  id: string;
  name: string;
  description: string;
  vehicleTypePricing?: VehicleTypePrice[];
  category: string;
  vehicleTypes: string[];
  isActive?: boolean;
}

interface CenterService {
  id: string;
  globalServiceId: string;
  name: string;
  description: string;
  customPrice: number;
  customDuration: number;
  isActive: boolean;
  availableBranches: string[];
  category: string;
  vehicleTypes: string[];
}

interface VehicleTypePrice {
  vehicleType: string;
  price: number;
  discountPrice?: number;
  duration: number;
}

interface CenterPackage {
  id: string;
  name: string;
  description: string;
  includedServices: string[];
  vehicleTypePricing: VehicleTypePrice[];
  isActive: boolean;
  availableBranches: string[];
  vehicleTypes: string[];
  rating: number;
  bookingCount: number;
}

interface Branch {
  id: string;
  name: string;
}

interface ServicesPackagesManagementProps {
  globalServices: GlobalService[];
  centerServices: CenterService[];
  centerPackages: CenterPackage[];
  branches: Branch[];
  onToggleService: (globalServiceId: string, isActive: boolean) => void;
  onUpdateService: (serviceId: string, updates: Partial<CenterService>) => void;
  onCreatePackage: (pkg: Omit<CenterPackage, 'id' | 'rating' | 'bookingCount'>) => void;
  onUpdatePackage: (packageId: string, updates: Partial<CenterPackage>) => void;
  onDeletePackage: (packageId: string) => void;
  onSuggestNewService: (suggestion: any) => void;
}

export function ServicesPackagesManagement({
  globalServices,
  centerServices,
  centerPackages,
  branches,
  onToggleService,
  onUpdateService,
  onCreatePackage,
  onUpdatePackage,
  onDeletePackage,
  onSuggestNewService,
}: ServicesPackagesManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("services");
  const [viewMode, setViewMode] = useState<"catalog" | "list">("catalog");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showServiceEditor, setShowServiceEditor] = useState<string | null>(null);

  // Calculate statistics
  const totalServices = centerServices.length;
  const activeServices = centerServices.filter(s => s.isActive).length;
  const totalPackages = centerPackages.length;
  const activePackages = centerPackages.filter(p => p.isActive).length;
  const avgPrice = totalServices > 0 
    ? Math.round(centerServices.reduce((sum, s) => sum + s.customPrice, 0) / totalServices)
    : 0;
  const avgDuration = totalServices > 0
    ? Math.round(centerServices.reduce((sum, s) => sum + s.customDuration, 0) / totalServices)
    : 0;
  
  const categories = Array.from(new Set(centerServices.map(s => s.category)));

  // Filter services
  const filteredServices = centerServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && service.isActive) ||
                         (statusFilter === "inactive" && !service.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Category breakdown for analytics
  const categoryBreakdown = categories.map(cat => {
    const count = centerServices.filter(s => s.category === cat).length;
    const percentage = Math.round((count / totalServices) * 100);
    return { category: cat, count, percentage };
  });

  // Price distribution
  const priceDistribution = [
    { 
      tier: "Budget ($0-$50)", 
      count: centerServices.filter(s => s.customPrice <= 50).length 
    },
    { 
      tier: "Standard ($51-$150)", 
      count: centerServices.filter(s => s.customPrice > 50 && s.customPrice <= 150).length 
    },
    { 
      tier: "Premium ($150+)", 
      count: centerServices.filter(s => s.customPrice > 150).length 
    }
  ];

  // Top services by price
  const topServices = [...centerServices]
    .sort((a, b) => b.customPrice - a.customPrice)
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl">Services & Packages</h2>
        <p className="text-muted-foreground">Manage individual services and bundled packages across all companies</p>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="bg-[#ececf0] p-1 h-9 w-fit">
          <TabsTrigger value="services" className="data-[state=active]:bg-white px-4 gap-2">
            <Package className="h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="packages" className="data-[state=active]:bg-white px-4 gap-2">
            <Sparkles className="h-4 w-4" />
            Packages
          </TabsTrigger>
          <TabsTrigger value="suggested" className="data-[state=active]:bg-white px-4 gap-2">
            <Lightbulb className="h-4 w-4" />
            Suggested
          </TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services" className="mt-6 space-y-6">
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-[#ececf0] p-1 rounded-lg w-fit">
              <Button
                variant={viewMode === "catalog" ? "secondary" : "ghost"}
                size="sm"
                className={viewMode === "catalog" ? "bg-white" : ""}
                onClick={() => setViewMode("catalog")}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Service Catalog
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className={viewMode === "list" ? "bg-white" : ""}
                onClick={() => setViewMode("list")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Services
              </Button>
            </div>
          </div>

          {/* Catalog View */}
          {viewMode === "catalog" && (
            <ServiceCatalog
              globalServices={globalServices}
              centerServices={centerServices}
              onSelectService={(serviceId) => {
                if (selectedServices.includes(serviceId)) {
                  setSelectedServices(selectedServices.filter(id => id !== serviceId));
                } else {
                  setSelectedServices([...selectedServices, serviceId]);
                }
              }}
              onEditService={(serviceId) => {
                setShowServiceEditor(serviceId);
              }}
              selectedServices={selectedServices}
              onCreatePackage={(services) => {
                const selectedServiceData = globalServices.filter(s => services.includes(s.id));
                toast.success(`Creating package with ${selectedServiceData.length} services`);
                // Here you would call onCreatePackage with the package data
              }}
            />
          )}

          {/* List View */}
          {viewMode === "list" && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Services</p>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{totalServices}</p>
                <p className="text-xs text-muted-foreground mt-1">{activeServices} active</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{categories.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Service types available</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg. Price</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">${avgPrice}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">Competitive pricing</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg. Duration</p>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{avgDuration} min</p>
                <p className="text-xs text-muted-foreground mt-1">Average service time</p>
              </CardContent>
            </Card>
          </div>

          {/* Service Catalog Card */}
          <Card className="border-border">
            <div className="p-6 space-y-8">
              {/* Title and Filters */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Service Catalog</h3>
                  <p className="text-muted-foreground mt-1">{filteredServices.length} services found</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-52 bg-[#f3f3f5] border-0"
                    />
                  </div>

                  {/* Category Filter */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="bg-[#f3f3f5] border-0 gap-2">
                        <Filter className="h-4 w-4" />
                        All Categories
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setCategoryFilter("all")}>
                        All Categories
                      </DropdownMenuItem>
                      {categories.map(cat => (
                        <DropdownMenuItem key={cat} onClick={() => setCategoryFilter(cat)}>
                          {cat}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Status Filter */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="bg-[#f3f3f5] border-0 gap-2">
                        All Status
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Status</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>Inactive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Add Service Button */}
                  <Button className="bg-primary text-primary-foreground gap-2">
                    <Plus className="h-4 w-4" />
                    Add Service
                  </Button>
                </div>
              </div>

              {/* Services Table */}
              <div className="border border-border/40 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border/40 hover:bg-transparent">
                      <TableHead className="font-medium">Service Name</TableHead>
                      <TableHead className="font-medium">Company</TableHead>
                      <TableHead className="font-medium">Category</TableHead>
                      <TableHead className="font-medium text-right">Price</TableHead>
                      <TableHead className="font-medium text-center">Duration</TableHead>
                      <TableHead className="font-medium text-center">Status</TableHead>
                      <TableHead className="font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.map((service) => (
                      <TableRow key={service.id} className="border-b border-border/40">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="bg-[rgba(3,2,19,0.1)] rounded-lg p-2">
                              <Package className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-normal">{service.name}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">{service.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Sparkle Wash Co.</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize border-border/40">
                            {service.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-[#00a63e]">${service.customPrice}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{service.customDuration}m</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <Switch 
                              checked={service.isActive}
                              onCheckedChange={(checked) => onUpdateService(service.id, { isActive: checked })}
                              className="data-[state=checked]:bg-primary"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Service
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>

          {/* Analytics Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Services by Category */}
            <Card className="border-border">
              <CardHeader className="pb-0 pt-6 px-6">
                <CardTitle className="text-base">Services by Category</CardTitle>
                <CardDescription>Distribution across service types</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-6 space-y-4">
                {categoryBreakdown.map(({ category, count, percentage }) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{category}</span>
                      <span className="text-muted-foreground">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-[#ececf0] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Price Distribution */}
            <Card className="border-border">
              <CardHeader className="pb-0 pt-6 px-6">
                <CardTitle className="text-base">Price Distribution</CardTitle>
                <CardDescription>Services grouped by price tier</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-6 space-y-4">
                {priceDistribution.map(({ tier, count }) => {
                  const percentage = totalServices > 0 ? Math.round((count / totalServices) * 100) : 0;
                  const color = tier.includes("Budget") ? "#00c950" : 
                               tier.includes("Standard") ? "#2b7fff" : "#ad46ff";
                  
                  return (
                    <div key={tier} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{tier}</span>
                        <span className="text-muted-foreground">{count} services</span>
                      </div>
                      <div className="h-2 bg-[#ececf0] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ width: `${percentage}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Top Services */}
            <Card className="border-border">
              <CardHeader className="pb-0 pt-6 px-6">
                <CardTitle className="text-base">Top Services</CardTitle>
                <CardDescription>Highest priced offerings</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-6 space-y-3">
                {topServices.map((service, index) => (
                  <div key={service.id} className="border border-border/40 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[rgba(3,2,19,0.1)] rounded-full h-6 w-6 flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-normal">{service.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{service.category}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#00a63e]">${service.customPrice}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
            </>
          )}
        </TabsContent>

        {/* Packages Tab */}
        <TabsContent value="packages" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">
            Packages management coming soon
          </div>
        </TabsContent>

        {/* Suggested Tab */}
        <TabsContent value="suggested" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">
            Service suggestions coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
