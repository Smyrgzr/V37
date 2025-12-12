"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import {
  Home,
  Calendar,
  Radio,
  Target,
  Users,
  Megaphone,
  DollarSign,
  BarChart3,
  Building2,
  Package,
  UserPlus,
  Settings,
  ChevronDown,
  ChevronRight,
  MapPin,
  LogOut,
  Brain,
  Sparkles,
  Zap,
  Star,
  X,
  CheckCircle,
  Truck,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from "motion/react";

interface User {
  name: string;
  role: "root_owner" | "carwash_owner";
  email: string;
  centerName?: string;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  isActive: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  badge?: string | number;
  badgeVariant?: "default" | "ai" | "new" | "alert";
  children?: MenuItem[];
  category?: string;
}

interface MobileMenuBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  branches?: Branch[];
  selectedBranchFilter?: string;
  onBranchFilterChange?: (branchId: string) => void;
  aiInsightCount?: number;
  pendingRequests?: number;
  demoMode?: boolean;
  onDemoModeToggle?: () => void;
}

export function MobileMenuBottomSheet({
  isOpen,
  onClose,
  user,
  currentPage,
  onNavigate,
  onLogout,
  branches = [],
  selectedBranchFilter = "all",
  onBranchFilterChange,
  aiInsightCount = 0,
  pendingRequests = 0,
  demoMode = false,
  onDemoModeToggle,
}: MobileMenuBottomSheetProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Menu structure - Same as sidebar
  const menuStructure: Record<string, MenuItem[]> = {
    root_owner: [
      {
        id: "home",
        label: "Platform Overview",
        icon: Home,
        category: "main",
      },
      {
        id: "centers",
        label: "Car Wash Centers",
        icon: Building2,
        category: "main",
      },
      {
        id: "platform-users",
        label: "Platform Users",
        icon: UserPlus,
        badge: "NEW",
        badgeVariant: "new",
        category: "main",
      },
      {
        id: "ai-intelligence",
        label: "AI Intelligence",
        icon: Brain,
        badge: aiInsightCount > 0 ? aiInsightCount : undefined,
        badgeVariant: "ai",
        category: "ai",
        children: [
          { id: "ai-dashboard", label: "AI Dashboard", icon: Brain },
          { id: "ai-analytics", label: "Platform Analytics", icon: BarChart3 },
        ],
      },
      {
        id: "revenue",
        label: "Revenue & Billing",
        icon: DollarSign,
        category: "business",
      },
      {
        id: "settings",
        label: "Platform Settings",
        icon: Settings,
        category: "settings",
      },
    ],

    carwash_owner: [
      {
        id: "ai-intelligence",
        label: "AI Intelligence",
        icon: Brain,
        badge: aiInsightCount > 0 ? aiInsightCount : "AI",
        badgeVariant: "ai",
        category: "ai",
        children: [
          {
            id: "ai-dashboard",
            label: "AI Dashboard",
            icon: Brain,
          },
          {
            id: "ai-churn-prediction",
            label: "Churn Prediction",
            icon: Sparkles,
          },
          {
            id: "ai-dynamic-pricing",
            label: "Smart Pricing",
            icon: Zap,
          },
          {
            id: "ai-roi-calculator",
            label: "ROI Calculator",
            icon: DollarSign,
          },
        ],
      },
      {
        id: "branches",
        label: "Branches",
        icon: Building2,
        category: "settings",
      },
      {
        id: "service-management",
        label: "Services & Packages",
        icon: Package,
        category: "settings",
      },
      {
        id: "employees",
        label: "Team",
        icon: Users,
        category: "settings",
      },
      {
        id: "manage-account",
        label: "Account Settings",
        icon: Settings,
        category: "settings",
      },
    ],
  };

  const currentMenuItems = menuStructure[user.role] || [];

  // Badge styling
  const getBadgeStyles = (variant?: string) => {
    switch (variant) {
      case "ai":
        return "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0";
      case "new":
        return "bg-green-500 text-white border-0";
      case "alert":
        return "bg-red-500 text-white border-0";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] max-h-[85vh] flex flex-col safe-bottom"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <h2 className="font-semibold text-lg">Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1 px-6 py-4">
              {/* Menu Items */}
              <div className="space-y-2 mb-6">
                {currentMenuItems.map((item) => (
                  <div key={item.id}>
                    {item.children ? (
                      // Parent with children
                      <div>
                        <button
                          onClick={() => toggleSection(item.id)}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <item.icon size={20} className="text-neutral-600" />
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <Badge
                                className={cn(
                                  "text-[10px] px-1.5 py-0.5",
                                  getBadgeStyles(item.badgeVariant)
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <ChevronDown
                            size={16}
                            className={cn(
                              "transition-transform text-neutral-400",
                              expandedSections.includes(item.id) && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedSections.includes(item.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden ml-4"
                            >
                              <div className="space-y-1 mt-1">
                                {item.children.map((child) => (
                                  <button
                                    key={child.id}
                                    onClick={() => handleNavigate(child.id)}
                                    className={cn(
                                      "w-full flex items-center justify-between p-3 rounded-lg transition-colors",
                                      currentPage === child.id
                                        ? "bg-blue-100 text-blue-900"
                                        : "hover:bg-neutral-50"
                                    )}
                                  >
                                    <div className="flex items-center gap-3">
                                      <child.icon size={18} />
                                      <span className="text-sm">{child.label}</span>
                                      {child.badge && (
                                        <Badge
                                          className={cn(
                                            "text-[10px] px-1.5 py-0.5",
                                            getBadgeStyles(child.badgeVariant)
                                          )}
                                        >
                                          {child.badge}
                                        </Badge>
                                      )}
                                    </div>
                                    {currentPage === child.id && (
                                      <CheckCircle size={16} className="text-blue-600" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      // Single item
                      <button
                        onClick={() => handleNavigate(item.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg transition-colors",
                          currentPage === item.id
                            ? "bg-blue-100 text-blue-900"
                            : "hover:bg-neutral-50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={20} />
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge
                              className={cn(
                                "text-[10px] px-1.5 py-0.5",
                                getBadgeStyles(item.badgeVariant)
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {currentPage === item.id && (
                          <CheckCircle size={16} className="text-blue-600" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}