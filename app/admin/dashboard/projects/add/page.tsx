'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Type definitions
interface Client {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  project?: string;
}

interface Teammate {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Guest' | 'Editor' | 'Owner' | 'Customer';
}

interface Tag {
  value: string;
  color: string;
}

interface ProjectFormData {
  // Step 1: Type
  projectType: 'personal' | 'team';
  projectManage: 'everyone' | 'admin' | 'specific';
  // Step 2: Details
  projectName: string;
  projectDescription: string;
  ratePerHour: number;
  projectClient: number;
  billingType: 'fixed' | 'task_hours' | 'project_hours';
  projectStatus: 'active' | 'inactive' | 'declined' | 'in_progress' | 'finished';
  projectTags: string[];
  projectReleaseDate: string;
  sendProjectEmail: boolean;
  calculateTasks: boolean;
  allowNotifications: boolean;
  // Step 3: Settings
  sendContactsNotifications: 'specific' | 'none' | 'all';
  visibleTabs: {
    tasks: boolean;
    timesheets: boolean;
    milestones: boolean;
    files: boolean;
    discussions: boolean;
    gantt: boolean;
    tickets: boolean;
    contracts: boolean;
    proposals: boolean;
    estimates: boolean;
    invoices: boolean;
    subscriptions: boolean;
    expenses: boolean;
    notes: boolean;
    activity: boolean;
  };
  projectControl: {
    viewTasks: boolean;
    createTasks: boolean;
    editTasks: boolean;
    commentTasks: boolean;
    viewAttachments: boolean;
    viewChecklist: boolean;
    uploadAttachments: boolean;
    viewLoggedTime: boolean;
    uploadFiles: boolean;
    openDiscussions: boolean;
    viewMilestones: boolean;
    viewTimesheets: boolean;
    viewActivityLog: boolean;
    viewTeamMembers: boolean;
    hideAdminTasks: boolean;
  };
  // Step 4: Budget
  projectBudget: 'tier_1' | 'tier_2' | 'tier_3' | 'tier_4';
  budgetSpend: 'precise' | 'extreme';
  allowChanges: boolean;
  budgetReset: boolean;
  projectAlert: boolean;
  // Step 5: Assigned
  inviteTeammates: string;
  teammates: Teammate[];
  addingUsers: boolean;
  // Step 6: Target
  targetTitle: string;
  targetDescription: string;
  targetReleaseDate: string;
  targetAssigned: number[];
  targetTags: string[];
  allowChangesTarget: boolean;
  allowNotificationsTarget: boolean;
  // Step 7: Attachment
  attachments: File[];
}

export default function CreateProjectPage() {
  const router = useRouter();

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // API Data State (Ready for population)
  const [clients, setClients] = useState<Client[]>([]);
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  // Form Data State (Matches HTML reference defaults)
  const [formData, setFormData] = useState<ProjectFormData>({
    // Step 1
    projectType: 'personal',
    projectManage: 'everyone',
    // Step 2
    projectName: 'Website design and development',
    projectDescription: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores beatae inventore reiciendis ipsum natus, porro recusandae sunt accusantium reprehenderit aliquid commodi est veniam sit molestiae, nesciunt cupiditate. Laborum, culpa maxime.</p>',
    ratePerHour: 20,
    projectClient: 1,
    billingType: 'task_hours',
    projectStatus: 'active',
    projectTags: ['Primary'],
    projectReleaseDate: '26/03/2023',
    sendProjectEmail: true,
    calculateTasks: true,
    allowNotifications: true,
    // Step 3
    sendContactsNotifications: 'all',
    visibleTabs: {
      tasks: true,
      timesheets: true,
      milestones: true,
      files: true,
      discussions: true,
      gantt: true,
      tickets: true,
      contracts: true,
      proposals: true,
      estimates: true,
      invoices: true,
      subscriptions: true,
      expenses: true,
      notes: true,
      activity: true,
    },
    projectControl: {
      viewTasks: true,
      createTasks: true,
      editTasks: true,
      commentTasks: true,
      viewAttachments: true,
      viewChecklist: true,
      uploadAttachments: true,
      viewLoggedTime: true,
      uploadFiles: true,
      openDiscussions: true,
      viewMilestones: true,
      viewTimesheets: true,
      viewActivityLog: true,
      viewTeamMembers: true,
      hideAdminTasks: true,
    },
    // Step 4
    projectBudget: 'tier_2',
    budgetSpend: 'precise',
    allowChanges: true,
    budgetReset: true,
    projectAlert: true,
    // Step 5
    inviteTeammates: '',
    teammates: [
      { id: 1, name: 'Alexandra Della', email: 'alex.della@gmail.com', avatar: '/assets/images/avatar/1.png', role: 'Editor' },
      { id: 2, name: 'Archie Cantones', email: 'arcie.tones@gmail.com', avatar: '/assets/images/avatar/2.png', role: 'Admin' },
      { id: 3, name: 'Holmes Cherryman', email: 'golms.chan@gmail.com', avatar: '/assets/images/avatar/3.png', role: 'Guest' },
      { id: 4, name: 'Malanie Hanvey', email: 'lanie.nveyn@gmail.com', avatar: '/assets/images/avatar/4.png', role: 'Customer' },
      { id: 5, name: 'Kenneth Hune', email: 'nneth.une@gmail.com', avatar: '/assets/images/avatar/5.png', role: 'Owner' },
    ],
    addingUsers: true,
    // Step 6
    targetTitle: '',
    targetDescription: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores beatae inventore reiciendis ipsum natus, porro recusandae sunt accusantium reprehenderit aliquid commodi est veniam sit molestiae, nesciunt cupiditate. Laborum, culpa maxime.</p>',
    targetReleaseDate: '26/03/2023',
    targetAssigned: [1],
    targetTags: ['VIP', 'Team', 'Primary', 'Promotions'],
    allowChangesTarget: true,
    allowNotificationsTarget: true,
    // Step 7
    attachments: [],
  });

  // Step titles
  const stepTitles = [
    'Type', 'Details', 'Settings', 'Budget', 'Assigned', 'Target', 'Attachment', 'Completed'
  ];

  // Fetch initial data from API (Placeholder)
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // TODO: Replace with actual API endpoints
      // const [clientsRes, teammatesRes, tagsRes] = await Promise.all([
      //   fetch('/api/clients').then(res => res.json()),
      //   fetch('/api/teammates').then(res => res.json()),
      //   fetch('/api/tags').then(res => res.json()),
      // ]);

      // Placeholder data matching HTML reference exactly
      const mockClients: Client[] = [
        { id: 1, name: 'Alexandra Della', email: 'alex@example.com', avatar: '/assets/images/avatar/1.png', project: 'Website design and development' },
        { id: 2, name: 'Curtis Green', email: 'curtis.green@example.com', avatar: '/assets/images/avatar/2.png', project: 'User experience(UX) and user interface(UI)' },
        { id: 3, name: 'Marianne Audrey', email: 'marianne.audrey@example.com', avatar: '/assets/images/avatar/3.png', project: 'Responsive and mobile design' },
        { id: 4, name: 'Holland Scott', email: 'holland.scott@example.com', avatar: '/assets/images/avatar/4.png', project: 'E-commerce website design & development' },
        { id: 5, name: 'Olive Delarosa', email: 'olive.delarosa@example.com', avatar: '/assets/images/avatar/5.png', project: 'Custom graphics and icon design' },
        { id: 6, name: 'Alexandra Della', email: 'alex@example.com', avatar: '/assets/images/avatar/1.png', project: 'Website design and development' },
        { id: 7, name: 'Curtis Green', email: 'curtis.green@example.com', avatar: '/assets/images/avatar/2.png', project: 'User experience(UX) and user interface(UI)' },
        { id: 8, name: 'Marianne Audrey', email: 'marianne.audrey@example.com', avatar: '/assets/images/avatar/3.png', project: 'Responsive and mobile design' },
        { id: 9, name: 'Holland Scott', email: 'holland.scott@example.com', avatar: '/assets/images/avatar/4.png', project: 'E-commerce website design & development' },
        { id: 10, name: 'Olive Delarosa', email: 'olive.delarosa@example.com', avatar: '/assets/images/avatar/5.png', project: 'Custom graphics and icon design' },
      ];

      const mockTeammates: Teammate[] = [
        { id: 1, name: 'Alexandra Della', email: 'alex.della@gmail.com', avatar: '/assets/images/avatar/1.png', role: 'Editor' },
        { id: 2, name: 'Archie Cantones', email: 'arcie.tones@gmail.com', avatar: '/assets/images/avatar/2.png', role: 'Admin' },
        { id: 3, name: 'Holmes Cherryman', email: 'golms.chan@gmail.com', avatar: '/assets/images/avatar/3.png', role: 'Guest' },
        { id: 4, name: 'Malanie Hanvey', email: 'lanie.nveyn@gmail.com', avatar: '/assets/images/avatar/4.png', role: 'Customer' },
        { id: 5, name: 'Kenneth Hune', email: 'nneth.une@gmail.com', avatar: '/assets/images/avatar/5.png', role: 'Owner' },
      ];

      const mockTags: Tag[] = [
        { value: 'VIP', color: 'success' },
        { value: 'Bugs', color: 'info' },
        { value: 'Team', color: 'primary' },
        { value: 'Primary', color: 'teal' },
        { value: 'Updates', color: 'success' },
        { value: 'Personal', color: 'warning' },
        { value: 'Promotions', color: 'danger' },
        { value: 'Customs', color: 'indigo' },
        { value: 'Wholesale', color: 'primary' },
        { value: 'Low Budget', color: 'danger' },
        { value: 'High Budget', color: 'teal' },
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setClients(mockClients);
      setTeammates(mockTeammates);
      setAvailableTags(mockTags);
    } catch (err) {
      console.error('Failed to fetch initial data', err);
    }
  };

  // Handle form field changes
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  // Handle nested object changes
  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof ProjectFormData] as Record<string, any>),
        [field]: value
      }
    }));
  };

  // Handle teammate role change
  const handleTeammateRoleChange = (teammateId: number, newRole: string) => {
    setFormData(prev => ({
      ...prev,
      teammates: prev.teammates.map(teammate =>
        teammate.id === teammateId ? { ...teammate, role: newRole as Teammate['role'] } : teammate
      )
    }));
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  // Remove attachment
  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Validate step before proceeding
  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.projectType && !!formData.projectManage;
      case 2:
        return formData.projectName.trim() !== '' && formData.projectDescription.trim() !== '';
      case 4:
        return !!formData.projectBudget;
      case 6:
        return formData.targetReleaseDate !== '';
      default:
        return true;
    }
  };

  // Submit form
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateStep()) {
      setError('Please fill in all required fields');
      return;
    }

    if (currentStep < 8) {
      nextStep();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/projects/create', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      //
      // const data = await response.json();
      //
      // if (!response.ok) {
      //   throw new Error(data.message || 'Failed to create project');
      // }

      // Placeholder - simulate API call
      console.log('Creating project with data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess(true);

      // TODO: Redirect after success
      // setTimeout(() => {
      //   router.push(`/admin/dashboard/projects/${data.projectId}`);
      // }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      projectType: 'personal',
      projectManage: 'everyone',
      projectName: 'Website design and development',
      projectDescription: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>',
      ratePerHour: 20,
      projectClient: 1,
      billingType: 'task_hours',
      projectStatus: 'active',
      projectTags: ['Primary'],
      projectReleaseDate: '26/03/2023',
      sendProjectEmail: true,
      calculateTasks: true,
      allowNotifications: true,
      sendContactsNotifications: 'all',
      visibleTabs: {
        tasks: true,
        timesheets: true,
        milestones: true,
        files: true,
        discussions: true,
        gantt: true,
        tickets: true,
        contracts: true,
        proposals: true,
        estimates: true,
        invoices: true,
        subscriptions: true,
        expenses: true,
        notes: true,
        activity: true,
      },
      projectControl: {
        viewTasks: true,
        createTasks: true,
        editTasks: true,
        commentTasks: true,
        viewAttachments: true,
        viewChecklist: true,
        uploadAttachments: true,
        viewLoggedTime: true,
        uploadFiles: true,
        openDiscussions: true,
        viewMilestones: true,
        viewTimesheets: true,
        viewActivityLog: true,
        viewTeamMembers: true,
        hideAdminTasks: true,
      },
      projectBudget: 'tier_2',
      budgetSpend: 'precise',
      allowChanges: true,
      budgetReset: true,
      projectAlert: true,
      inviteTeammates: '',
      teammates: [
        { id: 1, name: 'Alexandra Della', email: 'alex.della@gmail.com', avatar: '/assets/images/avatar/1.png', role: 'Editor' },
        { id: 2, name: 'Archie Cantones', email: 'arcie.tones@gmail.com', avatar: '/assets/images/avatar/2.png', role: 'Admin' },
        { id: 3, name: 'Holmes Cherryman', email: 'golms.chan@gmail.com', avatar: '/assets/images/avatar/3.png', role: 'Guest' },
        { id: 4, name: 'Malanie Hanvey', email: 'lanie.nveyn@gmail.com', avatar: '/assets/images/avatar/4.png', role: 'Customer' },
        { id: 5, name: 'Kenneth Hune', email: 'nneth.une@gmail.com', avatar: '/assets/images/avatar/5.png', role: 'Owner' },
      ],
      addingUsers: true,
      targetTitle: '',
      targetDescription: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>',
      targetReleaseDate: '26/03/2023',
      targetAssigned: [1],
      targetTags: ['VIP', 'Team', 'Primary', 'Promotions'],
      allowChangesTarget: true,
      allowNotificationsTarget: true,
      attachments: [],
    });
    setError(null);
    setSuccess(false);
  };

  // Get step content
  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStepType();
      case 2:
        return renderStepDetails();
      case 3:
        return renderStepSettings();
      case 4:
        return renderStepBudget();
      case 5:
        return renderStepAssigned();
      case 6:
        return renderStepTarget();
      case 7:
        return renderStepAttachment();
      case 8:
        return renderStepCompleted();
      default:
        return null;
    }
  };

  // Step 1: Type
  const renderStepType = () => (
    <section className="step-body mt-4">
      <form id="project-type">
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Project type</h2>
            <p className="text-muted">Select project type first.</p>
            {error && <label className="error text-danger">{error}</label>}
          </div>
          <fieldset>
            <label className="w-100" htmlFor="project_personal">
              <input
                className="card-input-element"
                type="radio"
                name="project-type"
                id="project_personal"
                checked={formData.projectType === 'personal'}
                onChange={() => handleInputChange('projectType', 'personal')}
                required
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span className="hstack gap-3">
                  <span className="avatar-text">
                    <i className="feather-user"></i>
                  </span>
                  <span>
                    <span className="d-block fs-13 fw-bold text-dark">Personal Project</span>
                    <span className="d-block text-muted mb-0">If you need more info, please check it out</span>
                  </span>
                </span>
              </span>
            </label>
            <label className="w-100" htmlFor="project_team">
              <input
                className="card-input-element"
                type="radio"
                name="project-type"
                id="project_team"
                checked={formData.projectType === 'team'}
                onChange={() => handleInputChange('projectType', 'team')}
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span className="hstack gap-3">
                  <span className="avatar-text">
                    <i className="feather-users"></i>
                  </span>
                  <span>
                    <span className="d-block fs-13 fw-bold text-dark">Team Project</span>
                    <span className="d-block text-muted mb-0">Create corporate account to manage users</span>
                  </span>
                </span>
              </span>
            </label>
          </fieldset>
        </fieldset>
        <hr className="mb-5" />
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Project manage</h2>
            <p className="text-muted">Who can manage projects</p>
            {error && <label className="error text-danger">{error}</label>}
          </div>
          <fieldset>
            <label className="w-100" htmlFor="project_everyone">
              <input
                className="card-input-element"
                type="radio"
                name="project-manage"
                id="project_everyone"
                checked={formData.projectManage === 'everyone'}
                onChange={() => handleInputChange('projectManage', 'everyone')}
                required
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span className="hstack gap-3">
                  <span className="avatar-text">
                    <i className="feather-globe"></i>
                  </span>
                  <span>
                    <span className="d-block fs-13 fw-bold text-dark">Everyone</span>
                    <span className="d-block text-muted mb-0">All users now can to see it, but guests can&apos;t access.</span>
                  </span>
                </span>
              </span>
            </label>
            <label className="w-100" htmlFor="project_admin">
              <input
                className="card-input-element"
                type="radio"
                name="project-manage"
                id="project_admin"
                checked={formData.projectManage === 'admin'}
                onChange={() => handleInputChange('projectManage', 'admin')}
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span className="hstack gap-3">
                  <span className="avatar-text">
                    <i className="feather-shield"></i>
                  </span>
                  <span>
                    <span className="d-block fs-13 fw-bold text-dark">Only Admin&apos;s</span>
                    <span className="d-block text-muted mb-0">Only admin&apos;s can manage everythings.</span>
                  </span>
                </span>
              </span>
            </label>
            <label className="w-100" htmlFor="project_specific">
              <input
                className="card-input-element"
                type="radio"
                name="project-manage"
                id="project_specific"
                checked={formData.projectManage === 'specific'}
                onChange={() => handleInputChange('projectManage', 'specific')}
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span className="hstack gap-3">
                  <span className="avatar-text">
                    <i className="feather-settings"></i>
                  </span>
                  <span>
                    <span className="d-block fs-13 fw-bold text-dark">Only to Specific People</span>
                    <span className="d-block text-muted mb-0">Only some specific people can able to see it.</span>
                  </span>
                </span>
              </span>
            </label>
          </fieldset>
        </fieldset>
      </form>
    </section>
  );

  // Step 2: Details
  const renderStepDetails = () => (
    <section className="step-body mt-4">
      <form id="project-details" onSubmit={handleSubmit}>
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Project details</h2>
            <p className="text-muted">You project details gose here.</p>
          </div>
          <fieldset>
            <div className="mb-4">
              <label htmlFor="projectName" className="form-label">
                Project Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">
                Project Description <span className="text-danger">*</span>
              </label>
              <div
                id="projectDescription"
                className="ht-200 border p-3"
                dangerouslySetInnerHTML={{ __html: formData.projectDescription }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ratePerHour" className="form-label">
                Rate Per Hour <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="ratePerHour"
                name="ratePerHour"
                value={formData.ratePerHour}
                onChange={(e) => handleInputChange('ratePerHour', parseInt(e.target.value) || 0)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="projectClient" className="form-label">
                Project Client <span className="text-danger">*</span>
              </label>
              <select
                id="projectClient"
                className="form-select"
                name="projectClient"
                value={formData.projectClient}
                onChange={(e) => handleInputChange('projectClient', parseInt(e.target.value))}
              >
                {(clients.length > 0 ? clients : [
                  { id: 1, name: 'Alexandra Della', email: 'alex@example.com', avatar: '/assets/images/avatar/1.png', project: 'Website design and development' },
                  { id: 2, name: 'Curtis Green', email: 'curtis.green@example.com', avatar: '/assets/images/avatar/2.png', project: 'User experience(UX) and user interface(UI)' },
                  { id: 3, name: 'Marianne Audrey', email: 'marianne.audrey@example.com', avatar: '/assets/images/avatar/3.png', project: 'Responsive and mobile design' },
                  { id: 4, name: 'Holland Scott', email: 'holland.scott@example.com', avatar: '/assets/images/avatar/4.png', project: 'E-commerce website design & development' },
                  { id: 5, name: 'Olive Delarosa', email: 'olive.delarosa@example.com', avatar: '/assets/images/avatar/5.png', project: 'Custom graphics and icon design' },
                  { id: 6, name: 'Alexandra Della', email: 'alex@example.com', avatar: '/assets/images/avatar/1.png', project: 'Website design and development' },
                  { id: 7, name: 'Curtis Green', email: 'curtis.green@example.com', avatar: '/assets/images/avatar/2.png', project: 'User experience(UX) and user interface(UI)' },
                  { id: 8, name: 'Marianne Audrey', email: 'marianne.audrey@example.com', avatar: '/assets/images/avatar/3.png', project: 'Responsive and mobile design' },
                  { id: 9, name: 'Holland Scott', email: 'holland.scott@example.com', avatar: '/assets/images/avatar/4.png', project: 'E-commerce website design & development' },
                  { id: 10, name: 'Olive Delarosa', email: 'olive.delarosa@example.com', avatar: '/assets/images/avatar/5.png', project: 'Custom graphics and icon design' },
                ]).map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name} - {client.project}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="billingType" className="form-label">
                Billing type <span className="text-danger">*</span>
              </label>
              <select
                id="billingType"
                className="form-select"
                name="billingType"
                value={formData.billingType}
                onChange={(e) => handleInputChange('billingType', e.target.value)}
              >
                <option value="fixed">Fixed Rate</option>
                <option value="task_hours">Tasks Hours</option>
                <option value="project_hours">Project Hours</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="projectStatus" className="form-label">
                Project status <span className="text-danger">*</span>
              </label>
              <select
                id="projectStatus"
                className="form-select"
                name="projectStatus"
                value={formData.projectStatus}
                onChange={(e) => handleInputChange('projectStatus', e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="declined">Declined</option>
                <option value="in_progress">InProgress</option>
                <option value="finished">Finished</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="projectTags" className="form-label">
                Project tags <span className="text-danger">*</span>
              </label>
              <select
                id="projectTags"
                className="form-select"
                name="projectTags"
                multiple
                value={formData.projectTags}
                onChange={(e) => {
                  const options = Array.from(e.target.selectedOptions);
                  handleInputChange('projectTags', options.map(opt => opt.value));
                }}
              >
                {(availableTags.length > 0 ? availableTags : [
                  { value: 'VIP', color: 'success' },
                  { value: 'Bugs', color: 'info' },
                  { value: 'Team', color: 'primary' },
                  { value: 'Primary', color: 'teal' },
                  { value: 'Updates', color: 'success' },
                  { value: 'Personal', color: 'warning' },
                  { value: 'Promotions', color: 'danger' },
                  { value: 'Customs', color: 'indigo' },
                  { value: 'Wholesale', color: 'primary' },
                  { value: 'Low Budget', color: 'danger' },
                  { value: 'High Budget', color: 'teal' },
                ]).map(tag => (
                  <option key={tag.value} value={tag.value}>
                    {tag.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="projectReleaseDate" className="form-label">
                Release Date <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="projectReleaseDate"
                name="projectReleaseDate"
                placeholder="Release Date"
                value={formData.projectReleaseDate}
                onChange={(e) => handleInputChange('projectReleaseDate', e.target.value)}
                required
              />
            </div>
            <hr className="mb-5" />
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="sendProjectEmail"
                checked={formData.sendProjectEmail}
                onChange={(e) => handleInputChange('sendProjectEmail', e.target.checked)}
              />
              <label className="custom-control-label c-pointer" htmlFor="sendProjectEmail">
                Send project created email.
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="calculateTasks"
                checked={formData.calculateTasks}
                onChange={(e) => handleInputChange('calculateTasks', e.target.checked)}
              />
              <label className="custom-control-label c-pointer" htmlFor="calculateTasks">
                Calculate progress through tasks.
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="allowNotifications"
                checked={formData.allowNotifications}
                onChange={(e) => handleInputChange('allowNotifications', e.target.checked)}
              />
              <label className="custom-control-label c-pointer" htmlFor="allowNotifications">
                Allow Notifications by Phone or Email.
              </label>
            </div>
          </fieldset>
        </fieldset>
      </form>
    </section>
  );

  // Step 3: Settings
  const renderStepSettings = () => (
    <section className="step-body mt-4">
      <form id="project-settings">
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Project settings</h2>
            <p className="text-muted">Settings for your project features here.</p>
          </div>
          <fieldset>
            <div className="mb-4">
              <label htmlFor="sendcontactsNotifications" className="form-label">
                Send contacts notifications
              </label>
              <select
                id="sendcontactsNotifications"
                className="form-select"
                name="sendcontactsNotifications"
                value={formData.sendContactsNotifications}
                onChange={(e) => handleInputChange('sendContactsNotifications', e.target.value)}
              >
                <option value="specific">Specific contacts</option>
                <option value="none">Don&apos;t send notification</option>
                <option value="all">All contact with notification</option>
              </select>
            </div>
          </fieldset>
          <hr className="mb-5" />
          <fieldset>
            <div className="mb-5">
              <h2 className="fs-16 fw-bold">Visible tabs</h2>
              <p className="text-muted">Visible tabs for your project.</p>
            </div>
            <fieldset>
              <div className="row">
                {Object.entries(formData.visibleTabs).map(([key, value]) => (
                  <div key={key} className="col-lg-4">
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={`visibleTab${key.charAt(0).toUpperCase() + key.slice(1)}`}
                        checked={value}
                        onChange={(e) => handleNestedChange('visibleTabs', key, e.target.checked)}
                      />
                      <label
                        className="custom-control-label c-pointer"
                        htmlFor={`visibleTab${key.charAt(0).toUpperCase() + key.slice(1)}`}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </fieldset>
          <hr className="mb-5" />
          <fieldset>
            <div className="mb-5">
              <h2 className="fs-16 fw-bold">Project control</h2>
              <p className="text-muted">Project control for your project.</p>
            </div>
            <fieldset>
              {Object.entries(formData.projectControl).map(([key, value]) => (
                <div key={key} className="custom-control custom-checkbox mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`visibleTab${key}`}
                    checked={value}
                    onChange={(e) => handleNestedChange('projectControl', key, e.target.checked)}
                  />
                  <label className="custom-control-label c-pointer" htmlFor={`visibleTab${key}`}>
                    {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </label>
                </div>
              ))}
            </fieldset>
          </fieldset>
        </fieldset>
      </form>
    </section>
  );

  // Step 4: Budget
  const renderStepBudget = () => (
    <section className="step-body mt-4">
      <form id="project-budgets">
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Project budgets</h2>
            <p className="text-muted">
              If you need more info, please check <a href="#">help center</a>
            </p>
            {error && <label className="error text-danger">{error}</label>}
          </div>
          <fieldset>
            <label className="w-100" htmlFor="budgets_tire_1">
              <input
                className="card-input-element"
                type="radio"
                name="project-budgets"
                id="budgets_tire_1"
                checked={formData.projectBudget === 'tier_1'}
                onChange={() => handleInputChange('projectBudget', 'tier_1')}
                required
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span>
                  <span className="d-block fs-13 fw-normal text-muted mb-2">Budget tire 1</span>
                  <span className="d-block fs-16 fw-bold text-dark mb-0">$100 - $999</span>
                </span>
              </span>
            </label>
            <label className="w-100" htmlFor="budgets_tire_2">
              <input
                className="card-input-element"
                type="radio"
                name="project-budgets"
                id="budgets_tire_2"
                checked={formData.projectBudget === 'tier_2'}
                onChange={() => handleInputChange('projectBudget', 'tier_2')}
                required
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span>
                  <span className="d-block fs-13 fw-normal text-muted mb-2">Budget tire 2</span>
                  <span className="d-block fs-16 fw-bold text-dark mb-0">$1,000 - $4,999</span>
                </span>
              </span>
            </label>
            <label className="w-100" htmlFor="budgets_tire_3">
              <input
                className="card-input-element"
                type="radio"
                name="project-budgets"
                id="budgets_tire_3"
                checked={formData.projectBudget === 'tier_3'}
                onChange={() => handleInputChange('projectBudget', 'tier_3')}
                required
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span>
                  <span className="d-block fs-13 fw-normal text-muted mb-2">Budget tire 3</span>
                  <span className="d-block fs-16 fw-bold text-dark mb-0">$4,999 - $9,999</span>
                </span>
              </span>
            </label>
            <label className="w-100" htmlFor="budgets_tire_4">
              <input
                className="card-input-element"
                type="radio"
                name="project-budgets"
                id="budgets_tire_4"
                checked={formData.projectBudget === 'tier_4'}
                onChange={() => handleInputChange('projectBudget', 'tier_4')}
                required
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span>
                  <span className="d-block fs-13 fw-normal text-muted mb-2">Budget tire 4</span>
                  <span className="d-block fs-16 fw-bold text-dark mb-0">$10,000+</span>
                </span>
              </span>
            </label>
          </fieldset>
        </fieldset>
        <hr className="mb-5" />
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Budgets spend</h2>
            <p className="text-muted">
              If you need more info, please check <a href="#">FAQ&apos;s</a>
            </p>
            {error && <label className="error text-danger">{error}</label>}
          </div>
          <fieldset>
            <label className="w-100" htmlFor="precise_usage">
              <input
                className="card-input-element"
                type="radio"
                name="project-spend"
                id="precise_usage"
                checked={formData.budgetSpend === 'precise'}
                onChange={() => handleInputChange('budgetSpend', 'precise')}
                required
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span className="hstack gap-3">
                  <span className="avatar-text">
                    <i className="feather-user"></i>
                  </span>
                  <span>
                    <span className="d-block fs-13 fw-bold text-dark">Precise Usage</span>
                    <span className="d-block text-muted mb-0">
                      Withdraw money to your bank account per transaction under <strong>$5000</strong> budget
                    </span>
                  </span>
                </span>
              </span>
            </label>
            <label className="w-100" htmlFor="extreme_usage">
              <input
                className="card-input-element"
                type="radio"
                name="project-spend"
                id="extreme_usage"
                checked={formData.budgetSpend === 'extreme'}
                onChange={() => handleInputChange('budgetSpend', 'extreme')}
              />
              <span className="card card-body d-flex flex-row justify-content-between align-items-center">
                <span className="hstack gap-3">
                  <span className="avatar-text">
                    <i className="feather-users"></i>
                  </span>
                  <span>
                    <span className="d-block fs-13 fw-bold text-dark">Extreme Usage</span>
                    <span className="d-block text-muted mb-0">
                      Withdraw money to your bank account per transaction under <strong>$50,000</strong> budget
                    </span>
                  </span>
                </span>
              </span>
            </label>
          </fieldset>
          <hr className="mb-5" />
          <div className="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="allowChanges"
              checked={formData.allowChanges}
              onChange={(e) => handleInputChange('allowChanges', e.target.checked)}
            />
            <label className="custom-control-label c-pointer" htmlFor="allowChanges">
              Allow Changes in Budget.
            </label>
          </div>
          <div className="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="budgetReset"
              checked={formData.budgetReset}
              onChange={(e) => handleInputChange('budgetReset', e.target.checked)}
            />
            <label className="custom-control-label c-pointer" htmlFor="budgetReset">
              Budgets reset every month.
            </label>
          </div>
          <div className="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="promectAlert"
              checked={formData.projectAlert}
              onChange={(e) => handleInputChange('projectAlert', e.target.checked)}
            />
            <label className="custom-control-label c-pointer" htmlFor="promectAlert">
              Send email alarts if project <span className="badge bg-gray-200 text-dark">80.00</span>% of budget.
            </label>
          </div>
        </fieldset>
      </form>
    </section>
  );

  // Step 5: Assigned
  const renderStepAssigned = () => (
    <section className="step-body mt-4">
      <fieldset>
        <div className="mb-5">
          <h2 className="fs-16 fw-bold">Project Assagined</h2>
          <p className="text-muted">
            If you need more info, please check <a href="#">help center</a>
          </p>
        </div>
        <fieldset>
          <div className="mb-4">
            <label htmlFor="inviteTeammates" className="fw-semibold text-dark">
              Invite Teammates
            </label>
            <input
              type="text"
              className="form-control"
              id="inviteTeammates"
              name="inviteTeammates"
              placeholder="Add project memnbers by name or email.."
              value={formData.inviteTeammates}
              onChange={(e) => handleInputChange('inviteTeammates', e.target.value)}
            />
          </div>
          <hr className="my-5" />
          <div className="mb-4">
            <h6 className="fs-13 fw-semibold pb-3 mb-3 border-bottom">Team Members</h6>
            {formData.teammates.map(teammate => (
              <div key={teammate.id} className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar-image d-none d-sm-block">
                    <img src={teammate.avatar} alt={teammate.name} className="img-fluid" />
                  </div>
                  <a href="#" className="w-75">
                    <span className="text-truncate-1-line">{teammate.name}</span>
                    <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                      {teammate.email}
                    </span>
                  </a>
                </div>
                <div className="wd-150">
                  <select
                    className="form-select"
                    value={teammate.role}
                    onChange={(e) => handleTeammateRoleChange(teammate.id, e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Guest">Guest</option>
                    <option value="Editor">Editor</option>
                    <option value="Owner">Owner</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-5" />
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="addingUsers"
              checked={formData.addingUsers}
              onChange={(e) => handleInputChange('addingUsers', e.target.checked)}
            />
            <label className="custom-control-label c-pointer" htmlFor="addingUsers">
              Adding Users by Team Members
            </label>
          </div>
          <div className="fs-12 fw-normal text-muted">
            If you need more info, please check budget planning
          </div>
        </fieldset>
      </fieldset>
    </section>
  );

  // Step 6: Target
  const renderStepTarget = () => (
    <section className="step-body mt-4">
      <form id="project-target">
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Project target</h2>
            <p className="text-muted">
              If you need more info, please check <a href="#">help center</a>
            </p>
          </div>
          <fieldset>
            <div className="mb-4">
              <label htmlFor="targetTitle" className="fw-semibold text-dark">
                Target title
              </label>
              <input
                type="text"
                className="form-control"
                id="targetTitle"
                name="targetTitle"
                placeholder="First target title.."
                value={formData.targetTitle}
                onChange={(e) => handleInputChange('targetTitle', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">
                Target Description <span className="text-danger">*</span>
              </label>
              <div
                id="targetDescription"
                className="ht-200 border p-3"
                dangerouslySetInnerHTML={{ __html: formData.targetDescription }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="targetReleaseDate" className="form-label">
                Release Date <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="targetReleaseDate"
                name="targetReleaseDate"
                placeholder="Release Date"
                value={formData.targetReleaseDate}
                onChange={(e) => handleInputChange('targetReleaseDate', e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tragetAssigned" className="form-label">
                Taget assigned<span className="text-danger">*</span>
              </label>
              <select
                id="tragetAssigned"
                className="form-select"
                name="tragetAssigned"
                multiple
                value={formData.targetAssigned.map(String)}
                onChange={(e) => {
                  const options = Array.from(e.target.selectedOptions);
                  handleInputChange('targetAssigned', options.map(opt => parseInt(opt.value)));
                }}
                required
              >
                {(clients.length > 0 ? clients : [
                  { id: 1, name: 'Alexandra Della', email: 'alex@outlook.com', avatar: '' },
                  { id: 2, name: 'John Deo', email: 'john.deo@outlook.com', avatar: '' },
                  { id: 3, name: 'Green Cutte', email: 'green.cutte@outlook.com', avatar: '' },
                  { id: 4, name: 'Nancy Elliot', email: 'nancy.elliot@outlook.com', avatar: '' },
                  { id: 5, name: 'Mar Audrey', email: 'mar.audrey@gmail.com', avatar: '' },
                ]).map(client => (
                  <option key={client.id} value={client.id}>
                    {client.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="tragetTags" className="form-label">
                Project tags <span className="text-danger">*</span>
              </label>
              <select
                id="tragetTags"
                className="form-select"
                name="tragetTags"
                multiple
                value={formData.targetTags}
                onChange={(e) => {
                  const options = Array.from(e.target.selectedOptions);
                  handleInputChange('targetTags', options.map(opt => opt.value));
                }}
                required
              >
                {(availableTags.length > 0 ? availableTags : [
                  { value: 'VIP', color: 'success' },
                  { value: 'Bugs', color: 'info' },
                  { value: 'Team', color: 'primary' },
                  { value: 'Primary', color: 'teal' },
                  { value: 'Updates', color: 'success' },
                  { value: 'Personal', color: 'warning' },
                  { value: 'Promotions', color: 'danger' },
                  { value: 'Customs', color: 'indigo' },
                  { value: 'Wholesale', color: 'primary' },
                  { value: 'Low Budget', color: 'danger' },
                  { value: 'High Budget', color: 'teal' },
                ]).map(tag => (
                  <option key={tag.value} value={tag.value}>
                    {tag.value}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <hr className="my-5" />
          <div className="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="allowChanges_2"
              checked={formData.allowChangesTarget}
              onChange={(e) => handleInputChange('allowChangesTarget', e.target.checked)}
            />
            <label className="custom-control-label c-pointer" htmlFor="allowChanges_2">
              Allow Changes in Budget.
            </label>
          </div>
          <div className="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="allowNotifications_2"
              checked={formData.allowNotificationsTarget}
              onChange={(e) => handleInputChange('allowNotificationsTarget', e.target.checked)}
            />
            <label className="custom-control-label c-pointer" htmlFor="allowNotifications_2">
              Allow Notifications by Phone or Email.
            </label>
          </div>
        </fieldset>
      </form>
    </section>
  );

  // Step 7: Attachment
  const renderStepAttachment = () => (
    <section className="step-body mt-4">
      <div>
        <div className="mb-5">
          <h2 className="fs-16 fw-bold">Attachement files</h2>
          <p className="text-muted">
            If you need more info, please check <a href="#">help center</a>
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="choose-file" className="custom-file-upload" id="choose-file-label">
            Upload Document
          </label>
          <input
            name="uploadDocument"
            type="file"
            id="choose-file"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </div>
        <div className="row">
          {formData.attachments.map((file, index) => (
            <div key={index} className="col-sm-6">
              <div className="card stretch stretch-full">
                <div className="card-body p-0 ht-200 position-relative">
                  <a href="#" className="w-100 h-100 d-flex align-items-center justify-content-center">
                    <span className="fs-14">{file.name}</span>
                  </a>
                  <div className="dropdown position-absolute" style={{ top: '15px', right: '15px' }}>
                    <a href="#" className="avatar-text avatar-sm" data-bs-toggle="dropdown">
                      <i className="feather feather-more-vertical"></i>
                    </a>
                    <ul className="dropdown-menu overflow-hidden">
                      <li>
                        <a href="#" className="dropdown-item" onClick={() => removeAttachment(index)}>
                          <i className="feather feather-trash-2 me-3"></i>
                          <span>Remove</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-footer p-4">
                  <h2 className="fs-13 mb-1 text-truncate-1-line">{file.name}</h2>
                  <small className="fs-10 text-uppercase">
                    {Math.round(file.size / 1024)} KB
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Step 8: Completed
  const renderStepCompleted = () => (
    <section className="step-body mt-4 text-center">
      <img
        src="/assets/images/general/completed-steps.png"
        alt="Completed"
        className="img-fluid wd-300 mb-4"
      />
      <h4 className="fw-bold">Project Created!</h4>
      <p className="text-muted mt-2">
        If you need more info, please check how to create project
      </p>
      <div className="d-flex justify-content-center gap-1 mt-5">
        <button type="button" className="btn btn-light" onClick={handleReset}>
          Create New Project
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => router.push('/admin/dashboard/projects')}
        >
          Preview Project
        </button>
      </div>
    </section>
  );

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
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item">Create</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-top-0">
                <div className="card-body p-0" id="project-create-steps">
                  {/* Step Titles */}
                  <div className="step-title border-top">Type</div>
                  <div className="step-title border-top">Details</div>
                  <div className="step-title border-top">Settings</div>
                  <div className="step-title border-top">Budget</div>
                  <div className="step-title border-top">Assagined</div>
                  <div className="step-title border-top">Target</div>
                  <div className="step-title border-top">Attachement</div>
                  <div className="step-title border-top">Completed</div>

                  {/* Step Content */}
                  <div className="p-4">
                    {getStepContent()}
                  </div>

                  {/* Step Actions */}
                  {!success && currentStep < 8 && (
                    <div className="card-footer d-flex justify-content-between p-4">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                      >
                        <i className="feather-arrow-left me-2"></i>
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                        ) : null}
                        {currentStep === 7 ? 'Create Project' : 'Next'}
                        <i className="feather-arrow-right ms-2"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}