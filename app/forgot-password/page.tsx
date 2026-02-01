'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  
  // State management
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic email validation
    if (!email.trim()) {
      setError('Please enter your email or username');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with your actual API call
      // Example:
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email }),
      // });
      //
      // const data = await response.json();
      //
      // if (!response.ok) {
      //   throw new Error(data.message || 'Failed to send reset link');
      // }
      //
      // Handle successful request
      // Show success message to user

      // Placeholder - replace with actual API call
      console.log('Password reset request:', { email });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set success state
      setSuccess(true);
      
      // TODO: Optionally redirect after success
      // setTimeout(() => router.push('/admin/login'), 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back to login
  const handleBackToLogin = () => {
    router.push('/admin/login');
  };

  return (
    <main className="auth-cover-wrapper">
      <div className="auth-cover-content-inner">
        <div className="auth-cover-content-wrapper">
          <div className="auth-img">
            <img 
              src="/assets/images/auth/auth-cover-reset-bg.svg" 
              alt="Reset Password Background" 
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      
      <div className="auth-cover-sidebar-inner">
        <div className="auth-cover-card-wrapper">
          <div className="auth-cover-card p-sm-5">
            <div className="wd-50 mb-5">
              <img 
                src="/assets/images/logo-abbr.png" 
                alt="Logo" 
                className="img-fluid"
              />
            </div>
            
            <h2 className="fs-20 fw-bolder mb-4">Reset</h2>
            <h4 className="fs-13 fw-bold mb-2">Reset to your username/password</h4>
            <p className="fs-12 fw-medium text-muted">
              Enter your email and a reset link will sent to you, let's access our the best recommendation for you.
            </p>
            
            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success mb-3" role="alert">
                  <strong>Success!</strong> A password reset link has been sent to your email.
                  Please check your inbox and spam folder.
                </div>
              )}
              
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email or Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading || success}
                />
              </div>
              
              <div className="mt-5">
                <button 
                  type="submit" 
                  className="btn btn-lg btn-primary w-100"
                  disabled={isLoading || success || !email.trim()}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  ) : null}
                  {isLoading ? 'Sending...' : 'Reset Now'}
                </button>
              </div>
            </form>
            
            {!success && (
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="btn btn-link text-muted p-0"
                >
                  ← Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}