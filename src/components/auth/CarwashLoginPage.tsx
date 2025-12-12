"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Separator } from "../ui/separator";
import { Eye, EyeOff, Building2, ArrowLeft } from "lucide-react";
import { SSOLoginButtons } from "./SSOLoginButtons";

interface CarwashLoginPageProps {
  onLogin: (email: string, password: string, provider?: string) => void;
  onNavigateToRegister?: () => void;
  onBack: () => void;
  error?: string;
  title?: string;
  subtitle?: string;
  enableSSO?: boolean;
}

export function CarwashLoginPage({ onLogin, onNavigateToRegister, onBack, error, title = "Carwash Center", subtitle = "Sign in to your management dashboard", enableSSO = false }: CarwashLoginPageProps) {
  // Auto-fill credentials based on login type
  const isRootOwnerLogin = title.includes("ROOT OWNER");
  const isOwnerLogin = title.includes("Owner") && !isRootOwnerLogin;
  
  const defaultEmail = isRootOwnerLogin 
    ? "root@letwash.com" 
    : isOwnerLogin 
      ? "owner@autowash.com" 
      : "admin@autowash.com";
  const defaultPassword = isRootOwnerLogin 
    ? "root123" 
    : isOwnerLogin 
      ? "owner123" 
      : "admin123";
  
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center p-4 relative">
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
          <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
            <Building2 size={32} className="text-white" />
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            let<span className="text-blue-200 dark:text-blue-300">wash</span>
          </div>
          <h1 className="text-xl text-white/90 mb-2">{title}</h1>
          <p className="text-blue-200 dark:text-blue-300">{subtitle}</p>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* ROOT OWNER Test Credentials Display */}
          {isRootOwnerLogin && (
            <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-sm font-medium text-purple-900">Root Entrance</span>
              </div>
              <div className="space-y-1 text-xs text-purple-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <code className="bg-purple-100 px-2 py-0.5 rounded">root@letwash.com</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Password:</span>
                  <code className="bg-purple-100 px-2 py-0.5 rounded">root123</code>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="carwash-email">Email Address</Label>
              <Input
                id="carwash-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carwash-password">Password</Label>
              <div className="relative">
                <Input
                  id="carwash-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input-background pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div className="text-right">
              <button type="button" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </button>
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {enableSSO && (
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
            </div>
          )}

          {enableSSO && (
            <SSOLoginButtons onLogin={onLogin} />
          )}

          {onNavigateToRegister && (
            <div className="mt-6 text-center">
              <span className="text-sm text-muted-foreground">Don't have an account? </span>
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Create Account
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}