"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  BarChart3,
  DollarSign,
  Users,
  Settings,
  ChevronDown,
  LogOut,
  Plus,
  MapPin,
  Megaphone,
  Star,
  ChevronLeft,
  ChevronRight,
  Globe,
  Package,
  UserPlus,
  Radio,
  Zap,
  User,
  Target,
  Brain,
  Sparkles,
} from "lucide-react";
import { cn } from "../ui/utils";
import { toast } from "sonner@2.0.3";

interface User {
  name: string;
  role: "root_owner" | "carwash_owner";
  email: string;
  centerName?: string;
  provider?: string;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  email: string;
  description: string;
  isActive: boolean;
  operatingHours: any;
  totalStaff: number;
  servicesCount: number;
  packagesCount: number;
  createdDate: string;
}

interface AdminSidebarProps {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  branches?: Branch[];
  onDeleteBranches?: (branchIds: string[]) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  selectedBranchFilter?: string;
  onBranchFilterChange?: (branchId: string) => void;
  pendingServiceRequests?: number;
}

export function AdminSidebar({ user, currentPage, onNavigate, onLogout, branches = [], onDeleteBranches, isCollapsed = false, onToggleCollapse, selectedBranchFilter = "all", onBranchFilterChange, pendingServiceRequests = 0 }: AdminSidebarProps) {
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);



  // Branch management functions
  const isAccountOwner = user.role === "carwash_owner"; // Main account owner
  
  const handleBranchSelect = (branchId: string) => {
    if (onBranchFilterChange) {
      onBranchFilterChange(branchId);
    }
    setShowBranchDropdown(false);
  };

  // ROOT OWNER menu items
  const rootOwnerMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "platform-users", label: "Platform Users", icon: UserPlus, badge: "NEW" },
    { id: "customer-hub", label: "Customer Hub", icon: Users },
    { id: "ai-dashboard", label: "AI Intelligence", icon: Brain, badge: "AI" },
    { id: "dynamic-pricing", label: "Dynamic Pricing", icon: Zap, badge: "NEW" },
    { id: "service-management", label: "Service Management", icon: Package },
    { id: "campaigns", label: "Campaign Management", icon: Megaphone },
    { id: "analytics", label: "Platform Analytics", icon: BarChart3 },
  ];

  // Carwash Owner menu items - FULL ACCESS to all company data
  const carwashOwnerMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "operations", label: "Live Operations", icon: Radio, badge: "NEW" },
    { id: "capacity-planning", label: "Capacity Planning", icon: Target },
    { id: "calendar", label: "Booking", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "revenue", label: "Revenue", icon: DollarSign },
    { id: "ai-dashboard", label: "AI Intelligence", icon: Brain, badge: "AI" },
    { id: "ai-churn-prediction", label: "Churn Prediction", icon: Sparkles, badge: "AI", submenu: true },
    { id: "ai-dynamic-pricing", label: "Smart Pricing", icon: Zap, badge: "AI", submenu: true },
    { id: "ai-roi-calculator", label: "AI ROI Calculator", icon: DollarSign, badge: "AI", submenu: true },
    { id: "dynamic-pricing", label: "Dynamic Pricing", icon: Zap, badge: "NEW" },
    { id: "employees", label: "All Employees", icon: Users },
    { id: "service-management", label: "Service Management", icon: Package },
    { id: "reviews", label: "Reviews & Feedback", icon: Star },
    { id: "campaigns", label: "Campaign Management", icon: Megaphone },
  ];

  const menuItems = user.role === "root_owner" 
    ? rootOwnerMenuItems 
    : carwashOwnerMenuItems;

  return (
    <div className={cn(
      "bg-neutral-50 border-r border-neutral-200 h-full flex flex-col transition-all duration-300 relative",
      isCollapsed ? "w-[60px]" : "w-[224px]"
    )}>
      {/* Toggle Button */}
      {onToggleCollapse && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border border-neutral-200 bg-white p-0 shadow-sm hover:bg-neutral-100"
          onClick={onToggleCollapse}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      )}

      {/* Header */}
      <div className={cn("px-4 py-[14px] border-b border-neutral-200", isCollapsed && "px-2")}>
        {/* Branch Selector - Prominent */}
        {!isCollapsed ? (
          // ROOT OWNER: Platform-level header (no branch selector)
          user.role === "root_owner" ? (
            <div 
              className="px-[11.5px] py-[10.5px] bg-purple-50 border border-purple-200 rounded-[6.75px] cursor-pointer hover:bg-purple-100 transition-colors"
              onClick={() => onNavigate("profile")}
            >
              <div className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-purple-900">
                Letwash Platform
              </div>
              <div className="text-[10.5px] font-medium leading-[14px] tracking-[0.0923px] text-purple-700">
                ROOT OWNER Access
              </div>
            </div>
          ) : (
            // Carwash Owner: Dropdown menu
            <DropdownMenu open={showBranchDropdown} onOpenChange={setShowBranchDropdown}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-[42px] px-[11.5px] bg-white border-[rgba(0,0,0,0.1)] rounded-[6.75px]"
                >
                  <div className="flex items-center gap-[7px]">
                    <div className="shrink-0 size-[14px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                        <g clipPath="url(#clip0_9043_1968)">
                          <path d="M3.5 12.8333V2.33334C3.5 2.02392 3.62292 1.72717 3.84171 1.50838C4.0605 1.28959 4.35725 1.16667 4.66667 1.16667H9.33333C9.64275 1.16667 9.9395 1.28959 10.1583 1.50838C10.3771 1.72717 10.5 2.02392 10.5 2.33334V12.8333H3.5Z" stroke="#0A0A0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d="M3.5 7H2.33333C2.02391 7 1.72717 7.12292 1.50838 7.34171C1.28958 7.5605 1.16667 7.85725 1.16667 8.16667V11.6667C1.16667 11.9761 1.28958 12.2728 1.50838 12.4916C1.72717 12.7104 2.02391 12.8333 2.33333 12.8333H3.5" stroke="#0A0A0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d="M10.5 5.25H11.6667C11.9761 5.25 12.2728 5.37292 12.4916 5.59171C12.7104 5.8105 12.8333 6.10725 12.8333 6.41667V11.6667C12.8333 11.9761 12.7104 12.2728 12.4916 12.4916C12.2728 12.7104 11.9761 12.8333 11.6667 12.8333H10.5" stroke="#0A0A0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d="M5.83333 3.5H8.16667" stroke="#0A0A0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d="M5.83333 5.83333H8.16667" stroke="#0A0A0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d="M5.83333 8.16667H8.16667" stroke="#0A0A0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d="M5.83333 10.5H8.16667" stroke="#0A0A0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        </g>
                        <defs>
                          <clipPath id="clip0_9043_1968">
                            <rect fill="white" height="14" width="14" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="basis-0 grow min-w-0">
                      <div className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950">
                        {selectedBranchFilter === "all" 
                          ? "All Branches" 
                          : branches.find(b => b.id === selectedBranchFilter)?.name || "Branch Name"}
                      </div>
                      <div className="text-[10.5px] font-medium leading-[14px] tracking-[0.0923px] text-[#717182]">
                        {branches.length} {branches.length === 1 ? "Branch" : "Branches"}
                      </div>
                    </div>
                  </div>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px] bg-white border border-[rgba(0,0,0,0.1)] rounded-[6.75px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <div className="px-[10.5px] py-[7px] border-b border-[rgba(0,0,0,0.1)]">
              <h4 className="text-[14px] font-medium leading-[21px] tracking-[-0.1504px] text-neutral-950">Select Branch</h4>
              <p className="text-[10.5px] font-normal leading-[14px] tracking-[0.0923px] text-[#717182]">
                Choose a branch to manage or view all
              </p>
            </div>

            <DropdownMenuItem
              className="flex items-center px-[10.5px] py-0 h-[42px] rounded-[4.75px]"
              onSelect={() => handleBranchSelect("all")}
            >
              <div className="flex items-center gap-[7px] w-full">
                <div className={cn(
                  "size-[10.5px] rounded-full border-2 shrink-0",
                  selectedBranchFilter === "all" 
                    ? "bg-[#155dfc] border-[#155dfc]" 
                    : "border-[#d1d5dc]"
                )} />
                <span className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950">All Branches</span>
              </div>
            </DropdownMenuItem>
            
            <div className="max-h-[200px] overflow-y-auto">
              {branches.map((branch) => (
                <DropdownMenuItem
                  key={branch.id}
                  className="flex items-center px-[10.5px] py-0 h-[45.5px] rounded-[4.75px]"
                  onSelect={() => handleBranchSelect(branch.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-[7px]">
                      <div className={cn(
                        "size-[10.5px] rounded-full border-2 shrink-0",
                        selectedBranchFilter === branch.id 
                          ? "bg-[#155dfc] border-[#155dfc]" 
                          : "border-[#d1d5dc]"
                      )} />
                      <span className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950 truncate">{branch.name}</span>
                      <div className={cn(
                        "size-[7px] rounded-full shrink-0",
                        branch.isActive ? "bg-[#00c950]" : "bg-[#99a1af]"
                      )} />
                    </div>
                    <p className="text-[10.5px] font-normal leading-[14px] tracking-[0.0923px] text-[#717182] truncate ml-[17.5px]">
                      {branch.address}, {branch.city}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            
            {branches.length === 0 && (
              <div className="px-[10.5px] py-[14px] text-center text-[12.25px] text-[#717182]">
                No branches found
              </div>
            )}
            
            {/* Branch Management Actions */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center px-[10.5px] py-0 h-[42px] rounded-[4.75px]"
              onSelect={() => {
                onNavigate("add-branch");
                setShowBranchDropdown(false);
              }}
            >
              <div className="flex items-center gap-[7px] w-full">
                <Plus size={14} className="shrink-0" />
                <span className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950">Add New Branch</span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="flex items-center px-[10.5px] py-0 h-[42px] rounded-[4.75px]"
              onSelect={() => {
                onNavigate("branches");
                setShowBranchDropdown(false);
              }}
            >
              <div className="flex items-center gap-[7px] w-full">
                <MapPin size={14} className="shrink-0" />
                <span className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950">Manage Branches</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          )
        ) : (
          // Collapsed sidebar
          user.role === "root_owner" ? (
            // ROOT OWNER: Platform icon (collapsed)
            <div className="w-full h-[42px] bg-purple-50 border border-purple-200 rounded-[6.75px] flex items-center justify-center">
              <Building2 size={18} className="text-purple-600" />
            </div>
          ) :
          user.role === "carwash_owner" ? (
            // Carwash Owner: Dropdown menu (collapsed)
            <DropdownMenu open={showBranchDropdown} onOpenChange={setShowBranchDropdown}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-[42px] p-0 bg-white border-[rgba(0,0,0,0.1)] rounded-[6.75px] flex items-center justify-center"
                >
                  <Building2 size={18} />
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent 
              side="right" 
              align="start"
              className="w-[280px] bg-white border border-[rgba(0,0,0,0.1)] rounded-[6.75px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
            >
              <div className="px-[10.5px] py-[7px] border-b border-[rgba(0,0,0,0.1)]">
                <h4 className="text-[14px] font-medium leading-[21px] tracking-[-0.1504px] text-neutral-950">Select Branch</h4>
                <p className="text-[10.5px] font-normal leading-[14px] tracking-[0.0923px] text-[#717182]">
                  Choose a branch to manage or view all
                </p>
              </div>
              
              <DropdownMenuItem
                className="flex items-center px-[10.5px] py-0 h-[42px] rounded-[4.75px]"
                onSelect={() => handleBranchSelect("all")}
              >
                <div className="flex items-center gap-[7px] w-full">
                  <div className={cn(
                    "size-[10.5px] rounded-full border-2 shrink-0",
                    selectedBranchFilter === "all" 
                      ? "bg-[#155dfc] border-[#155dfc]" 
                      : "border-[#d1d5dc]"
                  )} />
                  <span className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950">All Branches</span>
                </div>
              </DropdownMenuItem>
              
              <div className="max-h-[200px] overflow-y-auto">
                {branches.map((branch) => (
                  <DropdownMenuItem
                    key={branch.id}
                    className="flex items-center px-[10.5px] py-0 h-[45.5px] rounded-[4.75px]"
                    onSelect={() => handleBranchSelect(branch.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-[7px]">
                        <div className={cn(
                          "size-[10.5px] rounded-full border-2 shrink-0",
                          selectedBranchFilter === branch.id 
                            ? "bg-[#155dfc] border-[#155dfc]" 
                            : "border-[#d1d5dc]"
                        )} />
                        <span className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950 truncate">{branch.name}</span>
                        <div className={cn(
                          "size-[7px] rounded-full shrink-0",
                          branch.isActive ? "bg-[#00c950]" : "bg-[#99a1af]"
                        )} />
                      </div>
                      <p className="text-[10.5px] font-normal leading-[14px] tracking-[0.0923px] text-[#717182] truncate ml-[17.5px]">
                        {branch.address}, {branch.city}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              
              {branches.length === 0 && (
                <div className="px-[10.5px] py-[14px] text-center text-[12.25px] text-[#717182]">
                  No branches found
                </div>
              )}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center px-[10.5px] py-0 h-[42px] rounded-[4.75px]"
                onSelect={() => {
                  onNavigate("add-branch");
                  setShowBranchDropdown(false);
                }}
              >
                <div className="flex items-center gap-[7px] w-full">
                  <Plus size={14} className="shrink-0" />
                  <span className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950">Add New Branch</span>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem
                className="flex items-center px-[10.5px] py-0 h-[42px] rounded-[4.75px]"
                onSelect={() => {
                  onNavigate("branches");
                  setShowBranchDropdown(false);
                }}
              >
                <div className="flex items-center gap-[7px] w-full">
                  <MapPin size={14} className="shrink-0" />
                  <span className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950">Manage Branches</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ) : null
        )}

      </div>

      {/* Navigation */}
      <div className={cn("flex-1 pt-[7px] space-y-[3.5px]", isCollapsed ? "px-[4px]" : "px-[7px]")}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const showBadge = user.role === "root_owner" && item.id === "service-management" && pendingServiceRequests > 0;
          const hasNewBadge = 'badge' in item && item.badge === "NEW";
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full h-[35px] rounded-[6.75px] relative",
                isCollapsed ? "justify-center px-0" : "justify-start gap-3 px-[10.5px]",
                isActive ? "bg-neutral-100" : "hover:bg-neutral-100/50"
              )}
              onClick={() => onNavigate(item.id)}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={14} className="shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950 flex-1 text-left">{item.label}</span>
                  {hasNewBadge && (
                    <span className="ml-auto bg-green-600 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                  {showBadge && (
                    <span className="ml-auto bg-[#d4183d] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {pendingServiceRequests}
                    </span>
                  )}
                </>
              )}
              {isCollapsed && showBadge && (
                <span className="absolute -top-1 -right-1 bg-[#d4183d] text-white text-[9px] font-medium size-4 rounded-full flex items-center justify-center">
                  {pendingServiceRequests > 9 ? '9+' : pendingServiceRequests}
                </span>
              )}
              {isCollapsed && hasNewBadge && (
                <span className="absolute -top-1 -right-1 bg-green-600 size-2 rounded-full"></span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Footer */}
      <div className={cn("border-t border-neutral-200 pt-[8px] pb-0 space-y-[3.5px]", isCollapsed ? "px-[4px]" : "px-[7px]")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn("bg-neutral-100 rounded-[8.75px] w-full hover:bg-neutral-200 transition-colors", isCollapsed ? "p-2" : "p-[10.5px]")}>
              {!isCollapsed ? (
                <div className="flex items-center gap-3">
                  <div className="size-[28px] rounded-full bg-[#ececf0] flex items-center justify-center">
                    <span className="text-[10.5px] font-normal leading-[14px] tracking-[0.0923px] text-neutral-950">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.25px] font-medium leading-[17.5px] tracking-[-0.0179px] text-neutral-950 truncate">{user.name}</p>
                    <p className="text-[10.5px] font-normal leading-[14px] tracking-[0.0923px] text-[rgba(10,10,10,0.7)] capitalize">
                      {user.role.replace('_', ' ')}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-neutral-950" />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="size-[28px] rounded-full bg-[#ececf0] flex items-center justify-center">
                    <span className="text-[10.5px] font-normal leading-[14px] tracking-[0.0923px] text-neutral-950">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => onNavigate("manage-account")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Manage Account</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


    </div>
  );
}