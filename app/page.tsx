'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  // State management for form data
  const [email, setEmail] = useState('wrapcode.info@gmail.com');
  const [password, setPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with your actual API call
      // Example:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password, rememberMe }),
      // });
      //
      // const data = await response.json();
      //
      // if (!response.ok) {
      //   throw new Error(data.message || 'Login failed');
      // }
      //
      // Handle successful login
      // Store token in localStorage/cookies
      // router.push('/admin/dashboard');

      // Placeholder - replace with actual API call
      console.log('Login attempt:', { email, password, rememberMe });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Redirect to dashboard after successful login
      // router.push('/admin/dashboard');
      
      alert('Login successful! Redirect to dashboard after implementing API.');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
    alert(`Social login with ${provider} - implement this feature`);
  };

  return (
    <main className="auth-cover-wrapper">
      <div className="auth-cover-content-inner">
        <div className="auth-cover-content-wrapper">
          <div className="auth-img">
            <img 
              src="/assets/images/auth/auth-cover-login-bg.svg" 
              alt="Login Background" 
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
            
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>
            <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            <p className="fs-12 fw-medium text-muted">
              Thank you for get back <strong>Nelel</strong> web applications, 
              let's access our the best recommendation for you.
            </p>
            
            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email or Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label 
                      className="custom-control-label c-pointer" 
                      htmlFor="rememberMe"
                    >
                      Remember Me
                    </label>
                  </div>
                </div>
                <div>
                  <a 
                    href="/forgot-password" 
                    className="fs-11 text-primary"
                  >
                    Forget password?
                  </a>
                </div>
              </div>
              
              <div className="mt-5">
                <button 
                  type="submit" 
                  className="btn btn-lg btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  ) : null}
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
            
            <div className="w-100 mt-5 text-center mx-auto">
              <div className="mb-4 border-bottom position-relative">
                <span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">
                  or
                </span>
              </div>
              
              <div className="d-flex align-items-center justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-light-brand flex-fill"
                  onClick={() => handleSocialLogin('Facebook')}
                  title="Login with Facebook"
                >
                  <i className="feather-facebook"></i>
                </button>
                
                <button
                  type="button"
                  className="btn btn-light-brand flex-fill"
                  onClick={() => handleSocialLogin('Twitter')}
                  title="Login with Twitter"
                >
                  <i className="feather-twitter"></i>
                </button>
                
                <button
                  type="button"
                  className="btn btn-light-brand flex-fill"
                  onClick={() => handleSocialLogin('Github')}
                  title="Login with Github"
                >
                  <i className="feather-github text"></i>
                </button>
              </div>
            </div>
            
            {/* Removed registration link as per your request */}
          </div>
        </div>
      </div>
    </main>
  );
}