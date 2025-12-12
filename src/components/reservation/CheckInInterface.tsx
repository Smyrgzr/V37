/**
 * CHECK-IN INTERFACE
 * ==================
 * 
 * Multi-method check-in system for reservations
 * Supports: QR code scan, license plate OCR, manual check-in
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { cn } from "../ui/utils";
import {
  QrCode,
  Camera,
  Search,
  CheckCircle,
  User,
  Car,
  Clock,
  MapPin,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { Reservation } from "../../types/reservation";

interface CheckInInterfaceProps {
  reservations: Reservation[];
  onCheckIn: (reservationId: string, method: "qr" | "ocr" | "manual") => void;
}

export function CheckInInterface({
  reservations,
  onCheckIn,
}: CheckInInterfaceProps) {
  const [checkInMethod, setCheckInMethod] = useState<"qr" | "ocr" | "manual">("qr");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [scanningQR, setScanningQR] = useState(false);
  const [scanningPlate, setScanningPlate] = useState(false);

  // Filter reservations ready for check-in
  const eligibleReservations = reservations.filter(
    (r) => r.status === "confirmed" && r.scheduledDate === new Date().toISOString().split("T")[0]
  );

  // Search reservations
  const searchResults = eligibleReservations.filter((r) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      r.customer.name.toLowerCase().includes(query) ||
      r.customer.phone?.includes(query) ||
      r.vehicle.plate.toLowerCase().includes(query) ||
      r.confirmationCode?.toLowerCase().includes(query)
    );
  });

  // Simulate QR code scan
  const simulateQRScan = () => {
    setScanningQR(true);
    setTimeout(() => {
      if (eligibleReservations.length > 0) {
        setSelectedReservation(eligibleReservations[0]);
      }
      setScanningQR(false);
    }, 2000);
  };

  // Simulate OCR plate scan
  const simulatePlateScan = () => {
    setScanningPlate(true);
    setTimeout(() => {
      if (eligibleReservations.length > 0) {
        setSelectedReservation(eligibleReservations[0]);
        setSearchQuery(eligibleReservations[0].vehicle.plate);
      }
      setScanningPlate(false);
    }, 2000);
  };

  const handleCheckIn = () => {
    if (selectedReservation) {
      onCheckIn(selectedReservation.id, checkInMethod);
      setSelectedReservation(null);
      setSearchQuery("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Customer Check-In</h2>
        <p className="text-sm text-neutral-600 mt-1">
          Check in customers using QR code, plate recognition, or manual search
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{eligibleReservations.length}</p>
                <p className="text-xs text-neutral-600">Ready for Check-in</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {reservations.filter((r) => r.status === "checked-in").length}
                </p>
                <p className="text-xs text-neutral-600">Checked In</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Sparkles size={20} className="text-purple-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {reservations.filter((r) => r.status === "in-progress").length}
                </p>
                <p className="text-xs text-neutral-600">In Service</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Check-in Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Check-In Methods</CardTitle>
          <CardDescription>Choose how to check in the customer</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={checkInMethod} onValueChange={(v: any) => setCheckInMethod(v)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="qr" className="gap-2">
                <QrCode size={16} />
                QR Code
              </TabsTrigger>
              <TabsTrigger value="ocr" className="gap-2">
                <Camera size={16} />
                Plate Scan
              </TabsTrigger>
              <TabsTrigger value="manual" className="gap-2">
                <Search size={16} />
                Manual Search
              </TabsTrigger>
            </TabsList>

            {/* QR Code Scan */}
            <TabsContent value="qr" className="space-y-4">
              <div className="text-center py-8">
                {scanningQR ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="size-24 mx-auto"
                    >
                      <QrCode size={96} className="text-blue-600" />
                    </motion.div>
                    <p className="font-semibold">Scanning QR code...</p>
                    <p className="text-sm text-neutral-600">
                      Position the QR code in front of the camera
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <QrCode size={96} className="mx-auto text-neutral-300" />
                    <p className="font-semibold">Scan Customer QR Code</p>
                    <p className="text-sm text-neutral-600">
                      Customer should present their reservation QR code
                    </p>
                    <Button onClick={simulateQRScan} className="gap-2">
                      <QrCode size={16} />
                      Start QR Scanner (Demo)
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* OCR Plate Scan */}
            <TabsContent value="ocr" className="space-y-4">
              <div className="text-center py-8">
                {scanningPlate ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="size-24 mx-auto"
                    >
                      <Camera size={96} className="text-green-600" />
                    </motion.div>
                    <p className="font-semibold">Scanning license plate...</p>
                    <p className="text-sm text-neutral-600">
                      Point camera at vehicle's license plate
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <Camera size={96} className="mx-auto text-neutral-300" />
                    <p className="font-semibold">Scan License Plate</p>
                    <p className="text-sm text-neutral-600">
                      AI-powered OCR will automatically detect the plate number
                    </p>
                    <Button onClick={simulatePlateScan} className="gap-2">
                      <Camera size={16} />
                      Start Plate Scanner (Demo)
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Manual Search */}
            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <Input
                    placeholder="Search by name, phone, plate, or confirmation code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {searchQuery && (
                  <div className="space-y-2">
                    {searchResults.length > 0 ? (
                      searchResults.map((reservation) => (
                        <motion.button
                          key={reservation.id}
                          type="button"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => setSelectedReservation(reservation)}
                          className={cn(
                            "w-full p-4 rounded-lg border-2 transition-all text-left",
                            selectedReservation?.id === reservation.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-neutral-200 hover:border-neutral-300"
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <User size={20} className="text-blue-700" />
                              </div>
                              <div>
                                <p className="font-semibold">{reservation.customer.name}</p>
                                <p className="text-sm text-neutral-600">{reservation.customer.phone}</p>
                                <div className="flex items-center gap-2 mt-1 text-sm">
                                  <Car size={12} />
                                  <span>
                                    {reservation.vehicle.brand} {reservation.vehicle.model} • {reservation.vehicle.plate}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {reservation.scheduledStartTime}
                            </Badge>
                          </div>
                        </motion.button>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle size={48} className="mx-auto text-neutral-300 mb-2" />
                        <p className="text-neutral-600">No reservations found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Selected Reservation Details */}
      {selectedReservation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2 border-green-500 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600" />
                Ready to Check In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Customer</p>
                  <p className="font-semibold">{selectedReservation.customer.name}</p>
                  <p className="text-sm text-neutral-600">{selectedReservation.customer.phone}</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-600 mb-1">Vehicle</p>
                  <p className="font-semibold">
                    {selectedReservation.vehicle.brand} {selectedReservation.vehicle.model}
                  </p>
                  <p className="text-sm text-neutral-600">{selectedReservation.vehicle.plate}</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-600 mb-1">Scheduled Time</p>
                  <p className="font-semibold">{selectedReservation.scheduledStartTime}</p>
                  <p className="text-sm text-neutral-600">{selectedReservation.duration} min</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-600 mb-1">Station</p>
                  <p className="font-semibold">{selectedReservation.stationId}</p>
                  <p className="text-sm text-neutral-600">${selectedReservation.price.toFixed(2)}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setSelectedReservation(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCheckIn} className="gap-2">
                  <CheckCircle size={16} />
                  Confirm Check-In
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
