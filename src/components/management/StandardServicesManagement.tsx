"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  DollarSign, 
  Car, 
  Package, 
  Sparkles,
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  TrendingUp,
  Percent,
  TrendingDown,
  Zap,
  CheckCircle2,
  Target,
  Layers,
  UserPlus,
  Building2
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { ServiceTaxonomyDropdown, ServiceTaxonomyItem } from "./ServiceTaxonomyDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../ui/utils";

interface VehicleTypePrice {
  vehicleType: string;
  price: number;
  discountPrice?: number;
  duration: number;
}

interface StandardService {
  id: string;
  name: string;
  description: string;
  vehicleTypePricing: VehicleTypePrice[];
  vehicleTypes: string[];
  category: string;
  isActive: boolean;
  createdDate: string;
  companyName?: string; // Carwash center that offers this service
}

interface StandardPackage {
  id: string;
  name: string;
  description: string;
  includedServices: string[];
  vehicleTypePricing: VehicleTypePrice[];
  vehicleTypes: string[];
  isActive: boolean;
  createdDate: string;
}

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
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
}

interface StandardServicesManagementProps {
  services: StandardService[];
  packages: StandardPackage[];
  serviceRequests?: ServiceRequest[];
  onAddService: (service: Omit<StandardService, 'id' | 'createdDate'>) => void;
  onEditService: (id: string, service: Partial<StandardService>) => void;
  onDeleteService: (id: string) => void;
  onToggleService?: (id: string) => void;
  onAddPackage: (pkg: Omit<StandardPackage, 'id' | 'createdDate'>) => void;
  onEditPackage: (id: string, pkg: Partial<StandardPackage>) => void;
  onDeletePackage: (id: string) => void;
  onApproveRequest?: (id: string) => void;
  onRejectRequest?: (id: string, reason: string) => void;
}

// Mock package data with stats
const mockPackageStats = [
  {
    id: "gp1",
    name: "Quick Care Package",
    category: "value",
    description: "Perfect for regular maintenance - exterior wash and quick interior refresh",
    includedServices: ["Basic Wash", "Interior Cleaning", "Undercarriage Wash"],
    price: 69,
    originalPrice: 90,
    duration: 65,
    servicesCount: 3,
    bookings: 342,
    revenue: 23598,
    isPopular: true,
    icon: "package"
  },
  {
    id: "gp2",
    name: "Premium Shine Package",
    category: "premium",
    description: "Premium wash with wax protection and wheel detailing",
    includedServices: ["Premium Wash", "Wax & Polish", "Wheel Detailing"],
    price: 139,
    originalPrice: 170,
    duration: 125,
    servicesCount: 3,
    bookings: 256,
    revenue: 35584,
    isPopular: true,
    icon: "sparkles"
  },
  {
    id: "gp3",
    name: "Ultimate Detail Package",
    category: "luxury",
    description: "Complete transformation - full detailing inside and out",
    includedServices: ["Full Detailing", "Engine Bay Cleaning", "Leather Treatment"],
    price: 289,
    originalPrice: 365,
    duration: 285,
    servicesCount: 4,
    bookings: 128,
    revenue: 36992,
    isPopular: true,
    icon: "star"
  },
  {
    id: "gp4",
    name: "Protection Suite",
    category: "protection",
    description: "Maximum protection for your vehicle investment",
    includedServices: ["Ceramic Coating", "Fabric Protection", "Windshield Treatment"],
    price: 429,
    originalPrice: 505,
    duration: 240,
    servicesCount: 3,
    bookings: 89,
    revenue: 38181,
    isPopular: false,
    icon: "shield"
  },
  {
    id: "gp5",
    name: "Interior Refresh Package",
    category: "maintenance",
    description: "Deep interior cleaning with odor removal and fabric protection",
    includedServices: ["Interior Cleaning", "Leather Treatment", "Odor Removal"],
    price: 239,
    originalPrice: 300,
    duration: 220,
    servicesCount: 4,
    bookings: 167,
    revenue: 39913,
    isPopular: false,
    icon: "package"
  },
  {
    id: "gp6",
    name: "Weekend Special",
    category: "value",
    description: "Quick service package for busy weekends",
    includedServices: ["Express Wash", "Pet Hair Removal", "Wheel Detailing"],
    price: 79,
    originalPrice: 105,
    duration: 70,
    servicesCount: 3,
    bookings: 421,
    revenue: 33259,
    isPopular: true,
    icon: "package"
  },
  {
    id: "gp7",
    name: "New Car Package",
    category: "protection",
    description: "Protect your new investment with ceramic coating and window tinting",
    includedServices: ["Ceramic Coating", "Window Tinting", "Fabric Protection"],
    price: 549,
    originalPrice: 660,
    duration: 360,
    servicesCount: 3,
    bookings: 73,
    revenue: 40077,
    isPopular: false,
    icon: "shield"
  },
  {
    id: "gp8",
    name: "Restoration Package",
    category: "luxury",
    description: "Bring your car back to showroom condition",
    includedServices: ["Paint Correction", "Headlight Restoration", "Scratch Repair"],
    price: 419,
    originalPrice: 515,
    duration: 340,
    servicesCount: 4,
    bookings: 94,
    revenue: 39386,
    isPopular: false,
    icon: "star"
  },
  {
    id: "gp9",
    name: "Deluxe Care Package",
    category: "premium",
    description: "Premium wash with full interior and exterior detailing",
    includedServices: ["Deluxe Wash", "Interior Cleaning", "Wax & Polish"],
    price: 169,
    originalPrice: 215,
    duration: 165,
    servicesCount: 4,
    bookings: 298,
    revenue: 50362,
    isPopular: true,
    icon: "sparkles"
  },
  {
    id: "gp10",
    name: "Executive Package",
    category: "luxury",
    description: "Our most comprehensive service - everything your car needs",
    includedServices: ["Full Detailing", "Engine Bay Cleaning", "Paint Correction"],
    price: 699,
    originalPrice: 885,
    duration: 475,
    servicesCount: 5,
    bookings: 52,
    revenue: 36348,
    isPopular: false,
    icon: "star"
  },
];

export function StandardServicesManagement({
  services,
  packages,
  serviceRequests = [],
  onAddService,
  onEditService,
  onDeleteService,
  onToggleService,
  onAddPackage,
  onEditPackage,
  onDeletePackage,
  onApproveRequest,
  onRejectRequest,
}: StandardServicesManagementProps) {
  const [selectedTab, setSelectedTab] = useState("services");
  const [searchTerm, setSearchTerm] = useState("");
  const [packageSearchTerm, setPackageSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [packageCategoryFilter, setPackageCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [editingService, setEditingService] = useState<StandardService | null>(null);
  const [editingPackage, setEditingPackage] = useState<StandardPackage | null>(null);

  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    vehicleTypePricing: [] as VehicleTypePrice[],
    vehicleTypes: [] as string[],
    category: "",
    isActive: true,
  });

  const [packageForm, setPackageForm] = useState({
    name: "",
    description: "",
    includedServices: [] as string[],
    vehicleTypePricing: [] as VehicleTypePrice[],
    vehicleTypes: [] as string[],
    isActive: true,
  });

  const vehicleTypeOptions = ["Regular", "SUV", "Truck", "Sedan", "Van", "Motorcycle"];
  const categoryOptions = ["Exterior", "Interior", "Premium", "Express", "Specialty"];
  const packageCategoryOptions = ["value", "premium", "luxury", "protection", "maintenance"];

  // Calculate statistics
  const totalServices = services.length;
  const activeServices = services.filter(s => s.isActive).length;
  const totalPackages = mockPackageStats.length;
  const activePackages = mockPackageStats.length;
  const avgPrice = totalServices > 0 
    ? Math.round(services.reduce((sum, s) => sum + (s.vehicleTypePricing[0]?.price || 0), 0) / totalServices)
    : 0;
  const avgDuration = totalServices > 0
    ? Math.round(services.reduce((sum, s) => sum + (s.vehicleTypePricing[0]?.duration || 0), 0) / totalServices)
    : 0;
  
  // Package statistics
  const totalPackageRevenue = mockPackageStats.reduce((sum, p) => sum + p.revenue, 0);
  const avgSavings = mockPackageStats.length > 0
    ? Math.round(mockPackageStats.reduce((sum, p) => sum + ((p.originalPrice - p.price) / p.originalPrice * 100), 0) / mockPackageStats.length)
    : 0;
  const conversionRate = 34.2; // Mock conversion rate
  
  const categories = Array.from(new Set(services.map(s => s.category)));

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && service.isActive) ||
                         (statusFilter === "inactive" && !service.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filter packages
  const filteredPackages = mockPackageStats.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(packageSearchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(packageSearchTerm.toLowerCase());
    const matchesCategory = packageCategoryFilter === "all" || pkg.category === packageCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Category breakdown for analytics
  const categoryBreakdown = categories.map(cat => {
    const count = services.filter(s => s.category === cat).length;
    const percentage = Math.round((count / totalServices) * 100);
    return { category: cat, count, percentage };
  });

  // Package category breakdown
  const packageCategoryBreakdown = packageCategoryOptions.map(cat => {
    const categoryPackages = mockPackageStats.filter(p => p.category === cat);
    const count = categoryPackages.length;
    const percentage = totalPackages > 0 ? Math.round((count / totalPackages) * 100) : 0;
    const revenue = categoryPackages.reduce((sum, p) => sum + p.revenue, 0);
    return { category: cat, count, percentage, revenue };
  });

  // Top performing packages
  const topPackages = [...mockPackageStats]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Price distribution
  const priceDistribution = [
    { 
      tier: "Budget ($0-$50)", 
      count: services.filter(s => (s.vehicleTypePricing[0]?.price || 0) <= 50).length 
    },
    { 
      tier: "Standard ($51-$150)", 
      count: services.filter(s => {
        const price = s.vehicleTypePricing[0]?.price || 0;
        return price > 50 && price <= 150;
      }).length 
    },
    { 
      tier: "Premium ($150+)", 
      count: services.filter(s => (s.vehicleTypePricing[0]?.price || 0) > 150).length 
    }
  ];

  // Top services by price
  const topServices = [...services]
    .sort((a, b) => (b.vehicleTypePricing[0]?.price || 0) - (a.vehicleTypePricing[0]?.price || 0))
    .slice(0, 5);

  const resetServiceForm = () => {
    setServiceForm({
      name: "",
      description: "",
      vehicleTypePricing: [],
      vehicleTypes: [],
      category: "",
      isActive: true,
    });
    setEditingService(null);
  };

  const resetPackageForm = () => {
    setPackageForm({
      name: "",
      description: "",
      includedServices: [],
      vehicleTypePricing: [],
      vehicleTypes: [],
      isActive: true,
    });
    setEditingPackage(null);
  };

  const handleEditService = (service: StandardService) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      vehicleTypePricing: service.vehicleTypePricing,
      vehicleTypes: service.vehicleTypes,
      category: service.category,
      isActive: service.isActive,
    });
    setIsAddServiceOpen(true);
  };

  const handleSaveService = () => {
    if (!serviceForm.name || !serviceForm.category || serviceForm.vehicleTypePricing.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingService) {
      onEditService(editingService.id, serviceForm);
      toast.success("Service updated successfully");
    } else {
      onAddService(serviceForm);
      toast.success("Service added successfully");
    }

    setIsAddServiceOpen(false);
    resetServiceForm();
  };

  const handleEditPackage = (pkg: StandardPackage) => {
    setEditingPackage(pkg);
    setPackageForm({
      name: pkg.name,
      description: pkg.description,
      includedServices: pkg.includedServices,
      vehicleTypePricing: pkg.vehicleTypePricing,
      vehicleTypes: pkg.vehicleTypes,
      isActive: pkg.isActive,
    });
    setIsAddPackageOpen(true);
  };

  const handleSavePackage = () => {
    if (!packageForm.name || packageForm.includedServices.length === 0 || packageForm.vehicleTypePricing.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingPackage) {
      onEditPackage(editingPackage.id, packageForm);
      toast.success("Package updated successfully");
    } else {
      onAddPackage(packageForm);
      toast.success("Package added successfully");
    }

    setIsAddPackageOpen(false);
    resetPackageForm();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "value":
        return <Package className="h-4 w-4 text-[#00A63E]" />;
      case "premium":
        return <Sparkles className="h-4 w-4 text-[#155DFC]" />;
      case "luxury":
        return <Sparkles className="h-4 w-4 text-[#9810FA]" />;
      case "protection":
        return <Sparkles className="h-4 w-4 text-[#F54900]" />;
      case "maintenance":
        return <Package className="h-4 w-4 text-[#0092B8]" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "value":
        return "bg-[rgba(0,201,80,0.1)]";
      case "premium":
        return "bg-[rgba(43,127,255,0.1)]";
      case "luxury":
        return "bg-[rgba(173,70,255,0.1)]";
      case "protection":
        return "bg-[rgba(255,105,0,0.1)]";
      case "maintenance":
        return "bg-[rgba(0,184,219,0.1)]";
      default:
        return "bg-[rgba(3,2,19,0.1)]";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl">Standard Services & Packages</h2>
        <p className="text-muted-foreground">Manage platform-wide standard services and packages for all carwash companies</p>
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
            <Sparkles className="h-4 w-4" />
            Suggested
          </TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services" className="mt-6 space-y-6">
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
                  <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary text-primary-foreground gap-2" onClick={resetServiceForm}>
                        <Plus className="h-4 w-4" />
                        Add Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
                        <DialogDescription>
                          {editingService ? "Update service details" : "Create a new standard service"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="serviceName">Service Name</Label>
                          <Input
                            id="serviceName"
                            value={serviceForm.name}
                            onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                            placeholder="e.g., Premium Exterior Wash"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={serviceForm.description}
                            onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                            placeholder="Describe the service..."
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={serviceForm.category} onValueChange={(value) => setServiceForm({ ...serviceForm, category: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categoryOptions.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Vehicle Type Pricing</Label>
                          <div className="space-y-2">
                            {vehicleTypeOptions.map((vehicleType) => {
                              const pricing = serviceForm.vehicleTypePricing.find(p => p.vehicleType === vehicleType);
                              const isSelected = !!pricing;

                              return (
                                <div key={vehicleType} className="border border-border rounded-lg p-3">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Checkbox
                                      checked={isSelected}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setServiceForm({
                                            ...serviceForm,
                                            vehicleTypePricing: [...serviceForm.vehicleTypePricing, { vehicleType, price: 0, duration: 0 }],
                                            vehicleTypes: [...serviceForm.vehicleTypes, vehicleType]
                                          });
                                        } else {
                                          setServiceForm({
                                            ...serviceForm,
                                            vehicleTypePricing: serviceForm.vehicleTypePricing.filter(p => p.vehicleType !== vehicleType),
                                            vehicleTypes: serviceForm.vehicleTypes.filter(v => v !== vehicleType)
                                          });
                                        }
                                      }}
                                    />
                                    <Label className="flex-1">{vehicleType}</Label>
                                  </div>
                                  {isSelected && (
                                    <div className="grid grid-cols-2 gap-2 ml-6">
                                      <div>
                                        <Label className="text-xs">Price ($)</Label>
                                        <Input
                                          type="number"
                                          value={pricing?.price || 0}
                                          onChange={(e) => {
                                            const newPricing = serviceForm.vehicleTypePricing.map(p =>
                                              p.vehicleType === vehicleType ? { ...p, price: Number(e.target.value) } : p
                                            );
                                            setServiceForm({ ...serviceForm, vehicleTypePricing: newPricing });
                                          }}
                                          placeholder="0"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-xs">Duration (min)</Label>
                                        <Input
                                          type="number"
                                          value={pricing?.duration || 0}
                                          onChange={(e) => {
                                            const newPricing = serviceForm.vehicleTypePricing.map(p =>
                                              p.vehicleType === vehicleType ? { ...p, duration: Number(e.target.value) } : p
                                            );
                                            setServiceForm({ ...serviceForm, vehicleTypePricing: newPricing });
                                          }}
                                          placeholder="0"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => { setIsAddServiceOpen(false); resetServiceForm(); }}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveService}>
                          {editingService ? "Update Service" : "Add Service"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
                    {filteredServices.map((service) => {
                      const prices = service.vehicleTypePricing.map(p => p.price);
                      const minPrice = Math.min(...prices);
                      const maxPrice = Math.max(...prices);
                      const avgDur = Math.round(
                        service.vehicleTypePricing.reduce((sum, p) => sum + p.duration, 0) / service.vehicleTypePricing.length
                      );

                      return (
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
                          <TableCell>
                            <p className="text-muted-foreground">{service.companyName || "Sparkle Wash Co."}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize border-border/40">
                              {service.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-[#00a63e]">
                            ${minPrice}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{avgDur}m</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center">
                              <Switch 
                                checked={service.isActive}
                                onCheckedChange={() => {
                                  onEditService(service.id, { isActive: !service.isActive });
                                  toast.success(`Service ${service.isActive ? 'deactivated' : 'activated'}`);
                                }}
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
                                <DropdownMenuItem onClick={() => handleEditService(service)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Service
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => {
                                    if (confirm("Are you sure you want to delete this service?")) {
                                      onDeleteService(service.id);
                                    }
                                  }}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Service
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
                {topServices.map((service, index) => {
                  const maxPrice = Math.max(...service.vehicleTypePricing.map(p => p.price));
                  return (
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
                      <p className="text-sm text-[#00a63e]">${maxPrice}</p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Packages Tab */}
        <TabsContent value="packages" className="mt-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Packages</p>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{totalPackages}</p>
                <p className="text-xs text-muted-foreground mt-1">{activePackages} active packages</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">${(totalPackageRevenue / 1000).toFixed(0)}K</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">From package sales</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Savings</p>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{avgSavings}%</p>
                <p className="text-xs text-muted-foreground mt-1">Customer discount rate</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{conversionRate}%</p>
                <p className="text-xs text-[#00a63e] mt-1">Above industry avg</p>
              </CardContent>
            </Card>
          </div>

          {/* Package Catalog Card */}
          <Card className="border-border">
            <div className="p-6 space-y-8">
              {/* Title and Filters */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Service Packages</h3>
                  <p className="text-muted-foreground mt-1">{filteredPackages.length} packages available</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search packages..."
                      value={packageSearchTerm}
                      onChange={(e) => setPackageSearchTerm(e.target.value)}
                      className="pl-10 w-52 bg-[#f3f3f5] border-0"
                    />
                  </div>

                  {/* Category Filter */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="bg-[#f3f3f5] border-0 gap-2">
                        All Types
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setPackageCategoryFilter("all")}>
                        All Types
                      </DropdownMenuItem>
                      {packageCategoryOptions.map(cat => (
                        <DropdownMenuItem key={cat} onClick={() => setPackageCategoryFilter(cat)}>
                          <span className="capitalize">{cat}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Create Package Button */}
                  <Button className="bg-primary text-primary-foreground gap-2" onClick={() => toast.info("Create package functionality coming soon")}>
                    <Plus className="h-4 w-4" />
                    Create Package
                  </Button>
                </div>
              </div>

              {/* Package Grid */}
              <div className="grid grid-cols-3 gap-4">
                {filteredPackages.map((pkg) => {
                  const savings = pkg.originalPrice - pkg.price;
                  const savingsPercent = Math.round((savings / pkg.originalPrice) * 100);

                  return (
                    <Card key={pkg.id} className="border-border relative overflow-hidden">
                      {pkg.isPopular && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Popular
                        </div>
                      )}
                      <CardContent className="p-6 space-y-4">
                        {/* Header */}
                        <div className="flex items-start gap-3">
                          <div className={`${getCategoryColor(pkg.category)} rounded-lg p-2`}>
                            {getCategoryIcon(pkg.category)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-normal">{pkg.name}</h4>
                            <Badge variant="outline" className="capitalize mt-2 border-border/40">
                              {pkg.category}
                            </Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Package
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Package
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>

                        {/* Pricing */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl text-[#00a63e]">${pkg.price}</p>
                            <p className="text-xs text-muted-foreground line-through">${pkg.originalPrice}</p>
                          </div>
                          <div className="text-right">
                            <div className="bg-[rgba(0,201,80,0.1)] rounded-lg px-2 py-1">
                              <p className="text-xs text-[#00a63e]">Save ${savings}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{savingsPercent}% off</p>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span className="text-sm">{pkg.duration}m</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Package className="h-3 w-3" />
                            <span className="text-sm">{pkg.servicesCount} services</span>
                          </div>
                        </div>

                        {/* Included Services */}
                        <div className="bg-[rgba(236,236,240,0.5)] border border-border/40 rounded-lg p-3 space-y-2">
                          <p className="text-xs text-muted-foreground">Included Services:</p>
                          <ul className="space-y-1">
                            {pkg.includedServices.slice(0, 3).map((service, idx) => (
                              <li key={idx} className="text-xs flex items-center gap-2">
                                <span className="text-primary">•</span>
                                <span>{service}</span>
                              </li>
                            ))}
                            {pkg.includedServices.length > 3 && (
                              <li className="text-xs text-muted-foreground">
                                + {pkg.includedServices.length - 3} more service{pkg.includedServices.length > 4 ? 's' : ''}
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-2 border-t border-border/40">
                          <p className="text-xs text-muted-foreground">{pkg.bookings} bookings</p>
                          <p className="text-xs text-[#00a63e]">${pkg.revenue.toLocaleString()} revenue</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Analytics Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Top Performing Packages */}
            <Card className="border-border">
              <CardHeader className="pb-0 pt-6 px-6">
                <CardTitle className="text-base">Top Performing Packages</CardTitle>
                <CardDescription>Highest revenue generators</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-6 space-y-3">
                {topPackages.map((pkg, index) => (
                  <div key={pkg.id} className="border border-border/40 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-[rgba(3,2,19,0.1)] rounded-full h-6 w-6 flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-normal">{pkg.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{pkg.category}</p>
                        </div>
                      </div>
                      <p className="text-sm text-[#00a63e]">${pkg.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Package Categories */}
            <Card className="border-border">
              <CardHeader className="pb-0 pt-6 px-6">
                <CardTitle className="text-base">Package Categories</CardTitle>
                <CardDescription>Distribution by type</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-6 space-y-4">
                {packageCategoryBreakdown.map(({ category, count, percentage, revenue }) => {
                  const colors: Record<string, string> = {
                    value: "#00c950",
                    premium: "#2b7fff",
                    luxury: "#ad46ff",
                    protection: "#ff6900",
                    maintenance: "#00b8db"
                  };
                  
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize">{category}</span>
                        <span className="text-muted-foreground">{count} ({percentage}%) · ${(revenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="h-2 bg-[#ececf0] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ width: `${percentage}%`, backgroundColor: colors[category] || "#030213" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* AI Package Recommendations */}
            <Card className="border-2 border-[rgba(3,2,19,0.2)] bg-[rgba(3,2,19,0.05)]">
              <CardHeader className="pb-0 pt-6 px-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <CardTitle className="text-base">AI Package Recommendations</CardTitle>
                </div>
                <CardDescription>Suggested package improvements based on data analysis</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-6 space-y-3">
                <div className="bg-white border border-border/40 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-[rgba(0,201,80,0.1)] rounded-full p-2">
                      <TrendingUp className="h-4 w-4 text-[#00A63E]" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-medium">Create "Summer Special" Package</p>
                      <p className="text-xs text-muted-foreground">Combine Express Wash + Windshield Treatment + Interior Cleaning for peak season. Estimated 15% uptake.</p>
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        Create
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-border/40 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-[rgba(43,127,255,0.1)] rounded-full p-2">
                      <Sparkles className="h-4 w-4 text-[#155DFC]" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-medium">Increase "Weekend Special" Discount</p>
                      <p className="text-xs text-muted-foreground">High demand shows 30% increase opportunity. Suggest raising discount to 30% for better conversion.</p>
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-border/40 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-[rgba(173,70,255,0.1)] rounded-full p-2">
                      <Sparkles className="h-4 w-4 text-[#9810FA]" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-medium">Bundle "Pet Friendly Package"</p>
                      <p className="text-xs text-muted-foreground">Pet Hair Removal + Odor Removal + Fabric Protection shows strong correlation. Target pet owners.</p>
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Suggested Tab */}
        <TabsContent value="suggested" className="mt-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{serviceRequests.filter(r => r.status === 'pending').length}</p>
                <p className="text-xs text-muted-foreground mt-1">From carwash companies</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Market Demand</p>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">65%</p>
                <p className="text-xs text-[#00a63e] mt-1">Strong interest</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Potential Revenue</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">$158K</p>
                <p className="text-xs text-muted-foreground mt-1">Estimated annual</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Industry Trends</p>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">4</p>
                <p className="text-xs text-muted-foreground mt-1">Active trends tracked</p>
              </CardContent>
            </Card>
          </div>

          {/* Service Requests from Carwash Companies */}
          {serviceRequests.length > 0 && (
            <Card className="border-2 border-[#bedbff] bg-[rgba(239,246,255,0.5)]">
              <CardHeader className="pb-0 pt-6 px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-[#155DFC]" />
                    <CardTitle className="text-base">Service Suggestions from Companies</CardTitle>
                  </div>
                  {serviceRequests.filter(r => r.status === 'pending').length > 0 && (
                    <Badge className="bg-[#d4183d] text-white border-0">
                      {serviceRequests.filter(r => r.status === 'pending').length} Pending
                    </Badge>
                  )}
                </div>
                <CardDescription>Review and approve service requests from carwash companies</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-6 space-y-3">
                {serviceRequests.map((request) => (
                  <Card key={request.id} className={cn(
                    "border",
                    request.status === 'pending' ? "border-[#155DFC]/40" : "border-border/40"
                  )}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="bg-[rgba(3,2,19,0.1)] rounded-lg p-2">
                              <Package className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{request.serviceName}</p>
                                <Badge variant="outline" className="capitalize border-border/40">
                                  {request.category}
                                </Badge>
                                {request.status === 'pending' && (
                                  <Badge className="bg-[#fbbf24] text-[#030213] border-0">Pending Review</Badge>
                                )}
                                {request.status === 'approved' && (
                                  <Badge className="bg-[#00a63e] text-white border-0">Approved</Badge>
                                )}
                                {request.status === 'rejected' && (
                                  <Badge className="bg-[#d4183d] text-white border-0">Rejected</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{request.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Building2 className="h-3 w-3" />
                                  {request.centerName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  ${request.suggestedPrice}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {request.suggestedDuration} min
                                </span>
                                <span className="flex items-center gap-1">
                                  <Car className="h-3 w-3" />
                                  {request.vehicleTypes.join(', ')}
                                </span>
                                <span>Submitted: {new Date(request.submissionDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {request.status === 'pending' && onApproveRequest && onRejectRequest && (
                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              size="sm"
                              onClick={() => {
                                onApproveRequest(request.id);
                                toast.success(`Service "${request.serviceName}" approved successfully`);
                              }}
                              className="bg-[#00a63e] hover:bg-[#00a63e]/90"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                onRejectRequest(request.id, "Not suitable at this time");
                                toast.error(`Service "${request.serviceName}" rejected`);
                              }}
                              className="border-[#d4183d] text-[#d4183d] hover:bg-[#d4183d]/10"
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Industry Trends */}
          <Card className="border-2 border-[#bedbff] bg-[rgba(239,246,255,0.5)]">
            <CardHeader className="pb-0 pt-6 px-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#155DFC]" />
                <CardTitle className="text-base">Industry Trends</CardTitle>
              </div>
              <CardDescription>Current market movements in the car wash industry</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 px-6 pb-6">
              <div className="grid grid-cols-2 gap-3">
                <Card className="border-border/40">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-normal">Contactless Services</p>
                        <p className="text-xs text-muted-foreground mt-1">Customers prefer touchless technology and mobile apps</p>
                      </div>
                      <Badge className="bg-[rgba(0,201,80,0.1)] text-[#00a63e] border-0 ml-2">+32% YoY</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Market Adoption</span>
                        <span>73%</span>
                      </div>
                      <div className="h-1.5 bg-[#ececf0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2b7fff] rounded-full" style={{ width: '73%' }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-normal">Eco-Conscious Options</p>
                        <p className="text-xs text-muted-foreground mt-1">Demand for water-saving and biodegradable products</p>
                      </div>
                      <Badge className="bg-[rgba(0,201,80,0.1)] text-[#00a63e] border-0 ml-2">+28% YoY</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Market Adoption</span>
                        <span>61%</span>
                      </div>
                      <div className="h-1.5 bg-[#ececf0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2b7fff] rounded-full" style={{ width: '61%' }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-normal">Subscription Models</p>
                        <p className="text-xs text-muted-foreground mt-1">Shift from pay-per-use to monthly membership plans</p>
                      </div>
                      <Badge className="bg-[rgba(0,201,80,0.1)] text-[#00a63e] border-0 ml-2">+45% YoY</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Market Adoption</span>
                        <span>68%</span>
                      </div>
                      <div className="h-1.5 bg-[#ececf0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2b7fff] rounded-full" style={{ width: '68%' }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-normal">Premium Add-ons</p>
                        <p className="text-xs text-muted-foreground mt-1">Customers willing to pay more for specialized services</p>
                      </div>
                      <Badge className="bg-[rgba(0,201,80,0.1)] text-[#00a63e] border-0 ml-2">+18% YoY</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Market Adoption</span>
                        <span>54%</span>
                      </div>
                      <div className="h-1.5 bg-[#ececf0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2b7fff] rounded-full" style={{ width: '54%' }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Service Gap Analysis */}
          <Card className="border-2 border-[#ffd6a7] bg-[rgba(255,247,237,0.5)]">
            <CardHeader className="pb-0 pt-6 px-6">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#F54900]" />
                <CardTitle className="text-base">Service Gap Analysis</CardTitle>
              </div>
              <CardDescription>Missing offerings compared to market leaders</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 px-6 pb-6 space-y-3">
              <Card className="border-border/40">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-border/40">Mobile Service</Badge>
                    <Badge className="bg-[#fb2c36] text-white border-0">high impact</Badge>
                  </div>
                  <p className="font-normal">No mobile services offered</p>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-[#00A63E] shrink-0 mt-0.5" />
                    <span>Add mobile detailing to capture convenience-seeking customers</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-border/40">Membership</Badge>
                    <Badge className="bg-[#fb2c36] text-white border-0">high impact</Badge>
                  </div>
                  <p className="font-normal">No subscription model</p>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-[#00A63E] shrink-0 mt-0.5" />
                    <span>Launch unlimited wash plans for recurring revenue</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-border/40">Seasonal</Badge>
                    <Badge className="bg-[#eceef2] text-[#030213] border-0">medium impact</Badge>
                  </div>
                  <p className="font-normal">Limited seasonal services</p>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-[#00A63E] shrink-0 mt-0.5" />
                    <span>Add salt removal (winter) and bug removal (summer)</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-border/40">B2B</Badge>
                    <Badge className="bg-[#fb2c36] text-white border-0">high impact</Badge>
                  </div>
                  <p className="font-normal">No fleet services</p>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-[#00A63E] shrink-0 mt-0.5" />
                    <span>Target local businesses with fleet washing contracts</span>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-2 border-[rgba(3,2,19,0.2)] bg-[rgba(3,2,19,0.05)]">
            <CardHeader className="pb-0 pt-6 px-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </div>
              <CardDescription>Fast track implementation of popular services</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 px-6 pb-6">
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="h-auto flex-col items-start p-4 gap-2 border-border/40">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    <p className="font-medium text-sm">Add Top 3 Trending</p>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">Mobile Detailing, Subscriptions, Touchless Wash</p>
                </Button>

                <Button variant="outline" className="h-auto flex-col items-start p-4 gap-2 border-border/40">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <p className="font-medium text-sm">Add Luxury Services</p>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">Vintage detailing & premium offerings</p>
                </Button>

                <Button variant="outline" className="h-auto flex-col items-start p-4 gap-2 border-border/40">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <p className="font-medium text-sm">Fill All Gaps</p>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">Add all missing competitor services</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
