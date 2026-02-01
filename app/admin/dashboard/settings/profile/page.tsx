// app/patient/dashboard/profile/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { getInitials } from '@/utils/validators';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Kimani",
    email: "sarah.kimani@example.com",
    phone: "+254 700 000 000",
    gender: "Female",
    dob: "1990-05-15",
    address: "123 Health Street",
    city: "Nairobi",
    country: "Kenya",
    postalCode: "00100"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    // In real app: submit to API
  };

  const handleDeleteAccount = async () => {
    // Validate confirmation text
    if (deleteConfirmation !== 'DELETE') {
      alert('Please type "DELETE" exactly to confirm account deletion.');
      return;
    }

    setIsDeleting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real app, call API to delete account
    alert('Account deletion request submitted. Your account will be permanently deleted within 30 days.');
    
    // Reset and close modal
    setIsDeleting(false);
    setShowDeleteModal(false);
    setDeleteConfirmation('');
    
    // In real app, redirect to logout or home page
    // window.location.href = '/';
  };

  const fullName = `${formData.firstName} ${formData.lastName}`;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-12">
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="mb-1">
                <i className="bx bx-user me-2"></i>
                Profile
              </h4>
              <p className="text-muted mb-0">Manage your personal information and account settings</p>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="btn btn-label-primary"
            >
              {editing ? (
                <>
                  <i className="bx bx-check me-2"></i>
                  Save Changes
                </>
              ) : (
                <>
                  <i className="bx bx-edit me-2"></i>
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="row">
            {/* Left Column - Profile Info */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              {/* Profile Card */}
              <div className="card">
                <div className="card-body text-center">
                  <div className="avatar avatar-xl mb-3 mx-auto">
                    <Avatar className="w-100 h-100 rounded-circle">
                      <AvatarImage src="/assets/img/person/person-f-7.webp" alt="Profile" className="rounded-circle" />
                      <AvatarFallback className="rounded-circle bg-label-primary d-flex align-items-center justify-content-center text-white" style={{ fontSize: '2.5rem' }}>
                        {getInitials(fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h4 className="mb-1">{fullName}</h4>
                  <p className="text-muted mb-3">Patient ID: #PAT-001</p>
                  {editing && (
                    <button className="btn btn-label-secondary btn-sm mb-3">
                      <i className="bx bx-camera me-1"></i>
                      Change Photo
                    </button>
                  )}
                  <hr className="my-3" />
                  <div className="text-start">
                    <div className="mb-2">
                      <small className="text-muted d-block">Email</small>
                      <span className="fw-semibold">{formData.email}</span>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted d-block">Phone</small>
                      <span className="fw-semibold">{formData.phone}</span>
                    </div>
                    <div>
                      <small className="text-muted d-block">Member Since</small>
                      <span className="fw-semibold">Jan 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bx bx-stats me-2"></i>
                    Profile Stats
                  </h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Appointments</span>
                    <span className="fw-semibold">12</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Lab Results</span>
                    <span className="fw-semibold">8</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Prescriptions</span>
                    <span className="fw-semibold">5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Forms */}
            <div className="col-lg-8">
              {/* Personal Information */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bx bx-user-circle me-2"></i>
                    Personal Information
                  </h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label htmlFor="firstName" className="form-label fw-semibold">
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-control"
                          value={formData.firstName}
                          onChange={handleChange}
                          disabled={!editing}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label fw-semibold">
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="form-control"
                          value={formData.lastName}
                          onChange={handleChange}
                          disabled={!editing}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label htmlFor="email" className="form-label fw-semibold">
                          <i className="bx bx-envelope me-1"></i>
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!editing}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label fw-semibold">
                          <i className="bx bx-phone me-1"></i>
                          Phone Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!editing}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label htmlFor="dob" className="form-label fw-semibold">
                          <i className="bx bx-calendar me-1"></i>
                          Date of Birth <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          className="form-control"
                          value={formData.dob}
                          onChange={handleChange}
                          disabled={!editing}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="gender" className="form-label fw-semibold">
                          <i className="bx bx-user me-1"></i>
                          Gender <span className="text-danger">*</span>
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          className="form-select"
                          value={formData.gender}
                          onChange={handleChange}
                          disabled={!editing}
                          required
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="address" className="form-label fw-semibold">
                        <i className="bx bx-map me-1"></i>
                        Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!editing}
                        required
                      />
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4 mb-3 mb-md-0">
                        <label htmlFor="city" className="form-label fw-semibold">
                          City <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="form-control"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={!editing}
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3 mb-md-0">
                        <label htmlFor="postalCode" className="form-label fw-semibold">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          className="form-control"
                          value={formData.postalCode}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="country" className="form-label fw-semibold">
                          Country <span className="text-danger">*</span>
                        </label>
                        <select
                          id="country"
                          name="country"
                          className="form-select"
                          value={formData.country}
                          onChange={handleChange}
                          disabled={!editing}
                          required
                        >
                          <option value="Kenya">Kenya</option>
                          <option value="Tanzania">Tanzania</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {editing && (
                      <div className="mt-4">
                        <button type="submit" className="btn btn-primary me-2">
                          <i className="bx bx-check me-1"></i>
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditing(false)}
                          className="btn btn-label-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Security Section */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bx bx-shield-alt-2 me-2"></i>
                    Security
                  </h5>
                </div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    <div className="list-group-item px-0 border-0 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm bg-label-primary me-3">
                          <i className="bx bx-lock text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Password</h6>
                          <small className="text-muted">Last updated 3 months ago</small>
                        </div>
                      </div>
                      <Link href="/patient/dashboard/profile/change-password" className="btn btn-label-primary btn-sm">
                        <i className="bx bx-edit me-1"></i>
                        Change
                      </Link>
                    </div>

                    <div className="list-group-item px-0 border-0 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm bg-label-success me-3">
                          <i className="bx bx-shield-alt-2 text-success"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Two-Factor Authentication</h6>
                          <small className="text-muted">Enabled for extra security</small>
                        </div>
                      </div>
                      <Link href="/patient/dashboard/settings#2fa" className="btn btn-label-success btn-sm">
                        <i className="bx bx-cog me-1"></i>
                        Manage
                      </Link>
                    </div>

                    <div className="list-group-item px-0 border-0 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm bg-label-info me-3">
                          <i className="bx bx-user text-info"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Privacy Settings</h6>
                          <small className="text-muted">Control your data visibility</small>
                        </div>
                      </div>
                      <Link href="/patient/dashboard/settings#privacy" className="btn btn-label-info btn-sm">
                        <i className="bx bx-show me-1"></i>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Account */}
              <div className="card border-danger">
                <div className="card-header bg-label-danger border-danger">
                  <h5 className="mb-0 text-danger">
                    <i className="bx bx-trash me-2"></i>
                    Delete Account
                  </h5>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-3">
                    Deleting your account will permanently remove all your data including:
                  </p>
                  <ul className="list-unstyled mb-3 ms-3">
                    <li className="mb-2">
                      <i className="bx bx-x-circle text-danger me-2"></i>
                      All appointment history
                    </li>
                    <li className="mb-2">
                      <i className="bx bx-x-circle text-danger me-2"></i>
                      Medical records and lab results
                    </li>
                    <li className="mb-2">
                      <i className="bx bx-x-circle text-danger me-2"></i>
                      Payment history and receipts
                    </li>
                    <li>
                      <i className="bx bx-x-circle text-danger me-2"></i>
                      All personal information
                    </li>
                  </ul>
                  <p className="text-danger fw-semibold mb-3">
                    <i className="bx bx-error-circle me-1"></i>
                    This action cannot be undone.
                  </p>
                  <button 
                    className="btn btn-danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <i className="bx bx-trash me-2"></i>
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-danger">
              <div className="modal-header bg-label-danger border-danger">
                <h5 className="modal-title text-danger">
                  <i className="bx bx-error-circle me-2"></i>
                  Confirm Account Deletion
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmation('');
                  }}
                  disabled={isDeleting}
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                  <i className="bx bx-error-circle fs-4 me-2"></i>
                  <div>
                    <strong>Warning!</strong> You are about to permanently delete your account.
                  </div>
                </div>

                <p className="mb-3">
                  This action will permanently delete your account and all associated data. This cannot be undone.
                </p>

                <div className="card bg-label-danger mb-4">
                  <div className="card-body">
                    <h6 className="mb-2 text-danger">The following will be permanently deleted:</h6>
                    <ul className="list-unstyled small mb-0">
                      <li className="mb-1">
                        <i className="bx bx-x text-danger me-2"></i>
                        All appointment history
                      </li>
                      <li className="mb-1">
                        <i className="bx bx-x text-danger me-2"></i>
                        Medical records and lab results
                      </li>
                      <li className="mb-1">
                        <i className="bx bx-x text-danger me-2"></i>
                        Payment history and receipts
                      </li>
                      <li>
                        <i className="bx bx-x text-danger me-2"></i>
                        All personal information and profile data
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="deleteConfirmation" className="form-label fw-semibold">
                    To confirm, please type <strong className="text-danger">DELETE</strong> in the box below:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="deleteConfirmation"
                    placeholder="Type DELETE to confirm"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    disabled={isDeleting}
                    autoFocus
                  />
                  <small className="text-muted">You must type exactly "DELETE" (all caps) to proceed.</small>
                </div>

                {isDeleting && (
                  <div className="alert alert-info d-flex align-items-center mb-0" role="alert">
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Deleting...</span>
                    </div>
                    <span>Processing your account deletion request...</span>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmation('');
                  }}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== 'DELETE' || isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <i className="bx bx-trash me-2"></i>
                      Yes, Delete My Account
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
