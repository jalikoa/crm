'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Type definitions
interface Payment {
  id: number;
  invoiceNumber: string;
  client: {
    name: string;
    email: string;
    avatar?: string;
    initial?: string;
    bgColor?: string;
    textColor?: string;
  };
  amount: string;
  date: string;
  transactionId: string;
  status: 'Completed' | 'Unpaid' | 'Overdue' | 'Draft' | 'Declined' | 'warning';
}

export default function PaymentsPage() {
  const router = useRouter();
  
  // State management
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filter, setFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  
  // Stats data
  const [stats, setStats] = useState({
    paid: { count: 78, total: 100, percentage: 36.85, trend: 'up' },
    unpaid: { count: 38, total: 50, percentage: 23.45, trend: 'down' },
    overdue: { count: 15, total: 30, percentage: 25.44, trend: 'up' },
    draft: { count: 3, total: 10, percentage: 12.68, trend: 'down' },
  });

  // Mock data - replace with API call
  useEffect(() => {
    const mockPayments: Payment[] = [
      {
        id: 1,
        invoiceNumber: '#321456',
        client: {
          name: 'Alexandra Della',
          email: 'alex@example.com',
          avatar: '/assets/images/avatar/1.png',
        },
        amount: '$249.99 USD',
        date: '2023-04-25, 03:42PM',
        transactionId: '#SDEG4589SE1E',
        status: 'Completed',
      },
      {
        id: 2,
        invoiceNumber: '#987456',
        client: {
          name: 'Nancy Elliot',
          email: 'nancy.elliot@outlook.com',
          initial: 'N',
          bgColor: 'bg-warning',
          textColor: 'text-white',
        },
        amount: '$120.50 USD',
        date: '2023-05-20, 12:23PM',
        transactionId: '#SDEG4589SE1E',
        status: 'Unpaid',
      },
      {
        id: 3,
        invoiceNumber: '#741258',
        client: {
          name: 'Green Cute',
          email: 'green.cute@outlook.com',
          avatar: '/assets/images/avatar/2.png',
        },
        amount: '$300.00 USD',
        date: '2023-01-02, 10:36AM',
        transactionId: '#SDEG4589SE1E',
        status: 'Completed',
      },
      {
        id: 4,
        invoiceNumber: '#321456',
        client: {
          name: 'Henry Leach',
          email: 'henry.leach@outlook.com',
          initial: 'H',
          bgColor: 'bg-teal',
          textColor: 'text-white',
        },
        amount: '$249.99 USD',
        date: '2023-04-25, 04:22PM',
        transactionId: '#SDEG4589SE1E',
        status: 'Completed',
      },
      {
        id: 5,
        invoiceNumber: '#357895',
        client: {
          name: 'Marianne Audrey',
          email: 'marianne.audrey@outlook.com',
          avatar: '/assets/images/avatar/3.png',
        },
        amount: '$150.00 USD',
        date: '2023-02-15, 05:23PM',
        transactionId: '#SDEG4589SE1E',
        status: 'Completed',
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setPayments(mockPayments);
      setIsLoading(false);
    }, 500);
  }, []);

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedPayments(payments.map(payment => payment.id));
    } else {
      setSelectedPayments([]);
    }
  };

  // Handle individual checkbox
  const handleSelectPayment = (paymentId: number, checked: boolean) => {
    if (checked) {
      setSelectedPayments([...selectedPayments, paymentId]);
    } else {
      setSelectedPayments(selectedPayments.filter(id => id !== paymentId));
    }
  };

  // Update select all state when individual selections change
  useEffect(() => {
    if (payments.length > 0) {
      setSelectAll(selectedPayments.length === payments.length);
    }
  }, [selectedPayments, payments]);

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    // TODO: Implement actual filtering logic
    console.log('Filter changed to:', newFilter);
  };

  // Handle view invoice
  const handleViewInvoice = (invoiceNumber: string) => {
    router.push(`/admin/dashboard/invoice/${invoiceNumber}`);
  };

  // Handle create invoice
  const handleCreateInvoice = () => {
    router.push('/admin/dashboard/invoice/create');
  };

  // Handle action menu item click
  const handleAction = (action: string, paymentId: number) => {
    console.log(`Action ${action} for payment ${paymentId}`);
    // TODO: Implement action handlers
    // - Edit: redirect to edit page
    // - Print: trigger print
    // - Remind: send reminder
    // - Archive: archive invoice
    // - Delete: delete invoice
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return 'bg-soft-success text-success';
      case 'unpaid':
        return 'bg-soft-warning text-warning';
      case 'overdue':
        return 'bg-soft-danger text-danger';
      case 'draft':
        return 'bg-soft-secondary text-secondary';
      case 'declined':
        return 'bg-soft-danger text-danger';
      default:
        return 'bg-soft-info text-info';
    }
  };

  // Export data
  const handleExport = (format: string) => {
    console.log('Exporting as:', format);
    // TODO: Implement export functionality
    alert(`Export as ${format} - implement this feature`);
  };

  // Print functionality
  const handlePrint = (paymentId: number) => {
    console.log('Printing invoice:', paymentId);
    // TODO: Implement print functionality
    window.print();
  };

  return (
    <main className="nxl-container">
      <div className="nxl-content">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-left d-flex align-items-center">
            <div className="page-header-title">
              <h5 className="m-b-10">Payment</h5>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
              <li className="breadcrumb-item">Payment</li>
            </ul>
          </div>
          
          <div className="page-header-right ms-auto">
            <div className="page-header-right-items">
              <div className="d-flex d-md-none">
                <a href="javascript:void(0)" className="page-header-right-close-toggle">
                  <i className="feather-arrow-left me-2"></i>
                  <span>Back</span>
                </a>
              </div>
              
              <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                <a 
                  href="javascript:void(0);" 
                  className="btn btn-icon btn-light-brand" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#collapseOne"
                >
                  <i className="feather-bar-chart"></i>
                </a>
                
                {/* Filter Dropdown */}
                <div className="dropdown">
                  <a 
                    className="btn btn-icon btn-light-brand" 
                    data-bs-toggle="dropdown" 
                    data-bs-offset="0, 10" 
                    data-bs-auto-close="outside"
                  >
                    <i className="feather-filter"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    {['All', 'Sent', 'Open', 'Draft', 'Revised', 'Declined', 'Accepted', 'Leads', 'Expired', 'Customers'].map((item) => (
                      <a
                        key={item}
                        href="javascript:void(0);"
                        className={`dropdown-item ${filter === item ? 'active' : ''}`}
                        onClick={() => handleFilterChange(item)}
                      >
                        <i className={`feather-${getFilterIcon(item)} me-3`}></i>
                        <span>{item}</span>
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Export Dropdown */}
                <div className="dropdown">
                  <a 
                    className="btn btn-icon btn-light-brand" 
                    data-bs-toggle="dropdown" 
                    data-bs-offset="0, 10" 
                    data-bs-auto-close="outside"
                  >
                    <i className="feather-paperclip"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    {['PDF', 'CSV', 'XML', 'Text', 'Excel'].map((format) => (
                      <a
                        key={format}
                        href="javascript:void(0);"
                        className="dropdown-item"
                        onClick={() => handleExport(format)}
                      >
                        <i className={`bi bi-filetype-${format.toLowerCase()} me-3`}></i>
                        <span>{format}</span>
                      </a>
                    ))}
                    <div className="dropdown-divider"></div>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item"
                      onClick={() => window.print()}
                    >
                      <i className="bi bi-printer me-3"></i>
                      <span>Print</span>
                    </a>
                  </div>
                </div>
                
                {/* Create Invoice Button */}
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleCreateInvoice}
                >
                  <i className="feather-plus me-2"></i>
                  <span>Create Invoice</span>
                </button>
              </div>
            </div>
            
            <div className="d-md-none d-flex align-items-center">
              <a href="javascript:void(0)" className="page-header-right-open-toggle">
                <i className="feather-align-right fs-20"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div id="collapseOne" className="accordion-collapse collapse page-header-collapse show">
          <div className="accordion-body pb-2">
            <div className="row">
              <div className="col-xxl-3 col-md-6">
                <div className="card stretch stretch-full">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" className="fw-bold d-block">
                        <span className="d-block">Paid</span>
                        <span className="fs-20 fw-bold d-block">
                          {stats.paid.count}/{stats.paid.total}
                        </span>
                      </a>
                      <div className="badge bg-soft-success text-success">
                        <i className={`feather-arrow-${stats.paid.trend} fs-10 me-1`}></i>
                        <span>{stats.paid.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xxl-3 col-md-6">
                <div className="card stretch stretch-full">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" className="fw-bold d-block">
                        <span className="d-block">Unpaid</span>
                        <span className="fs-20 fw-bold d-block">
                          {stats.unpaid.count}/{stats.unpaid.total}
                        </span>
                      </a>
                      <div className="badge bg-soft-danger text-danger">
                        <i className={`feather-arrow-${stats.unpaid.trend} fs-10 me-1`}></i>
                        <span>{stats.unpaid.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xxl-3 col-md-6">
                <div className="card stretch stretch-full">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" className="fw-bold d-block">
                        <span className="d-block">Overdue</span>
                        <span className="fs-20 fw-bold d-block">
                          {stats.overdue.count}/{stats.overdue.total}
                        </span>
                      </a>
                      <div className="badge bg-soft-success text-success">
                        <i className={`feather-arrow-${stats.overdue.trend} fs-10 me-1`}></i>
                        <span>{stats.overdue.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xxl-3 col-md-6">
                <div className="card stretch stretch-full">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" className="fw-bold d-block">
                        <span className="d-block">Draft</span>
                        <span className="fs-20 fw-bold d-block">
                          {stats.draft.count}/{stats.draft.total}
                        </span>
                      </a>
                      <div className="badge bg-soft-danger text-danger">
                        <i className={`feather-arrow-${stats.draft.trend} fs-10 me-1`}></i>
                        <span>{stats.draft.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="main-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="card stretch stretch-full">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover" id="paymentList">
                      <thead>
                        <tr>
                          <th className="wd-30">
                            <div className="btn-group mb-1">
                              <div className="custom-control custom-checkbox ms-1">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkAllPayment"
                                  checked={selectAll}
                                  onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                                <label className="custom-control-label" htmlFor="checkAllPayment"></label>
                              </div>
                            </div>
                          </th>
                          <th>Invoice</th>
                          <th>Client</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Transaction</th>
                          <th>Status</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan={8} className="text-center py-5">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : payments.map((payment) => (
                          <tr key={payment.id} className="single-item">
                            <td>
                              <div className="item-checkbox ms-1">
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input checkbox"
                                    id={`checkBox_${payment.id}`}
                                    checked={selectedPayments.includes(payment.id)}
                                    onChange={(e) => handleSelectPayment(payment.id, e.target.checked)}
                                  />
                                  <label className="custom-control-label" htmlFor={`checkBox_${payment.id}`}></label>
                                </div>
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="fw-bold btn btn-link p-0"
                                onClick={() => handleViewInvoice(payment.invoiceNumber)}
                              >
                                {payment.invoiceNumber}
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="hstack gap-3 btn btn-link p-0 text-start"
                              >
                                <div className="avatar-image avatar-md">
                                  {payment.client.avatar ? (
                                    <img 
                                      src={payment.client.avatar} 
                                      alt={payment.client.name} 
                                      className="img-fluid"
                                    />
                                  ) : (
                                    <div className={`${payment.client.bgColor || 'bg-primary'} ${payment.client.textColor || 'text-white'}`}>
                                      {payment.client.initial || payment.client.name.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <span className="text-truncate-1-line d-block">
                                    {payment.client.name}
                                  </span>
                                  <small className="fs-12 fw-normal text-muted d-block">
                                    {payment.client.email}
                                  </small>
                                </div>
                              </button>
                            </td>
                            <td className="fw-bold text-dark">{payment.amount}</td>
                            <td>{payment.date}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-link p-0"
                              >
                                {payment.transactionId}
                              </button>
                            </td>
                            <td>
                              <div className={`badge ${getStatusBadge(payment.status)}`}>
                                {payment.status}
                              </div>
                            </td>
                            <td>
                              <div className="hstack gap-2 justify-content-end">
                                <button
                                  type="button"
                                  className="avatar-text avatar-md"
                                  onClick={() => handleViewInvoice(payment.invoiceNumber)}
                                  title="View"
                                >
                                  <i className="feather feather-eye"></i>
                                </button>
                                
                                <div className="dropdown">
                                  <button
                                    type="button"
                                    className="avatar-text avatar-md"
                                    data-bs-toggle="dropdown"
                                    data-bs-offset="0,21"
                                  >
                                    <i className="feather feather-more-horizontal"></i>
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleAction('edit', payment.id)}
                                      >
                                        <i className="feather feather-edit-3 me-3"></i>
                                        <span>Edit</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handlePrint(payment.id)}
                                      >
                                        <i className="feather feather-printer me-3"></i>
                                        <span>Print</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleAction('remind', payment.id)}
                                      >
                                        <i className="feather feather-clock me-3"></i>
                                        <span>Remind</span>
                                      </button>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleAction('archive', payment.id)}
                                      >
                                        <i className="feather feather-archive me-3"></i>
                                        <span>Archive</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleAction('spam', payment.id)}
                                      >
                                        <i className="feather feather-alert-octagon me-3"></i>
                                        <span>Report Spam</span>
                                      </button>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <button
                                        className="dropdown-item text-danger"
                                        onClick={() => handleAction('delete', payment.id)}
                                      >
                                        <i className="feather feather-trash-2 me-3"></i>
                                        <span>Delete</span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper function to get filter icon
const getFilterIcon = (filter: string): string => {
  const icons: Record<string, string> = {
    'All': 'eye',
    'Sent': 'send',
    'Open': 'book-open',
    'Draft': 'archive',
    'Revised': 'bell',
    'Declined': 'shield-off',
    'Accepted': 'check',
    'Leads': 'briefcase',
    'Expired': 'wifi-off',
    'Customers': 'users',
  };
  return icons[filter] || 'filter';
};