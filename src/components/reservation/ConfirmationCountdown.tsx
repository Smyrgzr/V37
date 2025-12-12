import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

export interface ConfirmationCountdownProps {
  reservationId: string;
  reservationTime: string; // ISO date string
  status: "reserved" | "confirmed" | "cancelled";
  onAutoConfirm?: (reservationId: string) => void;
  onManualConfirm?: (reservationId: string) => void;
  onCancel?: (reservationId: string) => void;
}

export function ConfirmationCountdown({
  reservationId,
  reservationTime,
  status,
  onAutoConfirm,
  onManualConfirm,
  onCancel,
}: ConfirmationCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isPastDeadline, setIsPastDeadline] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const appointmentTime = new Date(reservationTime);
      const fourHoursBefore = new Date(appointmentTime.getTime() - 4 * 60 * 60 * 1000);
      const diff = fourHoursBefore.getTime() - now.getTime();

      if (diff <= 0 && status === "reserved") {
        setIsPastDeadline(true);
        setTimeRemaining(0);
        // Auto-confirm when deadline passes
        if (onAutoConfirm) {
          onAutoConfirm(reservationId);
        }
      } else {
        setTimeRemaining(diff);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [reservationId, reservationTime, status, onAutoConfirm]);

  const formatTime = (ms: number) => {
    if (ms <= 0) return "00:00:00";
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const getUrgencyLevel = (ms: number) => {
    const hours = ms / (1000 * 60 * 60);
    if (hours <= 1) return "critical";
    if (hours <= 6) return "warning";
    return "normal";
  };

  const urgencyLevel = getUrgencyLevel(timeRemaining);

  if (status === "confirmed") {
    return (
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center gap-3">
          <CheckCircle className="size-5 text-green-600" />
          <div className="flex-1">
            <p className="font-medium text-green-900">Confirmed</p>
            <p className="text-sm text-green-700">
              Customer confirmed their appointment
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (status === "cancelled") {
    return (
      <Card className="p-4 bg-red-50 border-red-200">
        <div className="flex items-center gap-3">
          <XCircle className="size-5 text-red-600" />
          <div className="flex-1">
            <p className="font-medium text-red-900">Cancelled</p>
            <p className="text-sm text-red-700">
              Reservation has been cancelled
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "p-4 border-2 transition-all",
        urgencyLevel === "critical" && "bg-red-50 border-red-300 animate-pulse",
        urgencyLevel === "warning" && "bg-amber-50 border-amber-300",
        urgencyLevel === "normal" && "bg-blue-50 border-blue-200"
      )}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {urgencyLevel === "critical" ? (
              <AlertTriangle className="size-5 text-red-600 mt-0.5" />
            ) : (
              <Clock className="size-5 text-blue-600 mt-0.5" />
            )}
            <div>
              <p className="font-medium text-neutral-900">
                {isPastDeadline
                  ? "Auto-Confirming..."
                  : "Confirmation Deadline"}
              </p>
              <p className="text-sm text-neutral-600">
                {isPastDeadline
                  ? "Automatically confirming reservation"
                  : "Customer must confirm or cancel"}
              </p>
            </div>
          </div>
        </div>

        {/* Countdown Display */}
        {!isPastDeadline && (
          <div className="bg-white rounded-lg p-4 border-2 border-neutral-200">
            <div className="flex items-center justify-center gap-2">
              <Clock
                className={cn(
                  "size-6",
                  urgencyLevel === "critical" && "text-red-600",
                  urgencyLevel === "warning" && "text-amber-600",
                  urgencyLevel === "normal" && "text-blue-600"
                )}
              />
              <span
                className={cn(
                  "text-3xl font-mono tabular-nums",
                  urgencyLevel === "critical" && "text-red-600",
                  urgencyLevel === "warning" && "text-amber-600",
                  urgencyLevel === "normal" && "text-blue-600"
                )}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            <p className="text-center text-sm text-neutral-600 mt-2">
              until auto-confirmation
            </p>
          </div>
        )}

        {/* Urgency Message */}
        {urgencyLevel === "critical" && !isPastDeadline && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-3">
            <p className="text-sm text-red-800 text-center">
              <strong>Critical:</strong> Less than 1 hour remaining! Reservation
              will be auto-confirmed.
            </p>
          </div>
        )}

        {urgencyLevel === "warning" && (
          <div className="bg-amber-100 border border-amber-300 rounded-lg p-3">
            <p className="text-sm text-amber-800 text-center">
              <strong>Warning:</strong> Less than 6 hours until auto-confirmation
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {!isPastDeadline && (
          <div className="flex gap-2">
            <Button
              onClick={() => onManualConfirm?.(reservationId)}
              variant="default"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="size-4 mr-2" />
              Confirm Now
            </Button>
            <Button
              onClick={() => onCancel?.(reservationId)}
              variant="outline"
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
            >
              <XCircle className="size-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
