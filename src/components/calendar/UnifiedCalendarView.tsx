"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Car, 
  Zap, 
  Wrench, 
  Truck, 
  Users, 
  PackageOpen,
  Calendar,
  Clock,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { BusinessModule } from "../modules/BusinessModuleSelector";

// Import sub-components (we'll create these next)
import { ReservationGridView } from "./ReservationGridView";
import { WalkInCardView } from "./WalkInCardView";
import { MobileServiceView } from "./MobileServiceView";

export type CalendarModule = 
  | "in_bay" 
  | "tunnel" 
  | "self_service" 
  | "manual_detailing" 
  | "mobile" 
  | "pickup_dropoff_detailing";

interface UnifiedCalendarViewProps {
  branchId: string;
  branchName: string;
}

export function UnifiedCalendarView({ branchId, branchName }: UnifiedCalendarViewProps) {
  const [selectedModule, setSelectedModule] = useState<CalendarModule>("manual_detailing");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Module configuration
  const moduleConfig = {
    in_bay: {
      label: "In-Bay Automatic",
      icon: Car,
      type: "walk-in" as const,
      color: "blue",
    },
    tunnel: {
      label: "Tunnel Wash",
      icon: Zap,
      type: "walk-in" as const,
      color: "purple",
    },
    self_service: {
      label: "Self-Service",
      icon: Wrench,
      type: "walk-in" as const,
      color: "green",
    },
    manual_detailing: {
      label: "Manual Detailing",
      icon: Users,
      type: "reservation" as const,
      color: "orange",
    },
    mobile: {
      label: "Mobile Service",
      icon: Truck,
      type: "mobile" as const,
      color: "indigo",
    },
    pickup_dropoff_detailing: {
      label: "Pick-up & Drop-off",
      icon: PackageOpen,
      type: "reservation" as const,
      color: "pink",
    },
  };

  const currentConfig = moduleConfig[selectedModule];
  const ModuleIcon = currentConfig.icon;

  // Date navigation
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const goToPreviousDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const goToNextDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Unified Calendar & Bookings
          </h2>
          <p className="text-muted-foreground mt-1">
            {branchName} - Real-time service management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Date Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousDay}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-center min-w-[300px]">
                <div className="flex items-center gap-2 justify-center">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(selectedDate)}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextDay}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            {!isToday && (
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Module Tabs */}
      <Tabs value={selectedModule} onValueChange={(value) => setSelectedModule(value as CalendarModule)}>
        <TabsList className="grid grid-cols-6 w-full">
          {Object.entries(moduleConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline">{config.label}</span>
                <span className="lg:hidden">{config.label.split(" ")[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Module Content */}
        <div className="mt-6">
          {/* Walk-in Modules */}
          {currentConfig.type === "walk-in" && (
            <TabsContent value={selectedModule} className="m-0">
              <WalkInCardView
                module={selectedModule}
                moduleLabel={currentConfig.label}
                selectedDate={selectedDate}
                branchId={branchId}
              />
            </TabsContent>
          )}

          {/* Reservation Modules */}
          {currentConfig.type === "reservation" && (
            <TabsContent value={selectedModule} className="m-0">
              <ReservationGridView
                module={selectedModule}
                moduleLabel={currentConfig.label}
                selectedDate={selectedDate}
                branchId={branchId}
              />
            </TabsContent>
          )}

          {/* Mobile Service Module */}
          {currentConfig.type === "mobile" && (
            <TabsContent value={selectedModule} className="m-0">
              <MobileServiceView
                selectedDate={selectedDate}
                branchId={branchId}
              />
            </TabsContent>
          )}
        </div>
      </Tabs>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ModuleIcon className="h-5 w-5" />
            {currentConfig.label} - Today's Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-muted-foreground">Active Services</div>
              <div className="text-2xl">3</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Completed</div>
              <div className="text-2xl">12</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Revenue</div>
              <div className="text-2xl">$560</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Utilization</div>
              <div className="text-2xl">67%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
