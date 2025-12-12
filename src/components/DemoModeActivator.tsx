"use client";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sparkles, Eye } from "lucide-react";
import { SSOLoginButtons } from "./auth/SSOLoginButtons";

interface DemoModeActivatorProps {
  onActivate: () => void;
  onSSOLogin?: (email: string, password: string, provider?: string) => void;
}

export function DemoModeActivator({ onActivate, onSSOLogin }: DemoModeActivatorProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full border-4 border-white shadow-2xl">
        <CardContent className="p-12 text-center space-y-6">
          <div className="space-y-4">
            <div className="mx-auto size-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Sparkles size={48} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎉 Modern UX Architecture
            </h1>
            <p className="text-xl text-neutral-600">
              Ultra-modern dashboard hazır!
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl p-6 space-y-4 text-left">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Eye size={20} className="text-blue-600" />
              Yeni Özellikler:
            </h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 shrink-0">✓</span>
                <span><strong>Modern Sidebar</strong> - Task-centric navigation (Operations/Business/AI/Settings)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 shrink-0">✓</span>
                <span><strong>Today's Schedule Dashboard</strong> - Live operations, real-time updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 shrink-0">✓</span>
                <span><strong>Calendar + AI Suggestions</strong> - Hybrid view with smart campaigns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 shrink-0">✓</span>
                <span><strong>Live Operations</strong> - Bay/tunnel/staff tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 shrink-0">✓</span>
                <span><strong>Command Palette</strong> - Cmd+K power user tool</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 shrink-0">✓</span>
                <span><strong>Quick Actions Button</strong> - Floating FAB</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 shrink-0">✓</span>
                <span><strong>SSO Login</strong> - Google, Apple, Microsoft sign-in</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onActivate}
              size="lg"
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Eye size={20} className="mr-2" />
              Yeni Sistemi Gör! 🚀
            </Button>
            <p className="text-xs text-neutral-500">
              Demo user: <strong>demo@autowash.com</strong> | Pass: <strong>demo123</strong>
            </p>
          </div>

          {onSSOLogin && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-neutral-500">Or sign in with</span>
                </div>
              </div>

              <SSOLoginButtons onLogin={onSSOLogin} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}