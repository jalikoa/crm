'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import CustomerViewHeader from '@/components/customers/CustomerViewHeader';
import CustomerProfileCard from '@/components/customers/CustomerProfileCard';
import CustomerViewTabs from '@/components/customers/CustomerViewTabs';
import CustomerOverviewTab from '@/components/customers/CustomerOverviewTab';
import CustomerSecurityTab from '@/components/customers/CustomerSecurityTab';

export default function ViewCustomerPage() {
  const params = useParams();
  const customerId = params.id;

  return (
    <>
      <main className="nxl-container">
        <div className="nxl-content">
          {/* [ page-header ] start */}
          <CustomerViewHeader />
          {/* [ page-header ] end */}

          {/* [ Main Content ] start */}
          <div className="main-content">
            <div className="row">
              <div className="col-xxl-4 col-xl-6">
                <CustomerProfileCard />

                {/* Social Card */}
                <div className="card stretch stretch-full">
                  <div className="card-header">
                    <h5 className="card-title">Social</h5>
                    <div className="dropdown">
                      <button
                        className="avatar-text avatar-sm"
                        type="button"
                        data-bs-toggle="dropdown"
                        data-bs-offset="25,25"
                      >
                        <i className="feather feather-more-vertical"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button className="dropdown-item" type="button">
                            <i className="feather feather-lock me-3"></i>
                            <span>Only Me</span>
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" type="button">
                            <i className="feather feather-globe me-3"></i>
                            <span>Everyone</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="avatar-text bg-gray-100">
                        <i className="feather feather-facebook"></i>
                      </div>
                      <span className="mx-2 text-gray-300">/</span>
                      <a href="#!" className="text-truncate-1-line">
                        https://www.facebook.com/<span className="text-muted">theme_ocean</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-8 col-xl-6">
                <CustomerViewTabs />
                <div className="tab-content">
                  <CustomerOverviewTab />
                  <CustomerSecurityTab />
                </div>
              </div>
            </div>
          </div>
          {/* [ Main Content ] end */}
        </div>

        {/* [ Footer ] start */}
        <footer className="footer">
          <p className="fs-11 text-muted fw-medium text-uppercase mb-0 copyright">
            <span>Copyright ©</span>
            <script>
              {`document.write(new Date().getFullYear());`}
            </script>
          </p>
          <p>
            <span>
              By: <a target="_blank" href="https://wrapbootstrap.com/user/theme_ocean">theme_ocean</a>
            </span>{' '}
            • <span>Distributed by: <a target="_blank" href="https://themewagon.com">ThemeWagon</a></span>
          </p>
          <div className="d-flex align-items-center gap-4">
            <button className="fs-11 fw-semibold text-uppercase" type="button">
              Help
            </button>
            <button className="fs-11 fw-semibold text-uppercase" type="button">
              Terms
            </button>
            <button className="fs-11 fw-semibold text-uppercase" type="button">
              Privacy
            </button>
          </div>
        </footer>
        {/* [ Footer ] end */}
      </main>
    </>
  );
}
