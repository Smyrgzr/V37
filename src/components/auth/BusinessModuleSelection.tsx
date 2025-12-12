"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Check, Sparkles, Car, Droplets, Wrench, MapPin, Package } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export type BusinessModule = 
  | "in-bay"
  | "tunnel"
  | "self-service"
  | "mobile"
  | "manual-detailing"
  | "mobile-detailing"
  | "pickup-dropoff";

interface BusinessModuleOption {
  id: BusinessModule;
  name: string;
  description: string;
  icon: React.ElementType;
  requiresReservation: boolean;
  color: string;
  popular?: boolean;
}

const businessModules: BusinessModuleOption[] = [
  {
    id: "in-bay",
    name: "In-Bay Automatic",
    description: "Automated washing with customer stays in vehicle",
    icon: Car,
    requiresReservation: false,
    color: "blue",
    popular: true,
  },
  {
    id: "tunnel",
    name: "Tunnel Wash",
    description: "Conveyor belt system for high-volume washing",
    icon: Droplets,
    requiresReservation: false,
    color: "cyan",
    popular: true,
  },
  {
    id: "self-service",
    name: "Self-Service",
    description: "DIY wash bays for customers",
    icon: Package,
    requiresReservation: false,
    color: "green",
  },
  {
    id: "manual-detailing",
    name: "Manual Detailing",
    description: "Professional hand washing & detailing at center",
    icon: Wrench,
    requiresReservation: true,
    color: "purple",
  },
  {
    id: "mobile-detailing",
    name: "Mobile Detailing",
    description: "On-location detailing service",
    icon: MapPin,
    requiresReservation: true,
    color: "orange",
  },
  {
    id: "pickup-dropoff",
    name: "Pick-up & Drop-off",
    description: "Vehicle collection and delivery service",
    icon: Car,
    requiresReservation: true,
    color: "pink",
  },
];

interface BusinessModuleSelectionProps {
  onComplete: (modules: BusinessModule[]) => void;
  onBack: () => void;
}

export function BusinessModuleSelection({ onComplete, onBack }: BusinessModuleSelectionProps) {
  const [selectedModules, setSelectedModules] = useState<BusinessModule[]>(["in-bay", "tunnel"]);

  const toggleModule = (moduleId: BusinessModule) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((m) => m !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap: Record<string, { border: string; bg: string; text: string }> = {
      blue: { border: "border-blue-600", bg: "bg-blue-50", text: "text-blue-700" },
      cyan: { border: "border-cyan-600", bg: "bg-cyan-50", text: "text-cyan-700" },
      green: { border: "border-green-600", bg: "bg-green-50", text: "text-green-700" },
      purple: { border: "border-purple-600", bg: "bg-purple-50", text: "text-purple-700" },
      orange: { border: "border-orange-600", bg: "bg-orange-50", text: "text-orange-700" },
      pink: { border: "border-pink-600", bg: "bg-pink-50", text: "text-pink-700" },
    };
    return isSelected ? colorMap[color] : { border: "border-gray-200", bg: "bg-gray-50", text: "text-gray-600" };
  };

  const walkInModules = businessModules.filter((m) => !m.requiresReservation);
  const reservationModules = businessModules.filter((m) => m.requiresReservation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl">
        <CardHeader className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">
            let<span className="text-gray-800">wash</span>
          </div>
          <CardTitle>Select Your Business Modules</CardTitle>
          <CardDescription>
            Choose the services your carwash center offers. You can add or remove modules later.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Walk-in Modules */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">Walk-in Services</h3>
              <Badge variant="outline" className="text-xs">No reservation needed</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {walkInModules.map((module) => {
                const isSelected = selectedModules.includes(module.id);
                const colors = getColorClasses(module.color, isSelected);
                const Icon = module.icon;

                return (
                  <Card
                    key={module.id}
                    className={`relative cursor-pointer transition-all ${
                      isSelected
                        ? `${colors.border} border-2 shadow-lg`
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => toggleModule(module.id)}
                  >
                    {module.popular && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className={`p-2 rounded-lg ${isSelected ? colors.bg : 'bg-gray-100'}`}>
                          <Icon className={`w-5 h-5 ${isSelected ? colors.text : 'text-gray-500'}`} />
                        </div>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleModule(module.id)}
                          className="mt-1"
                        />
                      </div>
                      <CardTitle className="text-base">{module.name}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Reservation-based Modules */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">Reservation Services</h3>
              <Badge variant="outline" className="text-xs">Appointment required</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reservationModules.map((module) => {
                const isSelected = selectedModules.includes(module.id);
                const colors = getColorClasses(module.color, isSelected);
                const Icon = module.icon;

                return (
                  <Card
                    key={module.id}
                    className={`relative cursor-pointer transition-all ${
                      isSelected
                        ? `${colors.border} border-2 shadow-lg`
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => toggleModule(module.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className={`p-2 rounded-lg ${isSelected ? colors.bg : 'bg-gray-100'}`}>
                          <Icon className={`w-5 h-5 ${isSelected ? colors.text : 'text-gray-500'}`} />
                        </div>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleModule(module.id)}
                          className="mt-1"
                        />
                      </div>
                      <CardTitle className="text-base">{module.name}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">
                  Selected: {selectedModules.length} module{selectedModules.length !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-blue-700">
                  Each module can be configured individually with pricing, duration, and availability settings.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={() => onComplete(selectedModules)}
              disabled={selectedModules.length === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Continue with {selectedModules.length} module{selectedModules.length !== 1 ? 's' : ''}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Don't worry, you can change your modules anytime from settings
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
