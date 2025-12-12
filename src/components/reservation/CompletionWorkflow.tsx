import { useState } from "react";
import {
  CheckCircle,
  Camera,
  FileSignature,
  CreditCard,
  Upload,
  X,
  Star,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "../ui/utils";
import type { Reservation } from "../../types/reservation";

export interface CompletionData {
  photos: string[];
  qualityRating: number;
  notes: string;
  customerSignature?: string;
  paymentMethod?: "cash" | "card" | "online";
  paymentAmount: number;
  completionTime: string;
}

export interface CompletionWorkflowProps {
  reservation: Reservation;
  onComplete: (data: CompletionData) => void;
  onCancel: () => void;
}

export function CompletionWorkflow({
  reservation,
  onComplete,
  onCancel,
}: CompletionWorkflowProps) {
  const [currentStep, setCurrentStep] = useState<
    "photos" | "quality" | "signature" | "payment"
  >("photos");
  const [photos, setPhotos] = useState<string[]>([]);
  const [qualityRating, setQualityRating] = useState(5);
  const [notes, setNotes] = useState("");
  const [customerSignature, setCustomerSignature] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "online">();

  const handlePhotoUpload = () => {
    // Simulate photo upload - in real app, would use file input
    const mockPhoto = `https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop`;
    setPhotos([...photos, mockPhoto]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSignature = () => {
    // Simulate signature capture - in real app, would use canvas
    setCustomerSignature("data:image/png;base64,signature_placeholder");
  };

  const canProceed = () => {
    switch (currentStep) {
      case "photos":
        return photos.length >= 2; // Require at least 2 photos
      case "quality":
        return qualityRating > 0;
      case "signature":
        return !!customerSignature;
      case "payment":
        return !!paymentMethod;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === "photos") setCurrentStep("quality");
    else if (currentStep === "quality") setCurrentStep("signature");
    else if (currentStep === "signature") setCurrentStep("payment");
  };

  const handleFinish = () => {
    if (!paymentMethod) return;

    const completionData: CompletionData = {
      photos,
      qualityRating,
      notes,
      customerSignature,
      paymentMethod,
      paymentAmount: reservation.finalPrice,
      completionTime: new Date().toISOString(),
    };

    onComplete(completionData);
  };

  const steps = [
    { id: "photos", label: "Photos", icon: Camera },
    { id: "quality", label: "Quality Check", icon: CheckCircle },
    { id: "signature", label: "Signature", icon: FileSignature },
    { id: "payment", label: "Payment", icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = index < currentStepIndex;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    "size-10 rounded-full flex items-center justify-center transition-all",
                    isCompleted &&
                      "bg-green-100 text-green-600 border-2 border-green-500",
                    isActive &&
                      "bg-blue-100 text-blue-600 border-2 border-blue-500 ring-4 ring-blue-100",
                    !isActive &&
                      !isCompleted &&
                      "bg-neutral-100 text-neutral-400 border-2 border-neutral-300"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="size-5" />
                  ) : (
                    <Icon className="size-5" />
                  )}
                </div>
                <p
                  className={cn(
                    "text-xs mt-2 text-center",
                    isActive && "text-blue-700 font-semibold",
                    isCompleted && "text-green-700 font-medium",
                    !isActive && !isCompleted && "text-neutral-500"
                  )}
                >
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 transition-all",
                    isCompleted ? "bg-green-500" : "bg-neutral-300"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <Card className="p-6">
        {currentStep === "photos" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Service Photos</h3>
              <p className="text-sm text-neutral-600">
                Upload at least 2 photos showing the completed service
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Service photo ${index + 1}`}
                    className="w-full aspect-video object-cover rounded-lg border-2 border-neutral-200"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={handlePhotoUpload}
                className="aspect-video rounded-lg border-2 border-dashed border-neutral-300 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 text-neutral-600 hover:text-blue-600"
              >
                <Upload className="size-6" />
                <span className="text-sm">Upload Photo</span>
              </button>
            </div>

            {photos.length < 2 && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="size-5 text-amber-600 mt-0.5" />
                <p className="text-sm text-amber-800">
                  At least 2 photos are required to proceed
                </p>
              </div>
            )}
          </div>
        )}

        {currentStep === "quality" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Quality Check</h3>
              <p className="text-sm text-neutral-600">
                Rate the quality of the completed service
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 py-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setQualityRating(rating)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "size-12",
                      rating <= qualityRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-none text-neutral-300"
                    )}
                  />
                </button>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-neutral-900">
                {qualityRating === 5 && "Excellent!"}
                {qualityRating === 4 && "Very Good"}
                {qualityRating === 3 && "Good"}
                {qualityRating === 2 && "Fair"}
                {qualityRating === 1 && "Needs Improvement"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any observations or special notes about the service..."
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
          </div>
        )}

        {currentStep === "signature" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Customer Signature</h3>
              <p className="text-sm text-neutral-600">
                Capture customer's signature to confirm satisfaction
              </p>
            </div>

            {!customerSignature ? (
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8">
                <div className="flex flex-col items-center gap-4">
                  <FileSignature className="size-16 text-neutral-400" />
                  <p className="text-sm text-neutral-600 text-center">
                    Customer will sign on the device or paper
                  </p>
                  <Button onClick={handleSignature} variant="default">
                    Capture Signature
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">
                        Signature Captured
                      </p>
                      <p className="text-sm text-green-700">
                        {reservation.customer.name} - {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setCustomerSignature(undefined)}
                  variant="outline"
                  className="w-full"
                >
                  Re-capture Signature
                </Button>
              </div>
            )}
          </div>
        )}

        {currentStep === "payment" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Payment</h3>
              <p className="text-sm text-neutral-600">
                Select payment method and confirm transaction
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Service Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${reservation.finalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-700">
                Payment Method:
              </p>
              <div className="grid grid-cols-3 gap-3">
                {(["cash", "card", "online"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={cn(
                      "p-4 border-2 rounded-lg transition-all",
                      paymentMethod === method
                        ? "border-blue-500 bg-blue-50"
                        : "border-neutral-300 hover:border-blue-300"
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <CreditCard
                        className={cn(
                          "size-6",
                          paymentMethod === method
                            ? "text-blue-600"
                            : "text-neutral-600"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium capitalize",
                          paymentMethod === method
                            ? "text-blue-700"
                            : "text-neutral-700"
                        )}
                      >
                        {method}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {!paymentMethod && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="size-5 text-amber-600 mt-0.5" />
                <p className="text-sm text-amber-800">
                  Please select a payment method to complete the transaction
                </p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
        {currentStep !== "payment" ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            variant="default"
            className="flex-1"
          >
            Next Step
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            disabled={!canProceed()}
            variant="default"
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="size-4 mr-2" />
            Complete Service
          </Button>
        )}
      </div>
    </div>
  );
}

export function CompletionWorkflowDialog({
  open,
  onOpenChange,
  reservation,
  onComplete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation | null;
  onComplete: (reservationId: string, data: CompletionData) => void;
}) {
  if (!reservation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Service - {reservation.customer.name}</DialogTitle>
        </DialogHeader>
        <CompletionWorkflow
          reservation={reservation}
          onComplete={(data) => {
            onComplete(reservation.id, data);
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}