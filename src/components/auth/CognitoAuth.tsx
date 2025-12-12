import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface CognitoAuthProps {
  apiUrl?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

type AuthView = 'signin' | 'signup' | 'confirm' | 'forgot' | 'reset';

export function CognitoAuth({ 
  apiUrl = 'http://localhost:5000/api/v1',
  onSuccess,
  onError 
}: CognitoAuthProps) {
  const [view, setView] = useState<AuthView>('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleRequest = async (endpoint: string, body: any) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${apiUrl}/sso/cognito/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (err: any) {
      const errorMsg = err.message || 'An error occurred';
      setError(errorMsg);
      onError?.(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleRequest('signup', { email, password, fullName, phone });
      setSuccess('Verification code sent to your email');
      setView('confirm');
    } catch (err) {
      // Error handled in handleRequest
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleRequest('confirm', { email, code });
      setSuccess('Email verified! You can now sign in.');
      setTimeout(() => setView('signin'), 2000);
    } catch (err) {
      // Error handled in handleRequest
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await handleRequest('signin', { email, password });
      
      // Save tokens
      if (data.data.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        
        setSuccess('Login successful!');
        onSuccess?.(data.data);
      }
    } catch (err) {
      // Error handled in handleRequest
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleRequest('forgot-password', { email });
      setSuccess('Verification code sent to your email');
      setView('reset');
    } catch (err) {
      // Error handled in handleRequest
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleRequest('reset-password', { email, code, newPassword });
      setSuccess('Password reset successful! You can now sign in.');
      setTimeout(() => setView('signin'), 2000);
    } catch (err) {
      // Error handled in handleRequest
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 text-green-700 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Sign In */}
      {view === 'signin' && (
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with AWS Cognito
          </Button>

          <div className="text-center text-sm space-y-2">
            <button
              type="button"
              onClick={() => setView('forgot')}
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
            <div>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setView('signup')}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Sign Up */}
      {view === 'signup' && (
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setView('signin')}
              className="text-blue-600 hover:underline"
            >
              Sign in
            </button>
          </div>
        </form>
      )}

      {/* Confirm Email */}
      {view === 'confirm' && (
        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={6}
              placeholder="123456"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Check your email for the verification code
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Email
          </Button>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setView('signin')}
              className="text-blue-600 hover:underline"
            >
              Back to sign in
            </button>
          </div>
        </form>
      )}

      {/* Forgot Password */}
      {view === 'forgot' && (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Code
          </Button>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setView('signin')}
              className="text-blue-600 hover:underline"
            >
              Back to sign in
            </button>
          </div>
        </form>
      )}

      {/* Reset Password */}
      {view === 'reset' && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={6}
              placeholder="123456"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
          </Button>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setView('signin')}
              className="text-blue-600 hover:underline"
            >
              Back to sign in
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
