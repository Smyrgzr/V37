"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Eye, EyeOff, Shield, ArrowLeft } from "lucide-react";

interface AdminLoginPageProps {
  onLogin: (email: string, password: string) => void;
  onBack: () => void;
  error?: string;
}

export function AdminLoginPage({ onLogin, onBack, error }: AdminLoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center p-4">
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
            <Shield size={32} className="text-white" />
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            let<span className="text-blue-200">wash</span>
          </div>
          <h1 className="text-xl text-white/90 mb-2">Admin Access</h1>
          <p className="text-blue-200">Sign in to the administration panel</p>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Enter your administrator credentials</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@letwash.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your admin password"
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
            
            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Admin Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Enhanced security login for platform administrators
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}