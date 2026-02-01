"use client"

export default function InvoiceFromSection() {
  return (
    <div className="col-xl-5 mb-4 mb-sm-0" data-aos="fade-right" data-aos-duration="600">
      <div className="mb-4">
        <h6 className="fw-bold">Invoice From:</h6>
        <span className="fs-12 text-muted">Send an invoice and get paid</span>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="InvoiceName" className="col-sm-3 col-form-label">Name</label>
        <div className="col-sm-9">
          <input type="text" className="form-control" id="InvoiceName" placeholder="Business Name" />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="InvoiceEmail" className="col-sm-3 col-form-label">Email</label>
        <div className="col-sm-9">
          <input type="text" className="form-control" id="InvoiceEmail" placeholder="Email Address" />
        </div>
      </div>
      <div className="form-group row mb-3">
        <label htmlFor="InvoicePhone" className="col-sm-3 col-form-label">Phone</label>
        <div className="col-sm-9">
          <input type="text" className="form-control" id="InvoicePhone" placeholder="Enter Phone" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="InvoiceAddress" className="col-sm-3 col-form-label">Address</label>
        <div className="col-sm-9">
          <textarea rows={5} className="form-control" id="InvoiceAddress" placeholder="Enter Address"></textarea>
        </div>
      </div>
    </div>
  )
}
