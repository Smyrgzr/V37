/**
 * MOBILE CHECK-IN - On-Site Verification
 * =======================================
 * Vehicle verification via plate photo + OCR or QR code
 * Specialized for Mobile Detailing workflow
 */

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Camera,
  QrCode,
  CheckCircle,
  XCircle,
  AlertCircle,
  Car,
  Upload,
  Scan,
} from "lucide-react";
import { cn } from "../ui/utils";
import type { Reservation, CheckInMethod } from "../../types/reservation";

export interface MobileCheckInProps {
  reservation: Reservation;
  onCheckInSuccess: (method: CheckInMethod, platePhotoUrl?: string) => void;
  onCheckInFailed?: (reason: string) => void;
}

export function MobileCheckIn({
  reservation,
  onCheckInSuccess,
  onCheckInFailed,
}: MobileCheckInProps) {
  const [checkInMethod, setCheckInMethod] = useState<CheckInMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedPlate, setCapturedPlate] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "failed" | null
  >(null);

  const handlePhotoCapture = () => {
    setCheckInMethod("ocr");
    setIsProcessing(true);

    // Simulate camera capture and OCR processing
    setTimeout(() => {
      // Mock OCR result - in real app, this would call OCR API
      const mockDetectedPlate = reservation.customer.vehiclePlate;
      setCapturedPlate(mockDetectedPlate);
      setPhotoPreview("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect fill='%23f3f4f6' width='200' height='100'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='system-ui' font-size='14'%3EPlate Photo%3C/text%3E%3C/svg%3E");
      
      // Verify plate matches
      if (mockDetectedPlate === reservation.customer.vehiclePlate) {
        setVerificationStatus("success");
        setIsProcessing(false);
      } else {
        setVerificationStatus("failed");
        setIsProcessing(false);
        onCheckInFailed?.("Plate number does not match reservation");
      }
    }, 2000);
  };

  const handleQRScan = () => {
    setCheckInMethod("qr");
    setIsProcessing(true);

    // Simulate QR code scanning
    setTimeout(() => {
      // Mock QR scan result
      const scannedCode = reservation.verificationCode;
      
      if (scannedCode === reservation.verificationCode) {
        setVerificationStatus("success");
        setIsProcessing(false);
      } else {
        setVerificationStatus("failed");
        setIsProcessing(false);
        onCheckInFailed?.("QR code does not match reservation");
      }
    }, 1500);
  };

  const handleManualEntry = () => {
    setCheckInMethod("manual");
    setVerificationStatus("success");
  };

  const handleConfirmCheckIn = () => {
    if (verificationStatus === "success" && checkInMethod) {
      onCheckInSuccess(checkInMethod, photoPreview || undefined);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Car className="size-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Vehicle Check-In</h3>
            <p className="text-sm text-neutral-600">
              Verify customer vehicle to start service
            </p>
          </div>
        </div>
      </div>

      {/* Customer & Vehicle Info */}
      <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-neutral-600 text-xs">Customer Name</p>
            <p className="font-medium">{reservation.customer.name}</p>
          </div>
          <div>
            <p className="text-neutral-600 text-xs">Vehicle</p>
            <p className="font-medium">{reservation.customer.vehicleModel}</p>
          </div>
          <div className="col-span-2">
            <p className="text-neutral-600 text-xs">Expected Plate Number</p>
            <p className="text-lg font-bold tracking-wider">
              {reservation.customer.vehiclePlate}
            </p>
          </div>
        </div>
      </div>

      {/* Check-In Methods */}
      {!checkInMethod && verificationStatus !== "success" && (
        <div className="space-y-3">
          <p className="text-sm font-medium mb-3">Choose Verification Method:</p>
          
          <Button
            onClick={handlePhotoCapture}
            variant="outline"
            className="w-full justify-start h-auto py-4"
            disabled={isProcessing}
          >
            <Camera className="size-5 mr-3 text-blue-600" />
            <div className="text-left">
              <p className="font-medium">Plate Photo + OCR</p>
              <p className="text-xs text-neutral-600">
                Take photo of license plate for automatic verification
              </p>
            </div>
          </Button>

          <Button
            onClick={handleQRScan}
            variant="outline"
            className="w-full justify-start h-auto py-4"
            disabled={isProcessing}
          >
            <QrCode className="size-5 mr-3 text-purple-600" />
            <div className="text-left">
              <p className="font-medium">Scan QR Code</p>
              <p className="text-xs text-neutral-600">
                Scan customer's reservation QR code
              </p>
            </div>
          </Button>

          <Button
            onClick={handleManualEntry}
            variant="outline"
            className="w-full justify-start h-auto py-4"
          >
            <Upload className="size-5 mr-3 text-neutral-600" />
            <div className="text-left">
              <p className="font-medium">Manual Verification</p>
              <p className="text-xs text-neutral-600">
                Manually verify and check in customer
              </p>
            </div>
          </Button>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="py-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-blue-50 rounded-lg">
            <Scan className="size-5 text-blue-600 animate-pulse" />
            <div className="text-left">
              <p className="font-medium text-blue-900">
                {checkInMethod === "ocr" ? "Processing plate photo..." : "Scanning QR code..."}
              </p>
              <p className="text-xs text-blue-600">Please wait</p>
            </div>
          </div>
        </div>
      )}

      {/* OCR Result */}
      {checkInMethod === "ocr" && capturedPlate && !isProcessing && (
        <div className="space-y-4">
          {photoPreview && (
            <div className="border rounded-lg overflow-hidden">
              <img
                src={photoPreview}
                alt="Plate capture"
                className="w-full h-32 object-cover bg-neutral-100"
              />
            </div>
          )}
          
          <div className="p-4 bg-neutral-50 rounded-lg">
            <p className="text-xs text-neutral-600 mb-1">Detected Plate</p>
            <p className="text-xl font-bold tracking-wider">{capturedPlate}</p>
          </div>
        </div>
      )}

      {/* Verification Result */}
      {verificationStatus === "success" && (
        <div className="mt-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="size-6 text-green-600 shrink-0" />
              <div>
                <p className="font-medium text-green-900">Verification Successful</p>
                <p className="text-sm text-green-700">
                  {checkInMethod === "ocr" && "Plate number matched"}
                  {checkInMethod === "qr" && "QR code verified"}
                  {checkInMethod === "manual" && "Manual verification confirmed"}
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleConfirmCheckIn} className="w-full bg-green-600 hover:bg-green-700">
            <CheckCircle className="size-4 mr-2" />
            Confirm Check-In & Start Service
          </Button>
        </div>
      )}

      {verificationStatus === "failed" && (
        <div className="mt-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <div className="flex items-center gap-3">
              <XCircle className="size-6 text-red-600 shrink-0" />
              <div>
                <p className="font-medium text-red-900">Verification Failed</p>
                <p className="text-sm text-red-700">
                  The captured information doesn't match the reservation
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                setCheckInMethod(null);
                setVerificationStatus(null);
                setCapturedPlate(null);
                setPhotoPreview(null);
              }}
              variant="outline"
              className="flex-1"
            >
              Try Again
            </Button>
            <Button
              onClick={handleManualEntry}
              variant="default"
              className="flex-1"
            >
              Manual Check-In
            </Button>
          </div>
        </div>
      )}

      {/* Service Info */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-neutral-600">Service</p>
            <p className="font-medium">{reservation.services[0]?.name}</p>
          </div>
          <div className="text-right">
            <p className="text-neutral-600">Duration</p>
            <p className="font-medium">{reservation.totalDuration} min</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
