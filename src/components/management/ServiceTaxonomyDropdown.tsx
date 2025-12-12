"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, BookOpen, Car, Wrench, Sparkles, Home } from "lucide-react";

export interface ServiceTaxonomyItem {
  category: string;
  subcategory: string;
  service: string;
  technology: string;
  notes: string;
  suggestedPrice?: number;
  suggestedDuration?: number;
  vehicleTypes?: string[];
}

const taxonomyData: ServiceTaxonomyItem[] = [
  // 1. Wash Types (Technology-driven classification)
  {
    category: "Wash Type",
    subcategory: "Automatic Tunnel",
    service: "Soft-touch / Foam",
    technology: "Tunnel + Brushes",
    notes: "Standard in express chains (Tommy's, ModWash).",
    suggestedPrice: 25,
    suggestedDuration: 15,
    vehicleTypes: ["Regular", "SUV", "Sedan"]
  },
  {
    category: "Wash Type",
    subcategory: "Automatic Tunnel",
    service: "Touchless",
    technology: "Tunnel + High-pressure Jets",
    notes: "Safer for paint, higher water/energy use.",
    suggestedPrice: 30,
    suggestedDuration: 20,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Wash Type",
    subcategory: "Full Service",
    service: "Exterior + Interior Quick Clean",
    technology: "Tunnel + Manual Interior Staff",
    notes: "Flagship model; common at premium chains.",
    suggestedPrice: 45,
    suggestedDuration: 35,
    vehicleTypes: ["Regular", "SUV", "Sedan"]
  },
  {
    category: "Wash Type",
    subcategory: "Hand Wash",
    service: "Hand Exterior/Interior",
    technology: "Manual",
    notes: "Paint-safe, boutique detail shops.",
    suggestedPrice: 60,
    suggestedDuration: 60,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Wash Type",
    subcategory: "Self-Serve",
    service: "Manual Bay",
    technology: "Coin/Token-operated Wand",
    notes: "DIY customers; water + foam gun.",
    suggestedPrice: 8,
    suggestedDuration: 25,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck", "Motorcycle"]
  },
  {
    category: "Wash Type",
    subcategory: "Mobile",
    service: "On-site Detail",
    technology: "Mobile Van (water + power onboard)",
    notes: "Growing via Yelp/independent providers.",
    suggestedPrice: 80,
    suggestedDuration: 90,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },

  // 2. Exterior Cleaning & Packages
  {
    category: "Exterior",
    subcategory: "Prep",
    service: "Bug/Tar Removal",
    technology: "Manual + Chemicals",
    notes: "Pre-treatment before tunnel/detail.",
    suggestedPrice: 15,
    suggestedDuration: 10,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Clean",
    service: "Foam Bath / Pre-Soak",
    technology: "Tunnel Foam Curtain / Manual Foam Gun",
    notes: "'Foam Max' marketing differentiator.",
    suggestedPrice: 12,
    suggestedDuration: 8,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Wheels",
    service: "Wheel Clean (1x–3x cycles)",
    technology: "Tunnel Brushes + Manual",
    notes: "Often upsold; critical for visible results.",
    suggestedPrice: 18,
    suggestedDuration: 12,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Undercarriage",
    service: "Underbody Wash",
    technology: "Tunnel Jet Spray",
    notes: "Removes salt, mud.",
    suggestedPrice: 10,
    suggestedDuration: 5,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Protectant",
    service: "Triple-Foam / Clear-Coat",
    technology: "Tunnel Foam Cannons",
    notes: "Rainbow coat branding.",
    suggestedPrice: 20,
    suggestedDuration: 10,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Protectant",
    service: "Spray Wax / Sealant",
    technology: "Tunnel Spray or Manual Wax",
    notes: "Mid-tier package add-on.",
    suggestedPrice: 25,
    suggestedDuration: 15,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Protectant",
    service: "Ceramic / Graphene Topcoat",
    technology: "Spray + Hand Buff",
    notes: "Premium detail upsell.",
    suggestedPrice: 150,
    suggestedDuration: 120,
    vehicleTypes: ["Regular", "SUV", "Sedan"]
  },
  {
    category: "Exterior",
    subcategory: "Finishing",
    service: "Spot-Free Rinse",
    technology: "Tunnel RO water + Jet",
    notes: "Prevents water spots.",
    suggestedPrice: 8,
    suggestedDuration: 5,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Finishing",
    service: "Tire Shine",
    technology: "Tunnel Spray / Hand Applied",
    notes: "High-visibility upsell.",
    suggestedPrice: 12,
    suggestedDuration: 8,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Finishing",
    service: "Blower Dry / Hand Dry",
    technology: "Tunnel Dryer + Towels",
    notes: "Varies by package.",
    suggestedPrice: 10,
    suggestedDuration: 10,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },

  // 3. Exterior Correction & Specialty
  {
    category: "Exterior",
    subcategory: "Correction",
    service: "Clay Bar",
    technology: "Manual + Clay",
    notes: "Removes bonded contaminants.",
    suggestedPrice: 45,
    suggestedDuration: 30,
    vehicleTypes: ["Regular", "SUV", "Sedan"]
  },
  {
    category: "Exterior",
    subcategory: "Correction",
    service: "Polish",
    technology: "Machine Rotary Buffers",
    notes: "Pre-coating prep.",
    suggestedPrice: 80,
    suggestedDuration: 60,
    vehicleTypes: ["Regular", "SUV", "Sedan"]
  },
  {
    category: "Exterior",
    subcategory: "Correction",
    service: "Paint Correction (1–3 stage)",
    technology: "DA Polishers, Compounds",
    notes: "High-margin service.",
    suggestedPrice: 200,
    suggestedDuration: 180,
    vehicleTypes: ["Regular", "SUV", "Sedan"]
  },
  {
    category: "Exterior",
    subcategory: "Special",
    service: "Headlight Restoration",
    technology: "Wet Sand + Polish",
    notes: "Boutique service.",
    suggestedPrice: 60,
    suggestedDuration: 45,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Special",
    service: "Engine Bay Cleaning",
    technology: "Steam/Pressure Wash",
    notes: "Add-on risk (electronics).",
    suggestedPrice: 40,
    suggestedDuration: 30,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Special",
    service: "Trim Restoration",
    technology: "Manual Dressing",
    notes: "Brings faded plastics back.",
    suggestedPrice: 35,
    suggestedDuration: 25,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"]
  },
  {
    category: "Exterior",
    subcategory: "Special",
    service: "Rim Coating/Wheel Polishing",
    technology: "Manual Buff/Protectant",
    notes: "Upsell to premium owners.",
    suggestedPrice: 120,
    suggestedDuration: 90,
    vehicleTypes: ["Regular", "SUV", "Sedan"]
  },

  // 4. Interior Cleaning & Detailing
  {
    category: "Interior",
    subcategory: "Quick",
    service: "Vacuum (Seats/Carpets/Trunk)",
    technology: "Manual",
    notes: "Entry-level.",
    suggestedPrice: 15,
    suggestedDuration: 15,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Van", "Truck"]
  },
  {
    category: "Interior",
    subcategory: "Quick",
    service: "Dash/Vents/Trim Wipe",
    technology: "Microfiber + Cleaner",
    notes: "'Quick interior' common.",
    suggestedPrice: 10,
    suggestedDuration: 10,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Van", "Truck"]
  },
  {
    category: "Interior",
    subcategory: "Quick",
    service: "Interior Windows",
    technology: "Manual Glass Cleaner",
    notes: "Tunnel 'full service.'",
    suggestedPrice: 8,
    suggestedDuration: 8,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Van", "Truck"]
  },
  {
    category: "Interior",
    subcategory: "Quick",
    service: "Mat Wash",
    technology: "Manual / Mat Machine",
    notes: "Sometimes self-serve.",
    suggestedPrice: 12,
    suggestedDuration: 10,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Van", "Truck"]
  },
  {
    category: "Interior",
    subcategory: "Deep",
    service: "Carpet/Upholstery Shampoo or Steam",
    technology: "Extraction Machines",
    notes: "Premium interior service.",
    suggestedPrice: 75,
    suggestedDuration: 60,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Van"]
  },
  {
    category: "Interior",
    subcategory: "Deep",
    service: "Leather Clean & Condition",
    technology: "Manual + Leather Balm",
    notes: "Luxury segment.",
    suggestedPrice: 50,
    suggestedDuration: 40,
    vehicleTypes: ["Regular", "SUV", "Sedan"]
  },
  {
    category: "Interior",
    subcategory: "Deep",
    service: "Pet Hair Removal",
    technology: "Manual + Tools",
    notes: "Labor-intensive, high upsell.",
    suggestedPrice: 45,
    suggestedDuration: 35,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Van"]
  },
  {
    category: "Interior",
    subcategory: "Deep",
    service: "Odor Removal / Ozone",
    technology: "Ozone Generator",
    notes: "Strong Yelp differentiator.",
    suggestedPrice: 65,
    suggestedDuration: 45,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Van", "Truck"]
  },
  {
    category: "Interior",
    subcategory: "Deep",
    service: "Interior Disinfect/Sanitize",
    technology: "Steam / Antibacterial Sprays",
    notes: "Post-COVID demand.",
    suggestedPrice: 25,
    suggestedDuration: 20,
    vehicleTypes: ["Regular", "SUV", "Sedan", "Van", "Truck"]
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Wash Type":
      return <Car className="h-4 w-4" />;
    case "Exterior":
      return <Sparkles className="h-4 w-4" />;
    case "Interior":
      return <Home className="h-4 w-4" />;
    default:
      return <Wrench className="h-4 w-4" />;
  }
};

interface ServiceTaxonomyDropdownProps {
  onServiceSelect: (service: ServiceTaxonomyItem) => void;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
}

export function ServiceTaxonomyDropdown({ 
  onServiceSelect, 
  buttonText = "Browse Service Catalog",
  buttonVariant = "outline" 
}: ServiceTaxonomyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Group services by category
  const groupedServices = taxonomyData.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = {};
    }
    if (!acc[service.category][service.subcategory]) {
      acc[service.category][service.subcategory] = [];
    }
    acc[service.category][service.subcategory].push(service);
    return acc;
  }, {} as Record<string, Record<string, ServiceTaxonomyItem[]>>);

  const handleServiceSelect = (service: ServiceTaxonomyItem) => {
    onServiceSelect(service);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} className="gap-2">
          <BookOpen className="h-4 w-4" />
          {buttonText}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto">
        <div className="p-2">
          <div className="mb-2 px-2 py-1">
            <div className="font-medium text-sm">LetWash Service Catalog</div>
            <div className="text-xs text-muted-foreground">Professional car wash & detailing services</div>
          </div>
          <DropdownMenuSeparator />
          
          {taxonomyData.slice(0, 10).map((service, index) => (
            <DropdownMenuItem
              key={index}
              className="flex flex-col items-start gap-1 p-3 cursor-pointer"
              onClick={() => handleServiceSelect(service)}
            >
              <div className="flex items-center gap-2 w-full">
                {getCategoryIcon(service.category)}
                <div className="font-medium text-sm">{service.service}</div>
              </div>
              <div className="text-xs text-muted-foreground">{service.subcategory} • {service.technology}</div>
              {service.suggestedPrice && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium text-green-600">
                    ${service.suggestedPrice}
                  </span>
                  {service.suggestedDuration && (
                    <span className="text-muted-foreground">
                      • {service.suggestedDuration}min
                    </span>
                  )}
                </div>
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <div className="px-2 py-1 text-xs text-muted-foreground">
            Showing 10 of {taxonomyData.length} services
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}