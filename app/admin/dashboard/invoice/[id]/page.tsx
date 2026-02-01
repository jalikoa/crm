'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Type definitions
interface InvoiceItem {
  id: number;
  service: string;
  description: string;
  rate: number;
  quantity: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  dueDate: string;
  issuedDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';
  totalAmount: number;
  subtotal: number;
  discount: {
    code: string;
    percentage: number;
    amount: number;
  };
  tax: {
    rate: number;
    amount: number;
  };
  grandTotal: number;
  client: {
    name: string;
    address: string;
    vatNumber: string;
    country: string;
  };
  paymentDetails: {
    payoutStatus: string;
    cardHolder: string;
    paymentMethod: string;
  };
  items: InvoiceItem[];
  notes: string;
  terms: string[];
  company: {
    name: string;
    address: string;
    vatNumber: string;
    socialLinks: {
      platform: string;
      icon: string;
    }[];
  };
  signature: {
    image: string;
    name: string;
    title: string;
    date: string;
  };
}

export default function InvoicePreviewPage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params?.id as string;

  // State management
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState('Default');

  // Templates
  const templates = [
    'Default', 'Simple', 'Classic', 'Modern', 'Untimate', 'Essential'
  ];

  // Mock data - replace with API call
  useEffect(() => {
    const mockInvoice: Invoice = {
      id: invoiceId || 'NXL369852',
      invoiceNumber: '#NXL369852',
      dueDate: '28 Feb, 2023',
      issuedDate: '25 JAN, 2023',
      status: 'Pending',
      totalAmount: 249,
      subtotal: 2150.00,
      discount: {
        code: 'NXL2023',
        percentage: 15,
        amount: 567.00,
      },
      tax: {
        rate: 12.5,
        amount: 225.00,
      },
      grandTotal: 2065.00,
      client: {
        name: 'Ellen Louise Ripley',
        address: 'Nostromo PO Box 29618',
        vatNumber: '295 3932 6119',
        country: 'United Kingdom',
      },
      paymentDetails: {
        payoutStatus: 'Pending',
        cardHolder: 'Alexandra Della',
        paymentMethod: 'Mastercard',
      },
      items: [
        {
          id: 1,
          service: 'Adata',
          description: 'Modern & Minimal Multipurpose Bootstrap Admin Dashboard',
          rate: 50.00,
          quantity: 10,
          amount: 500.00,
        },
        {
          id: 2,
          service: 'Avesta',
          description: 'Multipurpose Bootstrap4 Admin Dashboard Template',
          rate: 120.00,
          quantity: 10,
          amount: 1200.00,
        },
        {
          id: 3,
          service: 'Metrical',
          description: 'Multipurpose Bootstrap4 Admin Dashboard Template',
          rate: 450.00,
          quantity: 1,
          amount: 450.00,
        },
        {
          id: 4,
          service: 'Avesta',
          description: 'Multipurpose Bootstrap4 Admin Dashboard Template',
          rate: 120.00,
          quantity: 10,
          amount: 1200.00,
        },
        {
          id: 5,
          service: 'Duralux',
          description: 'Admin Dashboard & Webapps Template',
          rate: 50.00,
          quantity: 10,
          amount: 500.00,
        },
      ],
      notes: `
        All accounts are to be paid within 7 days from receipt of invoice. 
        To be paid by cheque or credit card or direct payment online. 
        If account is not paid within 7 days the credits details supplied as confirmation 
        of work undertaken will be charged the agreed quoted fee noted above.
      `,
      terms: [
        'All accounts are to be paid within 7 days from receipt of invoice.',
        'To be paid by cheque or credit card or direct payment online.',
        'If account is not paid within 7 days the credits details supplied as confirmation.',
        'This is computer generated receipt and does not require physical signature.',
      ],
      company: {
        name: 'Duralux',
        address: 'P.O. Box 18728,\nDeLorean New York',
        vatNumber: 'VAT No: 2617 348 2752',
        socialLinks: [
          { platform: 'facebook', icon: 'feather-facebook' },
          { platform: 'twitter', icon: 'feather-twitter' },
          { platform: 'instagram', icon: 'feather-instagram' },
          { platform: 'linkedin', icon: 'feather-linkedin' },
          { platform: 'github', icon: 'feather-github' },
        ],
      },
      signature: {
        image: '/assets/images/general/signature.png',
        name: 'Account Manager',
        title: 'Account Manager',
        date: '26 MAY 2023, 10:35PM',
      },
    };

    // Simulate API delay
    setTimeout(() => {
      setInvoice(mockInvoice);
      setIsLoading(false);
    }, 500);
  }, [invoiceId]);

  // Handle action button click
  const handleAction = (action: string) => {
    console.log(`Action ${action} triggered for invoice ${invoiceId}`);
    
    switch (action) {
      case 'send':
        // TODO: Implement send invoice functionality
        alert('Send invoice - implement this feature');
        break;
      case 'print':
        window.print();
        break;
      case 'download':
        // TODO: Implement download functionality
        alert('Download invoice - implement this feature');
        break;
      case 'edit':
        router.push(`/admin/dashboard/invoice/create?edit=${invoiceId}`);
        break;
      case 'addPayment':
        // TODO: Implement add payment functionality
        alert('Add payment - implement this feature');
        break;
      default:
        break;
    }
  };

  // Handle template change
  const handleTemplateChange = (template: string) => {
    setActiveTemplate(template);
    console.log('Template changed to:', template);
    // TODO: Implement template switching logic
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'paid':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'overdue':
        return 'text-danger';
      case 'cancelled':
        return 'text-secondary';
      default:
        return 'text-muted';
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <main className="nxl-container">
        <div className="nxl-content">
          <div className="main-content container-lg">
            <div className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100vh - 200px)' }}>
              <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted">Loading invoice...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!invoice) {
    return (
      <main className="nxl-container">
        <div className="nxl-content">
          <div className="main-content container-lg">
            <div className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100vh - 200px)' }}>
              <div className="text-center">
                <h2 className="fs-16 fw-semibold">Invoice Not Found</h2>
                <p className="fs-12 text-muted">The requested invoice could not be found</p>
                <button 
                  type="button" 
                  className="btn btn-primary mt-3"
                  onClick={() => router.push('/admin/dashboard/payments')}
                >
                  Back to Invoices
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="nxl-container">
      <div className="nxl-content">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-left d-flex align-items-center">
            <div className="page-header-title">
              <h5 className="m-b-10">Invoice Preview</h5>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
              <li className="breadcrumb-item"><a href="/admin/dashboard/payments">Payments</a></li>
              <li className="breadcrumb-item">Invoice #{invoice.invoiceNumber}</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content container-lg">
          <div className="row">
            <div className="col-lg-12">
              <div className="card invoice-container">
                <div className="card-header">
                  <div>
                    <h2 className="fs-16 fw-700 text-truncate-1-line mb-0 mb-sm-1">
                      Invoice Preview
                    </h2>
                    <div className="dropdown d-none d-sm-block">
                      <button 
                        className="dropdown-toggle d-flex align-items-center btn btn-link p-0"
                        data-bs-toggle="dropdown" 
                        data-bs-offset="0,25" 
                        aria-expanded="false"
                      >
                        <span className="fs-11 fw-400 text-muted me-2">
                          Invoice Templates: <span className="text-dark fw-bold">{activeTemplate}</span>
                        </span>
                      </button>
                      <ul className="dropdown-menu">
                        {templates.map((template) => (
                          <li key={template}>
                            <button
                              className={`dropdown-item ${activeTemplate === template ? 'active' : ''}`}
                              onClick={() => handleTemplateChange(template)}
                            >
                              {template}
                            </button>
                          </li>
                        ))}
                        <li className="dropdown-divider"></li>
                        <li>
                          <button className="dropdown-item" onClick={() => console.log('Create template')}>
                            Create Template
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item text-danger" onClick={() => console.log('Delete template')}>
                            Delete Template
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      type="button"
                      className="d-flex me-1"
                      onClick={() => handleAction('send')}
                      title="Send Invoice"
                    >
                      <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Send Invoice">
                        <i className="feather feather-send"></i>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="d-flex me-1 printBTN"
                      onClick={() => handleAction('print')}
                      title="Print Invoice"
                    >
                      <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Print Invoice">
                        <i className="feather feather-printer"></i>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="d-flex me-1"
                      onClick={() => handleAction('addPayment')}
                      title="Add Payment"
                    >
                      <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Add Payment">
                        <i className="feather feather-dollar-sign"></i>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="d-flex me-1 file-download"
                      onClick={() => handleAction('download')}
                      title="Download Invoice"
                    >
                      <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Download Invoice">
                        <i className="feather feather-download"></i>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="d-flex me-1"
                      onClick={() => handleAction('edit')}
                      title="Edit Invoice"
                    >
                      <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Edit Invoice">
                        <i className="feather feather-edit"></i>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div className="card-body p-0">
                  {/* Header Section */}
                  <div className="px-4 pt-4">
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <div>
                        <div className="fs-24 fw-bolder font-montserrat-alt text-uppercase">
                          {invoice.company.name}
                        </div>
                        <address className="text-muted">
                          {invoice.company.address.split('\n').map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))}
                          {invoice.company.vatNumber}
                        </address>
                        <div className="d-flex gap-2">
                          {invoice.company.socialLinks.map((link) => (
                            <a
                              key={link.platform}
                              href="javascript:void(0);"
                              className="avatar-text avatar-sm"
                              title={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                            >
                              <i className={link.icon}></i>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="lh-lg pt-3 pt-sm-0">
                        <h2 className="fs-4 fw-bold text-primary">Invoice</h2>
                        <div>
                          <span className="fw-bold text-dark">Invoice:</span>
                          <span className="fw-bold text-primary">{invoice.invoiceNumber}</span>
                        </div>
                        <div>
                          <span className="fw-bold text-dark">Due Date:</span>
                          <span className="text-muted">{invoice.dueDate}</span>
                        </div>
                        <div>
                          <span className="fw-bold text-dark">Issued Date:</span>
                          <span className="text-muted">{invoice.issuedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-dashed" />
                  
                  {/* Client & Payment Details */}
                  <div className="px-4 py-sm-5">
                    <div className="d-sm-flex gap-4 justify-content-center">
                      <div className="text-sm-end">
                        <h2 className="fs-16 fw-bold text-dark mb-3">Invoiced To:</h2>
                        <address className="text-muted lh-lg">
                          {invoice.client.name}
                          <br />
                          {invoice.client.address}
                          <br />
                          {invoice.client.vatNumber}
                          <br />
                          {invoice.client.country}
                        </address>
                      </div>
                      <div className="border-end border-end-dashed border-gray-500 d-none d-sm-block"></div>
                      <div className="mt-4 mt-sm-0">
                        <h2 className="fs-16 fw-bold text-dark mb-3">Payment Details:</h2>
                        <div className="text-muted lh-lg">
                          <div>
                            <span className="text-muted">Total Due:</span>
                            <span className="fw-bold text-dark">
                              {formatCurrency(invoice.totalAmount)} USD
                            </span>
                          </div>
                          <div>
                            <span className="text-muted">Payout Status:</span>
                            <span className={`fw-bold ${getStatusBadge(invoice.status)}`}>
                              {invoice.status}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted">Card Holder:</span>
                            <span className="fw-bold text-dark">{invoice.paymentDetails.cardHolder}</span>
                          </div>
                          <div>
                            <span className="text-muted">Payment Method:</span>
                            <span className="fw-bold text-dark">{invoice.paymentDetails.paymentMethod}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-dashed mb-0" />
                  
                  {/* Invoice Items Table */}
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Service</th>
                          <th>Description</th>
                          <th>Rate</th>
                          <th>QTY</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <a href="javascript:void(0)">{item.service}</a>
                            </td>
                            <td>{item.description}</td>
                            <td>{formatCurrency(item.rate)}</td>
                            <td>{item.quantity}</td>
                            <td className="text-dark fw-semibold">{formatCurrency(item.amount)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={3}></td>
                          <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                            Sub Total
                          </td>
                          <td className="fw-bold text-dark bg-gray-100">
                            + {formatCurrency(invoice.subtotal)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}></td>
                          <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                            Discount ({invoice.discount.code} - {invoice.discount.percentage}%)
                          </td>
                          <td className="fw-bold text-success bg-gray-100">
                            - {formatCurrency(invoice.discount.amount)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}></td>
                          <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                            Estimated Tax ({invoice.tax.rate}%)
                          </td>
                          <td className="fw-bold text-dark bg-gray-100">
                            + {formatCurrency(invoice.tax.amount)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}></td>
                          <td className="fw-semibold text-dark bg-gray-100 text-lg-end">
                            Grand Amount
                          </td>
                          <td className="fw-bolder text-dark bg-gray-100">
                            = {formatCurrency(invoice.grandTotal)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <hr className="border-dashed mt-0" />
                  
                  {/* Notes Section */}
                  <div className="px-4">
                    <div className="alert alert-dismissible p-4 mt-3 alert-soft-warning-message" role="alert">
                      <button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="alert" 
                        aria-label="Close"
                      ></button>
                      <p className="mb-0">
                        <strong>NOTES:</strong>{' '}
                        {invoice.notes}
                      </p>
                    </div>
                  </div>
                  
                  {/* Terms & Signature */}
                  <div className="px-4 pt-4 d-sm-flex align-items-center justify-content-between">
                    <div className="mb-5 mb-sm-0">
                      <h6 className="fs-13 fw-bold mb-3">Terms & Condition:</h6>
                      <ul className="list-unstyled lh-lg fs-12">
                        {invoice.terms.map((term, index) => (
                          <li key={index}>{term}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-center">
                      <img 
                        src={invoice.signature.image} 
                        className="img-fluid wd-100" 
                        alt="Signature" 
                      />
                      <h6 className="fs-13 fw-bold mt-2">{invoice.signature.title}</h6>
                      <p className="fs-11 fw-semibold text-muted">{invoice.signature.date}</p>
                    </div>
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