"use client"

export default function ItemsTableSection() {
  return (
    <div className="px-4 clearfix" data-aos="fade-up" data-aos-duration="700">
      <div className="mb-4 d-flex align-items-center justify-content-between">
        <div>
          <h6 className="fw-bold">Add Items:</h6>
          <span className="fs-12 text-muted">Add items to invoice</span>
        </div>
        <div className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Informations">
          <i className="feather feather-info"></i>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered overflow-hidden" id="tab_logic">
          <thead>
            <tr className="single-item">
              <th className="text-center">#</th>
              <th className="text-center wd-450">Product</th>
              <th className="text-center wd-150">Qty</th>
              <th className="text-center wd-150">Price</th>
              <th className="text-center wd-150">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr id="addr0">
              <td>1</td>
              <td><input type="text" name="product[]" placeholder="Enter Product Name" className="form-control" /></td>
              <td><input type="number" name="qty[]" placeholder="Enter Qty" className="form-control qty" step="1" min="1" /></td>
              <td><input type="number" name="price[]" placeholder="Enter Unit Price" className="form-control price" step="1.00" min="1" /></td>
              <td><input type="number" name="total[]" placeholder="0.00" className="form-control total" readOnly /></td>
            </tr>
            <tr id="addr1">
              <td>2</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button id="delete_row" className="btn btn-sm bg-soft-danger text-danger">Delete</button>
        <button id="add_row" className="btn btn-sm btn-primary">Add Items</button>
      </div>
    </div>
  )
}
