"use client";

import { Card, CardContent } from "../ui/card";
import {
  Zap,
  Truck,
  Wrench,
  Car,
  Users,
  Check,
  Info,
  DollarSign,
  Clock,
} from "lucide-react";

export type BusinessModule = "in_bay" | "tunnel" | "self_service" | "mobile" | "manual_detailing";

interface SimpleBusinessModuleSelectorProps {
  selectedModules: BusinessModule[];
  onModulesChange: (modules: BusinessModule[]) => void;
  disabled?: boolean;
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

export function SimpleBusinessModuleSelector({
  selectedModules,
  onModulesChange,
  disabled = false,
}: SimpleBusinessModuleSelectorProps) {
  const toggleModule = (moduleId: BusinessModule) => {
    if (disabled) return;
    
    if (selectedModules.includes(moduleId)) {
      onModulesChange(selectedModules.filter((m) => m !== moduleId));
    } else {
      onModulesChange([...selectedModules, moduleId]);
    }
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
          Choose the types of car wash services your location will offer. Configure capacity and hours for each module below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {moduleDefinitions.map((module) => {
            const Icon = module.icon;
            const isSelected = selectedModules.includes(module.id);

            return (
              <Card
                key={module.id}
                className={`cursor-pointer transition-all border-2 ${getColorClasses(module.color, isSelected)} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              <strong>Please select at least one business module</strong> to continue with capacity planning below.
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
              Configure operating hours and capacity for each selected module in the section below.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}