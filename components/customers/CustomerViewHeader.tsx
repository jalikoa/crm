import Link from 'next/link';

export default function CustomerViewHeader() {
  return (
    <div className="page-header">
      <div className="page-header-left d-flex align-items-center">
        <div className="page-header-title">
          <h5 className="m-b-10">Customers</h5>
        </div>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/admin/dashboard">Home</Link>
          </li>
          <li className="breadcrumb-item">View</li>
        </ul>
      </div>
      <div className="page-header-right ms-auto">
        <div className="page-header-right-items">
          <div className="d-flex d-md-none">
            <button className="page-header-right-close-toggle" type="button">
              <i className="feather-arrow-left me-2"></i>
              <span>Back</span>
            </button>
          </div>
          <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <button className="btn btn-icon btn-light-brand successAlertMessage" type="button">
              <i className="feather-star"></i>
            </button>
            <button className="btn btn-icon btn-light-brand" type="button">
              <i className="feather-eye me-2"></i>
              <span>Follow</span>
            </button>
            <Link href="/admin/dashboard/customers/add" className="btn btn-primary">
              <i className="feather-plus me-2"></i>
              <span>Create Customer</span>
            </Link>
          </div>
        </div>
        <div className="d-md-none d-flex align-items-center">
          <button className="page-header-right-open-toggle" type="button">
            <i className="feather-align-right fs-20"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
