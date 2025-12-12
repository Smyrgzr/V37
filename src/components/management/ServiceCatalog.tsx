"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { 
  Search, 
  Filter, 
  ChevronDown,
  Package,
  DollarSign,
  Clock,
  Car,
  Star,
  Plus,
  Edit,
  Sparkles,
  Check,
  TrendingUp,
  Zap,
  ShoppingCart,
  X
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AIInsights, AIInsight } from "./AIInsights";
import { cn } from "../ui/utils";

interface GlobalService {
  id: string;
  name: string;
  description: string;
  vehicleTypePricing?: VehicleTypePrice[];
  category: string;
  vehicleTypes: string[];
  isActive?: boolean;
}

interface VehicleTypePrice {
  vehicleType: string;
  price: number;
  discountPrice?: number;
  duration: number;
}

interface CenterService {
  id: string;
  globalServiceId: string;
  name: string;
  description: string;
  customPrice: number;
  customDuration: number;
  isActive: boolean;
  category: string;
  vehicleTypes: string[];
  popularity?: number;
}

interface SuggestedPackage {
  id: string;
  name: string;
  description: string;
  services: string[];
  savings: number;
  popularity: number;
  estimatedRevenue: number;
  aiReason: string;
}

interface Campaign {
  id: string;
  name: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  isActive: boolean;
}

interface ServiceCatalogProps {
  globalServices: GlobalService[];
  centerServices: CenterService[];
  onSelectService: (globalServiceId: string) => void;
  onEditService: (serviceId: string) => void;
  selectedServices: string[];
  onCreatePackage?: (services: string[]) => void;
  editMode?: boolean;
  campaigns?: Campaign[];
  onSaveService?: (serviceData: any) => void;
}

export function ServiceCatalog({
  globalServices,
  centerServices,
  onSelectService,
  onEditService,
  selectedServices,
  onCreatePackage,
  editMode = false,
  campaigns = [],
  onSaveService
}: ServiceCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");
  const [showServiceDetails, setShowServiceDetails] = useState<string | null>(null);
  const [showPackageSuggestions, setShowPackageSuggestions] = useState(false);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState<any>(null);

  // Get categories and vehicle types from global services
  const categories = Array.from(new Set(globalServices.map(s => s.category)));
  const vehicleTypes = Array.from(new Set(globalServices.flatMap(s => s.vehicleTypes)));

  // Filter services
  const filteredServices = globalServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    const matchesVehicleType = vehicleTypeFilter === "all" || service.vehicleTypes.includes(vehicleTypeFilter);
    
    let matchesPriceRange = true;
    if (priceRangeFilter !== "all" && service.vehicleTypePricing && service.vehicleTypePricing.length > 0) {
      const avgPrice = service.vehicleTypePricing.reduce((sum, vt) => sum + vt.price, 0) / service.vehicleTypePricing.length;
      if (priceRangeFilter === "budget") matchesPriceRange = avgPrice <= 50;
      if (priceRangeFilter === "standard") matchesPriceRange = avgPrice > 50 && avgPrice <= 150;
      if (priceRangeFilter === "premium") matchesPriceRange = avgPrice > 150;
    }
    
    return matchesSearch && matchesCategory && matchesVehicleType && matchesPriceRange;
  });

  // Check if service is already enabled
  const isServiceEnabled = (serviceId: string) => {
    return centerServices.some(cs => cs.globalServiceId === serviceId && cs.isActive);
  };

  // Generate AI-powered package suggestions based on selected services
  const generatePackageSuggestions = (): SuggestedPackage[] => {
    if (selectedServices.length < 2) return [];

    const selectedServiceData = globalServices.filter(s => selectedServices.includes(s.id));
    
    return [
      {
        id: "pkg-1",
        name: "Complete Care Package",
        description: `Bundle includes: ${selectedServiceData.map(s => s.name).join(", ")}`,
        services: selectedServices,
        savings: 25,
        popularity: 87,
        estimatedRevenue: 4200,
        aiReason: "High customer demand for this combination. 73% of customers who book one of these services also book the others."
      },
      {
        id: "pkg-2",
        name: "Premium Service Bundle",
        description: `Enhanced package with ${selectedServiceData.length} premium services`,
        services: selectedServices,
        savings: 20,
        popularity: 92,
        estimatedRevenue: 5100,
        aiReason: "Most popular combination in similar markets. Expected to increase customer retention by 34%."
      },
      {
        id: "pkg-3",
        name: "Value Pack",
        description: `Save more with ${selectedServiceData.length} essential services`,
        services: selectedServices,
        savings: 15,
        popularity: 78,
        estimatedRevenue: 3800,
        aiReason: "Budget-friendly option that appeals to 65% of your customer base. Great for customer acquisition."
      }
    ];
  };

  const suggestedPackages = generatePackageSuggestions();

  return (
    <div className="space-y-6">
      {/* Edit Mode Banner */}
      {editMode && (
        <Card className="border-blue-500 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Edit className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">Edit Mode Active</h4>
                <p className="text-sm text-blue-700">
                  Click "Configure" on any service to customize pricing, vehicle types, and apply campaigns. Changes will be saved when you click "Save All".
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      <AIInsights
        insights={[
          {
            id: "popular-combo",
            type: "recommendation",
            title: "Popular Service Combination",
            description: "Customers who book 'Premium Wash' also request 'Interior Detailing' 78% of the time. Consider offering a bundled package.",
            impact: "high",
            confidence: 0.89,
            metric: "Potential bundle sales",
            value: "+$3,200/month",
            action: {
              label: "Create Bundle",
              onClick: () => setShowPackageSuggestions(true)
            }
          },
          {
            id: "pricing-optimization",
            type: "opportunity",
            title: "Pricing Optimization",
            description: "'Engine Cleaning' is priced 15% below market average. Adjusting to $85 could increase revenue without affecting demand.",
            impact: "medium",
            confidence: 0.82,
            metric: "Revenue increase",
            value: "+$680/month",
            action: {
              label: "Adjust Pricing",
              onClick: () => toast.info("Opening pricing editor")
            }
          },
          {
            id: "underperforming-service",
            type: "alert",
            title: "Low Utilization Service",
            description: "'Headlight Restoration' has only 3 bookings this month. Consider promotional pricing or bundling with popular services.",
            impact: "medium",
            action: {
              label: "View Analytics",
              onClick: () => toast.info("Opening service analytics")
            }
          },
          {
            id: "seasonal-demand",
            type: "prediction",
            title: "Seasonal Demand Forecast",
            description: "Interior detailing services typically see 45% increase in winter months. Stock up on supplies and adjust capacity.",
            impact: "high",
            confidence: 0.91,
            trend: "up",
            metric: "Predicted increase",
            value: "+45%"
          }
        ]}
        title="Service Intelligence"
        dismissible={true}
      />

      {/* Header with Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Available Services</span>
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-semibold">{globalServices.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {centerServices.filter(s => s.isActive).length} enabled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Categories</span>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-semibold">{categories.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Service types</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Selected Services</span>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-semibold">{selectedServices.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to bundle</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-700">AI Suggestions</span>
              <Sparkles className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-semibold text-purple-900">{suggestedPackages.length}</div>
            <Button 
              variant="link" 
              className="text-xs text-purple-600 p-0 h-auto mt-1"
              onClick={() => setShowPackageSuggestions(true)}
              disabled={selectedServices.length < 2}
            >
              View packages →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    {categoryFilter === "all" ? "All Categories" : categoryFilter}
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Car className="h-4 w-4" />
                    {vehicleTypeFilter === "all" ? "All Vehicles" : vehicleTypeFilter}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setVehicleTypeFilter("all")}>
                    All Vehicle Types
                  </DropdownMenuItem>
                  {vehicleTypes.map(vt => (
                    <DropdownMenuItem key={vt} onClick={() => setVehicleTypeFilter(vt)}>
                      {vt}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <DollarSign className="h-4 w-4" />
                    Price Range
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setPriceRangeFilter("all")}>
                    All Prices
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceRangeFilter("budget")}>
                    Budget ($0-$50)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceRangeFilter("standard")}>
                    Standard ($51-$150)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceRangeFilter("premium")}>
                    Premium ($150+)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Services Bar */}
      {selectedServices.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">
                    {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
                  </p>
                  <p className="text-sm text-blue-700">
                    {selectedServices.length >= 2 ? "Ready to create package" : "Select more services to create a package"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {selectedServices.length >= 2 && (
                  <Button 
                    onClick={() => setShowPackageSuggestions(true)}
                    className="bg-blue-600 hover:bg-blue-700 gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    View Package Suggestions
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => selectedServices.forEach(s => onSelectService(s))}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredServices.map(service => {
          const isEnabled = isServiceEnabled(service.id);
          const isSelected = selectedServices.includes(service.id);
          const avgPrice = service.vehicleTypePricing && service.vehicleTypePricing.length > 0
            ? Math.round(service.vehicleTypePricing.reduce((sum, vt) => sum + vt.price, 0) / service.vehicleTypePricing.length)
            : 0;
          const avgDuration = service.vehicleTypePricing && service.vehicleTypePricing.length > 0
            ? Math.round(service.vehicleTypePricing.reduce((sum, vt) => sum + vt.duration, 0) / service.vehicleTypePricing.length)
            : 0;

          return (
            <Card 
              key={service.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md bg-white",
                isSelected && "border-blue-500",
                isEnabled && !isSelected && "border-green-200"
              )}
              onClick={() => onSelectService(service.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-neutral-950">{service.name}</h3>
                      {isEnabled && (
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">
                          <Check className="h-3 w-3 mr-1" />
                          Enabled
                        </Badge>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={() => onSelectService(service.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">${avgPrice}</span>
                    <span className="text-muted-foreground">avg price</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{avgDuration} min</span>
                    <span className="text-muted-foreground">avg duration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {service.vehicleTypes.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={isEnabled ? "secondary" : "default"}
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (editMode) {
                        // In edit mode, open the comprehensive edit dialog
                        setEditingService(service.id);
                        setServiceFormData({
                          name: service.name,
                          description: service.description,
                          vehicleTypePricing: service.vehicleTypePricing || [],
                          isActive: true,
                          campaignScope: "service",
                          selectedCampaign: null
                        });
                      } else if (isEnabled) {
                        const centerService = centerServices.find(cs => cs.globalServiceId === service.id);
                        if (centerService) {
                          onEditService(centerService.id);
                        }
                      } else {
                        onSelectService(service.id);
                      }
                    }}
                  >
                    {editMode || isEnabled ? (
                      <>
                        <Edit className="h-3 w-3 mr-1" />
                        {editMode ? "Configure" : "Edit"}
                      </>
                    ) : (
                      <>
                        <Plus className="h-3 w-3 mr-1" />
                        Enable
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowServiceDetails(service.id);
                    }}
                  >
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No services found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search term
            </p>
          </CardContent>
        </Card>
      )}

      {/* AI Package Suggestions Dialog */}
      <Dialog open={showPackageSuggestions} onOpenChange={setShowPackageSuggestions}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <DialogTitle>AI-Powered Package Suggestions</DialogTitle>
                <DialogDescription>
                  Smart package recommendations based on your selected services and market data
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {suggestedPackages.map((pkg, index) => (
              <Card key={pkg.id} className="border-purple-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{pkg.name}</h4>
                        <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                          {pkg.savings}% Savings
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-purple-900 mb-1">AI Insight</p>
                        <p className="text-xs text-purple-700">{pkg.aiReason}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Popularity</p>
                        <p className="text-sm font-medium">{pkg.popularity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Revenue</p>
                        <p className="text-sm font-medium">${pkg.estimatedRevenue}/mo</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => {
                      onCreatePackage?.(pkg.services);
                      setShowPackageSuggestions(false);
                      toast.success(`Creating package: ${pkg.name}`);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create This Package
                  </Button>
                </CardContent>
              </Card>
            ))}

            {suggestedPackages.length === 0 && (
              <div className="text-center py-8">
                <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Select at least 2 services to see package suggestions
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPackageSuggestions(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service Details Dialog */}
      {showServiceDetails && (
        <Dialog open={!!showServiceDetails} onOpenChange={() => setShowServiceDetails(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {globalServices.find(s => s.id === showServiceDetails)?.name}
              </DialogTitle>
              <DialogDescription>
                {globalServices.find(s => s.id === showServiceDetails)?.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Pricing by Vehicle Type</Label>
                <div className="space-y-2">
                  {globalServices.find(s => s.id === showServiceDetails)?.vehicleTypePricing?.map(vt => (
                    <div key={vt.vehicleType} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{vt.vehicleType}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">${vt.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{vt.duration} min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowServiceDetails(null)}>
                Close
              </Button>
              <Button onClick={() => {
                onSelectService(showServiceDetails);
                setShowServiceDetails(null);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Enable Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Service Edit Dialog - Comprehensive editing in edit mode */}
      {editMode && editingService && (() => {
        const service = globalServices.find(s => s.id === editingService);
        if (!service) return null;

        return (
          <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Edit className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <DialogTitle>Edit Service: {service.name}</DialogTitle>
                    <DialogDescription>
                      Customize pricing, duration, and campaigns for this service
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Service Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label>Service Name</Label>
                    <Input 
                      value={serviceFormData?.name || service.name}
                      onChange={(e) => setServiceFormData({...serviceFormData, name: e.target.value})}
                      placeholder="Enter service name"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      value={serviceFormData?.description || service.description}
                      onChange={(e) => setServiceFormData({...serviceFormData, description: e.target.value})}
                      placeholder="Enter service description"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Vehicle Type Pricing */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Vehicle Type Pricing</Label>
                      <p className="text-sm text-muted-foreground">Set custom prices and duration for each vehicle type</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newVehicleTypes = serviceFormData?.vehicleTypePricing || service.vehicleTypePricing || [];
                        setServiceFormData({
                          ...serviceFormData,
                          vehicleTypePricing: [
                            ...newVehicleTypes,
                            { vehicleType: "New Type", price: 0, duration: 0 }
                          ]
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Vehicle Type
                    </Button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto border rounded-lg p-4">
                    {(serviceFormData?.vehicleTypePricing || service.vehicleTypePricing || []).map((vt: VehicleTypePrice, index: number) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3 bg-neutral-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Car className="h-5 w-5 text-blue-600" />
                            <Input
                              value={vt.vehicleType}
                              onChange={(e) => {
                                const updated = [...(serviceFormData?.vehicleTypePricing || service.vehicleTypePricing || [])];
                                updated[index] = { ...vt, vehicleType: e.target.value };
                                setServiceFormData({ ...serviceFormData, vehicleTypePricing: updated });
                              }}
                              className="w-40"
                              placeholder="Vehicle Type"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updated = (serviceFormData?.vehicleTypePricing || service.vehicleTypePricing || []).filter((_: any, i: number) => i !== index);
                              setServiceFormData({ ...serviceFormData, vehicleTypePricing: updated });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Price ($)</Label>
                            <Input
                              type="number"
                              value={vt.price}
                              onChange={(e) => {
                                const updated = [...(serviceFormData?.vehicleTypePricing || service.vehicleTypePricing || [])];
                                updated[index] = { ...vt, price: Number(e.target.value) };
                                setServiceFormData({ ...serviceFormData, vehicleTypePricing: updated });
                              }}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Duration (min)</Label>
                            <Input
                              type="number"
                              value={vt.duration}
                              onChange={(e) => {
                                const updated = [...(serviceFormData?.vehicleTypePricing || service.vehicleTypePricing || [])];
                                updated[index] = { ...vt, duration: Number(e.target.value) };
                                setServiceFormData({ ...serviceFormData, vehicleTypePricing: updated });
                              }}
                              placeholder="0"
                            />
                          </div>
                        </div>

                        {vt.discountPrice !== undefined && (
                          <div>
                            <Label className="text-xs">Campaign Price ($)</Label>
                            <Input
                              type="number"
                              value={vt.discountPrice}
                              onChange={(e) => {
                                const updated = [...(serviceFormData?.vehicleTypePricing || service.vehicleTypePricing || [])];
                                updated[index] = { ...vt, discountPrice: Number(e.target.value) };
                                setServiceFormData({ ...serviceFormData, vehicleTypePricing: updated });
                              }}
                              placeholder="Discounted price"
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    {(!serviceFormData?.vehicleTypePricing && !service.vehicleTypePricing) && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Car className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">No vehicle types added yet</p>
                        <p className="text-xs">Click "Add Vehicle Type" to start</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Campaign Application */}
                {campaigns.length > 0 && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-base">Apply Campaign</Label>
                      <p className="text-sm text-muted-foreground">Select a campaign to apply to this service</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Card className="cursor-pointer hover:border-blue-500 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              checked={serviceFormData?.campaignScope === "service"}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setServiceFormData({...serviceFormData, campaignScope: "service"});
                                }
                              }}
                            />
                            <div className="flex-1">
                              <p className="font-medium">Apply to This Service Only</p>
                              <p className="text-xs text-muted-foreground">Campaign applies to selected service</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:border-blue-500 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              checked={serviceFormData?.campaignScope === "all"}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setServiceFormData({...serviceFormData, campaignScope: "all"});
                                }
                              }}
                            />
                            <div className="flex-1">
                              <p className="font-medium">Apply to All Services</p>
                              <p className="text-xs text-muted-foreground">Campaign applies company-wide</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Select Campaign</Label>
                      <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                        {campaigns.map(campaign => (
                          <div 
                            key={campaign.id}
                            className={cn(
                              "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                              serviceFormData?.selectedCampaign === campaign.id 
                                ? "bg-blue-100 border border-blue-500" 
                                : "bg-neutral-50 hover:bg-neutral-100"
                            )}
                            onClick={() => setServiceFormData({...serviceFormData, selectedCampaign: campaign.id})}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                checked={serviceFormData?.selectedCampaign === campaign.id}
                                onCheckedChange={() => setServiceFormData({...serviceFormData, selectedCampaign: campaign.id})}
                              />
                              <div>
                                <p className="font-medium">{campaign.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {campaign.discountType === "percentage" ? `${campaign.discountValue}% off` : `${campaign.discountValue} off`}
                                </p>
                              </div>
                            </div>
                            {campaign.isActive && (
                              <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                                Active
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Suggestions for This Service */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <Label className="text-base">AI Pricing Suggestions</Label>
                  </div>
                  <AIInsights
                    insights={[
                      {
                        id: "pricing-opt",
                        type: "recommendation",
                        title: "Optimal Price Point",
                        description: `Based on market analysis, pricing at ${(service.vehicleTypePricing?.[0]?.price || 0) * 1.1} could increase revenue by 15% without affecting demand.`,
                        impact: "medium",
                        confidence: 0.85,
                        metric: "Revenue increase",
                        value: "+$450/month"
                      },
                      {
                        id: "bundle-suggest",
                        type: "opportunity",
                        title: "Bundle Opportunity",
                        description: "84% of customers who book this service also request complementary services. Consider creating a package.",
                        impact: "high",
                        confidence: 0.91,
                        metric: "Bundle potential",
                        value: "+$1,200/month"
                      }
                    ]}
                    compact
                  />
                </div>

                {/* Service Status */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-medium">Service Active</p>
                    <p className="text-sm text-muted-foreground">Enable or disable this service for your branch</p>
                  </div>
                  <Switch 
                    checked={serviceFormData?.isActive !== undefined ? serviceFormData.isActive : true}
                    onCheckedChange={(checked) => setServiceFormData({...serviceFormData, isActive: checked})}
                  />
                </div>
              </div>

              <DialogFooter className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  setEditingService(null);
                  setServiceFormData(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  onSaveService?.({
                    serviceId: service.id,
                    ...serviceFormData
                  });
                  toast.success("Service saved successfully");
                  setEditingService(null);
                  setServiceFormData(null);
                }}>
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      })()}
    </div>
  );
}