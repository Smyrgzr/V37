/**
 * MOBILE DETAILING DEMO
 * =====================
 * Quick demo component showcasing all mobile detailing features
 */

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { DirectionNavigator } from "./DirectionNavigator";
import { MobileCheckIn } from "./MobileCheckIn";
import { CustomerFeedback, FeedbackData } from "../feedback/CustomerFeedback";
import { MapPin, Navigation, Star } from "lucide-react";
import { generateMobileReservations } from "../../data/mockReservations";
import type { Reservation } from "../../types/reservation";
import { toast } from "sonner@2.0.3";

export function MobileDetailingDemo() {
  const [sampleReservations] = useState<Reservation[]>(
    generateMobileReservations(3)
  );
  
  const [selectedReservation, setSelectedReservation] = useState<Reservation>(
    sampleReservations[0]
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="size-12 rounded-lg bg-orange-100 flex items-center justify-center">
            <MapPin className="size-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Mobile Detailing Demo</h1>
            <p className="text-neutral-600">
              Interactive demo of all mobile detailing features
            </p>
          </div>
        </div>
        <Badge className="bg-orange-100 text-orange-700">
          New Feature - Phase 2.2
        </Badge>
      </div>

      {/* Reservation Selector */}
      <Card className="p-4">
        <p className="font-medium mb-3">Select Sample Reservation:</p>
        <div className="grid gap-2">
          {sampleReservations.map((res) => (
            <Button
              key={res.id}
              onClick={() => setSelectedReservation(res)}
              variant={selectedReservation.id === res.id ? "default" : "outline"}
              className="justify-start h-auto py-3"
            >
              <div className="text-left w-full">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{res.customer.name}</p>
                  <Badge variant="outline" className="ml-2">
                    {res.status}
                  </Badge>
                </div>
                <p className="text-xs text-neutral-600 mt-1">
                  {res.serviceLocation?.address}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Feature Tabs */}
      <Tabs defaultValue="navigation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="navigation">
            <Navigation className="size-4 mr-2" />
            Navigation
          </TabsTrigger>
          <TabsTrigger value="checkin">
            <MapPin className="size-4 mr-2" />
            Check-In
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <Star className="size-4 mr-2" />
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="navigation" className="mt-6">
          <DirectionNavigator
            reservation={selectedReservation}
            onStatusChange={(status) => {
              toast.success(`Worker status changed to: ${status}`);
            }}
            onArrival={() => {
              toast.success("Worker arrived at customer location!");
            }}
          />
        </TabsContent>

        <TabsContent value="checkin" className="mt-6">
          <MobileCheckIn
            reservation={selectedReservation}
            onCheckInSuccess={(method, photoUrl) => {
              toast.success(
                `Check-in successful via ${method.toUpperCase()}!`
              );
              console.log("Photo URL:", photoUrl);
            }}
            onCheckInFailed={(reason) => {
              toast.error(`Check-in failed: ${reason}`);
            }}
          />
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <CustomerFeedback
            reservation={selectedReservation}
            onSubmit={(feedback: FeedbackData) => {
              console.log("Feedback submitted:", feedback);
              toast.success(
                `Thank you for your ${feedback.rating}-star rating!`
              );
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Feature Info */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <MapPin className="size-5 text-blue-600" />
          Mobile Detailing Features
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="font-medium text-blue-900">✅ Direction Navigator</p>
            <p className="text-blue-700">
              Google Maps integration, travel time tracking
            </p>
          </div>
          <div>
            <p className="font-medium text-blue-900">✅ Worker Status</p>
            <p className="text-blue-700">
              idle → en-route → on-site → returning
            </p>
          </div>
          <div>
            <p className="font-medium text-blue-900">✅ On-Site Check-In</p>
            <p className="text-blue-700">Plate OCR, QR code, manual options</p>
          </div>
          <div>
            <p className="font-medium text-blue-900">✅ Customer Feedback</p>
            <p className="text-blue-700">Multi-dimensional rating system</p>
          </div>
          <div>
            <p className="font-medium text-blue-900">✅ Location Tracking</p>
            <p className="text-blue-700">Address, coordinates, distance</p>
          </div>
          <div>
            <p className="font-medium text-blue-900">✅ Travel Fee</p>
            <p className="text-blue-700">Distance-based pricing</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
