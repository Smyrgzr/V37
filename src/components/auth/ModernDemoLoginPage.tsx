"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Sparkles, Eye, ArrowLeft } from "lucide-react";
import { SSOLoginButtons } from "./SSOLoginButtons";

interface ModernDemoLoginPageProps {
  onQuickDemo: () => void;
  onSSOLogin: (email: string, password: string, provider?: string) => void;
  onBack: () => void;
}

export function ModernDemoLoginPage({ onQuickDemo, onSSOLogin, onBack }: ModernDemoLoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSSOLogin = (email: string, password: string, provider?: string) => {
    setIsLoading(true);
    onSSOLogin(email, password, provider);
    // Loading will be handled by parent
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-4 relative">
      {/* Header */}
      <div className="w-full max-w-md mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to login options
        </button>

        <div className="text-center">
          <div className="mx-auto size-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
            <Sparkles size={40} className="text-white" />
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            let<span className="text-blue-200">wash</span>
          </div>
          <h1 className="text-2xl text-white/90 mb-2">🚀 Modern UX Demo</h1>
          <p className="text-blue-200">Experience the future of car wash management</p>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md border-4 border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Entry
          </CardTitle>
          <CardDescription>
            Try the demo instantly or sign in with your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Demo Button */}
          <div className="space-y-3">
            <Button
              onClick={onQuickDemo}
              size="lg"
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              <Eye size={20} className="mr-2" />
              Quick Demo Access
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              No registration required • Full feature access
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or sign in with</span>
            </div>
          </div>

          {/* SSO Buttons */}
          <SSOLoginButtons 
            onLogin={handleSSOLogin}
            onLoading={setIsLoading}
          />

          {/* Features List */}
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <h4 className="text-sm font-semibold mb-3 text-gray-700">
              ✨ What's included:
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                Modern dashboard with real-time operations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">•</span>
                AI-powered insights & suggestions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                6 business module support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-600">•</span>
                Command palette (Cmd+K)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-600">•</span>
                Mobile-optimized interface
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-white/80 text-sm">
        <p>© 2024 Letwash. All rights reserved.</p>
      </div>
    </div>
  );
}
