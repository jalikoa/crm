import Link from 'next/link';

export default function CustomersPageHeader() {
  return (
    <div className="page-header">
      <div className="page-header-left d-flex align-items-center">
        <div className="page-header-title">
          <h5 className="m-b-10">Customers</h5>
        </div>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item">Customers</li>
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
            <a href="javascript:void(0);" className="btn btn-icon btn-light-brand" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <i className="feather-bar-chart"></i>
            </a>
            <div className="dropdown">
              <a className="btn btn-icon btn-light-brand" data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                <i className="feather-filter"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="feather-eye me-3"></i>
                  <span>All</span>
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="feather-users me-3"></i>
                  <span>Group</span>
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="feather-flag me-3"></i>
                  <span>Country</span>
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="feather-dollar-sign me-3"></i>
                  <span>Invoice</span>
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="feather-briefcase me-3"></i>
                  <span>Project</span>
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="feather-user-check me-3"></i>
                  <span>Active</span>
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="feather-user-minus me-3"></i>
                  <span>Inactive</span>
                </a>
              </div>
            </div>
            <div className="dropdown">
              <a className="btn btn-icon btn-light-brand" data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                <i className="feather-paperclip"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="bi bi-filetype-pdf me-3"></i>
                  <span>PDF</span>
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="bi bi-filetype-csv me-3"></i>
                  <span>CSV</span>
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="bi bi-filetype-xml me-3"></i>
                  <span>XML</span>
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="bi bi-filetype-txt me-3"></i>
                  <span>Text</span>
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="bi bi-filetype-exe me-3"></i>
                  <span>Excel</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="javascript:void(0);" className="dropdown-item">
                  <i className="bi bi-printer me-3"></i>
                  <span>Print</span>
                </a>
              </div>
            </div>
            <a href="customers-create.html" className="btn btn-primary">
              <i className="feather-plus me-2"></i>
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
  );
}
