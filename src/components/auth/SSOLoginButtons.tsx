import React from 'react';
import { Button } from '../ui/button';

interface SSOLoginButtonsProps {
  apiUrl?: string;
  onLoading?: (loading: boolean) => void;
  onLogin?: (email: string, password: string, provider?: string) => void;
}

export function SSOLoginButtons({ 
  apiUrl = 'http://localhost:5000/api/v1',
  onLoading,
  onLogin
}: SSOLoginButtonsProps) {
  
  const handleSSOLogin = (provider: string) => {
    onLoading?.(true);
    
    // If onLogin callback is provided, use it (for demo mode)
    if (onLogin) {
      // Demo mode: instant login
      setTimeout(() => {
        onLogin(`demo-${provider}@letwash.com`, '', provider);
        onLoading?.(false);
      }, 500);
    } else {
      // Production mode: redirect to OAuth provider
      window.location.href = `${apiUrl}/sso/${provider}`;
    }
  };

  return (
    <div className="space-y-3">
      {/* Google Sign In */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-11 flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-50"
        onClick={() => handleSSOLogin('google')}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
          <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
          <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
          <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
        </svg>
        <span>Continue with Google</span>
      </Button>

      {/* Apple Sign In */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-11 flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-50"
        onClick={() => handleSSOLogin('apple')}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15.894 17.343c-.82 1.088-1.72 2.157-3.096 2.157-1.377 0-1.808-.82-3.373-.82-1.565 0-2.056.82-3.353.82-1.297 0-2.197-1.069-3.096-2.157C1.617 15.046.5 11.633.5 8.46c0-4.612 3.013-7.066 5.966-7.066 1.577 0 2.896.99 3.889.99.993 0 2.536-1.05 4.28-1.05.728 0 3.343.073 4.925 2.775-.127.08-2.94 1.716-2.94 5.101 0 3.808 3.343 5.124 3.403 5.144-.02.06-.533 1.829-1.758 3.625-.97 1.433-1.98 2.857-3.37 2.857zM13.5 4.773C14.33 3.743 14.89 2.29 14.89.997c-1.297.06-2.856.87-3.787 1.96-.83.97-1.557 2.523-1.364 4.015 1.446.113 2.916-.733 3.76-2.198z" fill="currentColor"/>
        </svg>
        <span>Continue with Apple</span>
      </Button>

      {/* Microsoft Sign In */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-11 flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-50"
        onClick={() => handleSSOLogin('microsoft')}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M0 0h9.5v9.5H0V0z" fill="#F25022"/>
          <path d="M10.5 0H20v9.5h-9.5V0z" fill="#7FBA00"/>
          <path d="M0 10.5h9.5V20H0v-9.5z" fill="#00A4EF"/>
          <path d="M10.5 10.5H20V20h-9.5v-9.5z" fill="#FFB900"/>
        </svg>
        <span>Continue with Microsoft</span>
      </Button>
    </div>
  );
}