'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get token from URL params (if sent via email link)
  const token = searchParams.get('token');
  
  // State management
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password validation
  const validatePasswords = (): boolean => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields');
      return false;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    // Check for at least one uppercase, one lowercase, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate passwords
    if (!validatePasswords()) {
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with your actual API call
      // Example:
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ 
      //     token, 
      //     newPassword 
      //   }),
      // });
      //
      // const data = await response.json();
      //
      // if (!response.ok) {
      //   throw new Error(data.message || 'Failed to reset password');
      // }
      //
      // Handle successful password reset
      // Show success message
      // Redirect to login after a delay

      // Placeholder - replace with actual API call
      console.log('Password reset attempt:', { token, newPassword });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set success state
      setSuccess(true);
      
      // TODO: Redirect to login after success
      // setTimeout(() => router.push('/admin/login'), 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back to login
  const handleBackToLogin = () => {
    router.push('/admin/login');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Get password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[@$!%*?&]/.test(password)) strength += 25;
    
    if (strength <= 25) return { strength, label: 'Weak', color: 'text-danger' };
    if (strength <= 50) return { strength, label: 'Fair', color: 'text-warning' };
    if (strength <= 75) return { strength, label: 'Good', color: 'text-info' };
    return { strength, label: 'Strong', color: 'text-success' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <main className="auth-cover-wrapper">
      <div className="auth-cover-content-inner">
        <div className="auth-cover-content-wrapper">
          <div className="auth-img">
            <img 
              src="/assets/images/auth/auth-cover-resetting-bg.svg" 
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
            
            <h2 className="fs-20 fw-bolder mb-4">Resetting</h2>
            <h4 className="fs-13 fw-bold mb-2">Reset your password</h4>
            <p className="fs-12 fw-medium text-muted">
              Create a new secure password for your account.
            </p>
            
            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success mb-3" role="alert">
                  <strong>Success!</strong> Your password has been reset successfully.
                  You can now login with your new password.
                </div>
              )}
              
              <div className="mb-4">
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    required
                    disabled={isLoading || success}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading || success}
                  >
                    <i className={showPassword ? 'feather-eye-off' : 'feather-eye'}></i>
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {newPassword && (
                  <div className="mt-2">
                    <div className="progress" style={{ height: '6px' }}>
                      <div
                        className={`progress-bar ${passwordStrength.color}`}
                        role="progressbar"
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                    <small className={`fw-medium ${passwordStrength.color} mt-1 d-block`}>
                      Password strength: {passwordStrength.label}
                    </small>
                  </div>
                )}
                
                {/* Password requirements */}
                <small className="text-muted d-block mt-2">
                  Password must be at least 8 characters with uppercase, lowercase, number, and special character
                </small>
              </div>
              
              <div className="mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error && newPassword === e.target.value) {
                      setError(null);
                    }
                  }}
                  required
                  disabled={isLoading || success}
                />
              </div>
              
              <div className="mt-5">
                <button 
                  type="submit" 
                  className="btn btn-lg btn-primary w-100"
                  disabled={isLoading || success || !newPassword || !confirmPassword}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  ) : null}
                  {isLoading ? 'Saving...' : 'Save Change'}
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
            
            {success && (
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="btn btn-primary"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ResettingPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}