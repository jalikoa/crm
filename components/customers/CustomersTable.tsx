import { Customer } from '@/data/customersApi';
import CustomerTableRow from './CustomerTableRow';

interface CustomersTableProps {
  customers: Customer[];
}

export default function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <div className="main-content">
      <div className="row">
        <div className="col-lg-12">
          <div className="card stretch stretch-full">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover" id="customerList">
                  <thead>
                    <tr>
                      <th className="wd-30">
                        <div className="btn-group mb-1">
                          <div className="custom-control custom-checkbox ms-1">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="checkAllCustomer"
                            />
                            <label className="custom-control-label" htmlFor="checkAllCustomer"></label>
                          </div>
                        </div>
                      </th>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Group</th>
                      <th>Phone</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <CustomerTableRow key={customer.id} customer={customer} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
