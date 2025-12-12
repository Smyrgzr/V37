"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Calendar, Clock, User, Phone, Mail, Car, MapPin, Package } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { BusinessModule } from "../modules/BusinessModuleSelector";
import { CarTypeSelector } from "../ui/car-type-selector";
import { CarType, calculatePriceForCarType, calculateDurationForCarType } from "../../types/vehicle";

interface AddBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branches: any[];
  selectedBranchId?: string;
  selectedModule?: BusinessModule;
  onAddBooking: (booking: any) => void;
}

export function AddBookingDialog({
  open,
  onOpenChange,
  branches,
  selectedBranchId,
  selectedModule,
  onAddBooking,
}: AddBookingDialogProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    vehicleModel: "",
    licensePlate: "",
    carType: "sedan" as CarType,
    branchId: selectedBranchId || "",
    module: selectedModule || "",
    service: "",
    date: "",
    time: "",
    duration: "30",
    notes: "",
  });

  const handleSubmit = () => {
    // Validation
    if (!formData.customerName || !formData.phone || !formData.branchId || !formData.module || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Base service price (you can make this dynamic based on service selection)
    const basePrice = 50;
    const baseDuration = parseInt(formData.duration);

    const newBooking = {
      id: `booking-${Date.now()}`,
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      vehicleModel: formData.vehicleModel,
      licensePlate: formData.licensePlate,
      carType: formData.carType,
      branchId: formData.branchId,
      module: formData.module,
      service: formData.service || "Standard Wash",
      date: formData.date,
      time: formData.time,
      duration: calculateDurationForCarType(baseDuration, formData.carType),
      price: calculatePriceForCarType(basePrice, formData.carType),
      status: "confirmed",
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };

    onAddBooking(newBooking);
    toast.success(`Booking created! Price: $${newBooking.price} (${formData.carType})`);
    
    // Reset form
    setFormData({
      customerName: "",
      email: "",
      phone: "",
      vehicleModel: "",
      licensePlate: "",
      carType: "sedan" as CarType,
      branchId: selectedBranchId || "",
      module: selectedModule || "",
      service: "",
      date: "",
      time: "",
      duration: "30",
      notes: "",
    });
    
    onOpenChange(false);
  };

  const selectedBranch = branches.find(b => b.id === formData.branchId);
  const availableModules = selectedBranch?.businessModules || [];

  // Service options based on module
  const getServiceOptions = (module: string) => {
    const services: Record<string, string[]> = {
      in_bay: ["Express Wash", "Premium Wash", "Full Service"],
      tunnel: ["Quick Tunnel", "Premium Tunnel", "Ultimate Shine"],
      self_service: ["Self-Wash Bay 1", "Self-Wash Bay 2", "Self-Wash Bay 3"],
      manual_detailing: ["Interior Detail", "Exterior Detail", "Full Detail"],
      mobile: ["Mobile Basic", "Mobile Premium", "Mobile VIP"],
      mobile_detailing: ["Mobile Interior", "Mobile Exterior", "Mobile Complete"],
      pickup_dropoff_detailing: ["Pickup Basic", "Pickup Premium", "Pickup Ultimate"],
    };
    return services[module] || ["Standard Wash"];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Booking</DialogTitle>
          <DialogDescription>
            Create a new booking for a customer. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
              <User size={16} />
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  placeholder="John Doe"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
              <Car size={16} />
              Vehicle Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleModel">Vehicle Model</Label>
                <Input
                  id="vehicleModel"
                  placeholder="Tesla Model 3"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licensePlate">License Plate</Label>
                <Input
                  id="licensePlate"
                  placeholder="ABC 1234"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="carType">Car Type</Label>
              <CarTypeSelector
                value={formData.carType}
                onChange={(value) => setFormData({ ...formData, carType: value })}
                showPriceMultiplier={true}
              />
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
              <MapPin size={16} />
              Booking Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branch">Branch *</Label>
                <Select
                  value={formData.branchId}
                  onValueChange={(value) => setFormData({ ...formData, branchId: value, module: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name} - {branch.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="module">Business Module *</Label>
                <Select
                  value={formData.module}
                  onValueChange={(value) => setFormData({ ...formData, module: value, service: "" })}
                  disabled={!formData.branchId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModules.map((module: string) => (
                      <SelectItem key={module} value={module}>
                        {module.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => setFormData({ ...formData, service: value })}
                disabled={!formData.module}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {getServiceOptions(formData.module).map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
              <Calendar size={16} />
              Schedule
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (min)</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any special instructions or notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}