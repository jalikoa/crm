"use client"

export default function InvoiceToSection() {
  return (
    <div className="col-xl-5" data-aos="fade-left" data-aos-duration="600">
      <div className="mb-4">
        <h6 className="fw-bold">Invoice To:</h6>
        <span className="fs-12 text-muted">Send an invoice and get paid</span>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="ClientName" className="col-sm-3 col-form-label">Name</label>
        <div className="col-sm-9">
          <input type="text" className="form-control" id="ClientName" placeholder="Business Name" />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="ClientEmail" className="col-sm-3 col-form-label">Email</label>
        <div className="col-sm-9">
          <input type="text" className="form-control" id="ClientEmail" placeholder="Email Address" />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="ClientPhone" className="col-sm-3 col-form-label">Phone</label>
        <div className="col-sm-9">
          <input type="text" className="form-control" id="ClientPhone" placeholder="Enter Phone" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="ClientAddress" className="col-sm-3 col-form-label">Address</label>
        <div className="col-sm-9">
          <textarea rows={5} className="form-control" id="ClientAddress" placeholder="Enter Address"></textarea>
        </div>
      </div>
    </div>
  )
}
