"use client"

export default function InvoiceDetailsSection() {
  return (
    <div className="px-4 row justify-content-between" data-aos="fade-up" data-aos-duration="600">
      <div className="col-xl-3">
        <div className="form-group mb-3">
          <label htmlFor="InvoiceLabel" className="form-label">Invoice Label</label>
          <input type="text" className="form-control" id="InvoiceLabel" placeholder="Duralux Invoice" />
        </div>
      </div>
      <div className="col-xl-3">
        <div className="form-group mb-3">
          <label htmlFor="InvoiceNumber" className="form-label">Invoice Number</label>
          <input type="text" className="form-control" id="InvoiceNumber" placeholder="#NXL2023" />
        </div>
      </div>
      <div className="col-xl-6">
        <div className="form-group mb-3">
          <label htmlFor="InvoiceProduct" className="form-label">Invoice Product</label>
          <input type="text" className="form-control" id="InvoiceProduct" placeholder="Product Name" />
        </div>
      </div>
    </div>
  )
}
