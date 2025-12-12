"use client";

import { useState, useCallback } from "react";
import { Save, MapPin, Upload, Camera, Edit, Package, Image, Info, X, Trash2, Plus, Star, GripVertical, Settings, Clock, Calendar } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner@2.0.3";
import { ServiceCatalog } from "./ServiceCatalog";
import { BranchServicesManagement } from "./BranchServicesManagement";
import { SimpleBusinessModuleSelector, BusinessModule } from "../modules/SimpleBusinessModuleSelector";
import { WorkingHoursCapacity } from "./WorkingHoursCapacity";

const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France"];

// Helper function to generate time options in 15-minute intervals
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      times.push(`${h}:${m}`);
    }
  }
  return times;
};

const TIME_OPTIONS = generateTimeOptions();

// Business module configuration with colors
const BUSINESS_MODULES_CONFIG = {
  detailing: { name: "Detailing / Hand Wash", color: "bg-orange-500", textColor: "text-orange-500", borderColor: "border-orange-500" },
  selfService: { name: "Self-Service", color: "bg-green-500", textColor: "text-green-500", borderColor: "border-green-500" },
  tunnel: { name: "Tunnel / Conveyor", color: "bg-purple-500", textColor: "text-purple-500", borderColor: "border-purple-500" },
  inBay: { name: "In-Bay / Roll-Over", color: "bg-blue-500", textColor: "text-blue-500", borderColor: "border-blue-500" },
  mobile: { name: "Mobile / On-Demand", color: "bg-red-500", textColor: "text-red-500", borderColor: "border-red-500" },
};

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const countryCodes = [
  { id: "us", code: "+1", country: "United States", flag: "🇺🇸" },
  { id: "ca", code: "+1", country: "Canada", flag: "🇨🇦" },
  { id: "gb", code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { id: "de", code: "+49", country: "Germany", flag: "🇩🇪" },
  { id: "fr", code: "+33", country: "France", flag: "🇫🇷" },
  { id: "tr", code: "+90", country: "Turkey", flag: "🇹🇷" },
];

// Mock global services created by ROOT OWNER
const mockGlobalServices = [
  {
    id: "gs1",
    name: "Premium Exterior Wash",
    description: "Complete exterior cleaning with premium soap, hand dry, and tire shine",
    category: "Exterior",
    vehicleTypes: ["Sedan", "SUV", "Truck"],
    vehicleTypePricing: [
      { vehicleType: "Sedan", price: 25, duration: 20 },
      { vehicleType: "SUV", price: 35, duration: 25 },
      { vehicleType: "Truck", price: 40, duration: 30 },
    ],
    isActive: true,
  },
  {
    id: "gs2",
    name: "Interior Deep Clean",
    description: "Comprehensive interior vacuum, surface cleaning, and air freshener",
    category: "Interior",
    vehicleTypes: ["Sedan", "SUV", "Truck"],
    vehicleTypePricing: [
      { vehicleType: "Sedan", price: 30, duration: 25 },
      { vehicleType: "SUV", price: 40, duration: 30 },
      { vehicleType: "Truck", price: 45, duration: 35 },
    ],
    isActive: true,
  },
  {
    id: "gs3",
    name: "Full Detailing",
    description: "Complete interior and exterior detailing with wax, polish, and protection",
    category: "Detailing",
    vehicleTypes: ["Sedan", "SUV", "Truck", "Luxury"],
    vehicleTypePricing: [
      { vehicleType: "Sedan", price: 120, duration: 90 },
      { vehicleType: "SUV", price: 150, duration: 120 },
      { vehicleType: "Truck", price: 170, duration: 130 },
      { vehicleType: "Luxury", price: 200, duration: 150 },
    ],
    isActive: true,
  },
  {
    id: "gs4",
    name: "Express Wash",
    description: "Quick exterior wash for customers on the go",
    category: "Exterior",
    vehicleTypes: ["Sedan", "SUV", "Truck"],
    vehicleTypePricing: [
      { vehicleType: "Sedan", price: 15, duration: 10 },
      { vehicleType: "SUV", price: 20, duration: 12 },
      { vehicleType: "Truck", price: 25, duration: 15 },
    ],
    isActive: true,
  },
  {
    id: "gs5",
    name: "Wax & Polish",
    description: "Premium wax application and paint polishing for lasting shine",
    category: "Protection",
    vehicleTypes: ["Sedan", "SUV", "Truck", "Luxury"],
    vehicleTypePricing: [
      { vehicleType: "Sedan", price: 60, duration: 40 },
      { vehicleType: "SUV", price: 75, duration: 50 },
      { vehicleType: "Truck", price: 85, duration: 55 },
      { vehicleType: "Luxury", price: 100, duration: 60 },
    ],
    isActive: true,
  },
  {
    id: "gs6",
    name: "Headlight Restoration",
    description: "Professional headlight cleaning and restoration service",
    category: "Maintenance",
    vehicleTypes: ["Sedan", "SUV", "Truck", "Luxury"],
    vehicleTypePricing: [
      { vehicleType: "Sedan", price: 50, duration: 30 },
      { vehicleType: "SUV", price: 50, duration: 30 },
      { vehicleType: "Truck", price: 55, duration: 35 },
      { vehicleType: "Luxury", price: 60, duration: 35 },
    ],
    isActive: true,
  },
  {
    id: "gs7",
    name: "Engine Cleaning",
    description: "Professional engine bay cleaning and degreasing",
    category: "Maintenance",
    vehicleTypes: ["Sedan", "SUV", "Truck"],
    vehicleTypePricing: [
      { vehicleType: "Sedan", price: 70, duration: 45 },
      { vehicleType: "SUV", price: 80, duration: 50 },
      { vehicleType: "Truck", price: 90, duration: 55 },
    ],
    isActive: true,
  },
  {
    id: "gs8",
    name: "Ceramic Coating",
    description: "Long-lasting ceramic paint protection coating",
    category: "Protection",
    vehicleTypes: ["Sedan", "SUV", "Luxury"],
    vehicleTypePricing: [
      { vehicleType: "Sedan", price: 300, duration: 180 },
      { vehicleType: "SUV", price: 400, duration: 210 },
      { vehicleType: "Luxury", price: 500, duration: 240 },
    ],
    isActive: true,
  },
];

// Mock center services (selected by Carwash Owner)
const mockCenterServices = [
  {
    id: "cs1",
    globalServiceId: "gs1",
    name: "Premium Exterior Wash",
    description: "Complete exterior cleaning with premium soap, hand dry, and tire shine",
    customPrice: 28,
    customDuration: 22,
    isActive: true,
    category: "Exterior",
    vehicleTypes: ["Sedan", "SUV", "Truck"],
  },
  {
    id: "cs2",
    globalServiceId: "gs2",
    name: "Interior Deep Clean",
    description: "Comprehensive interior vacuum, surface cleaning, and air freshener",
    customPrice: 32,
    customDuration: 27,
    isActive: true,
    category: "Interior",
    vehicleTypes: ["Sedan", "SUV", "Truck"],
  },
];

interface BranchFormProps {
  branch?: any;
  onSave: (branchData: any) => void;
  onBack: () => void;
  mode: "add" | "edit";
  defaultTab?: "visual" | "basic" | "address" | "services" | "modules";
}

interface CoverPhoto {
  id: string;
  url: string;
  isPrimary: boolean;
  file?: File;
}

interface DraggablePhotoCardProps {
  photo: CoverPhoto;
  index: number;
  branchName: string;
  editingSection: string | null;
  coverPhotosLength: number;
  onSetPrimary: (id: string) => void;
  onDelete: (id: string) => void;
  onUpload: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  movePhoto: (dragIndex: number, hoverIndex: number) => void;
}

const DraggablePhotoCard = ({
  photo,
  index,
  branchName,
  editingSection,
  coverPhotosLength,
  onSetPrimary,
  onDelete,
  onUpload,
  movePhoto,
}: DraggablePhotoCardProps) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: "photo",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: editingSection === "visualIdentity",
  });

  const [{ isOver }, drop] = useDrop({
    accept: "photo",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        movePhoto(item.index, index);
        item.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => preview(drop(node))}
      className={`relative border-2 border-dashed border-border rounded-lg overflow-hidden bg-muted/50 transition-all ${
        isDragging ? "opacity-50" : ""
      } ${isOver ? "ring-2 ring-primary" : ""}`}
    >
      {/* Drag handle - only visible in edit mode */}
      {editingSection === "visualIdentity" && photo.url && (
        <div
          ref={drag}
          className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm rounded-md p-1 cursor-move hover:bg-background transition-colors"
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {photo.url ? (
        <div className="relative aspect-video">
          <img 
            src={photo.url} 
            alt="Cover photo" 
            className="w-full h-full object-cover"
          />
          {photo.isPrimary && (
            <div className="absolute top-2 left-12 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Primary
            </div>
          )}
          {editingSection === "visualIdentity" && (
            <div className="absolute top-2 right-2 flex gap-2">
              {!photo.isPrimary && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0"
                  onClick={() => onSetPrimary(photo.id)}
                  title="Set as primary"
                >
                  <Star className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                className="h-8 w-8 p-0"
                onClick={() => onDelete(photo.id)}
                disabled={coverPhotosLength === 1}
                title="Delete photo"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video flex flex-col items-center justify-center p-4 text-center">
          <div className="w-full h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-white font-medium text-sm">{branchName}</span>
          </div>
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              className="relative" 
              disabled={editingSection !== "visualIdentity"}
            >
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={editingSection !== "visualIdentity"}
                onChange={(e) => onUpload(photo.id, e)}
              />
              Upload Photo
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">1200x600px recommended</p>
        </div>
      )}
      {photo.url && editingSection === "visualIdentity" && (
        <div className="p-2 border-t border-border bg-background">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full relative"
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => onUpload(photo.id, e)}
            />
            <Camera className="mr-2 h-4 w-4" />
            Change Photo
          </Button>
        </div>
      )}
    </div>
  );
};

export function BranchForm({ branch, onSave, onBack, mode, defaultTab }: BranchFormProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || "visual");
  // In add mode, all sections are editable by default. In edit mode, start with no section being edited.
  const [editingSection, setEditingSection] = useState<string | null>(
    mode === "add" ? "all" : null
  );
  const [branchName, setBranchName] = useState("Downtown Branch");
  const [branchPhone, setBranchPhone] = useState("+1-555-0123");
  const [branchPhoneCountry, setBranchPhoneCountry] = useState("us");
  const [branchEmail, setBranchEmail] = useState("branch@autowash.com");
  const [description, setDescription] = useState("Our flagship location");
  const [totalStaff, setTotalStaff] = useState(8);
  const [isActive, setIsActive] = useState(true);
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState("New York");
  const [city, setCity] = useState("New York City");
  const [street, setStreet] = useState("123 Main Street");
  const [building, setBuilding] = useState("Suite 100");
  const [postalCode, setPostalCode] = useState("10001");
  
  // Business Modules State
  const [businessModules, setBusinessModules] = useState<BusinessModule[]>([]);
  
  // Operating Hours State
  const [operatingHours, setOperatingHours] = useState([
    { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { day: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { day: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { day: "Thursday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { day: "Friday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
    { day: "Saturday", isOpen: true, openTime: "09:00", closeTime: "20:00" },
    { day: "Sunday", isOpen: true, openTime: "09:00", closeTime: "17:00" },
  ]);
  
  // Cover photos state - supporting multiple photos
  const [coverPhotos, setCoverPhotos] = useState<CoverPhoto[]>([
    {
      id: "cover1",
      url: "https://images.unsplash.com/photo-1594611373247-32d49b8ec68c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB3YXNoJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzYwMTAwODM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isPrimary: true,
    },
    {
      id: "cover2",
      url: "https://images.unsplash.com/photo-1505761283622-7fe50142c97f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZXRhaWxpbmclMjBjbGVhbnxlbnwxfHx8fDE3NjAwOTk4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isPrimary: false,
    },
    {
      id: "cover3",
      url: "https://images.unsplash.com/photo-1754369764402-61efb2700eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjB3YXNoaW5nfGVufDF8fHx8MTc2MDEwMDgzNnww&ixlib=rb-4.1.0&q=80&w=1080",
      isPrimary: false,
    }
  ]);
  const [logo, setLogo] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Mock campaigns for testing
  const mockCampaigns = [
    {
      id: "camp1",
      name: "Summer Special 2025",
      discountType: "percentage" as const,
      discountValue: 20,
      isActive: true,
    },
    {
      id: "camp2",
      name: "Holiday Discount",
      discountType: "fixed" as const,
      discountValue: 15,
      isActive: true,
    },
    {
      id: "camp3",
      name: "New Customer Promo",
      discountType: "percentage" as const,
      discountValue: 25,
      isActive: false,
    },
  ];

  const handleSave = () => {
    toast.success("Profile information saved successfully");
    onSave({});
  };

  const handleSectionEdit = (sectionId: string) => {
    setEditingSection(sectionId);
  };

  const handleSectionSave = (sectionId: string) => {
    setEditingSection(null);
    toast.success("Section saved successfully");
  };

  const handleSectionCancel = () => {
    setEditingSection(null);
  };

  // Cover photo management functions
  const handleAddCoverPhoto = () => {
    if (coverPhotos.length >= 10) {
      toast.error("Maximum of 10 photos allowed");
      return;
    }
    const newPhoto: CoverPhoto = {
      id: `cover${Date.now()}`,
      url: "",
      isPrimary: coverPhotos.length === 0, // First photo is primary by default
    };
    setCoverPhotos(prev => [...prev, newPhoto]);
  };

  const handleDeleteCoverPhoto = (photoId: string) => {
    setCoverPhotos(prev => {
      const filtered = prev.filter(p => p.id !== photoId);
      // If we deleted the primary photo, make the first one primary
      if (filtered.length > 0 && !filtered.some(p => p.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
    toast.success("Photo removed");
  };

  const handleSetPrimaryCoverPhoto = (photoId: string) => {
    setCoverPhotos(prev => prev.map(p => ({
      ...p,
      isPrimary: p.id === photoId
    })));
    toast.success("Primary photo updated");
  };

  const handleCoverPhotoUpload = (photoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhotos(prev => prev.map(p => 
          p.id === photoId 
            ? { ...p, url: reader.result as string, file } 
            : p
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop handler
  const movePhoto = useCallback((dragIndex: number, hoverIndex: number) => {
    setCoverPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos];
      const draggedPhoto = newPhotos[dragIndex];
      newPhotos.splice(dragIndex, 1);
      newPhotos.splice(hoverIndex, 0, draggedPhoto);
      return newPhotos;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="visual" className="gap-2">
            <Image className="h-4 w-4" />
            Visual Identity
          </TabsTrigger>
          <TabsTrigger value="basic" className="gap-2">
            <Info className="h-4 w-4" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="address" className="gap-2">
            <MapPin className="h-4 w-4" />
            Address
          </TabsTrigger>
          <TabsTrigger value="operating-hours" className="gap-2">
            <Clock className="h-4 w-4" />
            Operating Hours
          </TabsTrigger>
        </TabsList>

        {/* Visual Identity Tab */}
        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Visual Identity</CardTitle>
                <CardDescription>Upload images for your branch</CardDescription>
              </div>
              <div className="flex gap-2">
                {editingSection === "visualIdentity" ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleSectionCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleSectionSave("visualIdentity")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => handleSectionEdit("visualIdentity")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Label className="text-base font-medium">Cover Photos</Label>
                  <p className="text-sm text-muted-foreground">Manage photos displayed in your mobile app listing</p>
                </div>
                {editingSection === "visualIdentity" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddCoverPhoto}
                    className="gap-2"
                    disabled={coverPhotos.length >= 10}
                  >
                    <Plus className="h-4 w-4" />
                    Add Photo ({coverPhotos.length}/10)
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coverPhotos.map((photo, index) => (
                  <DraggablePhotoCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    branchName={branchName}
                    editingSection={editingSection}
                    coverPhotosLength={coverPhotos.length}
                    onSetPrimary={handleSetPrimaryCoverPhoto}
                    onDelete={handleDeleteCoverPhoto}
                    onUpload={handleCoverPhotoUpload}
                    movePhoto={movePhoto}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                The primary photo will be displayed as the main cover image. You can manage up to 10 photos. {editingSection === "visualIdentity" && "Drag photos to reorder them."}
              </p>
            </div>

            <div>
              <Label className="text-base font-medium">Logo</Label>
              <p className="text-sm text-muted-foreground mb-3">Your branch logo that appears throughout the app</p>
              <div className="flex items-center gap-4">
                {logo ? (
                  <img src={logo} alt="Branch logo" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {branchName.charAt(0)}
                  </div>
                )}
                <div className="space-y-2">
                  <Button variant="outline" className="relative" disabled={editingSection !== "visualIdentity"}>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={editingSection !== "visualIdentity"}
                      onChange={handleLogoUpload}
                    />
                    <Camera className="mr-2 h-4 w-4" />
                    Change Logo
                  </Button>
                  <p className="text-xs text-muted-foreground">Recommended: Square format, 512x512px</p>
                </div>
              </div>
            </div>
          </CardContent>
          </Card>
        </TabsContent>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details for your branch</CardDescription>
              </div>
              <div className="flex gap-2">
                {editingSection === "basicInfo" ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleSectionCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleSectionSave("basicInfo")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => handleSectionEdit("basicInfo")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name *</Label>
                <Input
                  id="branchName"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="Downtown Branch"
                  disabled={mode === "edit" && editingSection !== "basicInfo"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchPhone">Phone Number *</Label>
                <div className="flex gap-2">
                  <Select value={branchPhoneCountry} onValueChange={setBranchPhoneCountry} disabled={mode === "edit" && editingSection !== "basicInfo"}>
                    <SelectTrigger className="w-40">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span>{countryCodes.find(c => c.id === branchPhoneCountry)?.flag}</span>
                          <span>{countryCodes.find(c => c.id === branchPhoneCountry)?.code}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          <div className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                            <span className="text-muted-foreground text-xs">{country.country}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="branchPhone"
                    value={branchPhone}
                    onChange={(e) => setBranchPhone(e.target.value)}
                    placeholder="555-0123"
                    className="flex-1"
                    disabled={mode === "edit" && editingSection !== "basicInfo"}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="branchEmail">Email Address *</Label>
              <Input
                id="branchEmail"
                type="email"
                value={branchEmail}
                onChange={(e) => setBranchEmail(e.target.value)}
                placeholder="branch@yourcompany.com"
                disabled={mode === "edit" && editingSection !== "basicInfo"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this branch location"
                rows={3}
                disabled={mode === "edit" && editingSection !== "basicInfo"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalStaff">Total Staff</Label>
                <Input
                  id="totalStaff"
                  type="number"
                  min="1"
                  value={totalStaff}
                  onChange={(e) => setTotalStaff(parseInt(e.target.value) || 1)}
                  disabled={mode === "edit" && editingSection !== "basicInfo"}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="isActive">Branch Active</Label>
                <Switch
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  disabled={mode === "edit" && editingSection !== "basicInfo"}
                />
              </div>
            </div>

            {/* Operating Hours Section */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Clock className="text-primary" size={16} />
                <Label className="text-base font-medium">Branch Operating Hours</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Set the general operating hours for this branch. Individual business modules can have their own specific hours.
              </p>
              <div className="space-y-2">
                {operatingHours.map((dayHours, index) => (
                  <div key={dayHours.day} className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                    <Checkbox
                      checked={dayHours.isOpen}
                      onCheckedChange={(checked) => {
                        const newHours = [...operatingHours];
                        newHours[index] = { ...newHours[index], isOpen: !!checked };
                        setOperatingHours(newHours);
                      }}
                      disabled={mode === "edit" && editingSection !== "basicInfo" && editingSection !== "all"}
                    />
                    <span className="w-28 text-sm font-medium">{dayHours.day}</span>
                    {dayHours.isOpen ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Select
                          value={dayHours.openTime}
                          onValueChange={(value) => {
                            const newHours = [...operatingHours];
                            newHours[index] = { ...newHours[index], openTime: value };
                            setOperatingHours(newHours);
                          }}
                          disabled={mode === "edit" && editingSection !== "basicInfo" && editingSection !== "all"}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Open Time" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((time) => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="text-muted-foreground">-</span>
                        <Select
                          value={dayHours.closeTime}
                          onValueChange={(value) => {
                            const newHours = [...operatingHours];
                            newHours[index] = { ...newHours[index], closeTime: value };
                            setOperatingHours(newHours);
                          }}
                          disabled={mode === "edit" && editingSection !== "basicInfo" && editingSection !== "all"}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Close Time" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((time) => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Closed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          </Card>
        </TabsContent>

        {/* Branch Address Tab */}
        <TabsContent value="address" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Branch Address</CardTitle>
                <CardDescription>Enter the complete address for this branch location</CardDescription>
              </div>
              <div className="flex gap-2">
                {editingSection === "branchAddress" ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleSectionCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleSectionSave("branchAddress")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => handleSectionEdit("branchAddress")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select value={country} onValueChange={setCountry} disabled={editingSection !== "branchAddress"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter postal code"
                  disabled={editingSection !== "branchAddress"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="New York"
                  disabled={editingSection !== "branchAddress"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="New York City"
                  disabled={editingSection !== "branchAddress"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="123 Main Street"
                  disabled={editingSection !== "branchAddress"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="building">Suite / Building (Optional)</Label>
                <Input
                  id="building"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  placeholder="Suite 100"
                  disabled={editingSection !== "branchAddress"}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Map location will be automatically determined from this address</span>
            </div>
          </CardContent>
          </Card>
        </TabsContent>

        {/* Operating Hours Tab - Combines Business Modules & Working Hours */}
        <TabsContent value="operating-hours" className="space-y-4">
          {/* Business Modules Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Business Modules</CardTitle>
                <CardDescription>Enable and configure business modules for this branch</CardDescription>
              </div>
              <div className="flex gap-2">
                {editingSection === "operatingHours" ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleSectionCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleSectionSave("operatingHours")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => handleSectionEdit("operatingHours")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <SimpleBusinessModuleSelector
                selectedModules={businessModules}
                onModulesChange={setBusinessModules}
              />
            </CardContent>
          </Card>

          {/* Working Hours & Capacity Planning Section */}
          {businessModules.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Weekday Operating Hours & Capacity planning</CardTitle>
                <CardDescription>Set the operating schedule and capacity for each business module</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <WorkingHoursCapacity 
                  selectedModules={businessModules}
                  disabled={mode === "edit" && editingSection !== "operatingHours" && editingSection !== "all"}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      </div>
    </DndProvider>
  );
}