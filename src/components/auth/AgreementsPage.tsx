import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { FileText, CheckCircle2, Loader2 } from "lucide-react";

interface AgreementsPageProps {
  onAccept: () => void;
  onBack: () => void;
}

export function AgreementsPage({ onAccept, onBack }: AgreementsPageProps) {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    transaction: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const allAgreed = agreements.terms && agreements.privacy && agreements.transaction;

  const handleToggle = (key: keyof typeof agreements) => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAccept = () => {
    if (allAgreed) {
      setIsLoading(true);
      setTimeout(() => {
        onAccept();
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Terms & Agreements</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Please review and accept the following agreements to continue
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Terms of Service */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreements.terms}
                onCheckedChange={() => handleToggle("terms")}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Terms of Service
                </label>
                <ScrollArea className="h-32 w-full border rounded-lg mt-2 p-3 bg-gray-50">
                  <div className="text-xs text-gray-600 space-y-2">
                    <p className="font-semibold">LETWASH TERMS OF SERVICE</p>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <p className="font-semibold mt-4">1. Acceptance of Terms</p>
                    <p>
                      By accessing and using the Letwash platform, you agree to be bound by these Terms of Service
                      and all applicable laws and regulations. If you do not agree with any of these terms, you are
                      prohibited from using or accessing this platform.
                    </p>
                    
                    <p className="font-semibold mt-4">2. Use License</p>
                    <p>
                      Permission is granted to temporarily use the Letwash platform for personal, non-commercial
                      transitory viewing only. This is the grant of a license, not a transfer of title.
                    </p>
                    
                    <p className="font-semibold mt-4">3. Service Availability</p>
                    <p>
                      We strive to maintain the highest level of service availability. However, we do not guarantee
                      uninterrupted access and reserve the right to modify or discontinue services without notice.
                    </p>
                    
                    <p className="font-semibold mt-4">4. Account Responsibilities</p>
                    <p>
                      You are responsible for maintaining the confidentiality of your account credentials and for all
                      activities that occur under your account. You must notify us immediately of any unauthorized use.
                    </p>
                    
                    <p className="font-semibold mt-4">5. Limitation of Liability</p>
                    <p>
                      Letwash shall not be liable for any damages arising from the use or inability to use the platform,
                      including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                    </p>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={agreements.privacy}
                onCheckedChange={() => handleToggle("privacy")}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor="privacy"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Privacy Policy
                </label>
                <ScrollArea className="h-32 w-full border rounded-lg mt-2 p-3 bg-gray-50">
                  <div className="text-xs text-gray-600 space-y-2">
                    <p className="font-semibold">LETWASH PRIVACY POLICY</p>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <p className="font-semibold mt-4">1. Information We Collect</p>
                    <p>
                      We collect information that you provide directly to us, including name, email address, phone
                      number, business information, and payment details. We also automatically collect usage data,
                      device information, and cookies.
                    </p>
                    
                    <p className="font-semibold mt-4">2. How We Use Your Information</p>
                    <p>
                      We use your information to provide, maintain, and improve our services, process transactions,
                      send you technical notices and support messages, and communicate with you about products,
                      services, and promotional offers.
                    </p>
                    
                    <p className="font-semibold mt-4">3. Information Sharing</p>
                    <p>
                      We do not sell your personal information. We may share your information with service providers,
                      business partners, and when required by law. All third parties are required to maintain the
                      confidentiality of your information.
                    </p>
                    
                    <p className="font-semibold mt-4">4. Data Security</p>
                    <p>
                      We implement appropriate technical and organizational measures to protect your personal data
                      against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    
                    <p className="font-semibold mt-4">5. Your Rights</p>
                    <p>
                      You have the right to access, correct, delete, or export your personal data. You may also
                      object to processing or request restriction of processing of your personal data.
                    </p>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>

          {/* Transaction Agreement */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="transaction"
                checked={agreements.transaction}
                onCheckedChange={() => handleToggle("transaction")}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor="transaction"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Transaction Agreement
                </label>
                <ScrollArea className="h-32 w-full border rounded-lg mt-2 p-3 bg-gray-50">
                  <div className="text-xs text-gray-600 space-y-2">
                    <p className="font-semibold">LETWASH TRANSACTION AGREEMENT</p>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <p className="font-semibold mt-4">1. Payment Processing</p>
                    <p>
                      All payments are processed securely through Stripe. Letwash does not store your full credit
                      card information. By accepting this agreement, you authorize us to charge your payment method
                      for all applicable fees.
                    </p>
                    
                    <p className="font-semibold mt-4">2. Commission Structure</p>
                    <p>
                      Letwash charges a commission on each transaction processed through the platform. The commission
                      rate depends on your subscription tier: Starter (15%), Professional (10%), or Enterprise (7.5%).
                      Commissions are automatically deducted from each transaction.
                    </p>
                    
                    <p className="font-semibold mt-4">3. Subscription Fees</p>
                    <p>
                      Subscription fees are billed monthly or annually based on your chosen plan. All fees are
                      non-refundable except as required by law. You may cancel your subscription at any time, with
                      cancellation effective at the end of the current billing period.
                    </p>
                    
                    <p className="font-semibold mt-4">4. Refund Policy</p>
                    <p>
                      Customer refunds must be processed through the platform within 30 days of the original
                      transaction. Commission fees on refunded transactions will be credited to your account.
                    </p>
                    
                    <p className="font-semibold mt-4">5. Payout Schedule</p>
                    <p>
                      Payouts are processed automatically based on your Stripe account settings. Standard payout
                      timing is 2-7 business days after the transaction. You are responsible for providing accurate
                      banking information for payouts.
                    </p>
                    
                    <p className="font-semibold mt-4">6. Tax Compliance</p>
                    <p>
                      You are responsible for all applicable taxes related to your use of the platform and the
                      services you provide. Letwash is not responsible for collecting, reporting, or remitting
                      any taxes on your behalf.
                    </p>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>

          {/* Summary */}
          {allAgreed && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="text-sm text-green-700">
                All agreements accepted. You can now continue to set up your account.
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!allAgreed || isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Accept & Continue"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
