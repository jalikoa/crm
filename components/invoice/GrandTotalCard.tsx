"use client"

export default function GrandTotalCard() {
  return (
    <div className="card stretch stretch-full" data-aos="zoom-in" data-aos-duration="600">
      <div className="card-body">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <div>
            <h6 className="fw-bold">Grand Total:</h6>
            <span className="fs-12 text-muted">Grand total invoice</span>
          </div>
          <div className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Grand total invoice">
            <i className="feather feather-info"></i>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered" id="tab_logic_total">
            <tbody>
              <tr className="single-item">
                <th className="text-dark fw-semibold">Sub Total</th>
                <td className="w-25"><input type="number" name="sub_total" placeholder="0.00" className="form-control border-0 bg-transparent p-0" id="sub_total" readOnly /></td>
              </tr>
              <tr className="single-item">
                <th className="text-dark fw-semibold">Tax</th>
                <td className="w-25">
                  <div className="input-group mb-2 mb-sm-0">
                    <input type="number" className="form-control border-0 bg-transparent p-0" id="tax" placeholder="0" />
                    <div className="input-group-addon">%</div>
                  </div>
                </td>
              </tr>
              <tr className="single-item">
                <th className="text-dark fw-semibold">Tax Amount</th>
                <td className="w-25"><input type="number" name="tax_amount" id="tax_amount" placeholder="0.00" className="form-control border-0 bg-transparent p-0" readOnly /></td>
              </tr>
              <tr className="single-item">
                <th className="text-dark fw-semibold bg-gray-100">Grand Total</th>
                <td className="bg-gray-100 w-25"><input type="number" name="total_amount" id="total_amount" placeholder="0.00" className="form-control border-0 bg-transparent p-0 fw-bolder text-dark" readOnly /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
