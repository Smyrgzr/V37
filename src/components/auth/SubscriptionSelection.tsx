"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Check, CreditCard, Building2, Sparkles } from "lucide-react";
import { Separator } from "../ui/separator";

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
    description: "Perfect for small carwash businesses starting with Letwash",
    monthlyPrice: 49,
    yearlyPrice: 490,
    branchLimit: 1,
    features: [
      "1 Branch Location",
      "Basic Booking Management",
      "Customer Database",
      "Mobile App Access",
      "Email Support",
      "Basic Analytics",
      "Standard Services Catalog"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing businesses with multiple locations",
    monthlyPrice: 129,
    yearlyPrice: 1290,
    branchLimit: 5,
    recommended: true,
    popular: true,
    features: [
      "Up to 5 Branch Locations",
      "Advanced Booking & Scheduling",
      "Customer Management & CRM",
      "Mobile App Access",
      "Priority Email & Chat Support",
      "Advanced Analytics & Reports",
      "Campaign Management",
      "Revenue Tracking",
      "Staff Management",
      "Custom Services & Packages"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Complete solution for large carwash chains",
    monthlyPrice: 299,
    yearlyPrice: 2990,
    branchLimit: "unlimited",
    features: [
      "Unlimited Branch Locations",
      "Full Platform Access",
      "Advanced AI Insights & Predictions",
      "Dynamic Pricing Engine",
      "Capacity Planning & Optimization",
      "Multi-location Dashboard",
      "24/7 Priority Support",
      "Dedicated Account Manager",
      "Custom Integrations",
      "API Access",
      "White-label Mobile App",
      "Advanced Security & Compliance"
    ]
  }
];

interface SubscriptionSelectionProps {
  onComplete: (subscription: { tierId: string; billingCycle: "monthly" | "yearly" } | null) => void;
  onSkip: () => void;
}

export function SubscriptionSelection({ onComplete, onSkip }: SubscriptionSelectionProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>("professional");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const handleContinue = () => {
    if (selectedTier) {
      onComplete({ tierId: selectedTier, billingCycle });
    }
  };

  const getSavingsPercentage = () => {
    return Math.round((1 - (1290 / (129 * 12))) * 100); // Calculate yearly savings
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl">
        <CardHeader className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">
            let<span className="text-gray-800">wash</span>
          </div>
          <CardTitle>Choose Your Subscription Plan</CardTitle>
          <CardDescription>
            Select a plan that fits your business needs. You can upgrade or downgrade anytime.
          </CardDescription>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
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
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md"
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

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      {isSelected && (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <CardDescription className="min-h-[40px]">{tier.description}</CardDescription>

                    <div className="pt-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">${pricePerMonth}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      {billingCycle === "yearly" && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Billed ${tier.yearlyPrice} annually
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        {tier.branchLimit === "unlimited" ? "Unlimited" : tier.branchLimit} Branch
                        {tier.branchLimit === 1 ? "" : "es"}
                      </div>

                      <div className="space-y-2">
                        {tier.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {tier.recommended && (
                      <div className="pt-2">
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          Recommended for You
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button
                onClick={handleContinue}
                disabled={!selectedTier}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Continue with {subscriptionTiers.find((t) => t.id === selectedTier)?.name || "Plan"}
              </Button>
            </div>

            <div className="text-center">
              <button
                onClick={onSkip}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip for now - I'll choose a plan later from my profile
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
              <p className="font-medium mb-1">💡 No commitment required</p>
              <p className="text-blue-700">
                You can upgrade, downgrade, or cancel your subscription anytime from your account settings.
                All plans include a 14-day free trial to explore the platform.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
