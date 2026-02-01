"use client"

import currencies from '@/data/currencies.json'

export default function CurrencyDiscountCard() {
  return (
    <div className="card stretch stretch-full" data-aos="zoom-in" data-aos-duration="700" data-aos-delay="200">
      <div className="card-body">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <div>
            <h6 className="fw-bold">Currency & Discount:</h6>
            <span className="fs-12 text-muted">Calculate your currency, tax & discount</span>
          </div>
          <div className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Calculate your currency, tax & discount">
            <i className="feather feather-info"></i>
          </div>
        </div>
        <div className="form-group mb-4">
          <select className="form-control" data-select2-selector="currency" defaultValue="us">
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} - {currency.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-4">
          <input type="number" id="itemDiscount" className="form-control" placeholder="Discount" />
        </div>
        <div className="ps-0 mb-3 form-check form-switch form-switch-sm d-flex align-center justify-content-between">
          <label className="fw-bold text-dark" htmlFor="LateFees">
            <span>Late Fees</span>
            <span className="fs-11 fw-normal text-muted d-block">Late fees for extra charge</span>
          </label>
          <input className="form-check-input" type="checkbox" id="LateFees" defaultChecked />
        </div>
        <div className="ps-0 mb-3 form-check form-switch form-switch-sm d-flex align-center justify-content-between">
          <label className="fw-bold text-dark" htmlFor="ClientNote">
            <span>Client Notes</span>
            <span className="fs-11 fw-normal text-muted d-block">Client notes for further query</span>
          </label>
          <input className="form-check-input" type="checkbox" id="ClientNote" />
        </div>
        <div className="ps-0 form-check form-switch form-switch-sm d-flex align-center justify-content-between">
          <label className="fw-bold text-dark" htmlFor="SavePayment">
            <span>Save Payment</span>
            <span className="fs-11 fw-normal text-muted d-block">Save payment for quick payout</span>
          </label>
          <input className="form-check-input" type="checkbox" id="SavePayment" />
        </div>
      </div>
    </div>
  )
}
