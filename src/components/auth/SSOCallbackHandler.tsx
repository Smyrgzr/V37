import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface SSOCallbackHandlerProps {
  onSuccess?: (token: string, refreshToken: string) => void;
  onError?: (error: string) => void;
  redirectTo?: string;
}

export function SSOCallbackHandler({ 
  onSuccess, 
  onError,
  redirectTo = '/dashboard' 
}: SSOCallbackHandlerProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refresh');
    const error = searchParams.get('error');

    if (error) {
      const errorMsg = error === 'oauth_failed' 
        ? 'Authentication failed. Please try again.' 
        : 'An error occurred during authentication.';
      
      setStatus('error');
      setErrorMessage(errorMsg);
      onError?.(errorMsg);
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      return;
    }

    if (token && refreshToken) {
      // Save tokens to localStorage
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      setStatus('success');
      onSuccess?.(token, refreshToken);

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate(redirectTo);
      }, 1500);
    } else {
      setStatus('error');
      setErrorMessage('Missing authentication tokens');
      onError?.('Missing authentication tokens');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [searchParams, navigate, onSuccess, onError, redirectTo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Authenticating...</h2>
            <p className="text-gray-600">Please wait while we complete your sign in</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Success!</h2>
            <p className="text-gray-600">Redirecting to dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </>
        )}
      </div>
    </div>
  );
}
