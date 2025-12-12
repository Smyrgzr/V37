"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Play, CheckCircle, XCircle, Clock, DollarSign, CreditCard, Wrench } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { CalendarModule } from "./UnifiedCalendarView";

type WalkInStatus = "pending" | "in-progress" | "completed" | "cancelled";

interface WalkInService {
  id: string;
  type: "walk-in";
  status: WalkInStatus;
  stationId: string;
  stationName: string;
  customerName?: string;
  vehiclePlate?: string;
  serviceName: string;
  serviceDuration: number;
  price: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  progress?: number;
  paymentMethod?: "cash" | "card" | "app";
  paymentStatus: "pending" | "paid";
}

interface Station {
  id: string;
  name: string;
  isAvailable: boolean;
  maintenanceUntil?: Date;
  currentService?: WalkInService;
}

interface WalkInCardViewProps {
  module: CalendarModule;
  moduleLabel: string;
  selectedDate: Date;
  branchId: string;
}

export function WalkInCardView({ module, moduleLabel, selectedDate, branchId }: WalkInCardViewProps) {
  // Mock stations data
  const [stations, setStations] = useState<Station[]>([
    { id: "bay1", name: "Bay 1", isAvailable: true },
    { id: "bay2", name: "Bay 2", isAvailable: true },
    { id: "bay3", name: "Bay 3", isAvailable: true },
    { id: "bay4", name: "Bay 4", isAvailable: false, maintenanceUntil: new Date("2024-12-11T14:00:00") },
  ]);

  const [walkInServices, setWalkInServices] = useState<WalkInService[]>([
    {
      id: "w1",
      type: "walk-in",
      status: "in-progress",
      stationId: "bay1",
      stationName: "Bay 1",
      customerName: "John Smith",
      vehiclePlate: "34 XYZ 789",
      serviceName: "Premium Wash",
      serviceDuration: 20,
      price: 45,
      createdAt: new Date("2024-12-11T11:40:00"),
      startedAt: new Date("2024-12-11T11:40:00"),
      progress: 75,
      paymentMethod: "card",
      paymentStatus: "paid",
    },
    {
      id: "w2",
      type: "walk-in",
      status: "pending",
      stationId: "bay2",
      stationName: "Bay 2",
      customerName: "Sarah Lee",
      vehiclePlate: "34 ABC 456",
      serviceName: "Basic Wash",
      serviceDuration: 15,
      price: 25,
      createdAt: new Date("2024-12-11T11:52:00"),
      paymentMethod: "cash",
      paymentStatus: "pending",
    },
  ]);

  const [completedToday, setCompletedToday] = useState([
    {
      id: "c1",
      customerName: "Mike Brown",
      serviceName: "Basic Wash",
      stationName: "Bay 1",
      startTime: "11:15 AM",
      endTime: "11:32 AM",
      price: 25,
    },
    {
      id: "c2",
      customerName: "Lisa White",
      serviceName: "Deluxe Wash",
      stationName: "Bay 2",
      startTime: "10:50 AM",
      endTime: "11:15 AM",
      price: 65,
    },
  ]);

  const [isAddWalkInOpen, setIsAddWalkInOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<string>("");

  // Get service for a station
  const getStationService = (stationId: string) => {
    return walkInServices.find(s => s.stationId === stationId && (s.status === "pending" || s.status === "in-progress"));
  };

  // Handle start service
  const handleStartService = (serviceId: string) => {
    setWalkInServices(prev => prev.map(s => 
      s.id === serviceId ? { ...s, status: "in-progress" as WalkInStatus, startedAt: new Date() } : s
    ));
    toast.success("Service started!");
  };

  // Handle complete service
  const handleCompleteService = (serviceId: string) => {
    const service = walkInServices.find(s => s.id === serviceId);
    if (!service) return;

    setWalkInServices(prev => prev.filter(s => s.id !== serviceId));
    
    const now = new Date();
    setCompletedToday(prev => [{
      id: serviceId,
      customerName: service.customerName || "Walk-in Customer",
      serviceName: service.serviceName,
      stationName: service.stationName,
      startTime: service.startedAt?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) || "-",
      endTime: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      price: service.price,
    }, ...prev]);

    toast.success("Service completed!");
  };

  // Handle add walk-in
  const handleAddWalkIn = (stationId: string) => {
    setSelectedStation(stationId);
    setIsAddWalkInOpen(true);
  };

  const handleSaveWalkIn = (formData: any) => {
    const station = stations.find(s => s.id === selectedStation);
    if (!station) return;

    const newService: WalkInService = {
      id: `w${walkInServices.length + 1}`,
      type: "walk-in",
      status: "pending",
      stationId: selectedStation,
      stationName: station.name,
      customerName: formData.customerName,
      vehiclePlate: formData.vehiclePlate,
      serviceName: formData.serviceName,
      serviceDuration: parseInt(formData.duration),
      price: parseInt(formData.price),
      createdAt: new Date(),
      paymentMethod: formData.paymentMethod,
      paymentStatus: "pending",
    };

    setWalkInServices(prev => [...prev, newService]);
    setIsAddWalkInOpen(false);
    toast.success("Walk-in customer added!");
  };

  // Calculate elapsed time
  const getElapsedTime = (startedAt: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startedAt.getTime()) / 1000 / 60);
    return diff;
  };

  // Get estimated completion
  const getEstimatedCompletion = (startedAt: Date, duration: number) => {
    const completion = new Date(startedAt.getTime() + duration * 60000);
    return completion.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-6">
      {/* Station Cards */}
      <Card>
        <CardHeader>
          <CardTitle>{moduleLabel} - Real-time Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {stations.map(station => {
              const service = getStationService(station.id);

              return (
                <Card key={station.id} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span>{station.name}</span>
                      {!station.isAvailable && (
                        <Badge variant="secondary">
                          <Wrench className="h-3 w-3 mr-1" />
                          Maintenance
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {!station.isAvailable ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Wrench className="h-8 w-8 mx-auto mb-2" />
                        <div>Back online:</div>
                        <div>
                          {station.maintenanceUntil?.toLocaleTimeString("en-US", { 
                            hour: "2-digit", 
                            minute: "2-digit" 
                          })}
                        </div>
                      </div>
                    ) : service ? (
                      <div className="space-y-3">
                        {/* Status Badge */}
                        <Badge variant={service.status === "in-progress" ? "default" : "secondary"}>
                          {service.status === "pending" ? "🚶 PENDING" : "🚶 IN PROGRESS"}
                        </Badge>

                        {/* Customer Info */}
                        <div>
                          <div>{service.customerName || "Walk-in Customer"}</div>
                          {service.vehiclePlate && (
                            <div className="text-sm text-muted-foreground">{service.vehiclePlate}</div>
                          )}
                        </div>

                        {/* Service Info */}
                        <div>
                          <div>{service.serviceName}</div>
                          <div className="text-sm text-muted-foreground">
                            ${service.price} · {service.serviceDuration} min
                          </div>
                        </div>

                        {/* Status-specific info */}
                        {service.status === "pending" ? (
                          <div className="text-sm">
                            <div className="text-muted-foreground">
                              Added: {service.createdAt.toLocaleTimeString("en-US", { 
                                hour: "2-digit", 
                                minute: "2-digit" 
                              })}
                            </div>
                            <div className="flex items-center gap-1 text-amber-600 mt-1">
                              <Clock className="h-3 w-3" />
                              Waiting to start...
                            </div>
                          </div>
                        ) : service.startedAt && (
                          <div className="space-y-2">
                            <div className="text-sm">
                              <div className="text-muted-foreground">
                                Started: {service.startedAt.toLocaleTimeString("en-US", { 
                                  hour: "2-digit", 
                                  minute: "2-digit" 
                                })}
                              </div>
                              <div className="text-muted-foreground">
                                Elapsed: {getElapsedTime(service.startedAt)} min
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-1">
                              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${service.progress || 0}%` }}
                                />
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {service.progress}% · Est: {getEstimatedCompletion(service.startedAt, service.serviceDuration)}
                              </div>
                            </div>

                            {/* Payment */}
                            <div className="text-sm flex items-center gap-2">
                              <CreditCard className="h-3 w-3" />
                              <span className="capitalize">{service.paymentMethod}</span>
                              <Badge variant={service.paymentStatus === "paid" ? "default" : "secondary"} className="ml-auto">
                                {service.paymentStatus}
                              </Badge>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          {service.status === "pending" ? (
                            <>
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleStartService(service.id)}
                              >
                                <Play className="h-3 w-3 mr-1" />
                                Start Service
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setWalkInServices(prev => prev.filter(s => s.id !== service.id));
                                  toast.info("Service cancelled");
                                }}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleCompleteService(service.id)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Complete
                              </Button>
                              <Button variant="outline" size="sm">
                                Notes
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-muted-foreground mb-4">
                          <div>Ready to</div>
                          <div>serve</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddWalkIn(station.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Walk-in
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Completed Today */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Completed Today ({completedToday.length} services)
            </span>
            <span className="text-muted-foreground">
              Total Revenue: ${completedToday.reduce((sum, s) => sum + s.price, 0)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {completedToday.slice(0, 3).map(service => (
              <div 
                key={service.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>{service.customerName}</span>
                    <span className="text-muted-foreground">·</span>
                    <span>{service.serviceName}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {service.stationName} · {service.startTime}-{service.endTime}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span>${service.price}</span>
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </div>
            ))}
            {completedToday.length > 3 && (
              <Button variant="outline" className="w-full">
                View All History →
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Walk-in Dialog */}
      <AddWalkInDialog
        isOpen={isAddWalkInOpen}
        onClose={() => setIsAddWalkInOpen(false)}
        onSave={handleSaveWalkIn}
        stationName={stations.find(s => s.id === selectedStation)?.name || ""}
      />
    </div>
  );
}

// Add Walk-in Dialog Component
function AddWalkInDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  stationName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (data: any) => void;
  stationName: string;
}) {
  const [formData, setFormData] = useState({
    customerName: "",
    vehiclePlate: "",
    serviceName: "",
    duration: "20",
    price: "45",
    paymentMethod: "cash",
  });

  const handleSubmit = () => {
    onSave(formData);
    setFormData({
      customerName: "",
      vehiclePlate: "",
      serviceName: "",
      duration: "20",
      price: "45",
      paymentMethod: "cash",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Walk-in Customer - {stationName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Customer Name (Optional)</Label>
            <Input
              placeholder="John Doe"
              value={formData.customerName}
              onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
            />
          </div>
          <div>
            <Label>Vehicle Plate (Optional)</Label>
            <Input
              placeholder="34 ABC 123"
              value={formData.vehiclePlate}
              onChange={(e) => setFormData(prev => ({ ...prev, vehiclePlate: e.target.value }))}
            />
          </div>
          <div>
            <Label>Service Type</Label>
            <Select 
              value={formData.serviceName}
              onValueChange={(value) => setFormData(prev => ({ ...prev, serviceName: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic Wash">Basic Wash - $25</SelectItem>
                <SelectItem value="Premium Wash">Premium Wash - $45</SelectItem>
                <SelectItem value="Deluxe Wash">Deluxe Wash - $65</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Duration (min)</Label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <Label>Payment Method</Label>
            <Select 
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="app">Mobile App</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Add Customer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
