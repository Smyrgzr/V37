"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Plus, Edit, Trash2, MapPin, Clock, Phone, Users, UserPlus, Mail, Shield } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { BusinessModule } from "../modules/BusinessModuleSelector";
import { Car, Zap, Wrench, Truck, Users as UsersIcon, ChevronDown, CheckCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../ui/utils";

interface OperatingHours {
  [key: string]: {
    isOpen: boolean;
    openTime: string;
    closeTime: string;
  };
}

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  email: string;
  description: string;
  isActive: boolean;
  operatingHours: OperatingHours;
  totalStaff: number;
  servicesCount: number;
  packagesCount: number;
  createdDate: string;
  businessModules?: BusinessModule[];
}

interface BranchAdmin {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchId: string;
  branchName: string;
  centerName: string;
  centerAdminId: string;
  isActive: boolean;
  createdDate: string;
  address: string;
  city: string;
  district: string;
  emergencyContact: string;
  experience: string;
  notes: string;
}

interface BranchManagementProps {
  branches: Branch[];
  branchAdmins?: BranchAdmin[]; // Made optional since branch admin role is being removed
  onAddBranch: (branch: Omit<Branch, 'id' | 'createdDate'>) => void;
  onEditBranch: (id: string, branch: Partial<Branch>) => void;
  onDeleteBranch: (id: string) => void;
  onToggleBranchStatus: (id: string) => void;
  onAddBranchAdmin?: (admin: Omit<BranchAdmin, 'id' | 'createdDate'>) => void;
  onEditBranchAdmin?: (adminId: string, updates: Partial<BranchAdmin>) => void;
  onDeleteBranchAdmin?: (adminId: string) => void;
  onToggleBranchAdminStatus?: (adminId: string) => void;
  onNavigate: (page: string) => void;
  centerName?: string;
  centerAdminId?: string;
  selectedBranchFilter?: string;
  onBranchFilterChange?: (branchId: string) => void;
}

export function BranchManagement({
  branches,
  branchAdmins = [], // Default to empty array
  onAddBranch,
  onEditBranch,
  onDeleteBranch,
  onToggleBranchStatus,
  onAddBranchAdmin,
  onEditBranchAdmin,
  onDeleteBranchAdmin,
  onToggleBranchAdminStatus,
  onNavigate,
  centerName = "Your Center",
  centerAdminId = "center1",
  selectedBranchFilter = "all",
  onBranchFilterChange,
}: BranchManagementProps) {
  const [showBranchSelector, setShowBranchSelector] = useState(false);
  // Branch Admin Management State
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<BranchAdmin | null>(null);

  // Branch Admin Form State
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    phone: "",
    branchId: "",
    address: "",
    city: "",
    district: "",
    emergencyContact: "",
    experience: "",
    notes: "",
    isActive: true,
  });

  const getModuleIcon = (moduleId: BusinessModule) => {
    const icons = {
      in_bay: Car,
      tunnel: Zap,
      self_service: Wrench,
      mobile: Truck,
      manual_detailing: UsersIcon,
    };
    return icons[moduleId];
  };

  const getModuleLabel = (moduleId: BusinessModule) => {
    const labels = {
      in_bay: "In-Bay",
      tunnel: "Tunnel",
      self_service: "Self-Service",
      mobile: "Mobile",
      manual_detailing: "Manual",
    };
    return labels[moduleId];
  };

  const getModuleColor = (moduleId: BusinessModule) => {
    const colors = {
      in_bay: "bg-blue-100 text-blue-700 border-blue-200",
      tunnel: "bg-purple-100 text-purple-700 border-purple-200",
      self_service: "bg-green-100 text-green-700 border-green-200",
      mobile: "bg-orange-100 text-orange-700 border-orange-200",
      manual_detailing: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[moduleId];
  };

  const resetAdminForm = () => {
    setAdminForm({
      name: "",
      email: "",
      phone: "",
      branchId: "",
      address: "",
      city: "",
      district: "",
      emergencyContact: "",
      experience: "",
      notes: "",
      isActive: true,
    });
    setEditingAdmin(null);
  };

  const handleAddAdmin = () => {
    const selectedBranch = branches.find(b => b.id === adminForm.branchId);
    
    const adminData = {
      ...adminForm,
      branchName: selectedBranch?.name || "",
      centerName,
      centerAdminId,
    };
    
    onAddBranchAdmin?.(adminData);
    resetAdminForm();
    setIsAddAdminDialogOpen(false);
    toast.success("Branch administrator added successfully");
  };

  const handleEditAdmin = () => {
    if (editingAdmin) {
      onEditBranchAdmin?.(editingAdmin.id, adminForm);
      resetAdminForm();
      setIsAddAdminDialogOpen(false);
      toast.success("Branch administrator updated successfully");
    }
  };

  const formatOperatingHours = (hours: OperatingHours) => {
    const openDays = Object.entries(hours).filter(([_, data]) => data.isOpen);
    if (openDays.length === 0) return "Closed";
    
    const firstDay = openDays[0];
    const allSameHours = openDays.every(([_, data]) => 
      data.openTime === firstDay[1].openTime && data.closeTime === firstDay[1].closeTime
    );
    
    if (allSameHours && openDays.length === 7) {
      return `Daily ${firstDay[1].openTime} - ${firstDay[1].closeTime}`;
    } else if (allSameHours && openDays.length === 6) {
      const closedDay = Object.entries(hours).find(([_, data]) => !data.isOpen);
      return `${firstDay[1].openTime} - ${firstDay[1].closeTime} (Closed ${closedDay?.[0]})`;
    }
    
    return "Variable hours";
  };

  return (
    <div className="space-y-6">
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
                : branches.find(b => b.id === selectedBranchFilter)?.name || "Branch"}
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

      {/* Mobile: Page Title */}
      <div className="md:hidden">
        <h1 className="text-xl font-semibold text-neutral-900">Branches</h1>
        <p className="text-sm text-neutral-600 mt-0.5">Manage branch locations</p>
      </div>

      <Tabs defaultValue="branches" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="branches">Branch Locations</TabsTrigger>
          <TabsTrigger value="admins">Branch Administrators</TabsTrigger>
        </TabsList>
        
        {/* Branch Locations Tab */}
        <TabsContent value="branches" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Branch Locations</h3>
              <p className="text-muted-foreground">Manage your carwash center branch locations</p>
            </div>
            <Button onClick={() => onNavigate("add-branch")}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Branch
            </Button>
          </div>

          {/* Branch Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{branches.length}</div>
                <p className="text-xs text-muted-foreground">Total Branches</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{branches.filter(b => b.isActive).length}</div>
                <p className="text-xs text-muted-foreground">Active Branches</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{branches.reduce((sum, b) => sum + b.totalStaff, 0)}</div>
                <p className="text-xs text-muted-foreground">Total Staff</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{branches.reduce((sum, b) => sum + b.servicesCount, 0)}</div>
                <p className="text-xs text-muted-foreground">Total Services</p>
              </CardContent>
            </Card>
          </div>

          {/* Branches Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Branches</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Branch Name</TableHead>
                    <TableHead>Business Modules</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{branch.name}</div>
                          <div className="text-sm text-muted-foreground">{branch.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {branch.businessModules && branch.businessModules.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {branch.businessModules.map((moduleId) => {
                              const Icon = getModuleIcon(moduleId);
                              return (
                                <Badge
                                  key={moduleId}
                                  variant="outline"
                                  className={`text-xs ${getModuleColor(moduleId)} flex items-center gap-1 px-2 py-0.5`}
                                >
                                  <Icon size={12} />
                                  {getModuleLabel(moduleId)}
                                </Badge>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">No modules</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm">{branch.address}</div>
                            <div className="text-xs text-muted-foreground">{branch.city}, {branch.district}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span className="text-sm">{branch.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground">{branch.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{branch.totalStaff}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={branch.isActive ? "default" : "secondary"}>
                          {branch.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => onNavigate(`edit-branch/${branch.id}`)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => onToggleBranchStatus(branch.id)}
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => onDeleteBranch(branch.id)}>
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

        {/* Branch Administrators Tab */}
        <TabsContent value="admins" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Branch Administrators</h3>
              <p className="text-muted-foreground">Manage administrators for your branch locations</p>
            </div>
            <Dialog open={isAddAdminDialogOpen} onOpenChange={setIsAddAdminDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetAdminForm}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Administrator
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingAdmin ? "Edit Branch Administrator" : "Add New Branch Administrator"}</DialogTitle>
                  <DialogDescription>
                    {editingAdmin 
                      ? "Update the administrator's information and branch assignment." 
                      : "Create a new administrator and assign them to a branch location."
                    }
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Administrator Information</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="adminName">Full Name</Label>
                        <Input
                          id="adminName"
                          value={adminForm.name}
                          onChange={(e) => setAdminForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminEmail">Email Address</Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          value={adminForm.email}
                          onChange={(e) => setAdminForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="adminPhone">Phone Number</Label>
                        <Input
                          id="adminPhone"
                          value={adminForm.phone}
                          onChange={(e) => setAdminForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1-555-0123"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminBranch">Assigned Branch</Label>
                        <Select 
                          value={adminForm.branchId} 
                          onValueChange={(value) => setAdminForm(prev => ({ ...prev, branchId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select branch" />
                          </SelectTrigger>
                          <SelectContent>
                            {branches.filter(b => b.isActive).map((branch) => (
                              <SelectItem key={branch.id} value={branch.id}>
                                {branch.name} - {branch.city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="adminAddress">Address</Label>
                        <Input
                          id="adminAddress"
                          value={adminForm.address}
                          onChange={(e) => setAdminForm(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminCity">City</Label>
                        <Input
                          id="adminCity"
                          value={adminForm.city}
                          onChange={(e) => setAdminForm(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="New York"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminDistrict">District</Label>
                        <Input
                          id="adminDistrict"
                          value={adminForm.district}
                          onChange={(e) => setAdminForm(prev => ({ ...prev, district: e.target.value }))}
                          placeholder="Manhattan"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={adminForm.emergencyContact}
                        onChange={(e) => setAdminForm(prev => ({ ...prev, emergencyContact: e.target.value }))}
                        placeholder="+1-555-9999"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience & Qualifications</Label>
                      <Textarea
                        id="experience"
                        value={adminForm.experience}
                        onChange={(e) => setAdminForm(prev => ({ ...prev, experience: e.target.value }))}
                        placeholder="Previous experience in management, certifications, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        value={adminForm.notes}
                        onChange={(e) => setAdminForm(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Any additional information about this administrator"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="adminActive">Administrator Active</Label>
                      <Switch
                        id="adminActive"
                        checked={adminForm.isActive}
                        onCheckedChange={(checked) => setAdminForm(prev => ({ ...prev, isActive: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsAddAdminDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={editingAdmin ? handleEditAdmin : handleAddAdmin}>
                    {editingAdmin ? "Update Administrator" : "Create Branch Administrator"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Branch Admin Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{branchAdmins.length}</div>
                <p className="text-xs text-muted-foreground">Total Branch Admins</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{branchAdmins.filter(a => a.isActive).length}</div>
                <p className="text-xs text-muted-foreground">Active Admins</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{branches.filter(b => branchAdmins.some(a => a.branchId === b.id && a.isActive)).length}</div>
                <p className="text-xs text-muted-foreground">Branches Covered</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{branches.filter(b => !branchAdmins.some(a => a.branchId === b.id && a.isActive)).length}</div>
                <p className="text-xs text-muted-foreground">Needs Admin</p>
              </CardContent>
            </Card>
          </div>

          {/* Branch Admins Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Branch Administrators</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Administrator</TableHead>
                    <TableHead>Branch Assignment</TableHead>
                    <TableHead>Contact Information</TableHead>
                    <TableHead>Emergency Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branchAdmins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{admin.name}</div>
                          <div className="text-sm text-muted-foreground">{admin.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{admin.branchName}</div>
                          <div className="text-sm text-muted-foreground">{admin.city}, {admin.district}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span className="text-sm">{admin.phone}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{admin.address}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{admin.emergencyContact}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={admin.isActive ? "default" : "secondary"}>
                          {admin.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setEditingAdmin(admin);
                              setAdminForm({
                                name: admin.name,
                                email: admin.email,
                                phone: admin.phone,
                                branchId: admin.branchId,
                                address: admin.address,
                                city: admin.city,
                                district: admin.district,
                                emergencyContact: admin.emergencyContact,
                                experience: admin.experience,
                                notes: admin.notes,
                                isActive: admin.isActive,
                              });
                              setIsAddAdminDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => onToggleBranchAdminStatus?.(admin.id)}
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => onDeleteBranchAdmin?.(admin.id)}
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