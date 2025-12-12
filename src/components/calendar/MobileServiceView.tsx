"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapPin, Navigation, Phone, Clock, CheckCircle } from "lucide-react";

interface MobileServiceViewProps {
  selectedDate: Date;
  branchId: string;
}

export function MobileServiceView({ selectedDate, branchId }: MobileServiceViewProps) {
  // Mock mobile service data
  const mobileServices = [
    {
      id: "m1",
      status: "in-progress",
      technicianName: "Alex Martinez",
      customerName: "Robert Johnson",
      customerPhone: "+1 234 567 8900",
      address: "123 Oak Street, Downtown",
      serviceName: "Full Mobile Detail",
      scheduledTime: "10:00 AM",
      estimatedDuration: 120,
      price: 180,
      startedAt: new Date("2024-12-11T10:15:00"),
      progress: 45,
    },
    {
      id: "m2",
      status: "en-route",
      technicianName: "Sarah Williams",
      customerName: "Emily Davis",
      customerPhone: "+1 234 567 8901",
      address: "456 Maple Avenue, Uptown",
      serviceName: "Express Wash & Wax",
      scheduledTime: "11:30 AM",
      estimatedDuration: 60,
      price: 90,
      eta: "10 min",
    },
    {
      id: "m3",
      status: "scheduled",
      technicianName: "Mike Chen",
      customerName: "David Wilson",
      customerPhone: "+1 234 567 8902",
      address: "789 Pine Road, Suburbia",
      serviceName: "Interior Deep Clean",
      scheduledTime: "2:00 PM",
      estimatedDuration: 90,
      price: 120,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Technician Locations & Routes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Interactive Map View</p>
              <p className="text-sm">Real-time technician tracking & route optimization</p>
              <p className="text-xs mt-2">(Map integration would be implemented here)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Mobile Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mobileServices.map(service => (
              <Card key={service.id} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      {/* Status & Time */}
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          service.status === "in-progress" ? "default" :
                          service.status === "en-route" ? "secondary" :
                          "outline"
                        }>
                          {service.status === "in-progress" ? "🔧 In Progress" :
                           service.status === "en-route" ? "🚗 En Route" :
                           "📅 Scheduled"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {service.scheduledTime}
                        </span>
                        {service.status === "en-route" && (
                          <Badge variant="outline">
                            <Navigation className="h-3 w-3 mr-1" />
                            ETA: {service.eta}
                          </Badge>
                        )}
                      </div>

                      {/* Customer & Location */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{service.customerName}</span>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-start gap-1 mt-1">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{service.address}</span>
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Service: </span>
                          <span>{service.serviceName}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration: </span>
                          <span>{service.estimatedDuration} min</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price: </span>
                          <span>${service.price}</span>
                        </div>
                      </div>

                      {/* Technician */}
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {service.technicianName.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span>{service.technicianName}</span>
                      </div>

                      {/* Progress (if in progress) */}
                      {service.status === "in-progress" && service.startedAt && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Started: {service.startedAt.toLocaleTimeString("en-US", { 
                                hour: "2-digit", 
                                minute: "2-digit" 
                              })}
                            </span>
                            <span>{service.progress}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all"
                              style={{ width: `${service.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 ml-4">
                      {service.status === "scheduled" && (
                        <Button size="sm">
                          <Navigation className="h-3 w-3 mr-1" />
                          Start Route
                        </Button>
                      )}
                      {service.status === "en-route" && (
                        <Button size="sm">
                          Arrive & Start
                        </Button>
                      )}
                      {service.status === "in-progress" && (
                        <Button size="sm">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
