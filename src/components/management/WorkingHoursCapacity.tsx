"use client";

import { useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Car, Droplet, Zap, CircleDot, Smartphone, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

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

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Business module configuration
const MODULE_CONFIG: Record<string, {
  name: string;
  icon: React.ComponentType<any>;
  bgColor: string;
  iconColor: string;
}> = {
  manual_detailing: {
    name: "Manual Detailing / Hand Wash",
    icon: Car,
    bgColor: "bg-orange-500",
    iconColor: "text-white",
  },
  self_service: {
    name: "Self-Service",
    icon: Droplet,
    bgColor: "bg-green-500",
    iconColor: "text-white",
  },
  tunnel: {
    name: "Tunnel / Conveyor",
    icon: Zap,
    bgColor: "bg-purple-500",
    iconColor: "text-white",
  },
  in_bay: {
    name: "In-Bay / Roll-Over",
    icon: CircleDot,
    bgColor: "bg-blue-500",
    iconColor: "text-white",
  },
  mobile: {
    name: "Mobile / On-Demand",
    icon: Smartphone,
    bgColor: "bg-red-500",
    iconColor: "text-white",
  },
};

interface ModuleCapacity {
  isActive: boolean;
  fromTime: string;
  toTime: string;
  stations: number;
  config?: ModuleAdvancedConfig;
}

interface ModuleAdvancedConfig {
  // In-Bay specific
  paymentSystem?: "coin" | "token" | "card" | "app";
  automaticType?: "soft-touch" | "touchless";
  
  // Tunnel specific
  tunnelSpeed?: number; // cars per hour
  tunnelLength?: number; // feet
  conveyorType?: "chain" | "belt";
  dryingSystem?: boolean;
  maxVehicleHeight?: number; // inches
  
  // Self-Service specific
  pricingModel?: "pay-per-minute" | "flat-rate";
  minuteRate?: number;
  bayEquipment?: string[];
  
  // Mobile specific
  serviceAreaRadius?: number; // miles
  zipCodes?: string[];
  numberOfUnits?: number;
  
  // Detailing specific
  detailBays?: number;
  waitingArea?: boolean;
  staffCapacity?: number;
  specializations?: string[];
}

interface WorkingHoursCapacityProps {
  selectedModules: string[];
  disabled?: boolean;
}

export function WorkingHoursCapacity({ selectedModules, disabled = false }: WorkingHoursCapacityProps) {
  // Initialize capacity state
  const [dayEnabled, setDayEnabled] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    DAYS_OF_WEEK.forEach(day => {
      initial[day] = true;
    });
    return initial;
  });

  const [moduleCapacity, setModuleCapacity] = useState<Record<string, Record<string, ModuleCapacity>>>(() => {
    const initial: any = {};
    DAYS_OF_WEEK.forEach(day => {
      initial[day] = {
        manual_detailing: { 
          isActive: true, 
          fromTime: "08:00", 
          toTime: "24:00", 
          stations: 6,
          config: {
            detailBays: 3,
            waitingArea: true,
            staffCapacity: 6,
            specializations: []
          }
        },
        self_service: { 
          isActive: true, 
          fromTime: "08:00", 
          toTime: "24:00", 
          stations: 6,
          config: {
            pricingModel: "pay-per-minute",
            minuteRate: 2.5,
            bayEquipment: ["Wand", "Foam Gun", "Vacuum"]
          }
        },
        tunnel: { 
          isActive: true, 
          fromTime: "08:00", 
          toTime: "24:00", 
          stations: 6,
          config: {
            tunnelSpeed: 24,
            tunnelLength: 120,
            conveyorType: "chain",
            dryingSystem: true,
            maxVehicleHeight: 84
          }
        },
        in_bay: { 
          isActive: true, 
          fromTime: "08:00", 
          toTime: "24:00", 
          stations: 6,
          config: {
            paymentSystem: "card",
            automaticType: "soft-touch"
          }
        },
        mobile: { 
          isActive: true, 
          fromTime: "08:00", 
          toTime: "24:00", 
          stations: 6,
          config: {
            serviceAreaRadius: 15,
            zipCodes: [],
            numberOfUnits: 2
          }
        },
      };
    });
    return initial;
  });

  const [expandedModules, setExpandedModules] = useState<Record<string, Record<string, boolean>>>({});

  const handleDayToggle = (day: string, enabled: boolean) => {
    setDayEnabled(prev => ({ ...prev, [day]: enabled }));
  };

  const handleModuleToggle = (day: string, moduleKey: string, enabled: boolean) => {
    setModuleCapacity(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [moduleKey]: { ...prev[day][moduleKey], isActive: enabled }
      }
    }));
  };

  const handleTimeChange = (day: string, moduleKey: string, field: 'fromTime' | 'toTime', value: string) => {
    setModuleCapacity(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [moduleKey]: { ...prev[day][moduleKey], [field]: value }
      }
    }));
  };

  const handleStationChange = (day: string, moduleKey: string, value: number) => {
    const validValue = Math.min(50, Math.max(1, value));
    setModuleCapacity(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [moduleKey]: { ...prev[day][moduleKey], stations: validValue }
      }
    }));
  };

  const handleConfigChange = (day: string, moduleKey: string, config: ModuleAdvancedConfig) => {
    setModuleCapacity(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [moduleKey]: { ...prev[day][moduleKey], config }
      }
    }));
  };

  const toggleAdvancedConfig = (day: string, moduleKey: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [moduleKey]: !prev[day]?.[moduleKey]
      }
    }));
  };

  // Convert selected modules to keys
  const getModuleKeys = () => {
    return Object.keys(MODULE_CONFIG).filter(key => 
      selectedModules.includes(key)
    );
  };

  const moduleKeys = getModuleKeys();

  return (
    <div className="space-y-4">
      {DAYS_OF_WEEK.map((day) => (
        <div key={day} className="space-y-3">
          {/* Day Header with Toggle */}
          <div className="flex items-center gap-3">
            <Switch
              checked={dayEnabled[day]}
              onCheckedChange={(checked) => handleDayToggle(day, checked)}
              disabled={disabled}
            />
            <span className="font-semibold">Every {day}</span>
          </div>

          {/* Module Cards - Responsive Grid Layout */}
          {dayEnabled[day] && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {moduleKeys.map((moduleKey) => {
                const config = MODULE_CONFIG[moduleKey];
                const capacity = moduleCapacity[day][moduleKey];
                const IconComponent = config.icon;
                const isExpanded = expandedModules[day]?.[moduleKey] || false;

                return (
                  <div
                    key={moduleKey}
                    className={`border-2 rounded-lg p-4 bg-white transition-all ${
                      capacity.isActive 
                        ? 'border-primary shadow-sm' 
                        : 'border-gray-200'
                    }`}
                  >
                    {/* Module Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`${config.bgColor} rounded-lg p-2`}>
                          <IconComponent className={`h-4 w-4 ${config.iconColor}`} />
                        </div>
                        <span className="text-sm font-medium">
                          {config.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {capacity.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <Switch
                          checked={capacity.isActive}
                          onCheckedChange={(checked) => handleModuleToggle(day, moduleKey, checked)}
                          disabled={disabled}
                        />
                      </div>
                    </div>

                    {/* Time and Station Inputs */}
                    {capacity.isActive && (
                      <>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          {/* From Time */}
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium">From</Label>
                            <Select
                              value={capacity.fromTime}
                              onValueChange={(value) => handleTimeChange(day, moduleKey, 'fromTime', value)}
                              disabled={disabled}
                            >
                              <SelectTrigger className="h-9 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_OPTIONS.map((time) => (
                                  <SelectItem key={time} value={time} className="text-xs">
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* To Time */}
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium">To</Label>
                            <Select
                              value={capacity.toTime}
                              onValueChange={(value) => handleTimeChange(day, moduleKey, 'toTime', value)}
                              disabled={disabled}
                            >
                              <SelectTrigger className="h-9 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_OPTIONS.map((time) => (
                                  <SelectItem key={time} value={time} className="text-xs">
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Station Count */}
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium">Stations</Label>
                            <Input
                              type="number"
                              min="1"
                              max="50"
                              value={capacity.stations}
                              onChange={(e) => handleStationChange(day, moduleKey, parseInt(e.target.value) || 1)}
                              className="h-9 text-xs"
                              disabled={disabled}
                            />
                          </div>
                        </div>

                        {/* Advanced Configuration Toggle */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAdvancedConfig(day, moduleKey)}
                          disabled={disabled}
                          className="w-full h-9 text-xs justify-between"
                        >
                          Advanced Configuration
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>

                        {/* Advanced Configuration Content */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                            {moduleKey === "in_bay" && (
                              <InBayAdvancedConfig
                                config={capacity.config || {}}
                                onChange={(config) => handleConfigChange(day, moduleKey, config)}
                                disabled={disabled}
                              />
                            )}
                            {moduleKey === "tunnel" && (
                              <TunnelAdvancedConfig
                                config={capacity.config || {}}
                                onChange={(config) => handleConfigChange(day, moduleKey, config)}
                                disabled={disabled}
                              />
                            )}
                            {moduleKey === "self_service" && (
                              <SelfServiceAdvancedConfig
                                config={capacity.config || {}}
                                onChange={(config) => handleConfigChange(day, moduleKey, config)}
                                disabled={disabled}
                              />
                            )}
                            {moduleKey === "mobile" && (
                              <MobileAdvancedConfig
                                config={capacity.config || {}}
                                onChange={(config) => handleConfigChange(day, moduleKey, config)}
                                disabled={disabled}
                              />
                            )}
                            {moduleKey === "manual_detailing" && (
                              <DetailingAdvancedConfig
                                config={capacity.config || {}}
                                onChange={(config) => handleConfigChange(day, moduleKey, config)}
                                disabled={disabled}
                              />
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// In-Bay Advanced Configuration
function InBayAdvancedConfig({ 
  config, 
  onChange, 
  disabled 
}: { 
  config: ModuleAdvancedConfig; 
  onChange: (config: ModuleAdvancedConfig) => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Payment System</Label>
          <Select
            value={config.paymentSystem || "card"}
            onValueChange={(value: any) => onChange({ ...config, paymentSystem: value })}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coin">Coin</SelectItem>
              <SelectItem value="token">Token</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="app">Mobile App</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Wash Type</Label>
          <Select
            value={config.automaticType || "soft-touch"}
            onValueChange={(value: any) => onChange({ ...config, automaticType: value })}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soft-touch">Soft-touch</SelectItem>
              <SelectItem value="touchless">Touchless</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

// Tunnel Advanced Configuration
function TunnelAdvancedConfig({ 
  config, 
  onChange, 
  disabled 
}: { 
  config: ModuleAdvancedConfig; 
  onChange: (config: ModuleAdvancedConfig) => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Tunnel Speed (cars/hour)</Label>
          <Input
            type="number"
            min="10"
            max="50"
            value={config.tunnelSpeed || 24}
            onChange={(e) => onChange({ ...config, tunnelSpeed: parseInt(e.target.value) || 24 })}
            className="h-8 text-xs"
            disabled={disabled}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Tunnel Length (feet)</Label>
          <Input
            type="number"
            min="50"
            max="300"
            value={config.tunnelLength || 120}
            onChange={(e) => onChange({ ...config, tunnelLength: parseInt(e.target.value) || 120 })}
            className="h-8 text-xs"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Conveyor Type</Label>
          <Select
            value={config.conveyorType || "chain"}
            onValueChange={(value: any) => onChange({ ...config, conveyorType: value })}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chain">Chain Drive</SelectItem>
              <SelectItem value="belt">Belt Drive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Max Vehicle Height (inches)</Label>
          <Input
            type="number"
            min="60"
            max="120"
            value={config.maxVehicleHeight || 84}
            onChange={(e) => onChange({ ...config, maxVehicleHeight: parseInt(e.target.value) || 84 })}
            className="h-8 text-xs"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={config.dryingSystem !== false}
          onCheckedChange={(checked) => onChange({ ...config, dryingSystem: !!checked })}
          disabled={disabled}
        />
        <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Includes Drying System</Label>
      </div>
    </div>
  );
}

// Self-Service Advanced Configuration
function SelfServiceAdvancedConfig({ 
  config, 
  onChange, 
  disabled 
}: { 
  config: ModuleAdvancedConfig; 
  onChange: (config: ModuleAdvancedConfig) => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Pricing Model</Label>
          <Select
            value={config.pricingModel || "pay-per-minute"}
            onValueChange={(value: any) => onChange({ ...config, pricingModel: value })}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pay-per-minute">Pay Per Minute</SelectItem>
              <SelectItem value="flat-rate">Flat Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {config.pricingModel === "pay-per-minute" && (
          <div className="space-y-1.5">
            <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Minute Rate ($)</Label>
            <Input
              type="number"
              step="0.25"
              min="1"
              max="10"
              value={config.minuteRate || 2.5}
              onChange={(e) => onChange({ ...config, minuteRate: parseFloat(e.target.value) || 2.5 })}
              className="h-8 text-xs"
              disabled={disabled}
            />
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Bay Equipment</Label>
        <div className="grid grid-cols-2 gap-2">
          {["Wand", "Foam Gun", "Vacuum", "Tire Inflator", "Mat Cleaner", "Fragrance"].map((equipment) => (
            <div key={equipment} className="flex items-center gap-2">
              <Checkbox
                checked={config.bayEquipment?.includes(equipment) || false}
                onCheckedChange={(checked) => {
                  const current = config.bayEquipment || [];
                  if (checked) {
                    onChange({ ...config, bayEquipment: [...current, equipment] });
                  } else {
                    onChange({ ...config, bayEquipment: current.filter(e => e !== equipment) });
                  }
                }}
                disabled={disabled}
              />
              <Label className="text-xs">{equipment}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile Advanced Configuration
function MobileAdvancedConfig({ 
  config, 
  onChange, 
  disabled 
}: { 
  config: ModuleAdvancedConfig; 
  onChange: (config: ModuleAdvancedConfig) => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Service Area Radius (miles)</Label>
          <Input
            type="number"
            min="5"
            max="50"
            value={config.serviceAreaRadius || 15}
            onChange={(e) => onChange({ ...config, serviceAreaRadius: parseInt(e.target.value) || 15 })}
            className="h-8 text-xs"
            disabled={disabled}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Number of Mobile Units</Label>
          <Input
            type="number"
            min="1"
            max="20"
            value={config.numberOfUnits || 2}
            onChange={(e) => onChange({ ...config, numberOfUnits: parseInt(e.target.value) || 2 })}
            className="h-8 text-xs"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Service Area Zip Codes (comma-separated)</Label>
        <Input
          placeholder="10001, 10002, 10003"
          value={config.zipCodes?.join(", ") || ""}
          onChange={(e) =>
            onChange({
              ...config,
              zipCodes: e.target.value
                .split(",")
                .map((z) => z.trim())
                .filter(Boolean),
            })
          }
          className="h-8 text-xs"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

// Detailing Advanced Configuration
function DetailingAdvancedConfig({ 
  config, 
  onChange, 
  disabled 
}: { 
  config: ModuleAdvancedConfig; 
  onChange: (config: ModuleAdvancedConfig) => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Detail Bays</Label>
          <Input
            type="number"
            min="1"
            max="10"
            value={config.detailBays || 3}
            onChange={(e) => onChange({ ...config, detailBays: parseInt(e.target.value) || 3 })}
            className="h-8 text-xs"
            disabled={disabled}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Staff Capacity</Label>
          <Input
            type="number"
            min="1"
            max="50"
            value={config.staffCapacity || 6}
            onChange={(e) => onChange({ ...config, staffCapacity: parseInt(e.target.value) || 6 })}
            className="h-8 text-xs"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={config.waitingArea !== false}
          onCheckedChange={(checked) => onChange({ ...config, waitingArea: !!checked })}
          disabled={disabled}
        />
        <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Customer Waiting Area Available</Label>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs border border-gray-200 px-2 py-0.5 rounded">Specializations</Label>
        <div className="grid grid-cols-2 gap-2">
          {["Ceramic Coating", "Paint Correction", "Interior Detailing", "Engine Bay", "Headlight Restoration"].map(
            (spec) => (
              <div key={spec} className="flex items-center gap-2">
                <Checkbox
                  checked={config.specializations?.includes(spec) || false}
                  onCheckedChange={(checked) => {
                    const current = config.specializations || [];
                    if (checked) {
                      onChange({ ...config, specializations: [...current, spec] });
                    } else {
                      onChange({ ...config, specializations: current.filter(s => s !== spec) });
                    }
                  }}
                  disabled={disabled}
                />
                <Label className="text-xs">{spec}</Label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}