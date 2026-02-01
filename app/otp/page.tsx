'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
function VerifyyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const identifier = searchParams.get('identifier') || '';
  
  // State management
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCount, setResendCount] = useState(1);
  const [maxResends] = useState(3);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(30);
  const [phone, setPhone] = useState('*******9897'); // Masked phone number

  // Refs for input fields
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Timer for resend cooldown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (!canResend && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      setTimer(30);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [canResend, timer]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Allow only single digit or empty
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input if value is entered
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    
    // Prevent non-numeric input
    if (e.key !== 'Backspace' && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Handle paste in first input
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const digits = paste.match(/\d/g) || [];
    
    if (digits.length >= 6) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = digits[i] || '';
      }
      setOtp(newOtp);
      
      // Focus last input
      inputRefs[5].current?.focus();
    }
  };

  // Validate OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate all fields are filled
    if (otp.some(digit => !digit)) {
      setError('Please enter all 6 digits');
      setIsLoading(false);
      return;
    }

    const otpCode = otp.join('');

    try {
      // TODO: Replace with your actual API call
      // Example:
      // const response = await fetch('/api/auth/verify-otp', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ otp: otpCode, identifier: identifier }),
      // });
      //
      // const data = await response.json();
      //
      // if (!response.ok) {
      //   throw new Error(data.message || 'Verification failed');
      // }
      //
      // Handle successful verification
      // router.push('/admin/dashboard');

      // Placeholder - replace with actual API call
      console.log('OTP verification attempt:', { otp: otpCode, identifier: identifier });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Redirect to dashboard after successful verification
      // router.push('/admin/dashboard');
      
      alert('OTP verified successfully! Redirect to dashboard after implementing API.');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs[0].current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP code
  const handleResend = async () => {
    if (!canResend) {
      setError(`Please wait ${timer} seconds before resending`);
      return;
    }

    if (resendCount >= maxResends) {
      setError('Maximum resend attempts reached. Please try again later.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with your actual API call
      // Example:
      // const response = await fetch('/api/auth/resend-otp', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ identifier: identifier }),
      // });
      //
      // const data = await response.json();
      //
      // if (!response.ok) {
      //   throw new Error(data.message || 'Failed to resend code');
      // }

      // Placeholder - replace with actual API call
      console.log('Resending OTP code...', { identifier: identifier });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update resend count
      setResendCount(prev => prev + 1);
      setCanResend(false);
      
      // Clear OTP fields
      setOtp(['', '', '', '', '', '']);
      inputRefs[0].current?.focus();
      
      alert('OTP code resent successfully!');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  // Change verification method
  const handleChangeMethod = () => {
    // TODO: Implement change method logic
    // Could redirect to email verification or show modal with options
    console.log('Change verification method');
    alert('Change verification method - implement this feature');
  };

  // Get complete OTP code
  const getOtpCode = () => otp.join('');

  return (
    <main className="auth-cover-wrapper">
      <div className="auth-cover-content-inner">
        <div className="auth-cover-content-wrapper">
          <div className="auth-img">
            <img 
              src="/assets/images/auth/auth-cover-verify-bg.svg" 
              alt="Verification Background" 
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
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fs-20 fw-bolder mb-0">Verify</h2>
              <button
                type="button"
                onClick={handleChangeMethod}
                className="fs-12 text-primary btn btn-link p-0"
              >
                Change Method
              </button>
            </div>
            
            <h4 className="fs-13 fw-bold mb-2">
              Please enter the code generated one time password to verify your account.
            </h4>
            <p className="fs-12 fw-medium text-muted">
              <span>A code has been sent to</span> <strong>{phone}</strong>
            </p>
            
            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}
              
              <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    className="m-2 text-center form-control rounded"
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    autoFocus={index === 0}
                    required
                  />
                ))}
              </div>
              
              <div className="mt-5">
                <button 
                  type="submit" 
                  className="btn btn-lg btn-primary w-100"
                  disabled={isLoading || otp.some(d => !d)}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  ) : null}
                  {isLoading ? 'Validating...' : 'Validate'}
                </button>
              </div>
              
              <div className="mt-5 text-muted text-center">
                <span>Didn't get the code? </span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend || resendCount >= maxResends || isLoading}
                  className={`btn btn-link p-0 ${!canResend ? 'text-muted' : 'text-primary'}`}
                >
                  {canResend ? (
                    `Resend (${resendCount}/${maxResends})`
                  ) : (
                    `Wait ${timer}s`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyyPage />
    </Suspense>
  );
}