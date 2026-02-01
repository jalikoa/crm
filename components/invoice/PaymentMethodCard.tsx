"use client"

export default function PaymentMethodCard() {
  return (
    <div className="card stretch stretch-full" data-aos="zoom-in" data-aos-duration="700" data-aos-delay="100">
      <div className="card-body">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <div>
            <h6 className="fw-bold">Payment Method:</h6>
            <span className="fs-12 text-muted">Select payment method</span>
          </div>
          <div className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Select payment method">
            <i className="feather feather-info"></i>
          </div>
        </div>
        
        <ul className="nav nav-justified gap-1">
          <li className="nav-item border border-gray-500">
            <a href="javascript:void(0);" className="nav-link px-2 active" data-bs-toggle="tab" data-bs-target="#pamymetDebitCardTab">
              <i className="bi bi-credit-card-fill"></i>
              <span className="ms-2">Debit Card</span>
            </a>
          </li>
          <li className="nav-item border border-gray-500">
            <a href="javascript:void(0);" className="nav-link px-2" data-bs-toggle="tab" data-bs-target="#pamymetPaypalTab">
              <i className="bi bi-paypal"></i>
              <span className="ms-2">Paypal</span>
            </a>
          </li>
        </ul>
        {/* Tab panes */}
        <div className="tab-content mt-4">
          <div className="tab-pane fade show active" id="pamymetDebitCardTab" role="tabpanel">
            <div className="form-group mb-3">
              <input type="text" className="form-control input-credit-card" placeholder="Card Number" />
              <div className="hstack justify-content-end gap-1 mt-1 input-credit-card-type">
                <div className="amex">
                  <i className="fs-12 fa-brands fa-cc-amex"></i>
                </div>
                <div className="mastercard">
                  <i className="fs-12 fa-brands fa-cc-mastercard"></i>
                </div>
                <div className="visa">
                  <i className="fs-12 fa-brands fa-cc-visa"></i>
                </div>
                <div className="discover">
                  <i className="fs-12 fa-brands fa-cc-discover"></i>
                </div>
                <div className="jcb">
                  <i className="fs-12 fa-brands fa-cc-jcb"></i>
                </div>
                <div className="diners">
                  <i className="fs-12 fa-brands fa-cc-diners-club"></i>
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <input type="text" className="form-control" placeholder="Card Holder Name" />
            </div>
            <div className="d-flex gap-3">
              <div className="form-group">
                <input type="text" className="form-control input-date-formatting" placeholder="MM/YYYY" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control input-Blocks-formatting" placeholder="686" />
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="pamymetPaypalTab" role="tabpanel">
            <p>Paypal is easiest way to pay online</p>
            <p>
              <a href="http://paypal.com" className="btn btn-primary"><i className="bi bi-paypal me-2"></i> Log in my Paypal</a>
            </p>
            <div className="fs-11 text-muted">Note: There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
