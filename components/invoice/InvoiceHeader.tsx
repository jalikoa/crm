"use client"

export default function InvoiceHeader() {
  return (
    <div className="card-header" data-aos="fade-down" data-aos-duration="600">
      <h5 data-aos="fade-right" data-aos-delay="100">Invoice Create</h5>
      <div className="dropdown">
        <a href="javascript:void(0)" className="btn btn-light-brand dropdown-toggle" data-bs-toggle="dropdown" data-bs-offset="0,25">Invoice Templates</a>
        <ul className="dropdown-menu">
          <li>
            <a href="javascript:void(0);" className="dropdown-item active">Default</a>
          </li>
          <li>
            <a href="javascript:void(0);" className="dropdown-item">Simple</a>
          </li>
          <li>
            <a href="javascript:void(0);" className="dropdown-item">Classic</a>
          </li>
          <li>
            <a href="javascript:void(0);" className="dropdown-item">Modern</a>
          </li>
          <li>
            <a href="javascript:void(0);" className="dropdown-item">Ultimate</a>
          </li>
          <li>
            <a href="javascript:void(0);" className="dropdown-item">Essential</a>
          </li>
          <li className="dropdown-divider"></li>
          <li>
            <a href="javascript:void(0);" className="dropdown-item">Create Template</a>
          </li>
          <li>
            <a href="javascript:void(0);" className="dropdown-item">Delete Template</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
