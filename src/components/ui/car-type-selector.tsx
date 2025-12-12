"use client";

import { CarType, CAR_TYPES, getCarTypeConfig } from "../../types/vehicle";
import { cn } from "./utils";
import { Check } from "lucide-react";

interface CarTypeSelectorProps {
  value: CarType;
  onChange: (carType: CarType) => void;
  className?: string;
  showPriceMultiplier?: boolean;
}

export function CarTypeSelector({
  value,
  onChange,
  className,
  showPriceMultiplier = false,
}: CarTypeSelectorProps) {
  const carTypes: CarType[] = ["sedan", "suv", "truck", "ev", "luxury"];

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium">Vehicle Type</label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {carTypes.map((carType) => {
          const config = getCarTypeConfig(carType);
          const isSelected = value === carType;

          return (
            <button
              key={carType}
              type="button"
              onClick={() => onChange(carType)}
              className={cn(
                "relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all",
                "hover:border-[#155DFC] hover:bg-[#155DFC]/5",
                isSelected
                  ? "border-[#155DFC] bg-[#155DFC]/10"
                  : "border-border bg-white"
              )}
            >
              {isSelected && (
                <div className="absolute top-1 right-1 size-5 bg-[#155DFC] rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
              <div className="text-2xl mb-1">{config.icon}</div>
              <div className="text-xs font-medium text-center">{config.label}</div>
              {showPriceMultiplier && config.priceMultiplier !== 1.0 && (
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  +{Math.round((config.priceMultiplier - 1) * 100)}%
                </div>
              )}
            </button>
          );
        })}
      </div>
      {showPriceMultiplier && (
        <p className="text-xs text-muted-foreground">
          Price and duration adjusted based on vehicle type
        </p>
      )}
    </div>
  );
}

interface CarTypeBadgeProps {
  carType: CarType;
  className?: string;
  showLabel?: boolean;
}

export function CarTypeBadge({
  carType,
  className,
  showLabel = true,
}: CarTypeBadgeProps) {
  const config = getCarTypeConfig(carType);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f3f3f5] text-xs",
        className
      )}
    >
      <span>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
