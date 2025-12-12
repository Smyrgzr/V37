"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Plus,
  X,
  Calendar,
  Users,
  Megaphone,
  MessageSquare,
  Phone,
  AlertCircle,
  Zap,
  DollarSign,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from "motion/react";

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}

interface QuickActionsButtonProps {
  onAction: (actionId: string) => void;
}

export function QuickActionsButton({ onAction }: QuickActionsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const quickActions: QuickAction[] = [
    {
      id: "new-booking",
      label: "New Booking",
      description: "Schedule appointment",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "walk-in-customer",
      label: "Walk-in Customer",
      description: "Quick check-in",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "new-campaign",
      label: "New Campaign",
      description: "Create promotion",
      icon: Megaphone,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: "send-message",
      label: "Send Message",
      description: "Email/SMS blast",
      icon: MessageSquare,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      id: "call-support",
      label: "Emergency Support",
      description: "Get immediate help",
      icon: Phone,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: "quick-note",
      label: "Quick Note",
      description: "Add reminder",
      icon: AlertCircle,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
  ];

  const handleAction = (actionId: string) => {
    onAction(actionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button - Draggable */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        dragConstraints={{
          top: -window.innerHeight + 200,
          left: -window.innerWidth + 100,
          right: 0,
          bottom: 0,
        }}
        onDragEnd={(e, info) => {
          setPosition({ x: info.offset.x, y: info.offset.y });
        }}
        className="fixed bottom-24 right-6 z-40 cursor-move"
        style={{ x: position.x, y: position.y }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          size="lg"
          className={cn(
            "size-16 rounded-full shadow-2xl transition-all duration-300",
            isOpen
              ? "bg-red-500 hover:bg-red-600 rotate-45"
              : "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </Button>
      </motion.div>

      {/* Actions Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Card - Desktop: Floating | Mobile: Bottom Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-24 right-6 z-40 w-80 md:block hidden"
            >
              <Card className="shadow-2xl border-2 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Quick Actions</h3>
                      <p className="text-xs text-white/80">Choose an action to perform</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Actions Grid */}
                <div className="p-4 grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "p-4 rounded-lg border-2 border-neutral-200 hover:border-blue-300 hover:shadow-md transition-all text-left group",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        )}
                        onClick={() => handleAction(action.id)}
                      >
                        <div className="space-y-2">
                          <div
                            className={cn(
                              "size-10 rounded-lg flex items-center justify-center mb-2 transition-transform group-hover:scale-110",
                              action.bgColor
                            )}
                          >
                            <Icon size={20} className={action.color} />
                          </div>
                          <h4 className="font-semibold text-sm">{action.label}</h4>
                          <p className="text-xs text-neutral-600">{action.description}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Footer */}
                <Separator />
                <div className="p-3 bg-neutral-50 text-center">
                  <p className="text-xs text-neutral-600">
                    Or use <kbd className="px-1.5 py-0.5 bg-white rounded border text-[10px]">Cmd+K</kbd> for more options
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Mobile: Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) {
                  setIsOpen(false);
                }
              }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-40 rounded-t-3xl bg-white shadow-2xl max-h-[85vh] flex flex-col"
            >
              {/* Drag Handle */}
              <div className="pt-3 pb-2 flex justify-center">
                <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 mx-4 mt-2 rounded-2xl p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Quick Actions</h3>
                    <p className="text-xs text-white/80">Choose an action to perform</p>
                  </div>
                </div>
              </div>

              {/* Actions Grid - Scrollable */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="grid grid-cols-2 gap-3 pb-safe">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "p-4 rounded-xl border-2 border-neutral-200 active:border-blue-400 active:shadow-lg transition-all text-left",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        )}
                        onClick={() => handleAction(action.id)}
                      >
                        <div className="space-y-2">
                          <div
                            className={cn(
                              "size-10 rounded-lg flex items-center justify-center mb-2",
                              action.bgColor
                            )}
                          >
                            <Icon size={20} className={action.color} />
                          </div>
                          <h4 className="font-semibold text-sm">{action.label}</h4>
                          <p className="text-xs text-neutral-600">{action.description}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Footer with safe area */}
              <div className="p-4 bg-neutral-50 text-center border-t border-neutral-200 pb-safe">
                <p className="text-xs text-neutral-600">
                  Or use search for more options
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}