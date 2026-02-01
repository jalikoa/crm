'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Type definitions
interface Client {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  initial?: string;
  bgColor?: string;
  textColor?: string;
}

interface Invoice {
  id: number;
  invoiceNumber: string;
  client: Client;
  amount: string;
  date: string;
  transactionId: string;
  status: 'Paid' | 'Unpaid' | 'Overdue' | 'Draft' | 'Declined';
}

export default function InvoicePage() {
  const router = useRouter();
  
  // State management
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
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
    const mockInvoices: Invoice[] = [
      {
        id: 1,
        invoiceNumber: '#321456',
        client: {
          id: 1,
          name: 'Alexandra Della',
          email: 'alex@example.com',
          avatar: '/assets/images/avatar/1.png',
        },
        amount: '$249.99 USD',
        date: '2023-04-25, 03:42PM',
        transactionId: '#SDEG4589SE1E',
        status: 'Paid',
      },
      {
        id: 2,
        invoiceNumber: '#987456',
        client: {
          id: 2,
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
          id: 3,
          name: 'Green Cute',
          email: 'green.cute@outlook.com',
          avatar: '/assets/images/avatar/2.png',
        },
        amount: '$300.00 USD',
        date: '2023-01-02, 10:36AM',
        transactionId: '#SDEG4589SE1E',
        status: 'Paid',
      },
      {
        id: 4,
        invoiceNumber: '#321457',
        client: {
          id: 4,
          name: 'Henry Leach',
          email: 'henry.leach@outlook.com',
          initial: 'H',
          bgColor: 'bg-teal',
          textColor: 'text-white',
        },
        amount: '$249.99 USD',
        date: '2023-04-25, 04:22PM',
        transactionId: '#SDEG4589SE1E',
        status: 'Paid',
      },
      {
        id: 5,
        invoiceNumber: '#357895',
        client: {
          id: 5,
          name: 'Marianne Audrey',
          email: 'marianne.audrey@outlook.com',
          avatar: '/assets/images/avatar/3.png',
        },
        amount: '$150.00 USD',
        date: '2023-02-15, 05:23PM',
        transactionId: '#SDEG4589SE1E',
        status: 'Paid',
      },
      {
        id: 6,
        invoiceNumber: '#321458',
        client: {
          id: 6,
          name: 'Curtis Green',
          email: 'curtis.green@example.com',
          avatar: '/assets/images/avatar/4.png',
        },
        amount: '$180.75 USD',
        date: '2023-03-10, 11:15AM',
        transactionId: '#SDEG4589SE1F',
        status: 'Overdue',
      },
      {
        id: 7,
        invoiceNumber: '#987457',
        client: {
          id: 7,
          name: 'Olive Delarosa',
          email: 'olive.delarosa@example.com',
          initial: 'O',
          bgColor: 'bg-primary',
          textColor: 'text-white',
        },
        amount: '$95.25 USD',
        date: '2023-06-05, 09:45AM',
        transactionId: '#SDEG4589SE1G',
        status: 'Draft',
      },
      {
        id: 8,
        invoiceNumber: '#741259',
        client: {
          id: 8,
          name: 'Holland Scott',
          email: 'holland.scott@example.com',
          avatar: '/assets/images/avatar/5.png',
        },
        amount: '$425.50 USD',
        date: '2023-02-28, 02:30PM',
        transactionId: '#SDEG4589SE1H',
        status: 'Declined',
      },
      {
        id: 9,
        invoiceNumber: '#321459',
        client: {
          id: 9,
          name: 'Janette Dalton',
          email: 'janette.dalton@example.com',
          avatar: '/assets/images/avatar/6.png',
        },
        amount: '$275.00 USD',
        date: '2023-05-15, 03:20PM',
        transactionId: '#SDEG4589SE1I',
        status: 'Paid',
      },
      {
        id: 10,
        invoiceNumber: '#357896',
        client: {
          id: 10,
          name: 'Michael Ksen',
          email: 'michael.ksen@example.com',
          initial: 'M',
          bgColor: 'bg-success',
          textColor: 'text-white',
        },
        amount: '$199.99 USD',
        date: '2023-04-10, 10:05AM',
        transactionId: '#SDEG4589SE1J',
        status: 'Unpaid',
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setInvoices(mockInvoices);
      setIsLoading(false);
    }, 500);
  }, []);

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedInvoices(invoices.map(invoice => invoice.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  // Handle individual checkbox
  const handleSelectInvoice = (invoiceId: number, checked: boolean) => {
    if (checked) {
      setSelectedInvoices([...selectedInvoices, invoiceId]);
    } else {
      setSelectedInvoices(selectedInvoices.filter(id => id !== invoiceId));
    }
  };

  // Update select all state when individual selections change
  useEffect(() => {
    if (invoices.length > 0) {
      setSelectAll(selectedInvoices.length === invoices.length);
    }
  }, [selectedInvoices, invoices]);

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    // TODO: Implement actual filtering logic
    console.log('Filter changed to:', newFilter);
  };

  // Handle view invoice
  const handleViewInvoice = (invoiceId: number) => {
    router.push(`/admin/dashboard/invoice/${invoiceId}`);
  };

  // Handle create invoice
  const handleCreateInvoice = () => {
    router.push('/admin/dashboard/invoice/create');
  };

  // Handle action menu item click
  const handleAction = (action: string, invoiceId: number) => {
    console.log(`Action ${action} for invoice ${invoiceId}`);
    // TODO: Implement action handlers
    // - Edit: redirect to edit page
    // - Print: trigger print
    // - Remind: send reminder
    // - Archive: archive invoice
    // - Delete: delete invoice
  };

  // Handle export
  const handleExport = (format: string) => {
    console.log('Exporting as:', format);
    // TODO: Implement export functionality
    alert(`Export as ${format} - implement this feature`);
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'paid':
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

  return (
    <main className="nxl-container">
      <div className="nxl-content">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-left d-flex align-items-center">
            <div className="page-header-title">
              <h5 className="m-b-10">Invoices</h5>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
              <li className="breadcrumb-item">Invoices</li>
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
                    {['All', 'Paid', 'Unpaid', 'Overdue', 'Draft', 'Declined'].map((item) => (
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
                    <table className="table table-hover" id="invoiceList">
                      <thead>
                        <tr>
                          <th className="wd-30">
                            <div className="btn-group mb-1">
                              <div className="custom-control custom-checkbox ms-1">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkAllInvoice"
                                  checked={selectAll}
                                  onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                                <label className="custom-control-label" htmlFor="checkAllInvoice"></label>
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
                        ) : invoices.map((invoice) => (
                          <tr key={invoice.id} className="single-item">
                            <td>
                              <div className="item-checkbox ms-1">
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input checkbox"
                                    id={`checkBox_${invoice.id}`}
                                    checked={selectedInvoices.includes(invoice.id)}
                                    onChange={(e) => handleSelectInvoice(invoice.id, e.target.checked)}
                                  />
                                  <label className="custom-control-label" htmlFor={`checkBox_${invoice.id}`}></label>
                                </div>
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="fw-bold btn btn-link p-0"
                                onClick={() => handleViewInvoice(invoice.id)}
                              >
                                {invoice.invoiceNumber}
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="hstack gap-3 btn btn-link p-0 text-start"
                              >
                                <div className="avatar-image avatar-md">
                                  {invoice.client.avatar ? (
                                    <img 
                                      src={invoice.client.avatar} 
                                      alt={invoice.client.name} 
                                      className="img-fluid"
                                    />
                                  ) : (
                                    <div className={`${invoice.client.bgColor || 'bg-primary'} ${invoice.client.textColor || 'text-white'}`}>
                                      {invoice.client.initial || invoice.client.name.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <span className="text-truncate-1-line d-block">
                                    {invoice.client.name}
                                  </span>
                                  <small className="fs-12 fw-normal text-muted d-block">
                                    {invoice.client.email}
                                  </small>
                                </div>
                              </button>
                            </td>
                            <td className="fw-bold text-dark">{invoice.amount}</td>
                            <td>{invoice.date}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-link p-0"
                              >
                                {invoice.transactionId}
                              </button>
                            </td>
                            <td>
                              <div className={`badge ${getStatusBadge(invoice.status)}`}>
                                {invoice.status}
                              </div>
                            </td>
                            <td>
                              <div className="hstack gap-2 justify-content-end">
                                <button
                                  type="button"
                                  className="avatar-text avatar-md"
                                  onClick={() => handleViewInvoice(invoice.id)}
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
                                        onClick={() => handleAction('edit', invoice.id)}
                                      >
                                        <i className="feather feather-edit-3 me-3"></i>
                                        <span>Edit</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item printBTN"
                                        onClick={() => window.print()}
                                      >
                                        <i className="feather feather-printer me-3"></i>
                                        <span>Print</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleAction('remind', invoice.id)}
                                      >
                                        <i className="feather feather-clock me-3"></i>
                                        <span>Send Reminder</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleAction('email', invoice.id)}
                                      >
                                        <i className="feather feather-send me-3"></i>
                                        <span>Send Email</span>
                                      </button>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleAction('archive', invoice.id)}
                                      >
                                        <i className="feather feather-archive me-3"></i>
                                        <span>Archive</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleAction('spam', invoice.id)}
                                      >
                                        <i className="feather feather-alert-octagon me-3"></i>
                                        <span>Report Spam</span>
                                      </button>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <button
                                        className="dropdown-item text-danger"
                                        onClick={() => handleAction('delete', invoice.id)}
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
    'Paid': 'check-circle',
    'Unpaid': 'clock',
    'Overdue': 'alert-triangle',
    'Draft': 'archive',
    'Declined': 'x-circle',
  };
  return icons[filter] || 'filter';
};