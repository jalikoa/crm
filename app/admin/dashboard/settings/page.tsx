'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Type definitions
interface SettingsData {
  logo: string | null;
  companyName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  tinNumber: string;
  domain: string;
  allowedFileTypes: string;
  direction: 'LRT' | 'RTL';
  information: string;
}

interface SettingsMenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export default function SettingsGeneralPage() {
  const router = useRouter();
  
  // State management
  const [settings, setSettings] = useState<SettingsData>({
    logo: '/assets/images/logo-abbr.png',
    companyName: 'theme_ocean',
    address: '708 Heavner Court',
    city: 'Levittown',
    state: 'NY 11756',
    zipCode: '11756',
    phone: '+1 (375) 2589 654',
    tinNumber: '987-6985-9658-654',
    domain: 'https://themewagon.com',
    allowedFileTypes: '.png,.jpg,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.txt',
    direction: 'LRT',
    information: `{company_name}
{address}
{city} {state}
{country_code} {zip_code}
{vat_number_with_label}`,
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings menu items
  const menuItems: SettingsMenuItem[] = [
    { id: 'general', label: 'General', icon: 'feather-airplay', href: '/admin/dashboard/settings/general' },
    { id: 'seo', label: 'SEO', icon: 'feather-search', href: '/admin/dashboard/settings/seo' },
    { id: 'tags', label: 'Tags', icon: 'feather-tag', href: '/admin/dashboard/settings/tags' },
    { id: 'email', label: 'Email', icon: 'feather-mail', href: '/admin/dashboard/settings/email' },
    { id: 'tasks', label: 'Tasks', icon: 'feather-check-circle', href: '/admin/dashboard/settings/tasks' },
    { id: 'leads', label: 'Leads', icon: 'feather-crosshair', href: '/admin/dashboard/settings/leads' },
    { id: 'support', label: 'Support', icon: 'feather-life-buoy', href: '/admin/dashboard/settings/support' },
    { id: 'finance', label: 'Finance', icon: 'feather-dollar-sign', href: '/admin/dashboard/settings/finance' },
    { id: 'gateways', label: 'Gateways', icon: 'feather-git-branch', href: '/admin/dashboard/settings/gateways' },
    { id: 'customers', label: 'Customers', icon: 'feather-users', href: '/admin/dashboard/settings/customers' },
    { id: 'localization', label: 'Localization', icon: 'feather-globe', href: '/admin/dashboard/settings/localization' },
    { id: 'recaptcha', label: 'reCaptcha', icon: 'feather-shield', href: '/admin/dashboard/settings/recaptcha' },
    { id: 'miscellaneous', label: 'Miscellaneous', icon: 'feather-cast', href: '/admin/dashboard/settings/miscellaneous' },
  ];

  // Handle input change
  const handleInputChange = (field: keyof SettingsData, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  // Handle radio change
  const handleRadioChange = (field: keyof SettingsData, value: 'LRT' | 'RTL') => {
    setSettings(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = settings.allowedFileTypes.split(',').map(type => type.trim());
      const fileType = `.${file.name.split('.').pop()}`;
      
      if (!allowedTypes.includes(fileType)) {
        setError(`File type ${fileType} is not allowed. Allowed types: ${settings.allowedFileTypes}`);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, logo: reader.result as string }));
        if (error) setError(null);
        if (success) setSuccess(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!settings.companyName.trim()) {
      setError('Company name is required');
      setIsLoading(false);
      return;
    }

    if (!settings.domain.trim()) {
      setError('Domain is required');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with your actual API call
      // Example:
      // const response = await fetch('/api/settings/general', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(settings),
      // });
      //
      // const data = await response.json();
      //
      // if (!response.ok) {
      //   throw new Error(data.message || 'Failed to save settings');
      // }

      // Placeholder - replace with actual API call
      console.log('Saving settings:', settings);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset to initial values or navigate back
    router.back();
  };

  // Handle menu item click
  const handleMenuItemClick = (href: string) => {
    router.push(href);
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="nxl-container">
      <div className="nxl-content">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-left d-flex align-items-center">
            <div className="page-header-title">
              <h5 className="m-b-10">Settings</h5>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
              <li className="breadcrumb-item">Settings</li>
              <li className="breadcrumb-item">General</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content d-flex">
          {/* Content Sidebar */}
          <div 
            className={`content-sidebar content-sidebar-md ${isSidebarOpen ? '' : 'collapsed'}`} 
            data-scrollbar-target="#psScrollbarInit"
          >
            <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
              <h4 className="fw-bolder mb-0">Settings</h4>
              <button 
                type="button" 
                className="app-sidebar-close-trigger d-flex d-md-none"
                onClick={toggleSidebar}
              >
                <i className="feather-x"></i>
              </button>
            </div>
            <div className="content-sidebar-body">
              <ul className="nav flex-column nxl-content-sidebar-item">
                {menuItems.map((item) => (
                  <li key={item.id} className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${item.id === 'general' ? 'active' : ''}`}
                      onClick={() => handleMenuItemClick(item.href)}
                    >
                      <i className={item.icon}></i>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Area */}
          <div className="content-area flex-grow-1" data-scrollbar-target="#psScrollbarInit">
            <div className="content-area-header bg-white sticky-top">
              <div className="page-header-left">
                <button 
                  type="button" 
                  className="app-sidebar-open-trigger me-2 d-md-none"
                  onClick={toggleSidebar}
                >
                  <i className="feather-align-left fs-24"></i>
                </button>
              </div>
              <div className="page-header-right ms-auto">
                <div className="d-flex align-items-center gap-3 page-header-right-items-wrapper">
                  <button 
                    type="button" 
                    className="text-danger btn btn-link p-0"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                    ) : (
                      <i className="feather-save me-2"></i>
                    )}
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="content-area-body">
              <div className="card mb-0">
                <div className="card-body">
                  {/* Logo Upload */}
                  <div className="mb-5">
                    <label className="form-label fw-bold mb-3">Company Logo</label>
                    <div className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded">
                      <img 
                        src={settings.logo || '/assets/images/logo-abbr.png'} 
                        className="upload-pic img-fluid rounded h-100 w-100 object-fit-cover" 
                        alt="Company Logo" 
                      />
                      <div 
                        className="position-absolute start-50 top-50 end-0 bottom-0 translate-middle h-100 w-100 hstack align-items-center justify-content-center c-pointer upload-button"
                        onClick={handleLogoClick}
                      >
                        <i className="feather feather-camera fs-24" aria-hidden="true"></i>
                      </div>
                      <input
                        ref={fileInputRef}
                        className="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <small className="form-text text-muted mt-2">
                      Click on the logo to upload a new image. Max size: 5MB
                    </small>
                  </div>

                  {/* Company Name */}
                  <div className="mb-5">
                    <label htmlFor="companyName" className="form-label fw-bold">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="companyName"
                      placeholder="Company Name"
                      value={settings.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                    <small className="form-text text-muted">
                      Your company name [Ex: theme_ocean]
                    </small>
                  </div>

                  {/* Address */}
                  <div className="mb-5">
                    <label htmlFor="address" className="form-label fw-bold">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Company Address"
                      value={settings.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                    <small className="form-text text-muted">
                      Your company address [Ex: 708 Heavner Court]
                    </small>
                  </div>

                  {/* City */}
                  <div className="mb-5">
                    <label htmlFor="city" className="form-label fw-bold">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Company City"
                      value={settings.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                    <small className="form-text text-muted">
                      Your company city [Ex: Levittown]
                    </small>
                  </div>

                  {/* State */}
                  <div className="mb-5">
                    <label htmlFor="state" className="form-label fw-bold">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="Company State"
                      value={settings.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                    <small className="form-text text-muted">
                      Your company state [Ex: NY 11756]
                    </small>
                  </div>

                  {/* Zip Code */}
                  <div className="mb-5">
                    <label htmlFor="zipCode" className="form-label fw-bold">
                      Zip
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="zipCode"
                      placeholder="Zip Code"
                      value={settings.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    />
                    <small className="form-text text-muted">
                      Zip Code [Ex: 11756]
                    </small>
                  </div>

                  {/* Phone */}
                  <div className="mb-5">
                    <label htmlFor="phone" className="form-label fw-bold">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="Phone"
                      value={settings.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    <small className="form-text text-muted">
                      Phone [Ex: +1 (375) 2589 654]
                    </small>
                  </div>

                  {/* TIN Number */}
                  <div className="mb-5">
                    <label htmlFor="tinNumber" className="form-label fw-bold">
                      TIN Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tinNumber"
                      placeholder="TIN Number"
                      value={settings.tinNumber}
                      onChange={(e) => handleInputChange('tinNumber', e.target.value)}
                    />
                    <small className="form-text text-muted">
                      TIN Number [Ex: 987-6985-9658-654]
                    </small>
                  </div>

                  {/* Domain */}
                  <div className="mb-5">
                    <label htmlFor="domain" className="form-label fw-bold">
                      Domain <span className="text-danger">*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="domain"
                      placeholder="Company Main Domain"
                      value={settings.domain}
                      onChange={(e) => handleInputChange('domain', e.target.value)}
                    />
                    <small className="form-text text-muted">
                      Company main domain [Ex: https://themewagon.com]
                    </small>
                  </div>

                  {/* Allowed File Types */}
                  <div className="mb-5">
                    <label htmlFor="allowedFileTypes" className="form-label fw-bold">
                      Allowed File Types
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="allowedFileTypes"
                      placeholder="Allowed file types"
                      value={settings.allowedFileTypes}
                      onChange={(e) => handleInputChange('allowedFileTypes', e.target.value)}
                    />
                    <small className="form-text text-muted">
                      Allowed file types [Ex: .png,.jpg,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.txt]
                    </small>
                  </div>

                  {/* Direction */}
                  <div className="mb-5">
                    <label className="form-label fw-bold">Direction</label>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="site-direction"
                        id="LRTdirection"
                        checked={settings.direction === 'LRT'}
                        onChange={() => handleRadioChange('direction', 'LRT')}
                      />
                      <label className="form-check-label" htmlFor="LRTdirection">
                        LRT Direction (Left to Right)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="site-direction"
                        id="RTLdirection"
                        checked={settings.direction === 'RTL'}
                        onChange={() => handleRadioChange('direction', 'RTL')}
                      />
                      <label className="form-check-label" htmlFor="RTLdirection">
                        RTL Direction (Right to Left)
                      </label>
                    </div>
                  </div>

                  {/* Information */}
                  <div className="mb-0">
                    <label htmlFor="information" className="form-label fw-bold">
                      Information (PDF and HTML)
                    </label>
                    <textarea
                      className="form-control"
                      id="information"
                      cols={30}
                      rows={10}
                      placeholder={`{company_name}
                        {address}
                        {city} {state}
                        {country_code} {zip_code}
                        {vat_number_with_label}`}
                      value={settings.information}
                      onChange={(e) => handleInputChange('information', e.target.value)}
                    ></textarea>
                    <small className="form-text text-muted">
                      Company Information Format [Ex: {'{company_name} {address}, {city}, {state}, {zip_code}, {country_code}, {phone}, {vat_number}, {vat_number_with_label}'}]
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success/Error Alerts */}
        {success && (
          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Success!</strong> Settings saved successfully.
              <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
            </div>
          </div>
        )}

        {error && (
          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error!</strong> {error}
              <button type="button" className="btn-close" onClick={() => setError(null)}></button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}