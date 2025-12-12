"use client";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle, ArrowLeft, Mail, Shield, CreditCard } from "lucide-react";
import { Badge } from "../ui/badge";

interface RegistrationConfirmationProps {
  onBackToLogin: () => void;
  email: string;
  socialProvider?: string;
  subscription?: { tierId: string; billingCycle: "monthly" | "yearly" } | null;
}

export function RegistrationConfirmation({ onBackToLogin, email, socialProvider, subscription }: RegistrationConfirmationProps) {
  const getSubscriptionName = (tierId: string) => {
    const names: Record<string, string> = {
      starter: "Starter",
      professional: "Professional",
      enterprise: "Enterprise",
    };
    return names[tierId] || tierId;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBackToLogin} className="p-2">
              <ArrowLeft size={20} />
            </Button>
            <div className="text-4xl font-bold text-blue-600">
              let<span className="text-gray-800">wash</span>
            </div>
            <div className="w-10"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle>Registration Submitted!</CardTitle>
          <CardDescription>
            {socialProvider 
              ? `Your registration via ${socialProvider.charAt(0).toUpperCase() + socialProvider.slice(1)} has been submitted successfully`
              : "Your carwash center registration has been submitted successfully"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">Confirmation Email Sent</p>
                <p className="text-blue-700">
                  We've sent a confirmation email to <strong>{email}</strong>. 
                  Please check your inbox for further instructions.
                </p>
              </div>
            </div>
          </div>

          {socialProvider && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-green-900 mb-1">Quick Login Enabled</p>
                  <p className="text-green-700">
                    Once approved, you can sign in quickly using your {socialProvider.charAt(0).toUpperCase() + socialProvider.slice(1)} account.
                  </p>
                </div>
              </div>
            </div>
          )}

          {subscription && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CreditCard className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm flex-1">
                  <p className="font-medium text-purple-900 mb-1">Subscription Plan Selected</p>
                  <div className="flex items-center gap-2 text-purple-700">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {getSubscriptionName(subscription.tierId)}
                    </Badge>
                    <span>•</span>
                    <span className="capitalize">{subscription.billingCycle} billing</span>
                  </div>
                  <p className="text-purple-700 mt-2">
                    Your subscription will be activated once your registration is approved. You can manage or change your plan anytime from your profile.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!subscription && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CreditCard className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-900 mb-1">No Subscription Selected</p>
                  <p className="text-amber-700">
                    You can choose a subscription plan later from your profile settings once your registration is approved.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center space-y-3">
            <h4 className="font-medium">What happens next?</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. Our team will review your application</p>
              <p>2. We'll verify your carwash center details</p>
              <p>3. You'll receive an approval notification</p>
              <p>4. Start managing your carwash with Letwash!</p>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Review typically takes 24-48 hours</p>
          </div>

          <Button onClick={onBackToLogin} className="w-full bg-blue-600 hover:bg-blue-700">
            Return to Sign In
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at{" "}
              <button className="text-blue-600 hover:underline">
                support@letwash.com
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}