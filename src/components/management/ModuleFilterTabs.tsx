/**
 * MODULE FILTER TABS COMPONENT
 * ============================
 * 
 * Filtering interface for business modules in real-time operations
 * Allows switching between all modules, walk-in only, reservation only, or specific modules
 */

"use client";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import { 
  LayoutGrid, 
  Car, 
  Zap, 
  Wrench, 
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { BusinessModule, getModuleConfig } from "../../types/business-modules";
import { Station } from "../management/StationStatusManager";

interface ModuleFilterTabsProps {
  stations: Station[];
  activeFilter: "all" | "walk-in" | "reservation" | BusinessModule;
  onFilterChange: (filter: "all" | "walk-in" | "reservation" | BusinessModule) => void;
}

export function ModuleFilterTabs({ 
  stations, 
  activeFilter, 
  onFilterChange 
}: ModuleFilterTabsProps) {
  // Count stations by type
  const counts = {
    all: stations.length,
    walkIn: stations.filter(s => s.operationModel === "walk-in").length,
    reservation: stations.filter(s => s.operationModel === "reservation").length,
    in_bay: stations.filter(s => s.businessModule === "in_bay").length,
    tunnel: stations.filter(s => s.businessModule === "tunnel").length,
    self_service: stations.filter(s => s.businessModule === "self_service").length,
    manual_detailing: stations.filter(s => s.businessModule === "manual_detailing").length,
  };

  // Active counts (occupied status)
  const activeCounts = {
    all: stations.filter(s => s.status === "occupied").length,
    walkIn: stations.filter(s => s.operationModel === "walk-in" && s.status === "occupied").length,
    reservation: stations.filter(s => s.operationModel === "reservation" && s.status === "occupied").length,
    in_bay: stations.filter(s => s.businessModule === "in_bay" && s.status === "occupied").length,
    tunnel: stations.filter(s => s.businessModule === "tunnel" && s.status === "occupied").length,
    self_service: stations.filter(s => s.businessModule === "self_service" && s.status === "occupied").length,
    manual_detailing: stations.filter(s => s.businessModule === "manual_detailing" && s.status === "occupied").length,
  };

  return (
    <div className="space-y-4">
      {/* Primary Filter: All / Walk-in / Reservation */}
      <Tabs value={activeFilter} onValueChange={(value: any) => onFilterChange(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="gap-2">
            <LayoutGrid size={16} />
            <span>All Modules</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {activeCounts.all}/{counts.all}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger value="walk-in" className="gap-2">
            <TrendingUp size={16} />
            <span>Walk-In</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {activeCounts.walkIn}/{counts.walkIn}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger value="reservation" className="gap-2">
            <Calendar size={16} />
            <span>Reservation</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {activeCounts.reservation}/{counts.reservation}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Secondary Filter: Specific Modules */}
      {(activeFilter === "all" || activeFilter === "walk-in" || activeFilter === "reservation") && (
        <div className="flex flex-wrap gap-2">
          <ModuleFilterButton
            module="in_bay"
            active={activeFilter === "in_bay"}
            count={counts.in_bay}
            activeCount={activeCounts.in_bay}
            onClick={() => onFilterChange("in_bay")}
            disabled={counts.in_bay === 0}
          />
          
          <ModuleFilterButton
            module="tunnel"
            active={activeFilter === "tunnel"}
            count={counts.tunnel}
            activeCount={activeCounts.tunnel}
            onClick={() => onFilterChange("tunnel")}
            disabled={counts.tunnel === 0}
          />
          
          <ModuleFilterButton
            module="self_service"
            active={activeFilter === "self_service"}
            count={counts.self_service}
            activeCount={activeCounts.self_service}
            onClick={() => onFilterChange("self_service")}
            disabled={counts.self_service === 0}
          />
          
          <ModuleFilterButton
            module="manual_detailing"
            active={activeFilter === "manual_detailing"}
            count={counts.manual_detailing}
            activeCount={activeCounts.manual_detailing}
            onClick={() => onFilterChange("manual_detailing")}
            disabled={counts.manual_detailing === 0}
          />
        </div>
      )}
    </div>
  );
}

interface ModuleFilterButtonProps {
  module: BusinessModule;
  active: boolean;
  count: number;
  activeCount: number;
  onClick: () => void;
  disabled?: boolean;
}

function ModuleFilterButton({ 
  module, 
  active, 
  count, 
  activeCount, 
  onClick, 
  disabled 
}: ModuleFilterButtonProps) {
  const config = getModuleConfig(module);
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all",
        "hover:shadow-md",
        active && "ring-2 ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed",
        active ? `${config.borderColor} ${config.bgColor}` : "border-neutral-200 bg-white hover:bg-neutral-50"
      )}
    >
      <div className={cn(
        "size-8 rounded-lg flex items-center justify-center",
        active ? config.bgColor : "bg-neutral-100"
      )}>
        <Icon size={16} className={active ? config.color : "text-neutral-600"} />
      </div>
      
      <div className="text-left">
        <p className={cn("text-sm font-medium", active ? config.color : "text-neutral-900")}>
          {config.name}
        </p>
        <p className="text-xs text-neutral-600">
          {activeCount} active • {count} total
        </p>
      </div>
      
      {activeCount > 0 && (
        <Badge 
          variant="secondary" 
          className={cn("ml-2", active && config.bgColor)}
        >
          {activeCount}
        </Badge>
      )}
    </button>
  );
}

/**
 * Compact version for mobile/sidebar
 */
export function CompactModuleFilter({ 
  stations, 
  activeFilter, 
  onFilterChange 
}: ModuleFilterTabsProps) {
  const modules: (BusinessModule | "all")[] = ["all", "in_bay", "tunnel", "self_service", "manual_detailing"];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {modules.map((module) => {
        const isAll = module === "all";
        const config = isAll ? null : getModuleConfig(module as BusinessModule);
        const Icon = isAll ? LayoutGrid : config!.icon;
        
        const count = isAll 
          ? stations.length 
          : stations.filter(s => s.businessModule === module).length;
        
        const activeCount = isAll
          ? stations.filter(s => s.status === "occupied").length
          : stations.filter(s => s.businessModule === module && s.status === "occupied").length;

        const isActive = activeFilter === module;

        return (
          <button
            key={module}
            onClick={() => onFilterChange(module as any)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all min-w-[80px]",
              isActive && "ring-2 ring-offset-2",
              isActive && !isAll ? `${config!.borderColor} ${config!.bgColor}` : "",
              isActive && isAll ? "border-blue-300 bg-blue-50" : "border-neutral-200 bg-white"
            )}
          >
            <div className={cn(
              "size-8 rounded-lg flex items-center justify-center",
              isActive && !isAll ? config!.bgColor : "",
              isActive && isAll ? "bg-blue-100" : "bg-neutral-100"
            )}>
              <Icon size={16} className={
                isActive && !isAll ? config!.color :
                isActive && isAll ? "text-blue-700" :
                "text-neutral-600"
              } />
            </div>
            <p className="text-xs font-medium truncate w-full text-center">
              {isAll ? "All" : config!.name.split(' ')[0]}
            </p>
            <Badge variant="secondary" className="text-xs">
              {activeCount}/{count}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
