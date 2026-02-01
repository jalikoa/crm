export default function CustomerViewTabs() {
  return (
    <div className="card border-top-0">
      <div className="card-header p-0">
        {/* Nav tabs */}
        <ul className="nav nav-tabs flex-wrap w-100 text-center customers-nav-tabs" id="myTab" role="tablist">
          <li className="nav-item flex-fill border-top" role="presentation">
            <button
              className="nav-link active"
              id="overviewTab-btn"
              data-bs-toggle="tab"
              data-bs-target="#overviewTab"
              type="button"
              role="tab"
              aria-controls="overviewTab"
              aria-selected="true"
            >
              Overview
            </button>
          </li>
          <li className="nav-item flex-fill border-top" role="presentation">
            <button
              className="nav-link"
              id="billingTab-btn"
              data-bs-toggle="tab"
              data-bs-target="#billingTab"
              type="button"
              role="tab"
              aria-controls="billingTab"
              aria-selected="false"
            >
              Billing
            </button>
          </li>
          <li className="nav-item flex-fill border-top" role="presentation">
            <button
              className="nav-link"
              id="activityTab-btn"
              data-bs-toggle="tab"
              data-bs-target="#activityTab"
              type="button"
              role="tab"
              aria-controls="activityTab"
              aria-selected="false"
            >
              Activity
            </button>
          </li>
          <li className="nav-item flex-fill border-top" role="presentation">
            <button
              className="nav-link"
              id="notificationsTab-btn"
              data-bs-toggle="tab"
              data-bs-target="#notificationsTab"
              type="button"
              role="tab"
              aria-controls="notificationsTab"
              aria-selected="false"
            >
              Notifications
            </button>
          </li>
          <li className="nav-item flex-fill border-top" role="presentation">
            <button
              className="nav-link"
              id="connectionTab-btn"
              data-bs-toggle="tab"
              data-bs-target="#connectionTab"
              type="button"
              role="tab"
              aria-controls="connectionTab"
              aria-selected="false"
            >
              Connection
            </button>
          </li>
          <li className="nav-item flex-fill border-top" role="presentation">
            <button
              className="nav-link"
              id="securityTab-btn"
              data-bs-toggle="tab"
              data-bs-target="#securityTab"
              type="button"
              role="tab"
              aria-controls="securityTab"
              aria-selected="false"
            >
              Security
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
