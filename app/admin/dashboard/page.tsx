'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Type definitions
interface Lead {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  proposal: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Not Interested';
}

interface ScheduleItem {
  id: number;
  date: number;
  month: string;
  title: string;
  time: string;
  bgColor: string;
  textColor: string;
  participants: {
    name: string;
    avatar?: string;
  }[];
}

interface ProjectStatus {
  id: number;
  brand: string;
  brandLogo: string;
  title: string;
  category: string;
  progress: number;
  progressColor: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  progress: number;
}

export default function DashboardPage() {
  const router = useRouter();
  
  // State management
  const [filterOptions, setFilterOptions] = useState({
    role: true,
    team: true,
    email: true,
    member: true,
    recommendation: true,
  });
  
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [projectStatusItems, setProjectStatusItems] = useState<ProjectStatus[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Stats data
  const [stats, setStats] = useState({
    invoicesAwaiting: { current: 45, total: 76, amount: '$5,569', percentage: 56, trend: 'up' },
    convertedLeads: { current: 48, total: 86, completed: 52, percentage: 63, trend: 'up' },
    projectsInProgress: { current: 16, total: 20, completed: 16, percentage: 78, trend: 'up' },
    conversionRate: { rate: 46.59, amount: '$2,254', percentage: 46, trend: 'down' },
  });

  // Payment records footer stats
  const [paymentStats, setPaymentStats] = useState({
    awaiting: { amount: '$5,486', percentage: 81 },
    completed: { amount: '$9,275', percentage: 82 },
    rejected: { amount: '$3,868', percentage: 68 },
    revenue: { amount: '$50,668', percentage: 75 },
  });

  // Total sales data
  const [totalSales, setTotalSales] = useState({
    amount: '30,569',
    trend: 12,
    items: [
      { brand: 'Shopify eCommerce Store', category: 'Development', amount: '$1200', projects: 6, logo: '/assets/images/brand/shopify.png' },
      { brand: 'iOS Apps Development', category: 'Development', amount: '$1450', projects: 3, logo: '/assets/images/brand/app-store.png' },
      { brand: 'Figma Dashboard Design', category: 'UI/UX Design', amount: '$1250', projects: 5, logo: '/assets/images/brand/figma.png' },
    ],
  });

  // Mini stats
  const [miniStats, setMiniStats] = useState({
    tasksCompleted: { current: 22, total: 35, trend: 28, trendText: 'more', trendColor: 'text-primary' },
    newTasks: { current: 5, total: 20, trend: 34, trendText: 'more', trendColor: 'text-success' },
    projectDone: { current: 20, total: 30, trend: 42, trendText: 'more', trendColor: 'text-danger' },
  });

  // Leads overview data
  const [leadsOverview, setLeadsOverview] = useState([
    { label: 'New', value: '20K', color: '#3454d1' },
    { label: 'Contacted', value: '15K', color: '#0d519e' },
    { label: 'Qualified', value: '10K', color: '#1976d2' },
    { label: 'Working', value: '18K', color: '#1e88e5' },
    { label: 'Customer', value: '10K', color: '#2196f3' },
    { label: 'Proposal', value: '15K', color: '#42a5f5' },
    { label: 'Leads', value: '16K', color: '#64b5f6' },
    { label: 'Progress', value: '14K', color: '#90caf9' },
    { label: 'Others', value: '10K', color: '#aad6fa' },
  ]);

  // Mock data initialization
  useEffect(() => {
    // Initialize leads
    const mockLeads: Lead[] = [
      {
        id: 1,
        name: 'Archie Cantones',
        email: 'arcie.tones@gmail.com',
        avatar: '/assets/images/avatar/2.png',
        proposal: 'Sent',
        date: '11/06/2023 10:53',
        status: 'Completed',
      },
      {
        id: 2,
        name: 'Holmes Cherryman',
        email: 'golms.chan@gmail.com',
        avatar: '/assets/images/avatar/3.png',
        proposal: 'New',
        date: '11/06/2023 10:53',
        status: 'In Progress',
      },
      {
        id: 3,
        name: 'Malanie Hanvey',
        email: 'lanie.nveyn@gmail.com',
        avatar: '/assets/images/avatar/4.png',
        proposal: 'Sent',
        date: '11/06/2023 10:53',
        status: 'Completed',
      },
      {
        id: 4,
        name: 'Kenneth Hune',
        email: 'nneth.une@gmail.com',
        avatar: '/assets/images/avatar/5.png',
        proposal: 'Returning',
        date: '11/06/2023 10:53',
        status: 'Not Interested',
      },
      {
        id: 5,
        name: 'Valentine Maton',
        email: 'alenine.aton@gmail.com',
        avatar: '/assets/images/avatar/6.png',
        proposal: 'Sent',
        date: '11/06/2023 10:53',
        status: 'Completed',
      },
    ];

    // Initialize schedule items
    const mockSchedule: ScheduleItem[] = [
      {
        id: 1,
        date: 20,
        month: 'Dec',
        title: 'React Dashboard Design',
        time: '11:30am - 12:30pm',
        bgColor: 'bg-soft-primary',
        textColor: 'text-primary',
        participants: [
          { name: 'Janette Dalton', avatar: '/assets/images/avatar/2.png' },
          { name: 'Michael Ksen', avatar: '/assets/images/avatar/3.png' },
          { name: 'Socrates Itumay', avatar: '/assets/images/avatar/4.png' },
          { name: 'Marianne Audrey', avatar: '/assets/images/avatar/6.png' },
        ],
      },
      {
        id: 2,
        date: 30,
        month: 'Dec',
        title: 'Admin Design Concept',
        time: '10:00am - 12:00pm',
        bgColor: 'bg-soft-warning',
        textColor: 'text-warning',
        participants: [
          { name: 'Janette Dalton', avatar: '/assets/images/avatar/2.png' },
          { name: 'Michael Ksen', avatar: '/assets/images/avatar/3.png' },
          { name: 'Marianne Audrey', avatar: '/assets/images/avatar/5.png' },
          { name: 'Marianne Audrey', avatar: '/assets/images/avatar/6.png' },
        ],
      },
      {
        id: 3,
        date: 17,
        month: 'Dec',
        title: 'Standup Team Meeting',
        time: '8:00am - 9:00am',
        bgColor: 'bg-soft-success',
        textColor: 'text-success',
        participants: [
          { name: 'Janette Dalton', avatar: '/assets/images/avatar/2.png' },
          { name: 'Michael Ksen', avatar: '/assets/images/avatar/3.png' },
          { name: 'Socrates Itumay', avatar: '/assets/images/avatar/4.png' },
          { name: 'Marianne Audrey', avatar: '/assets/images/avatar/5.png' },
        ],
      },
      {
        id: 4,
        date: 25,
        month: 'Dec',
        title: 'Zoom Team Meeting',
        time: '03:30pm - 05:30pm',
        bgColor: 'bg-soft-danger',
        textColor: 'text-danger',
        participants: [
          { name: 'Janette Dalton', avatar: '/assets/images/avatar/2.png' },
          { name: 'Socrates Itumay', avatar: '/assets/images/avatar/4.png' },
          { name: 'Marianne Audrey', avatar: '/assets/images/avatar/5.png' },
          { name: 'Marianne Audrey', avatar: '/assets/images/avatar/6.png' },
        ],
      },
    ];

    // Initialize project status
    const mockProjects: ProjectStatus[] = [
      {
        id: 1,
        brand: 'Apps Development',
        brandLogo: '/assets/images/brand/app-store.png',
        title: 'Apps Development',
        category: 'Applications',
        progress: 54,
        progressColor: 'bg-danger',
      },
      {
        id: 2,
        brand: 'Dashboard Design',
        brandLogo: '/assets/images/brand/figma.png',
        title: 'Dashboard Design',
        category: 'App UI Kit',
        progress: 86,
        progressColor: 'bg-primary',
      },
      {
        id: 3,
        brand: 'Facebook Marketing',
        brandLogo: '/assets/images/brand/facebook.png',
        title: 'Facebook Marketing',
        category: 'Marketing',
        progress: 90,
        progressColor: 'bg-success',
      },
      {
        id: 4,
        brand: 'React Dashboard Github',
        brandLogo: '/assets/images/brand/github.png',
        title: 'React Dashboard Github',
        category: 'Dashboard',
        progress: 37,
        progressColor: 'bg-info',
      },
      {
        id: 5,
        brand: 'Paypal Payment Gateway',
        brandLogo: '/assets/images/brand/paypal.png',
        title: 'Paypal Payment Gateway',
        category: 'Payment',
        progress: 29,
        progressColor: 'bg-warning',
      },
    ];

    // Initialize team members
    const mockTeam: TeamMember[] = [
      {
        id: 1,
        name: 'Alexandra Della',
        role: 'Frontend Developer',
        avatar: '/assets/images/avatar/1.png',
        progress: 75,
      },
      {
        id: 2,
        name: 'Archie Cantones',
        role: 'UI/UX Designer',
        avatar: '/assets/images/avatar/2.png',
        progress: 68,
      },
      {
        id: 3,
        name: 'Malanie Hanvey',
        role: 'Backend Developer',
        avatar: '/assets/images/avatar/3.png',
        progress: 82,
      },
      {
        id: 4,
        name: 'Kenneth Hune',
        role: 'Digital Marketer',
        avatar: '/assets/images/avatar/4.png',
        progress: 63,
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setLeads(mockLeads);
      setScheduleItems(mockSchedule);
      setProjectStatusItems(mockProjects);
      setTeamMembers(mockTeam);
      setIsLoading(false);
    }, 500);
  }, []);

  // Handle filter option change
  const handleFilterChange = (option: keyof typeof filterOptions, checked: boolean) => {
    setFilterOptions(prev => ({ ...prev, [option]: checked }));
    // TODO: Apply actual filtering logic
    console.log(`Filter ${option} changed to:`, checked);
  };

  // Handle date range change
  const handleDateRangeChange = (start: Date, end: Date) => {
    setDateRange({ startDate: start, endDate: end });
    // TODO: Apply date range filtering
    console.log('Date range changed:', { start, end });
  };

  // Handle action menu click
  const handleAction = (action: string, itemId?: number) => {
    console.log(`Action ${action} triggered for item ${itemId || 'all'}`);
    // TODO: Implement action handlers
    // - Delete, Refresh, Expand for cards
    // - New, Event, Snoozed, Settings for dropdowns
  };

  // Handle view lead details
  const handleViewLead = (leadId: number) => {
    console.log('View lead details:', leadId);
    // TODO: Navigate to lead details page
    // router.push(`/admin/dashboard/leads/${leadId}`);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
    // TODO: Implement pagination logic
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return 'bg-soft-success text-success';
      case 'in progress':
        return 'bg-soft-primary text-primary';
      case 'not interested':
        return 'bg-soft-warning text-warning';
      default:
        return 'bg-soft-secondary text-secondary';
    }
  };

  // Get proposal badge styling
  const getProposalBadge = (proposal: string) => {
    return 'bg-gray-200 text-dark';
  };

  return (
    <main className="nxl-container">
      <div className="nxl-content">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-left d-flex align-items-center">
            <div className="page-header-title">
              <h5 className="m-b-10">Dashboard</h5>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
              <li className="breadcrumb-item">Dashboard</li>
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
                <div id="reportrange" className="reportrange-picker d-flex align-items-center">
                  <span className="reportrange-picker-field">
                    {dateRange.startDate.toLocaleDateString()} - {dateRange.endDate.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="dropdown filter-dropdown">
                  <a 
                    className="btn btn-md btn-light-brand" 
                    data-bs-toggle="dropdown" 
                    data-bs-offset="0, 10" 
                    data-bs-auto-close="outside"
                  >
                    <i className="feather-filter me-2"></i>
                    <span>Filter</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <div className="dropdown-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Role"
                          checked={filterOptions.role}
                          onChange={(e) => handleFilterChange('role', e.target.checked)}
                        />
                        <label className="custom-control-label c-pointer" htmlFor="Role">
                          Role
                        </label>
                      </div>
                    </div>
                    <div className="dropdown-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Team"
                          checked={filterOptions.team}
                          onChange={(e) => handleFilterChange('team', e.target.checked)}
                        />
                        <label className="custom-control-label c-pointer" htmlFor="Team">
                          Team
                        </label>
                      </div>
                    </div>
                    <div className="dropdown-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Email"
                          checked={filterOptions.email}
                          onChange={(e) => handleFilterChange('email', e.target.checked)}
                        />
                        <label className="custom-control-label c-pointer" htmlFor="Email">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="dropdown-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Member"
                          checked={filterOptions.member}
                          onChange={(e) => handleFilterChange('member', e.target.checked)}
                        />
                        <label className="custom-control-label c-pointer" htmlFor="Member">
                          Member
                        </label>
                      </div>
                    </div>
                    <div className="dropdown-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Recommendation"
                          checked={filterOptions.recommendation}
                          onChange={(e) => handleFilterChange('recommendation', e.target.checked)}
                        />
                        <label className="custom-control-label c-pointer" htmlFor="Recommendation">
                          Recommendation
                        </label>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <a href="javascript:void(0);" className="dropdown-item">
                      <i className="feather-plus me-3"></i>
                      <span>Create New</span>
                    </a>
                    <a href="javascript:void(0);" className="dropdown-item">
                      <i className="feather-filter me-3"></i>
                      <span>Manage Filter</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="d-md-none d-flex align-items-center">
              <a href="javascript:void(0)" className="page-header-right-open-toggle">
                <i className="feather-align-right fs-20"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="main-content">
          <div className="row">
            {/* Invoices Awaiting Payment */}
            <div className="col-xxl-3 col-md-6">
              <div className="card stretch stretch-full">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between mb-4">
                    <div className="d-flex gap-4 align-items-center">
                      <div className="avatar-text avatar-lg bg-gray-200">
                        <i className="feather-dollar-sign"></i>
                      </div>
                      <div>
                        <div className="fs-4 fw-bold text-dark">
                          <span className="counter">{stats.invoicesAwaiting.current}</span>/
                          <span className="counter">{stats.invoicesAwaiting.total}</span>
                        </div>
                        <h3 className="fs-13 fw-semibold text-truncate-1-line">
                          Invoices Awaiting Payment
                        </h3>
                      </div>
                    </div>
                    <a href="javascript:void(0);" className="">
                      <i className="feather-more-vertical"></i>
                    </a>
                  </div>
                  <div className="pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" className="fs-12 fw-medium text-muted text-truncate-1-line">
                        Invoices Awaiting
                      </a>
                      <div className="w-100 text-end">
                        <span className="fs-12 text-dark">{stats.invoicesAwaiting.amount}</span>
                        <span className="fs-11 text-muted">({stats.invoicesAwaiting.percentage}%)</span>
                      </div>
                    </div>
                    <div className="progress mt-2 ht-3">
                      <div 
                        className="progress-bar bg-primary" 
                        role="progressbar" 
                        style={{ width: `${stats.invoicesAwaiting.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Converted Leads */}
            <div className="col-xxl-3 col-md-6">
              <div className="card stretch stretch-full">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between mb-4">
                    <div className="d-flex gap-4 align-items-center">
                      <div className="avatar-text avatar-lg bg-gray-200">
                        <i className="feather-cast"></i>
                      </div>
                      <div>
                        <div className="fs-4 fw-bold text-dark">
                          <span className="counter">{stats.convertedLeads.current}</span>/
                          <span className="counter">{stats.convertedLeads.total}</span>
                        </div>
                        <h3 className="fs-13 fw-semibold text-truncate-1-line">
                          Converted Leads
                        </h3>
                      </div>
                    </div>
                    <a href="javascript:void(0);" className="">
                      <i className="feather-more-vertical"></i>
                    </a>
                  </div>
                  <div className="pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" className="fs-12 fw-medium text-muted text-truncate-1-line">
                        Converted Leads
                      </a>
                      <div className="w-100 text-end">
                        <span className="fs-12 text-dark">{stats.convertedLeads.completed} Completed</span>
                        <span className="fs-11 text-muted">({stats.convertedLeads.percentage}%)</span>
                      </div>
                    </div>
                    <div className="progress mt-2 ht-3">
                      <div 
                        className="progress-bar bg-warning" 
                        role="progressbar" 
                        style={{ width: `${stats.convertedLeads.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Projects In Progress */}
            <div className="col-xxl-3 col-md-6">
              <div className="card stretch stretch-full">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between mb-4">
                    <div className="d-flex gap-4 align-items-center">
                      <div className="avatar-text avatar-lg bg-gray-200">
                        <i className="feather-briefcase"></i>
                      </div>
                      <div>
                        <div className="fs-4 fw-bold text-dark">
                          <span className="counter">{stats.projectsInProgress.current}</span>/
                          <span className="counter">{stats.projectsInProgress.total}</span>
                        </div>
                        <h3 className="fs-13 fw-semibold text-truncate-1-line">
                          Projects In Progress
                        </h3>
                      </div>
                    </div>
                    <a href="javascript:void(0);" className="">
                      <i className="feather-more-vertical"></i>
                    </a>
                  </div>
                  <div className="pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" className="fs-12 fw-medium text-muted text-truncate-1-line">
                        Projects In Progress
                      </a>
                      <div className="w-100 text-end">
                        <span className="fs-12 text-dark">{stats.projectsInProgress.completed} Completed</span>
                        <span className="fs-11 text-muted">({stats.projectsInProgress.percentage}%)</span>
                      </div>
                    </div>
                    <div className="progress mt-2 ht-3">
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: `${stats.projectsInProgress.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Conversion Rate */}
            <div className="col-xxl-3 col-md-6">
              <div className="card stretch stretch-full">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between mb-4">
                    <div className="d-flex gap-4 align-items-center">
                      <div className="avatar-text avatar-lg bg-gray-200">
                        <i className="feather-activity"></i>
                      </div>
                      <div>
                        <div className="fs-4 fw-bold text-dark">
                          <span className="counter">{stats.conversionRate.rate}</span>%
                        </div>
                        <h3 className="fs-13 fw-semibold text-truncate-1-line">
                          Conversion Rate
                        </h3>
                      </div>
                    </div>
                    <a href="javascript:void(0);" className="">
                      <i className="feather-more-vertical"></i>
                    </a>
                  </div>
                  <div className="pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" className="fs-12 fw-medium text-muted text-truncate-1-line">
                        Conversion Rate
                      </a>
                      <div className="w-100 text-end">
                        <span className="fs-12 text-dark">{stats.conversionRate.amount}</span>
                        <span className="fs-11 text-muted">({stats.conversionRate.percentage}%)</span>
                      </div>
                    </div>
                    <div className="progress mt-2 ht-3">
                      <div 
                        className="progress-bar bg-danger" 
                        role="progressbar" 
                        style={{ width: `${stats.conversionRate.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Records */}
            <div className="col-xxl-8">
              <div className="card stretch stretch-full">
                <div className="card-header">
                  <h5 className="card-title">Payment Record</h5>
                  <div className="card-header-action">
                    <div className="card-header-btn">
                      <div data-bs-toggle="tooltip" title="Delete">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-danger" 
                          onClick={() => handleAction('delete')}
                        >
                          <i className="feather-trash-2"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Refresh">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-warning" 
                          onClick={() => handleAction('refresh')}
                        >
                          <i className="feather-refresh-cw"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Maximize/Minimize">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-success" 
                          onClick={() => handleAction('expand')}
                        >
                          <i className="feather-maximize"></i>
                        </a>
                      </div>
                    </div>
                    <div className="dropdown">
                      <a 
                        href="javascript:void(0);" 
                        className="avatar-text avatar-sm" 
                        data-bs-toggle="dropdown" 
                        data-bs-offset="25, 25"
                      >
                        <div data-bs-toggle="tooltip" title="Options">
                          <i className="feather-more-vertical"></i>
                        </div>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-at-sign"></i>New
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-calendar"></i>Event
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-bell"></i>Snoozed
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-trash-2"></i>Deleted
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-settings"></i>Settings
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-life-buoy"></i>Tips & Tricks
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body custom-card-action p-0">
                  <div id="payment-records-chart" style={{ height: '300px' }}>
                    {/* Chart placeholder - implement with Chart.js or ApexCharts */}
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted">Payment Records Chart</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="row g-4">
                    <div className="col-lg-3">
                      <div className="p-3 border border-dashed rounded">
                        <div className="fs-12 text-muted mb-1">Awaiting</div>
                        <h6 className="fw-bold text-dark">{paymentStats.awaiting.amount}</h6>
                        <div className="progress mt-2 ht-3">
                          <div 
                            className="progress-bar bg-primary" 
                            role="progressbar" 
                            style={{ width: `${paymentStats.awaiting.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="p-3 border border-dashed rounded">
                        <div className="fs-12 text-muted mb-1">Completed</div>
                        <h6 className="fw-bold text-dark">{paymentStats.completed.amount}</h6>
                        <div className="progress mt-2 ht-3">
                          <div 
                            className="progress-bar bg-success" 
                            role="progressbar" 
                            style={{ width: `${paymentStats.completed.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="p-3 border border-dashed rounded">
                        <div className="fs-12 text-muted mb-1">Rejected</div>
                        <h6 className="fw-bold text-dark">{paymentStats.rejected.amount}</h6>
                        <div className="progress mt-2 ht-3">
                          <div 
                            className="progress-bar bg-danger" 
                            role="progressbar" 
                            style={{ width: `${paymentStats.rejected.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="p-3 border border-dashed rounded">
                        <div className="fs-12 text-muted mb-1">Revenue</div>
                        <h6 className="fw-bold text-dark">{paymentStats.revenue.amount}</h6>
                        <div className="progress mt-2 ht-3">
                          <div 
                            className="progress-bar bg-dark" 
                            role="progressbar" 
                            style={{ width: `${paymentStats.revenue.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Sales */}
            <div className="col-xxl-4">
              <div className="card stretch stretch-full overflow-hidden">
                <div className="bg-primary text-white">
                  <div className="p-4">
                    <span className="badge bg-light text-primary text-dark float-end">
                      {totalSales.trend}%
                    </span>
                    <div className="text-start">
                      <h4 className="text-reset">{totalSales.amount}</h4>
                      <p className="text-reset m-0">Total Sales</p>
                    </div>
                  </div>
                  <div id="total-sales-color-graph" style={{ height: '150px' }}>
                    {/* Chart placeholder */}
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <p className="text-white-50">Sales Chart</p>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {totalSales.items.map((item, index) => (
                    <div key={index} className={index < totalSales.items.length - 1 ? 'mb-3 pb-3 border-bottom border-dashed' : ''}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="hstack gap-3">
                          <div className="avatar-image avatar-lg p-2 rounded">
                            <img className="img-fluid" src={item.logo} alt={item.brand} />
                          </div>
                          <div>
                            <a href="javascript:void(0);" className="d-block">
                              {item.brand}
                            </a>
                            <span className="fs-12 text-muted">{item.category}</span>
                          </div>
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{item.amount}</div>
                          <div className="fs-12 text-end">{item.projects} Projects</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="javascript:void(0);" className="card-footer fs-11 fw-bold text-uppercase text-center py-4">
                  Full Details
                </a>
              </div>
            </div>

            {/* Mini Stats */}
            <div className="col-lg-4">
              <div className="card mb-4 stretch stretch-full">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="avatar-text">
                      <i className="feather feather-star"></i>
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">Tasks Completed</div>
                      <div className="fs-12 text-muted">
                        {miniStats.tasksCompleted.current}/{miniStats.tasksCompleted.total} completed
                      </div>
                    </div>
                  </div>
                  <div className="fs-4 fw-bold text-dark">
                    {miniStats.tasksCompleted.current}/{miniStats.tasksCompleted.total}
                  </div>
                </div>
                <div className="card-body d-flex align-items-center justify-content-between gap-4">
                  <div id="task-completed-area-chart" style={{ width: '100%', height: '60px' }}>
                    {/* Chart placeholder */}
                  </div>
                  <div className="fs-12 text-muted text-nowrap">
                    <span className={`fw-semibold ${miniStats.tasksCompleted.trendColor}`}>
                      {miniStats.tasksCompleted.trend}% {miniStats.tasksCompleted.trendText}
                    </span>
                    <br />
                    <span>from last week</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card mb-4 stretch stretch-full">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="avatar-text">
                      <i className="feather feather-file-text"></i>
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">New Tasks</div>
                      <div className="fs-12 text-muted">
                        0/{miniStats.newTasks.total} tasks
                      </div>
                    </div>
                  </div>
                  <div className="fs-4 fw-bold text-dark">
                    {miniStats.newTasks.current}/{miniStats.newTasks.total}
                  </div>
                </div>
                <div className="card-body d-flex align-items-center justify-content-between gap-4">
                  <div id="new-tasks-area-chart" style={{ width: '100%', height: '60px' }}>
                    {/* Chart placeholder */}
                  </div>
                  <div className="fs-12 text-muted text-nowrap">
                    <span className={`fw-semibold ${miniStats.newTasks.trendColor}`}>
                      {miniStats.newTasks.trend}% {miniStats.newTasks.trendText}
                    </span>
                    <br />
                    <span>from last week</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card mb-4 stretch stretch-full">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="avatar-text">
                      <i className="feather feather-airplay"></i>
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">Project Done</div>
                      <div className="fs-12 text-muted">
                        {miniStats.projectDone.current}/{miniStats.projectDone.total} project
                      </div>
                    </div>
                  </div>
                  <div className="fs-4 fw-bold text-dark">
                    {miniStats.projectDone.current}/{miniStats.projectDone.total}
                  </div>
                </div>
                <div className="card-body d-flex align-items-center justify-content-between gap-4">
                  <div id="project-done-area-chart" style={{ width: '100%', height: '60px' }}>
                    {/* Chart placeholder */}
                  </div>
                  <div className="fs-12 text-muted text-nowrap">
                    <span className={`fw-semibold ${miniStats.projectDone.trendColor}`}>
                      {miniStats.projectDone.trend}% {miniStats.projectDone.trendText}
                    </span>
                    <br />
                    <span>from last week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Leads Overview */}
            <div className="col-xxl-4">
              <div className="card stretch stretch-full">
                <div className="card-header">
                  <h5 className="card-title">Leads Overview</h5>
                  <div className="card-header-action">
                    <div className="card-header-btn">
                      <div data-bs-toggle="tooltip" title="Delete">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-danger" 
                          onClick={() => handleAction('delete')}
                        >
                          <i className="feather-trash-2"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Refresh">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-warning" 
                          onClick={() => handleAction('refresh')}
                        >
                          <i className="feather-refresh-cw"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Maximize/Minimize">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-success" 
                          onClick={() => handleAction('expand')}
                        >
                          <i className="feather-maximize"></i>
                        </a>
                      </div>
                    </div>
                    <div className="dropdown">
                      <a 
                        href="javascript:void(0);" 
                        className="avatar-text avatar-sm" 
                        data-bs-toggle="dropdown" 
                        data-bs-offset="25, 25"
                      >
                        <div data-bs-toggle="tooltip" title="Options">
                          <i className="feather-more-vertical"></i>
                        </div>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-at-sign"></i>New
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-calendar"></i>Event
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-bell"></i>Snoozed
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-trash-2"></i>Deleted
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-settings"></i>Settings
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-life-buoy"></i>Tips & Tricks
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body custom-card-action">
                  <div id="leads-overview-donut" style={{ height: '250px' }}>
                    {/* Chart placeholder */}
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted">Leads Overview Chart</p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-2 mt-3">
                    {leadsOverview.map((item, index) => (
                      <div key={index} className="col-4">
                        <a 
                          href="javascript:void(0);" 
                          className="p-2 hstack gap-2 rounded border border-dashed border-gray-5"
                        >
                          <span 
                            className="wd-7 ht-7 rounded-circle d-inline-block" 
                            style={{ backgroundColor: item.color }}
                          ></span>
                          <span>
                            {item.label}
                            <span className="fs-10 text-muted ms-1">({item.value})</span>
                          </span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Leads */}
            <div className="col-xxl-8">
              <div className="card stretch stretch-full">
                <div className="card-header">
                  <h5 className="card-title">Latest Leads</h5>
                  <div className="card-header-action">
                    <div className="card-header-btn">
                      <div data-bs-toggle="tooltip" title="Delete">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-danger" 
                          onClick={() => handleAction('delete')}
                        >
                          <i className="feather-trash-2"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Refresh">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-warning" 
                          onClick={() => handleAction('refresh')}
                        >
                          <i className="feather-refresh-cw"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Maximize/Minimize">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-success" 
                          onClick={() => handleAction('expand')}
                        >
                          <i className="feather-maximize"></i>
                        </a>
                      </div>
                    </div>
                    <div className="dropdown">
                      <a 
                        href="javascript:void(0);" 
                        className="avatar-text avatar-sm" 
                        data-bs-toggle="dropdown" 
                        data-bs-offset="25, 25"
                      >
                        <div data-bs-toggle="tooltip" title="Options">
                          <i className="feather-more-vertical"></i>
                        </div>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-at-sign"></i>New
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-calendar"></i>Event
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-bell"></i>Snoozed
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-trash-2"></i>Deleted
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-settings"></i>Settings
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-life-buoy"></i>Tips & Tricks
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body custom-card-action p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr className="border-b">
                          <th scope="row">Users</th>
                          <th>Proposal</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan={5} className="text-center py-5">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          leads.map((lead) => (
                            <tr key={lead.id}>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <div className="avatar-image">
                                    <img src={lead.avatar} alt={lead.name} className="img-fluid" />
                                  </div>
                                  <a href="javascript:void(0);" onClick={() => handleViewLead(lead.id)}>
                                    <span className="d-block">{lead.name}</span>
                                    <span className="fs-12 d-block fw-normal text-muted">
                                      {lead.email}
                                    </span>
                                  </a>
                                </div>
                              </td>
                              <td>
                                <span className={`badge ${getProposalBadge(lead.proposal)}`}>
                                  {lead.proposal}
                                </span>
                              </td>
                              <td>{lead.date}</td>
                              <td>
                                <span className={`badge ${getStatusBadge(lead.status)}`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="text-end">
                                <div className="dropdown">
                                  <a 
                                    href="javascript:void(0);" 
                                    className="text-dark" 
                                    data-bs-toggle="dropdown"
                                  >
                                    <i className="feather-more-vertical"></i>
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <button className="dropdown-item" onClick={() => handleViewLead(lead.id)}>
                                        <i className="feather-eye me-3"></i>
                                        <span>View</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="dropdown-item">
                                        <i className="feather-edit-3 me-3"></i>
                                        <span>Edit</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="dropdown-item text-danger">
                                        <i className="feather-trash-2 me-3"></i>
                                        <span>Delete</span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <ul className="list-unstyled d-flex align-items-center gap-2 mb-0 pagination-common-style">
                    <li>
                      <a href="javascript:void(0);" onClick={() => handlePageChange(1)}>
                        <i className="bi bi-arrow-left"></i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="active" onClick={() => handlePageChange(1)}>
                        1
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" onClick={() => handlePageChange(2)}>
                        2
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i className="bi bi-dot"></i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" onClick={() => handlePageChange(8)}>
                        8
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" onClick={() => handlePageChange(9)}>
                        9
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" onClick={() => handlePageChange(2)}>
                        <i className="bi bi-arrow-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div className="col-xxl-4">
              <div className="card stretch stretch-full">
                <div className="card-header">
                  <h5 className="card-title">Upcoming Schedule</h5>
                  <div className="card-header-action">
                    <div className="card-header-btn">
                      <div data-bs-toggle="tooltip" title="Delete">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-danger" 
                          onClick={() => handleAction('delete')}
                        >
                          <i className="feather-trash-2"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Refresh">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-warning" 
                          onClick={() => handleAction('refresh')}
                        >
                          <i className="feather-refresh-cw"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Maximize/Minimize">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-success" 
                          onClick={() => handleAction('expand')}
                        >
                          <i className="feather-maximize"></i>
                        </a>
                      </div>
                    </div>
                    <div className="dropdown">
                      <a 
                        href="javascript:void(0);" 
                        className="avatar-text avatar-sm" 
                        data-bs-toggle="dropdown" 
                        data-bs-offset="25, 25"
                      >
                        <div data-bs-toggle="tooltip" title="Options">
                          <i className="feather-more-vertical"></i>
                        </div>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-at-sign"></i>New
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-calendar"></i>Event
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-bell"></i>Snoozed
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-trash-2"></i>Deleted
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-settings"></i>Settings
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-life-buoy"></i>Tips & Tricks
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {scheduleItems.map((item) => (
                    <div key={item.id} className="p-3 border border-dashed rounded-3 mb-3">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <div className={`wd-50 ht-50 ${item.bgColor} ${item.textColor} lh-1 d-flex align-items-center justify-content-center flex-column rounded-2 schedule-date`}>
                            <span className="fs-18 fw-bold mb-1 d-block">{item.date}</span>
                            <span className="fs-10 fw-semibold text-uppercase d-block">
                              {item.month}
                            </span>
                          </div>
                          <div className="text-dark">
                            <a href="javascript:void(0);" className="fw-bold mb-2 text-truncate-1-line">
                              {item.title}
                            </a>
                            <span className="fs-11 fw-normal text-muted text-truncate-1-line">
                              {item.time}
                            </span>
                          </div>
                        </div>
                        <div className="img-group lh-0 ms-3 justify-content-start d-none d-sm-flex">
                          {item.participants.slice(0, 4).map((participant, idx) => (
                            <a
                              key={idx}
                              href="javascript:void(0)"
                              className="avatar-image avatar-md"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              title={participant.name}
                            >
                              <img src={participant.avatar} className="img-fluid" alt={participant.name} />
                            </a>
                          ))}
                          {item.participants.length > 4 && (
                            <a
                              href="javascript:void(0)"
                              className="avatar-text avatar-md"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              title="Explorer More"
                            >
                              <i className="feather-more-horizontal"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="javascript:void(0);" className="card-footer fs-11 fw-bold text-uppercase text-center py-4">
                  Upcoming Schedule
                </a>
              </div>
            </div>

            {/* Project Status */}
            <div className="col-xxl-4">
              <div className="card stretch stretch-full">
                <div className="card-header">
                  <h5 className="card-title">Project Status</h5>
                  <div className="card-header-action">
                    <div className="card-header-btn">
                      <div data-bs-toggle="tooltip" title="Delete">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-danger" 
                          onClick={() => handleAction('delete')}
                        >
                          <i className="feather-trash-2"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Refresh">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-warning" 
                          onClick={() => handleAction('refresh')}
                        >
                          <i className="feather-refresh-cw"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Maximize/Minimize">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-success" 
                          onClick={() => handleAction('expand')}
                        >
                          <i className="feather-maximize"></i>
                        </a>
                      </div>
                    </div>
                    <div className="dropdown">
                      <a 
                        href="javascript:void(0);" 
                        className="avatar-text avatar-sm" 
                        data-bs-toggle="dropdown" 
                        data-bs-offset="25, 25"
                      >
                        <div data-bs-toggle="tooltip" title="Options">
                          <i className="feather-more-vertical"></i>
                        </div>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-at-sign"></i>New
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-calendar"></i>Event
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-bell"></i>Snoozed
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-trash-2"></i>Deleted
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-settings"></i>Settings
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-life-buoy"></i>Tips & Tricks
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body custom-card-action">
                  {projectStatusItems.map((project, index) => (
                    <div key={project.id} className={index < projectStatusItems.length - 1 ? 'mb-4 pb-1 d-flex border-bottom border-dashed' : 'd-flex'}>
                      <div className="d-flex w-50 align-items-center me-3">
                        <img src={project.brandLogo} alt={project.brand} className="me-3" width="35" />
                        <div>
                          <a href="javascript:void(0);" className="text-truncate-1-line">
                            {project.title}
                          </a>
                          <div className="fs-11 text-muted">{project.category}</div>
                        </div>
                      </div>
                      <div className="d-flex flex-grow-1 align-items-center">
                        <div className="progress w-100 me-3 ht-5">
                          <div 
                            className={`progress-bar ${project.progressColor}`} 
                            role="progressbar" 
                            style={{ width: `${project.progress}%` }}
                            aria-valuenow={project.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                        <span className="text-muted">{project.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="javascript:void(0);" className="card-footer fs-11 fw-bold text-uppercase text-center">
                  Upcoming Projects
                </a>
              </div>
            </div>

            {/* Team Progress */}
            <div className="col-xxl-4">
              <div className="card stretch stretch-full">
                <div className="card-header">
                  <h5 className="card-title">Team Progress</h5>
                  <div className="card-header-action">
                    <div className="card-header-btn">
                      <div data-bs-toggle="tooltip" title="Delete">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-danger" 
                          onClick={() => handleAction('delete')}
                        >
                          <i className="feather-trash-2"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Refresh">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-warning" 
                          onClick={() => handleAction('refresh')}
                        >
                          <i className="feather-refresh-cw"></i>
                        </a>
                      </div>
                      <div data-bs-toggle="tooltip" title="Maximize/Minimize">
                        <a 
                          href="javascript:void(0);" 
                          className="avatar-text avatar-xs bg-success" 
                          onClick={() => handleAction('expand')}
                        >
                          <i className="feather-maximize"></i>
                        </a>
                      </div>
                    </div>
                    <div className="dropdown">
                      <a 
                        href="javascript:void(0);" 
                        className="avatar-text avatar-sm" 
                        data-bs-toggle="dropdown" 
                        data-bs-offset="25, 25"
                      >
                        <div data-bs-toggle="tooltip" title="Options">
                          <i className="feather-more-vertical"></i>
                        </div>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-at-sign"></i>New
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-calendar"></i>Event
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-bell"></i>Snoozed
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-trash-2"></i>Deleted
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-settings"></i>Settings
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item">
                          <i className="feather-life-buoy"></i>Tips & Tricks
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body custom-card-action">
                  {teamMembers.map((member, index) => (
                    <div 
                      key={member.id} 
                      className={`hstack justify-content-between border border-dashed rounded-3 p-3 ${index < teamMembers.length - 1 ? 'mb-3' : ''}`}
                    >
                      <div className="hstack gap-3">
                        <div className="avatar-image">
                          <img src={member.avatar} alt={member.name} className="img-fluid" />
                        </div>
                        <div>
                          <a href="javascript:void(0);">{member.name}</a>
                          <div className="fs-11 text-muted">{member.role}</div>
                        </div>
                      </div>
                      <div className="progress w-50 ht-6">
                        <div 
                          className="progress-bar bg-primary" 
                          role="progressbar" 
                          style={{ width: `${member.progress}%` }}
                          aria-valuenow={member.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="javascript:void(0);" className="card-footer fs-11 fw-bold text-uppercase text-center">
                  Update 30 Min Ago
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}