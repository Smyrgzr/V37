"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Badge } from "../ui/badge";
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
  Settings,
  Plus,
  Search,
  Brain,
  Sparkles,
  Zap,
  AlertCircle,
  FileText,
  Clock,
  TrendingUp,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { cn } from "../ui/utils";

interface CommandPaletteProps {
  onNavigate: (page: string) => void;
  onAction?: (action: string) => void;
  currentRole: "root_owner" | "carwash_owner";
}

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: any;
  type: "navigation" | "action" | "recent" | "customer" | "booking";
  badge?: string;
  keywords?: string[];
  category?: string;
}

export function CommandPalette({ onNavigate, onAction, currentRole }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [recentPages, setRecentPages] = useState<string[]>([]);

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      // Also trigger with /
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  // Navigation commands - Carwash Owner
  const carwashNavigationCommands: CommandItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Today's operations overview",
      icon: Home,
      type: "navigation",
      keywords: ["home", "overview", "today"],
      category: "Main",
    },
    {
      id: "calendar",
      label: "Calendar & Bookings",
      description: "Manage appointments and schedule",
      icon: Calendar,
      type: "navigation",
      keywords: ["bookings", "appointments", "schedule"],
      category: "Operations",
    },
    {
      id: "operations",
      label: "Live Operations",
      description: "Real-time bay and service status",
      icon: Radio,
      type: "navigation",
      badge: "LIVE",
      keywords: ["live", "real-time", "bays", "status"],
      category: "Operations",
    },
    {
      id: "capacity-planning",
      label: "Capacity Planning",
      description: "Optimize slot utilization",
      icon: Target,
      type: "navigation",
      keywords: ["capacity", "utilization", "slots"],
      category: "Operations",
    },
    {
      id: "customer-hub",
      label: "Customers",
      description: "Manage customer database",
      icon: Users,
      type: "navigation",
      keywords: ["customers", "clients", "contacts"],
      category: "Business",
    },
    {
      id: "campaigns",
      label: "Marketing & Campaigns",
      description: "Create and manage promotions",
      icon: Megaphone,
      type: "navigation",
      keywords: ["marketing", "campaigns", "promotions", "email"],
      category: "Business",
    },
    {
      id: "revenue",
      label: "Revenue & Pricing",
      description: "Financial overview and pricing",
      icon: DollarSign,
      type: "navigation",
      keywords: ["revenue", "money", "pricing", "finance"],
      category: "Business",
    },
    {
      id: "analytics",
      label: "Analytics & Reports",
      description: "Performance metrics and insights",
      icon: BarChart3,
      type: "navigation",
      keywords: ["analytics", "reports", "metrics", "stats"],
      category: "Business",
    },
    {
      id: "ai-dashboard",
      label: "AI Intelligence",
      description: "Smart insights and recommendations",
      icon: Brain,
      type: "navigation",
      badge: "AI",
      keywords: ["ai", "insights", "recommendations", "smart"],
      category: "AI",
    },
    {
      id: "ai-churn-prediction",
      label: "Churn Prediction",
      description: "Identify at-risk customers",
      icon: Sparkles,
      type: "navigation",
      keywords: ["churn", "retention", "at-risk"],
      category: "AI",
    },
    {
      id: "ai-dynamic-pricing",
      label: "Smart Pricing",
      description: "AI-powered pricing optimization",
      icon: Zap,
      type: "navigation",
      keywords: ["pricing", "dynamic", "smart", "optimization"],
      category: "AI",
    },
    {
      id: "branches",
      label: "Branches",
      description: "Manage locations and branches",
      icon: Building2,
      type: "navigation",
      keywords: ["branches", "locations", "centers"],
      category: "Settings",
    },
    {
      id: "service-management",
      label: "Services & Packages",
      description: "Configure offerings and pricing",
      icon: Package,
      type: "navigation",
      keywords: ["services", "packages", "offerings"],
      category: "Settings",
    },
    {
      id: "employees",
      label: "Team",
      description: "Staff and permissions",
      icon: Users,
      type: "navigation",
      keywords: ["employees", "staff", "team", "users"],
      category: "Settings",
    },
    {
      id: "manage-account",
      label: "Account Settings",
      description: "Profile and platform settings",
      icon: Settings,
      type: "navigation",
      keywords: ["settings", "account", "profile", "preferences"],
      category: "Settings",
    },
  ];

  // Quick actions
  const quickActions: CommandItem[] = [
    {
      id: "create-booking",
      label: "Create New Booking",
      description: "Add a new appointment",
      icon: Plus,
      type: "action",
      keywords: ["new", "booking", "appointment", "schedule"],
      category: "Quick Actions",
    },
    {
      id: "create-customer",
      label: "Add New Customer",
      description: "Register a new customer",
      icon: Plus,
      type: "action",
      keywords: ["new", "customer", "register"],
      category: "Quick Actions",
    },
    {
      id: "create-campaign",
      label: "Create Campaign",
      description: "Launch a new promotion",
      icon: Plus,
      type: "action",
      keywords: ["new", "campaign", "promotion", "marketing"],
      category: "Quick Actions",
    },
    {
      id: "view-revenue",
      label: "View Today's Revenue",
      description: "Check current earnings",
      icon: DollarSign,
      type: "action",
      keywords: ["revenue", "earnings", "money", "today"],
      category: "Quick Actions",
    },
    {
      id: "check-capacity",
      label: "Check Current Capacity",
      description: "View bay utilization",
      icon: Target,
      type: "action",
      keywords: ["capacity", "utilization", "bays"],
      category: "Quick Actions",
    },
  ];

  // Mock recent items (normally from localStorage/context)
  const recentItems: CommandItem[] = [
    {
      id: "recent-booking-1234",
      label: "Booking #1234 - John Doe",
      description: "Today 10:00 AM • Premium Wash",
      icon: Calendar,
      type: "recent",
      category: "Recent",
    },
    {
      id: "recent-customer-john",
      label: "Customer: John Doe",
      description: "Last visit: 2 days ago",
      icon: Users,
      type: "recent",
      category: "Recent",
    },
  ];

  // Mock customer search results
  const mockCustomers: CommandItem[] = [
    {
      id: "customer-john",
      label: "John Doe",
      description: "+1 555-0123 • john@example.com",
      icon: Users,
      type: "customer",
      keywords: ["john", "doe"],
      category: "Customers",
    },
    {
      id: "customer-sarah",
      label: "Sarah Smith",
      description: "+1 555-0124 • Active Subscription",
      icon: Users,
      type: "customer",
      keywords: ["sarah", "smith"],
      category: "Customers",
    },
  ];

  // Mock booking search results
  const mockBookings: CommandItem[] = [
    {
      id: "booking-1234",
      label: "Booking #1234",
      description: "John Doe • Today 10:00 AM",
      icon: Calendar,
      type: "booking",
      keywords: ["1234"],
      category: "Bookings",
    },
  ];

  // Combine all commands
  const allCommands = [
    ...carwashNavigationCommands,
    ...quickActions,
    ...recentItems,
    ...mockCustomers,
    ...mockBookings,
  ];

  // Handle command selection
  const handleSelect = (command: CommandItem) => {
    if (command.type === "navigation") {
      onNavigate(command.id);
      // Track recent pages
      setRecentPages((prev) => [command.id, ...prev.filter((p) => p !== command.id)].slice(0, 5));
    } else if (command.type === "action" && onAction) {
      onAction(command.id);
    } else if (command.type === "recent" || command.type === "customer" || command.type === "booking") {
      // Handle specific item actions
      onNavigate(command.id.split("-")[0]); // Navigate to relevant page
    }
    setOpen(false);
  };

  // Group commands by category
  const groupedCommands = allCommands.reduce((acc, command) => {
    const category = command.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(command);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Recent Items */}
        {recentItems.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {recentItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.label}
                  onSelect={() => handleSelect(item)}
                  className="flex items-center gap-3 py-3"
                >
                  <div className="size-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-neutral-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.label}</p>
                    {item.description && (
                      <p className="text-xs text-neutral-600 truncate">{item.description}</p>
                    )}
                  </div>
                  <Clock size={14} className="text-neutral-400 shrink-0" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Main Commands by Category */}
        {Object.entries(groupedCommands)
          .filter(([category]) => category !== "Recent" && category !== "Customers" && category !== "Bookings")
          .map(([category, commands]) => (
            <div key={category}>
              <CommandGroup heading={category}>
                {commands.map((command) => {
                  const Icon = command.icon;
                  return (
                    <CommandItem
                      key={command.id}
                      value={`${command.label} ${command.keywords?.join(" ") || ""}`}
                      onSelect={() => handleSelect(command)}
                      className="flex items-center gap-3 py-3"
                    >
                      <div
                        className={cn(
                          "size-8 rounded-lg flex items-center justify-center shrink-0",
                          command.badge === "AI" && "bg-gradient-to-br from-purple-100 to-blue-100",
                          command.badge === "LIVE" && "bg-green-100",
                          !command.badge && "bg-neutral-100"
                        )}
                      >
                        <Icon
                          size={16}
                          className={cn(
                            command.badge === "AI" && "text-purple-600",
                            command.badge === "LIVE" && "text-green-600",
                            !command.badge && "text-neutral-600"
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{command.label}</p>
                          {command.badge && (
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[10px] h-4 px-1.5",
                                command.badge === "AI" && "bg-purple-100 text-purple-700",
                                command.badge === "LIVE" && "bg-green-100 text-green-700"
                              )}
                            >
                              {command.badge}
                            </Badge>
                          )}
                        </div>
                        {command.description && (
                          <p className="text-xs text-neutral-600 truncate">{command.description}</p>
                        )}
                      </div>
                      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-neutral-100 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">↵</span>
                      </kbd>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </div>
          ))}

        {/* Footer hint */}
        <div className="px-2 py-3 text-xs text-neutral-500 text-center border-t">
          <p>
            Press <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded">Cmd+K</kbd> or{" "}
            <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded">/</kbd> to open
          </p>
        </div>
      </CommandList>
    </CommandDialog>
  );
}
