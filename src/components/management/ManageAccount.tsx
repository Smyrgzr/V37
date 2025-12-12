"use client";

import { useState } from "react";
import { Save, Upload, Edit, FileText, Shield, CheckCircle, AlertCircle, ArrowLeft, User, Building2, MapPin, Lock, Bell, Camera, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Switch } from "../ui/switch";
import { toast } from "sonner@2.0.3";

interface ManageAccountProps {
  onBack: () => void;
  userRole?: "carwash_owner" | "carwash_admin";
  userName?: string;
  userEmail?: string;
  centerName?: string;
  branchName?: string;
  branchId?: string;
}

interface DocumentUpload {
  file: File | null;
  fileName: string;
  uploadedAt?: string;
}

const countryCodes = [
  { id: "us", code: "+1", flag: "🇺🇸", country: "United States" },
  { id: "uk", code: "+44", flag: "🇬🇧", country: "United Kingdom" },
  { id: "ca", code: "+1", flag: "🇨🇦", country: "Canada" },
  { id: "au", code: "+61", flag: "🇦🇺", country: "Australia" },
];

export function ManageAccount({ 
  onBack, 
  userRole = "carwash_owner",
  userName = "John Smith",
  userEmail = "owner@autowash.com",
  centerName = "AutoWash Pro",
  branchName,
  branchId
}: ManageAccountProps) {
  // Tab state - default to "personal" for admin, "owner" for owner
  const [activeTab, setActiveTab] = useState(userRole === "carwash_admin" ? "personal" : "owner");
  
  // Edit mode state for each section
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Account Owner States
  const [ownerName, setOwnerName] = useState("John Smith");
  const [ownerEmail, setOwnerEmail] = useState("owner@autowash.com");
  const [ownerPhone, setOwnerPhone] = useState("+1-555-0123");
  const [ownerPhoneCountry, setOwnerPhoneCountry] = useState("us");
  const [authorizedAccount, setAuthorizedAccount] = useState(true);

  // Business Information States
  const [businessName, setBusinessName] = useState("AutoWash Pro");
  const [taxId, setTaxId] = useState("12-3456789");
  const [businessDescription, setBusinessDescription] = useState("Premium carwash services");

  // Business Contact States
  const [businessPhone, setBusinessPhone] = useState("+1-555-0123");
  const [businessPhoneCountry, setBusinessPhoneCountry] = useState("us");
  const [businessEmail, setBusinessEmail] = useState("info@autowashpro.com");
  const [businessWebsite, setBusinessWebsite] = useState("www.autowashpro.com");

  // Compliance & Documents States
  const [businessLicense, setBusinessLicense] = useState<DocumentUpload>({ file: null, fileName: "" });
  const [insuranceCert, setInsuranceCert] = useState<DocumentUpload>({ file: null, fileName: "" });
  const [taxForm, setTaxForm] = useState<DocumentUpload>({ file: null, fileName: "" });
  const [ownerId, setOwnerId] = useState<DocumentUpload>({ file: null, fileName: "" });
  const [insuranceCarrier, setInsuranceCarrier] = useState("State Farm Insurance");
  const [policyNumber, setPolicyNumber] = useState("POL-123456789");
  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState(false);

  // Banking & Payouts States
  const [accountHolder, setAccountHolder] = useState("AutoWash Pro LLC");
  const [routingNumber, setRoutingNumber] = useState("021000021");
  const [accountNumber, setAccountNumber] = useState("1234567890");
  const [remittanceEmail, setRemittanceEmail] = useState("accounting@autowashpro.com");

  // Agreements States
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [pricingAccepted, setPricingAccepted] = useState(true);
  const [cancellationAccepted, setCancellationAccepted] = useState(true);

  // Admin-specific states
  const [adminPersonalInfo, setAdminPersonalInfo] = useState({
    firstName: userName?.split(" ")[0] || "Mike",
    lastName: userName?.split(" ")[1] || "Thompson",
    email: userEmail || "admin@autowash.com",
    phone: "+1-555-0987",
    position: "Branch Administrator",
    avatar: "",
  });

  const [adminBranchInfo, setAdminBranchInfo] = useState({
    centerName: centerName || "AutoWash Pro",
    branchName: branchName || "Downtown Branch",
    branchId: branchId || "b1",
    assignedDate: "2024-01-15",
    permissions: ["Manage Bookings", "View Analytics", "Manage Staff", "Respond to Reviews"],
  });

  const [adminContactInfo, setAdminContactInfo] = useState({
    address: "789 Oak Street, Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    emergencyContact: "+1-555-0988",
    emergencyContactName: "Sarah Thompson",
  });

  const [adminSecurityInfo, setAdminSecurityInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
  });

  const [adminNotificationPrefs, setAdminNotificationPrefs] = useState({
    emailBookings: true,
    emailReviews: true,
    emailPromotions: false,
    smsBookings: true,
    smsReminders: true,
    smsPromotions: false,
    pushNotifications: true,
  });

  // Edit states for admin tabs
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingBranchInfo, setEditingBranchInfo] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [editingSecurity, setEditingSecurity] = useState(false);
  const [editingNotifications, setEditingNotifications] = useState(false);

  const handleFileUpload = (
    setter: React.Dispatch<React.SetStateAction<DocumentUpload>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setter({
        file,
        fileName: file.name,
        uploadedAt: new Date().toISOString()
      });
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  const handleSectionEdit = (sectionId: string) => {
    setEditingSection(sectionId);
  };

  const handleSectionSave = (sectionId: string) => {
    setEditingSection(null);
    toast.success("Section saved successfully");
  };

  const handleSectionCancel = () => {
    setEditingSection(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminPersonalInfo({ ...adminPersonalInfo, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
      toast.success("Avatar uploaded successfully");
    }
  };

  const handleSaveAdminPersonal = () => {
    setEditingPersonal(false);
    toast.success("Personal information updated successfully");
  };

  const handleSaveAdminContact = () => {
    setEditingContact(false);
    toast.success("Contact details updated successfully");
  };

  const handleSaveAdminSecurity = () => {
    if (adminSecurityInfo.newPassword !== adminSecurityInfo.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setEditingSecurity(false);
    setAdminSecurityInfo({
      ...adminSecurityInfo,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    toast.success("Security settings updated successfully");
  };

  const handleSaveAdminNotifications = () => {
    setEditingNotifications(false);
    toast.success("Notification preferences updated successfully");
  };

  // Render tabbed view for both owner and admin
  if (userRole === "carwash_admin") {
    return (
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal" className="gap-2">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="branch" className="gap-2">
              <Building2 className="h-4 w-4" />
              Branch
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <MapPin className="h-4 w-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and profile picture</CardDescription>
                </div>
                <div className="flex gap-2">
                  {editingPersonal ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setEditingPersonal(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveAdminPersonal}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => setEditingPersonal(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={adminPersonalInfo.avatar} />
                    <AvatarFallback className="text-2xl">
                      {adminPersonalInfo.firstName[0]}{adminPersonalInfo.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {editingPersonal && (
                    <div>
                      <Label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                          <Camera className="h-4 w-4" />
                          <span>Change Photo</span>
                        </div>
                      </Label>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </div>
                  )}
                </div>

                {/* Personal Details Form */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={adminPersonalInfo.firstName}
                      onChange={(e) => setAdminPersonalInfo({ ...adminPersonalInfo, firstName: e.target.value })}
                      disabled={!editingPersonal}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={adminPersonalInfo.lastName}
                      onChange={(e) => setAdminPersonalInfo({ ...adminPersonalInfo, lastName: e.target.value })}
                      disabled={!editingPersonal}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={adminPersonalInfo.email}
                      onChange={(e) => setAdminPersonalInfo({ ...adminPersonalInfo, email: e.target.value })}
                      disabled={!editingPersonal}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={adminPersonalInfo.phone}
                      onChange={(e) => setAdminPersonalInfo({ ...adminPersonalInfo, phone: e.target.value })}
                      disabled={!editingPersonal}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="position">Position/Role</Label>
                    <Input
                      id="position"
                      value={adminPersonalInfo.position}
                      onChange={(e) => setAdminPersonalInfo({ ...adminPersonalInfo, position: e.target.value })}
                      disabled={!editingPersonal}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branch Assignment Tab */}
          <TabsContent value="branch" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Branch Assignment</CardTitle>
                <CardDescription>Your assigned branch and permissions (managed by owner)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Center Name</Label>
                    <Input value={adminBranchInfo.centerName} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Branch Name</Label>
                    <Input value={adminBranchInfo.branchName} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Branch ID</Label>
                    <Input value={adminBranchInfo.branchId} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Assigned Since</Label>
                    <Input value={adminBranchInfo.assignedDate} disabled />
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Label>Permissions & Access</Label>
                  <div className="space-y-2">
                    {adminBranchInfo.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3 mt-4">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm text-blue-900">Branch assignment is managed by the carwash owner</p>
                    <p className="text-xs text-blue-700">Contact your center administrator to request permission changes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Details Tab */}
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Contact Details</CardTitle>
                  <CardDescription>Update your contact information and emergency contacts</CardDescription>
                </div>
                <div className="flex gap-2">
                  {editingContact ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setEditingContact(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveAdminContact}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => setEditingContact(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Home Address</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={adminContactInfo.address}
                        onChange={(e) => setAdminContactInfo({ ...adminContactInfo, address: e.target.value })}
                        disabled={!editingContact}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={adminContactInfo.city}
                        onChange={(e) => setAdminContactInfo({ ...adminContactInfo, city: e.target.value })}
                        disabled={!editingContact}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={adminContactInfo.state}
                        onChange={(e) => setAdminContactInfo({ ...adminContactInfo, state: e.target.value })}
                        disabled={!editingContact}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={adminContactInfo.postalCode}
                        onChange={(e) => setAdminContactInfo({ ...adminContactInfo, postalCode: e.target.value })}
                        disabled={!editingContact}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={adminContactInfo.country}
                        onChange={(e) => setAdminContactInfo({ ...adminContactInfo, country: e.target.value })}
                        disabled={!editingContact}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Emergency Contact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactName">Contact Name</Label>
                      <Input
                        id="emergencyContactName"
                        value={adminContactInfo.emergencyContactName}
                        onChange={(e) => setAdminContactInfo({ ...adminContactInfo, emergencyContactName: e.target.value })}
                        disabled={!editingContact}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Contact Phone</Label>
                      <Input
                        id="emergencyContact"
                        type="tel"
                        value={adminContactInfo.emergencyContact}
                        onChange={(e) => setAdminContactInfo({ ...adminContactInfo, emergencyContact: e.target.value })}
                        disabled={!editingContact}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </div>
                <div className="flex gap-2">
                  {editingSecurity ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setEditingSecurity(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveAdminSecurity}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => setEditingSecurity(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Change Password</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={adminSecurityInfo.currentPassword}
                        onChange={(e) => setAdminSecurityInfo({ ...adminSecurityInfo, currentPassword: e.target.value })}
                        disabled={!editingSecurity}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={adminSecurityInfo.newPassword}
                        onChange={(e) => setAdminSecurityInfo({ ...adminSecurityInfo, newPassword: e.target.value })}
                        disabled={!editingSecurity}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={adminSecurityInfo.confirmPassword}
                        onChange={(e) => setAdminSecurityInfo({ ...adminSecurityInfo, confirmPassword: e.target.value })}
                        disabled={!editingSecurity}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Enable Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={adminSecurityInfo.twoFactorEnabled}
                      onCheckedChange={(checked) => setAdminSecurityInfo({ ...adminSecurityInfo, twoFactorEnabled: checked })}
                      disabled={!editingSecurity}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </div>
                <div className="flex gap-2">
                  {editingNotifications ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setEditingNotifications(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveAdminNotifications}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => setEditingNotifications(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Booking Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified about new bookings and cancellations
                        </p>
                      </div>
                      <Switch
                        checked={adminNotificationPrefs.emailBookings}
                        onCheckedChange={(checked) => setAdminNotificationPrefs({ ...adminNotificationPrefs, emailBookings: checked })}
                        disabled={!editingNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Reviews & Feedback</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when customers leave reviews
                        </p>
                      </div>
                      <Switch
                        checked={adminNotificationPrefs.emailReviews}
                        onCheckedChange={(checked) => setAdminNotificationPrefs({ ...adminNotificationPrefs, emailReviews: checked })}
                        disabled={!editingNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Promotions & Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional offers and platform updates
                        </p>
                      </div>
                      <Switch
                        checked={adminNotificationPrefs.emailPromotions}
                        onCheckedChange={(checked) => setAdminNotificationPrefs({ ...adminNotificationPrefs, emailPromotions: checked })}
                        disabled={!editingNotifications}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">SMS Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Booking Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Receive SMS alerts for urgent booking updates
                        </p>
                      </div>
                      <Switch
                        checked={adminNotificationPrefs.smsBookings}
                        onCheckedChange={(checked) => setAdminNotificationPrefs({ ...adminNotificationPrefs, smsBookings: checked })}
                        disabled={!editingNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Reminders</p>
                        <p className="text-sm text-muted-foreground">
                          Get reminders for scheduled services and tasks
                        </p>
                      </div>
                      <Switch
                        checked={adminNotificationPrefs.smsReminders}
                        onCheckedChange={(checked) => setAdminNotificationPrefs({ ...adminNotificationPrefs, smsReminders: checked })}
                        disabled={!editingNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Promotional Messages</p>
                        <p className="text-sm text-muted-foreground">
                          Receive special offers and campaign updates via SMS
                        </p>
                      </div>
                      <Switch
                        checked={adminNotificationPrefs.smsPromotions}
                        onCheckedChange={(checked) => setAdminNotificationPrefs({ ...adminNotificationPrefs, smsPromotions: checked })}
                        disabled={!editingNotifications}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Push Notifications</h4>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Enable Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive real-time notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={adminNotificationPrefs.pushNotifications}
                      onCheckedChange={(checked) => setAdminNotificationPrefs({ ...adminNotificationPrefs, pushNotifications: checked })}
                      disabled={!editingNotifications}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Owner view with tabs
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="owner" className="gap-2">
            <User className="h-4 w-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="business" className="gap-2">
            <Building2 className="h-4 w-4" />
            Business Profile
          </TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2">
            <FileText className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="banking" className="gap-2">
            <Shield className="h-4 w-4" />
            Banking
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="owner" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and profile picture</CardDescription>
              </div>
              <div className="flex gap-2">
                {editingSection === "accountOwner" ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleSectionCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleSectionSave("accountOwner")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => handleSectionEdit("accountOwner")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={adminPersonalInfo.avatar} />
                  <AvatarFallback className="text-2xl">
                    {ownerName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {editingSection === "accountOwner" && (
                  <div>
                    <Label htmlFor="avatar-upload-owner" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                        <Camera className="h-4 w-4" />
                        <span>Change Photo</span>
                      </div>
                    </Label>
                    <Input
                      id="avatar-upload-owner"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                )}
              </div>

              {/* Personal Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Full Name *</Label>
                  <Input
                    id="ownerName"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Enter your full name"
                    disabled={editingSection !== "accountOwner"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerEmail">Email Address *</Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    disabled={editingSection !== "accountOwner"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerPhone">Phone Number *</Label>
                <div className="flex gap-2">
                  <Select value={ownerPhoneCountry} onValueChange={setOwnerPhoneCountry} disabled={editingSection !== "accountOwner"}>
                    <SelectTrigger className="w-40">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span>{countryCodes.find(c => c.id === ownerPhoneCountry)?.flag}</span>
                          <span>{countryCodes.find(c => c.id === ownerPhoneCountry)?.code}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          <div className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                            <span className="text-muted-foreground text-xs">{country.country}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="ownerPhone"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="555-0123"
                    className="flex-1"
                    disabled={editingSection !== "accountOwner"}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="authorized"
                  checked={authorizedAccount}
                  onCheckedChange={(checked) => setAuthorizedAccount(checked as boolean)}
                  disabled={editingSection !== "accountOwner"}
                />
                <Label htmlFor="authorized" className="text-sm cursor-pointer">
                  I confirm that I am authorized to manage this company account
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Profile Tab - Combined Business Info and Contact */}
        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Business Profile</CardTitle>
                <CardDescription>Legal business details and contact information</CardDescription>
              </div>
              <div className="flex gap-2">
                {editingSection === "businessInfo" ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleSectionCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleSectionSave("businessInfo")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => handleSectionEdit("businessInfo")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Business Information Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Business Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Legal Business Name *</Label>
                    <Input
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Your Company LLC"
                      disabled={editingSection !== "businessInfo"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Federal Tax ID / EIN *</Label>
                    <Input
                      id="taxId"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      placeholder="XX-XXXXXXX"
                      disabled={editingSection !== "businessInfo"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">Business Description</Label>
                  <Textarea
                    id="businessDescription"
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    placeholder="Describe your carwash business and services..."
                    rows={3}
                    disabled={editingSection !== "businessInfo"}
                  />
                </div>
              </div>

              {/* Business Contact Section */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Business Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Business Phone *</Label>
                    <div className="flex gap-2">
                      <Select value={businessPhoneCountry} onValueChange={setBusinessPhoneCountry} disabled={editingSection !== "businessInfo"}>
                        <SelectTrigger className="w-40">
                          <SelectValue>
                            <div className="flex items-center gap-2">
                              <span>{countryCodes.find(c => c.id === businessPhoneCountry)?.flag}</span>
                              <span>{countryCodes.find(c => c.id === businessPhoneCountry)?.code}</span>
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((country) => (
                            <SelectItem key={country.id} value={country.id}>
                              <div className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.code}</span>
                                <span className="text-muted-foreground text-xs">{country.country}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="businessPhone"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                        placeholder="555-0123"
                        className="flex-1"
                        disabled={editingSection !== "businessInfo"}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Business Email *</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="info@yourcompany.com"
                      disabled={editingSection !== "businessInfo"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessWebsite">Website (Optional)</Label>
                  <Input
                    id="businessWebsite"
                    value={businessWebsite}
                    onChange={(e) => setBusinessWebsite(e.target.value)}
                    placeholder="www.yourcompany.com"
                    disabled={editingSection !== "businessInfo"}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance & Documents Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Compliance & Documents</CardTitle>
                <CardDescription>Upload required legal and compliance documents</CardDescription>
              </div>
              <div className="flex gap-2">
              {editingSection === "compliance" ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleSectionCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => handleSectionSave("compliance")}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => handleSectionEdit("compliance")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              </div>
            </CardHeader>
        <CardContent className="space-y-6">
          {/* Document Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Business License */}
            <div className="space-y-2">
              <Label htmlFor="businessLicense">Business License *</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                {businessLicense.fileName ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-sm truncate">{businessLicense.fileName}</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <Button variant="outline" size="sm" className="relative w-full" disabled={editingSection !== "compliance"}>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(setBusinessLicense, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.jpg,.jpeg,.png"
                        disabled={editingSection !== "compliance"}
                      />
                      Upload File
                    </Button>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Insurance Certificate */}
            <div className="space-y-2">
              <Label htmlFor="insuranceCert">Insurance Certificate *</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                {insuranceCert.fileName ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-sm truncate">{insuranceCert.fileName}</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <Button variant="outline" size="sm" className="relative w-full" disabled={editingSection !== "compliance"}>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(setInsuranceCert, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.jpg,.jpeg,.png"
                        disabled={editingSection !== "compliance"}
                      />
                      Upload File
                    </Button>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* W-9 / W-8BEN */}
            <div className="space-y-2">
              <Label htmlFor="taxForm">W-9 (US) / W-8BEN (Non-US) *</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                {taxForm.fileName ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-sm truncate">{taxForm.fileName}</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <Button variant="outline" size="sm" className="relative w-full" disabled={editingSection !== "compliance"}>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(setTaxForm, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.jpg,.jpeg,.png"
                        disabled={editingSection !== "compliance"}
                      />
                      Upload File
                    </Button>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Owner ID */}
            <div className="space-y-2">
              <Label htmlFor="ownerId">Owner ID *</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                {ownerId.fileName ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-sm truncate">{ownerId.fileName}</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <Button variant="outline" size="sm" className="relative w-full" disabled={editingSection !== "compliance"}>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(setOwnerId, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.jpg,.jpeg,.png"
                        disabled={editingSection !== "compliance"}
                      />
                      Upload File
                    </Button>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Insurance Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceCarrier">Insurance Carrier *</Label>
              <Input
                id="insuranceCarrier"
                value={insuranceCarrier}
                onChange={(e) => setInsuranceCarrier(e.target.value)}
                placeholder="State Farm Insurance"
                disabled={editingSection !== "compliance"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="policyNumber">Policy Number *</Label>
              <Input
                id="policyNumber"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                placeholder="POL-123456789"
                disabled={editingSection !== "compliance"}
              />
            </div>
          </div>

          {/* Background Check Consent */}
          <div className="flex items-start space-x-2 pt-2 p-4 bg-muted/50 rounded-lg">
            <Checkbox
              id="backgroundCheck"
              checked={backgroundCheckConsent}
              onCheckedChange={(checked) => setBackgroundCheckConsent(checked as boolean)}
              disabled={editingSection !== "compliance"}
            />
            <div className="space-y-1">
              <Label htmlFor="backgroundCheck" className="text-sm cursor-pointer">
                Background Check Consent *
              </Label>
              <p className="text-xs text-muted-foreground">
                I consent to a background check as part of the vendor onboarding process
              </p>
            </div>
          </div>
        </CardContent>
          </Card>
        </TabsContent>

        {/* Banking & Payouts Tab */}
        <TabsContent value="banking" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Banking & Payouts</CardTitle>
                <CardDescription>Bank account information for receiving payments</CardDescription>
              </div>
              <div className="flex gap-2">
              {editingSection === "banking" ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleSectionCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => handleSectionSave("banking")}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => handleSectionEdit("banking")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              </div>
            </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm text-blue-900">Your banking information is encrypted and secure</p>
              <p className="text-xs text-blue-700">We use bank-level encryption to protect your financial data</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountHolder">Account Holder Name *</Label>
            <Input
              id="accountHolder"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Your Company LLC"
              disabled={editingSection !== "banking"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number *</Label>
              <Input
                id="routingNumber"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
                placeholder="021000021"
                maxLength={9}
                disabled={editingSection !== "banking"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                type="password"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="••••••••••"
                disabled={editingSection !== "banking"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remittanceEmail">Remittance Email *</Label>
            <Input
              id="remittanceEmail"
              type="email"
              value={remittanceEmail}
              onChange={(e) => setRemittanceEmail(e.target.value)}
              placeholder="accounting@yourcompany.com"
              disabled={editingSection !== "banking"}
            />
            <p className="text-xs text-muted-foreground">
              Payment notifications and invoices will be sent to this email
            </p>
          </div>
        </CardContent>
          </Card>
        </TabsContent>

        {/* Security & Notifications Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </div>
              <div className="flex gap-2">
                {editingSection === "security" ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleSectionCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleSectionSave("security")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => handleSectionEdit("security")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Change Password Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      disabled={editingSection !== "security"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      disabled={editingSection !== "security"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      disabled={editingSection !== "security"}
                    />
                  </div>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    disabled={editingSection !== "security"}
                  />
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Notification Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive booking updates and important alerts via email
                      </p>
                    </div>
                    <Switch
                      checked={true}
                      disabled={editingSection !== "security"}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Get real-time booking notifications via SMS
                      </p>
                    </div>
                    <Switch
                      checked={true}
                      disabled={editingSection !== "security"}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive real-time notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={true}
                      disabled={editingSection !== "security"}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
