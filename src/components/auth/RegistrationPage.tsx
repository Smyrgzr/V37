"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { DemoCredentials } from "./DemoCredentials";

interface RegistrationData {
  centerName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

interface RegistrationPageProps {
  onRegister: (data: RegistrationData) => void;
  onSocialRegister: (provider: string, basicInfo: any) => void;
  onBack: () => void;
  loading?: boolean;
  error?: string;
}

export function RegistrationPage({ onRegister, onSocialRegister, onBack, loading, error }: RegistrationPageProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    centerName: "AutoWash Pro Test Center",
    contactPerson: "John Smith",
    email: "test@autowashpro.com",
    phone: "+1-555-0123",
    address: "123 Main Street, Suite 100",
    city: "New York",
    district: "Manhattan",
    postalCode: "10001",
    password: "testpass123",
    confirmPassword: "testpass123",
    termsAccepted: true,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.centerName.trim()) errors.centerName = "Center name is required";
    if (!formData.contactPerson.trim()) errors.contactPerson = "Contact person is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.district.trim()) errors.district = "District is required";
    if (!formData.postalCode.trim()) errors.postalCode = "Postal code is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password.length < 8) errors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.termsAccepted) errors.terms = "You must accept the terms and conditions";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(formData);
    }
  };

  const handleSocialRegister = async (provider: string) => {
    setSocialLoading(provider);
    try {
      // Mock social registration - in real implementation, this would handle OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data from social provider
      const mockSocialData = {
        name: provider === "google" ? "John Smith" : provider === "apple" ? "Jane Doe" : "Mike Johnson",
        email: provider === "google" ? "john.smith@gmail.com" : provider === "apple" ? "jane.doe@icloud.com" : "mike.johnson@outlook.com",
        provider: provider
      };
      
      onSocialRegister(provider, mockSocialData);
    } finally {
      setSocialLoading(null);
    }
  };

  const updateFormData = (field: keyof RegistrationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4 relative">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft size={20} />
            </Button>
            <div className="text-4xl font-bold text-blue-600">
              let<span className="text-gray-800">wash</span>
            </div>
            <div className="w-10"></div>
          </div>
          <CardTitle>Join Letwash Network</CardTitle>
          <CardDescription>Register your carwash center and start managing your business</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Social Registration Options */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister("google")}
                disabled={socialLoading !== null || loading}
                className="w-full"
              >
                {socialLoading === "google" ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister("apple")}
                disabled={socialLoading !== null || loading}
                className="w-full"
              >
                {socialLoading === "apple" ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2.01.77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                )}
                Apple
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister("microsoft")}
                disabled={socialLoading !== null || loading}
                className="w-full"
              >
                {socialLoading === "microsoft" ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path d="M0 0h11.5v11.5H0V0z" fill="#F25022"/>
                    <path d="M12.5 0H24v11.5H12.5V0z" fill="#7FBA00"/>
                    <path d="M0 12.5h11.5V24H0V12.5z" fill="#00A4EF"/>
                    <path d="M12.5 12.5H24V24H12.5V12.5z" fill="#FFB900"/>
                  </svg>
                )}
                Microsoft
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or register with email</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="centerName">Center Name *</Label>
                <Input
                  id="centerName"
                  placeholder="AutoWash Pro"
                  value={formData.centerName}
                  onChange={(e) => updateFormData("centerName", e.target.value)}
                  className={validationErrors.centerName ? "border-destructive bg-input-background" : "bg-input-background"}
                />
                {validationErrors.centerName && (
                  <p className="text-sm text-destructive">{validationErrors.centerName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  placeholder="John Smith"
                  value={formData.contactPerson}
                  onChange={(e) => updateFormData("contactPerson", e.target.value)}
                  className={validationErrors.contactPerson ? "border-destructive bg-input-background" : "bg-input-background"}
                />
                {validationErrors.contactPerson && (
                  <p className="text-sm text-destructive">{validationErrors.contactPerson}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Corporate Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@autowashpro.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={validationErrors.email ? "border-destructive bg-input-background" : "bg-input-background"}
                />
                {validationErrors.email && (
                  <p className="text-sm text-destructive">{validationErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  placeholder="+1-555-0123"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className={validationErrors.phone ? "border-destructive bg-input-background" : "bg-input-background"}
                />
                {validationErrors.phone && (
                  <p className="text-sm text-destructive">{validationErrors.phone}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Primary Address *</Label>
              <Textarea
                id="address"
                placeholder="123 Main Street, Suite 100"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                className={validationErrors.address ? "border-destructive bg-input-background" : "bg-input-background"}
              />
              {validationErrors.address && (
                <p className="text-sm text-destructive">{validationErrors.address}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  className={validationErrors.city ? "border-destructive bg-input-background" : "bg-input-background"}
                />
                {validationErrors.city && (
                  <p className="text-sm text-destructive">{validationErrors.city}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Input
                  id="district"
                  placeholder="Manhattan"
                  value={formData.district}
                  onChange={(e) => updateFormData("district", e.target.value)}
                  className={validationErrors.district ? "border-destructive bg-input-background" : "bg-input-background"}
                />
                {validationErrors.district && (
                  <p className="text-sm text-destructive">{validationErrors.district}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  placeholder="10001"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData("postalCode", e.target.value)}
                  className={validationErrors.postalCode ? "border-destructive bg-input-background" : "bg-input-background"}
                />
                {validationErrors.postalCode && (
                  <p className="text-sm text-destructive">{validationErrors.postalCode}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className={validationErrors.password ? "border-destructive pr-10 bg-input-background" : "pr-10 bg-input-background"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-destructive">{validationErrors.password}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    className={validationErrors.confirmPassword ? "border-destructive pr-10 bg-input-background" : "pr-10 bg-input-background"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-sm text-destructive">{validationErrors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => updateFormData("termsAccepted", checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="terms" className="text-sm leading-5">
                  I accept the <button type="button" className="text-blue-600 hover:underline">Terms of Service</button> and <button type="button" className="text-blue-600 hover:underline">Privacy Policy</button>
                </Label>
                {validationErrors.terms && (
                  <p className="text-sm text-destructive">{validationErrors.terms}</p>
                )}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={loading || socialLoading !== null}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">Already have an account? </span>
              <button
                type="button"
                onClick={onBack}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Sign In
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}