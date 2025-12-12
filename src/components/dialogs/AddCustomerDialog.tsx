"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { User, Building2, Mail, Phone, Car, Calendar, Briefcase, Users } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { CarTypeSelector } from "../ui/car-type-selector";
import { CarType } from "../../types/vehicle";

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCustomer: (customer: any, type: "b2b" | "b2c") => void;
}

export function AddCustomerDialog({
  open,
  onOpenChange,
  onAddCustomer,
}: AddCustomerDialogProps) {
  const [customerType, setCustomerType] = useState<"b2b" | "b2c">("b2c");
  
  // B2C Form Data
  const [b2cForm, setB2cForm] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: "",
    licensePlate: "",
    carType: "sedan" as CarType,
    membershipTier: "bronze",
    preferredServices: "",
    notes: "",
  });

  // B2B Form Data
  const [b2bForm, setB2bForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    fleetSize: "",
    contractType: "monthly",
    accountManager: "",
    discountTier: "5",
    notes: "",
  });

  const handleB2CSubmit = () => {
    if (!b2cForm.name || !b2cForm.phone) {
      toast.error("Please fill in required fields (Name, Phone)");
      return;
    }

    const newCustomer = {
      id: `b2c-${Date.now()}`,
      name: b2cForm.name,
      email: b2cForm.email,
      phone: b2cForm.phone,
      carModel: b2cForm.carModel || "Not specified",
      licensePlate: b2cForm.licensePlate || "N/A",
      totalBookings: 0,
      totalSpent: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      lifecycle: "prospect",
      loyaltyPoints: 0,
      membershipTier: b2cForm.membershipTier,
      registeredDate: new Date().toISOString().split('T')[0],
      preferredServices: b2cForm.preferredServices ? b2cForm.preferredServices.split(',').map(s => s.trim()) : [],
    };

    onAddCustomer(newCustomer, "b2c");
    toast.success("B2C Customer added successfully!");
    resetB2CForm();
    onOpenChange(false);
  };

  const handleB2BSubmit = () => {
    if (!b2bForm.companyName || !b2bForm.contactPerson || !b2bForm.phone || !b2bForm.fleetSize) {
      toast.error("Please fill in required fields");
      return;
    }

    const newCustomer = {
      id: `b2b-${Date.now()}`,
      companyName: b2bForm.companyName,
      contactPerson: b2bForm.contactPerson,
      email: b2bForm.email,
      phone: b2bForm.phone,
      fleetSize: parseInt(b2bForm.fleetSize),
      contractType: b2bForm.contractType,
      contractStatus: "active",
      contractRenewalDate: getContractRenewalDate(b2bForm.contractType),
      monthlyRevenue: 0,
      totalRevenue: 0,
      lastServiceDate: new Date().toISOString().split('T')[0],
      lifecycle: "prospect",
      accountManager: b2bForm.accountManager || "Unassigned",
      discountTier: parseInt(b2bForm.discountTier),
    };

    onAddCustomer(newCustomer, "b2b");
    toast.success("B2B Customer added successfully!");
    resetB2BForm();
    onOpenChange(false);
  };

  const getContractRenewalDate = (contractType: string) => {
    const today = new Date();
    switch (contractType) {
      case "monthly":
        today.setMonth(today.getMonth() + 1);
        break;
      case "quarterly":
        today.setMonth(today.getMonth() + 3);
        break;
      case "annual":
        today.setFullYear(today.getFullYear() + 1);
        break;
    }
    return today.toISOString().split('T')[0];
  };

  const resetB2CForm = () => {
    setB2cForm({
      name: "",
      email: "",
      phone: "",
      carModel: "",
      licensePlate: "",
      carType: "sedan" as CarType,
      membershipTier: "bronze",
      preferredServices: "",
      notes: "",
    });
  };

  const resetB2BForm = () => {
    setB2bForm({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      fleetSize: "",
      contractType: "monthly",
      accountManager: "",
      discountTier: "5",
      notes: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Create a new B2C individual customer or B2B fleet client.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={customerType} onValueChange={(v) => setCustomerType(v as "b2b" | "b2c")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="b2c" className="flex items-center gap-2">
              <User size={14} />
              B2C Individual
            </TabsTrigger>
            <TabsTrigger value="b2b" className="flex items-center gap-2">
              <Building2 size={14} />
              B2B Fleet
            </TabsTrigger>
          </TabsList>

          {/* B2C Form */}
          <TabsContent value="b2c" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <User size={16} />
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="b2c-name">Full Name *</Label>
                  <Input
                    id="b2c-name"
                    placeholder="John Smith"
                    value={b2cForm.name}
                    onChange={(e) => setB2cForm({ ...b2cForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="b2c-phone">Phone Number *</Label>
                  <Input
                    id="b2c-phone"
                    placeholder="+1 (555) 123-4567"
                    value={b2cForm.phone}
                    onChange={(e) => setB2cForm({ ...b2cForm, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="b2c-email">Email</Label>
                <Input
                  id="b2c-email"
                  type="email"
                  placeholder="john.smith@email.com"
                  value={b2cForm.email}
                  onChange={(e) => setB2cForm({ ...b2cForm, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Car size={16} />
                Vehicle Information
              </h3>
              
              <CarTypeSelector
                value={b2cForm.carType}
                onChange={(value) => setB2cForm({ ...b2cForm, carType: value })}
                showPriceMultiplier={true}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="b2c-car">Car Model/Brand</Label>
                  <Input
                    id="b2c-car"
                    placeholder="Tesla Model 3, BMW X5, etc."
                    value={b2cForm.carModel}
                    onChange={(e) => setB2cForm({ ...b2cForm, carModel: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="b2c-plate">License Plate</Label>
                  <Input
                    id="b2c-plate"
                    placeholder="ABC 1234"
                    value={b2cForm.licensePlate}
                    onChange={(e) => setB2cForm({ ...b2cForm, licensePlate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Membership & Preferences</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="b2c-tier">Membership Tier</Label>
                  <Select
                    value={b2cForm.membershipTier}
                    onValueChange={(value) => setB2cForm({ ...b2cForm, membershipTier: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="b2c-services">Preferred Services</Label>
                  <Input
                    id="b2c-services"
                    placeholder="Premium Wash, Interior Clean"
                    value={b2cForm.preferredServices}
                    onChange={(e) => setB2cForm({ ...b2cForm, preferredServices: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="b2c-notes">Notes</Label>
              <Textarea
                id="b2c-notes"
                placeholder="Additional information..."
                value={b2cForm.notes}
                onChange={(e) => setB2cForm({ ...b2cForm, notes: e.target.value })}
                rows={3}
              />
            </div>
          </TabsContent>

          {/* B2B Form */}
          <TabsContent value="b2b" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Building2 size={16} />
                Company Information
              </h3>
              <div className="space-y-2">
                <Label htmlFor="b2b-company">Company Name *</Label>
                <Input
                  id="b2b-company"
                  placeholder="Acme Logistics Inc"
                  value={b2bForm.companyName}
                  onChange={(e) => setB2bForm({ ...b2bForm, companyName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="b2b-contact">Contact Person *</Label>
                  <Input
                    id="b2b-contact"
                    placeholder="John Doe"
                    value={b2bForm.contactPerson}
                    onChange={(e) => setB2bForm({ ...b2bForm, contactPerson: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="b2b-phone">Phone Number *</Label>
                  <Input
                    id="b2b-phone"
                    placeholder="+1 (555) 123-4567"
                    value={b2bForm.phone}
                    onChange={(e) => setB2bForm({ ...b2bForm, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="b2b-email">Email</Label>
                <Input
                  id="b2b-email"
                  type="email"
                  placeholder="contact@acme.com"
                  value={b2bForm.email}
                  onChange={(e) => setB2bForm({ ...b2bForm, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Briefcase size={16} />
                Fleet & Contract Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="b2b-fleet">Fleet Size *</Label>
                  <Input
                    id="b2b-fleet"
                    type="number"
                    placeholder="25"
                    value={b2bForm.fleetSize}
                    onChange={(e) => setB2bForm({ ...b2bForm, fleetSize: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="b2b-contract">Contract Type</Label>
                  <Select
                    value={b2bForm.contractType}
                    onValueChange={(value) => setB2bForm({ ...b2bForm, contractType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="b2b-manager">Account Manager</Label>
                  <Input
                    id="b2b-manager"
                    placeholder="Sarah Chen"
                    value={b2bForm.accountManager}
                    onChange={(e) => setB2bForm({ ...b2bForm, accountManager: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="b2b-discount">Discount Tier (%)</Label>
                  <Select
                    value={b2bForm.discountTier}
                    onValueChange={(value) => setB2bForm({ ...b2bForm, discountTier: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="15">15%</SelectItem>
                      <SelectItem value="20">20%</SelectItem>
                      <SelectItem value="25">25%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="b2b-notes">Notes</Label>
              <Textarea
                id="b2b-notes"
                placeholder="Additional information..."
                value={b2bForm.notes}
                onChange={(e) => setB2bForm({ ...b2bForm, notes: e.target.value })}
                rows={3}
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={customerType === "b2c" ? handleB2CSubmit : handleB2BSubmit}>
            Add {customerType === "b2c" ? "B2C" : "B2B"} Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}