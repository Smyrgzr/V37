"use client";

import { ReactNode, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { LayoutDashboard, Calendar, BarChart3, DollarSign, Users, Upload, EyeOff } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { NotificationBellIcon } from "../notifications/NotificationBellIcon";
import { useMockNotifications } from "../../hooks/useMockNotifications";

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

interface AdminLayoutProps {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  children: ReactNode;
  title?: string;
  branches?: Branch[];
  onDeleteBranches?: (branchIds: string[]) => void;
  selectedBranchFilter?: string;
  onBranchFilterChange?: (branchId: string) => void;
  showPublishButtons?: boolean;
  isPublished?: boolean;
  onPublish?: () => void;
  onUnpublish?: () => void;
  pendingServiceRequests?: number;
}

export function AdminLayout({ user, currentPage, onNavigate, onLogout, children, title, branches, onDeleteBranches, selectedBranchFilter, onBranchFilterChange, showPublishButtons, isPublished, onPublish, onUnpublish, pendingServiceRequests = 0 }: AdminLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Initialize mock notifications
  useMockNotifications(user.role);

  // Mobile bottom nav items
  const mobileNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "calendar", label: "Booking", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "revenue", label: "Revenue", icon: DollarSign },
    { id: "employees", label: "Team", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <AdminSidebar
          user={user}
          currentPage={currentPage}
          onNavigate={onNavigate}
          onLogout={onLogout}
          branches={branches}
          onDeleteBranches={onDeleteBranches}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          selectedBranchFilter={selectedBranchFilter}
          onBranchFilterChange={onBranchFilterChange}
          pendingServiceRequests={pendingServiceRequests}
        />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {title && (
          <header className="bg-card border-b border-border px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl md:text-2xl font-semibold text-foreground">{title}</h1>
              <div className="flex items-center gap-3">
                {/* Notification Bell */}
                <NotificationBellIcon onNavigate={onNavigate} />
                
                {showPublishButtons && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={onPublish}
                      className="gap-2"
                      disabled={isPublished}
                      variant={isPublished ? "outline" : "default"}
                    >
                      <Upload className="h-4 w-4" />
                      Publish Changes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onUnpublish}
                      className="gap-2"
                      disabled={!isPublished}
                    >
                      <EyeOff className="h-4 w-4" />
                      Unpublish
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </header>
        )}
        
        <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>

        {/* Mobile Bottom Navigation - Visible only on mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
          <div className="flex items-center justify-around px-2 py-2 safe-bottom">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="text-[10px] font-medium leading-none">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}