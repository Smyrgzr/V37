/**
 * RESERVATION REQUEST FORM
 * =========================
 * 
 * Comprehensive form for creating new manual detailing reservations
 * Supports: customer info, vehicle details, service selection, time booking
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { cn } from "../ui/utils";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Car,
  CreditCard,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Sparkles,
  DollarSign,
} from "lucide-react";
import { motion } from "motion/react";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  popular?: boolean;
}

interface ReservationRequestFormProps {
  stationId?: string;
  stationName?: string;
  preselectedDate?: string;
  preselectedTime?: string;
  services: Service[];
  onSubmit: (data: ReservationFormData) => void;
  onCancel: () => void;
}

export interface ReservationFormData {
  // Customer Info
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  
  // Vehicle Info
  vehicleBrand: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleColor?: string;
  
  // Reservation Details
  stationId: string;
  serviceId: string;
  scheduledDate: string;
  scheduledStartTime: string;
  
  // Additional
  notes?: string;
  photos?: string[];
}

const POPULAR_SERVICES: Service[] = [
  {
    id: "premium-detail",
    name: "Premium Detail",
    description: "Complete interior & exterior detailing",
    duration: 180,
    price: 299.99,
    popular: true,
  },
  {
    id: "express-detail",
    name: "Express Detail",
    description: "Quick but thorough detailing",
    duration: 120,
    price: 199.99,
  },
  {
    id: "interior-deep-clean",
    name: "Interior Deep Clean",
    description: "Deep cleaning of all interior surfaces",
    duration: 150,
    price: 179.99,
  },
  {
    id: "paint-correction",
    name: "Paint Correction",
    description: "Remove scratches and restore paint",
    duration: 240,
    price: 399.99,
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    description: "Premium ceramic coating protection",
    duration: 300,
    price: 599.99,
    popular: true,
  },
];

export function ReservationRequestForm({
  stationId = "",
  stationName = "Manual Detail Station",
  preselectedDate,
  preselectedTime,
  services = POPULAR_SERVICES,
  onSubmit,
  onCancel,
}: ReservationRequestFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Form state
  const [formData, setFormData] = useState<Partial<ReservationFormData>>({
    stationId,
    scheduledDate: preselectedDate || "",
    scheduledStartTime: preselectedTime || "",
  });

  const [selectedService, setSelectedService] = useState<Service | null>(
    preselectedTime ? services.find(s => s.popular) || services[0] : null
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form field
  const updateField = (field: keyof ReservationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validation
  const validateStep = (stepNum: 1 | 2 | 3): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNum === 1) {
      if (!formData.customerName?.trim()) {
        newErrors.customerName = "Name is required";
      }
      if (!formData.customerPhone?.trim()) {
        newErrors.customerPhone = "Phone is required";
      } else if (!/^\+?[\d\s-()]+$/.test(formData.customerPhone)) {
        newErrors.customerPhone = "Invalid phone format";
      }
      if (!formData.customerEmail?.trim()) {
        newErrors.customerEmail = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
        newErrors.customerEmail = "Invalid email format";
      }
    }

    if (stepNum === 2) {
      if (!formData.vehicleBrand?.trim()) {
        newErrors.vehicleBrand = "Brand is required";
      }
      if (!formData.vehicleModel?.trim()) {
        newErrors.vehicleModel = "Model is required";
      }
      if (!formData.vehiclePlate?.trim()) {
        newErrors.vehiclePlate = "Plate is required";
      }
    }

    if (stepNum === 3) {
      if (!selectedService) {
        newErrors.service = "Please select a service";
      }
      if (!formData.scheduledDate) {
        newErrors.scheduledDate = "Date is required";
      }
      if (!formData.scheduledStartTime) {
        newErrors.scheduledStartTime = "Time is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(3, prev + 1) as 1 | 2 | 3);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1) as 1 | 2 | 3);
  };

  const handleSubmit = () => {
    if (!validateStep(3) || !selectedService) return;

    const completeData: ReservationFormData = {
      customerName: formData.customerName!,
      customerPhone: formData.customerPhone!,
      customerEmail: formData.customerEmail!,
      vehicleBrand: formData.vehicleBrand!,
      vehicleModel: formData.vehicleModel!,
      vehiclePlate: formData.vehiclePlate!,
      vehicleColor: formData.vehicleColor,
      stationId: formData.stationId!,
      serviceId: selectedService.id,
      scheduledDate: formData.scheduledDate!,
      scheduledStartTime: formData.scheduledStartTime!,
      notes: formData.notes,
    };

    onSubmit(completeData);
  };

  const estimatedEndTime = selectedService
    ? calculateEndTime(formData.scheduledStartTime || "", selectedService.duration)
    : "";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={cn(
                "size-10 rounded-full flex items-center justify-center font-semibold transition-all",
                step >= s
                  ? "bg-blue-500 text-white ring-4 ring-blue-100"
                  : "bg-neutral-200 text-neutral-500"
              )}
            >
              {step > s ? <CheckCircle size={20} /> : s}
            </div>
            {s < 3 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 transition-all",
                  step > s ? "bg-blue-500" : "bg-neutral-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 text-sm">
        <span className={step === 1 ? "font-semibold text-blue-600" : "text-neutral-500"}>
          Customer Info
        </span>
        <span className={step === 2 ? "font-semibold text-blue-600" : "text-neutral-500"}>
          Vehicle Details
        </span>
        <span className={step === 3 ? "font-semibold text-blue-600" : "text-neutral-500"}>
          Service & Time
        </span>
      </div>

      <Separator />

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && <><User size={20} /> Customer Information</>}
              {step === 2 && <><Car size={20} /> Vehicle Details</>}
              {step === 3 && <><Calendar size={20} /> Service & Scheduling</>}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Please provide your contact information"}
              {step === 2 && "Tell us about your vehicle"}
              {step === 3 && "Choose service and preferred time"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* STEP 1: Customer Info */}
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    placeholder="John Doe"
                    value={formData.customerName || ""}
                    onChange={(e) => updateField("customerName", e.target.value)}
                    className={errors.customerName ? "border-red-500" : ""}
                  />
                  {errors.customerName && (
                    <p className="text-xs text-red-500">{errors.customerName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Phone Number *</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      placeholder="+1 555-0123"
                      value={formData.customerPhone || ""}
                      onChange={(e) => updateField("customerPhone", e.target.value)}
                      className={errors.customerPhone ? "border-red-500" : ""}
                    />
                    {errors.customerPhone && (
                      <p className="text-xs text-red-500">{errors.customerPhone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email Address *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.customerEmail || ""}
                      onChange={(e) => updateField("customerEmail", e.target.value)}
                      className={errors.customerEmail ? "border-red-500" : ""}
                    />
                    {errors.customerEmail && (
                      <p className="text-xs text-red-500">{errors.customerEmail}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* STEP 2: Vehicle Details */}
            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleBrand">Brand *</Label>
                    <Input
                      id="vehicleBrand"
                      placeholder="Tesla"
                      value={formData.vehicleBrand || ""}
                      onChange={(e) => updateField("vehicleBrand", e.target.value)}
                      className={errors.vehicleBrand ? "border-red-500" : ""}
                    />
                    {errors.vehicleBrand && (
                      <p className="text-xs text-red-500">{errors.vehicleBrand}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleModel">Model *</Label>
                    <Input
                      id="vehicleModel"
                      placeholder="Model 3"
                      value={formData.vehicleModel || ""}
                      onChange={(e) => updateField("vehicleModel", e.target.value)}
                      className={errors.vehicleModel ? "border-red-500" : ""}
                    />
                    {errors.vehicleModel && (
                      <p className="text-xs text-red-500">{errors.vehicleModel}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehiclePlate">License Plate *</Label>
                    <Input
                      id="vehiclePlate"
                      placeholder="ABC 1234"
                      value={formData.vehiclePlate || ""}
                      onChange={(e) => updateField("vehiclePlate", e.target.value)}
                      className={errors.vehiclePlate ? "border-red-500" : ""}
                    />
                    {errors.vehiclePlate && (
                      <p className="text-xs text-red-500">{errors.vehiclePlate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleColor">Color (Optional)</Label>
                    <Input
                      id="vehicleColor"
                      placeholder="Black"
                      value={formData.vehicleColor || ""}
                      onChange={(e) => updateField("vehicleColor", e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* STEP 3: Service & Scheduling */}
            {step === 3 && (
              <>
                <div className="space-y-3">
                  <Label>Select Service *</Label>
                  <div className="grid gap-3">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => {
                          setSelectedService(service);
                          updateField("serviceId", service.id);
                        }}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all text-left",
                          selectedService?.id === service.id
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                            : "border-neutral-200 hover:border-neutral-300"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{service.name}</p>
                              {service.popular && (
                                <Badge variant="default" className="text-xs">
                                  <Sparkles size={12} className="mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600 mb-2">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-neutral-600">
                                <Clock size={14} />
                                {service.duration} min
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-green-700">
                                <DollarSign size={14} />
                                ${service.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.service && (
                    <p className="text-xs text-red-500">{errors.service}</p>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduledDate">Preferred Date *</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={formData.scheduledDate || ""}
                      onChange={(e) => updateField("scheduledDate", e.target.value)}
                      className={errors.scheduledDate ? "border-red-500" : ""}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.scheduledDate && (
                      <p className="text-xs text-red-500">{errors.scheduledDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduledStartTime">Preferred Time *</Label>
                    <Input
                      id="scheduledStartTime"
                      type="time"
                      value={formData.scheduledStartTime || ""}
                      onChange={(e) => updateField("scheduledStartTime", e.target.value)}
                      className={errors.scheduledStartTime ? "border-red-500" : ""}
                    />
                    {errors.scheduledStartTime && (
                      <p className="text-xs text-red-500">{errors.scheduledStartTime}</p>
                    )}
                  </div>
                </div>

                {selectedService && formData.scheduledStartTime && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Estimated completion:</strong> {estimatedEndTime}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Total duration: {selectedService.duration} minutes
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requests or concerns about your vehicle..."
                    value={formData.notes || ""}
                    onChange={(e) => updateField("notes", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="p-3 bg-neutral-50 border rounded-lg">
                  <p className="text-xs text-neutral-600">
                    <strong>Note:</strong> Your reservation will be pending until confirmed by our team.
                    You'll receive an email/SMS once approved. Free cancellation up to 4 hours before scheduled time.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={step === 1 ? onCancel : handleBack}>
          {step === 1 ? "Cancel" : "Back"}
        </Button>

        {step < 3 ? (
          <Button onClick={handleNext}>
            Continue
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="gap-2">
            <CheckCircle size={16} />
            Submit Reservation Request
          </Button>
        )}
      </div>
    </div>
  );
}

// Helper: Calculate end time
function calculateEndTime(startTime: string, durationMinutes: number): string {
  if (!startTime) return "";
  
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  
  return `${endHours.toString().padStart(2, "0")}:${endMinutes
    .toString()
    .padStart(2, "0")}`;
}
