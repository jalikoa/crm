"use client";

import React, { useState } from "react";
import countries from "@/data/countries.json";
import { placeholderCustomerData } from "@/data/customerPlaceholder";

export default function AddCustomer() {
  const [customerData, setCustomerData] = useState(placeholderCustomerData);

  const handleInputChange = (e:any) => {
    const { id, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [id]: value,
      },
    }));
  };

  return (
    <>
      <main className="nxl-container">
        <div className="nxl-content">
          <div className="page-header">
            <div className="page-header-left d-flex align-items-center">
              <div className="page-header-title">
                <h5 className="m-b-10">Customers</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">Create</li>
              </ul>
            </div>
            <div className="page-header-right ms-auto">
              <div className="page-header-right-items">
                <div className="d-flex d-md-none">
                  <a href="javascript:void(0)" className="page-header-right-close-toggle">
                    <i className="feather-arrow-left me-2"></i>
                    <span>Back</span>
                  </a>
                </div>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                  <a href="javascript:void(0);" className="btn btn-light-brand successAlertMessage">
                    <i className="feather-layers me-2"></i>
                    <span>Save as Draft</span>
                  </a>
                  <a href="javascript:void(0);" className="btn btn-primary successAlertMessage">
                    <i className="feather-user-plus me-2"></i>
                    <span>Create Customer</span>
                  </a>
                </div>
              </div>
              <div className="d-md-none d-flex align-items-center">
                <a href="javascript:void(0)" className="page-header-right-open-toggle">
                  <i className="feather-align-right fs-20"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="main-content">
            <div className="row">
              <div className="col-lg-12">
                <div className="card border-top-0">
                  <div className="card-header p-0">
                    <ul className="nav nav-tabs flex-wrap w-100 text-center customers-nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item flex-fill border-top" role="presentation">
                        <a href="javascript:void(0);" className="nav-link active" data-bs-toggle="tab" data-bs-target="#profileTab" role="tab">
                          Profile
                        </a>
                      </li>
                      <li className="nav-item flex-fill border-top" role="presentation">
                        <a href="javascript:void(0);" className="nav-link" data-bs-toggle="tab" data-bs-target="#passwordTab" role="tab">
                          Password
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
                      <div className="card-body personal-info">
                        <div className="mb-4 d-flex align-items-center justify-content-between">
                          <h5 className="fw-bold mb-0 me-4">
                            <span className="d-block mb-2">Personal Information:</span>
                            <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                              Following information is publicly displayed, be careful!
                            </span>
                          </h5>
                          <a href="javascript:void(0);" className="btn btn-sm btn-light-brand">
                            Add New
                          </a>
                        </div>

                        <div className="row mb-4 align-items-center">
                          <div className="col-lg-4">
                            <label className="fw-semibold">Avatar: </label>
                          </div>
                          <div className="col-lg-8">
                            <div className="mb-4 mb-md-0 d-flex gap-4 your-brand">
                              <div className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded">
                                <img
                                  src={customerData.personalInfo.avatar}
                                  className="upload-pic img-fluid rounded h-100 w-100"
                                  alt="avatar"
                                />
                                <div className="position-absolute start-50 top-50 end-0 bottom-0 translate-middle h-100 w-100 hstack align-items-center justify-content-center c-pointer upload-button">
                                  <i className="feather feather-camera" aria-hidden="true"></i>
                                </div>
                                <input className="file-upload" type="file" accept="image/*" />
                              </div>
                              <div className="d-flex flex-column gap-1">
                                <div className="fs-11 text-gray-500 mt-2"># Upload your profile</div>
                                <div className="fs-11 text-gray-500"># Avatar size 150x150</div>
                                <div className="fs-11 text-gray-500"># Max upload size 2mb</div>
                                <div className="fs-11 text-gray-500"># Allowed file types: png, jpg, jpeg</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Name Input */}
                        <div className="row mb-4 align-items-center">
                          <div className="col-lg-4">
                            <label htmlFor="name" className="fw-semibold">Name:</label>
                          </div>
                          <div className="col-lg-8">
                            <div className="input-group">
                              <div className="input-group-text"><i className="feather-user"></i></div>
                              <input type="text" className="form-control" id="name" placeholder="Name" value={customerData.personalInfo.name} onChange={handleInputChange} />
                            </div>
                          </div>
                        </div>

                        {/* Email Input */}
                        <div className="row mb-4 align-items-center">
                          <div className="col-lg-4">
                            <label htmlFor="email" className="fw-semibold">Email:</label>
                          </div>
                          <div className="col-lg-8">
                            <div className="input-group">
                              <div className="input-group-text"><i className="feather-mail"></i></div>
                              <input type="text" className="form-control" id="email" placeholder="Email" value={customerData.personalInfo.email} onChange={handleInputChange} />
                            </div>
                          </div>
                        </div>

                        {/* Phone Input */}
                        <div className="row mb-4 align-items-center">
                          <div className="col-lg-4">
                            <label htmlFor="phone" className="fw-semibold">Phone:</label>
                          </div>
                          <div className="col-lg-8">
                            <div className="input-group">
                              <div className="input-group-text"><i className="feather-phone"></i></div>
                              <input type="text" className="form-control" id="phone" placeholder="Phone" value={customerData.personalInfo.phone} onChange={handleInputChange} />
                            </div>
                          </div>
                        </div>

                        {/* Company Input */}
                        <div className="row mb-4 align-items-center">
                          <div className="col-lg-4">
                            <label htmlFor="company" className="fw-semibold">Company:</label>
                          </div>
                          <div className="col-lg-8">
                            <div className="input-group">
                              <div className="input-group-text"><i className="feather-compass"></i></div>
                              <input type="text" className="form-control" id="company" placeholder="Company" value={customerData.personalInfo.company} onChange={handleInputChange} />
                            </div>
                          </div>
                        </div>

                        {/* Address Textarea */}
                        <div className="row mb-4 align-items-center">
                          <div className="col-lg-4">
                            <label htmlFor="address" className="fw-semibold">Address:</label>
                          </div>
                          <div className="col-lg-8">
                            <div className="input-group">
                              <div className="input-group-text"><i className="feather-map-pin"></i></div>
                              <textarea className="form-control" id="address" cols={30} rows={3} placeholder="Address" value={customerData.personalInfo.address} onChange={handleInputChange}></textarea>
                            </div>
                          </div>
                        </div>

                        {/* Country Select with Map Function */}
                        <div className="row mb-4 align-items-center">
                          <div className="col-lg-4">
                            <label className="fw-semibold">Country:</label>
                          </div>
                          <div className="col-lg-8">
                            <select className="form-control" data-select2-selector="country">
                              {countries.map((country) => (
                                <option key={country.code} data-country={country.code} selected={country.selected || false}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
