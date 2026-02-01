'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Type definitions
interface Customer {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  initial?: string;
  bgColor?: string;
  textColor?: string;
}

interface AssignedUser {
  id: number;
  email: string;
  name: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  brandLogo: string;
  customer: Customer;
  startDate: string;
  endDate: string;
  assignedUserId: number;
  status: 'In Progress' | 'Not Started' | 'On Hold' | 'Declined' | 'Finished';
  assignedUsers: AssignedUser[];
}

export default function ProjectsPage() {
  const router = useRouter();
  
  // State management
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filter, setFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  
  // Stats data
  const [stats, setStats] = useState({
    total: { count: 120, trend: 15, trendText: 'more' },
    inProgress: { count: 45, percentage: 38 },
    completed: { count: 58, percentage: 48 },
    pending: { count: 17, percentage: 14 },
  });

  // Mock data - replace with API call
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: 1,
        name: 'Spark: This name could work well for a project related to innovation, creativity, or inspiration.',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        brandLogo: '/assets/images/brand/app-store.png',
        customer: {
          id: 1,
          name: 'Alexandra Della',
          email: 'alex@example.com',
          avatar: '/assets/images/avatar/1.png',
        },
        startDate: '2023-04-05',
        endDate: '2023-04-10',
        assignedUserId: 9,
        status: 'In Progress',
        assignedUsers: [
          { id: 1, email: 'alex@outlook.com', name: 'Alex' },
          { id: 2, email: 'john.deo@outlook.com', name: 'John Deo' },
          { id: 3, email: 'green.cutte@outlook.com', name: 'Green Cutte' },
          { id: 4, email: 'nancy.elliot@outlook.com', name: 'Nancy Elliot' },
          { id: 5, email: 'mar.audrey@gmail.com', name: 'Mar Audrey' },
          { id: 6, email: 'erna.serpa@outlook.com', name: 'Erna Serpa' },
          { id: 9, email: 'mar.audrey@gmail.com', name: 'Mar Audrey' },
        ],
      },
      {
        id: 2,
        name: 'Nexus: This name could work well for a project related to connectivity, bringing different people or ideas together, or solving complex problems.',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        brandLogo: '/assets/images/brand/dropbox.png',
        customer: {
          id: 2,
          name: 'Nancy Elliot',
          email: 'nancy.elliot@outlook.com',
          initial: 'N',
          bgColor: 'bg-warning',
          textColor: 'text-white',
        },
        startDate: '2023-04-02',
        endDate: '2023-04-06',
        assignedUserId: 8,
        status: 'Not Started',
        assignedUsers: [
          { id: 1, email: 'alex@outlook.com', name: 'Alex' },
          { id: 2, email: 'john.deo@outlook.com', name: 'John Deo' },
          { id: 8, email: 'nancy.elliot@outlook.com', name: 'Nancy Elliot' },
        ],
      },
      {
        id: 3,
        name: 'Velocity: This name could work well for a project related to speed, efficiency, or productivity.',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        brandLogo: '/assets/images/brand/facebook.png',
        customer: {
          id: 3,
          name: 'Green Cute',
          email: 'green.cute@outlook.com',
          avatar: '/assets/images/avatar/2.png',
        },
        startDate: '2023-04-12',
        endDate: '2023-04-15',
        assignedUserId: 7,
        status: 'On Hold',
        assignedUsers: [
          { id: 3, email: 'green.cutte@outlook.com', name: 'Green Cutte' },
          { id: 7, email: 'green.cutte@outlook.com', name: 'Green Cutte' },
        ],
      },
      {
        id: 4,
        name: 'Catalyst: This name could work well for a project related to driving change or transformation.',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        brandLogo: '/assets/images/brand/figma.png',
        customer: {
          id: 4,
          name: 'Henry Leach',
          email: 'henry.leach@outlook.com',
          initial: 'H',
          bgColor: 'bg-teal',
          textColor: 'text-white',
        },
        startDate: '2023-04-20',
        endDate: '2023-04-25',
        assignedUserId: 6,
        status: 'Declined',
        assignedUsers: [
          { id: 6, email: 'erna.serpa@outlook.com', name: 'Erna Serpa' },
        ],
      },
      {
        id: 5,
        name: 'Odyssey: This name could work well for a project related to exploration, adventure, or discovery.',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        brandLogo: '/assets/images/brand/github.png',
        customer: {
          id: 5,
          name: 'Marianne Audrey',
          email: 'marianne.audrey@outlook.com',
          avatar: '/assets/images/avatar/3.png',
        },
        startDate: '2023-04-25',
        endDate: '2023-04-30',
        assignedUserId: 6,
        status: 'Finished',
        assignedUsers: [
          { id: 6, email: 'erna.serpa@outlook.com', name: 'Erna Serpa' },
        ],
      },
      {
        id: 6,
        name: 'Synergy: This name could work well for a project related to collaboration or teamwork, where multiple parts come together to create a greater whole.',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        brandLogo: '/assets/images/brand/gitlab.png',
        customer: {
          id: 6,
          name: 'Nancy Elliot',
          email: 'nancy.elliot@outlook.com',
          initial: 'N',
          bgColor: 'bg-warning',
          textColor: 'text-white',
        },
        startDate: '2023-04-15',
        endDate: '2023-04-20',
        assignedUserId: 5,
        status: 'In Progress',
        assignedUsers: [
          { id: 5, email: 'mar.audrey@gmail.com', name: 'Mar Audrey' },
        ],
      },
      {
        id: 7,
        name: 'Zenith: This name could work well for a project related to achieving the highest point or peak of success.',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        brandLogo: '/assets/images/brand/gmail.png',
        customer: {
          id: 7,
          name: 'Cute Green',
          email: 'cute.green@outlook.com',
          avatar: '/assets/images/avatar/4.png',
        },
        startDate: '2023-04-07',
        endDate: '2023-04-12',
        assignedUserId: 4,
        status: 'Not Started',
        assignedUsers: [
          { id: 4, email: 'nancy.elliot@outlook.com', name: 'Nancy Elliot' },
        ],
      },
      {
        id: 8,
        name: 'Zenith: This name could work well for a project related to achieving the highest point or peak of success.',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        brandLogo: '/assets/images/brand/google-drive.png',
        customer: {
          id: 8,
          name: 'Leach Henry',
          email: 'leach.henry@outlook.com',
          initial: 'H',
          bgColor: 'bg-success',
          textColor: 'text-white',
        },
        startDate: '2023-04-06',
        endDate: '2023-04-08',
        assignedUserId: 3,
        status: 'On Hold',
        assignedUsers: [
          { id: 3, email: 'green.cutte@outlook.com', name: 'Green Cutte' },
        ],
      },
      {
        id: 9,
        name: 'Momentum: This name could work well for a project related to maintaining forward motion and progress.',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        brandLogo: '/assets/images/brand/instagram.png',
        customer: {
          id: 9,
          name: 'Audrey Marianne',
          email: 'audrey.marianne@outlook.com',
          avatar: '/assets/images/avatar/5.png',
        },
        startDate: '2023-04-15',
        endDate: '2023-04-25',
        assignedUserId: 2,
        status: 'Declined',
        assignedUsers: [
          { id: 2, email: 'john.deo@outlook.com', name: 'John Deo' },
        ],
      },
      {
        id: 10,
        name: 'Horizon: This name could work well for a project related to exploring new frontiers or expanding into new areas.',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        brandLogo: '/assets/images/brand/paypal.png',
        customer: {
          id: 10,
          name: 'Elliot Nancy',
          email: 'elliot.nancy@outlook.com',
          initial: 'E',
          bgColor: 'bg-primary',
          textColor: 'text-white',
        },
        startDate: '2023-05-01',
        endDate: '2023-05-03',
        assignedUserId: 1,
        status: 'Finished',
        assignedUsers: [
          { id: 1, email: 'alex@outlook.com', name: 'Alex' },
        ],
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 500);
  }, []);

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedProjects(projects.map(project => project.id));
    } else {
      setSelectedProjects([]);
    }
  };

  // Handle individual checkbox
  const handleSelectProject = (projectId: number, checked: boolean) => {
    if (checked) {
      setSelectedProjects([...selectedProjects, projectId]);
    } else {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    }
  };

  // Update select all state when individual selections change
  useEffect(() => {
    if (projects.length > 0) {
      setSelectAll(selectedProjects.length === projects.length);
    }
  }, [selectedProjects, projects]);

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    // TODO: Implement actual filtering logic
    console.log('Filter changed to:', newFilter);
  };

  // Handle view project
  const handleViewProject = (projectId: number) => {
    router.push(`/admin/dashboard/projects/${projectId}`);
  };

  // Handle create project
  const handleCreateProject = () => {
    router.push('/admin/dashboard/projects/add');
  };

  // Handle action menu item click
  const handleAction = (action: string, projectId: number) => {
    console.log(`Action ${action} for project ${projectId}`);
    // TODO: Implement action handlers
    // - Edit: redirect to edit page
    // - Print: trigger print
    // - Remind: send reminder
    // - Archive: archive project
    // - Delete: delete project
  };

  // Handle status change
  const handleStatusChange = (projectId: number, newStatus: string) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, status: newStatus as Project['status'] } 
        : project
    ));
    console.log(`Project ${projectId} status changed to:`, newStatus);
    // TODO: Implement API call to update status
  };

  // Handle assigned user change
  const handleAssignedUserChange = (projectId: number, userId: number) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, assignedUserId: userId } 
        : project
    ));
    console.log(`Project ${projectId} assigned user changed to:`, userId);
    // TODO: Implement API call to update assigned user
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'in progress':
        return 'bg-primary text-white';
      case 'not started':
        return 'bg-warning text-white';
      case 'on hold':
        return 'bg-success text-white';
      case 'declined':
        return 'bg-danger text-white';
      case 'finished':
        return 'bg-teal text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  // Export data
  const handleExport = (format: string) => {
    console.log('Exporting as:', format);
    // TODO: Implement export functionality
    alert(`Export as ${format} - implement this feature`);
  };

  return (
    <main className="nxl-container">
      <div className="nxl-content">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-left d-flex align-items-center">
            <div className="page-header-title">
              <h5 className="m-b-10">Projects</h5>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
              <li className="breadcrumb-item">Projects</li>
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
                    {['All', 'Active', 'Completed', 'Pending', 'On Hold', 'Cancelled'].map((item) => (
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
                
                {/* Create Project Button */}
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleCreateProject}
                >
                  <i className="feather-plus me-2"></i>
                  <span>Create Project</span>
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
                        <span className="d-block">Total</span>
                        <span className="fs-20 fw-bold d-block">
                          {stats.total.count}
                        </span>
                      </a>
                      <div className="badge bg-soft-primary text-primary">
                        <i className="feather-arrow-up fs-10 me-1"></i>
                        <span>{stats.total.trend}% {stats.total.trendText}</span>
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
                        <span className="d-block">In Progress</span>
                        <span className="fs-20 fw-bold d-block">
                          {stats.inProgress.count}
                        </span>
                      </a>
                      <div className="progress w-50 ht-5">
                        <div 
                          className="progress-bar bg-primary" 
                          role="progressbar" 
                          style={{ width: `${stats.inProgress.percentage}%` }}
                        ></div>
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
                        <span className="d-block">Completed</span>
                        <span className="fs-20 fw-bold d-block">
                          {stats.completed.count}
                        </span>
                      </a>
                      <div className="progress w-50 ht-5">
                        <div 
                          className="progress-bar bg-success" 
                          role="progressbar" 
                          style={{ width: `${stats.completed.percentage}%` }}
                        ></div>
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
                        <span className="d-block">Pending</span>
                        <span className="fs-20 fw-bold d-block">
                          {stats.pending.count}
                        </span>
                      </a>
                      <div className="progress w-50 ht-5">
                        <div 
                          className="progress-bar bg-warning" 
                          role="progressbar" 
                          style={{ width: `${stats.pending.percentage}%` }}
                        ></div>
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
                    <table className="table table-hover" id="projectList">
                      <thead>
                        <tr>
                          <th className="wd-30">
                            <div className="btn-group mb-1">
                              <div className="custom-control custom-checkbox ms-1">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkAllProject"
                                  checked={selectAll}
                                  onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                                <label className="custom-control-label" htmlFor="checkAllProject"></label>
                              </div>
                            </div>
                          </th>
                          <th>Project Name</th>
                          <th>Customer</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Assigned</th>
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
                        ) : projects.map((project) => (
                          <tr key={project.id} className="single-item">
                            <td>
                              <div className="item-checkbox ms-1">
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input checkbox"
                                    id={`checkBox_${project.id}`}
                                    checked={selectedProjects.includes(project.id)}
                                    onChange={(e) => handleSelectProject(project.id, e.target.checked)}
                                  />
                                  <label className="custom-control-label" htmlFor={`checkBox_${project.id}`}></label>
                                </div>
                              </div>
                            </td>
                            <td className="project-name-td">
                              <div className="hstack gap-4">
                                <div className="avatar-image border-0">
                                  <img 
                                    src={project.brandLogo} 
                                    alt={project.name} 
                                    className="img-fluid"
                                  />
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="text-truncate-1-line btn btn-link p-0 text-start"
                                    onClick={() => handleViewProject(project.id)}
                                  >
                                    {project.name}
                                  </button>
                                  <p className="fs-12 text-muted mt-2 text-truncate-1-line project-list-desc">
                                    {project.description}
                                  </p>
                                  <div className="project-list-action fs-12 d-flex align-items-center gap-3 mt-2">
                                    <button
                                      type="button"
                                      className="btn btn-link p-0"
                                      onClick={() => console.log('Start project')}
                                    >
                                      Start
                                    </button>
                                    <span className="vr text-muted"></span>
                                    <button
                                      type="button"
                                      className="btn btn-link p-0"
                                      onClick={() => console.log('Edit project')}
                                    >
                                      Edit
                                    </button>
                                    <span className="vr text-muted"></span>
                                    <button
                                      type="button"
                                      className="btn btn-link p-0 text-danger"
                                      onClick={() => console.log('Delete project')}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="hstack gap-3 btn btn-link p-0 text-start"
                                onClick={() => handleViewProject(project.id)}
                              >
                                <div className="avatar-image avatar-md">
                                  {project.customer.avatar ? (
                                    <img 
                                      src={project.customer.avatar} 
                                      alt={project.customer.name} 
                                      className="img-fluid"
                                    />
                                  ) : (
                                    <div className={`${project.customer.bgColor || 'bg-primary'} ${project.customer.textColor || 'text-white'}`}>
                                      {project.customer.initial || project.customer.name.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <span className="text-truncate-1-line">
                                    {project.customer.name}
                                  </span>
                                </div>
                              </button>
                            </td>
                            <td>{project.startDate}</td>
                            <td>{project.endDate}</td>
                            <td>
                              <select 
                                className="form-select form-control"
                                value={project.assignedUserId}
                                onChange={(e) => handleAssignedUserChange(project.id, parseInt(e.target.value))}
                              >
                                {project.assignedUsers.map((user) => (
                                  <option 
                                    key={user.id} 
                                    value={user.id}
                                  >
                                    {user.email}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select 
                                className="form-control"
                                value={project.status}
                                onChange={(e) => handleStatusChange(project.id, e.target.value)}
                              >
                                <option value="In Progress">In Progress</option>
                                <option value="Not Started">Not Started</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Declined">Declined</option>
                                <option value="Finished">Finished</option>
                              </select>
                            </td>
                            <td>
                              <div className="hstack gap-2 justify-content-end">
                                <button
                                  type="button"
                                  className="avatar-text avatar-md"
                                  onClick={() => handleViewProject(project.id)}
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
                                        onClick={() => console.log('Edit project')}
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
                                        onClick={() => console.log('Remind')}
                                      >
                                        <i className="feather feather-clock me-3"></i>
                                        <span>Remind</span>
                                      </button>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => console.log('Archive')}
                                      >
                                        <i className="feather feather-archive me-3"></i>
                                        <span>Archive</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => console.log('Report spam')}
                                      >
                                        <i className="feather feather-alert-octagon me-3"></i>
                                        <span>Report Spam</span>
                                      </button>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <button
                                        className="dropdown-item text-danger"
                                        onClick={() => console.log('Delete project')}
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
    'Active': 'check-circle',
    'Completed': 'check',
    'Pending': 'clock',
    'On Hold': 'pause',
    'Cancelled': 'x-circle',
  };
  return icons[filter] || 'filter';
};