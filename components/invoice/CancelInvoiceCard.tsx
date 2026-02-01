"use client"

export default function CancelInvoiceCard() {
  return (
    <div className="card stretch stretch-full" data-aos="zoom-in" data-aos-duration="700" data-aos-delay="300">
      <div className="card-body">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <div>
            <h6 className="fw-bold">Cancel Invoice</h6>
            <span className="fs-12 text-muted">Cancel invoice for ever.</span>
          </div>
          <a href="javascript:void(0);" className="btn btn-light-brand">Nevermind</a>
        </div>
        <p className="fs-12 text-muted mb-4">Are you sure you want to cancel this invoice? Neither you nor alex will able to make any(more) payments on it.</p>
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="notifyMe" defaultChecked />
          <label className="custom-control-label c-pointer" htmlFor="notifyMe">Notify alex that this invoice was cancelled.</label>
        </div>
        <a href="javascript:void(0);" className="btn bg-soft-danger text-danger mt-4 successAlertMessage">Cancel this Invoice</a>
      </div>
    </div>
  )
}
