"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { X, Star, Clock, DollarSign, Plus, Heart, Share, MessageCircle } from "lucide-react";
import carwashImage from "figma:asset/3d0e60be763e23cc684129004ed98df39cd0fa00.png";

interface Service {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: number;
  description: string;
  rating: number;
  reviewCount: number;
}

interface Package {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: number;
  services: string[];
  rating: number;
  reviewCount: number;
}

interface CarwashCenter {
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  isOpen: boolean;
  closeTime: string;
  images: string[];
  packages: Package[];
  services: Service[];
}

interface MobilePreviewProps {
  centerData: CarwashCenter;
  onClose: () => void;
}

export function MobilePreview({ centerData, onClose }: MobilePreviewProps) {
  const [selectedTab, setSelectedTab] = useState<"packages" | "services">("packages");
  const [selectedVehicle, setSelectedVehicle] = useState("Regular");

  const vehicleTypes = ["Regular", "SUV", "Truck", "Sedan"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-sm h-[80vh] overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="relative">
          <ImageWithFallback
            src={carwashImage}
            alt="Carwash Center"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
            >
              <X size={16} />
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                <Heart size={16} />
              </Button>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                <Share size={16} />
              </Button>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                <MessageCircle size={16} />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 rounded-full px-3 py-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Open</span>
              <span className="text-sm text-gray-600">• Closes {centerData.closeTime}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Center Info */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">{centerData.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{centerData.rating}</span>
                <span className="text-sm text-gray-600">({centerData.reviewCount.toLocaleString()})</span>
              </div>
              <span className="text-sm text-gray-600">• 25 min • Self service car wash</span>
            </div>
          </div>

          {/* Vehicle Type Selector */}
          <div className="p-4 border-b">
            <div className="flex gap-2 overflow-x-auto">
              {vehicleTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedVehicle === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedVehicle(type)}
                  className="whitespace-nowrap"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setSelectedTab("packages")}
                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                  selectedTab === "packages"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600"
                }`}
              >
                Packages
              </button>
              <button
                onClick={() => setSelectedTab("services")}
                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                  selectedTab === "services"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600"
                }`}
              >
                Services
              </button>
            </div>
          </div>

          {/* Packages */}
          {selectedTab === "packages" && (
            <div className="p-4 space-y-4">
              {centerData.packages.map((pkg) => (
                <div key={pkg.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium">{pkg.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{pkg.rating}% ({pkg.reviewCount})</span>
                        </div>
                        <span className="text-xs text-gray-600">• {pkg.duration} min</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">${pkg.price}</span>
                        {pkg.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${pkg.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    {pkg.services.map((service, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {service}
                      </div>
                    ))}
                  </div>
                  
                  <Button size="sm" className="w-full">
                    <Plus size={16} className="mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Services */}
          {selectedTab === "services" && (
            <div className="p-4 space-y-4">
              {centerData.services.map((service) => (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium">{service.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{service.rating}% ({service.reviewCount})</span>
                        </div>
                        <span className="text-xs text-gray-600">• {service.duration} min</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">${service.price}</span>
                        {service.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${service.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  
                  <Button size="sm" className="w-full">
                    <Plus size={16} className="mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}