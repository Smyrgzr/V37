/**
 * ALTERNATIVE SUGGESTION DIALOG
 * ==============================
 * 
 * Smart dialog for suggesting alternative time slots or services
 * when the requested time is not available
 */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { cn } from "../ui/utils";
import {
  Calendar,
  Clock,
  Sparkles,
  TrendingUp,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { Reservation } from "../../types/reservation";

interface AlternativeSlot {
  date: string;
  time: string;
  available: boolean;
  reason?: string;
}

interface AlternativeService {
  id: string;
  name: string;
  price: number;
  duration: number;
  savings?: number;
  upgrade?: boolean;
}

interface AlternativeSuggestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation | null;
  onSuggest: (data: SuggestionData) => void;
}

export interface SuggestionData {
  reservationId: string;
  alternativeSlots: AlternativeSlot[];
  alternativeServices: AlternativeService[];
  message: string;
}

export function AlternativeSuggestionDialog({
  open,
  onOpenChange,
  reservation,
  onSuggest,
}: AlternativeSuggestionDialogProps) {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");

  if (!reservation) return null;

  // Generate smart alternative slots
  const generateAlternativeSlots = (): AlternativeSlot[] => {
    const requestedDate = new Date(reservation.scheduledDate + "T" + reservation.scheduledStartTime);
    const alternatives: AlternativeSlot[] = [];

    // Same day, different times
    [-2, -1, 1, 2].forEach((hourOffset) => {
      const altDate = new Date(requestedDate);
      altDate.setHours(altDate.getHours() + hourOffset);
      
      if (altDate.getHours() >= 8 && altDate.getHours() < 18) {
        alternatives.push({
          date: altDate.toISOString().split("T")[0],
          time: altDate.toTimeString().slice(0, 5),
          available: true,
          reason: hourOffset < 0 ? "Earlier same day" : "Later same day",
        });
      }
    });

    // Next day, same time
    const nextDay = new Date(requestedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    alternatives.push({
      date: nextDay.toISOString().split("T")[0],
      time: reservation.scheduledStartTime,
      available: true,
      reason: "Next day availability",
    });

    return alternatives;
  };

  // Generate alternative services
  const generateAlternativeServices = (): AlternativeService[] => {
    const currentPrice = reservation.price;
    
    return [
      {
        id: "express-detail",
        name: "Express Detail (Faster)",
        price: currentPrice * 0.7,
        duration: 120,
        savings: currentPrice * 0.3,
      },
      {
        id: "premium-detail",
        name: "Premium Detail (Upgrade)",
        price: currentPrice * 1.3,
        duration: 180,
        upgrade: true,
      },
      {
        id: "standard-detail",
        name: "Standard Detail",
        price: currentPrice,
        duration: 150,
      },
    ];
  };

  const alternativeSlots = generateAlternativeSlots();
  const alternativeServices = generateAlternativeServices();

  const toggleSlot = (slotKey: string) => {
    const newSet = new Set(selectedSlots);
    if (newSet.has(slotKey)) {
      newSet.delete(slotKey);
    } else {
      newSet.add(slotKey);
    }
    setSelectedSlots(newSet);
  };

  const toggleService = (serviceId: string) => {
    const newSet = new Set(selectedServices);
    if (newSet.has(serviceId)) {
      newSet.delete(serviceId);
    } else {
      newSet.add(serviceId);
    }
    setSelectedServices(newSet);
  };

  const handleSuggest = () => {
    const selectedSlotData = alternativeSlots.filter((slot) =>
      selectedSlots.has(`${slot.date}-${slot.time}`)
    );

    const selectedServiceData = alternativeServices.filter((service) =>
      selectedServices.has(service.id)
    );

    onSuggest({
      reservationId: reservation.id,
      alternativeSlots: selectedSlotData,
      alternativeServices: selectedServiceData,
      message,
    });

    // Reset
    setSelectedSlots(new Set());
    setSelectedServices(new Set());
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles size={20} className="text-blue-600" />
            Suggest Alternatives
          </DialogTitle>
          <DialogDescription>
            Offer alternative time slots or services to {reservation.customer.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Request */}
          <div className="p-4 bg-neutral-50 border rounded-lg">
            <p className="text-sm font-semibold mb-2">Original Request:</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-neutral-500" />
                <span>{reservation.scheduledDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-neutral-500" />
                <span>{reservation.scheduledStartTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-neutral-500" />
                <span>${reservation.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={14} className="text-neutral-500" />
                <span>{reservation.duration} minutes</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Alternative Time Slots */}
          <div className="space-y-3">
            <Label className="text-base flex items-center gap-2">
              <Calendar size={16} />
              Alternative Time Slots
            </Label>
            <p className="text-sm text-neutral-600">
              Select one or more alternative times to suggest
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {alternativeSlots.map((slot, index) => {
                const slotKey = `${slot.date}-${slot.time}`;
                const isSelected = selectedSlots.has(slotKey);

                return (
                  <motion.button
                    key={slotKey}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleSlot(slotKey)}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all text-left",
                      isSelected
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                        : "border-neutral-200 hover:border-neutral-300"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span className="font-semibold text-sm">{slot.date}</span>
                      </div>
                      {isSelected && <CheckCircle size={16} className="text-blue-600" />}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} />
                      <span className="text-sm">{slot.time}</span>
                    </div>
                    {slot.reason && (
                      <p className="text-xs text-neutral-600">{slot.reason}</p>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Alternative Services */}
          <div className="space-y-3">
            <Label className="text-base flex items-center gap-2">
              <Sparkles size={16} />
              Alternative Services
            </Label>
            <p className="text-sm text-neutral-600">
              Suggest different service packages
            </p>

            <div className="space-y-3">
              {alternativeServices.map((service, index) => {
                const isSelected = selectedServices.has(service.id);

                return (
                  <motion.button
                    key={service.id}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleService(service.id)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 transition-all text-left",
                      isSelected
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                        : "border-neutral-200 hover:border-neutral-300"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{service.name}</p>
                          {service.savings && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Save ${service.savings.toFixed(0)}
                            </Badge>
                          )}
                          {service.upgrade && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              <TrendingUp size={12} className="mr-1" />
                              Upgrade
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-neutral-600">
                            <Clock size={12} />
                            {service.duration} min
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-green-700">
                            <DollarSign size={12} />
                            ${service.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {isSelected && <CheckCircle size={20} className="text-blue-600" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Custom Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a personal note explaining the alternatives..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-neutral-500">
              This message will be sent to the customer along with the alternatives
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSuggest}
              disabled={selectedSlots.size === 0 && selectedServices.size === 0}
              className="gap-2"
            >
              <Sparkles size={16} />
              Send Suggestions ({selectedSlots.size + selectedServices.size})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
