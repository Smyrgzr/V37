"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import {
  User,
  Building2,
  Shield,
  Bell,
  Camera,
  Save,
  Edit,
  MapPin,
  Mail,
  Phone,
  Globe,
  Calendar,
  FileText,
  Lock,
  Key,
  Clock,
  CreditCard,
  Settings,
  Check,
  X,
  Upload,
  ExternalLink,
  Smartphone,
  AtSign,
  CheckCircle,
  AlertTriangle,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  Target,
  Award,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface EnhancedProfileManagementProps {
  centerName: string;
  userRole: "root_owner" | "carwash_owner" | "carwash_admin";
  branchName?: string;
  userName?: string;
  userEmail?: string;
}

export function EnhancedProfileManagement({
  centerName,
  userRole,
  branchName,
  userName = "John Smith",
  userEmail = "owner@autowash.com",
}: EnhancedProfileManagementProps) {
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(false);
  const [editingContact, setEditingContact] = useState(false);

  // Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Smith",
    email: userEmail,
    phone: "+1 (555) 234-5678",
    mobile: "+1 (555) 234-5679",
    position: userRole === "carwash_owner" ? "Owner & CEO" : userRole === "carwash_admin" ? "Branch Manager" : "Platform Administrator",
    dateOfBirth: "1985-06-15",
    avatar: "",
    bio: "Passionate about delivering exceptional car care services with over 10 years of experience in the automotive service industry.",
  });

  // Business Information
  const [businessInfo, setBusinessInfo] = useState({
    centerName: centerName,
    legalName: "AutoWash Pro LLC",
    businessType: "Car Wash & Auto Detailing",
    taxId: "12-3456789",
    registrationNumber: "REG-NY-2024-001",
    registrationDate: "2024-01-15",
    website: "www.autowashpro.com",
    email: "info@autowashpro.com",
    phone: "+1 (555) 123-4567",
    description: "Premium car wash and auto detailing services with multiple locations across New York. Specializing in eco-friendly cleaning solutions and customer satisfaction.",
    yearEstablished: "2014",
    numberOfEmployees: "45-50",
    annualRevenue: "$2.5M - $5M",
  });

  // Contact & Location
  const [contactInfo, setContactInfo] = useState({
    address: "123 Main Street, Suite 100",
    address2: "Floor 2, Building A",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    timezone: "America/New_York (EST)",
    latitude: "40.7128",
    longitude: "-74.0060",
    emergencyContactName: "Jane Smith",
    emergencyContactPhone: "+1 (555) 234-5670",
    emergencyContactRelation: "Spouse",
  });

  // Security Settings
  const [securityInfo, setSecurityInfo] = useState({
    twoFactorEnabled: true,
    lastPasswordChange: "2024-11-15",
    loginNotifications: true,
    sessionTimeout: "30",
    allowedIPs: "Any",
    lastLogin: "2024-12-08 14:23:15",
    loginHistory: [
      { date: "2024-12-08 14:23:15", ip: "192.168.1.100", location: "New York, US", device: "Chrome on MacOS" },
      { date: "2024-12-07 09:15:42", ip: "192.168.1.100", location: "New York, US", device: "Safari on iPhone" },
      { date: "2024-12-06 16:45:30", ip: "192.168.1.102", location: "New York, US", device: "Chrome on Windows" },
    ],
  });

  // Notification Preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailBookings: true,
    emailCancellations: true,
    emailReviews: true,
    emailMessages: true,
    emailReports: true,
    emailPromotions: false,
    smsBookings: true,
    smsReminders: true,
    smsCancellations: true,
    smsPromotions: false,
    pushBookings: true,
    pushMessages: true,
    pushReviews: true,
    pushPromotions: false,
    weeklyReports: true,
    monthlyReports: true,
  });

  // Subscription & Billing (for demo)
  const subscriptionInfo = {
    plan: userRole === "root_owner" ? "Platform Owner" : "Premium Business",
    status: "active",
    billingCycle: "Annual",
    nextBillingDate: "2025-01-15",
    amount: "$2,499/year",
    paymentMethod: "•••• 4242",
    features: [
      "Unlimited Branches",
      "Advanced Analytics",
      "Priority Support",
      "Custom Branding",
      "API Access",
      "Mobile App White Label",
    ],
  };

  // Business Statistics (for demo)
  const businessStats = {
    totalBranches: 3,
    totalEmployees: 47,
    totalCustomers: 2847,
    monthlyRevenue: "$45,680",
    yearlyRevenue: "$548,160",
    avgRating: 4.8,
    totalReviews: 1245,
    activeBookings: 156,
  };

  const handleSavePersonal = () => {
    setEditingPersonal(false);
    toast.success("Personal information updated successfully");
  };

  const handleSaveBusiness = () => {
    setEditingBusiness(false);
    toast.success("Business information updated successfully");
  };

  const handleSaveContact = () => {
    setEditingContact(false);
    toast.success("Contact information updated successfully");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalInfo({ ...personalInfo, avatar: reader.result as string });
        toast.success("Profile picture updated");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Profile Summary */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              {personalInfo.avatar ? (
                <AvatarImage src={personalInfo.avatar} alt={personalInfo.firstName} />
              ) : (
                <AvatarFallback className="text-2xl">
                  {personalInfo.firstName[0]}{personalInfo.lastName[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer hover:bg-blue-700 shadow-lg"
            >
              <Camera size={16} />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-3xl font-bold text-neutral-950">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-lg text-muted-foreground mt-1">{personalInfo.position}</p>
            <div className="flex items-center gap-4 mt-3">
              <Badge className="bg-green-600 text-white">
                <CheckCircle size={12} className="mr-1" />
                Active Account
              </Badge>
              {securityInfo.twoFactorEnabled && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  <Shield size={12} className="mr-1" />
                  2FA Enabled
                </Badge>
              )}
              <Badge variant="outline">
                {userRole === "root_owner" ? "ROOT OWNER" : userRole === "carwash_owner" ? "Owner" : "Admin"}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail size={14} />
                {personalInfo.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone size={14} />
                {personalInfo.phone}
              </div>
              {userRole !== "root_owner" && (
                <div className="flex items-center gap-1">
                  <Building2 size={14} />
                  {centerName}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload size={16} className="mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <FileText size={16} className="mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Business Statistics Cards (for Carwash Owner/Admin) */}
      {userRole !== "root_owner" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{businessStats.totalBranches}</div>
                  <div className="text-xs text-muted-foreground">Branches</div>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{businessStats.totalEmployees}</div>
                  <div className="text-xs text-muted-foreground">Employees</div>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{businessStats.totalCustomers.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Customers</div>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{businessStats.avgRating}</div>
                  <div className="text-xs text-muted-foreground">Avg Rating</div>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="personal">
            <User size={16} className="mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="business">
            <Building2 size={16} className="mr-2" />
            Business
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MapPin size={16} className="mr-2" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield size={16} className="mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell size={16} className="mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard size={16} className="mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and bio</CardDescription>
                </div>
                {!editingPersonal ? (
                  <Button variant="outline" size="sm" onClick={() => setEditingPersonal(true)}>
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingPersonal(false)}>
                      <X size={16} className="mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSavePersonal}>
                      <Save size={16} className="mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                    disabled={!editingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                    disabled={!editingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      disabled={!editingPersonal}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      disabled={!editingPersonal}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="mobile"
                      value={personalInfo.mobile}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, mobile: e.target.value })}
                      disabled={!editingPersonal}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position/Title</Label>
                  <Input
                    id="position"
                    value={personalInfo.position}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, position: e.target.value })}
                    disabled={!editingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="dob"
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                      disabled={!editingPersonal}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio / About Me</Label>
                <Textarea
                  id="bio"
                  value={personalInfo.bio}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                  disabled={!editingPersonal}
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Information Tab */}
        <TabsContent value="business" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Company details and registration information</CardDescription>
                </div>
                {!editingBusiness ? (
                  <Button variant="outline" size="sm" onClick={() => setEditingBusiness(true)}>
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingBusiness(false)}>
                      <X size={16} className="mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveBusiness}>
                      <Save size={16} className="mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="centerName">Business Name (DBA)</Label>
                  <Input
                    id="centerName"
                    value={businessInfo.centerName}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, centerName: e.target.value })}
                    disabled={!editingBusiness}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input
                    id="legalName"
                    value={businessInfo.legalName}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, legalName: e.target.value })}
                    disabled={!editingBusiness}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input
                    id="businessType"
                    value={businessInfo.businessType}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, businessType: e.target.value })}
                    disabled={!editingBusiness}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / EIN</Label>
                  <Input
                    id="taxId"
                    value={businessInfo.taxId}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, taxId: e.target.value })}
                    disabled={!editingBusiness}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input
                    id="regNumber"
                    value={businessInfo.registrationNumber}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, registrationNumber: e.target.value })}
                    disabled={!editingBusiness}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regDate">Registration Date</Label>
                  <Input
                    id="regDate"
                    type="date"
                    value={businessInfo.registrationDate}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, registrationDate: e.target.value })}
                    disabled={!editingBusiness}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="website"
                      value={businessInfo.website}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                      disabled={!editingBusiness}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bizEmail">Business Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="bizEmail"
                      type="email"
                      value={businessInfo.email}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                      disabled={!editingBusiness}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bizPhone">Business Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="bizPhone"
                      value={businessInfo.phone}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                      disabled={!editingBusiness}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearEst">Year Established</Label>
                  <Input
                    id="yearEst"
                    value={businessInfo.yearEstablished}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, yearEstablished: e.target.value })}
                    disabled={!editingBusiness}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input
                    id="employees"
                    value={businessInfo.numberOfEmployees}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, numberOfEmployees: e.target.value })}
                    disabled={!editingBusiness}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revenue">Annual Revenue</Label>
                  <Input
                    id="revenue"
                    value={businessInfo.annualRevenue}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, annualRevenue: e.target.value })}
                    disabled={!editingBusiness}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={businessInfo.description}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                  disabled={!editingBusiness}
                  rows={4}
                  placeholder="Describe your business..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact & Location Tab */}
        <TabsContent value="contact" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contact & Location</CardTitle>
                  <CardDescription>Business address and emergency contacts</CardDescription>
                </div>
                {!editingContact ? (
                  <Button variant="outline" size="sm" onClick={() => setEditingContact(true)}>
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingContact(false)}>
                      <X size={16} className="mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveContact}>
                      <Save size={16} className="mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Primary Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                      disabled={!editingContact}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                    <Input
                      id="address2"
                      value={contactInfo.address2}
                      onChange={(e) => setContactInfo({ ...contactInfo, address2: e.target.value })}
                      disabled={!editingContact}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={contactInfo.city}
                      onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                      disabled={!editingContact}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      id="state"
                      value={contactInfo.state}
                      onChange={(e) => setContactInfo({ ...contactInfo, state: e.target.value })}
                      disabled={!editingContact}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input
                      id="postal"
                      value={contactInfo.postalCode}
                      onChange={(e) => setContactInfo({ ...contactInfo, postalCode: e.target.value })}
                      disabled={!editingContact}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={contactInfo.country}
                      onChange={(e) => setContactInfo({ ...contactInfo, country: e.target.value })}
                      disabled={!editingContact}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      value={contactInfo.timezone}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coords">Coordinates (Lat, Long)</Label>
                    <Input
                      id="coords"
                      value={`${contactInfo.latitude}, ${contactInfo.longitude}`}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input
                      id="emergencyName"
                      value={contactInfo.emergencyContactName}
                      onChange={(e) => setContactInfo({ ...contactInfo, emergencyContactName: e.target.value })}
                      disabled={!editingContact}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      value={contactInfo.emergencyContactPhone}
                      onChange={(e) => setContactInfo({ ...contactInfo, emergencyContactPhone: e.target.value })}
                      disabled={!editingContact}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyRelation">Relationship</Label>
                    <Input
                      id="emergencyRelation"
                      value={contactInfo.emergencyContactRelation}
                      onChange={(e) => setContactInfo({ ...contactInfo, emergencyContactRelation: e.target.value })}
                      disabled={!editingContact}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage passwords, 2FA, and login security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Change */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Key size={18} />
                  Change Password
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPass">Current Password</Label>
                    <Input id="currentPass" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPass">New Password</Label>
                    <Input id="newPass" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPass">Confirm Password</Label>
                    <Input id="confirmPass" type="password" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    Last password change: {securityInfo.lastPasswordChange}
                  </div>
                  <Button size="sm" onClick={() => toast.success("Password updated successfully")}>
                    Update Password
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Two-Factor Authentication */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Shield size={18} />
                  Two-Factor Authentication
                </h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">2FA Status</div>
                    <div className="text-sm text-muted-foreground">
                      {securityInfo.twoFactorEnabled ? "Enabled and active" : "Disabled"}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {securityInfo.twoFactorEnabled && (
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle size={12} className="mr-1" />
                        Enabled
                      </Badge>
                    )}
                    <Switch checked={securityInfo.twoFactorEnabled} />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Login History */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Clock size={18} />
                  Recent Login Activity
                </h4>
                <div className="space-y-3">
                  {securityInfo.loginHistory.map((login, index) => (
                    <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{login.device}</div>
                        <div className="text-sm text-muted-foreground">{login.location}</div>
                        <div className="text-xs text-muted-foreground">IP: {login.ip}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{login.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Session Settings */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Settings size={18} />
                  Session Settings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input id="sessionTimeout" value={securityInfo.sessionTimeout} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowedIPs">Allowed IP Addresses</Label>
                    <Input id="allowedIPs" value={securityInfo.allowedIPs} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Login Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified when someone logs into your account
                    </div>
                  </div>
                  <Switch checked={securityInfo.loginNotifications} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Mail size={18} />
                  Email Notifications
                </h4>
                <div className="space-y-3">
                  {[
                    { key: "emailBookings", label: "New Bookings", description: "Get notified when a new booking is made" },
                    { key: "emailCancellations", label: "Cancellations", description: "Receive alerts for booking cancellations" },
                    { key: "emailReviews", label: "Customer Reviews", description: "Be notified of new customer reviews" },
                    { key: "emailMessages", label: "Messages", description: "Get emails for new customer messages" },
                    { key: "emailReports", label: "Reports", description: "Receive daily/weekly business reports" },
                    { key: "emailPromotions", label: "Promotions & Updates", description: "Marketing and platform updates" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <Switch
                        checked={notificationPrefs[item.key as keyof typeof notificationPrefs]}
                        onCheckedChange={(checked) => setNotificationPrefs({ ...notificationPrefs, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* SMS Notifications */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Phone size={18} />
                  SMS Notifications
                </h4>
                <div className="space-y-3">
                  {[
                    { key: "smsBookings", label: "New Bookings", description: "Instant SMS for new bookings" },
                    { key: "smsReminders", label: "Reminders", description: "Get SMS reminders for appointments" },
                    { key: "smsCancellations", label: "Cancellations", description: "SMS alerts for cancellations" },
                    { key: "smsPromotions", label: "Promotions", description: "Promotional SMS messages" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <Switch
                        checked={notificationPrefs[item.key as keyof typeof notificationPrefs]}
                        onCheckedChange={(checked) => setNotificationPrefs({ ...notificationPrefs, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Push Notifications */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Bell size={18} />
                  Push Notifications
                </h4>
                <div className="space-y-3">
                  {[
                    { key: "pushBookings", label: "Bookings", description: "Real-time booking notifications" },
                    { key: "pushMessages", label: "Messages", description: "Instant message alerts" },
                    { key: "pushReviews", label: "Reviews", description: "New review notifications" },
                    { key: "pushPromotions", label: "Promotions", description: "Marketing push notifications" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <Switch
                        checked={notificationPrefs[item.key as keyof typeof notificationPrefs]}
                        onCheckedChange={(checked) => setNotificationPrefs({ ...notificationPrefs, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Report Frequency */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <BarChart3 size={18} />
                  Report Frequency
                </h4>
                <div className="space-y-3">
                  {[
                    { key: "weeklyReports", label: "Weekly Reports", description: "Receive comprehensive weekly business reports" },
                    { key: "monthlyReports", label: "Monthly Reports", description: "Get detailed monthly performance reports" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <Switch
                        checked={notificationPrefs[item.key as keyof typeof notificationPrefs]}
                        onCheckedChange={(checked) => setNotificationPrefs({ ...notificationPrefs, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => toast.success("Notification preferences saved")}>
                  <Save size={16} className="mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription & Billing</CardTitle>
              <CardDescription>Manage your subscription plan and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Plan */}
              <div className="p-6 border-2 border-blue-200 bg-blue-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold">{subscriptionInfo.plan}</h3>
                      <Badge className="bg-green-600 text-white">
                        {subscriptionInfo.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground mt-2">
                      {subscriptionInfo.amount} • {subscriptionInfo.billingCycle}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Next billing date: {subscriptionInfo.nextBillingDate}
                    </p>
                  </div>
                  <Button variant="outline">
                    Change Plan
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subscriptionInfo.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <CreditCard size={18} />
                  Payment Method
                </h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white font-bold">
                      VISA
                    </div>
                    <div>
                      <div className="font-medium">Visa ending in {subscriptionInfo.paymentMethod}</div>
                      <div className="text-sm text-muted-foreground">Expires 12/2026</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>

              {/* Billing History */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <FileText size={18} />
                  Billing History
                </h4>
                <div className="space-y-2">
                  {[
                    { date: "2024-12-01", amount: "$2,499.00", status: "Paid", invoice: "INV-2024-12-001" },
                    { date: "2024-11-01", amount: "$2,499.00", status: "Paid", invoice: "INV-2024-11-001" },
                    { date: "2024-10-01", amount: "$2,499.00", status: "Paid", invoice: "INV-2024-10-001" },
                  ].map((bill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium">{bill.invoice}</div>
                          <div className="text-sm text-muted-foreground">{bill.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-medium">{bill.amount}</div>
                        <Badge className="bg-green-600 text-white">{bill.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <FileText size={14} className="mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
