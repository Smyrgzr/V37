"use client";

/**
 * LETWASH PLATFORM - HIERARCHICAL DATA MODEL
 * ==========================================
 * 
 * HIERARCHY DEFINITION:
 * Root Owner (Platform Level)
 *   ↳ Carwash Owner (Company/Center Level)  [Multiple companies under one Root Owner]
 *       ↳ Branch (Location Level)  [Multiple branches under one Carwash Owner]
 * 
 * RELATIONSHIP FIELDS:
 * - root_owner_id: Links all entities to the platform owner (always "root1" in this system)
 * - carwash_owner_id: Links branches and related data to their parent company
 * - centerId: The carwash center/company ID (same as carwash company's id)
 * - branchId: The specific branch/location ID
 * 
 * DATA SCOPING RULES:
 * 1. ROOT OWNER (root_owner_id):
 *    - Full visibility: All carwash centers, all branches, all customers (B2B + B2C)
 *    - Filter: root_owner_id = user.root_owner_id
 * 
 * 2. CARWASH OWNER (carwash_owner_id):
 *    - Company scope: Only their center and ALL branches under it
 *    - Filter: carwash_owner_id = user.carwash_owner_id AND centerId = user.centerId
 * 
 * VISUAL HIERARCHY ORDER:
 * All UI components (dropdowns, filters, tables) must display in hierarchical order:
 * Root Owner → Carwash Owner (Company) → Branch
 * 
 * NO CROSS-TENANT DATA LEAKAGE:
 * - Each carwash owner can ONLY see their own company data
 * - All queries must enforce carwash_owner_id and/or branchId filters
 */

import { useState } from "react";
import { initialServiceRequests, initialStations } from "./data/mockData";
import { LoginTypeSelector } from "./components/auth/LoginTypeSelector";
import { CarwashLoginPage } from "./components/auth/CarwashLoginPage";
import { ModernDemoLoginPage } from "./components/auth/ModernDemoLoginPage";
import { RegistrationPage } from "./components/auth/RegistrationPage";
import { RegistrationConfirmation } from "./components/auth/RegistrationConfirmation";
import { SocialRegistrationComplete } from "./components/auth/SocialRegistrationComplete";
import { SubscriptionSelection } from "./components/auth/SubscriptionSelection";
import { BusinessModuleSelection, BusinessModule } from "./components/auth/BusinessModuleSelection";
import { AdminLayout } from "./components/layout/AdminLayout";
import { LetwashAdminDashboard } from "./components/dashboards/LetwashAdminDashboard";
import { ServiceRequestsManagement } from "./components/management/ServiceRequestsManagement";
import { BranchManagement } from "./components/management/BranchManagement";
import { BranchForm } from "./components/management/BranchForm";
import { ServicesPackagesManagement } from "./components/management/ServicesPackagesManagement";
import { CampaignManagement } from "./components/management/CampaignManagement";
import { ManageAccount } from "./components/management/ManageAccount";
import { MobilePreview } from "./components/mobile/MobilePreview";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { NotificationProvider } from "./contexts/NotificationContext";

import { BookingManagement } from "./components/management/BookingManagement";
import { AnalyticsManagement } from "./components/management/AnalyticsManagement";
import { RevenueManagement } from "./components/management/RevenueManagement";
import { EmployeesManagement } from "./components/management/EmployeesManagement";
import { WorkerManagement } from "./components/management/WorkerManagement";
import { UnifiedReservationCenter } from "./components/management/UnifiedReservationCenter";
import { ReviewFeedbackManagement } from "./components/management/ReviewFeedbackManagement";
import { DynamicPricingManagement } from "./components/management/DynamicPricingManagement";
import { CapacityManagement } from "./components/management/CapacityManagement";
import { CarwashCentersManagement } from "./components/management/CarwashCentersManagement";
import { StandardServicesManagement } from "./components/management/StandardServicesManagement";
import AIDashboard from "./components/management/AIDashboard";
import { PlatformUsersManagement } from "./components/management/PlatformUsersManagement";
import { EnhancedCustomerHub } from "./components/management/EnhancedCustomerHub";
import { EnhancedProfileManagement } from "./components/management/EnhancedProfileManagement";
import { DynamicPricingManagement } from "./components/management/DynamicPricingManagement";
import { NotificationPreferences } from "./components/notifications/NotificationPreferences";
import { CustomerChurnPrediction } from "./components/ai/CustomerChurnPrediction";
import { DynamicPricingAI } from "./components/ai/DynamicPricingAI";
import { VehicleDamageDetection } from "./components/ai/VehicleDamageDetection";
import { AIROICalculator } from "./components/ai/AIROICalculator";
import { ModernAdminSidebar } from "./components/layout/ModernAdminSidebar";
import { ModernCarwashDashboard } from "./components/dashboards/ModernCarwashDashboard";
import { AdvancedCalendarView } from "./components/management/AdvancedCalendarView_mobile_optimized";
import { RealTimeOperationsCenter } from "./components/management/RealTimeOperationsCenter";
import { EnhancedRealTimeOperations } from "./components/management/EnhancedRealTimeOperations";
import { ModuleAwareCalendarView } from "./components/calendar/ModuleAwareCalendarView";
import { UnifiedCalendarBookings } from "./components/calendar/UnifiedCalendarBookings";
import { CommandPalette } from "./components/layout/CommandPalette";
import { QuickActionsButton } from "./components/layout/QuickActionsButton";
import { DemoModeActivator } from "./components/DemoModeActivator";
import type { Station, StationStatus } from "./components/management/StationStatusManager";
import { generateTodayReservations } from "./data/mockReservations";
import type { Reservation } from "./types/reservation";
import { useEffect } from "react";
import { Button } from "./components/ui/button";

// 🎉 PHASE 2: RESERVATION WORKFLOW COMPONENTS
import { ReservationRequestForm, ReservationFormData } from "./components/reservation/ReservationRequestForm";
import { ApprovalDashboard } from "./components/reservation/ApprovalDashboard";
import { AlternativeSuggestionDialog, SuggestionData } from "./components/reservation/AlternativeSuggestionDialog";
import { CheckInInterface } from "./components/reservation/CheckInInterface";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./components/ui/dialog";
import { Card } from "./components/ui/card";

// 🎉 PHASE 2.1: SERVICE PROGRESS TRACKER COMPONENTS
import { ConfirmationCountdown } from "./components/reservation/ConfirmationCountdown";
import { ServiceProgressTracker } from "./components/reservation/ServiceProgressTracker";
import { CompletionWorkflowDialog, CompletionData } from "./components/reservation/CompletionWorkflow";

// 🎉 MOBILE DETAILING COMPONENTS
import { MobileReservationsPage } from "./components/mobile/MobileReservationsPage";
import { DirectionNavigator } from "./components/mobile/DirectionNavigator";
import { MobileCheckIn } from "./components/mobile/MobileCheckIn";
import { MobileDetailingDemo } from "./components/mobile/MobileDetailingDemo";
import { generateMobileReservations } from "./data/mockReservations";
import { ServiceProgressWidget } from "./components/reservation/ServiceProgressWidget";
import { ServiceStatsSummary } from "./components/reservation/ServiceStatsSummary";

interface User {
  id: string;
  name: string;
  role: "root_owner" | "carwash_owner" | "carwash_admin";
  email: string;
  root_owner_id?: string; // Always set for hierarchy tracking
  carwash_owner_id?: string; // Set for carwash_owner
  centerId?: string; // Carwash center ID
  centerName?: string;
  branchName?: string; // For branch admins
  branchId?: string; // For branch admins
  assignedBranches?: string[]; // For branch admins
  provider?: string;
}

type AuthPage = "login-selector" | "root-owner-login" | "carwash-owner-login" | "modern-demo-login" | "register" | "business-modules" | "subscription-selection" | "confirmation" | "social-complete";

export default function App() {
  const [currentAuthPage, setCurrentAuthPage] = useState<AuthPage>("login-selector");
  const [currentPage, setCurrentPage] = useState("calendar");
  // 🎨 MODERN UX MODE - Login sonrası aktive edilecek!
  const [useModernUX, setUseModernUX] = useState(false);
  // 🎮 DEMO MODE - Real-Time Operations Demo
  const [useDemoMode, setUseDemoMode] = useState(false);
  // Giriş sayfasını göstermek için otomatik giriş devre dışı
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string>("");
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [socialUserInfo, setSocialUserInfo] = useState<any>(null);
  const [socialProviderUsed, setSocialProviderUsed] = useState<string | null>(null);
  const [pendingRegistrationData, setPendingRegistrationData] = useState<any>(null);
  const [selectedBusinessModules, setSelectedBusinessModules] = useState<BusinessModule[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<{ tierId: string; billingCycle: "monthly" | "yearly" } | null>(null);
  
  // Branch filter for Carwash Owner - "all" means show all branches, otherwise specific branch ID
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>("all");
  
  // Analytics module filter
  const [selectedModule, setSelectedModule] = useState<string>("all");
  
  // Branch publish state
  const [isBranchPublished, setIsBranchPublished] = useState(true);

  // 🎉 PHASE 2: RESERVATION WORKFLOW STATE
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservationFormData, setReservationFormData] = useState<{
    stationId?: string;
    stationName?: string;
    preselectedDate?: string;
    preselectedTime?: string;
  } | null>(null);
  const [showAlternativeSuggestionDialog, setShowAlternativeSuggestionDialog] = useState(false);
  const [selectedReservationForSuggestion, setSelectedReservationForSuggestion] = useState<Reservation | null>(null);

  // 🎉 PHASE 2.1: SERVICE PROGRESS TRACKER STATE
  const [showCompletionWorkflow, setShowCompletionWorkflow] = useState(false);
  const [selectedReservationForCompletion, setSelectedReservationForCompletion] = useState<Reservation | null>(null);

  // Mock Reviews Data
  const [mockReviews, setMockReviews] = useState([
    {
      id: "r1",
      customerId: "c001",
      customerName: "Sarah Johnson",
      customerAvatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      reviewText: "Absolutely fantastic service! The team was professional, thorough, and my car looks brand new. The interior detailing was exceptional. Highly recommend!",
      photos: ["https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400", "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400"],
      serviceName: "Premium Full Detailing",
      branchId: "b1",
      branchName: "Downtown Branch",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      status: "pending" as const,
      helpful: 0,
      notHelpful: 0,
      verified: true
    },
    {
      id: "r2",
      customerId: "c002",
      customerName: "Michael Chen",
      customerAvatar: "https://i.pravatar.cc/150?img=12",
      rating: 4,
      reviewText: "Great service overall. The wash was thorough and the staff was friendly. Only minor issue was the wait time, but the quality made up for it.",
      photos: [],
      serviceName: "Express Exterior Wash",
      branchId: "b1",
      branchName: "Downtown Branch",
      date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      status: "pending" as const,
      helpful: 0,
      notHelpful: 0,
      verified: true
    },
    {
      id: "r3",
      customerId: "c003",
      customerName: "Emily Rodriguez",
      customerAvatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      reviewText: "Best car wash experience ever! The mobile detailing service came right to my office. Super convenient and the results were amazing. Will definitely use again!",
      photos: ["https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400"],
      serviceName: "Mobile Detailing Premium",
      branchId: "b2",
      branchName: "Westside Branch",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      status: "published" as const,
      response: {
        text: "Thank you so much for your wonderful review, Emily! We're thrilled to hear you had a great experience with our mobile service. We look forward to serving you again!",
        respondedBy: "AutoWash Pro Team",
        respondedAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString()
      },
      helpful: 12,
      notHelpful: 0,
      verified: true
    },
    {
      id: "r4",
      customerId: "c004",
      customerName: "David Thompson",
      customerAvatar: "https://i.pravatar.cc/150?img=8",
      rating: 2,
      reviewText: "Disappointed with the service. Had to wait over 45 minutes despite having a reservation. The wash was okay but not worth the wait and price.",
      photos: [],
      serviceName: "Standard Wash & Wax",
      branchId: "b1",
      branchName: "Downtown Branch",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      status: "pending" as const,
      helpful: 0,
      notHelpful: 0,
      verified: true
    },
    {
      id: "r5",
      customerId: "c005",
      customerName: "Jessica Martinez",
      customerAvatar: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      reviewText: "Outstanding attention to detail! The ceramic coating application was perfect. Staff explained everything clearly and the pricing was transparent.",
      photos: ["https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
      serviceName: "Ceramic Coating Package",
      branchId: "b2",
      branchName: "Westside Branch",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      status: "published" as const,
      response: {
        text: "Thank you for recognizing our team's hard work! We're so glad we could exceed your expectations. Your feedback motivates us to keep delivering excellence!",
        respondedBy: "AutoWash Pro Team",
        respondedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      helpful: 24,
      notHelpful: 1,
      verified: true
    },
    {
      id: "r6",
      customerId: "c006",
      customerName: "Robert Kim",
      customerAvatar: "https://i.pravatar.cc/150?img=13",
      rating: 4,
      reviewText: "Very satisfied with the interior deep clean. My car smells fresh and looks great. Would have been 5 stars but missed a small spot on the back seat.",
      photos: [],
      serviceName: "Interior Deep Clean",
      branchId: "b1",
      branchName: "Downtown Branch",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      status: "published" as const,
      helpful: 8,
      notHelpful: 0,
      verified: false
    }
  ]);

  // Mock data for the application
  const [mockStandardServices, setMockStandardServices] = useState([
    {
      id: "gs1",
      name: "Basic Wash",
      description: "Exterior wash and dry",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 25, duration: 20 }],
      vehicleTypes: ["Regular"],
      category: "Wash",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Sparkle Wash Co.",
    },
    {
      id: "gs2",
      name: "Premium Wash",
      description: "Exterior wash, wax, and tire shine",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 45, duration: 35 }],
      vehicleTypes: ["Regular"],
      category: "Wash",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Sparkle Wash Co.",
    },
    {
      id: "gs3",
      name: "Full Detailing",
      description: "Complete interior and exterior detailing",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 150, duration: 120 }],
      vehicleTypes: ["Regular"],
      category: "Detailing",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Sparkle Wash Co.",
    },
    {
      id: "gs4",
      name: "Interior Cleaning",
      description: "Vacuum, wipe down, and air freshener",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 35, duration: 30 }],
      vehicleTypes: ["Regular"],
      category: "Interior",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Premier Auto Care",
    },
    {
      id: "gs5",
      name: "Express Wash",
      description: "Quick exterior wash - 10 minutes",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 15, duration: 10 }],
      vehicleTypes: ["Regular"],
      category: "Wash",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Quick Clean Express",
    },
    {
      id: "gs6",
      name: "Ceramic Coating",
      description: "Professional ceramic coating application",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 350, duration: 180 }],
      vehicleTypes: ["Regular"],
      category: "Protection",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Premier Auto Care",
    },
    {
      id: "gs7",
      name: "Deluxe Wash",
      description: "Premium exterior wash with underbody flush",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 55, duration: 40 }],
      vehicleTypes: ["Regular"],
      category: "Wash",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Sparkle Wash Co.",
    },
    {
      id: "gs8",
      name: "Engine Bay Cleaning",
      description: "Deep clean of engine compartment",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 75, duration: 45 }],
      vehicleTypes: ["Regular"],
      category: "Detailing",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Premier Auto Care",
    },
    {
      id: "gs9",
      name: "Headlight Restoration",
      description: "Remove oxidation and restore clarity",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 65, duration: 30 }],
      vehicleTypes: ["Regular"],
      category: "Detailing",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Premier Auto Care",
    },
    {
      id: "gs10",
      name: "Paint Correction",
      description: "Remove swirls and scratches",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 250, duration: 180 }],
      vehicleTypes: ["Regular"],
      category: "Detailing",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Premier Auto Care",
    },
    {
      id: "gs11",
      name: "Wax & Polish",
      description: "Hand wax and polish application",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 85, duration: 60 }],
      vehicleTypes: ["Regular"],
      category: "Protection",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Sparkle Wash Co.",
    },
    {
      id: "gs12",
      name: "Leather Treatment",
      description: "Clean and condition leather seats",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 60, duration: 40 }],
      vehicleTypes: ["Regular"],
      category: "Interior",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Premier Auto Care",
    },
    {
      id: "gs13",
      name: "Odor Removal",
      description: "Ozone treatment for odor elimination",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 95, duration: 90 }],
      vehicleTypes: ["Regular"],
      category: "Interior",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Quick Clean Express",
    },
    {
      id: "gs14",
      name: "Wheel Detailing",
      description: "Deep clean wheels and tire dressing",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 40, duration: 25 }],
      vehicleTypes: ["Regular"],
      category: "Detailing",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Sparkle Wash Co.",
    },
    {
      id: "gs15",
      name: "PPF Installation",
      description: "Paint protection film application",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 450, duration: 240 }],
      vehicleTypes: ["Regular"],
      category: "Protection",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Premier Auto Care",
    },
    {
      id: "gs16",
      name: "Window Tinting",
      description: "Professional window tint installation",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 200, duration: 120 }],
      vehicleTypes: ["Regular"],
      category: "Protection",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Premier Auto Care",
    },
    {
      id: "gs17",
      name: "Steam Clean",
      description: "Eco-friendly steam cleaning service",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 90, duration: 50 }],
      vehicleTypes: ["Regular"],
      category: "Wash",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Quick Clean Express",
    },
    {
      id: "gs18",
      name: "Convertible Top Care",
      description: "Clean and protect convertible tops",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 70, duration: 45 }],
      vehicleTypes: ["Regular"],
      category: "Detailing",
      isActive: false,
      createdDate: "2024-01-10",
      companyName: "Sparkle Wash Co.",
    },
    {
      id: "gs19",
      name: "Pet Hair Removal",
      description: "Specialized pet hair extraction",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 50, duration: 35 }],
      vehicleTypes: ["Regular"],
      category: "Interior",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Quick Clean Express",
    },
    {
      id: "gs20",
      name: "Undercarriage Wash",
      description: "Thorough undercarriage cleaning",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 30, duration: 15 }],
      vehicleTypes: ["Regular"],
      category: "Wash",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Sparkle Wash Co.",
    },
    {
      id: "gs21",
      name: "Scratch Repair",
      description: "Minor scratch and paint chip repair",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 120, duration: 90 }],
      vehicleTypes: ["Regular"],
      category: "Detailing",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Premier Auto Care",
    },
    {
      id: "gs22",
      name: "Clay Bar Treatment",
      description: "Remove contaminants from paint surface",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 80, duration: 50 }],
      vehicleTypes: ["Regular"],
      category: "Detailing",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Sparkle Wash Co.",
    },
    {
      id: "gs23",
      name: "Fabric Protection",
      description: "Apply protective coating to upholstery",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 110, duration: 60 }],
      vehicleTypes: ["Regular"],
      category: "Protection",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Premier Auto Care",
    },
    {
      id: "gs24",
      name: "Windshield Treatment",
      description: "Rain-repellent windshield coating",
      vehicleTypePricing: [{ vehicleType: "Regular", price: 45, duration: 20 }],
      vehicleTypes: ["Regular"],
      category: "Protection",
      isActive: true,
      createdDate: "2024-01-10",
      companyName: "Quick Clean Express",
    },
  ]);

  const [mockStandardPackages, setMockStandardPackages] = useState([
    {
      id: "gp1",
      name: "Complete Care Package",
      description: "Full-service treatment with exterior wash, interior cleaning, premium wax, and tire shine",
      includedServices: ["Exterior Wash", "Interior Cleaning", "Premium Wax Application", "Tire Shine & Treatment"],
      vehicleTypePricing: [
        { vehicleType: "Regular", price: 70, discountPrice: 60, duration: 85 },
        { vehicleType: "SUV", price: 95, discountPrice: 80, duration: 107 },
        { vehicleType: "Sedan", price: 78, discountPrice: 65, duration: 91 },
      ],
      vehicleTypes: ["Regular", "SUV", "Sedan"],
      isActive: true,
      createdDate: "2024-01-10",
    },
    {
      id: "gp2",
      name: "Express Package",
      description: "Quick and efficient exterior wash with tire shine",
      includedServices: ["Exterior Wash", "Tire Shine & Treatment"],
      vehicleTypePricing: [
        { vehicleType: "Regular", price: 25, discountPrice: 22, duration: 30 },
        { vehicleType: "SUV", price: 32, discountPrice: 28, duration: 37 },
        { vehicleType: "Sedan", price: 28, discountPrice: 25, duration: 32 },
        { vehicleType: "Truck", price: 35, discountPrice: 30, duration: 40 },
      ],
      vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"],
      isActive: true,
      createdDate: "2024-01-10",
    },
  ]);

  const [mockServiceRequests, setMockServiceRequests] = useState(initialServiceRequests);

  const [mockCarwashCenters, setMockCarwashCenters] = useState([
    {
      id: "1",
      root_owner_id: "root1", // Belongs to ROOT OWNER
      carwash_owner_id: "owner1", // Owned by John Smith
      name: "AutoWash Pro",
      contactPerson: "John Smith",
      email: "john@autowashpro.com",
      phone: "+1-555-0123",
      address: "123 Main Street",
      city: "New York",
      district: "Manhattan",
      branchCount: 3,
      accountType: "premium" as const,
      companySize: "medium" as const,
      carTypes: ["Sedan", "SUV", "Truck", "Van"],
      serviceTypes: ["Exterior Wash", "Interior Cleaning", "Premium Wax", "Full Detailing"],
      branches: [
        {
          id: "b1",
          root_owner_id: "root1",
          carwash_owner_id: "owner1",
          centerId: "1",
          name: "Downtown Branch",
          address: "123 Main Street, Suite 100",
          city: "New York",
          district: "Manhattan",
          phone: "+1-555-0123",
          email: "downtown@autowashpro.com",
          totalStaff: 8,
          servicesCount: 6,
          isActive: true,
        },
        {
          id: "b2",
          root_owner_id: "root1",
          carwash_owner_id: "owner1",
          centerId: "1",
          name: "Uptown Branch",
          address: "456 Park Avenue, Floor 2",
          city: "New York",
          district: "Upper East Side",
          phone: "+1-555-0124",
          email: "uptown@autowashpro.com",
          totalStaff: 6,
          servicesCount: 5,
          isActive: true,
        },
        {
          id: "b3",
          root_owner_id: "root1",
          carwash_owner_id: "owner1",
          centerId: "1",
          name: "Brooklyn Branch",
          address: "789 Atlantic Avenue",
          city: "Brooklyn",
          district: "Downtown Brooklyn",
          phone: "+1-555-0125",
          email: "brooklyn@autowashpro.com",
          totalStaff: 5,
          servicesCount: 4,
          isActive: false,
        },
      ],
      status: "active" as const,
      registrationDate: "2024-01-15",
    },
    {
      id: "2",
      root_owner_id: "root1",
      carwash_owner_id: "owner2",
      name: "Clean & Shine",
      contactPerson: "Sarah Johnson",
      email: "sarah@cleanshine.com",
      phone: "+1-555-0456",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      district: "Hollywood",
      branchCount: 1,
      accountType: "standard" as const,
      companySize: "small" as const,
      carTypes: ["Sedan", "SUV", "Regular"],
      serviceTypes: ["Exterior Wash", "Interior Cleaning", "Express Service"],
      branches: [
        {
          id: "b4",
          root_owner_id: "root1",
          carwash_owner_id: "owner2",
          centerId: "2",
          name: "Main Branch",
          address: "456 Oak Avenue",
          city: "Los Angeles",
          district: "Hollywood",
          phone: "+1-555-0456",
          email: "main@cleanshine.com",
          totalStaff: 4,
          servicesCount: 3,
          isActive: true,
        },
      ],
      status: "pending" as const,
      registrationDate: "2024-01-20",
    },
    {
      id: "3",
      root_owner_id: "root1",
      carwash_owner_id: "owner3",
      name: "SpeedWash Express",
      contactPerson: "Michael Brown",
      email: "michael@speedwash.com",
      phone: "+1-555-0789",
      address: "789 Speed Lane",
      city: "Chicago",
      district: "Downtown",
      branchCount: 5,
      accountType: "premium" as const,
      companySize: "large" as const,
      carTypes: ["Sedan", "SUV", "Truck", "Van", "Sports Car"],
      serviceTypes: ["Express Wash", "Full Detail", "Premium Wax", "Ceramic Coating"],
      branches: [
        {
          id: "b5",
          root_owner_id: "root1",
          carwash_owner_id: "owner3",
          centerId: "3",
          name: "North Side Branch",
          address: "100 North Avenue",
          city: "Chicago",
          district: "North Side",
          phone: "+1-555-0790",
          email: "north@speedwash.com",
          totalStaff: 10,
          servicesCount: 8,
          isActive: true,
        },
        {
          id: "b6",
          root_owner_id: "root1",
          carwash_owner_id: "owner3",
          centerId: "3",
          name: "South Side Branch",
          address: "200 South Street",
          city: "Chicago",
          district: "South Side",
          phone: "+1-555-0791",
          email: "south@speedwash.com",
          totalStaff: 8,
          servicesCount: 7,
          isActive: true,
        },
        {
          id: "b7",
          root_owner_id: "root1",
          carwash_owner_id: "owner3",
          centerId: "3",
          name: "West Loop Branch",
          address: "300 West Loop Drive",
          city: "Chicago",
          district: "West Loop",
          phone: "+1-555-0792",
          email: "west@speedwash.com",
          totalStaff: 7,
          servicesCount: 6,
          isActive: true,
        },
        {
          id: "b8",
          root_owner_id: "root1",
          carwash_owner_id: "owner3",
          centerId: "3",
          name: "East Side Branch",
          address: "400 East Boulevard",
          city: "Chicago",
          district: "East Side",
          phone: "+1-555-0793",
          email: "east@speedwash.com",
          totalStaff: 9,
          servicesCount: 8,
          isActive: true,
        },
        {
          id: "b9",
          root_owner_id: "root1",
          carwash_owner_id: "owner3",
          centerId: "3",
          name: "Suburbs Branch",
          address: "500 Suburban Road",
          city: "Chicago",
          district: "Suburbs",
          phone: "+1-555-0794",
          email: "suburbs@speedwash.com",
          totalStaff: 6,
          servicesCount: 5,
          isActive: false,
        },
      ],
      status: "active" as const,
      registrationDate: "2024-01-10",
    },
    {
      id: "4",
      root_owner_id: "root1",
      carwash_owner_id: "owner4",
      name: "EcoClean Wash",
      contactPerson: "Jennifer Lee",
      email: "jennifer@ecoclean.com",
      phone: "+1-555-0321",
      address: "321 Green Street",
      city: "San Francisco",
      district: "Mission District",
      branchCount: 2,
      accountType: "standard" as const,
      companySize: "small" as const,
      carTypes: ["Sedan", "SUV", "Electric"],
      serviceTypes: ["Eco Wash", "Waterless Detail", "Steam Cleaning"],
      branches: [
        {
          id: "b10",
          root_owner_id: "root1",
          carwash_owner_id: "owner4",
          centerId: "4",
          name: "Mission Branch",
          address: "321 Green Street",
          city: "San Francisco",
          district: "Mission District",
          phone: "+1-555-0321",
          email: "mission@ecoclean.com",
          totalStaff: 5,
          servicesCount: 4,
          isActive: true,
        },
        {
          id: "b11",
          root_owner_id: "root1",
          carwash_owner_id: "owner4",
          centerId: "4",
          name: "Marina Branch",
          address: "654 Marina Boulevard",
          city: "San Francisco",
          district: "Marina",
          phone: "+1-555-0322",
          email: "marina@ecoclean.com",
          totalStaff: 4,
          servicesCount: 4,
          isActive: true,
        },
      ],
      status: "active" as const,
      registrationDate: "2024-01-18",
    },
  ]);

  const [mockBranches, setMockBranches] = useState([
    {
      id: "b1",
      root_owner_id: "root1",
      carwash_owner_id: "owner1",
      centerId: "1",
      name: "Downtown Branch",
      address: "123 Main Street, Suite 100",
      city: "New York",
      district: "Manhattan", 
      phone: "+1-555-0123",
      email: "downtown@autowashpro.com",
      description: "Our flagship location in the heart of Manhattan",
      isActive: true,
      operatingHours: {
        monday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
        tuesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
        wednesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
        thursday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
        friday: { isOpen: true, openTime: "08:00", closeTime: "21:00" },
        saturday: { isOpen: true, openTime: "09:00", closeTime: "19:00" },
        sunday: { isOpen: true, openTime: "10:00", closeTime: "18:00" },
      },
      totalStaff: 8,
      servicesCount: 6,
      packagesCount: 3,
      createdDate: "2024-01-10",
      businessModules: ["tunnel", "self_service", "manual_detailing"],
      moduleConfig: {
        tunnel: {
          tunnelSpeed: 30,
          tunnelLength: 150,
          conveyorType: "chain",
          dryingSystem: true,
          maxVehicleHeight: 84,
          workingHours: [
            { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
            { day: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
            { day: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
            { day: "Thursday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
            { day: "Friday", isOpen: true, openTime: "08:00", closeTime: "21:00" },
            { day: "Saturday", isOpen: true, openTime: "09:00", closeTime: "19:00" },
            { day: "Sunday", isOpen: true, openTime: "10:00", closeTime: "18:00" },
          ],
        },
        selfService: {
          numberOfBays: 6,
          bayEquipment: ["Wand", "Foam Gun", "Vacuum", "Tire Inflator"],
          pricingModel: "pay-per-minute",
          minuteRate: 2.5,
          workingHours: [
            { day: "Monday", isOpen: true, openTime: "06:00", closeTime: "22:00" },
            { day: "Tuesday", isOpen: true, openTime: "06:00", closeTime: "22:00" },
            { day: "Wednesday", isOpen: true, openTime: "06:00", closeTime: "22:00" },
            { day: "Thursday", isOpen: true, openTime: "06:00", closeTime: "22:00" },
            { day: "Friday", isOpen: true, openTime: "06:00", closeTime: "23:00" },
            { day: "Saturday", isOpen: true, openTime: "07:00", closeTime: "23:00" },
            { day: "Sunday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
          ],
        },
        manualDetailing: {
          detailBays: 4,
          waitingArea: true,
          staffCapacity: 8,
          specializations: ["Ceramic Coating", "Paint Correction", "Interior Detailing"],
          workingHours: [
            { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
            { day: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
            { day: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
            { day: "Thursday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
            { day: "Friday", isOpen: true, openTime: "08:00", closeTime: "19:00" },
            { day: "Saturday", isOpen: true, openTime: "09:00", closeTime: "17:00" },
            { day: "Sunday", isOpen: false, openTime: "", closeTime: "" },
          ],
        },
      },
    },
    {
      id: "b2",
      root_owner_id: "root1",
      carwash_owner_id: "owner1",
      centerId: "1",
      name: "Uptown Branch",
      address: "456 Park Avenue, Floor 2",
      city: "New York",
      district: "Upper East Side", 
      phone: "+1-555-0124",
      email: "uptown@autowashpro.com",
      description: "Premium service location in the upscale Upper East Side",
      isActive: true,
      operatingHours: {
        monday: { isOpen: true, openTime: "09:00", closeTime: "19:00" },
        tuesday: { isOpen: true, openTime: "09:00", closeTime: "19:00" },
        wednesday: { isOpen: true, openTime: "09:00", closeTime: "19:00" },
        thursday: { isOpen: true, openTime: "09:00", closeTime: "19:00" },
        friday: { isOpen: true, openTime: "09:00", closeTime: "20:00" },
        saturday: { isOpen: true, openTime: "10:00", closeTime: "18:00" },
        sunday: { isOpen: true, openTime: "11:00", closeTime: "17:00" },
      },
      totalStaff: 6,
      servicesCount: 5,
      packagesCount: 2,
      createdDate: "2024-01-15",
      businessModules: ["in_bay", "mobile", "manual_detailing"],
      moduleConfig: {
        inBay: {
          numberOfBays: 3,
          bayNames: ["Bay A", "Bay B", "Bay C"],
          paymentSystem: "app",
          automaticType: "touchless",
          workingHours: [
            { day: "Monday", isOpen: true, openTime: "09:00", closeTime: "19:00" },
            { day: "Tuesday", isOpen: true, openTime: "09:00", closeTime: "19:00" },
            { day: "Wednesday", isOpen: true, openTime: "09:00", closeTime: "19:00" },
            { day: "Thursday", isOpen: true, openTime: "09:00", closeTime: "19:00" },
            { day: "Friday", isOpen: true, openTime: "09:00", closeTime: "20:00" },
            { day: "Saturday", isOpen: true, openTime: "10:00", closeTime: "18:00" },
            { day: "Sunday", isOpen: true, openTime: "11:00", closeTime: "17:00" },
          ],
        },
        mobile: {
          serviceAreaRadius: 20,
          zipCodes: ["10021", "10022", "10028", "10075"],
          numberOfUnits: 3,
          drivers: [],
          workingHours: [
            { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
            { day: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
            { day: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
            { day: "Thursday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
            { day: "Friday", isOpen: true, openTime: "08:00", closeTime: "19:00" },
            { day: "Saturday", isOpen: true, openTime: "09:00", closeTime: "17:00" },
            { day: "Sunday", isOpen: false, openTime: "", closeTime: "" },
          ],
        },
        manualDetailing: {
          detailBays: 2,
          waitingArea: true,
          staffCapacity: 5,
          specializations: ["Ceramic Coating", "Interior Detailing"],
          workingHours: [
            { day: "Monday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
            { day: "Tuesday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
            { day: "Wednesday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
            { day: "Thursday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
            { day: "Friday", isOpen: true, openTime: "09:00", closeTime: "19:00" },
            { day: "Saturday", isOpen: true, openTime: "10:00", closeTime: "17:00" },
            { day: "Sunday", isOpen: false, openTime: "", closeTime: "" },
          ],
        },
      },
    },
    {
      id: "b3",
      root_owner_id: "root1",
      carwash_owner_id: "owner1",
      centerId: "1",
      name: "Brooklyn Branch",
      address: "789 Atlantic Avenue",
      city: "Brooklyn",
      district: "Downtown Brooklyn", 
      phone: "+1-555-0125",
      email: "brooklyn@autowashpro.com",
      description: "Convenient location serving the Brooklyn community",
      isActive: false,
      operatingHours: {
        monday: { isOpen: true, openTime: "08:30", closeTime: "19:30" },
        tuesday: { isOpen: true, openTime: "08:30", closeTime: "19:30" },
        wednesday: { isOpen: true, openTime: "08:30", closeTime: "19:30" },
        thursday: { isOpen: true, openTime: "08:30", closeTime: "19:30" },
        friday: { isOpen: true, openTime: "08:30", closeTime: "20:30" },
        saturday: { isOpen: true, openTime: "09:30", closeTime: "18:30" },
        sunday: { isOpen: false, openTime: "", closeTime: "" },
      },
      totalStaff: 5,
      servicesCount: 4,
      packagesCount: 2,
      createdDate: "2024-01-20",
      businessModules: ["self_service", "tunnel"],
      moduleConfig: {
        selfService: {
          numberOfBays: 8,
          bayEquipment: ["Wand", "Foam Gun", "Vacuum"],
          pricingModel: "pay-per-minute",
          minuteRate: 2.0,
          workingHours: [
            { day: "Monday", isOpen: true, openTime: "08:30", closeTime: "19:30" },
            { day: "Tuesday", isOpen: true, openTime: "08:30", closeTime: "19:30" },
            { day: "Wednesday", isOpen: true, openTime: "08:30", closeTime: "19:30" },
            { day: "Thursday", isOpen: true, openTime: "08:30", closeTime: "19:30" },
            { day: "Friday", isOpen: true, openTime: "08:30", closeTime: "20:30" },
            { day: "Saturday", isOpen: true, openTime: "09:30", closeTime: "18:30" },
            { day: "Sunday", isOpen: false, openTime: "", closeTime: "" },
          ],
        },
        tunnel: {
          tunnelSpeed: 24,
          tunnelLength: 120,
          conveyorType: "belt",
          dryingSystem: false,
          maxVehicleHeight: 78,
          workingHours: [
            { day: "Monday", isOpen: true, openTime: "08:30", closeTime: "19:30" },
            { day: "Tuesday", isOpen: true, openTime: "08:30", closeTime: "19:30" },
            { day: "Wednesday", isOpen: true, openTime: "08:30", closeTime: "19:30" },
            { day: "Thursday", isOpen: true, openTime: "08:30", closeTime: "19:30" },
            { day: "Friday", isOpen: true, openTime: "08:30", closeTime: "20:30" },
            { day: "Saturday", isOpen: true, openTime: "09:30", closeTime: "18:30" },
            { day: "Sunday", isOpen: false, openTime: "", closeTime: "" },
          ],
        },
      },
    },
  ]);

  const [mockCenterServices, setMockCenterServices] = useState([
    {
      id: "cs1",
      globalServiceId: "gs1",
      name: "Exterior Wash",
      description: "Complete exterior cleaning with premium soap",
      customPrice: 18,
      customDuration: 25,
      isActive: true,
      availableBranches: ["b1", "b2", "b3"],
      category: "Exterior",
      vehicleTypes: ["Regular", "SUV", "Sedan"],
      applicableModules: ["tunnel", "in_bay", "self_service"] as const,
    },
    {
      id: "cs2",
      globalServiceId: "gs2",
      name: "Interior Cleaning",
      description: "Comprehensive interior vacuum and surface cleaning",
      customPrice: 22,
      customDuration: 30,
      isActive: true,
      availableBranches: ["b1", "b2"],
      category: "Interior",
      vehicleTypes: ["Regular", "SUV", "Sedan", "Van"],
      applicableModules: ["manual_detailing", "mobile"] as const,
    },
    {
      id: "cs3",
      globalServiceId: "gs3",
      name: "Premium Wax Application",
      description: "High-quality carnauba wax for paint protection and shine",
      customPrice: 38,
      customDuration: 35,
      isActive: true,
      availableBranches: ["b1"],
      category: "Premium",
      vehicleTypes: ["Regular", "SUV", "Sedan"],
      applicableModules: ["manual_detailing", "mobile"] as const,
    },
    {
      id: "cs4",
      globalServiceId: "gs4",
      name: "Tire Shine & Treatment",
      description: "Professional tire cleaning with protective shine application",
      customPrice: 15,
      customDuration: 15,
      isActive: true,
      availableBranches: ["b1", "b2", "b3"],
      category: "Exterior",
      vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"],
      applicableModules: ["tunnel", "in_bay", "manual_detailing", "self_service"] as const,
    },
    {
      id: "cs5",
      globalServiceId: "gs5",
      name: "Self-Service Express",
      description: "Quick DIY wash with professional equipment",
      customPrice: 12,
      customDuration: 20,
      isActive: true,
      availableBranches: ["b1", "b3"],
      category: "Self-Service",
      vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"],
      applicableModules: ["self_service"] as const,
    },
    {
      id: "cs6",
      globalServiceId: "gs6",
      name: "Mobile Premium Detail",
      description: "Full-service mobile detailing at your location",
      customPrice: 85,
      customDuration: 90,
      isActive: true,
      availableBranches: ["b2"],
      category: "Mobile",
      vehicleTypes: ["Regular", "SUV", "Sedan"],
      applicableModules: ["mobile"] as const,
    },
  ]);

  const [mockCenterPackages, setMockCenterPackages] = useState([
    {
      id: "cp1",
      name: "Premium Complete Package",
      description: "Everything your car needs for a perfect finish",
      includedServices: ["Exterior Wash", "Interior Cleaning", "Premium Wax Application"],
      vehicleTypePricing: [
        { vehicleType: "Regular", price: 75, discountPrice: 60, duration: 75 },
        { vehicleType: "SUV", price: 85, discountPrice: 70, duration: 85 },
        { vehicleType: "Sedan", price: 70, discountPrice: 55, duration: 70 },
      ],
      isActive: true,
      availableBranches: ["b1", "b2"],
      vehicleTypes: ["Regular", "SUV", "Sedan"],
      rating: 4.8,
      bookingCount: 156,
      applicableModules: ["manual_detailing", "in_bay"] as const,
    },
    {
      id: "cp2",
      name: "Express Tunnel Package",
      description: "Fast and efficient tunnel wash with tire shine",
      includedServices: ["Exterior Wash", "Tire Shine & Treatment"],
      vehicleTypePricing: [
        { vehicleType: "Regular", price: 28, discountPrice: 25, duration: 15 },
        { vehicleType: "SUV", price: 35, discountPrice: 30, duration: 18 },
        { vehicleType: "Sedan", price: 30, discountPrice: 27, duration: 15 },
      ],
      isActive: true,
      availableBranches: ["b1", "b3"],
      vehicleTypes: ["Regular", "SUV", "Sedan"],
      rating: 4.5,
      bookingCount: 342,
      applicableModules: ["tunnel"] as const,
    },
    {
      id: "cp3",
      name: "Mobile Deluxe Package",
      description: "Complete mobile service at your location",
      includedServices: ["Exterior Wash", "Interior Cleaning", "Premium Wax Application"],
      vehicleTypePricing: [
        { vehicleType: "Regular", price: 95, discountPrice: 85, duration: 120 },
        { vehicleType: "SUV", price: 110, discountPrice: 95, duration: 135 },
        { vehicleType: "Sedan", price: 98, discountPrice: 88, duration: 120 },
      ],
      isActive: true,
      availableBranches: ["b2"],
      vehicleTypes: ["Regular", "SUV", "Sedan"],
      rating: 4.9,
      bookingCount: 89,
      applicableModules: ["mobile"] as const,
    },
    {
      id: "cp4",
      name: "Self-Service Premium",
      description: "All premium self-service features unlocked",
      includedServices: ["Self-Service Express", "Tire Shine & Treatment"],
      vehicleTypePricing: [
        { vehicleType: "Regular", price: 22, discountPrice: 18, duration: 30 },
        { vehicleType: "SUV", price: 26, discountPrice: 22, duration: 35 },
        { vehicleType: "Sedan", price: 24, discountPrice: 20, duration: 30 },
        { vehicleType: "Truck", price: 28, discountPrice: 24, duration: 40 },
      ],
      isActive: true,
      availableBranches: ["b1", "b3"],
      vehicleTypes: ["Regular", "SUV", "Sedan", "Truck"],
      rating: 4.6,
      bookingCount: 278,
      applicableModules: ["self_service"] as const,
    },
  ]);

  const [mockCampaigns, setMockCampaigns] = useState([
    {
      id: "c1",
      name: "Summer Special",
      description: "20% off all premium packages during summer months",
      type: "Percentage Discount",
      discountValue: 20,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      scope: "All Branches",
      applicableItems: ["Premium Complete Package"],
      isActive: true,
      createdDate: "2024-05-15",
    },
  ]);

  // Mock Station Data - ALL 33 STATIONS FOR 6 BUSINESS MODULES
  const [mockStations, setMockStations] = useState<Station[]>([
    // ========== IN-BAY AUTOMATIC (5 stations) ==========
    { id: "inbay-1", name: "Bay 1 - Premium", type: "in-bay", businessModule: "in_bay", operationModel: "walk-in", status: "occupied", currentBooking: { customer: "John Doe", service: "Premium Wash", endsIn: "8 min" }, capacity: { avgServiceTime: 30, servicesPerHour: 2, currentLoad: 75 }, lastUpdated: new Date() },
    { id: "inbay-2", name: "Bay 2 - Standard", type: "in-bay", businessModule: "in_bay", operationModel: "walk-in", status: "available", capacity: { avgServiceTime: 25, servicesPerHour: 2.4, currentLoad: 45 }, lastUpdated: new Date() },
    { id: "inbay-3", name: "Bay 3 - Express", type: "in-bay", businessModule: "in_bay", operationModel: "walk-in", status: "occupied", currentBooking: { customer: "Mike Wilson", service: "Express Wash", endsIn: "12 min" }, capacity: { avgServiceTime: 20, servicesPerHour: 3, currentLoad: 60 }, lastUpdated: new Date() },
    { id: "inbay-4", name: "Bay 4 - Deluxe", type: "in-bay", businessModule: "in_bay", operationModel: "walk-in", status: "available", capacity: { avgServiceTime: 35, servicesPerHour: 1.7, currentLoad: 30 }, lastUpdated: new Date() },
    { id: "inbay-5", name: "Bay 5 - Ultimate", type: "in-bay", businessModule: "in_bay", operationModel: "walk-in", status: "maintenance", capacity: { avgServiceTime: 40, servicesPerHour: 1.5, currentLoad: 0 }, lastUpdated: new Date() },
    
    // ========== TUNNEL WASH (3 stations) ==========
    { id: "tunnel-1", name: "Tunnel Line A", type: "tunnel", businessModule: "tunnel", operationModel: "walk-in", status: "occupied", currentBooking: { customer: "Sarah Johnson", service: "Full Tunnel Wash", endsIn: "5 min" }, capacity: { avgServiceTime: 8, servicesPerHour: 7, currentLoad: 80 }, lastUpdated: new Date() },
    { id: "tunnel-2", name: "Tunnel Line B", type: "tunnel", businessModule: "tunnel", operationModel: "walk-in", status: "available", capacity: { avgServiceTime: 8, servicesPerHour: 7, currentLoad: 35 }, lastUpdated: new Date() },
    { id: "tunnel-3", name: "Tunnel Line C - Express", type: "tunnel", businessModule: "tunnel", operationModel: "walk-in", status: "occupied", currentBooking: { customer: "Robert Chen", service: "Quick Tunnel", endsIn: "3 min" }, capacity: { avgServiceTime: 6, servicesPerHour: 10, currentLoad: 65 }, lastUpdated: new Date() },
    
    // ========== SELF-SERVICE (4 stations) ==========
    { id: "self-1", name: "Self-Service Bay 1", type: "self-service", businessModule: "self_service", operationModel: "walk-in", status: "occupied", currentBooking: { customer: "David Lee", service: "Self Wash", endsIn: "18 min" }, capacity: { avgServiceTime: 25, servicesPerHour: 2.4, currentLoad: 55 }, lastUpdated: new Date() },
    { id: "self-2", name: "Self-Service Bay 2", type: "self-service", businessModule: "self_service", operationModel: "walk-in", status: "available", capacity: { avgServiceTime: 25, servicesPerHour: 2.4, currentLoad: 20 }, lastUpdated: new Date() },
    { id: "self-3", name: "Self-Service Bay 3", type: "self-service", businessModule: "self_service", operationModel: "walk-in", status: "occupied", currentBooking: { customer: "Lisa Wang", service: "Premium Self Wash", endsIn: "22 min" }, capacity: { avgServiceTime: 30, servicesPerHour: 2, currentLoad: 70 }, lastUpdated: new Date() },
    { id: "self-4", name: "Self-Service Bay 4 - Premium", type: "self-service", businessModule: "self_service", operationModel: "walk-in", status: "cleaning", capacity: { avgServiceTime: 30, servicesPerHour: 2, currentLoad: 0 }, lastUpdated: new Date() },
    
    // ========== MANUAL DETAILING (7 stations) ==========
    { id: "detail-1", name: "Detail Station Alpha", type: "manual-detailing", businessModule: "manual_detailing", operationModel: "reservation", status: "occupied", currentBooking: { customer: "Emma Davis", service: "Full Interior Detail", endsIn: "45 min" }, nextBooking: { customer: "Chris Lee", time: "2:00 PM" }, capacity: { avgServiceTime: 120, servicesPerHour: 0.5, currentLoad: 85 }, lastUpdated: new Date() },
    { id: "detail-2", name: "Detail Station Beta", type: "manual-detailing", businessModule: "manual_detailing", operationModel: "reservation", status: "available", capacity: { avgServiceTime: 120, servicesPerHour: 0.5, currentLoad: 30 }, lastUpdated: new Date() },
    { id: "detail-3", name: "Detail Station Gamma", type: "manual-detailing", businessModule: "manual_detailing", operationModel: "reservation", status: "occupied", currentBooking: { customer: "Michael Torres", service: "Paint Correction", endsIn: "90 min" }, capacity: { avgServiceTime: 180, servicesPerHour: 0.33, currentLoad: 75 }, lastUpdated: new Date() },
    { id: "detail-4", name: "Detail Station Delta", type: "manual-detailing", businessModule: "manual_detailing", operationModel: "reservation", status: "available", capacity: { avgServiceTime: 120, servicesPerHour: 0.5, currentLoad: 15 }, lastUpdated: new Date() },
    { id: "detail-5", name: "Detail Station Epsilon - Premium", type: "manual-detailing", businessModule: "manual_detailing", operationModel: "reservation", status: "occupied", currentBooking: { customer: "Jennifer Kim", service: "Ceramic Coating", endsIn: "180 min" }, capacity: { avgServiceTime: 240, servicesPerHour: 0.25, currentLoad: 90 }, lastUpdated: new Date() },
    { id: "detail-6", name: "Detail Station Zeta", type: "manual-detailing", businessModule: "manual_detailing", operationModel: "reservation", status: "available", capacity: { avgServiceTime: 120, servicesPerHour: 0.5, currentLoad: 25 }, lastUpdated: new Date() },
    { id: "detail-7", name: "Detail Station Omega - Luxury", type: "manual-detailing", businessModule: "manual_detailing", operationModel: "reservation", status: "occupied", currentBooking: { customer: "Alexander Wright", service: "Full Luxury Package", endsIn: "120 min" }, capacity: { avgServiceTime: 300, servicesPerHour: 0.2, currentLoad: 80 }, lastUpdated: new Date() },
    
    // ========== MOBILE SERVICE (6 stations - Virtual) ==========
    { id: "mobile-1", name: "Mobile Unit 1", type: "mobile", businessModule: "mobile", operationModel: "reservation", status: "occupied", currentBooking: { customer: "James Anderson", service: "Mobile Detailing", endsIn: "30 min" }, capacity: { avgServiceTime: 90, servicesPerHour: 0.67, currentLoad: 70 }, lastUpdated: new Date() },
    { id: "mobile-2", name: "Mobile Unit 2", type: "mobile", businessModule: "mobile", operationModel: "reservation", status: "available", capacity: { avgServiceTime: 90, servicesPerHour: 0.67, currentLoad: 20 }, lastUpdated: new Date() },
    { id: "mobile-3", name: "Mobile Unit 3", type: "mobile", businessModule: "mobile", operationModel: "reservation", status: "occupied", currentBooking: { customer: "Olivia Martinez", service: "Premium Mobile Detail", endsIn: "60 min" }, capacity: { avgServiceTime: 120, servicesPerHour: 0.5, currentLoad: 85 }, lastUpdated: new Date() },
    { id: "mobile-4", name: "Mobile Unit 4", type: "mobile", businessModule: "mobile", operationModel: "reservation", status: "available", capacity: { avgServiceTime: 90, servicesPerHour: 0.67, currentLoad: 10 }, lastUpdated: new Date() },
    { id: "mobile-5", name: "Mobile Unit 5 - Express", type: "mobile", businessModule: "mobile", operationModel: "reservation", status: "occupied", currentBooking: { customer: "William Garcia", service: "Express Mobile Wash", endsIn: "15 min" }, capacity: { avgServiceTime: 60, servicesPerHour: 1, currentLoad: 60 }, lastUpdated: new Date() },
    { id: "mobile-6", name: "Mobile Unit 6 - Premium", type: "mobile", businessModule: "mobile", operationModel: "reservation", status: "available", capacity: { avgServiceTime: 120, servicesPerHour: 0.5, currentLoad: 30 }, lastUpdated: new Date() },
    
    // ========== PICK-UP & DROP-OFF (8 stations) ==========
    { id: "pickup-1", name: "Pick-up Station 1", type: "pickup-dropoff", businessModule: "pickup_dropoff", operationModel: "reservation", status: "occupied", currentBooking: { customer: "Sophia Brown", service: "Full Detail Package", endsIn: "75 min" }, capacity: { avgServiceTime: 150, servicesPerHour: 0.4, currentLoad: 80 }, lastUpdated: new Date() },
    { id: "pickup-2", name: "Pick-up Station 2", type: "pickup-dropoff", businessModule: "pickup_dropoff", operationModel: "reservation", status: "available", capacity: { avgServiceTime: 150, servicesPerHour: 0.4, currentLoad: 25 }, lastUpdated: new Date() },
    { id: "pickup-3", name: "Pick-up Station 3 - Express", type: "pickup-dropoff", businessModule: "pickup_dropoff", operationModel: "reservation", status: "occupied", currentBooking: { customer: "Ethan Taylor", service: "Quick Detail", endsIn: "40 min" }, capacity: { avgServiceTime: 90, servicesPerHour: 0.67, currentLoad: 65 }, lastUpdated: new Date() },
    { id: "pickup-4", name: "Pick-up Station 4", type: "pickup-dropoff", businessModule: "pickup_dropoff", operationModel: "reservation", status: "available", capacity: { avgServiceTime: 150, servicesPerHour: 0.4, currentLoad: 15 }, lastUpdated: new Date() },
    { id: "pickup-5", name: "Pick-up Station 5 - Premium", type: "pickup-dropoff", businessModule: "pickup_dropoff", operationModel: "reservation", status: "occupied", currentBooking: { customer: "Isabella Moore", service: "Luxury Detail Package", endsIn: "120 min" }, capacity: { avgServiceTime: 240, servicesPerHour: 0.25, currentLoad: 90 }, lastUpdated: new Date() },
    { id: "pickup-6", name: "Pick-up Station 6", type: "pickup-dropoff", businessModule: "pickup_dropoff", operationModel: "reservation", status: "available", capacity: { avgServiceTime: 150, servicesPerHour: 0.4, currentLoad: 20 }, lastUpdated: new Date() },
    { id: "pickup-7", name: "Pick-up Station 7", type: "pickup-dropoff", businessModule: "pickup_dropoff", operationModel: "reservation", status: "occupied", currentBooking: { customer: "Mason White", service: "Complete Package", endsIn: "90 min" }, capacity: { avgServiceTime: 180, servicesPerHour: 0.33, currentLoad: 75 }, lastUpdated: new Date() },
    { id: "pickup-8", name: "Pick-up Station 8 - Deluxe", type: "pickup-dropoff", businessModule: "pickup_dropoff", operationModel: "reservation", status: "available", capacity: { avgServiceTime: 180, servicesPerHour: 0.33, currentLoad: 30 }, lastUpdated: new Date() },
  ]);

  const handleStationStatusChange = (stationId: string, newStatus: StationStatus) => {
    setMockStations((prev) =>
      prev.map((station) =>
        station.id === stationId
          ? { ...station, status: newStatus, lastUpdated: new Date() }
          : station
      )
    );
  };

  // Mock Reservation Data (includes manual detailing + mobile detailing + other modules)
  const [mockReservations, setMockReservations] = useState<Reservation[]>(() => {
    const manualReservations = generateTodayReservations(8);
    const mobileReservations = generateMobileReservations(5); // Add 5 mobile detailing reservations
    return [...manualReservations, ...mobileReservations];
  });
  
  // Mobile Detailing Reservations (separate for MobileDetailingDemo)
  const [mobileReservations, setMobileReservations] = useState<Reservation[]>(
    generateMobileReservations(10)
  );

  // 🎉 PHASE 2: RESERVATION WORKFLOW HANDLERS

  // Open reservation form from calendar
  const handleNewReservationRequest = (stationId: string, timeSlot?: string) => {
    const station = mockStations.find(s => s.id === stationId);
    const today = new Date().toISOString().split('T')[0];
    
    setReservationFormData({
      stationId,
      stationName: station?.name || "Manual Detail Station",
      preselectedDate: today,
      preselectedTime: timeSlot || "",
    });
    setShowReservationForm(true);
  };

  // Submit new reservation request
  const handleReservationSubmit = (data: ReservationFormData) => {
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      customer: {
        id: `cust-${Date.now()}`,
        name: data.customerName,
        phone: data.customerPhone,
        email: data.customerEmail,
      },
      vehicle: {
        brand: data.vehicleBrand,
        model: data.vehicleModel,
        plate: data.vehiclePlate,
        color: data.vehicleColor,
      },
      stationId: data.stationId,
      serviceId: data.serviceId,
      scheduledDate: data.scheduledDate,
      scheduledStartTime: data.scheduledStartTime,
      duration: 120, // Default to 120 minutes
      price: 199.99, // Default price
      status: "requested",
      notes: data.notes,
      confirmationCode: `LW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };

    setMockReservations(prev => [...prev, newReservation]);
    setShowReservationForm(false);
    setReservationFormData(null);
    
    toast.success("Reservation request submitted successfully!");
  };

  // Approve reservation
  const handleApproveReservation = (reservationId: string) => {
    setMockReservations(prev =>
      prev.map(r =>
        r.id === reservationId
          ? { ...r, status: "reserved" as const }
          : r
      )
    );
    toast.success("Reservation approved!");
  };

  // Reject reservation
  const handleRejectReservation = (reservationId: string, reason?: string) => {
    setMockReservations(prev =>
      prev.map(r =>
        r.id === reservationId
          ? { ...r, status: "cancelled" as const, cancellationReason: reason }
          : r
      )
    );
    toast.success("Reservation rejected");
  };

  // Open alternative suggestion dialog
  const handleSuggestAlternative = (reservationId: string) => {
    const reservation = mockReservations.find(r => r.id === reservationId);
    if (reservation) {
      setSelectedReservationForSuggestion(reservation);
      setShowAlternativeSuggestionDialog(true);
    }
  };

  // Submit alternative suggestion
  const handleSubmitAlternativeSuggestion = (data: SuggestionData) => {
    console.log("Alternative suggestion:", data);
    toast.success("Alternative suggestions sent to customer!");
    setShowAlternativeSuggestionDialog(false);
    setSelectedReservationForSuggestion(null);
  };

  // Check-in customer
  const handleCheckIn = (reservationId: string, method: "qr" | "ocr" | "manual") => {
    setMockReservations(prev =>
      prev.map(r =>
        r.id === reservationId
          ? { ...r, status: "checked-in" as const }
          : r
      )
    );
    toast.success(`Customer checked in successfully via ${method.toUpperCase()}!`);
  };

  // 🎉 PHASE 2.1: SERVICE PROGRESS TRACKER HANDLERS

  // Auto-confirm reservation when 4-hour deadline passes
  const handleAutoConfirm = (reservationId: string) => {
    setMockReservations(prev =>
      prev.map(r =>
        r.id === reservationId
          ? { ...r, status: "confirmed" as const }
          : r
      )
    );
    toast.success("Reservation auto-confirmed (4-hour deadline passed)");
  };

  // Manual confirmation
  const handleManualConfirm = (reservationId: string) => {
    setMockReservations(prev =>
      prev.map(r =>
        r.id === reservationId
          ? { ...r, status: "confirmed" as const }
          : r
      )
    );
    toast.success("Reservation confirmed!");
  };

  // Cancel reservation
  const handleCancelReservation = (reservationId: string) => {
    setMockReservations(prev =>
      prev.map(r =>
        r.id === reservationId
          ? { ...r, status: "cancelled" as const }
          : r
      )
    );
    toast.info("Reservation cancelled");
  };

  // Start service (move from checked-in to in-progress)
  const handleStartService = (reservationId: string) => {
    setMockReservations(prev =>
      prev.map(r =>
        r.id === reservationId
          ? { ...r, status: "in-progress" as const }
          : r
      )
    );
    toast.success("Service started!");
  };

  // Update service progress
  const handleProgressUpdate = (reservationId: string, progress: number, stage: string) => {
    // Update reservation with progress data (in real app, would update DB)
    console.log(`Reservation ${reservationId}: ${progress}% - Stage: ${stage}`);
  };

  // Service completed (progress reaches 100%)
  const handleServiceComplete = (reservationId: string) => {
    // Open completion workflow dialog
    const reservation = mockReservations.find(r => r.id === reservationId);
    if (reservation) {
      setSelectedReservationForCompletion(reservation);
      setShowCompletionWorkflow(true);
    }
  };

  // Pause service
  const handlePauseService = (reservationId: string) => {
    toast.info("Service paused");
  };

  // Resume service
  const handleResumeService = (reservationId: string) => {
    toast.success("Service resumed");
  };

  // Complete service with all details (photos, signature, payment)
  const handleCompleteService = (reservationId: string, data: CompletionData) => {
    setMockReservations(prev =>
      prev.map(r =>
        r.id === reservationId
          ? { 
              ...r, 
              status: "completed" as const,
              completionData: data 
            }
          : r
      )
    );
    toast.success(`Service completed! Payment received via ${data.paymentMethod}`);
    setShowCompletionWorkflow(false);
    setSelectedReservationForCompletion(null);
  };

  // Customer picks up vehicle
  const handlePickup = (reservationId: string) => {
    setMockReservations(prev =>
      prev.map(r =>
        r.id === reservationId
          ? { ...r, status: "picked-up" as const }
          : r
      )
    );
    toast.success("Vehicle picked up by customer");
  };

  const [mockCustomers, setMockCustomers] = useState([
    // B2C Customers - Car Owners for AutoWash Pro (owner1)
    {
      id: "cust1",
      root_owner_id: "root1",
      carwash_owner_id: "owner1",
      centerId: "1",
      branchId: "b1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1-555-1001",
      carPlateNumber: "ABC-1234",
      vehicleType: "Sedan",
      totalBookings: 12,
      totalSpent: 450,
      lastVisit: "2024-01-25",
      registeredDate: "2023-06-15",
      status: "active" as const,
      branchName: "Downtown Branch",
      centerName: "AutoWash Pro",
    },
    {
      id: "cust2",
      root_owner_id: "root1",
      carwash_owner_id: "owner1",
      centerId: "1",
      branchId: "b1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1-555-1002",
      carPlateNumber: "XYZ-5678",
      vehicleType: "SUV",
      totalBookings: 8,
      totalSpent: 320,
      lastVisit: "2024-01-28",
      registeredDate: "2023-08-20",
      status: "active" as const,
      branchName: "Downtown Branch",
      centerName: "AutoWash Pro",
    },
    {
      id: "cust3",
      root_owner_id: "root1",
      carwash_owner_id: "owner1",
      centerId: "1",
      branchId: "b2",
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1-555-1003",
      carPlateNumber: "DEF-9012",
      vehicleType: "Sedan",
      totalBookings: 15,
      totalSpent: 580,
      lastVisit: "2024-01-26",
      registeredDate: "2023-05-10",
      status: "active" as const,
      branchName: "Uptown Branch",
      centerName: "AutoWash Pro",
    },
    {
      id: "cust4",
      root_owner_id: "root1",
      carwash_owner_id: "owner1",
      centerId: "1",
      branchId: "b2",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1-555-1004",
      carPlateNumber: "GHI-3456",
      vehicleType: "SUV",
      totalBookings: 6,
      totalSpent: 240,
      lastVisit: "2024-01-22",
      registeredDate: "2023-09-05",
      status: "active" as const,
      branchName: "Uptown Branch",
      centerName: "AutoWash Pro",
    },
    {
      id: "cust5",
      root_owner_id: "root1",
      carwash_owner_id: "owner1",
      centerId: "1",
      branchId: "b3",
      name: "David Wilson",
      email: "d.wilson@email.com",
      phone: "+1-555-1005",
      carPlateNumber: "JKL-7890",
      vehicleType: "Truck",
      totalBookings: 4,
      totalSpent: 180,
      lastVisit: "2024-01-20",
      registeredDate: "2023-10-12",
      status: "active" as const,
      branchName: "Brooklyn Branch",
      centerName: "AutoWash Pro",
    },
    // Customers for Clean & Shine (owner2)
    {
      id: "cust6",
      root_owner_id: "root1",
      carwash_owner_id: "owner2",
      centerId: "2",
      branchId: "b4",
      name: "Lisa Martinez",
      email: "lisa.m@email.com",
      phone: "+1-555-2001",
      carPlateNumber: "MNO-1234",
      vehicleType: "Regular",
      totalBookings: 10,
      totalSpent: 350,
      lastVisit: "2024-01-27",
      registeredDate: "2023-07-18",
      status: "active" as const,
      branchName: "Main Branch",
      centerName: "Clean & Shine",
    },
    {
      id: "cust7",
      root_owner_id: "root1",
      carwash_owner_id: "owner2",
      centerId: "2",
      branchId: "b4",
      name: "Robert Anderson",
      email: "r.anderson@email.com",
      phone: "+1-555-2002",
      carPlateNumber: "PQR-5678",
      vehicleType: "SUV",
      totalBookings: 7,
      totalSpent: 280,
      lastVisit: "2024-01-24",
      registeredDate: "2023-08-25",
      status: "active" as const,
      branchName: "Main Branch",
      centerName: "Clean & Shine",
    },
    // Customers for SpeedWash Express (owner3)
    {
      id: "cust8",
      root_owner_id: "root1",
      carwash_owner_id: "owner3",
      centerId: "3",
      branchId: "b5",
      name: "Amanda Foster",
      email: "amanda.f@email.com",
      phone: "+1-555-3001",
      carPlateNumber: "STU-9012",
      vehicleType: "Sedan",
      totalBookings: 20,
      totalSpent: 750,
      lastVisit: "2024-01-29",
      registeredDate: "2023-04-15",
      status: "active" as const,
      branchName: "North Side Branch",
      centerName: "SpeedWash Express",
    },
    {
      id: "cust9",
      root_owner_id: "root1",
      carwash_owner_id: "owner3",
      centerId: "3",
      branchId: "b6",
      name: "Kevin Park",
      email: "kevin.p@email.com",
      phone: "+1-555-3002",
      carPlateNumber: "VWX-3456",
      vehicleType: "Van",
      totalBookings: 9,
      totalSpent: 340,
      lastVisit: "2024-01-26",
      registeredDate: "2023-06-22",
      status: "active" as const,
      branchName: "South Side Branch",
      centerName: "SpeedWash Express",
    },
    {
      id: "cust10",
      root_owner_id: "root1",
      carwash_owner_id: "owner3",
      centerId: "3",
      branchId: "b7",
      name: "Rachel Green",
      email: "rachel.g@email.com",
      phone: "+1-555-3003",
      carPlateNumber: "YZA-7890",
      vehicleType: "Sedan",
      totalBookings: 11,
      totalSpent: 420,
      lastVisit: "2024-01-28",
      registeredDate: "2023-05-30",
      status: "active" as const,
      branchName: "West Loop Branch",
      centerName: "SpeedWash Express",
    },
    // Customers for EcoClean Wash (owner4)
    {
      id: "cust11",
      root_owner_id: "root1",
      carwash_owner_id: "owner4",
      centerId: "4",
      branchId: "b10",
      name: "Tom Wilson",
      email: "tom.w@email.com",
      phone: "+1-555-4001",
      carPlateNumber: "BCD-1234",
      vehicleType: "Electric",
      totalBookings: 13,
      totalSpent: 490,
      lastVisit: "2024-01-27",
      registeredDate: "2023-07-08",
      status: "active" as const,
      branchName: "Mission Branch",
      centerName: "EcoClean Wash",
    },
    {
      id: "cust12",
      root_owner_id: "root1",
      carwash_owner_id: "owner4",
      centerId: "4",
      branchId: "b11",
      name: "Jennifer Lee",
      email: "jennifer.l@email.com",
      phone: "+1-555-4002",
      carPlateNumber: "EFG-5678",
      vehicleType: "SUV",
      totalBookings: 5,
      totalSpent: 200,
      lastVisit: "2024-01-23",
      registeredDate: "2023-09-14",
      status: "active" as const,
      branchName: "Marina Branch",
      centerName: "EcoClean Wash",
    },
  ]);

  // Mock booking data for capacity planning
  const [mockBookings, setMockBookings] = useState([
    // Pending approval customer requests
    {
      id: "br1",
      customerName: "Emily Davis",
      customerPhone: "+1-555-0123",
      customerEmail: "emily.davis@email.com",
      carPlateNumber: "DAV-0123",
      date: new Date().toISOString().split('T')[0],
      time: "11:00",
      service: "Premium Deluxe",
      vehicleType: "SUV", 
      estimatedDuration: 90,
      status: "pending-approval" as const,
      submittedAt: "2024-08-10T14:30:00Z",
      branchId: "b1",
      notes: "Please use premium wax",
      price: 45,
      station: "Detail Station Alpha",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
    },
    {
      id: "br2", 
      customerName: "David Wilson",
      customerPhone: "+1-555-0456",
      customerEmail: "david.wilson@email.com",
      carPlateNumber: "WIL-0456",
      date: new Date().toISOString().split('T')[0],
      time: "13:00",
      service: "Basic Wash",
      vehicleType: "Truck",
      estimatedDuration: 60,
      status: "pending-approval" as const,
      submittedAt: "2024-08-10T16:45:00Z",
      branchId: "b1",
      price: 32,
      station: "Tunnel Line A",
      createdBy: "customer" as const,
      businessModule: "tunnel" as const,
    },
    // Reserved bookings (was "confirmed")
    {
      id: "cb1",
      customerName: "Jane Smith",
      customerPhone: "+1-555-0789",
      customerEmail: "jane.smith@email.com",
      carPlateNumber: "SMI-0789",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      service: "Premium Detail",
      vehicleType: "Sedan",
      estimatedDuration: 90,
      status: "reserved" as const,
      submittedAt: "2024-08-09T10:00:00Z",
      branchId: "b1",
      price: 85,
      station: "Detail Station Beta",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
    },
    {
      id: "cb2",
      customerName: "Mike Johnson",
      customerPhone: "+1-555-0321",
      customerEmail: "mike.johnson@email.com",
      carPlateNumber: "JOH-0321", 
      date: new Date().toISOString().split('T')[0],
      time: "10:30",
      service: "Interior Clean",
      vehicleType: "SUV",
      estimatedDuration: 45,
      status: "approved" as const,
      submittedAt: "2024-08-08T15:30:00Z",
      branchId: "b1",
      price: 25,
      station: "Bay 2",
      createdBy: "admin" as const,
      businessModule: "in_bay" as const,
    },
    {
      id: "cb3",
      customerName: "Sarah Connor",
      customerPhone: "+1-555-0654",
      customerEmail: "sarah.connor@email.com",
      carPlateNumber: "CON-0654",
      date: new Date().toISOString().split('T')[0], 
      time: "14:00",
      service: "Full Service",
      vehicleType: "Regular",
      estimatedDuration: 75,
      status: "in-progress" as const,
      submittedAt: "2024-08-11T12:00:00Z",
      branchId: "b1",
      price: 55,
      station: "Self-Service Bay 2",
      createdBy: "customer" as const,
      businessModule: "self_service" as const,
    },
    // Additional booking for comprehensive status demonstration
    {
      id: "cb4",
      customerName: "Alex Thompson",
      customerPhone: "+1-555-7890",
      customerEmail: "alex.thompson@email.com",
      carPlateNumber: "THO-7890",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "15:00",
      service: "Complete Detail",
      vehicleType: "Sedan",
      estimatedDuration: 120,
      status: "completed" as const,
      submittedAt: "2024-08-09T09:00:00Z",
      branchId: "b1",
      price: 95,
      station: "station1",
      createdBy: "customer" as const
    },
    // AI Campaign booking
    {
      id: "cb4a",
      customerName: "Rachel Martinez",
      customerPhone: "+1-555-9999",
      customerEmail: "rachel.martinez@email.com",
      carPlateNumber: "MAR-9999",
      date: new Date().toISOString().split('T')[0],
      time: "06:30",
      service: "Early Bird Express",
      vehicleType: "Regular",
      estimatedDuration: 30,
      status: "ai-campaign" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 14,
      station: "station1",
      createdBy: "customer" as const,
      notes: "Booked via Early Bird Express AI campaign (30% off)"
    },
    // Add a sample from today for easier testing
    {
      id: "cb5",
      customerName: "Maria Garcia",
      customerPhone: "+1-555-4567",
      customerEmail: "maria.garcia@email.com",
      carPlateNumber: "NYC-2024",
      date: new Date().toISOString().split('T')[0], // Today's date
      time: "11:30",
      service: "Express Wash",
      vehicleType: "Regular",
      estimatedDuration: 30,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 20,
      station: "station2",
      createdBy: "admin" as const
    },
    // More diverse bookings for different dates and statuses
    {
      id: "cb6",
      customerName: "Robert Kim",
      customerPhone: "+1-555-8901",
      customerEmail: "robert.kim@email.com",
      carPlateNumber: "BMW-7890",
      date: new Date().toISOString().split('T')[0],
      time: "08:30",
      service: "Premium Complete Package",
      vehicleType: "SUV",
      estimatedDuration: 75,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 70,
      station: "station1",
      createdBy: "customer" as const
    },
    {
      id: "cb7",
      customerName: "Lisa Chen",
      customerPhone: "+1-555-2345",
      customerEmail: "lisa.chen@email.com",
      carPlateNumber: "TES-2345",
      date: new Date().toISOString().split('T')[0],
      time: "12:30",
      service: "Exterior Wash",
      vehicleType: "Sedan",
      estimatedDuration: 25,
      status: "pending-approval" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 18,
      station: "station3",
      createdBy: "customer" as const
    },
    {
      id: "cb8",
      customerName: "James Rodriguez",
      customerPhone: "+1-555-6789",
      customerEmail: "james.rodriguez@email.com",
      carPlateNumber: "VAN-6789",
      date: new Date().toISOString().split('T')[0],
      time: "13:30",
      service: "Interior Cleaning",
      vehicleType: "Van",
      estimatedDuration: 35,
      status: "in-progress" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 28,
      station: "station4",
      createdBy: "admin" as const
    },
    {
      id: "cb9",
      customerName: "Amanda Foster",
      customerPhone: "+1-555-3456",
      customerEmail: "amanda.foster@email.com",
      carPlateNumber: "FOR-3456",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
      time: "10:00",
      service: "Premium Wax Application",
      vehicleType: "Regular",
      estimatedDuration: 35,
      status: "completed" as const,
      submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 38,
      station: "station2",
      createdBy: "customer" as const
    },
    {
      id: "cb10",
      customerName: "Michael Park",
      customerPhone: "+1-555-7654",
      customerEmail: "michael.park@email.com",
      carPlateNumber: "TRK-7654",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
      time: "14:30",
      service: "Tire Shine & Treatment",
      vehicleType: "Truck",
      estimatedDuration: 15,
      status: "no-show" as const,
      submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 18,
      station: "station1",
      createdBy: "customer" as const,
      notes: "Customer did not show up for appointment"
    },
    // Add more bookings for today to populate the calendar
    {
      id: "cb11",
      customerName: "Kevin Martinez",
      customerPhone: "+1-555-1111",
      customerEmail: "kevin.martinez@email.com",
      carPlateNumber: "MAR-1111",
      date: new Date().toISOString().split('T')[0],
      time: "15:00",
      service: "Express Wash",
      vehicleType: "Regular",
      estimatedDuration: 30,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 20,
      station: "station5",
      createdBy: "customer" as const
    },
    {
      id: "cb12",
      customerName: "Rachel Green",
      customerPhone: "+1-555-2222",
      customerEmail: "rachel.green@email.com",
      carPlateNumber: "GRE-2222",
      date: new Date().toISOString().split('T')[0],
      time: "16:30",
      service: "Interior + Exterior",
      vehicleType: "SUV",
      estimatedDuration: 60,
      status: "canceled" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 45,
      station: "station6",
      createdBy: "customer" as const,
      notes: "Customer canceled - weather concerns"
    },
    {
      id: "cb12a",
      customerName: "Tom Anderson",
      customerPhone: "+1-555-3333",
      customerEmail: "tom.anderson@email.com",
      carPlateNumber: "AND-3333",
      date: new Date().toISOString().split('T')[0],
      time: "14:30",
      service: "Premium Detail",
      vehicleType: "Sedan",
      estimatedDuration: 90,
      status: "rescheduled" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 85,
      station: "station4",
      createdBy: "customer" as const,
      notes: "Rescheduled to tomorrow at 10:00 AM"
    },
    {
      id: "cb13",
      customerName: "Tom Wilson",
      customerPhone: "+1-555-3333",
      customerEmail: "tom.wilson@email.com",
      carPlateNumber: "WIL-3333",
      date: new Date().toISOString().split('T')[0],
      time: "17:00",
      service: "Premium Wax Application",
      vehicleType: "Sedan",
      estimatedDuration: 35,
      status: "completed" as const,
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 38,
      station: "station3",
      createdBy: "admin" as const
    },
    // Tomorrow's bookings
    {
      id: "cb14",
      customerName: "Jennifer Lee",
      customerPhone: "+1-555-4444",
      customerEmail: "jennifer.lee@email.com",
      carPlateNumber: "LEE-4444",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "09:00",
      service: "Premium Complete Package",
      vehicleType: "SUV",
      estimatedDuration: 85,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 80,
      station: "station1",
      createdBy: "customer" as const
    },
    {
      id: "cb15",
      customerName: "Christopher Brown",
      customerPhone: "+1-555-5555",
      customerEmail: "chris.brown@email.com",
      carPlateNumber: "BRO-5555",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "10:30",
      service: "Interior Cleaning",
      vehicleType: "Sedan",
      estimatedDuration: 27,
      status: "pending-approval" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 22,
      station: "station2",
      createdBy: "customer" as const
    },
    {
      id: "cb16",
      customerName: "Patricia Taylor",
      customerPhone: "+1-555-6666",
      customerEmail: "patricia.taylor@email.com",
      carPlateNumber: "TAY-6666",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "13:00",
      service: "Exterior Wash",
      vehicleType: "Regular",
      estimatedDuration: 25,
      status: "approved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 18,
      station: "station3",
      createdBy: "admin" as const
    },
    {
      id: "cb17",
      customerName: "Daniel Martinez",
      customerPhone: "+1-555-7777",
      customerEmail: "daniel.martinez@email.com",
      carPlateNumber: "MAR-7777",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "15:30",
      service: "Tire Shine & Treatment",
      vehicleType: "Truck",
      estimatedDuration: 15,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 18,
      station: "station4",
      createdBy: "customer" as const
    },
    {
      id: "cb18",
      customerName: "Michelle Garcia",
      customerPhone: "+1-555-8888",
      customerEmail: "michelle.garcia@email.com",
      carPlateNumber: "GAR-8888",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "16:00",
      service: "Express Package",
      vehicleType: "SUV",
      estimatedDuration: 37,
      status: "pending-approval" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 28,
      station: "station5",
      createdBy: "customer" as const
    },

    // ==========================================
    // MANUAL DETAILING BOOKINGS - Comprehensive Data
    // ==========================================
    
    // Today - Manual Detailing - In Progress
    {
      id: "det1",
      customerName: "Marcus Chen",
      customerPhone: "+1-555-DET1",
      customerEmail: "marcus.chen@email.com",
      carPlateNumber: "POR-911",
      date: new Date().toISOString().split('T')[0],
      time: "08:00",
      service: "Full Detailing",
      vehicleType: "Regular",
      estimatedDuration: 120,
      status: "in-progress" as const,
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 150,
      station: "Detail Station Alpha",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "Porsche 911 - Premium wax requested. Started at 08:00."
    },
    
    // Today - Manual Detailing - Reserved (Premium Paint Correction)
    {
      id: "det2",
      customerName: "Victoria Sterling",
      customerPhone: "+1-555-DET2",
      customerEmail: "victoria.sterling@email.com",
      carPlateNumber: "BMW-M5",
      date: new Date().toISOString().split('T')[0],
      time: "11:00",
      service: "Paint Correction",
      vehicleType: "Regular",
      estimatedDuration: 180,
      status: "reserved" as const,
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 250,
      station: "Detail Station Premium",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "BMW M5 - Remove swirls and minor scratches. Customer pre-paid."
    },
    
    // Today - Manual Detailing - Pending Approval
    {
      id: "det3",
      customerName: "Ryan Foster",
      customerPhone: "+1-555-DET3",
      customerEmail: "ryan.foster@email.com",
      carPlateNumber: "TES-X",
      date: new Date().toISOString().split('T')[0],
      time: "15:00",
      service: "Ceramic Coating Application",
      vehicleType: "SUV",
      estimatedDuration: 240,
      status: "pending-approval" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 450,
      station: "Detail Station Premium",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "Tesla Model X - Full ceramic coating. Requires 4-hour booking slot confirmation."
    },
    
    // Today - Manual Detailing - Reserved (Interior Deep Clean)
    {
      id: "det4",
      customerName: "Amanda Richardson",
      customerPhone: "+1-555-DET4",
      customerEmail: "amanda.rich@email.com",
      carPlateNumber: "AUDI-Q7",
      date: new Date().toISOString().split('T')[0],
      time: "09:30",
      service: "Interior Deep Clean",
      vehicleType: "SUV",
      estimatedDuration: 90,
      status: "reserved" as const,
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 120,
      station: "Detail Station Beta",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "Audi Q7 - Pet hair removal + leather conditioning requested."
    },
    
    // Today - Manual Detailing - Completed
    {
      id: "det5",
      customerName: "James Mitchell",
      customerPhone: "+1-555-DET5",
      customerEmail: "james.mitchell@email.com",
      carPlateNumber: "MER-C63",
      date: new Date().toISOString().split('T')[0],
      time: "06:00",
      service: "Engine Bay Cleaning",
      vehicleType: "Regular",
      estimatedDuration: 45,
      status: "completed" as const,
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 75,
      station: "Detail Station Alpha",
      createdBy: "admin" as const,
      businessModule: "manual_detailing" as const,
      notes: "Mercedes C63 AMG - Engine detailing completed. Customer very satisfied."
    },
    
    // Tomorrow - Manual Detailing - Reserved (Headlight Restoration)
    {
      id: "det6",
      customerName: "Sophia Anderson",
      customerPhone: "+1-555-DET6",
      customerEmail: "sophia.anderson@email.com",
      carPlateNumber: "TOY-CAM",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "10:00",
      service: "Headlight Restoration",
      vehicleType: "Regular",
      estimatedDuration: 30,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 65,
      station: "Detail Station Beta",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "Toyota Camry 2015 - Oxidized headlights, restore clarity."
    },
    
    // Tomorrow - Manual Detailing - Reserved (Full Detailing + Wax)
    {
      id: "det7",
      customerName: "David Thompson",
      customerPhone: "+1-555-DET7",
      customerEmail: "david.thompson@email.com",
      carPlateNumber: "LEX-RX",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "08:00",
      service: "Full Detailing",
      vehicleType: "SUV",
      estimatedDuration: 150,
      status: "reserved" as const,
      submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 180,
      station: "Detail Station Alpha",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "Lexus RX350 - Complete interior/exterior + premium wax application."
    },
    
    // Tomorrow - Manual Detailing - Pending Approval (Wheel Detailing)
    {
      id: "det8",
      customerName: "Emma Rodriguez",
      customerPhone: "+1-555-DET8",
      customerEmail: "emma.rodriguez@email.com",
      carPlateNumber: "HON-CRV",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "14:00",
      service: "Wheel Detailing",
      vehicleType: "SUV",
      estimatedDuration: 25,
      status: "pending-approval" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 40,
      station: "Detail Station Beta",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "Honda CR-V - Deep clean wheels + tire dressing."
    },
    
    // Yesterday - Manual Detailing - Completed (Paint Correction)
    {
      id: "det9",
      customerName: "Oliver Bennett",
      customerPhone: "+1-555-DET9",
      customerEmail: "oliver.bennett@email.com",
      carPlateNumber: "AUD-A8",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "09:00",
      service: "Paint Correction",
      vehicleType: "Regular",
      estimatedDuration: 180,
      status: "completed" as const,
      submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 250,
      station: "Detail Station Premium",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "Audi A8 - Multi-stage paint correction completed. Showroom finish achieved."
    },
    
    // Yesterday - Manual Detailing - No Show
    {
      id: "det10",
      customerName: "Isabella Carter",
      customerPhone: "+1-555-DET10",
      customerEmail: "isabella.carter@email.com",
      carPlateNumber: "JEEP-GC",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "13:00",
      service: "Interior Deep Clean",
      vehicleType: "SUV",
      estimatedDuration: 90,
      status: "no-show" as const,
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 120,
      station: "Detail Station Beta",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "Jeep Grand Cherokee - Customer did not show up. No prior cancellation."
    },
    
    // Next Week - Manual Detailing - Reserved (Ceramic Coating)
    {
      id: "det11",
      customerName: "Benjamin Hayes",
      customerPhone: "+1-555-DET11",
      customerEmail: "benjamin.hayes@email.com",
      carPlateNumber: "POR-TAY",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "07:00",
      service: "Ceramic Coating Application",
      vehicleType: "SUV",
      estimatedDuration: 240,
      status: "reserved" as const,
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      branchId: "b1",
      price: 480,
      station: "Detail Station Premium",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "Porsche Taycan - Premium ceramic coating. Pre-paid. Early morning start."
    },
    
    // Next Week - Manual Detailing - Reserved (Engine Bay)
    {
      id: "det12",
      customerName: "Charlotte Lewis",
      customerPhone: "+1-555-DET12",
      customerEmail: "charlotte.lewis@email.com",
      carPlateNumber: "VOL-XC90",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "11:00",
      service: "Engine Bay Cleaning",
      vehicleType: "SUV",
      estimatedDuration: 45,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 75,
      station: "Detail Station Alpha",
      createdBy: "customer" as const,
      businessModule: "manual_detailing" as const,
      notes: "Volvo XC90 - Pre-sale preparation. Engine bay detailing required."
    },

    // Day after tomorrow
    {
      id: "cb19",
      customerName: "Andrew Robinson",
      customerPhone: "+1-555-9990",
      customerEmail: "andrew.robinson@email.com",
      carPlateNumber: "ROB-9990",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "08:00",
      service: "Premium Detail",
      vehicleType: "Sedan",
      estimatedDuration: 90,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 85,
      station: "station1",
      createdBy: "customer" as const
    },
    {
      id: "cb20",
      customerName: "Barbara White",
      customerPhone: "+1-555-9991",
      customerEmail: "barbara.white@email.com",
      carPlateNumber: "WHI-9991",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "11:00",
      service: "Interior Cleaning",
      vehicleType: "Van",
      estimatedDuration: 35,
      status: "approved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 28,
      station: "station2",
      createdBy: "admin" as const
    },
    {
      id: "cb21",
      customerName: "Kenneth Harris",
      customerPhone: "+1-555-9992",
      customerEmail: "kenneth.harris@email.com",
      carPlateNumber: "HAR-9992",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "14:00",
      service: "Complete Care Package",
      vehicleType: "SUV",
      estimatedDuration: 107,
      status: "pending-approval" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 80,
      station: "station3",
      createdBy: "customer" as const
    },
    // 3 days from now
    {
      id: "cb22",
      customerName: "Dorothy Clark",
      customerPhone: "+1-555-9993",
      customerEmail: "dorothy.clark@email.com",
      carPlateNumber: "CLA-9993",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "09:30",
      service: "Exterior Wash",
      vehicleType: "Regular",
      estimatedDuration: 25,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 18,
      station: "station1",
      createdBy: "customer" as const
    },
    {
      id: "cb23",
      customerName: "Steven Lewis",
      customerPhone: "+1-555-9994",
      customerEmail: "steven.lewis@email.com",
      carPlateNumber: "LEW-9994",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "12:00",
      service: "Premium Wax Application",
      vehicleType: "Sedan",
      estimatedDuration: 35,
      status: "approved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 38,
      station: "station2",
      createdBy: "admin" as const
    },
    {
      id: "cb24",
      customerName: "Betty Walker",
      customerPhone: "+1-555-9995",
      customerEmail: "betty.walker@email.com",
      carPlateNumber: "WAL-9995",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "15:00",
      service: "Express Package",
      vehicleType: "Regular",
      estimatedDuration: 30,
      status: "pending-approval" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 22,
      station: "station3",
      createdBy: "customer" as const
    },
    // 4 days from now
    {
      id: "cb25",
      customerName: "Paul Young",
      customerPhone: "+1-555-9996",
      customerEmail: "paul.young@email.com",
      carPlateNumber: "YOU-9996",
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "10:00",
      service: "Premium Complete Package",
      vehicleType: "SUV",
      estimatedDuration: 85,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 70,
      station: "station1",
      createdBy: "customer" as const
    },
    {
      id: "cb26",
      customerName: "Helen King",
      customerPhone: "+1-555-9997",
      customerEmail: "helen.king@email.com",
      carPlateNumber: "KIN-9997",
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "13:30",
      service: "Interior Cleaning",
      vehicleType: "Sedan",
      estimatedDuration: 27,
      status: "pending-approval" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 22,
      station: "station2",
      createdBy: "customer" as const
    },
    // More today bookings for better calendar view
    {
      id: "cb27",
      customerName: "George Scott",
      customerPhone: "+1-555-9998",
      customerEmail: "george.scott@email.com",
      carPlateNumber: "SCO-9998",
      date: new Date().toISOString().split('T')[0],
      time: "07:30",
      service: "Early Bird Express",
      vehicleType: "Regular",
      estimatedDuration: 30,
      status: "ai-campaign" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 14,
      station: "station1",
      createdBy: "customer" as const,
      notes: "Booked via Early Bird Express AI campaign (30% off)"
    },
    {
      id: "cb28",
      customerName: "Nancy Adams",
      customerPhone: "+1-555-9999-1",
      customerEmail: "nancy.adams@email.com",
      carPlateNumber: "ADA-9999",
      date: new Date().toISOString().split('T')[0],
      time: "18:00",
      service: "Tire Shine & Treatment",
      vehicleType: "Truck",
      estimatedDuration: 15,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 18,
      station: "station4",
      createdBy: "customer" as const
    },
    {
      id: "cb29",
      customerName: "Frank Baker",
      customerPhone: "+1-555-9999-2",
      customerEmail: "frank.baker@email.com",
      carPlateNumber: "BAK-9999",
      date: new Date().toISOString().split('T')[0],
      time: "19:00",
      service: "Express Wash",
      vehicleType: "Sedan",
      estimatedDuration: 30,
      status: "approved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b1",
      price: 20,
      station: "station5",
      createdBy: "admin" as const
    },
    // Branch b2 bookings (for Uptown Branch)
    {
      id: "cb30",
      customerName: "Sandra Nelson",
      customerPhone: "+1-555-8880",
      customerEmail: "sandra.nelson@email.com",
      carPlateNumber: "NEL-8880",
      date: new Date().toISOString().split('T')[0],
      time: "10:00",
      service: "Premium Complete Package",
      vehicleType: "SUV",
      estimatedDuration: 85,
      status: "reserved" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b2",
      price: 70,
      station: "station1",
      createdBy: "customer" as const
    },
    {
      id: "cb31",
      customerName: "Larry Carter",
      customerPhone: "+1-555-8881",
      customerEmail: "larry.carter@email.com",
      carPlateNumber: "CAR-8881",
      date: new Date().toISOString().split('T')[0],
      time: "14:00",
      service: "Exterior Wash",
      vehicleType: "Regular",
      estimatedDuration: 25,
      status: "in-progress" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b2",
      price: 18,
      station: "station2",
      createdBy: "admin" as const
    },
    {
      id: "cb32",
      customerName: "Karen Mitchell",
      customerPhone: "+1-555-8882",
      customerEmail: "karen.mitchell@email.com",
      carPlateNumber: "MIT-8882",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "11:30",
      service: "Interior Cleaning",
      vehicleType: "Van",
      estimatedDuration: 35,
      status: "pending-approval" as const,
      submittedAt: new Date().toISOString(),
      branchId: "b2",
      price: 28,
      station: "station3",
      createdBy: "customer" as const
    }
  ]);

  // Authentication handlers
  const handleLogin = async (email: string, password: string, provider?: string) => {
    setAuthError("");
    
    if (provider) {
      // Handle social login
      if (provider === "google") {
        setUser({
          id: "social_google_1",
          name: "John Smith",
          role: "carwash_owner",
          email: "john.smith@gmail.com",
          root_owner_id: "root1",
          carwash_owner_id: "owner_google_1",
          centerId: "google_center_1",
          centerName: "Google Wash Center",
          provider: "google",
        });
        toast.success("Successfully signed in with Google");
      } else if (provider === "apple") {
        setUser({
          id: "social_apple_1",
          name: "Jane Doe",
          role: "carwash_owner",
          email: "jane.doe@icloud.com",
          root_owner_id: "root1",
          carwash_owner_id: "owner_apple_1",
          centerId: "apple_center_1",
          centerName: "Apple Wash Center",
          provider: "apple",
        });
        toast.success("Successfully signed in with Apple");
      } else if (provider === "microsoft") {
        setUser({
          id: "social_microsoft_1",
          name: "Mike Johnson",
          role: "carwash_owner",
          email: "mike.johnson@outlook.com",
          root_owner_id: "root1",
          carwash_owner_id: "owner_microsoft_1",
          centerId: "microsoft_center_1",
          centerName: "Microsoft Wash Center",
          provider: "microsoft",
        });
        toast.success("Successfully signed in with Microsoft");
      }
    } else if (email === "root@letwash.com" && password === "root123") {
      setUser({
        id: "root1",
        root_owner_id: "root1",
        name: "Letwash Administrator",
        role: "root_owner",
        email: "root@letwash.com",
        centerName: "Letwash Platform",
      });
      toast.success("Successfully logged in as ROOT OWNER");
    } else if (email === "owner@autowash.com" && password === "owner123") {
      setUser({
        id: "owner1",
        root_owner_id: "root1",
        carwash_owner_id: "owner1",
        name: "AutoWash Owner",
        role: "carwash_owner",
        email: "owner@autowash.com",
        centerId: "center1",
        centerName: "AutoWash Pro",
      });
      toast.success("Successfully logged in as Carwash Owner");
    } else if (email === "admin@branch.com" && password === "admin123") {
      setUser({
        id: "admin1",
        root_owner_id: "root1",
        carwash_owner_id: "owner1",
        name: "Branch Admin",
        role: "carwash_admin",
        email: "admin@branch.com",
        centerId: "center1",
        centerName: "AutoWash Pro",
        assignedBranches: ["b1", "b2"],
      });
      toast.success("Successfully logged in as Branch Admin");
    } else {
      setAuthError("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("overview");
    toast.success("Successfully logged out");
  };

  // Review handlers
  const handleRespondToReview = (reviewId: string, response: string) => {
    setMockReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId
          ? {
              ...review,
              response: {
                text: response,
                respondedBy: user?.name || "Admin",
                respondedAt: new Date().toISOString()
              }
            }
          : review
      )
    );
  };

  const handleToggleReviewVisibility = (reviewId: string) => {
    setMockReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId
          ? {
              ...review,
              status: review.status === "hidden" ? "published" : "hidden"
            }
          : review
      )
    );
  };

  // Mock function implementations for the demo
  const handleCapacityChange = () => {};

  // Registration handlers
  const handleRegister = async (data: any) => {
    setPendingRegistrationData(data);
    setRegistrationEmail(data.email);
    setSocialProviderUsed(null);
    setCurrentAuthPage("business-modules");
  };

  const handleSocialRegister = async (provider: string, basicInfo: any) => {
    setSocialUserInfo(basicInfo);
    setCurrentAuthPage("social-complete");
  };

  const handleBusinessModulesSelected = (modules: BusinessModule[]) => {
    setSelectedBusinessModules(modules);
    setCurrentAuthPage("subscription-selection");
  };

  const handleSocialRegistrationComplete = async (completionData: any) => {
    const combinedData = {
      ...completionData,
      contactPerson: socialUserInfo.name,
      email: socialUserInfo.email,
    };
    setPendingRegistrationData(combinedData);
    setRegistrationEmail(socialUserInfo.email);
    setSocialProviderUsed(socialUserInfo.provider);
    setCurrentAuthPage("business-modules");
  };

  const handleSubscriptionComplete = (subscription: { tierId: string; billingCycle: "monthly" | "yearly" } | null) => {
    const newCenter = {
      id: String(mockCarwashCenters.length + 1),
      root_owner_id: "root1",
      carwash_owner_id: `owner${mockCarwashCenters.length + 1}`,
      name: pendingRegistrationData.centerName,
      contactPerson: pendingRegistrationData.contactPerson,
      email: pendingRegistrationData.email,
      phone: pendingRegistrationData.phone,
      address: pendingRegistrationData.address,
      city: pendingRegistrationData.city,
      district: pendingRegistrationData.district,
      branchCount: 0,
      accountType: subscription?.tierId === "starter" ? "standard" : subscription?.tierId === "enterprise" ? "premium" : "standard",
      companySize: "small" as const,
      carTypes: [],
      serviceTypes: [],
      branches: [],
      status: "pending" as const,
      registrationDate: new Date().toISOString().split('T')[0],
      subscription: subscription || undefined,
      businessModules: selectedBusinessModules, // Business modules
    };
    
    setMockCarwashCenters(prev => [...prev, newCenter]);
    setSelectedSubscription(subscription);
    setCurrentAuthPage("confirmation");
    
    if (subscription) {
      toast.success(`Registration completed with ${subscription.tierId} plan!`);
    } else {
      toast.success("Registration submitted successfully!");
    }
  };

  // Branch management handlers
  const handleDeleteBranches = (branchIds: string[]) => {
    setMockBranches(prev => prev.filter(branch => !branchIds.includes(branch.id)));
    setMockBookings(prev => prev.filter(booking => !branchIds.includes(booking.branchId)));
  };

  const handleAddBranch = (branchData: any) => {
    const newBranch = {
      ...branchData,
      id: `b${mockBranches.length + 1}`,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setMockBranches(prev => [...prev, newBranch]);
  };

  const handleNavigate = (page: string) => {
    if (page === "mobile-preview") {
      setShowMobilePreview(true);
    } else {
      setCurrentPage(page);
    }
  };

  // ROOT OWNER (Letwash Platform) Statistics
  const letwashStats = {
    totalCenters: mockCarwashCenters.filter(c => c.status === "active").length,
    pendingRequests: mockServiceRequests.filter(r => r.status === "pending").length,
    totalCustomers: mockCustomers.length * 10, // Simulated platform-wide customers
    totalServices: mockStandardServices.length,
    monthlyRevenue: "$45,680", // Platform-wide revenue
    activeBookings: mockBookings.length * 5, // Platform-wide bookings
  };

  // Statistics calculations
  const carwashStats = {
    activeServices: mockCenterServices.filter(s => s.isActive).length,
    totalPackages: mockCenterPackages.length,
    totalBranches: mockBranches.length,
    activeCampaigns: mockCampaigns.filter(c => c.isActive).length,
    monthlyBookings: 156,
    revenue: "$8,450",
    centerName: user?.centerName || "Your Center",
    appAcquiredCustomers: 87,
    appGeneratedRevenue: "$3,240",
    peakTimeAnalytics: {
      currentPeakHours: [
        {
          timeSlot: "5:00 PM - 7:00 PM",
          bookingCount: 24,
          revenueGenerated: 1680,
          utilizationRate: 87
        },
        {
          timeSlot: "12:00 PM - 2:00 PM", 
          bookingCount: 18,
          revenueGenerated: 1260,
          utilizationRate: 75
        },
        {
          timeSlot: "10:00 AM - 12:00 PM",
          bookingCount: 15,
          revenueGenerated: 1050,
          utilizationRate: 65
        }
      ],
      currentLowestHours: [
        {
          timeSlot: "6:00 AM - 8:00 AM",
          bookingCount: 3,
          revenueGenerated: 180,
          utilizationRate: 15
        },
        {
          timeSlot: "2:00 PM - 4:00 PM",
          bookingCount: 5,
          revenueGenerated: 320,
          utilizationRate: 25
        },
        {
          timeSlot: "8:00 PM - 10:00 PM",
          bookingCount: 4,
          revenueGenerated: 240,
          utilizationRate: 20
        }
      ],
      peakCampaignPerformance: {
        activePeakCampaigns: 3,
        peakTimeRevenue: "$3,990",
        conversionRate: 68,
        topPerformingSlot: "5:00 PM - 7:00 PM"
      },
      lowestHourInsights: {
        quietestDays: ["Tuesday", "Wednesday", "Thursday"],
        opportunityRevenue: "$1,850",
        averageCapacityUsed: 20,
        potentialGrowth: 65
      },
      aiCampaignSuggestions: [
        {
          id: "ai1",
          campaignName: "Early Bird Express",
          targetTimeSlot: "6:00 AM - 8:00 AM",
          campaignType: "Percentage Discount",
          discountValue: 30,
          predictedBookingIncrease: 85,
          predictedRevenue: "$540",
          confidence: 92,
          targetCustomerSegment: "Working Professionals",
          recommendedDuration: "2 weeks",
          aiReasoning: "Analysis shows early commuters value quick service and are price-sensitive. 30% discount during 6-8 AM will attract busy professionals starting their day."
        },
        {
          id: "ai2", 
          campaignName: "Afternoon Refresh",
          targetTimeSlot: "2:00 PM - 4:00 PM",
          campaignType: "Fixed Discount",
          discountValue: 15,
          predictedBookingIncrease: 65,
          predictedRevenue: "$420",
          confidence: 87,
          targetCustomerSegment: "Flexible Schedule Customers",
          recommendedDuration: "3 weeks",
          aiReasoning: "Mid-afternoon period shows potential for customers with flexible schedules. $15 fixed discount appeals to cost-conscious customers avoiding peak hours."
        },
        {
          id: "ai3",
          campaignName: "Night Owl Special",
          targetTimeSlot: "8:00 PM - 10:00 PM",
          campaignType: "Percentage Discount", 
          discountValue: 25,
          predictedBookingIncrease: 75,
          predictedRevenue: "$380",
          confidence: 79,
          targetCustomerSegment: "Evening Shift Workers",
          recommendedDuration: "4 weeks",
          aiReasoning: "Evening hours appeal to shift workers and night owls. 25% discount incentivizes after-work visits when competition is lower."
        }
      ],
      peakTimeInsights: {
        busyDays: ["Friday", "Saturday", "Sunday"],
        recommendedCapacity: 12,
        averageWaitTime: 8,
        customerSatisfaction: 92
      }
    }
  };

  // Branch admin stats (filtered for specific branch)
  const branchStats = {
    branchName: user?.branchName || "Downtown Branch",
    centerName: user?.centerName || "AutoWash Pro",
    todayBookings: mockBookings.filter(b => 
      b.branchId === user?.branchId && 
      b.date === new Date().toISOString().split('T')[0]
    ).length,
    pendingRequests: mockBookings.filter(b => 
      b.branchId === user?.branchId && 
      b.status === "pending-approval"
    ).length,
    activeServices: mockCenterServices.filter(s => 
      s.isActive && s.availableBranches.includes(user?.branchId || "")
    ).length,
    totalPackages: mockCenterPackages.filter(p => 
      p.availableBranches.includes(user?.branchId || "")
    ).length,
    monthlyRevenue: "$3,200",
    staffCount: mockBranches.find(b => b.id === user?.branchId)?.totalStaff || 8,
    address: mockBranches.find(b => b.id === user?.branchId)?.address || "123 Main Street, Suite 100",
    phone: mockBranches.find(b => b.id === user?.branchId)?.phone || "+1-555-0123",
    isActive: mockBranches.find(b => b.id === user?.branchId)?.isActive || true,
  };

  // Mobile preview data
  const mobilePreviewData = {
    name: user?.centerName || "AutoWash Pro",
    rating: 4.7,
    reviewCount: 3000,
    address: "123 Main Street, Manhattan, NY",
    isOpen: true,
    closeTime: "21:00",
    images: [],
    packages: mockCenterPackages.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      price: pkg.vehicleTypePricing?.[0]?.price || 0,
      duration: pkg.vehicleTypePricing?.[0]?.duration || 0,
      services: pkg.includedServices,
      rating: Math.round(pkg.rating * 20),
      reviewCount: pkg.bookingCount,
    })),
    services: mockCenterServices.map(service => ({
      id: service.id,
      name: service.name,
      price: service.customPrice,
      duration: service.customDuration,
      description: service.description,
      rating: Math.round(Math.random() * 10 + 85),
      reviewCount: Math.round(Math.random() * 200 + 100),
    })),
  };

  // Auth flow
  if (!user) {
    switch (currentAuthPage) {
      case "login-selector":
        return (
          <>
            <LoginTypeSelector
              onSelectType={(type) => {
                if (type === "modern-demo") {
                  // 🚀 MODERN UX DEMO MODE - Show login page with SSO
                  setCurrentAuthPage("modern-demo-login");
                } else if (type === "root-owner") {
                  setCurrentAuthPage("root-owner-login");
                } else if (type === "carwash-owner") {
                  setCurrentAuthPage("carwash-owner-login");
                }
              }}
            />
            <Toaster />
          </>
        );

      case "root-owner-login":
        return (
          <>
            <CarwashLoginPage
              onLogin={handleLogin}
              onNavigateToRegister={undefined} // ROOT OWNER cannot register through this flow
              onBack={() => setCurrentAuthPage("login-selector")}
              error={authError}
              title="ROOT OWNER Login"
              subtitle="Platform-level administrator access"
            />
            <Toaster />
          </>
        );

      case "modern-demo-login":
        return (
          <>
            <ModernDemoLoginPage
              onQuickDemo={() => {
                // Quick demo access without SSO
                setUseModernUX(true);
                setUser({
                  id: "owner1",
                  name: "Demo User",
                  role: "carwash_owner",
                  email: "demo@autowash.com",
                  root_owner_id: "root1",
                  carwash_owner_id: "owner1",
                  centerId: "1",
                  centerName: "AutoWash Pro Demo",
                });
                toast.success("🚀 Modern UX Demo Activated!");
              }}
              onSSOLogin={(email, password, provider) => {
                setUseModernUX(true);
                handleLogin(email, password, provider);
              }}
              onBack={() => setCurrentAuthPage("login-selector")}
            />
            <Toaster />
          </>
        );

      case "carwash-owner-login":
        return (
          <>
            <CarwashLoginPage
              onLogin={handleLogin}
              onNavigateToRegister={() => setCurrentAuthPage("register")}
              onBack={() => setCurrentAuthPage("login-selector")}
              error={authError}
              title="Carwash Owner Login"
              subtitle="Sign in to manage your carwash business"
              enableSSO={true}
            />
            <Toaster />
          </>
        );
      case "register":
        return (
          <>
            <RegistrationPage
              onRegister={handleRegister}
              onSocialRegister={handleSocialRegister}
              onBack={() => setCurrentAuthPage("carwash-owner-login")}
            />
            <Toaster />
          </>
        );
      case "social-complete":
        return (
          <>
            <SocialRegistrationComplete
              socialUserInfo={socialUserInfo}
              onComplete={handleSocialRegistrationComplete}
              onBack={() => setCurrentAuthPage("register")}
            />
            <Toaster />
          </>
        );
      case "business-modules":
        return (
          <>
            <BusinessModuleSelection
              onComplete={handleBusinessModulesSelected}
              onBack={() => {
                if (socialProviderUsed) {
                  setCurrentAuthPage("social-complete");
                } else {
                  setCurrentAuthPage("register");
                }
              }}
            />
            <Toaster />
          </>
        );
      case "subscription-selection":
        return (
          <>
            <SubscriptionSelection
              onComplete={handleSubscriptionComplete}
              onSkip={() => handleSubscriptionComplete(null)}
            />
            <Toaster />
          </>
        );
      case "confirmation":
        return (
          <>
            <RegistrationConfirmation
              onBackToLogin={() => setCurrentAuthPage("carwash-owner-login")}
              email={registrationEmail}
              socialProvider={socialProviderUsed || undefined}
              subscription={selectedSubscription}
            />
            <Toaster />
          </>
        );

    }
  }

  // Main application content
  const renderCurrentPage = () => {
    // HIERARCHY-AWARE BRANCH FILTERING
    // Helper function to get filtered branches based on current filter and hierarchy
    const getFilteredBranches = () => {
      if (user.role === "root_owner") {
        // ROOT OWNER: Can see all branches across all carwash centers
        return mockBranches.filter(b => b.root_owner_id === user.root_owner_id);
      } else if (user.role === "carwash_owner") {
        // CARWASH OWNER: Can see only branches under their center (carwash_owner_id match)
        const ownerBranches = mockBranches.filter(b => 
          b.carwash_owner_id === user.carwash_owner_id && 
          b.centerId === user.centerId
        );
        return selectedBranchFilter === "all" 
          ? ownerBranches 
          : ownerBranches.filter(b => b.id === selectedBranchFilter);
      }
      return [];
    };

    const filteredBranches = getFilteredBranches();
    const filteredBranchIds = filteredBranches.map(b => b.id);

    switch (currentPage) {
      case "dashboard":
        if (user.role === "root_owner") {
          // ROOT OWNER sees platform-wide Letwash dashboard
          return <LetwashAdminDashboard 
            stats={letwashStats} 
            onNavigate={handleNavigate}
            serviceRequests={mockServiceRequests}
            onApproveRequest={(id) => {
              const request = mockServiceRequests.find(r => r.id === id);
              if (request) {
                // Add to services
                const newService = {
                  id: `gs${mockStandardServices.length + 1}`,
                  name: request.serviceName,
                  description: request.description,
                  vehicleTypePricing: request.vehicleTypes.map(vt => ({
                    vehicleType: vt,
                    price: request.suggestedPrice,
                    duration: request.suggestedDuration
                  })),
                  vehicleTypes: request.vehicleTypes,
                  category: request.category,
                  isActive: true,
                  createdDate: new Date().toISOString().split('T')[0],
                  companyName: request.centerName,
                };
                setMockStandardServices(prev => [...prev, newService]);
                setMockServiceRequests(prev => prev.map(r => 
                  r.id === id ? { ...r, status: "approved" as const } : r
                ));
                toast.success(`Service "${request.serviceName}" approved and added to global services`);
              }
            }}
            onRejectRequest={(id) => {
              const request = mockServiceRequests.find(r => r.id === id);
              setMockServiceRequests(prev => prev.map(r => 
                r.id === id ? { ...r, status: "rejected" as const } : r
              ));
              toast.success(`Service request "${request?.serviceName}" has been rejected`);
            }}
          />;
        } else if (user.role === "carwash_owner") {
          // For owner, check if "All Branches" or specific branch selected
          if (selectedBranchFilter === "all") {
            // Show all branches data (modern dashboard)
            return (
              <ModernCarwashDashboard
                onNavigate={handleNavigate}
                userRole={user.role}
                userName={user.name}
                centerName={user.centerName}
              />
            );
          } else {
            // Show single branch data (modern dashboard)
            const selectedBranch = mockBranches.find(b => b.id === selectedBranchFilter);
            return (
              <ModernCarwashDashboard
                onNavigate={handleNavigate}
                userRole={user.role}
                userName={user.name}
                centerName={selectedBranch?.name || "Your Branch"}
              />
            );
          }
        }
      
      case "customer-hub":
        // Enhanced Customer Hub: B2B Fleet Management & B2C Lifecycle Analytics
        return <EnhancedCustomerHub />;
      
      case "b2b-clients":
      case "carwash-centers":
        // B2B Clients: Carwash centers/companies with their branches
        return (
          <CarwashCentersManagement
            centers={mockCarwashCenters}
            onAddCenter={() => {
              toast.info("Add Center functionality coming soon");
            }}
            onViewCenter={(id) => {
              const center = mockCarwashCenters.find(c => c.id === id);
              if (center) {
                toast.info(`Viewing center: ${center.name}`);
              }
            }}
            onEditCenter={(id) => {
              const center = mockCarwashCenters.find(c => c.id === id);
              if (center) {
                toast.info(`Editing center: ${center.name}`);
              }
            }}
            onDisableCenter={(id) => {
              setMockCarwashCenters(prev => prev.map(c => 
                c.id === id ? { ...c, status: c.status === "disabled" ? "active" : "disabled" as const } : c
              ));
              toast.success("Center status updated");
            }}
          />
        );
      
      case "service-management":
        return (
          <StandardServicesManagement
            services={mockStandardServices}
            packages={mockStandardPackages}
            serviceRequests={mockServiceRequests}
            onAddService={(service) => {
              const newService = {
                ...service,
                id: `gs${mockStandardServices.length + 1}`,
                createdDate: new Date().toISOString().split('T')[0],
              };
              setMockStandardServices(prev => [...prev, newService]);
              toast.success("Standard service added successfully");
            }}
            onEditService={(id, updates) => {
              setMockStandardServices(prev => prev.map(s => 
                s.id === id ? { ...s, ...updates } : s
              ));
              toast.success("Standard service updated successfully");
            }}
            onDeleteService={(id) => {
              setMockStandardServices(prev => prev.filter(s => s.id !== id));
              toast.success("Standard service deleted successfully");
            }}
            onToggleService={(id) => {
              setMockStandardServices(prev => prev.map(s => 
                s.id === id ? { ...s, isActive: !s.isActive } : s
              ));
            }}
            onAddPackage={(pkg) => {
              const newPackage = {
                ...pkg,
                id: `gp${mockStandardPackages.length + 1}`,
                createdDate: new Date().toISOString().split('T')[0],
              };
              setMockStandardPackages(prev => [...prev, newPackage]);
              toast.success("Standard package added successfully");
            }}
            onEditPackage={(id, updates) => {
              setMockStandardPackages(prev => prev.map(p => 
                p.id === id ? { ...p, ...updates } : p
              ));
              toast.success("Standard package updated successfully");
            }}
            onDeletePackage={(id) => {
              setMockStandardPackages(prev => prev.filter(p => p.id !== id));
              toast.success("Standard package deleted successfully");
            }}
            onApproveRequest={(id) => {
              const request = mockServiceRequests.find(r => r.id === id);
              if (request) {
                // Add to services
                const newService = {
                  id: `gs${mockStandardServices.length + 1}`,
                  name: request.serviceName,
                  description: request.description,
                  vehicleTypePricing: request.vehicleTypes.map(vt => ({
                    vehicleType: vt,
                    price: request.suggestedPrice,
                    duration: request.suggestedDuration
                  })),
                  vehicleTypes: request.vehicleTypes,
                  category: request.category,
                  isActive: true,
                  createdDate: new Date().toISOString().split('T')[0],
                  companyName: request.centerName,
                };
                setMockStandardServices(prev => [...prev, newService]);
                setMockServiceRequests(prev => prev.map(r => 
                  r.id === id ? { ...r, status: "approved" as const } : r
                ));
              }
            }}
            onRejectRequest={(id, reason) => {
              setMockServiceRequests(prev => prev.map(r => 
                r.id === id ? { ...r, status: "rejected" as const } : r
              ));
            }}
          />
        );
      
      case "branches":
        return (
          <BranchManagement
            branches={mockBranches}
            onAddBranch={(branch) => setMockBranches(prev => [...prev, { ...branch, id: `b${prev.length + 1}`, createdDate: new Date().toISOString().split('T')[0] }])}
            onEditBranch={(id, updates) => setMockBranches(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b))}
            onDeleteBranch={(id) => setMockBranches(prev => prev.filter(b => b.id !== id))}
            onToggleBranchStatus={(id) => setMockBranches(prev => prev.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b))}
            onNavigate={handleNavigate}
            centerName={user?.centerName || "Your Center"}
            centerAdminId={user?.id || "center1"}
          />
        );

      case "add-branch":
        return (
          <BranchForm
            mode="add"
            onSave={handleAddBranch}
            onBack={() => setCurrentPage("branches")}
          />
        );

      case "edit-branch":
        // For now, just go back to branches - in a real app you'd parse the branch ID from the page
        return (
          <BranchForm
            mode="edit"
            onSave={(branchData) => {
              // Handle edit save
              toast.success("Branch updated successfully");
              setCurrentPage("branches");
            }}
            onBack={() => setCurrentPage("branches")}
            defaultTab="visual"
          />
        );
      
      case "services-packages":
        return (
          <ServicesPackagesManagement
            globalServices={mockGlobalServices}
            centerServices={mockCenterServices}
            centerPackages={mockCenterPackages}
            branches={mockBranches}
            onToggleService={(globalServiceId, isActive) => {
              // Toggle service handler
            }}
            onUpdateService={(serviceId, updates) => {
              // Update service handler
            }}
            onCreatePackage={(pkg) => {
              // Create package handler
            }}
            onUpdatePackage={(packageId, updates) => {
              // Update package handler
            }}
            onDeletePackage={(packageId) => {
              // Delete package handler
            }}
            onSuggestNewService={(suggestion) => {
              // Suggest service handler
            }}
          />
        );
      
      case "campaigns":
        return (
          <CampaignManagement
            campaigns={mockCampaigns}
            services={mockCenterServices}
            packages={mockCenterPackages}
            branches={mockBranches}
            peakTimeAnalytics={carwashStats.peakTimeAnalytics}
            onCreateCampaign={(campaign) => setMockCampaigns(prev => [...prev, { ...campaign, id: `c${prev.length + 1}`, createdDate: new Date().toISOString().split('T')[0] }])}
            onEditCampaign={(id, updates) => setMockCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))}
            onDeleteCampaign={(id) => setMockCampaigns(prev => prev.filter(c => c.id !== id))}
            onToggleCampaign={(id) => setMockCampaigns(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c))}
          />
        );

      case "reservations":
        const pendingApproval = mockReservations.filter(r => r.status === "pending");
        const awaitingConfirmation = mockReservations.filter(r => r.status === "reserved");
        
        return (
          <div className="p-6 space-y-6">
            {/* Pending Approval */}
            <div>
              <ApprovalDashboard
                reservations={mockReservations}
                onApprove={handleApproveReservation}
                onReject={handleRejectReservation}
                onSuggestAlternative={handleSuggestAlternative}
                onViewDetails={(reservation) => {
                  console.log("View details:", reservation);
                  toast.info("Viewing reservation details");
                }}
              />
            </div>

            {/* Awaiting Customer Confirmation */}
            {awaitingConfirmation.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Awaiting Customer Confirmation ({awaitingConfirmation.length})
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {awaitingConfirmation.map(reservation => (
                    <ConfirmationCountdown
                      key={reservation.id}
                      reservationId={reservation.id}
                      reservationTime={reservation.scheduledStart.toISOString()}
                      status={reservation.status}
                      onAutoConfirm={handleAutoConfirm}
                      onManualConfirm={handleManualConfirm}
                      onCancel={handleCancelReservation}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "check-in":
        const todaysReservations = mockReservations.filter(r => 
          r.status === "reserved" || r.status === "confirmed"
        );
        
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Check-In Center</h2>
              <p className="text-neutral-600">Process customer arrivals and start services</p>
            </div>
            
            {todaysReservations.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-neutral-500">No reservations ready for check-in</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {todaysReservations.map(reservation => (
                  <CheckInInterface
                    key={reservation.id}
                    reservation={reservation}
                    onCheckIn={(method) => handleCheckIn(reservation.id, method)}
                  />
                ))}
              </div>
            )}
          </div>
        );

      case "service-progress":
        const activeServices = mockReservations.filter(r => 
          r.status === "checked-in" || r.status === "in-progress"
        );
        const pendingConfirmation = mockReservations.filter(r => r.status === "reserved");
        
        return (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Service Progress Monitor</h2>
              <p className="text-neutral-600">Track active services and confirmations in real-time</p>
            </div>

            {/* Stats Summary */}
            <ServiceStatsSummary reservations={mockReservations} />

            {/* Pending Confirmations */}
            {pendingConfirmation.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Pending Confirmations</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {pendingConfirmation.map(reservation => (
                    <ConfirmationCountdown
                      key={reservation.id}
                      reservationId={reservation.id}
                      reservationTime={reservation.scheduledStart.toISOString()}
                      status={reservation.status}
                      onAutoConfirm={handleAutoConfirm}
                      onManualConfirm={handleManualConfirm}
                      onCancel={handleCancelReservation}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Active Services */}
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Active Services ({activeServices.length})
              </h3>
              
              {activeServices.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-neutral-500">No active services at the moment</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeServices.map(reservation => (
                    <div key={reservation.id}>
                      <ServiceProgressTracker
                        reservationId={reservation.id}
                        serviceName={reservation.services[0]?.name || "Service"}
                        customerName={reservation.customer.name}
                        vehicleInfo={`${reservation.customer.vehicleModel || "Vehicle"} - ${reservation.customer.vehiclePlate}`}
                        currentProgress={reservation.status === "checked-in" ? 5 : 45}
                        currentStage={reservation.status === "checked-in" ? "check-in" : "washing"}
                        isActive={reservation.status === "in-progress"}
                        isPaused={false}
                        onProgressUpdate={handleProgressUpdate}
                        onComplete={handleServiceComplete}
                        onPause={handlePauseService}
                        onResume={handleResumeService}
                      />
                      {reservation.status === "checked-in" && (
                        <div className="mt-2">
                          <Button
                            onClick={() => handleStartService(reservation.id)}
                            className="w-full"
                          >
                            Start Service
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      
      case "b2c-clients":
      case "customers":
        // B2C Clients: Car owners as customers
        // HIERARCHY ENFORCEMENT: Root Owner → Carwash Owner → Branch
        // Customer Hierarchy Implementation with proper parent-child relationships:
        // 1. ROOT OWNER (root_owner_id): Manages TWO customer types
        //    - Carwash Centers/Companies (B2B customers - businesses using the platform)
        //    - Car Owners (B2C customers - end users getting car wash services)
        //    Scope: Platform-wide (all data where root_owner_id = user.root_owner_id)
        // 2. CARWASH OWNER (carwash_owner_id): Manages ONLY Car Owners from ALL their branches
        //    Scope: Center-wide (all data where carwash_owner_id = user.carwash_owner_id)
        // 3. CARWASH ADMIN (branch-level): Manages ONLY Car Owners from ASSIGNED branches
        //    Scope: Branch-level (only data where branchId IN user.assignedBranches)
        
        let filteredCustomers = mockCustomers;
        let isGlobalView = false;
        
        if (user.role === "root_owner") {
          // ROOT OWNER sees:
          // - All Car Owners across the entire platform (B2C customers)
          // - All Carwash Centers/Companies (B2B customers - passed via carwashCenters prop)
          // Filter by root_owner_id for hierarchy enforcement
          filteredCustomers = mockCustomers.filter(c => c.root_owner_id === user.root_owner_id);
          isGlobalView = true;
        } else if (user.role === "carwash_owner") {
          // CARWASH OWNER sees:
          // - Car Owners from ALL branches under their center ONLY
          // Filter by carwash_owner_id for hierarchy enforcement
          filteredCustomers = mockCustomers.filter(c => 
            c.carwash_owner_id === user.carwash_owner_id && 
            c.centerId === user.centerId
          );
          isGlobalView = false;
        }
        
        return <EnhancedCustomerHub />;
      
      case "profile":
        return (
          <EnhancedProfileManagement
            centerName={user?.centerName || "Your Center"}
            userRole={user.role}
            branchName={user.branchName}
            userName={user.name}
            userEmail={user.email}
          />
        );

      case "notification-settings":
        return <NotificationPreferences />;

      case "calendar":
        return (
          <div className="p-6">
            <UnifiedCalendarBookings
              reservations={mockReservations}
              stations={mockStations}
              onApproveReservation={handleApproveReservation}
              onRejectReservation={handleRejectReservation}
              onSuggestAlternative={handleSuggestAlternative}
              onCheckIn={(id) => {
                setMockReservations(prev =>
                  prev.map(r => r.id === id ? { ...r, status: "checked-in" } : r)
                );
                toast.success("Customer checked in successfully");
              }}
              onStartService={(id) => {
                setMockReservations(prev =>
                  prev.map(r => r.id === id ? { ...r, status: "in-progress" } : r)
                );
                toast.success("Service started");
              }}
              onCompleteService={(id) => {
                setMockReservations(prev =>
                  prev.map(r => r.id === id ? { ...r, status: "completed" } : r)
                );
                toast.success("Service completed");
              }}
              onNewReservation={handleNewReservationRequest}
              onStationStatusChange={handleStationStatusChange}
            />
          </div>
        );

      case "analytics":
        return <AnalyticsManagement 
          userRole={user.role}
          branches={mockBranches}
        />;

      case "capacity-planning":
        return <CapacityManagement 
          branches={mockBranches}
          selectedBranchId={mockBranches[0]?.id}
        />;

      case "ai-dashboard":
        return <AIDashboard 
          userRole={user.role}
          branchId={undefined}
          carwashOwnerId={user.role === "carwash_owner" ? user.carwash_owner_id : undefined}
        />;

      case "ai-churn-prediction":
        return <CustomerChurnPrediction onNavigate={handleNavigate} />;

      case "ai-dynamic-pricing":
        return <DynamicPricingAI />;

      case "ai-damage-detection":
        return <VehicleDamageDetection />;

      case "ai-roi-calculator":
        return <AIROICalculator />;

      case "revenue":
        return <RevenueManagement 
          userRole={user.role}
          branches={mockBranches}
        />;

      case "employees":
        return <EmployeesManagement 
          userRole={user.role}
          branches={mockBranches}
        />;

      case "workers":
        return <WorkerManagement 
          branchId={selectedBranchFilter === "all" ? "branch-1" : selectedBranchFilter}
          branchName={mockBranches.find(b => b.id === (selectedBranchFilter === "all" ? "branch-1" : selectedBranchFilter))?.name || "Downtown Branch"}
        />;

      case "reviews":
        return (
          <ReviewFeedbackManagement
            reviews={mockReviews}
            branches={mockBranches}
            onRespondToReview={handleRespondToReview}
            onToggleReviewVisibility={handleToggleReviewVisibility}
            userRole={user.role}
            assignedBranches={user.assignedBranches}
          />
        );

      case "manage-account":
        return (
          <ManageAccount
            onBack={() => setCurrentPage("dashboard")}
            userRole={user.role}
            userName={user.name}
            userEmail={user.email}
            centerName={user.centerName}
            branchName={user.branchName}
            branchId={user.branchId}
          />
        );
      
      case "operations":
        const activeServicesInOps = mockReservations.filter(r => 
          r.status === "checked-in" || r.status === "in-progress"
        );
        
        return (
          <div className="p-6 space-y-6">
            {/* Active Services Widget - Only show when there are active services */}
            {activeServicesInOps.length > 0 && (
              <ServiceProgressWidget
                activeServices={activeServicesInOps}
                onViewDetails={(id) => {
                  setCurrentPage("service-progress");
                  toast.info("Viewing service details");
                }}
              />
            )}
            
            <EnhancedRealTimeOperations
              stations={mockStations}
              reservations={mockReservations}
              onStationStatusChange={handleStationStatusChange}
              demoMode={useDemoMode}
            />
          </div>
        );
      
      case "platform-users":
        return <PlatformUsersManagement />;
      
      case "dynamic-pricing":
        return <DynamicPricingManagement />;
      
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Coming Soon</h3>
              <p className="text-muted-foreground">This page is under development</p>
            </div>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard": return "Dashboard";
      case "calendar": return "Advanced Calendar & Bookings";
      case "operations": return "Real-Time Operations Center";
      case "capacity-planning": return "Capacity Management";
      case "analytics": return "Analytics";
      case "revenue": return "Revenue";
      case "employees": return "Employees";
      case "workers": return "Worker & Capacity Management";
      case "reviews": return "Reviews & Feedback";
      case "dynamic-pricing": return "Dynamic Pricing";
      case "campaigns": return "Campaign Management";
      case "check-in": return "Check-In Center";
      case "service-progress": return "Service Progress Monitor";
      case "profile": return "Profile Info";
      case "notification-settings": return "Notification Preferences";
      case "manage-account": return "Manage Account";
      case "customer-hub": return "Customer Hub";
      case "b2b-clients": return "B2B Clients";
      case "b2c-clients": return "B2C Clients";
      case "ai-churn-prediction": return "AI Churn Prediction";
      case "ai-dynamic-pricing": return "AI Dynamic Pricing";
      case "ai-damage-detection": return "AI Damage Detection";
      case "ai-roi-calculator": return "AI ROI Calculator";
      case "carwash-centers": return "Carwash Management";
      case "service-management": return "Service Management";
      case "customers": return "Customers";
      case "branches": return "Branches";
      case "add-branch": return "Profile Info";
      case "edit-branch": return "Profile Info";
      case "branch-admins": return "People Management";
      case "services-packages": return "Services & Packages";
      case "center-users": return "Center Users";
      case "bookings": return "Booking Management";
      case "capacity-planning": return "Capacity Management";
      default: return "Profile Info";
    }
  };

  const handlePublishBranch = () => {
    setIsBranchPublished(true);
    toast.success("Branch profile published successfully! Changes are now live in the mobile app.");
  };

  const handleUnpublishBranch = () => {
    setIsBranchPublished(false);
    toast.success("Branch profile unpublished. Changes will not appear in the mobile app.");
  };

  // 🚀 MODERN UX MODE - New Components
  if (useModernUX) {
    return (
      <NotificationProvider userId={user.id} userRole={user.role}>
        <div className="flex h-screen bg-neutral-50">
          {/* Modern Sidebar - Fixed on left */}
          <div className="fixed left-0 top-0 bottom-0 z-40">
            <ModernAdminSidebar
              user={user}
              currentPage={currentPage}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
              branches={mockBranches}
              selectedBranchFilter={selectedBranchFilter}
              onBranchFilterChange={setSelectedBranchFilter}
              aiInsightCount={3}
              pendingRequests={mockBookings.filter(b => b.status === 'pending-approval').length}
              demoMode={useDemoMode}
              onDemoModeToggle={() => setUseDemoMode(!useDemoMode)}
            />
          </div>
          
          {/* Main Content - With left padding to account for sidebar */}
          <div className="flex-1 overflow-auto lg:ml-64">
            {currentPage === "dashboard" && (
              <ModernCarwashDashboard 
                centerName={user.centerName || "AutoWash Pro"} 
                onNavigate={handleNavigate} 
              />
            )}
            
            {currentPage === "calendar" && (
              <div className="p-6">
                <AdvancedCalendarView
                  stations={mockStations}
                  onStationStatusChange={handleStationStatusChange}
                  onBookingAction={(bookingId, action) => {
                    // Handle booking action
                  }}
                  onNewBooking={() => {
                    // Handle new booking
                  }}
                  onAISuggestionClick={(suggestion) => {
                    // Handle AI suggestion click
                  }}
                  branches={mockBranches}
                  selectedBranchFilter={selectedBranchFilter}
                  onBranchFilterChange={setSelectedBranchFilter}
                />
              </div>
            )}
            
            {currentPage === "reservations" && (
              <MobileReservationsPage
                reservations={[...mockReservations, ...mobileReservations]}
                onReservationClick={(reservation) => {
                  toast.info(`Viewing reservation: ${reservation.reservationCode}`);
                }}
                onApprove={(id) => {
                  setMobileReservations(prev =>
                    prev.map(r => r.id === id ? { ...r, status: "reserved", approvalStatus: "approved" } : r)
                  );
                  toast.success("Mobile detailing request approved!");
                }}
                onReject={(id) => {
                  setMobileReservations(prev =>
                    prev.map(r => r.id === id ? { ...r, status: "cancelled" } : r)
                  );
                  toast.info("Mobile detailing request rejected");
                }}
              />
            )}
            
            {currentPage === "mobile-demo" && (
              <MobileDetailingDemo />
            )}
            
            {currentPage === "capacity-planning" && (
              <div className="p-6">
                <CapacityManagement 
                  branches={mockBranches}
                  selectedBranchId={selectedBranchFilter === "all" ? mockBranches[0]?.id : selectedBranchFilter}
                  onBranchChange={setSelectedBranchFilter}
                />
              </div>
            )}
            
            {currentPage === "customer-hub" && (
              <div className="p-6">
                <EnhancedCustomerHub 
                  branches={mockBranches}
                  selectedBranchFilter={selectedBranchFilter}
                  onBranchFilterChange={setSelectedBranchFilter}
                />
              </div>
            )}
            
            {currentPage === "campaigns" && (
              <div className="p-6">
                <CampaignManagement 
                  onNavigate={handleNavigate}
                />
              </div>
            )}
            
            {currentPage === "revenue" && (
              <div className="p-6">
                <RevenueManagement 
                  onNavigate={handleNavigate}
                />
              </div>
            )}
            
            {currentPage === "analytics" && (
              <div className="p-6">
                <AnalyticsManagement 
                  branches={mockBranches}
                  selectedModule={selectedModule as any}
                  setSelectedModule={setSelectedModule}
                  userRole={user.role}
                  selectedBranchFilter={selectedBranchFilter}
                  onBranchFilterChange={setSelectedBranchFilter}
                />
              </div>
            )}
            
            {currentPage === "ai-dashboard" && (
              <div className="p-6">
                <AIDashboard />
              </div>
            )}
            
            {currentPage === "ai-churn-prediction" && (
              <div className="p-6">
                <CustomerChurnPrediction />
              </div>
            )}
            
            {currentPage === "ai-dynamic-pricing" && (
              <div className="p-6">
                <DynamicPricingAI />
              </div>
            )}
            
            {currentPage === "ai-damage-detection" && (
              <div className="p-6">
                <VehicleDamageDetection />
              </div>
            )}
            
            {currentPage === "ai-roi-calculator" && (
              <div className="p-6">
                <AIROICalculator />
              </div>
            )}
            
            {currentPage === "branches" && (
              <div className="p-6">
                <BranchManagement
                  branches={mockBranches}
                  onAddBranch={(branch) => setMockBranches(prev => [...prev, { ...branch, id: `b${prev.length + 1}`, createdDate: new Date().toISOString().split('T')[0] }])}
                  onEditBranch={(id, updates) => setMockBranches(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b))}
                  onDeleteBranch={(id) => setMockBranches(prev => prev.filter(b => b.id !== id))}
                  onToggleBranchStatus={(id) => setMockBranches(prev => prev.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b))}
                  onNavigate={handleNavigate}
                  centerName={user?.centerName || "Your Center"}
                  centerAdminId={user?.id || "center1"}
                  selectedBranchFilter={selectedBranchFilter}
                  onBranchFilterChange={setSelectedBranchFilter}
                />
              </div>
            )}
            
            {currentPage === "add-branch" && (
              <div className="p-6">
                <BranchForm
                  mode="add"
                  onSave={(branchData) => {
                    const newBranch = {
                      ...branchData,
                      id: `b${mockBranches.length + 1}`,
                      createdDate: new Date().toISOString().split('T')[0],
                      totalStaff: 0,
                      servicesCount: 0,
                      packagesCount: 0,
                    };
                    setMockBranches(prev => [...prev, newBranch]);
                    toast.success("Branch created successfully!");
                    setCurrentPage("branches");
                  }}
                  onBack={() => setCurrentPage("branches")}
                />
              </div>
            )}
            
            {currentPage === "edit-branch" && (
              <div className="p-6">
                <BranchForm
                  mode="edit"
                  initialData={mockBranches[0]} // In real app, get the specific branch being edited
                  onSave={(branchData) => {
                    setMockBranches(prev => prev.map(b => 
                      b.id === mockBranches[0].id ? { ...b, ...branchData } : b
                    ));
                    toast.success("Branch updated successfully!");
                    setCurrentPage("branches");
                  }}
                  onBack={() => setCurrentPage("branches")}
                />
              </div>
            )}
            
            {currentPage === "service-management" && (
              <div className="p-6">
                <ServicesPackagesManagement
                  globalServices={mockStandardServices}
                  centerServices={mockStandardServices.map(s => ({
                    id: s.id,
                    globalServiceId: s.id,
                    name: s.name,
                    description: s.description,
                    customPrice: s.vehicleTypePricing?.[0]?.price || 0,
                    customDuration: s.vehicleTypePricing?.[0]?.duration || 0,
                    isActive: s.isActive || true,
                    availableBranches: ["b1", "b2"],
                    category: s.category,
                    vehicleTypes: s.vehicleTypes,
                  }))}
                  centerPackages={mockStandardPackages.map(p => ({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    includedServices: p.includedServices,
                    vehicleTypePricing: p.vehicleTypePricing,
                    isActive: p.isActive,
                    availableBranches: ["b1", "b2"],
                    vehicleTypes: p.vehicleTypes,
                    rating: 4.5,
                    bookingCount: 125,
                  }))}
                  branches={mockBranches}
                  onToggleService={(globalServiceId, isActive) => {
                    setMockStandardServices(prev => prev.map(s => 
                      s.id === globalServiceId ? { ...s, isActive } : s
                    ));
                    toast.success(`Service ${isActive ? 'activated' : 'deactivated'}`);
                  }}
                  onUpdateService={(serviceId, updates) => {
                    setMockStandardServices(prev => prev.map(s => 
                      s.id === serviceId ? { 
                        ...s,
                        ...(updates.customPrice && { 
                          vehicleTypePricing: s.vehicleTypePricing?.map(vt => ({
                            ...vt,
                            price: updates.customPrice || vt.price
                          }))
                        }),
                        ...(updates.customDuration && { 
                          vehicleTypePricing: s.vehicleTypePricing?.map(vt => ({
                            ...vt,
                            duration: updates.customDuration || vt.duration
                          }))
                        }),
                        isActive: updates.isActive !== undefined ? updates.isActive : s.isActive,
                      } : s
                    ));
                    toast.success("Service updated successfully");
                  }}
                  onCreatePackage={(pkg) => {
                    const newPackage = {
                      ...pkg,
                      id: `gp${mockStandardPackages.length + 1}`,
                      rating: 0,
                      bookingCount: 0,
                    };
                    setMockStandardPackages(prev => [...prev, newPackage]);
                    toast.success("Package created successfully");
                  }}
                  onUpdatePackage={(packageId, updates) => {
                    setMockStandardPackages(prev => prev.map(p => 
                      p.id === packageId ? { ...p, ...updates } : p
                    ));
                    toast.success("Package updated successfully");
                  }}
                  onDeletePackage={(packageId) => {
                    setMockStandardPackages(prev => prev.filter(p => p.id !== packageId));
                    toast.success("Package deleted successfully");
                  }}
                  onSuggestNewService={(suggestion) => {
                    toast.info("Service suggestion received!");
                  }}
                />
              </div>
            )}
            
            {currentPage === "employees" && (
              <div className="p-6">
                <EmployeesManagement />
              </div>
            )}
            
            {currentPage === "manage-account" && (
              <div className="p-6">
                <ManageAccount 
                  user={user}
                  onUpdateUser={(updates) => {
                    setUser(prev => prev ? { ...prev, ...updates } : null);
                    toast.success("Account updated successfully");
                  }}
                />
              </div>
            )}
            
            {currentPage === "reviews" && (
              <div className="p-6">
                <ReviewFeedbackManagement
                  reviews={mockReviews}
                  branches={mockBranches}
                  onRespondToReview={(reviewId, response) => {
                    setMockReviews(prev => prev.map(r => 
                      r.id === reviewId ? {
                        ...r,
                        response: {
                          text: response,
                          respondedBy: user?.name || "Admin",
                          respondedAt: new Date().toISOString()
                        }
                      } : r
                    ));
                    toast.success("Response submitted successfully!");
                  }}
                  onToggleReviewVisibility={(reviewId) => {
                    setMockReviews(prev => prev.map(r => 
                      r.id === reviewId ? {
                        ...r,
                        status: r.status === "pending" ? "published" as const : 
                                r.status === "published" ? "hidden" as const : 
                                "published" as const
                      } : r
                    ));
                    const review = mockReviews.find(r => r.id === reviewId);
                    if (review?.status === "pending") {
                      toast.success("Review published successfully!");
                    } else if (review?.status === "published") {
                      toast.success("Review hidden successfully");
                    } else {
                      toast.success("Review made visible");
                    }
                  }}
                  userRole={user.role}
                  assignedBranches={user.role === "carwash_admin" ? ["b1"] : undefined}
                />
              </div>
            )}

            {currentPage === "dynamic-pricing" && (
              <div className="p-6">
                <DynamicPricingManagement
                  services={mockCenterServices}
                  branches={mockBranches}
                  onUpdatePricing={() => {
                    toast.success("Pricing updated successfully");
                  }}
                />
              </div>
            )}
            
            {/* Root Owner Pages */}
            {user.role === "root_owner" && currentPage === "centers" && (
              <div className="p-6">
                <CarwashCentersManagement
                  centers={mockCarwashCenters}
                  onAddCenter={() => {
                    toast.info("Add Center functionality coming soon");
                  }}
                  onViewCenter={(id) => {
                    const center = mockCarwashCenters.find(c => c.id === id);
                    if (center) {
                      toast.info(`Viewing center: ${center.name}`);
                    }
                  }}
                  onEditCenter={(id) => {
                    const center = mockCarwashCenters.find(c => c.id === id);
                    if (center) {
                      toast.info(`Editing center: ${center.name}`);
                    }
                  }}
                  onDisableCenter={(id) => {
                    setMockCarwashCenters(prev => prev.map(c => 
                      c.id === id ? { ...c, status: c.status === "disabled" ? "active" : "disabled" as const } : c
                    ));
                    toast.success("Center status updated");
                  }}
                />
              </div>
            )}
            
            {user.role === "root_owner" && currentPage === "platform-users" && (
              <div className="p-6">
                <PlatformUsersManagement />
              </div>
            )}
            
            {user.role === "root_owner" && currentPage === "home" && (
              <div className="p-6">
                <LetwashAdminDashboard 
                  onNavigate={handleNavigate}
                />
              </div>
            )}
            
            {currentPage === "ai-analytics" && (
              <div className="p-6">
                <AnalyticsManagement />
              </div>
            )}
            
            {user.role === "root_owner" && currentPage === "settings" && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white border border-neutral-200 rounded-xl p-8">
                    <h1 className="text-2xl font-bold mb-4">Platform Settings</h1>
                    <p className="text-neutral-600 mb-6">Configure global platform settings, integrations, and system preferences.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-auto flex-col items-start p-4">
                        <span className="font-semibold mb-1">System Configuration</span>
                        <span className="text-xs text-neutral-600">Manage system-wide settings</span>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col items-start p-4">
                        <span className="font-semibold mb-1">API & Integrations</span>
                        <span className="text-xs text-neutral-600">Configure third-party services</span>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col items-start p-4">
                        <span className="font-semibold mb-1">Billing & Payments</span>
                        <span className="text-xs text-neutral-600">Payment gateway settings</span>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col items-start p-4">
                        <span className="font-semibold mb-1">Security & Access</span>
                        <span className="text-xs text-neutral-600">Security policies and permissions</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Fallback for unimplemented pages */}
            {![
              "dashboard", "calendar", "operations", "capacity-planning",
              "customer-hub", "campaigns", "revenue", "analytics",
              "ai-dashboard", "ai-churn-prediction", "ai-dynamic-pricing", 
              "ai-damage-detection", "ai-roi-calculator", "ai-analytics",
              "branches", "service-management", "employees", "manage-account",
              "reviews", "reservations", "mobile-demo",
              "centers", "platform-users", "home", "settings"
            ].includes(currentPage) && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto">

                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Command Palette - Cmd+K */}
        <CommandPalette
          onNavigate={handleNavigate}
          onAction={(action) => {
            if (action === 'new-booking') handleNavigate('calendar');
            if (action === 'walk-in-customer') handleNavigate('customer-hub');
            if (action === 'new-campaign') handleNavigate('campaigns');
            toast.success(`Action: ${action}`);
          }}
          currentRole={user.role}
        />
        
        {/* Quick Actions Button */}
        <QuickActionsButton
          onAction={(action) => {
            if (action === 'new-booking') handleNavigate('calendar');
            if (action === 'walk-in-customer') handleNavigate('customer-hub');
            if (action === 'new-campaign') handleNavigate('campaigns');
            if (action === 'send-message') toast.info('Message feature coming soon!');
            if (action === 'call-support') toast.info('Support: +1-555-LETWASH');
            if (action === 'quick-note') toast.info('Note feature coming soon!');
          }}
        />
        
        <Toaster />
      </NotificationProvider>
    );
  }

  // Regular UX Mode (existing)
  return (
    <NotificationProvider userId={user.id} userRole={user.role}>
      <AdminLayout
        user={user}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        title={getPageTitle()}
        branches={mockBranches}
        onDeleteBranches={handleDeleteBranches}
        selectedBranchFilter={selectedBranchFilter}
        onBranchFilterChange={setSelectedBranchFilter}
        showPublishButtons={currentPage === "edit-branch" || currentPage === "add-branch"}
        isPublished={isBranchPublished}
        onPublish={handlePublishBranch}
        onUnpublish={handleUnpublishBranch}
        pendingServiceRequests={user.role === "root_owner" ? mockServiceRequests.filter(r => r.status === "pending").length : 0}
      >
        {renderCurrentPage()}
      </AdminLayout>

      {showMobilePreview && (
        <MobilePreview
          centerData={mobilePreviewData}
          onClose={() => setShowMobilePreview(false)}
        />
      )}

      {/* 🎉 PHASE 2: RESERVATION WORKFLOW DIALOGS */}
      
      {/* Reservation Request Form Dialog */}
      <Dialog open={showReservationForm} onOpenChange={setShowReservationForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Reservation Request</DialogTitle>
            <DialogDescription>
              Fill out the form below to create a new reservation request.
            </DialogDescription>
          </DialogHeader>
          <ReservationRequestForm
            stationId={reservationFormData?.stationId}
            stationName={reservationFormData?.stationName}
            preselectedDate={reservationFormData?.preselectedDate}
            preselectedTime={reservationFormData?.preselectedTime}
            services={[
              {
                id: "premium-detail",
                name: "Premium Detail",
                description: "Complete interior & exterior detailing",
                duration: 180,
                price: 299.99,
                popular: true,
              },
              {
                id: "express-detail",
                name: "Express Detail",
                description: "Quick but thorough detailing",
                duration: 120,
                price: 199.99,
              },
              {
                id: "interior-deep-clean",
                name: "Interior Deep Clean",
                description: "Deep cleaning of all interior surfaces",
                duration: 150,
                price: 179.99,
              },
            ]}
            onSubmit={handleReservationSubmit}
            onCancel={() => {
              setShowReservationForm(false);
              setReservationFormData(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Alternative Suggestion Dialog */}
      <AlternativeSuggestionDialog
        open={showAlternativeSuggestionDialog}
        onOpenChange={setShowAlternativeSuggestionDialog}
        reservation={selectedReservationForSuggestion}
        onSuggest={handleSubmitAlternativeSuggestion}
      />

      {/* 🎉 PHASE 2.1: SERVICE COMPLETION WORKFLOW DIALOG */}
      <CompletionWorkflowDialog
        open={showCompletionWorkflow}
        onOpenChange={setShowCompletionWorkflow}
        reservation={selectedReservationForCompletion}
        onComplete={handleCompleteService}
      />

      <Toaster />
    </NotificationProvider>
  );
}
