"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { ArrowLeft, CheckCircle, Check, Building2, Sparkles } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface SocialUserInfo {
  name: string;
  email: string;
  provider: string;
}

interface CompletionData {
  centerName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  subscription?: {
    tierId: string;
    billingCycle: "monthly" | "yearly";
  } | null;
}

interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  branchLimit: number | "unlimited";
  recommended?: boolean;
  popular?: boolean;
}

const subscriptionTiers: SubscriptionTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small businesses",
    monthlyPrice: 49,
    yearlyPrice: 490,
    branchLimit: 1,
    features: [
      "1 Branch Location",
      "Basic Booking",
      "Customer Database",
      "Email Support"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing businesses",
    monthlyPrice: 129,
    yearlyPrice: 1290,
    branchLimit: 5,
    recommended: true,
    popular: true,
    features: [
      "Up to 5 Branches",
      "Advanced Booking",
      "CRM & Analytics",
      "Priority Support"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Complete solution for chains",
    monthlyPrice: 299,
    yearlyPrice: 2990,
    branchLimit: "unlimited",
    features: [
      "Unlimited Branches",
      "Full Platform Access",
      "AI Insights",
      "24/7 Support"
    ]
  }
];

interface SocialRegistrationCompleteProps {
  socialUserInfo: SocialUserInfo;
  onComplete: (data: CompletionData) => void;
  onBack: () => void;
  loading?: boolean;
  error?: string;
}

export function SocialRegistrationComplete({ 
  socialUserInfo, 
  onComplete, 
  onBack, 
  loading, 
  error 
}: SocialRegistrationCompleteProps) {
  const [formData, setFormData] = useState<CompletionData>({
    centerName: "AutoWash Pro Social Center",
    phone: "+1-555-0456",
    address: "456 Social Street, Suite 200",
    city: "Los Angeles",
    district: "Downtown",
    postalCode: "90001",
    subscription: null,
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedTier, setSelectedTier] = useState<string | null>("professional");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const validateForm = () => {
    const errors: Record<string, string> = {}; 
    
    if (!formData.centerName.trim()) errors.centerName = "Center name is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.district.trim()) errors.district = "District is required";
    if (!formData.postalCode.trim()) errors.postalCode = "Postal code is required";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSubmit = {
        ...formData,
        subscription: selectedTier ? { tierId: selectedTier, billingCycle } : null
      };
      onComplete(dataToSubmit);
    }
  };

  const handleSkip = () => {
    if (validateForm()) {
      const dataToSubmit = {
        ...formData,
        subscription: null
      };
      onComplete(dataToSubmit);
    }
  };

  const updateFormData = (field: keyof CompletionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const getSavingsPercentage = () => {
    return Math.round((1 - (1290 / (129 * 12))) * 100);
  };

  const providerName = socialUserInfo.provider.charAt(0).toUpperCase() + socialUserInfo.provider.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl max-h-[95vh] overflow-y-auto">
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
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle size={20} />
            <span className="text-sm font-medium">Connected with {providerName}</span>
          </div>
          <CardTitle>Complete Your Registration</CardTitle>
          <CardDescription>We need some additional information about your carwash center</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Connected Account Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              {socialUserInfo.provider === 'google' ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2.01.77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              )}
              <div>
                <p className="font-medium text-gray-900">{socialUserInfo.name}</p>
                <p className="text-sm text-gray-600">{socialUserInfo.email}</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Business Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="centerName">Carwash Center Name *</Label>
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
                  <Label htmlFor="phone">Business Phone Number *</Label>
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
                <Label htmlFor="address">Primary Business Address *</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main Street, Suite 100"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className={validationErrors.address ? "border-destructive bg-input-background" : "bg-input-background"}
                  rows={2}
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
            </div>

            <Separator />

            {/* Subscription Selection */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">Choose Your Subscription Plan</h3>
                <p className="text-sm text-muted-foreground">Select a plan that fits your business needs. You can skip this and choose later from your profile.</p>
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    billingCycle === "monthly"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    billingCycle === "yearly"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yearly
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Save {getSavingsPercentage()}%
                  </Badge>
                </button>
              </div>

              {/* Subscription Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subscriptionTiers.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  const price = billingCycle === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
                  const pricePerMonth = billingCycle === "yearly" ? Math.round(tier.yearlyPrice / 12) : tier.monthlyPrice;

                  return (
                    <Card
                      key={tier.id}
                      className={`relative cursor-pointer transition-all ${
                        isSelected
                          ? "border-blue-600 border-2 shadow-lg"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-blue-600 text-white">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{tier.name}</CardTitle>
                          {isSelected && (
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <CardDescription className="text-xs min-h-[32px]">{tier.description}</CardDescription>

                        <div className="pt-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">${pricePerMonth}</span>
                            <span className="text-sm text-muted-foreground">/month</span>
                          </div>
                          {billingCycle === "yearly" && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Billed ${tier.yearlyPrice} annually
                            </p>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0 space-y-3">
                        <Separator />
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">
                            {tier.branchLimit === "unlimited" ? "Unlimited" : tier.branchLimit} Branch
                            {tier.branchLimit === 1 ? "" : "es"}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {tier.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2 text-xs">
                              <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                disabled={loading}
              >
                {loading ? "Completing Registration..." : selectedTier ? `Complete with ${subscriptionTiers.find(t => t.id === selectedTier)?.name}` : "Complete Registration"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleSkip}
                disabled={loading}
              >
                Skip - I'll choose a plan later
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ← Back to registration options
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
