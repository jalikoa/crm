import { Customer } from '@/data/customersApi';

interface CustomerTableRowProps {
  customer: Customer;
}

export default function CustomerTableRow({ customer }: CustomerTableRowProps) {
  return (
    <tr className="single-item">
      <td>
        <div className="item-checkbox ms-1">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input checkbox"
              id={`checkBox_${customer.id}`}
            />
            <label className="custom-control-label" htmlFor={`checkBox_${customer.id}`}></label>
          </div>
        </div>
      </td>
      <td>
        <a href="customers-view.html" className="hstack gap-3">
          {customer.avatar ? (
            <div className="avatar-image avatar-md">
              <img src={customer.avatar} alt={customer.name} className="img-fluid" />
            </div>
          ) : (
            <div className={`avatar-image avatar-md ${customer.avatarBg}`}>{customer.initials}</div>
          )}
          <div>
            <span className="text-truncate-1-line">{customer.name}</span>
          </div>
        </a>
      </td>
      <td>
        <a href="apps-email.html">{customer.email}</a>
      </td>
      <td>
        <select className="form-select form-control max-select" data-select2-selector="tag" data-max-select2="tag" multiple>
          <option value="success" data-bg="bg-success">
            VIP
          </option>
          <option value="info" data-bg="bg-info">
            Bugs
          </option>
          <option value="primary" data-bg="bg-primary">
            Team
          </option>
          <option value="teal" data-bg="bg-teal">
            Primary
          </option>
          <option value="success" data-bg="bg-success">
            Updates
          </option>
          <option value="warning" data-bg="bg-warning">
            Personal
          </option>
          <option value="danger" data-bg="bg-danger">
            Promotions
          </option>
          <option value="indigo" data-bg="bg-indigo">
            Customs
          </option>
          <option value="primary" data-bg="bg-primary">
            Wholesale
          </option>
          <option value="danger" data-bg="bg-danger">
            Low Budget
          </option>
          <option value="teal" data-bg="bg-teal">
            High Budget
          </option>
        </select>
      </td>
      <td>
        <a href={`tel:${customer.phone}`}>{customer.phone}</a>
      </td>
      <td>{customer.date}</td>
      <td>
        <select className="form-control" data-select2-selector="status">
          <option value="success" data-bg="bg-success" selected={customer.status === 'Active'}>
            Active
          </option>
          <option value="warning" data-bg="bg-warning" selected={customer.status === 'Inactive'}>
            Inactive
          </option>
          <option value="danger" data-bg="bg-danger" selected={customer.status === 'Declined'}>
            Declined
          </option>
        </select>
      </td>
      <td>
        <div className="hstack gap-2 justify-content-end">
          <a href="customers-view.html" className="avatar-text avatar-md">
            <i className="feather feather-eye"></i>
          </a>
          <div className="dropdown">
            <a
              href="javascript:void(0)"
              className="avatar-text avatar-md"
              data-bs-toggle="dropdown"
              data-bs-offset="0,21"
            >
              <i className="feather feather-more-horizontal"></i>
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="javascript:void(0)">
                  <i className="feather feather-edit-3 me-3"></i>
                  <span>Edit</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item printBTN" href="javascript:void(0)">
                  <i className="feather feather-printer me-3"></i>
                  <span>Print</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="javascript:void(0)">
                  <i className="feather feather-clock me-3"></i>
                  <span>Remind</span>
                </a>
              </li>
              <li className="dropdown-divider"></li>
              <li>
                <a className="dropdown-item" href="javascript:void(0)">
                  <i className="feather feather-archive me-3"></i>
                  <span>Archive</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="javascript:void(0)">
                  <i className="feather feather-alert-octagon me-3"></i>
                  <span>Report Spam</span>
                </a>
              </li>
              <li className="dropdown-divider"></li>
              <li>
                <a className="dropdown-item" href="javascript:void(0)">
                  <i className="feather feather-trash-2 me-3"></i>
                  <span>Delete</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </td>
    </tr>
  );
}
