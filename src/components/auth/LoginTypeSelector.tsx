"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Shield, Building2, Sparkles } from "lucide-react";

interface LoginTypeSelectorProps {
  onSelectType: (type: "carwash-owner" | "root-owner" | "modern-demo") => void;
}

export function LoginTypeSelector({ onSelectType }: LoginTypeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center p-4 relative">
      {/* Header with Logo */}
      <div className="text-center mb-8">
        <div className="text-5xl font-bold text-white mb-4">
          let<span className="text-blue-200">wash</span>
        </div>
        <h1 className="text-xl text-white/90 mb-2">Welcome Back</h1>
        <p className="text-blue-200">Choose your access type to continue</p>
      </div>

      {/* Login Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* 🚀 MODERN UX DEMO Card */}
        <Card className="border border-gray-200 hover:shadow-lg transition-all cursor-pointer bg-white" onClick={() => onSelectType("modern-demo")}>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Sparkles size={32} className="text-gray-700" />
            </div>
            <CardTitle className="text-xl">
              🚀 Try Modern UX Demo
            </CardTitle>
            <CardDescription>
              Experience the new ultra-modern dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>• Today's Schedule & Live Operations</li>
              <li>• AI-powered suggestions</li>
              <li>• Command Palette (Cmd+K)</li>
              <li>• 6 Business Module support</li>
              <li>• Advanced analytics & insights</li>
            </ul>
            <Button className="w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50">
              Launch Demo
            </Button>
          </CardContent>
        </Card>

        {/* ROOT OWNER Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-purple-300" onClick={() => onSelectType("root-owner")}>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Shield size={32} className="text-purple-600" />
            </div>
            <CardTitle className="text-xl">ROOT OWNER</CardTitle>
            <CardDescription>
              Platform-level full system access
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>• Create standard services</li>
              <li>• Manage all carwash centers</li>
              <li>• View all system data</li>
              <li>• Platform-wide analytics</li>
              <li>• Complete system control</li>
            </ul>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Continue as ROOT OWNER
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-blue-200 dark:text-blue-300 text-sm">
        <p>© 2024 Letwash. All rights reserved.</p>
      </div>
    </div>
  );
}