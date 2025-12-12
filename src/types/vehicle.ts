export type CarType = "sedan" | "suv" | "truck" | "ev" | "luxury";

export interface CarTypeConfig {
  id: CarType;
  label: string;
  icon: string;
  priceMultiplier: number; // Base price multiplier
  durationMultiplier: number; // Base duration multiplier
  description: string;
}

export const CAR_TYPES: Record<CarType, CarTypeConfig> = {
  sedan: {
    id: "sedan",
    label: "Sedan",
    icon: "🚗",
    priceMultiplier: 1.0,
    durationMultiplier: 1.0,
    description: "Standard sedan vehicles",
  },
  suv: {
    id: "suv",
    label: "SUV",
    icon: "🚙",
    priceMultiplier: 1.3,
    durationMultiplier: 1.2,
    description: "Sport Utility Vehicles",
  },
  truck: {
    id: "truck",
    label: "Truck",
    icon: "🚚",
    priceMultiplier: 1.5,
    durationMultiplier: 1.3,
    description: "Pickup trucks and large vehicles",
  },
  ev: {
    id: "ev",
    label: "Electric Vehicle",
    icon: "⚡",
    priceMultiplier: 1.2,
    durationMultiplier: 1.1,
    description: "Electric and hybrid vehicles",
  },
  luxury: {
    id: "luxury",
    label: "Luxury",
    icon: "💎",
    priceMultiplier: 1.8,
    durationMultiplier: 1.4,
    description: "Premium and luxury vehicles",
  },
};

export interface VehicleInfo {
  plate: string;
  brand?: string;
  model?: string;
  color?: string;
  year?: number;
  carType: CarType;
}

export function getCarTypeConfig(carType: CarType): CarTypeConfig {
  return CAR_TYPES[carType];
}

export function calculatePriceForCarType(basePrice: number, carType: CarType): number {
  const config = getCarTypeConfig(carType);
  return Math.round(basePrice * config.priceMultiplier);
}

export function calculateDurationForCarType(baseDuration: number, carType: CarType): number {
  const config = getCarTypeConfig(carType);
  return Math.round(baseDuration * config.durationMultiplier);
}

export function getCarTypeLabel(carType: CarType): string {
  return CAR_TYPES[carType]?.label || carType;
}

export function getCarTypeIcon(carType: CarType): string {
  return CAR_TYPES[carType]?.icon || "🚗";
}
