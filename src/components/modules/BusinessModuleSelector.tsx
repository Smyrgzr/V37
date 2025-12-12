"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import {
  Zap,
  Truck,
  Wrench,
  Car,
  Users,
  Check,
  Info,
  Settings,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";

export type BusinessModule = "in_bay" | "tunnel" | "self_service" | "mobile" | "manual_detailing";

export interface WorkingHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface ModuleConfig {
  inBay?: {
    numberOfBays: number;
    bayNames: string[];
    paymentSystem: "coin" | "token" | "card" | "app";
    automaticType: "soft-touch" | "touchless";
    workingHours?: WorkingHours[];
  };
  tunnel?: {
    tunnelSpeed: number; // cars per hour
    tunnelLength: number; // feet
    conveyorType: "chain" | "belt";
    dryingSystem: boolean;
    maxVehicleHeight: number; // inches
    workingHours?: WorkingHours[];
  };
  selfService?: {
    numberOfBays: number;
    bayEquipment: string[];
    pricingModel: "pay-per-minute" | "flat-rate";
    minuteRate?: number;
    workingHours?: WorkingHours[];
  };
  mobile?: {
    serviceAreaRadius: number; // miles
    zipCodes: string[];
    numberOfUnits: number;
    drivers: string[];
    workingHours?: WorkingHours[];
  };
  manualDetailing?: {
    detailBays: number;
    waitingArea: boolean;
    staffCapacity: number;
    specializations: string[];
    workingHours?: WorkingHours[];
  };
}

interface BusinessModuleSelectorProps {
  selectedModules: BusinessModule[];
  onModulesChange: (modules: BusinessModule[]) => void;
  moduleConfig: ModuleConfig;
  onConfigChange: (config: ModuleConfig) => void;
}

const moduleDefinitions = [
  {
    id: "in_bay" as BusinessModule,
    name: "In-Bay Automatic",
    icon: Car,
    description: "Automated self-service bays with coin/card operation",
    color: "blue",
    features: ["Soft-touch or touchless", "Multiple bays", "Self-service model", "Quick turnaround"],
    avgPrice: "$8-15",
    avgDuration: "15-25 min",
  },
  {
    id: "tunnel" as BusinessModule,
    name: "Tunnel Wash",
    icon: Zap,
    description: "High-volume conveyor wash system for express service",
    color: "purple",
    features: ["Conveyor system", "High throughput", "Package tiers", "Automated process"],
    avgPrice: "$25-40",
    avgDuration: "15-20 min",
  },
  {
    id: "self_service" as BusinessModule,
    name: "Self-Service",
    icon: Wrench,
    description: "DIY bays with wand, foam gun, and vacuum",
    color: "green",
    features: ["Customer operated", "Pay-per-minute", "Wand & foam gun", "Budget-friendly"],
    avgPrice: "$5-12",
    avgDuration: "20-30 min",
  },
  {
    id: "mobile" as BusinessModule,
    name: "Mobile Detailing",
    icon: Truck,
    description: "On-site service at customer locations",
    color: "orange",
    features: ["Travel to customer", "Premium service", "Route-based", "Appointment only"],
    avgPrice: "$80-150",
    avgDuration: "60-120 min",
  },
  {
    id: "manual_detailing" as BusinessModule,
    name: "Manual Detailing",
    icon: Users,
    description: "Full-service hand wash and interior detailing",
    color: "red",
    features: ["Hand wash", "Interior detailing", "Staff-intensive", "Premium pricing"],
    avgPrice: "$45-100",
    avgDuration: "45-90 min",
  },
];

export function BusinessModuleSelector({
  selectedModules,
  onModulesChange,
  moduleConfig,
  onConfigChange,
}: BusinessModuleSelectorProps) {
  const toggleModule = (moduleId: BusinessModule) => {
    if (selectedModules.includes(moduleId)) {
      onModulesChange(selectedModules.filter((m) => m !== moduleId));
      // Clear config for removed module
      const newConfig = { ...moduleConfig };
      delete newConfig[moduleId === "in_bay" ? "inBay" : moduleId === "manual_detailing" ? "manualDetailing" : moduleId];
      onConfigChange(newConfig);
    } else {
      onModulesChange([...selectedModules, moduleId]);
    }
  };

  const updateModuleConfig = (moduleId: BusinessModule, config: any) => {
    const configKey =
      moduleId === "in_bay"
        ? "inBay"
        : moduleId === "manual_detailing"
        ? "manualDetailing"
        : moduleId === "self_service"
        ? "selfService"
        : moduleId;

    onConfigChange({
      ...moduleConfig,
      [configKey]: config,
    });
  };

  const getColorClasses = (color: string, selected: boolean) => {
    const colors = {
      blue: selected
        ? "border-blue-500 bg-blue-50"
        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50",
      purple: selected
        ? "border-purple-500 bg-purple-50"
        : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50",
      green: selected
        ? "border-green-500 bg-green-50"
        : "border-gray-200 hover:border-green-300 hover:bg-green-50/50",
      orange: selected
        ? "border-orange-500 bg-orange-50"
        : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50",
      red: selected
        ? "border-red-500 bg-red-50"
        : "border-gray-200 hover:border-red-300 hover:bg-red-50/50",
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColorClass = (color: string) => {
    const colors = {
      blue: "text-blue-600",
      purple: "text-purple-600",
      green: "text-green-600",
      orange: "text-orange-600",
      red: "text-red-600",
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Module Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Business Modules</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose the types of car wash services your location will offer. You can select multiple modules.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduleDefinitions.map((module) => {
            const Icon = module.icon;
            const isSelected = selectedModules.includes(module.id);

            return (
              <Card
                key={module.id}
                className={`cursor-pointer transition-all border-2 ${getColorClasses(module.color, isSelected)}`}
                onClick={() => toggleModule(module.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg bg-white border ${isSelected ? `border-${module.color}-200` : "border-gray-200"}`}>
                      <Icon className={getIconColorClass(module.color)} size={24} />
                    </div>
                    {isSelected && (
                      <div className={`p-1 rounded-full bg-${module.color}-600`}>
                        <Check className="text-white" size={16} />
                      </div>
                    )}
                  </div>

                  <h4 className="font-semibold mb-1">{module.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{module.description}</p>

                  <div className="space-y-2 mb-3">
                    {module.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className={`w-1 h-1 rounded-full bg-${module.color}-600`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign size={12} />
                      {module.avgPrice}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock size={12} />
                      {module.avgDuration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedModules.length === 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
            <Info className="text-yellow-600 mt-0.5" size={16} />
            <div className="text-sm text-yellow-900">
              <strong>Please select at least one business module</strong> to continue. This helps us customize your
              dashboard and analytics.
            </div>
          </div>
        )}

        {selectedModules.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Check className="text-blue-600" size={16} />
              <strong className="text-sm text-blue-900">
                {selectedModules.length} module{selectedModules.length > 1 ? "s" : ""} selected
              </strong>
            </div>
            <p className="text-sm text-blue-900">
              Your dashboard will show {selectedModules.length === 1 ? "this module" : "these modules"} with
              module-specific analytics, revenue tracking, and operations management.
            </p>
          </div>
        )}
      </div>

      {/* Module Configuration */}
      {selectedModules.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold">Configure Selected Modules</h3>
          </div>

          {selectedModules.includes("in_bay") && (
            <InBayConfig
              config={moduleConfig.inBay || { numberOfBays: 2, bayNames: [], paymentSystem: "card", automaticType: "soft-touch" }}
              onChange={(config) => updateModuleConfig("in_bay", config)}
            />
          )}

          {selectedModules.includes("tunnel") && (
            <TunnelConfig
              config={
                moduleConfig.tunnel || {
                  tunnelSpeed: 24,
                  tunnelLength: 120,
                  conveyorType: "chain",
                  dryingSystem: true,
                  maxVehicleHeight: 84,
                }
              }
              onChange={(config) => updateModuleConfig("tunnel", config)}
            />
          )}

          {selectedModules.includes("self_service") && (
            <SelfServiceConfig
              config={
                moduleConfig.selfService || {
                  numberOfBays: 4,
                  bayEquipment: ["Wand", "Foam Gun", "Vacuum"],
                  pricingModel: "pay-per-minute",
                  minuteRate: 2.5,
                }
              }
              onChange={(config) => updateModuleConfig("self_service", config)}
            />
          )}

          {selectedModules.includes("mobile") && (
            <MobileConfig
              config={
                moduleConfig.mobile || {
                  serviceAreaRadius: 15,
                  zipCodes: [],
                  numberOfUnits: 2,
                  drivers: [],
                }
              }
              onChange={(config) => updateModuleConfig("mobile", config)}
            />
          )}

          {selectedModules.includes("manual_detailing") && (
            <ManualDetailingConfig
              config={
                moduleConfig.manualDetailing || {
                  detailBays: 3,
                  waitingArea: true,
                  staffCapacity: 6,
                  specializations: [],
                }
              }
              onChange={(config) => updateModuleConfig("manual_detailing", config)}
            />
          )}
        </div>
      )}
    </div>
  );
}

// Working Hours Component (Shared across all modules)
function WorkingHoursSection({ 
  workingHours, 
  onChange, 
  color = "blue" 
}: { 
  workingHours: WorkingHours[]; 
  onChange: (hours: WorkingHours[]) => void;
  color?: string;
}) {
  const updateWorkingHours = (dayIndex: number, field: keyof WorkingHours, value: any) => {
    const updatedHours = [...workingHours];
    updatedHours[dayIndex] = { ...updatedHours[dayIndex], [field]: value };
    onChange(updatedHours);
  };

  const iconColorClass = `text-${color}-600`;

  return (
    <div className="space-y-3 pt-4 border-t">
      <div className="flex items-center gap-2 mb-2">
        <Clock className={iconColorClass} size={16} />
        <Label className="text-base">Operating Hours & Capacity</Label>
      </div>
      <div className="space-y-2">
        {workingHours.map((day, index) => (
          <div key={day.day} className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
            <Checkbox
              checked={day.isOpen}
              onCheckedChange={(checked) => updateWorkingHours(index, "isOpen", checked)}
            />
            <span className="w-24 text-sm font-medium">{day.day}</span>
            {day.isOpen ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="time"
                  value={day.openTime}
                  onChange={(e) => updateWorkingHours(index, "openTime", e.target.value)}
                  className="w-32"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="time"
                  value={day.closeTime}
                  onChange={(e) => updateWorkingHours(index, "closeTime", e.target.value)}
                  className="w-32"
                />
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">Closed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Default working hours template
const getDefaultWorkingHours = (): WorkingHours[] => [
  { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Thursday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Friday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
  { day: "Saturday", isOpen: true, openTime: "09:00", closeTime: "20:00" },
  { day: "Sunday", isOpen: true, openTime: "09:00", closeTime: "17:00" },
];

// In-Bay Configuration Component
function InBayConfig({ config, onChange }: { config: any; onChange: (config: any) => void }) {
  const workingHours = config.workingHours || getDefaultWorkingHours();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="text-blue-600" size={20} />
          In-Bay Automatic Configuration
        </CardTitle>
        <CardDescription>Configure your automated bay settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Number of Bays</Label>
            <Input
              type="number"
              min={1}
              max={10}
              value={config.numberOfBays}
              onChange={(e) => onChange({ ...config, numberOfBays: parseInt(e.target.value) || 1 })}
            />
          </div>
          <div className="space-y-2">
            <Label>Payment System</Label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={config.paymentSystem}
              onChange={(e) => onChange({ ...config, paymentSystem: e.target.value })}
            >
              <option value="coin">Coin</option>
              <option value="token">Token</option>
              <option value="card">Card</option>
              <option value="app">Mobile App</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Wash Type</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={config.automaticType === "soft-touch"}
                onChange={() => onChange({ ...config, automaticType: "soft-touch" })}
              />
              Soft-touch (with brushes)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={config.automaticType === "touchless"}
                onChange={() => onChange({ ...config, automaticType: "touchless" })}
              />
              Touchless (pressure jets)
            </label>
          </div>
        </div>

        <WorkingHoursSection
          workingHours={workingHours}
          onChange={(hours) => onChange({ ...config, workingHours: hours })}
          color="blue"
        />
      </CardContent>
    </Card>
  );
}

// Tunnel Configuration Component
function TunnelConfig({ config, onChange }: { config: any; onChange: (config: any) => void }) {
  const workingHours = config.workingHours || getDefaultWorkingHours();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="text-purple-600" size={20} />
          Tunnel Wash Configuration
        </CardTitle>
        <CardDescription>Configure your tunnel wash system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tunnel Speed (cars/hour)</Label>
            <Input
              type="number"
              min={10}
              max={50}
              value={config.tunnelSpeed}
              onChange={(e) => onChange({ ...config, tunnelSpeed: parseInt(e.target.value) || 24 })}
            />
          </div>
          <div className="space-y-2">
            <Label>Tunnel Length (feet)</Label>
            <Input
              type="number"
              min={50}
              max={300}
              value={config.tunnelLength}
              onChange={(e) => onChange({ ...config, tunnelLength: parseInt(e.target.value) || 120 })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Conveyor Type</Label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={config.conveyorType}
              onChange={(e) => onChange({ ...config, conveyorType: e.target.value })}
            >
              <option value="chain">Chain Drive</option>
              <option value="belt">Belt Drive</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Max Vehicle Height (inches)</Label>
            <Input
              type="number"
              min={60}
              max={120}
              value={config.maxVehicleHeight}
              onChange={(e) => onChange({ ...config, maxVehicleHeight: parseInt(e.target.value) || 84 })}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={config.dryingSystem}
            onCheckedChange={(checked) => onChange({ ...config, dryingSystem: checked })}
          />
          <Label>Includes Drying System</Label>
        </div>

        <WorkingHoursSection
          workingHours={workingHours}
          onChange={(hours) => onChange({ ...config, workingHours: hours })}
          color="purple"
        />
      </CardContent>
    </Card>
  );
}

// Self-Service Configuration Component
function SelfServiceConfig({ config, onChange }: { config: any; onChange: (config: any) => void }) {
  const workingHours = config.workingHours || getDefaultWorkingHours();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="text-green-600" size={20} />
          Self-Service Configuration
        </CardTitle>
        <CardDescription>Configure your self-service bays</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Number of Bays</Label>
            <Input
              type="number"
              min={1}
              max={20}
              value={config.numberOfBays}
              onChange={(e) => onChange({ ...config, numberOfBays: parseInt(e.target.value) || 4 })}
            />
          </div>
          <div className="space-y-2">
            <Label>Pricing Model</Label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={config.pricingModel}
              onChange={(e) => onChange({ ...config, pricingModel: e.target.value })}
            >
              <option value="pay-per-minute">Pay Per Minute</option>
              <option value="flat-rate">Flat Rate</option>
            </select>
          </div>
        </div>
        {config.pricingModel === "pay-per-minute" && (
          <div className="space-y-2">
            <Label>Minute Rate ($)</Label>
            <Input
              type="number"
              step={0.25}
              min={1}
              max={10}
              value={config.minuteRate}
              onChange={(e) => onChange({ ...config, minuteRate: parseFloat(e.target.value) || 2.5 })}
            />
          </div>
        )}
        <div className="space-y-2">
          <Label>Bay Equipment</Label>
          <div className="space-y-2">
            {["Wand", "Foam Gun", "Vacuum", "Tire Inflator", "Mat Cleaner", "Fragrance"].map((equipment) => (
              <div key={equipment} className="flex items-center gap-2">
                <Checkbox
                  checked={config.bayEquipment.includes(equipment)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onChange({ ...config, bayEquipment: [...config.bayEquipment, equipment] });
                    } else {
                      onChange({ ...config, bayEquipment: config.bayEquipment.filter((e: string) => e !== equipment) });
                    }
                  }}
                />
                <Label>{equipment}</Label>
              </div>
            ))}
          </div>
        </div>

        <WorkingHoursSection
          workingHours={workingHours}
          onChange={(hours) => onChange({ ...config, workingHours: hours })}
          color="green"
        />
      </CardContent>
    </Card>
  );
}

// Mobile Configuration Component
function MobileConfig({ config, onChange }: { config: any; onChange: (config: any) => void }) {
  const workingHours = config.workingHours || getDefaultWorkingHours();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="text-orange-600" size={20} />
          Mobile Detailing Configuration
        </CardTitle>
        <CardDescription>Configure your mobile service fleet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Service Area Radius (miles)</Label>
            <Input
              type="number"
              min={5}
              max={50}
              value={config.serviceAreaRadius}
              onChange={(e) => onChange({ ...config, serviceAreaRadius: parseInt(e.target.value) || 15 })}
            />
          </div>
          <div className="space-y-2">
            <Label>Number of Mobile Units</Label>
            <Input
              type="number"
              min={1}
              max={20}
              value={config.numberOfUnits}
              onChange={(e) => onChange({ ...config, numberOfUnits: parseInt(e.target.value) || 2 })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Service Area Zip Codes (comma-separated)</Label>
          <Input
            placeholder="10001, 10002, 10003"
            value={config.zipCodes.join(", ")}
            onChange={(e) =>
              onChange({
                ...config,
                zipCodes: e.target.value
                  .split(",")
                  .map((z) => z.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="text-orange-600 mt-0.5" size={16} />
            <div className="text-sm text-orange-900">
              <strong>Service Area Coverage:</strong> {config.serviceAreaRadius} mile radius
              {config.zipCodes.length > 0 && ` • ${config.zipCodes.length} zip codes`}
            </div>
          </div>
        </div>

        <WorkingHoursSection
          workingHours={workingHours}
          onChange={(hours) => onChange({ ...config, workingHours: hours })}
          color="orange"
        />
      </CardContent>
    </Card>
  );
}

// Manual Detailing Configuration Component
function ManualDetailingConfig({ config, onChange }: { config: any; onChange: (config: any) => void }) {
  const workingHours = config.workingHours || getDefaultWorkingHours();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="text-red-600" size={20} />
          Manual Detailing Configuration
        </CardTitle>
        <CardDescription>Configure your detailing facility</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Detail Bays</Label>
            <Input
              type="number"
              min={1}
              max={10}
              value={config.detailBays}
              onChange={(e) => onChange({ ...config, detailBays: parseInt(e.target.value) || 3 })}
            />
          </div>
          <div className="space-y-2">
            <Label>Staff Capacity</Label>
            <Input
              type="number"
              min={1}
              max={50}
              value={config.staffCapacity}
              onChange={(e) => onChange({ ...config, staffCapacity: parseInt(e.target.value) || 6 })}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={config.waitingArea}
            onCheckedChange={(checked) => onChange({ ...config, waitingArea: checked })}
          />
          <Label>Customer Waiting Area Available</Label>
        </div>
        <div className="space-y-2">
          <Label>Specializations</Label>
          <div className="space-y-2">
            {["Ceramic Coating", "Paint Correction", "Interior Detailing", "Engine Bay", "Headlight Restoration"].map(
              (spec) => (
                <div key={spec} className="flex items-center gap-2">
                  <Checkbox
                    checked={config.specializations.includes(spec)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange({ ...config, specializations: [...config.specializations, spec] });
                      } else {
                        onChange({
                          ...config,
                          specializations: config.specializations.filter((s: string) => s !== spec),
                        });
                      }
                    }}
                  />
                  <Label>{spec}</Label>
                </div>
              )
            )}
          </div>
        </div>

        <WorkingHoursSection
          workingHours={workingHours}
          onChange={(hours) => onChange({ ...config, workingHours: hours })}
          color="red"
        />
      </CardContent>
    </Card>
  );
}