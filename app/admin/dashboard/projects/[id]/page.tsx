'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Type definitions
interface ProjectMember {
  id: number;
  name: string;
  avatar: string;
}

interface Project {
  id: string;
  name: string;
  status: 'In Progress' | 'Completed' | 'On Hold' | 'Cancelled';
  description: string;
  billingType: string;
  customer: string;
  startDate: string;
  endDate: string;
  hourlyRate: string;
  loggedHours: string;
  tasksCompleted: number;
  tasksTotal: number;
  members: ProjectMember[];
  relatedProjects: {
    id: string;
    name: string;
    assignedTo: string;
  }[];
}

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;

  // State management
  const [activeTab, setActiveTab] = useState('overviewTab');
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stats data
  const [stats, setStats] = useState({
    loggedHours: '00:00',
    totalBilled: '00:00',
    billableHours: '00:00',
    billedHours: '00:00',
    unbilledHours: '00:00',
    openTasks: { current: 16, total: 25, percentage: 78 },
    daysLeft: { current: 25, total: 25, percentage: 100 },
  });

  // Mock data - replace with API call
  useEffect(() => {
    const mockProject: Project = {
      id: projectId || '1',
      name: 'Duralux || CRM Applications & Admin Dashboard',
      status: 'In Progress',
      description: `
        CRM (Customer Relationship Management) applications are software tools that help organizations manage 
        interactions with their customers, streamline sales and marketing activities, and improve overall customer 
        satisfaction. There are many different CRM applications available, ranging from simple contact management 
        tools to more sophisticated platforms that integrate with other business systems.
        
        <strong>Some of the common features of CRM applications include:</strong>
        <ul>
          <li>Contact Management: Allows organizations to store and manage customer data, including names, addresses, 
              phone numbers, and email addresses.</li>
          <li>Sales Management: Helps organizations manage their sales pipeline, track leads and deals, and analyze 
              sales performance.</li>
          <li>Marketing Automation: Helps organizations automate their marketing processes, including email marketing, 
              social media campaigns, and lead generation.</li>
          <li>Customer Service and Support: Allows organizations to track and manage customer service requests and 
              provide support to customers via various channels.</li>
          <li>Analytics and Reporting: Provides insights into customer behavior, sales trends, and other key metrics 
              that help organizations make data-driven decisions.</li>
        </ul>
        Some popular CRM applications include Salesforce, Microsoft Dynamics 365, HubSpot, Zoho CRM, and Freshsales. 
        The choice of CRM application depends on an organization's specific needs and budget.
      `,
      billingType: 'Project Hours',
      customer: 'Green Cute',
      startDate: '2023-02-25',
      endDate: '2023-03-20',
      hourlyRate: '$25.00',
      loggedHours: '00:00:00',
      tasksCompleted: 16,
      tasksTotal: 25,
      members: [
        { id: 1, name: 'Janette Dalton', avatar: '/assets/images/avatar/2.png' },
        { id: 2, name: 'Michael Ksen', avatar: '/assets/images/avatar/3.png' },
        { id: 3, name: 'Socrates Itumay', avatar: '/assets/images/avatar/4.png' },
        { id: 4, name: 'Marianne Audrey', avatar: '/assets/images/avatar/5.png' },
        { id: 5, name: 'Marianne Audrey', avatar: '/assets/images/avatar/6.png' },
      ],
      relatedProjects: [
        { id: '01', name: 'CRM Applications', assignedTo: 'G.Cute' },
        { id: '02', name: 'Admin Dashboard', assignedTo: 'A.Cantones' },
        { id: '03', name: 'Webapps Applications', assignedTo: 'M.Hanvey' },
        { id: '04', name: 'Dashboard Redesign', assignedTo: 'K.Hune' },
        { id: '05', name: 'Applications Debugging', assignedTo: 'V.Maton' },
      ],
    };

    // Simulate API delay
    setTimeout(() => {
      setProject(mockProject);
      setIsLoading(false);
    }, 500);
  }, [projectId]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Handle action button click
  const handleAction = (action: string) => {
    console.log(`Action ${action} triggered`);
    // TODO: Implement action handlers
    // - Make as Complete
    // - Timesheets
    // - Statistics
    // - Start Timer
  };

  // Handle related project selection
  const handleRelatedProjectSelect = (projectId: string) => {
    console.log('Selected project:', projectId);
    // TODO: Implement project switching logic
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'in progress':
        return 'bg-soft-primary text-primary';
      case 'completed':
        return 'bg-soft-success text-success';
      case 'on hold':
        return 'bg-soft-warning text-warning';
      case 'cancelled':
        return 'bg-soft-danger text-danger';
      default:
        return 'bg-soft-secondary text-secondary';
    }
  };

  if (isLoading) {
    return (
      <main className="nxl-container">
        <div className="nxl-content">
          <div className="main-content">
            <div className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100vh - 200px)' }}>
              <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted">Loading project details...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="nxl-container">
        <div className="nxl-content">
          <div className="main-content">
            <div className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100vh - 200px)' }}>
              <div className="text-center">
                <h2 className="fs-16 fw-semibold">Project Not Found</h2>
                <p className="fs-12 text-muted">The requested project could not be found</p>
                <button 
                  type="button" 
                  className="btn btn-primary mt-3"
                  onClick={() => router.push('/admin/dashboard/projects')}
                >
                  Back to Projects
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
              <h5 className="m-b-10">Project Details</h5>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
              <li className="breadcrumb-item"><a href="/admin/dashboard/projects">Projects</a></li>
              <li className="breadcrumb-item">{project.name}</li>
            </ul>
          </div>
          
          <div className="page-header-right ms-auto">
            <div className="page-header-right-items">
              <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                <button 
                  type="button" 
                  className="btn btn-icon btn-light-brand"
                  onClick={() => router.push('/admin/dashboard/projects')}
                >
                  <i className="feather-arrow-left"></i>
                </button>
                
                <div className="dropdown">
                  <button 
                    className="btn btn-icon btn-light-brand" 
                    data-bs-toggle="dropdown" 
                    data-bs-offset="0, 10"
                  >
                    <i className="feather-more-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={() => console.log('Edit project')}>
                        <i className="feather-edit-3 me-3"></i>
                        <span>Edit</span>
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => window.print()}>
                        <i className="feather-printer me-3"></i>
                        <span>Print</span>
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => console.log('Duplicate')}>
                        <i className="feather-copy me-3"></i>
                        <span>Duplicate</span>
                      </button>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={() => console.log('Delete')}>
                        <i className="feather-trash-2 me-3"></i>
                        <span>Delete</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="row">
            <div className="col-lg-12">
              {/* Tab Navigation */}
              <div className="card stretch stretch-full">
                <div className="card-header p-0 border-bottom-0">
                  <ul className="nav nav-tabs tab-dark tab-white" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'overviewTab' ? 'active' : ''}`}
                        id="overview-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#overviewTab"
                        type="button"
                        role="tab"
                        aria-controls="overviewTab"
                        aria-selected={activeTab === 'overviewTab'}
                        onClick={() => handleTabChange('overviewTab')}
                      >
                        <i className="feather-home me-2"></i>
                        Overview
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'activityTab' ? 'active' : ''}`}
                        id="activity-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#activityTab"
                        type="button"
                        role="tab"
                        aria-controls="activityTab"
                        aria-selected={activeTab === 'activityTab'}
                        onClick={() => handleTabChange('activityTab')}
                      >
                        <i className="feather-activity me-2"></i>
                        Activity
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'timesheetsTab' ? 'active' : ''}`}
                        id="timesheets-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#timesheetsTab"
                        type="button"
                        role="tab"
                        aria-controls="timesheetsTab"
                        aria-selected={activeTab === 'timesheetsTab'}
                        onClick={() => handleTabChange('timesheetsTab')}
                      >
                        <i className="feather-clock me-2"></i>
                        Timesheets
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'milestonesTab' ? 'active' : ''}`}
                        id="milestones-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#milestonesTab"
                        type="button"
                        role="tab"
                        aria-controls="milestonesTab"
                        aria-selected={activeTab === 'milestonesTab'}
                        onClick={() => handleTabChange('milestonesTab')}
                      >
                        <i className="feather-flag me-2"></i>
                        Milestones
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'discussionsTab' ? 'active' : ''}`}
                        id="discussions-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#discussionsTab"
                        type="button"
                        role="tab"
                        aria-controls="discussionsTab"
                        aria-selected={activeTab === 'discussionsTab'}
                        onClick={() => handleTabChange('discussionsTab')}
                      >
                        <i className="feather-message-circle me-2"></i>
                        Discussions
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Overview Tab */}
            <div 
              className={`tab-pane fade ${activeTab === 'overviewTab' ? 'active show' : ''}`} 
              id="overviewTab"
              role="tabpanel"
              aria-labelledby="overview-tab"
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="card stretch stretch-full">
                    <div className="card-body task-header d-md-flex align-items-center justify-content-between">
                      <div className="me-4">
                        <h4 className="mb-4 fw-bold d-flex">
                          <span className="text-truncate-1-line">
                            {project.name}
                            <span className={`badge ${getStatusBadge(project.status)} mx-3`}>
                              {project.status}
                            </span>
                          </span>
                        </h4>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button 
                              className="btn btn-icon btn-light-brand dropdown-toggle" 
                              data-bs-toggle="dropdown" 
                              data-bs-offset="0, 10"
                            >
                              CRM Dashboard
                            </button>
                            <div className="dropdown-menu wd-300">
                              {project.relatedProjects.map((relatedProject) => (
                                <button
                                  key={relatedProject.id}
                                  className="dropdown-item"
                                  onClick={() => handleRelatedProjectSelect(relatedProject.id)}
                                >
                                  <span> #{relatedProject.id} - {relatedProject.name}</span>
                                  <span className="fs-12 fw-normal text-muted">
                                    - {relatedProject.assignedTo}
                                  </span>
                                </button>
                              ))}
                              <div className="dropdown-divider"></div>
                              <button className="dropdown-item">
                                <span> Explorer More Projects </span>
                              </button>
                            </div>
                          </div>
                          <span className="vr mx-3 text-muted"></span>
                          <div className="img-group lh-0 ms-2 justify-content-start">
                            {project.members.slice(0, 5).map((member) => (
                              <a
                                key={member.id}
                                href="javascript:void(0)"
                                className="avatar-image avatar-md"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                title={member.name}
                              >
                                <img 
                                  src={member.avatar} 
                                  className="img-fluid" 
                                  alt={member.name} 
                                />
                              </a>
                            ))}
                            {project.members.length > 5 && (
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
                            <span className="d-none d-sm-flex">
                              <span className="fs-12 text-muted ms-3 text-truncate-1-line">
                                {project.members.length}+ members
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 mt-md-0">
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-icon"
                            data-bs-toggle="tooltip"
                            title="Make as Complete"
                            onClick={() => handleAction('complete')}
                          >
                            <i className="feather-check-circle"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-icon"
                            data-bs-toggle="tooltip"
                            title="Timesheets"
                            onClick={() => handleTabChange('timesheetsTab')}
                          >
                            <i className="feather-calendar"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-icon"
                            data-bs-toggle="tooltip"
                            title="Statistics"
                            onClick={() => handleAction('statistics')}
                          >
                            <i className="feather-bar-chart-2"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-success"
                            data-bs-toggle="tooltip"
                            title="Start Timer"
                            onClick={() => handleAction('startTimer')}
                          >
                            <i className="feather-clock me-2"></i>
                            <span>Start Timer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-8">
                  <div className="card stretch stretch-full">
                    <div className="card-header">
                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <a href="javascript:void(0);" className="fs-12 fw-medium text-muted">
                            <span className="text-truncate-1-line">
                              Projects In Progress <i className="feather-link-2 fs-10 ms-1"></i>
                            </span>
                          </a>
                          <div className="ms-3">
                            <span className="fs-12 text-muted text-truncate-1-line">
                              {project.tasksCompleted}/{project.tasksTotal} Tasks Completed{' '}
                              <span className="fs-11 text-muted">
                                ({Math.round((project.tasksCompleted / project.tasksTotal) * 100)}%)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="progress mt-2 ht-5">
                          <div 
                            className="progress-bar bg-primary" 
                            role="progressbar" 
                            style={{ width: `${(project.tasksCompleted / project.tasksTotal) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label className="form-label">Project</label>
                          <p>#01 - CRM Applications - G.Cute</p>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label">Billing Type</label>
                          <p>{project.billingType}</p>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label">Status</label>
                          <p>{project.status}</p>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label">Customer</label>
                          <p>{project.customer}</p>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label">Start Date</label>
                          <p>{project.startDate}</p>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label">End Date</label>
                          <p>{project.endDate}</p>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label">Hourly Rate</label>
                          <p>{project.hourlyRate}</p>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label">Logged Hours</label>
                          <p>{project.loggedHours}</p>
                        </div>
                        <div className="col-md-12">
                          <label className="form-label">Description</label>
                          <div 
                            dangerouslySetInnerHTML={{ __html: project.description }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="row">
                    <div className="col-xxl-6 col-xl-12 col-sm-6">
                      <div className="card stretch stretch-full">
                        <div className="card-body">
                          <div className="avatar-text bg-soft-primary text-primary border-0 mb-3">
                            <i className="feather-log-in"></i>
                          </div>
                          <p>
                            <span className="fw-bold text-primary">Logged Hours:</span>{' '}
                            {stats.loggedHours}
                          </p>
                          <div>
                            <span className="fw-bold text-dark">Total Billed:</span>{' '}
                            {stats.totalBilled}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-12 col-sm-6">
                      <div className="card stretch stretch-full">
                        <div className="card-body">
                          <div className="avatar-text bg-soft-warning text-warning border-0 mb-3">
                            <i className="feather-clipboard"></i>
                          </div>
                          <p>
                            <span className="fw-bold text-warning">Billable Hours:</span>{' '}
                            {stats.billableHours}
                          </p>
                          <div>
                            <span className="fw-bold text-dark">Total Billed:</span>{' '}
                            {stats.totalBilled}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-12 col-sm-6">
                      <div className="card stretch stretch-full">
                        <div className="card-body">
                          <div className="avatar-text bg-soft-success text-success border-0 mb-3">
                            <i className="feather-check"></i>
                          </div>
                          <p>
                            <span className="fw-bold text-success">Billed Hours:</span>{' '}
                            {stats.billedHours}
                          </p>
                          <div>
                            <span className="fw-bold text-dark">Total Billed:</span>{' '}
                            {stats.totalBilled}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-12 col-sm-6">
                      <div className="card stretch stretch-full">
                        <div className="card-body">
                          <div className="avatar-text bg-soft-danger text-danger border-0 mb-3">
                            <i className="feather-x"></i>
                          </div>
                          <p>
                            <span className="fw-bold text-danger">Unbilled Hour:</span>{' '}
                            {stats.unbilledHours}
                          </p>
                          <div>
                            <span className="fw-bold text-dark">Total Billed:</span>{' '}
                            {stats.totalBilled}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-12 col-md-6">
                      <div className="card stretch stretch-full">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="fw-semibold">
                              {stats.openTasks.current} / {stats.openTasks.total} Open Tasks
                            </div>
                            <i className="feather-check-circle text-warning"></i>
                          </div>
                          <div className="progress mt-2 ht-3">
                            <div 
                              className="progress-bar bg-warning" 
                              role="progressbar" 
                              style={{ width: `${stats.openTasks.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12 col-md-6">
                      <div className="card stretch stretch-full">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="fw-semibold">
                              {stats.daysLeft.current} / {stats.daysLeft.total} Days Left
                            </div>
                            <i className="feather-calendar text-success"></i>
                          </div>
                          <div className="progress mt-2 ht-3">
                            <div 
                              className="progress-bar bg-success" 
                              role="progressbar" 
                              style={{ width: `${stats.daysLeft.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card stretch stretch-full">
                    <div 
                      id="billed-area-chart" 
                      className="ht-300 d-flex align-items-center justify-content-center"
                    >
                      {/* Chart placeholder - implement with Chart.js or ApexCharts */}
                      <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted">Billed Hours Chart</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Tab */}
            <div 
              className={`tab-pane fade ${activeTab === 'activityTab' ? 'active show' : ''}`} 
              id="activityTab"
              role="tabpanel"
              aria-labelledby="activity-tab"
            >
              <div className="card stretch stretch-full">
                <div className="card-body">
                  <div 
                    className="d-flex align-items-center justify-content-center" 
                    style={{ height: 'calc(100vh - 315px)' }}
                  >
                    <div className="text-center">
                      <h2 className="fs-16 fw-semibold">No activity yet!</h2>
                      <p className="fs-12 text-muted">There is no activity on this project</p>
                      <button
                        type="button"
                        className="avatar-text bg-soft-primary text-primary mx-auto"
                        data-bs-toggle="tooltip"
                        title="Create Activity"
                        onClick={() => console.log('Create activity')}
                      >
                        <i className="feather-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timesheets Tab */}
            <div 
              className={`tab-pane fade ${activeTab === 'timesheetsTab' ? 'active show' : ''}`} 
              id="timesheetsTab"
              role="tabpanel"
              aria-labelledby="timesheets-tab"
            >
              <div className="card stretch stretch-full">
                <div className="card-body">
                  <div 
                    className="d-flex align-items-center justify-content-center" 
                    style={{ height: 'calc(100vh - 315px)' }}
                  >
                    <div className="text-center">
                      <h2 className="fs-16 fw-semibold">No timesheets yet!</h2>
                      <p className="fs-12 text-muted">There is no timesheets on this project</p>
                      <button
                        type="button"
                        className="avatar-text bg-soft-primary text-primary mx-auto"
                        data-bs-toggle="tooltip"
                        title="Create Timesheets"
                        onClick={() => console.log('Create timesheet')}
                      >
                        <i className="feather-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones Tab */}
            <div 
              className={`tab-pane fade ${activeTab === 'milestonesTab' ? 'active show' : ''}`} 
              id="milestonesTab"
              role="tabpanel"
              aria-labelledby="milestones-tab"
            >
              <div className="card stretch stretch-full">
                <div className="card-body">
                  <div 
                    className="d-flex align-items-center justify-content-center" 
                    style={{ height: 'calc(100vh - 315px)' }}
                  >
                    <div className="text-center">
                      <h2 className="fs-16 fw-semibold">No milestones yet!</h2>
                      <p className="fs-12 text-muted">There is no milestones on this project</p>
                      <button
                        type="button"
                        className="avatar-text bg-soft-primary text-primary mx-auto"
                        data-bs-toggle="tooltip"
                        title="Create Milestones"
                        onClick={() => console.log('Create milestone')}
                      >
                        <i className="feather-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussions Tab */}
            <div 
              className={`tab-pane fade ${activeTab === 'discussionsTab' ? 'active show' : ''}`} 
              id="discussionsTab"
              role="tabpanel"
              aria-labelledby="discussions-tab"
            >
              <div className="card stretch stretch-full">
                <div className="card-body">
                  <div 
                    className="d-flex align-items-center justify-content-center" 
                    style={{ height: 'calc(100vh - 315px)' }}
                  >
                    <div className="text-center">
                      <h2 className="fs-16 fw-semibold">No discussions yet!</h2>
                      <p className="fs-12 text-muted">There is no discussions on this project</p>
                      <button
                        type="button"
                        className="avatar-text bg-soft-primary text-primary mx-auto"
                        data-bs-toggle="tooltip"
                        title="Create Discussions"
                        onClick={() => console.log('Create discussion')}
                      >
                        <i className="feather-plus"></i>
                      </button>
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