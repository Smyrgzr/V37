"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
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
  ChevronLeft,
  ChevronRight,
  Plus,
  MapPin,
  LogOut,
  Brain,
  Sparkles,
  Zap,
  AlertCircle,
  Bell,
  Menu,
  X,
  ClipboardCheck,
  Activity,
  Truck,
  Star,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from "motion/react";
import { MobileMenuBottomSheet } from "../mobile/MobileMenuBottomSheet";

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

interface ModernAdminSidebarProps {
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

export function ModernAdminSidebar({
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
}: ModernAdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["operations"]);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle section expansion - Only expand, don't collapse
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId) // Already expanded, close it
        : [...prev, sectionId] // Not expanded, add it
    );
  };

  // Menu structure - Task-based, Frequency-ordered
  const menuStructure: Record<string, MenuItem[]> = {
    // ROOT OWNER Menu
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

    // CARWASH OWNER Menu
    carwash_owner: [
      // 🏠 HOME / DASHBOARD
      {
        id: "dashboard",
        label: "Dashboard",
        icon: Home,
        category: "main",
      },
      
      // 📅 OPERATIONS (Günlük)
      {
        id: "calendar",
        label: "Operations",
        icon: Radio,
        badge: pendingRequests > 0 ? pendingRequests : undefined,
        badgeVariant: "alert",
        category: "main",
      },

      // 💼 BUSINESS (Haftalık - Collapsed)
      {
        id: "business",
        label: "Business",
        icon: DollarSign,
        category: "business",
        children: [
          {
            id: "customer-hub",
            label: "Customers",
            icon: Users,
          },
          {
            id: "reviews",
            label: "Reviews & Feedback",
            icon: Star,
          },
          {
            id: "dynamic-pricing",
            label: "Dynamic Pricing",
            icon: Zap,
            badge: "NEW",
            badgeVariant: "new",
          },
          {
            id: "campaigns",
            label: "Marketing & Campaigns",
            icon: Megaphone,
          },
          {
            id: "revenue",
            label: "Revenue & Pricing",
            icon: DollarSign,
          },
          {
            id: "analytics",
            label: "Analytics & Reports",
            icon: BarChart3,
          },
        ],
      },

      // 🤖 AI INTELLIGENCE (Sürekli erişim)
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

      // ⚙️ SETUP & SETTINGS (Nadir - Collapsed)
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        category: "settings",
        children: [
          {
            id: "branches",
            label: "Branches",
            icon: Building2,
          },
          {
            id: "service-management",
            label: "Services & Packages",
            icon: Package,
          },
          {
            id: "employees",
            label: "Team",
            icon: Users,
          },
          {
            id: "manage-account",
            label: "Account Settings",
            icon: Settings,
          },
        ],
      },
    ],
  };

  const currentMenuItems = menuStructure[user.role] || [];

  // Badge styling
  const getBadgeStyles = (variant?: string) => {
    switch (variant) {
      case "ai":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "new":
        return "bg-green-100 text-green-700 border-green-200";
      case "alert":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  // Render menu item
  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const Icon = item.icon;
    const isActive = currentPage === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.id);

    // Parent item (with children)
    if (hasChildren) {
      return (
        <div key={item.id} className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-9 px-3 rounded-lg",
              isCollapsed && "justify-center px-0",
              isExpanded && "bg-neutral-100/50"
            )}
            onClick={() => toggleSection(item.id)}
          >
            <Icon size={18} className="shrink-0" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge
                    variant="outline"
                    className={cn("text-xs h-5 px-1.5", getBadgeStyles(item.badgeVariant))}
                  >
                    {item.badge}
                  </Badge>
                )}
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform",
                    isExpanded && "rotate-180"
                  )}
                />
              </>
            )}
          </Button>

          {/* Children */}
          <AnimatePresence>
            {isExpanded && !isCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden space-y-1 ml-3 border-l-2 border-neutral-200 pl-3"
              >
                {item.children?.map((child) => renderMenuItem(child, depth + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // Leaf item (no children)
    return (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 h-9 px-3 rounded-lg",
          isCollapsed && "justify-center px-0",
          isActive && "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700",
          depth > 0 && !isActive && "text-neutral-600"
        )}
        onClick={() => {
          onNavigate(item.id);
          setIsMobileOpen(false);
        }}
      >
        <Icon size={18} className="shrink-0" />
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <Badge
                variant="outline"
                className={cn("text-xs h-5 px-1.5", getBadgeStyles(item.badgeVariant))}
              >
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Button>
    );
  };

  // Branch selector
  const handleBranchSelect = (branchId: string) => {
    if (onBranchFilterChange) {
      onBranchFilterChange(branchId);
    }
    setShowBranchDropdown(false);
  };

  const selectedBranch = branches.find((b) => b.id === selectedBranchFilter);

  // Desktop sidebar content
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-neutral-200">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        {/* Branch/Platform Selector */}
        {user.role === "root_owner" ? (
          <div className="px-3 py-2.5 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-purple-600" />
              {!isCollapsed && (
                <div>
                  <p className="text-xs font-semibold text-purple-900">Letwash Platform</p>
                  <p className="text-[10px] text-purple-600">ROOT OWNER</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Desktop: Dropdown Menu */}
            <DropdownMenu open={!isMobile && showBranchDropdown} onOpenChange={setShowBranchDropdown}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between h-auto min-h-[48px] px-3 py-2",
                    isCollapsed && "justify-center"
                  )}
                  onClick={() => {
                    if (isMobile) {
                      setShowBranchDropdown(true);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Building2 size={16} className="shrink-0" />
                    {!isCollapsed && (
                      <div className="text-left min-w-0">
                        <p className="text-xs font-semibold truncate">
                          {selectedBranchFilter === "all"
                            ? "All Branches"
                            : selectedBranch?.name || "Select Branch"}
                        </p>
                        <p className="text-[10px] text-neutral-600">
                          {branches.length} {branches.length === 1 ? "branch" : "branches"}
                        </p>
                      </div>
                    )}
                  </div>
                  {!isCollapsed && <ChevronDown size={14} className="shrink-0" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <div className="px-3 py-2 border-b">
                  <p className="text-xs font-semibold">Select Branch</p>
                  <p className="text-[10px] text-neutral-600">Choose a branch or view all</p>
                </div>

                <DropdownMenuItem onSelect={() => {
                  handleBranchSelect("all");
                  setShowBranchDropdown(false);
                }}>
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className={cn(
                        "size-2.5 rounded-full border-2",
                        selectedBranchFilter === "all"
                          ? "bg-blue-600 border-blue-600"
                          : "border-neutral-300"
                      )}
                    />
                    <span className="text-xs font-medium">All Branches</span>
                  </div>
                </DropdownMenuItem>

                <ScrollArea className="max-h-48">
                  {branches.map((branch) => (
                    <DropdownMenuItem key={branch.id} onSelect={() => {
                      handleBranchSelect(branch.id);
                      setShowBranchDropdown(false);
                    }}>
                      <div className="flex items-center gap-2 w-full">
                        <div
                          className={cn(
                            "size-2.5 rounded-full border-2",
                            selectedBranchFilter === branch.id
                              ? "bg-blue-600 border-blue-600"
                              : "border-neutral-300"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{branch.name}</p>
                          <p className="text-[10px] text-neutral-600 truncate">
                            {branch.address}, {branch.city}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "size-2 rounded-full",
                            branch.isActive ? "bg-green-500" : "bg-neutral-400"
                          )}
                        />
                      </div>
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>

                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => {
                  onNavigate("add-branch");
                  setShowBranchDropdown(false);
                }}>
                  <Plus size={14} className="mr-2" />
                  <span className="text-xs">Add New Branch</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => {
                  onNavigate("branches");
                  setShowBranchDropdown(false);
                }}>
                  <MapPin size={14} className="mr-2" />
                  <span className="text-xs">Manage Branches</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile: Branch Bottom Sheet */}
            <AnimatePresence>
              {isMobile && showBranchDropdown && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-[60]"
                    onClick={() => setShowBranchDropdown(false)}
                  />
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
                        setShowBranchDropdown(false);
                      }
                    }}
                    className="fixed bottom-0 left-0 right-0 z-[60] rounded-t-3xl bg-white shadow-2xl max-h-[70vh] flex flex-col"
                  >
                    {/* Drag Handle */}
                    <div className="pt-3 pb-2 flex justify-center">
                      <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
                    </div>

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-neutral-200">
                      <h3 className="font-semibold">Select Branch</h3>
                      <p className="text-xs text-neutral-600">Choose a branch or view all</p>
                    </div>

                    {/* Branch List - Scrollable */}
                    <ScrollArea className="flex-1 px-4 py-2">
                      <button
                        className="w-full p-4 rounded-xl border-2 border-neutral-200 mb-2 text-left active:border-blue-400"
                        onClick={() => {
                          handleBranchSelect("all");
                          setShowBranchDropdown(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "size-4 rounded-full border-2",
                              selectedBranchFilter === "all"
                                ? "bg-blue-600 border-blue-600"
                                : "border-neutral-300"
                            )}
                          />
                          <span className="font-medium">All Branches</span>
                        </div>
                      </button>

                      {branches.map((branch) => (
                        <button
                          key={branch.id}
                          className="w-full p-4 rounded-xl border-2 border-neutral-200 mb-2 text-left active:border-blue-400"
                          onClick={() => {
                            handleBranchSelect(branch.id);
                            setShowBranchDropdown(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "size-4 rounded-full border-2",
                                selectedBranchFilter === branch.id
                                  ? "bg-blue-600 border-blue-600"
                                  : "border-neutral-300"
                              )}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{branch.name}</p>
                              <p className="text-xs text-neutral-600 truncate">
                                {branch.address}, {branch.city}
                              </p>
                            </div>
                            <div
                              className={cn(
                                "size-3 rounded-full",
                                branch.isActive ? "bg-green-500" : "bg-neutral-400"
                              )}
                            />
                          </div>
                        </button>
                      ))}
                    </ScrollArea>

                    {/* Actions */}
                    <div className="p-4 border-t border-neutral-200 space-y-2 pb-safe">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          onNavigate("add-branch");
                          setShowBranchDropdown(false);
                          setIsMobileOpen(false);
                        }}
                      >
                        <Plus size={16} className="mr-2" />
                        Add New Branch
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          onNavigate("branches");
                          setShowBranchDropdown(false);
                          setIsMobileOpen(false);
                        }}
                      >
                        <MapPin size={16} className="mr-2" />
                        Manage Branches
                      </Button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {currentMenuItems.map((item) => renderMenuItem(item))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-neutral-200">
        {/* Demo Mode Toggle - Always visible in Settings area */}
        {onDemoModeToggle && (
          <div className="mb-3 p-3 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className={cn("text-purple-600", demoMode && "animate-pulse")} />
                {!isCollapsed && (
                  <span className="text-xs font-semibold text-purple-900">Demo Mode</span>
                )}
              </div>
              <Badge 
                variant={demoMode ? "default" : "outline"}
                className={cn(
                  "text-[10px] px-1.5 py-0.5",
                  demoMode && "bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse"
                )}
              >
                {demoMode ? "LIVE" : "OFF"}
              </Badge>
            </div>
            {!isCollapsed && (
              <>
                <p className="text-[10px] text-purple-700 mb-2">
                  {demoMode 
                    ? "Auto-refresh • Simulated data" 
                    : "Enable for live simulation"}
                </p>
                <Button
                  variant={demoMode ? "default" : "outline"}
                  size="sm"
                  onClick={onDemoModeToggle}
                  className={cn(
                    "w-full text-xs h-7",
                    demoMode && "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  )}
                >
                  {demoMode ? "Exit Demo" : "Activate Demo"}
                </Button>
              </>
            )}
          </div>
        )}

        <DropdownMenu open={!isMobile && showUserDropdown} onOpenChange={(open) => {
          if (!isMobile) {
            setShowUserDropdown(open);
          }
        }}>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "w-full p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors",
                isCollapsed && "justify-center"
              )}
              onClick={(e) => {
                if (isMobile) {
                  e.preventDefault();
                  setShowUserDropdown(true);
                }
              }}
            >
              {!isCollapsed ? (
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-blue-700">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs font-semibold truncate">{user.name}</p>
                    <p className="text-[10px] text-neutral-600 capitalize">
                      {user.role.replace("_", " ")}
                    </p>
                  </div>
                  <ChevronDown size={14} className="shrink-0" />
                </div>
              ) : (
                <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-700">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => onNavigate("manage-account")}>
              <Settings size={16} className="mr-2" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut size={16} className="mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile: User Bottom Sheet */}
        <AnimatePresence>
          {isMobile && showUserDropdown && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[60]"
                onClick={() => setShowUserDropdown(false)}
              />
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
                    setShowUserDropdown(false);
                  }
                }}
                className="fixed bottom-0 left-0 right-0 z-[60] rounded-t-3xl bg-white shadow-2xl max-h-[50vh] flex flex-col"
              >
                {/* Drag Handle */}
                <div className="pt-3 pb-2 flex justify-center">
                  <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
                </div>

                {/* User Info */}
                <div className="px-6 py-4 border-b border-neutral-200">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-neutral-600 capitalize">
                        {user.role.replace("_", " ")}
                      </p>
                      {user.email && (
                        <p className="text-xs text-neutral-500 mt-0.5">{user.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 space-y-2 pb-safe">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12"
                    onClick={() => {
                      onNavigate("manage-account");
                      setShowUserDropdown(false);
                      setIsMobileOpen(false);
                    }}
                  >
                    <Settings size={18} className="mr-3" />
                    Account Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      onLogout();
                      setShowUserDropdown(false);
                      setIsMobileOpen(false);
                    }}
                  >
                    <LogOut size={18} className="mr-3" />
                    Log out
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse Toggle (Desktop) */}
      {!isCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border bg-white shadow-sm hover:bg-neutral-100"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:block h-screen transition-all duration-300 relative bg-white",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile: Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-30 safe-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-col h-auto py-2 gap-1",
              currentPage === "calendar" && "text-blue-600"
            )}
            onClick={() => onNavigate("calendar")}
          >
            <Home size={20} />
            <span className="text-[10px]">Home</span>
            {pendingRequests > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[8px] bg-red-500">
                {pendingRequests}
              </Badge>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-col h-auto py-2 gap-1",
              currentPage === "customer-hub" && "text-blue-600"
            )}
            onClick={() => onNavigate("customer-hub")}
          >
            <Users size={20} />
            <span className="text-[10px]">Customers</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-col h-auto py-2 gap-1",
              (currentPage === "revenue" || currentPage === "campaigns" || currentPage === "dynamic-pricing" || currentPage === "reviews") && "text-blue-600"
            )}
            onClick={() => onNavigate("revenue")}
          >
            <DollarSign size={20} />
            <span className="text-[10px]">Business</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-col h-auto py-2 gap-1",
              currentPage === "analytics" && "text-blue-600"
            )}
            onClick={() => onNavigate("analytics")}
          >
            <BarChart3 size={20} />
            <span className="text-[10px]">Analytics</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 gap-1"
            onClick={() => setShowMobileMenu(true)}
          >
            <MoreHorizontal size={20} />
            <span className="text-[10px]">More</span>
          </Button>
        </div>
      </div>

      {/* Mobile: Menu Bottom Sheet */}
      <MobileMenuBottomSheet
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        user={user}
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
        branches={branches}
        selectedBranchFilter={selectedBranchFilter}
        onBranchFilterChange={onBranchFilterChange}
        aiInsightCount={aiInsightCount}
        pendingRequests={pendingRequests}
        demoMode={demoMode}
        onDemoModeToggle={onDemoModeToggle}
      />
    </>
  );
}