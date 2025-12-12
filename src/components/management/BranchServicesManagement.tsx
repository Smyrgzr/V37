"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
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
  X,
  Save,
  Car,
  Sparkles,
  AlertCircle,
  CheckCircle,
  XCircle,
  Tag,
  Info,
  TrendingUp,
  ShoppingCart,
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

interface VehicleTypePrice {
  vehicleType: string;
  price: number;
  duration: number;
  campaignId?: string;
}

interface GlobalService {
  id: string;
  name: string;
  description: string;
  vehicleTypePricing?: VehicleTypePrice[];
  category: string;
  vehicleTypes: string[];
  isActive?: boolean;
}

interface SelectedService extends GlobalService {
  customVehicleTypePricing: VehicleTypePrice[];
  isEnabled: boolean;
}

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  includedServices: string[];
  vehicleTypePricing: VehicleTypePrice[];
  isActive: boolean;
}

interface ServiceSuggestion {
  id: string;
  serviceName: string;
  description: string;
  category: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  notes?: string;
}

interface Campaign {
  id: string;
  name: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  isActive: boolean;
}

interface BranchServicesManagementProps {
  editingSection: string | null;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  globalServices: GlobalService[];
  campaigns: Campaign[];
}

const VEHICLE_TYPES = ["Sedan", "SUV", "Truck", "Luxury", "Van", "Motorcycle"];

export function BranchServicesManagement({
  editingSection,
  onEdit,
  onSave,
  onCancel,
  globalServices,
  campaigns,
}: BranchServicesManagementProps) {
  const [activeTab, setActiveTab] = useState("my-services");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  const [showAddServiceDialog, setShowAddServiceDialog] = useState(false);
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [showSuggestionDialog, setShowSuggestionDialog] = useState(false);

  // Mock data - would come from props/state
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([
    {
      id: "gs1",
      name: "Premium Exterior Wash",
      description: "Complete exterior cleaning with premium soap, hand dry, and tire shine",
      category: "Exterior",
      vehicleTypes: ["Sedan", "SUV", "Truck"],
      isEnabled: true,
      customVehicleTypePricing: [
        { vehicleType: "Sedan", price: 28, duration: 22, campaignId: "camp1" },
        { vehicleType: "SUV", price: 38, duration: 27 },
        { vehicleType: "Truck", price: 45, duration: 32 },
      ],
    },
    {
      id: "gs2",
      name: "Interior Deep Clean",
      description: "Comprehensive interior vacuum, surface cleaning, and air freshener",
      category: "Interior",
      vehicleTypes: ["Sedan", "SUV", "Truck"],
      isEnabled: true,
      customVehicleTypePricing: [
        { vehicleType: "Sedan", price: 32, duration: 27, campaignId: "camp2" },
        { vehicleType: "SUV", price: 42, duration: 32 },
        { vehicleType: "Truck", price: 48, duration: 37 },
      ],
    },
  ]);

  const [packages, setPackages] = useState<ServicePackage[]>([
    {
      id: "pkg1",
      name: "Complete Care Package",
      description: "Full exterior and interior cleaning",
      includedServices: ["gs1", "gs2"],
      isActive: true,
      vehicleTypePricing: [
        { vehicleType: "Sedan", price: 55, duration: 45, campaignId: "camp1" },
        { vehicleType: "SUV", price: 75, duration: 55 },
        { vehicleType: "Truck", price: 85, duration: 65 },
      ],
    },
  ]);

  const [suggestions, setSuggestions] = useState<ServiceSuggestion[]>([
    {
      id: "sug1",
      serviceName: "Paint Protection Film",
      description: "Premium PPF installation for vehicle protection",
      category: "Protection",
      status: "pending",
      createdAt: "2025-10-15",
    },
    {
      id: "sug2",
      serviceName: "Undercarriage Cleaning",
      description: "High-pressure cleaning of vehicle underside",
      category: "Exterior",
      status: "accepted",
      createdAt: "2025-10-10",
      notes: "Added to global catalog",
    },
    {
      id: "sug3",
      serviceName: "Pet Hair Removal",
      description: "Specialized service for removing pet hair",
      category: "Interior",
      status: "rejected",
      createdAt: "2025-10-05",
      notes: "Too niche for standard catalog",
    },
  ]);

  // Service form state
  const [serviceForm, setServiceForm] = useState<{
    vehicleTypePricing: VehicleTypePrice[];
  }>({
    vehicleTypePricing: [],
  });

  // Package form state
  const [packageForm, setPackageForm] = useState({
    name: "",
    description: "",
    includedServices: [] as string[],
    vehicleTypePricing: [] as VehicleTypePrice[],
  });

  // Suggestion form state
  const [suggestionForm, setSuggestionForm] = useState({
    serviceName: "",
    description: "",
    category: "",
  });

  const categories = Array.from(new Set(globalServices.map((s) => s.category)));
  
  // Filter selected services
  const filteredSelectedServices = selectedServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filter available services (not yet selected)
  const availableServices = globalServices.filter(
    (gs) => !selectedServices.some((ss) => ss.id === gs.id)
  );

  const handleEditService = (serviceId: string) => {
    const service = selectedServices.find((s) => s.id === serviceId);
    if (service) {
      setEditingService(serviceId);
      setServiceForm({
        vehicleTypePricing: service.customVehicleTypePricing,
      });
    }
  };

  const handleSaveService = () => {
    if (editingService) {
      setSelectedServices((prev) =>
        prev.map((s) =>
          s.id === editingService
            ? { ...s, customVehicleTypePricing: serviceForm.vehicleTypePricing }
            : s
        )
      );
      toast.success("Service updated successfully");
      setEditingService(null);
    }
  };

  const handleDeleteService = (serviceId: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== serviceId));
    toast.success("Service removed");
  };

  const handleAddService = (service: GlobalService) => {
    const newService: SelectedService = {
      ...service,
      isEnabled: true,
      customVehicleTypePricing:
        service.vehicleTypePricing?.map((vtp) => ({ ...vtp })) || [],
    };
    setSelectedServices((prev) => [...prev, newService]);
    toast.success(`${service.name} added to your services`);
    setShowAddServiceDialog(false);
  };

  const handleUpdateVehicleTypePrice = (index: number, field: keyof VehicleTypePrice, value: any) => {
    setServiceForm((prev) => ({
      ...prev,
      vehicleTypePricing: prev.vehicleTypePricing.map((vtp, i) =>
        i === index ? { ...vtp, [field]: value } : vtp
      ),
    }));
  };

  const handleAddVehicleType = () => {
    const usedVehicleTypes = serviceForm.vehicleTypePricing.map((vtp) => vtp.vehicleType);
    const availableVehicleType = VEHICLE_TYPES.find((vt) => !usedVehicleTypes.includes(vt));
    
    if (availableVehicleType) {
      setServiceForm((prev) => ({
        ...prev,
        vehicleTypePricing: [
          ...prev.vehicleTypePricing,
          { vehicleType: availableVehicleType, price: 0, duration: 0 },
        ],
      }));
    }
  };

  const handleRemoveVehicleType = (index: number) => {
    setServiceForm((prev) => ({
      ...prev,
      vehicleTypePricing: prev.vehicleTypePricing.filter((_, i) => i !== index),
    }));
  };

  const handleSavePackage = () => {
    if (editingPackage) {
      setPackages((prev) =>
        prev.map((p) =>
          p.id === editingPackage
            ? {
                ...p,
                name: packageForm.name,
                description: packageForm.description,
                includedServices: packageForm.includedServices,
                vehicleTypePricing: packageForm.vehicleTypePricing,
              }
            : p
        )
      );
      toast.success("Package updated successfully");
    } else {
      const newPackage: ServicePackage = {
        id: `pkg${Date.now()}`,
        name: packageForm.name,
        description: packageForm.description,
        includedServices: packageForm.includedServices,
        vehicleTypePricing: packageForm.vehicleTypePricing,
        isActive: true,
      };
      setPackages((prev) => [...prev, newPackage]);
      toast.success("Package created successfully");
    }
    setShowPackageDialog(false);
    setEditingPackage(null);
  };

  const handleDeletePackage = (packageId: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== packageId));
    toast.success("Package deleted");
  };

  const handleSubmitSuggestion = () => {
    const newSuggestion: ServiceSuggestion = {
      id: `sug${Date.now()}`,
      serviceName: suggestionForm.serviceName,
      description: suggestionForm.description,
      category: suggestionForm.category,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setSuggestions((prev) => [newSuggestion, ...prev]);
    toast.success("Service suggestion submitted to ROOT OWNER");
    setShowSuggestionDialog(false);
    setSuggestionForm({ serviceName: "", description: "", category: "" });
  };

  const getCampaignName = (campaignId?: string) => {
    if (!campaignId) return null;
    const campaign = campaigns.find((c) => c.id === campaignId);
    return campaign?.name;
  };

  const getServiceName = (serviceId: string) => {
    const service = selectedServices.find((s) => s.id === serviceId);
    return service?.name || "Unknown Service";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Services & Packages Management</CardTitle>
          <CardDescription>
            {editingSection === "servicesPackages"
              ? "Configure services with custom pricing, vehicle types, and campaigns"
              : "Manage your services, packages, and suggest new services"}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {editingSection === "servicesPackages" ? (
            <>
              <Button variant="outline" size="sm" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={onSave}>
                <Save className="h-4 w-4 mr-2" />
                Save All
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Services
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Hierarchy Info */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-2 flex-1">
              <h4 className="font-medium">Service Hierarchy</h4>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>
                    <span className="font-medium text-foreground">ROOT OWNER</span> (Platform Level) - Creates
                    standard services, manages all carwash centers
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>
                    <span className="font-medium text-foreground">Carwash Owner</span> (Center Level) - Selects
                    services, creates packages, applies campaigns
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-8">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>
                    <span className="font-medium text-foreground">Branch Admin</span> (Branch Level) -
                    Enables/disables services for specific branch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#ececf0] p-1 h-9">
            <TabsTrigger value="my-services" className="data-[state=active]:bg-white gap-2">
              <Package className="h-4 w-4" />
              My Services
            </TabsTrigger>
            <TabsTrigger value="my-packages" className="data-[state=active]:bg-white gap-2">
              <Sparkles className="h-4 w-4" />
              My Packages
            </TabsTrigger>
            <TabsTrigger value="global-catalog" className="data-[state=active]:bg-white gap-2">
              <ShoppingCart className="h-4 w-4" />
              Global Catalog
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="data-[state=active]:bg-white gap-2">
              <Lightbulb className="h-4 w-4" />
              Suggestions
            </TabsTrigger>
          </TabsList>

          {/* My Services Tab */}
          <TabsContent value="my-services" className="mt-6 space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Services</span>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-semibold">{selectedServices.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedServices.filter((s) => s.isEnabled).length} enabled
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Categories</span>
                    <Filter className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-semibold">
                    {Array.from(new Set(selectedServices.map((s) => s.category))).length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Service types</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Avg. Price</span>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-semibold">
                    $
                    {selectedServices.length > 0
                      ? Math.round(
                          selectedServices.reduce(
                            (sum, s) =>
                              sum +
                              (s.customVehicleTypePricing.length > 0
                                ? s.customVehicleTypePricing.reduce((s, vtp) => s + vtp.price, 0) /
                                  s.customVehicleTypePricing.length
                                : 0),
                            0
                          ) / selectedServices.length
                        )
                      : 0}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Across all vehicle types</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
                  {categories.map((cat) => (
                    <DropdownMenuItem key={cat} onClick={() => setCategoryFilter(cat)}>
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="gap-2" onClick={() => setShowAddServiceDialog(true)}>
                <Plus className="h-4 w-4" />
                Add Service
              </Button>
            </div>

            {/* Services Table */}
            <div className="border border-border/40 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/40 hover:bg-transparent">
                    <TableHead className="font-medium">Service Name</TableHead>
                    <TableHead className="font-medium">Category</TableHead>
                    <TableHead className="font-medium">Vehicle Types</TableHead>
                    <TableHead className="font-medium text-center">Status</TableHead>
                    <TableHead className="font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSelectedServices.map((service) => (
                    <TableRow key={service.id} className="border-b border-border/40">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-[rgba(3,2,19,0.1)] rounded-lg p-2">
                            <Package className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-normal">{service.name}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {service.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {service.customVehicleTypePricing.map((vtp) => (
                            <Badge key={vtp.vehicleType} variant="secondary" className="text-xs">
                              {vtp.vehicleType}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Switch
                            checked={service.isEnabled}
                            onCheckedChange={(checked) =>
                              setSelectedServices((prev) =>
                                prev.map((s) => (s.id === service.id ? { ...s, isEnabled: checked } : s))
                              )
                            }
                            disabled={editingSection !== "servicesPackages"}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditService(service.id)}
                            disabled={editingSection !== "servicesPackages"}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
                            disabled={editingSection !== "servicesPackages"}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredSelectedServices.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No services found</p>
                <Button
                  variant="link"
                  className="mt-2"
                  onClick={() => setShowAddServiceDialog(true)}
                >
                  Add your first service
                </Button>
              </div>
            )}
          </TabsContent>

          {/* My Packages Tab */}
          <TabsContent value="my-packages" className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Custom Packages</h3>
                <p className="text-sm text-muted-foreground">Bundle services to create value packages</p>
              </div>
              <Button
                className="gap-2"
                onClick={() => {
                  setEditingPackage(null);
                  setPackageForm({
                    name: "",
                    description: "",
                    includedServices: [],
                    vehicleTypePricing: [],
                  });
                  setShowPackageDialog(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Create Package
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="border-border">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{pkg.name}</h4>
                          {pkg.isActive && (
                            <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      </div>
                      <Switch
                        checked={pkg.isActive}
                        onCheckedChange={(checked) =>
                          setPackages((prev) =>
                            prev.map((p) => (p.id === pkg.id ? { ...p, isActive: checked } : p))
                          )
                        }
                        disabled={editingSection !== "servicesPackages"}
                      />
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Included Services</p>
                        <div className="flex flex-wrap gap-1">
                          {pkg.includedServices.map((serviceId) => (
                            <Badge key={serviceId} variant="secondary" className="text-xs">
                              {getServiceName(serviceId)}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Pricing by Vehicle Type</p>
                        <div className="space-y-1">
                          {pkg.vehicleTypePricing.map((vtp) => (
                            <div
                              key={vtp.vehicleType}
                              className="flex justify-between text-sm bg-muted/50 rounded px-2 py-1"
                            >
                              <span>{vtp.vehicleType}</span>
                              <span className="font-medium">
                                ${vtp.price} • {vtp.duration}min
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => {
                          setEditingPackage(pkg.id);
                          setPackageForm({
                            name: pkg.name,
                            description: pkg.description,
                            includedServices: pkg.includedServices,
                            vehicleTypePricing: pkg.vehicleTypePricing,
                          });
                          setShowPackageDialog(true);
                        }}
                        disabled={editingSection !== "servicesPackages"}
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePackage(pkg.id)}
                        disabled={editingSection !== "servicesPackages"}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {packages.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No packages created yet</p>
                <Button
                  variant="link"
                  className="mt-2"
                  onClick={() => {
                    setEditingPackage(null);
                    setPackageForm({
                      name: "",
                      description: "",
                      includedServices: [],
                      vehicleTypePricing: [],
                    });
                    setShowPackageDialog(true);
                  }}
                >
                  Create your first package
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Global Catalog Tab */}
          <TabsContent value="global-catalog" className="mt-6 space-y-4">
            <div>
              <h3 className="font-medium mb-1">Global Service Catalog</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse services created by ROOT OWNER and add them to your branch
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableServices.map((service) => {
                const avgPrice =
                  service.vehicleTypePricing && service.vehicleTypePricing.length > 0
                    ? Math.round(
                        service.vehicleTypePricing.reduce((sum, vtp) => sum + vtp.price, 0) /
                          service.vehicleTypePricing.length
                      )
                    : 0;
                const avgDuration =
                  service.vehicleTypePricing && service.vehicleTypePricing.length > 0
                    ? Math.round(
                        service.vehicleTypePricing.reduce((sum, vtp) => sum + vtp.duration, 0) /
                          service.vehicleTypePricing.length
                      )
                    : 0;

                return (
                  <Card key={service.id} className="border-border">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium mb-1">{service.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {service.category}
                          </Badge>
                        </div>
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

                      <Button
                        className="w-full gap-2"
                        onClick={() => handleAddService(service)}
                        disabled={editingSection !== "servicesPackages"}
                      >
                        <Plus className="h-4 w-4" />
                        Add to My Services
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {availableServices.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50 text-green-600" />
                <p>You've added all available services!</p>
              </div>
            )}
          </TabsContent>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions" className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Service Suggestions</h3>
                <p className="text-sm text-muted-foreground">
                  Suggest new services to ROOT OWNER for the global catalog
                </p>
              </div>
              <Button className="gap-2" onClick={() => setShowSuggestionDialog(true)}>
                <Lightbulb className="h-4 w-4" />
                Suggest New Service
              </Button>
            </div>

            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{suggestion.serviceName}</h4>
                          <Badge
                            variant="outline"
                            className={
                              suggestion.status === "pending"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                : suggestion.status === "accepted"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-red-100 text-red-700 border-red-200"
                            }
                          >
                            {suggestion.status === "pending" && (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {suggestion.status === "accepted" && (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {suggestion.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                            {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                        {suggestion.notes && (
                          <div className="bg-muted/50 rounded-lg p-2 text-xs text-muted-foreground">
                            <span className="font-medium">Note:</span> {suggestion.notes}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground ml-4">{suggestion.createdAt}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {suggestions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No suggestions yet</p>
                <Button
                  variant="link"
                  className="mt-2"
                  onClick={() => setShowSuggestionDialog(true)}
                >
                  Suggest a new service
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Edit Service Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit Service: {selectedServices.find((s) => s.id === editingService)?.name}
            </DialogTitle>
            <DialogDescription>
              Configure pricing, duration, and campaigns for each vehicle type
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Vehicle Type Pricing</h4>
              <Button variant="outline" size="sm" onClick={handleAddVehicleType}>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle Type
              </Button>
            </div>

            <div className="space-y-3">
              {serviceForm.vehicleTypePricing.map((vtp, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Vehicle Type</Label>
                        <Select
                          value={vtp.vehicleType}
                          onValueChange={(value) =>
                            handleUpdateVehicleTypePrice(index, "vehicleType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {VEHICLE_TYPES.map((vt) => (
                              <SelectItem key={vt} value={vt}>
                                {vt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={vtp.price}
                          onChange={(e) =>
                            handleUpdateVehicleTypePrice(index, "price", parseFloat(e.target.value) || 0)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Duration (min)</Label>
                        <Input
                          type="number"
                          value={vtp.duration}
                          onChange={(e) =>
                            handleUpdateVehicleTypePrice(
                              index,
                              "duration",
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Campaign (Optional)</Label>
                        <div className="flex gap-2">
                          <Select
                            value={vtp.campaignId || "none"}
                            onValueChange={(value) =>
                              handleUpdateVehicleTypePrice(
                                index,
                                "campaignId",
                                value === "none" ? undefined : value
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Campaign</SelectItem>
                              {campaigns
                                .filter((c) => c.isActive)
                                .map((campaign) => (
                                  <SelectItem key={campaign.id} value={campaign.id}>
                                    {campaign.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveVehicleType(index)}
                            disabled={serviceForm.vehicleTypePricing.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {vtp.campaignId && (
                      <div className="mt-3 bg-blue-50 rounded-lg p-2 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">
                          Campaign: {getCampaignName(vtp.campaignId)} applied
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingService(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveService}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Service Dialog */}
      <Dialog open={showAddServiceDialog} onOpenChange={setShowAddServiceDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Service from Global Catalog</DialogTitle>
            <DialogDescription>Browse and add services created by ROOT OWNER</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
            {availableServices.map((service) => {
              const avgPrice =
                service.vehicleTypePricing && service.vehicleTypePricing.length > 0
                  ? Math.round(
                      service.vehicleTypePricing.reduce((sum, vtp) => sum + vtp.price, 0) /
                        service.vehicleTypePricing.length
                    )
                  : 0;

              return (
                <Card key={service.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h4 className="font-medium mb-1">{service.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">${avgPrice} avg</span>
                      <Button size="sm" onClick={() => handleAddService(service)}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddServiceDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Package Dialog */}
      <Dialog open={showPackageDialog} onOpenChange={setShowPackageDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPackage ? "Edit Package" : "Create New Package"}</DialogTitle>
            <DialogDescription>Bundle multiple services into a value package</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>Package Name</Label>
                <Input
                  value={packageForm.name}
                  onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                  placeholder="e.g., Complete Care Package"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={packageForm.description}
                  onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                  placeholder="Describe what's included in this package"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Included Services</Label>
                <div className="border border-border rounded-lg p-3 space-y-2">
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={packageForm.includedServices.includes(service.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPackageForm({
                              ...packageForm,
                              includedServices: [...packageForm.includedServices, service.id],
                            });
                          } else {
                            setPackageForm({
                              ...packageForm,
                              includedServices: packageForm.includedServices.filter(
                                (id) => id !== service.id
                              ),
                            });
                          }
                        }}
                      />
                      <span className="text-sm">{service.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Vehicle Type Pricing</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const usedVehicleTypes = packageForm.vehicleTypePricing.map((vtp) => vtp.vehicleType);
                      const availableVehicleType = VEHICLE_TYPES.find(
                        (vt) => !usedVehicleTypes.includes(vt)
                      );
                      if (availableVehicleType) {
                        setPackageForm({
                          ...packageForm,
                          vehicleTypePricing: [
                            ...packageForm.vehicleTypePricing,
                            { vehicleType: availableVehicleType, price: 0, duration: 0 },
                          ],
                        });
                      }
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vehicle Type
                  </Button>
                </div>

                <div className="space-y-3">
                  {packageForm.vehicleTypePricing.map((vtp, index) => (
                    <Card key={index} className="border-border">
                      <CardContent className="p-3">
                        <div className="grid grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Vehicle Type</Label>
                            <Select
                              value={vtp.vehicleType}
                              onValueChange={(value) => {
                                setPackageForm({
                                  ...packageForm,
                                  vehicleTypePricing: packageForm.vehicleTypePricing.map((v, i) =>
                                    i === index ? { ...v, vehicleType: value } : v
                                  ),
                                });
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {VEHICLE_TYPES.map((vt) => (
                                  <SelectItem key={vt} value={vt}>
                                    {vt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs">Price ($)</Label>
                            <Input
                              type="number"
                              value={vtp.price}
                              onChange={(e) => {
                                setPackageForm({
                                  ...packageForm,
                                  vehicleTypePricing: packageForm.vehicleTypePricing.map((v, i) =>
                                    i === index ? { ...v, price: parseFloat(e.target.value) || 0 } : v
                                  ),
                                });
                              }}
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs">Duration (min)</Label>
                            <Input
                              type="number"
                              value={vtp.duration}
                              onChange={(e) => {
                                setPackageForm({
                                  ...packageForm,
                                  vehicleTypePricing: packageForm.vehicleTypePricing.map((v, i) =>
                                    i === index
                                      ? { ...v, duration: parseInt(e.target.value) || 0 }
                                      : v
                                  ),
                                });
                              }}
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs">Campaign</Label>
                            <div className="flex gap-2">
                              <Select
                                value={vtp.campaignId || "none"}
                                onValueChange={(value) => {
                                  setPackageForm({
                                    ...packageForm,
                                    vehicleTypePricing: packageForm.vehicleTypePricing.map((v, i) =>
                                      i === index
                                        ? { ...v, campaignId: value === "none" ? undefined : value }
                                        : v
                                    ),
                                  });
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">None</SelectItem>
                                  {campaigns
                                    .filter((c) => c.isActive)
                                    .map((campaign) => (
                                      <SelectItem key={campaign.id} value={campaign.id}>
                                        {campaign.name}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setPackageForm({
                                    ...packageForm,
                                    vehicleTypePricing: packageForm.vehicleTypePricing.filter(
                                      (_, i) => i !== index
                                    ),
                                  });
                                }}
                                disabled={packageForm.vehicleTypePricing.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPackageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePackage}>
              {editingPackage ? "Save Changes" : "Create Package"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suggest Service Dialog */}
      <Dialog open={showSuggestionDialog} onOpenChange={setShowSuggestionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Suggest New Service</DialogTitle>
            <DialogDescription>
              Submit a service suggestion to ROOT OWNER for consideration in the global catalog
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Service Name</Label>
              <Input
                value={suggestionForm.serviceName}
                onChange={(e) =>
                  setSuggestionForm({ ...suggestionForm, serviceName: e.target.value })
                }
                placeholder="e.g., Paint Protection Film"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={suggestionForm.category}
                onValueChange={(value) => setSuggestionForm({ ...suggestionForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={suggestionForm.description}
                onChange={(e) =>
                  setSuggestionForm({ ...suggestionForm, description: e.target.value })
                }
                placeholder="Describe the service and why it would be valuable..."
                rows={4}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700">
                Your suggestion will be reviewed by the ROOT OWNER. You'll be notified when a decision is
                made.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuggestionDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitSuggestion}
              disabled={
                !suggestionForm.serviceName || !suggestionForm.description || !suggestionForm.category
              }
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Submit Suggestion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
