"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Plus, Edit, Trash2, Clock, DollarSign, Car } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface VehicleTypePrice {
  vehicleType: string;
  price: number;
  discountPrice?: number; // Add optional discount price field
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

interface StandardServicesManagementProps {
  services: StandardService[];
  packages: StandardPackage[];
  onAddService: (service: Omit<StandardService, 'id' | 'createdDate'>) => void;
  onEditService: (id: string, service: Partial<StandardService>) => void;
  onDeleteService: (id: string) => void;
  onAddPackage: (pkg: Omit<StandardPackage, 'id' | 'createdDate'>) => void;
  onEditPackage: (id: string, pkg: Partial<StandardPackage>) => void;
  onDeletePackage: (id: string) => void;
}

export function StandardServicesManagement({
  services,
  packages,
  onAddService,
  onEditService,
  onDeleteService,
  onAddPackage,
  onEditPackage,
  onDeletePackage,
}: StandardServicesManagementProps) {
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

  const resetServiceForm = () => {
    setServiceForm({
      name: "",
      description: "",
      vehicleTypePricing: [],
      vehicleTypes: [],
      category: "",
      isActive: true,
    });
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
  };

  const initializeVehicleTypeForService = (vehicleType: string) => {
    setServiceForm(prev => {
      if (!prev.vehicleTypes.includes(vehicleType)) {
        const newVehicleTypes = [...prev.vehicleTypes, vehicleType];
        const newPricing = {
          vehicleType,
          price: 0,
          duration: 0,
        };
        return {
          ...prev,
          vehicleTypes: newVehicleTypes,
          vehicleTypePricing: [...prev.vehicleTypePricing, newPricing],
        };
      }
      return prev;
    });
  };

  const removeVehicleTypeFromService = (vehicleType: string) => {
    setServiceForm(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.filter(t => t !== vehicleType),
      vehicleTypePricing: prev.vehicleTypePricing.filter(vtp => vtp.vehicleType !== vehicleType),
    }));
  };

  const updateServiceVehicleTypePricing = (vehicleType: string, field: keyof VehicleTypePrice, value: any) => {
    setServiceForm(prev => ({
      ...prev,
      vehicleTypePricing: prev.vehicleTypePricing.map(vtp =>
        vtp.vehicleType === vehicleType ? { ...vtp, [field]: value } : vtp
      ),
    }));
  };

  const getCurrentServiceVehicleTypePricing = (vehicleType: string): VehicleTypePrice | undefined => {
    return serviceForm.vehicleTypePricing.find(vtp => vtp.vehicleType === vehicleType);
  };

  const initializeVehicleTypeForPackage = (vehicleType: string) => {
    setPackageForm(prev => {
      if (!prev.vehicleTypes.includes(vehicleType)) {
        const newVehicleTypes = [...prev.vehicleTypes, vehicleType];
        const newPricing = {
          vehicleType,
          price: 0,
          duration: 0,
        };
        return {
          ...prev,
          vehicleTypes: newVehicleTypes,
          vehicleTypePricing: [...prev.vehicleTypePricing, newPricing],
        };
      }
      return prev;
    });
  };

  const removeVehicleTypeFromPackage = (vehicleType: string) => {
    setPackageForm(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.filter(t => t !== vehicleType),
      vehicleTypePricing: prev.vehicleTypePricing.filter(vtp => vtp.vehicleType !== vehicleType),
    }));
  };

  const updatePackageVehicleTypePricing = (vehicleType: string, field: keyof VehicleTypePrice, value: any) => {
    setPackageForm(prev => ({
      ...prev,
      vehicleTypePricing: prev.vehicleTypePricing.map(vtp =>
        vtp.vehicleType === vehicleType ? { ...vtp, [field]: value } : vtp
      ),
    }));
  };

  const getCurrentPackageVehicleTypePricing = (vehicleType: string): VehicleTypePrice | undefined => {
    return packageForm.vehicleTypePricing.find(vtp => vtp.vehicleType === vehicleType);
  };

  const handleAddService = () => {
    if (serviceForm.vehicleTypes.length === 0) {
      toast.error("Please select at least one vehicle type");
      return;
    }
    onAddService(serviceForm);
    resetServiceForm();
    setIsAddServiceOpen(false);
    toast.success("Service added successfully");
  };

  const handleEditService = () => {
    if (editingService) {
      onEditService(editingService.id, serviceForm);
      setEditingService(null);
      resetServiceForm();
      toast.success("Service updated successfully");
    }
  };

  const handleAddPackage = () => {
    if (packageForm.vehicleTypes.length === 0) {
      toast.error("Please select at least one vehicle type");
      return;
    }
    
    // Calculate estimated duration from included services for each vehicle type
    const updatedPricing = packageForm.vehicleTypePricing.map(vtp => {
      const totalDuration = packageForm.includedServices.reduce((total, serviceName) => {
        const service = services.find(s => s.name === serviceName);
        const serviceVehiclePricing = service?.vehicleTypePricing?.find(svtp => svtp.vehicleType === vtp.vehicleType);
        return total + (serviceVehiclePricing?.duration || 0);
      }, 0);
      
      return {
        ...vtp,
        duration: totalDuration,
      };
    });

    onAddPackage({
      ...packageForm,
      vehicleTypePricing: updatedPricing,
    });
    resetPackageForm();
    setIsAddPackageOpen(false);
    toast.success("Package created successfully");
  };

  const handleEditPackage = () => {
    if (editingPackage) {
      const updatedPricing = packageForm.vehicleTypePricing.map(vtp => {
        const totalDuration = packageForm.includedServices.reduce((total, serviceName) => {
          const service = services.find(s => s.name === serviceName);
          const serviceVehiclePricing = service?.vehicleTypePricing?.find(svtp => svtp.vehicleType === vtp.vehicleType);
          return total + (serviceVehiclePricing?.duration || 0);
        }, 0);
        
        return {
          ...vtp,
          duration: totalDuration,
        };
      });

      onEditPackage(editingPackage.id, {
        ...packageForm,
        vehicleTypePricing: updatedPricing,
      });
      setEditingPackage(null);
      resetPackageForm();
      toast.success("Package updated successfully");
    }
  };

  const openEditService = (service: StandardService) => {
    setServiceForm({
      name: service.name,
      description: service.description,
      vehicleTypePricing: service.vehicleTypePricing || [],
      vehicleTypes: service.vehicleTypes,
      category: service.category,
      isActive: service.isActive,
    });
    setEditingService(service);
  };

  const openEditPackage = (pkg: StandardPackage) => {
    setPackageForm({
      name: pkg.name,
      description: pkg.description,
      includedServices: pkg.includedServices,
      vehicleTypePricing: pkg.vehicleTypePricing || [],
      vehicleTypes: pkg.vehicleTypes,
      isActive: pkg.isActive,
    });
    setEditingPackage(pkg);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Standard Services & Package Management</h2>
        <p className="text-muted-foreground">Manage the master catalog of services and packages available on the platform</p>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList>
          <TabsTrigger value="services">Standard Services</TabsTrigger>
          <TabsTrigger value="packages">Standard Packages</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Standard Services ({services.length})</CardTitle>
              <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Standard Service</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="serviceName">Service Name</Label>
                        <Input
                          id="serviceName"
                          value={serviceForm.name}
                          onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Premium Exterior Wash"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={serviceForm.category} onValueChange={(value) => setServiceForm(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryOptions.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detailed description of the service..."
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Vehicle Types & Pricing</Label>
                      
                      {/* Vehicle Type Selection */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicleTypeOptions.map(type => (
                          <Button
                            key={type}
                            variant={serviceForm.vehicleTypes.includes(type) ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              if (serviceForm.vehicleTypes.includes(type)) {
                                removeVehicleTypeFromService(type);
                              } else {
                                initializeVehicleTypeForService(type);
                              }
                            }}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>

                      {/* Vehicle Type Pricing Sections */}
                      {serviceForm.vehicleTypes.length > 0 ? (
                        <div className="space-y-6">
                          {serviceForm.vehicleTypes.map(vehicleType => {
                            const currentPricing = getCurrentServiceVehicleTypePricing(vehicleType);
                            
                            return (
                              <div key={vehicleType} className="border rounded-lg p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{vehicleType}</h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeVehicleTypeFromService(vehicleType)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    Remove
                                  </Button>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Price ($)</Label>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={currentPricing?.price || 0}
                                      onChange={(e) => updateServiceVehicleTypePricing(vehicleType, 'price', parseFloat(e.target.value) || 0)}
                                      placeholder="0.00"
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label>Duration (minutes)</Label>
                                    <Input
                                      type="number"
                                      value={currentPricing?.duration || 0}
                                      onChange={(e) => updateServiceVehicleTypePricing(vehicleType, 'duration', parseInt(e.target.value) || 0)}
                                      placeholder="0"
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                          <p className="text-muted-foreground">Select vehicle types above to configure pricing</p>
                        </div>
                      )}
                    </div>

                    <Button 
                      onClick={handleAddService} 
                      className="w-full"
                      disabled={serviceForm.vehicleTypes.length === 0}
                    >
                      Create Service
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Default Price</TableHead>
                    <TableHead>Vehicle Types</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground">{service.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{service.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {service.vehicleTypePricing.reduce((total, vtp) => total + vtp.duration, 0)}m
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {service.vehicleTypePricing.reduce((total, vtp) => total + vtp.price, 0)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {service.vehicleTypes.map(type => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={service.isActive ? "secondary" : "outline"}>
                          {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => openEditService(service)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Service</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Service Name</Label>
                                    <Input
                                      value={serviceForm.name}
                                      onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select value={serviceForm.category} onValueChange={(value) => setServiceForm(prev => ({ ...prev, category: value }))}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {categoryOptions.map(category => (
                                          <SelectItem key={category} value={category}>{category}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label>Description</Label>
                                  <Textarea
                                    value={serviceForm.description}
                                    onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Applicable Vehicle Types</Label>
                                  <div className="flex flex-wrap gap-2">
                                    {vehicleTypeOptions.map(type => (
                                      <Button
                                        key={type}
                                        variant={serviceForm.vehicleTypes.includes(type) ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => {
                                          if (serviceForm.vehicleTypes.includes(type)) {
                                            removeVehicleTypeFromService(type);
                                          } else {
                                            initializeVehicleTypeForService(type);
                                          }
                                        }}
                                      >
                                        {type}
                                      </Button>
                                    ))}
                                  </div>
                                </div>

                                {serviceForm.vehicleTypePricing.map((vtp, index) => (
                                  <div key={index} className="space-y-2">
                                    <Label>Vehicle Type: {vtp.vehicleType}</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label>Price ($)</Label>
                                        <Input
                                          type="number"
                                          step="0.01"
                                          value={vtp.price}
                                          onChange={(e) => updateServiceVehicleTypePricing(vtp.vehicleType, 'price', parseFloat(e.target.value))}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Duration (minutes)</Label>
                                        <Input
                                          type="number"
                                          value={vtp.duration}
                                          onChange={(e) => updateServiceVehicleTypePricing(vtp.vehicleType, 'duration', parseInt(e.target.value))}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                <Button onClick={handleEditService} className="w-full">
                                  Update Service
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              onDeleteService(service.id);
                              toast.success("Service deleted");
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="packages" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Standard Packages ({packages.length})</CardTitle>
              <Dialog open={isAddPackageOpen} onOpenChange={setIsAddPackageOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Package
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Standard Package</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Package Name</Label>
                      <Input
                        value={packageForm.name}
                        onChange={(e) => setPackageForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Premium Complete Package"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={packageForm.description}
                        onChange={(e) => setPackageForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detailed description of the package..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Included Services</Label>
                      <div className="space-y-2 max-h-32 overflow-y-auto border rounded p-2">
                        {services.filter(s => s.isActive).map(service => (
                          <div key={service.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`service-${service.id}`}
                              checked={packageForm.includedServices.includes(service.name)}
                              onChange={(e) => {
                                setPackageForm(prev => ({
                                  ...prev,
                                  includedServices: e.target.checked
                                    ? [...prev.includedServices, service.name]
                                    : prev.includedServices.filter(s => s !== service.name)
                                }));
                              }}
                            />
                            <Label htmlFor={`service-${service.id}`} className="text-sm">
                              {service.name} (${service.vehicleTypePricing.reduce((total, vtp) => total + vtp.price, 0)})
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Applicable Vehicle Types</Label>
                      <div className="flex flex-wrap gap-2">
                        {vehicleTypeOptions.map(type => (
                          <Button
                            key={type}
                            variant={packageForm.vehicleTypes.includes(type) ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              if (packageForm.vehicleTypes.includes(type)) {
                                removeVehicleTypeFromPackage(type);
                              } else {
                                initializeVehicleTypeForPackage(type);
                              }
                            }}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {packageForm.vehicleTypePricing.map((vtp, index) => (
                      <div key={index} className="space-y-2">
                        <Label>Vehicle Type: {vtp.vehicleType}</Label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Price ($)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={vtp.price}
                              onChange={(e) => updatePackageVehicleTypePricing(vtp.vehicleType, 'price', parseFloat(e.target.value))}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Discount Price ($)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={vtp.discountPrice || 0}
                              onChange={(e) => updatePackageVehicleTypePricing(vtp.vehicleType, 'discountPrice', parseFloat(e.target.value))}
                              placeholder="0.00"
                            />
                            <p className="text-xs text-muted-foreground">
                              Optional promotional price
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Duration (minutes)</Label>
                            <Input
                              type="number"
                              value={vtp.duration}
                              disabled
                              className="bg-muted"
                            />
                            <p className="text-xs text-muted-foreground">
                              Auto-calculated from services
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button onClick={handleAddPackage} className="w-full">
                      Create Package
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package Name</TableHead>
                    <TableHead>Included Services</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Vehicle Types</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{pkg.name}</div>
                          <div className="text-sm text-muted-foreground">{pkg.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {pkg.includedServices.slice(0, 2).map((service, index) => (
                            <div key={index} className="text-sm">• {service}</div>
                          ))}
                          {pkg.includedServices.length > 2 && (
                            <div className="text-sm text-muted-foreground">
                              +{pkg.includedServices.length - 2} more
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {pkg.vehicleTypePricing.reduce((total, vtp) => total + vtp.duration, 0)}m
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {pkg.vehicleTypePricing.reduce((total, vtp) => total + vtp.price, 0)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {pkg.vehicleTypes.map(type => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={pkg.isActive ? "secondary" : "outline"}>
                          {pkg.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => openEditPackage(pkg)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Package</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Package Name</Label>
                                  <Input
                                    value={packageForm.name}
                                    onChange={(e) => setPackageForm(prev => ({ ...prev, name: e.target.value }))}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label>Description</Label>
                                  <Textarea
                                    value={packageForm.description}
                                    onChange={(e) => setPackageForm(prev => ({ ...prev, description: e.target.value }))}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Included Services</Label>
                                  <div className="space-y-2 max-h-32 overflow-y-auto border rounded p-2">
                                    {services.filter(s => s.isActive).map(service => (
                                      <div key={service.id} className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          id={`edit-service-${service.id}`}
                                          checked={packageForm.includedServices.includes(service.name)}
                                          onChange={(e) => {
                                            setPackageForm(prev => ({
                                              ...prev,
                                              includedServices: e.target.checked
                                                ? [...prev.includedServices, service.name]
                                                : prev.includedServices.filter(s => s !== service.name)
                                            }));
                                          }}
                                        />
                                        <Label htmlFor={`edit-service-${service.id}`} className="text-sm">
                                          {service.name}
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>Applicable Vehicle Types</Label>
                                  <div className="flex flex-wrap gap-2">
                                    {vehicleTypeOptions.map(type => (
                                      <Button
                                        key={type}
                                        variant={packageForm.vehicleTypes.includes(type) ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => {
                                          if (packageForm.vehicleTypes.includes(type)) {
                                            removeVehicleTypeFromPackage(type);
                                          } else {
                                            initializeVehicleTypeForPackage(type);
                                          }
                                        }}
                                      >
                                        {type}
                                      </Button>
                                    ))}
                                  </div>
                                </div>

                                {packageForm.vehicleTypePricing.map((vtp, index) => (
                                  <div key={index} className="border rounded-lg p-4 space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-medium">Vehicle Type: {vtp.vehicleType}</h4>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeVehicleTypeFromPackage(vtp.vehicleType)}
                                        className="text-destructive hover:text-destructive"
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-4">
                                      <div className="space-y-2">
                                        <Label>Price ($)</Label>
                                        <Input
                                          type="number"
                                          step="0.01"
                                          value={vtp.price}
                                          onChange={(e) => updatePackageVehicleTypePricing(vtp.vehicleType, 'price', parseFloat(e.target.value))}
                                        />
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <Label>Discount Price ($)</Label>
                                        <Input
                                          type="number"
                                          step="0.01"
                                          value={vtp.discountPrice || 0}
                                          onChange={(e) => updatePackageVehicleTypePricing(vtp.vehicleType, 'discountPrice', parseFloat(e.target.value))}
                                          placeholder="0.00"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                          Optional promotional price
                                        </p>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <Label>Duration (minutes)</Label>
                                        <Input
                                          type="number"
                                          value={vtp.duration}
                                          disabled
                                          className="bg-muted"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                          Auto-calculated from services
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                <Button onClick={handleEditPackage} className="w-full">
                                  Update Package
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              onDeletePackage(pkg.id);
                              toast.success("Package deleted");
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
}