'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 ── TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/** One row in the Latest Leads table */
interface Lead {
  id: number;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  proposal: 'Sent' | 'New' | 'Returning';
  date: string;
  status: 'Completed' | 'In Progress' | 'Not Interested';
}

/** Single participant avatar inside a schedule item */
interface ScheduleParticipant {
  initials: string;
  bgColor: string;
  color: string;
}

/** One upcoming calendar event */
interface ScheduleItem {
  id: number;
  date: number;
  month: string;
  title: string;
  time: string;
  bgColor: string;
  textColor: string;
  participants: ScheduleParticipant[];
}

/** One row in Project Status */
interface ProjectStatus {
  id: number;
  title: string;
  category: string;
  icon: string;
  progress: number;
  progressColor: string;
}

/** One member in Team Progress */
interface TeamMember {
  id: number;
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
  progress: number;
  /** Comes from API – e.g. "30 Min Ago" */
  lastUpdated: string;
}

/** KPI stat for one of the four top cards */
interface KpiStat {
  current: number;
  total: number;
  /** Optional: dollar amount for invoices / conversion */
  amount?: string;
  /** Optional: completed sub-count */
  completed?: number;
  /** 0-100 */
  percentage: number;
  trend: 'up' | 'down';
}

/** KPI stat variant for conversion rate */
interface ConversionStat {
  rate: number;
  amount: string;
  percentage: number;
  trend: 'up' | 'down';
}

/** Dashboard stats rolled up */
interface DashboardStats {
  invoicesAwaiting: KpiStat;
  convertedLeads: KpiStat;
  projectsInProgress: KpiStat;
  conversionRate: ConversionStat;
}

/** Footer stat block for payment records */
interface PaymentStat {
  amount: string;
  percentage: number;
  /** Signed integer – positive = up, negative = down */
  trend: number;
}

/** Dataset arrays for payment records chart */
interface PaymentChartData {
  labels: string[];
  awaiting: number[];
  completed: number[];
  rejected: number[];
  revenue: number[];
}

/** One mini sparkline card (tasks / new tasks / projects done) */
interface MiniStat {
  current: number;
  total: number;
  /** % change vs last week */
  trend: number;
  trendText: string;
  trendColor: string;
  sparkColor: string;
  sparkBg: string;
  data: number[];
}

/** One segment in the Leads Overview donut */
interface LeadsOverviewItem {
  label: string;
  /** Human-readable value like "20K" */
  value: string;
  count: number;
  color: string;
}

/** One brand row in Total Sales */
interface TotalSalesItem {
  brand: string;
  category: string;
  amount: string;
  projects: number;
  /** Emoji icon – replaces broken image */
  icon: string;
  trend: number;
}

/** One filter checkbox option – comes from API */
interface FilterOption {
  id: string;
  label: string;
  enabled: boolean;
}

/** Pagination shape returned from API */
interface LeadsPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

/** Top-level API response shape */
interface ApiDashboardData {
  meta: {
    lastUpdated: string;
    /** Human-readable e.g. "30 Min Ago" – used in Team Progress footer */
    updatedAgo: string;
    dateRange: { start: string; end: string };
    version: string;
  };
  stats: DashboardStats;
  paymentStats: {
    awaiting: PaymentStat;
    completed: PaymentStat;
    rejected: PaymentStat;
    revenue: PaymentStat;
  };
  paymentChart: PaymentChartData;
  totalSales: {
    amount: string;
    trend: number;
    sparklineData: number[];
    currency: string;
    items: TotalSalesItem[];
  };
  miniStats: {
    tasksCompleted: MiniStat;
    newTasks: MiniStat;
    projectDone: MiniStat;
  };
  leadsOverview: LeadsOverviewItem[];
  leads: Lead[];
  leadsPagination: LeadsPagination;
  schedule: ScheduleItem[];
  projects: ProjectStatus[];
  team: TeamMember[];
  filterOptions: FilterOption[];
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 ── MOCK API RESPONSE
// Replace the simulated delay below with `fetch('/api/dashboard')` when ready.
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_API_RESPONSE: ApiDashboardData = {
  meta: {
    lastUpdated: new Date().toISOString(),
    updatedAgo: '30 Min Ago',          // ← drives "Update 30 Min Ago" in footer
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      end:   new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    },
    version: '1.0.0',
  },

  stats: {
    invoicesAwaiting:   { current: 45, total: 76, amount: '$5,569',             percentage: 56, trend: 'up'   },
    convertedLeads:     { current: 48, total: 86, completed: 52,                percentage: 63, trend: 'up'   },
    projectsInProgress: { current: 16, total: 20, completed: 16,                percentage: 78, trend: 'up'   },
    conversionRate:     { rate: 46.59,             amount: '$2,254',             percentage: 46, trend: 'down' },
  },

  paymentStats: {
    awaiting:  { amount: '$5,486',  percentage: 81, trend:  6 },
    completed: { amount: '$9,275',  percentage: 82, trend: 12 },
    rejected:  { amount: '$3,868',  percentage: 68, trend: -4 },
    revenue:   { amount: '$50,668', percentage: 75, trend:  8 },
  },

  paymentChart: {
    labels:    ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    awaiting:  [ 40,  55,  35,  60,  45,  70,  50,  65,  40,  55,  48,  62],
    completed: [ 65,  70,  80,  75,  85,  90,  78,  88,  72,  82,  76,  95],
    rejected:  [ 20,  25,  15,  30,  22,  18,  28,  20,  25,  18,  22,  16],
    revenue:   [150, 180, 160, 200, 175, 220, 190, 210, 185, 195, 205, 230],
  },

  totalSales: {
    amount: '30,569',
    trend:  12,
    currency: 'USD',
    sparklineData: [30, 45, 35, 60, 40, 70, 55, 65, 50, 75, 60, 80],
    items: [
      { brand: 'Shopify eCommerce Store', category: 'Development', amount: '$1,200', projects: 6, icon: '🛍️', trend:  8 },
      { brand: 'iOS Apps Development',    category: 'Development', amount: '$1,450', projects: 3, icon: '📱', trend: 15 },
      { brand: 'Figma Dashboard Design',  category: 'UI/UX Design', amount: '$1,250', projects: 5, icon: '🎨', trend:  5 },
    ],
  },

  miniStats: {
    tasksCompleted: {
      current: 22, total: 35, trend: 28, trendText: 'more',
      trendColor: '#3454d1', sparkColor: '#3454d1', sparkBg: 'rgba(52,84,209,0.12)',
      data: [10, 15, 12, 18, 14, 20, 16, 22, 18, 25, 20, 22],
    },
    newTasks: {
      current: 5, total: 20, trend: 34, trendText: 'more',
      trendColor: '#17c666', sparkColor: '#17c666', sparkBg: 'rgba(23,198,102,0.12)',
      data: [2, 4, 3, 6, 4, 8, 5, 7, 6, 9, 7, 5],
    },
    projectDone: {
      current: 20, total: 30, trend: 42, trendText: 'more',
      trendColor: '#ea4d4d', sparkColor: '#ea4d4d', sparkBg: 'rgba(234,77,77,0.12)',
      data: [8, 12, 10, 15, 12, 18, 14, 16, 15, 19, 18, 20],
    },
  },

  leadsOverview: [
    { label: 'New',       value: '20K', count: 20, color: '#3454d1' },
    { label: 'Contacted', value: '15K', count: 15, color: '#0d519e' },
    { label: 'Qualified', value: '10K', count: 10, color: '#1976d2' },
    { label: 'Working',   value: '18K', count: 18, color: '#1e88e5' },
    { label: 'Customer',  value: '10K', count: 10, color: '#2196f3' },
    { label: 'Proposal',  value: '15K', count: 15, color: '#42a5f5' },
    { label: 'Leads',     value: '16K', count: 16, color: '#64b5f6' },
    { label: 'Progress',  value: '14K', count: 14, color: '#90caf9' },
    { label: 'Others',    value: '10K', count: 10, color: '#aad6fa' },
  ],

  leads: [
    { id: 1, name: 'Archie Cantones',  email: 'arcie.tones@gmail.com',  initials: 'AC', avatarColor: '#3454d1', proposal: 'Sent',      date: '11/06/2023 10:53', status: 'Completed'      },
    { id: 2, name: 'Holmes Cherryman', email: 'golms.chan@gmail.com',    initials: 'HC', avatarColor: '#17c666', proposal: 'New',       date: '11/06/2023 10:53', status: 'In Progress'    },
    { id: 3, name: 'Malanie Hanvey',   email: 'lanie.nveyn@gmail.com',   initials: 'MH', avatarColor: '#ffa21d', proposal: 'Sent',      date: '11/06/2023 10:53', status: 'Completed'      },
    { id: 4, name: 'Kenneth Hune',     email: 'nneth.une@gmail.com',     initials: 'KH', avatarColor: '#ea4d4d', proposal: 'Returning', date: '11/06/2023 10:53', status: 'Not Interested' },
    { id: 5, name: 'Valentine Maton',  email: 'alenine.aton@gmail.com',  initials: 'VM', avatarColor: '#3dc7be', proposal: 'Sent',      date: '11/06/2023 10:53', status: 'Completed'      },
    { id: 6, name: 'Sophie Laurent',   email: 'sophie.laurent@gmail.com', initials: 'SL', avatarColor: '#9c27b0', proposal: 'New',      date: '11/06/2023 09:15', status: 'In Progress'    },
    { id: 7, name: 'Marcus Webb',      email: 'marcus.webb@gmail.com',   initials: 'MW', avatarColor: '#ff5722', proposal: 'Returning', date: '11/06/2023 08:44', status: 'Completed'      },
    { id: 8, name: 'Diana Park',       email: 'diana.park@gmail.com',    initials: 'DP', avatarColor: '#00bcd4', proposal: 'Sent',      date: '10/06/2023 17:30', status: 'Not Interested' },
    { id: 9, name: 'Owen Fischer',     email: 'owen.fischer@gmail.com',  initials: 'OF', avatarColor: '#8bc34a', proposal: 'New',       date: '10/06/2023 14:20', status: 'In Progress'    },
  ],

  leadsPagination: { currentPage: 1, totalPages: 9, totalItems: 86, perPage: 5 },

  schedule: [
    {
      id: 1, date: 20, month: 'Dec',
      title: 'React Dashboard Design', time: '11:30am - 12:30pm',
      bgColor: '#ebeefa', textColor: '#3454d1',
      participants: [
        { initials: 'JD', bgColor: '#ebeefa', color: '#3454d1' },
        { initials: 'MK', bgColor: '#e1fbed', color: '#17c666' },
        { initials: 'SI', bgColor: '#ffebd0', color: '#ffa21d' },
        { initials: 'MA', bgColor: '#fdeded', color: '#ea4d4d' },
      ],
    },
    {
      id: 2, date: 30, month: 'Dec',
      title: 'Admin Design Concept', time: '10:00am - 12:00pm',
      bgColor: '#ffebd0', textColor: '#ffa21d',
      participants: [
        { initials: 'JD', bgColor: '#ebeefa', color: '#3454d1' },
        { initials: 'MK', bgColor: '#e1fbed', color: '#17c666' },
        { initials: 'MA', bgColor: '#ffebd0', color: '#ffa21d' },
        { initials: 'SL', bgColor: '#fdeded', color: '#ea4d4d' },
      ],
    },
    {
      id: 3, date: 17, month: 'Dec',
      title: 'Standup Team Meeting', time: '8:00am - 9:00am',
      bgColor: '#e1fbed', textColor: '#17c666',
      participants: [
        { initials: 'JD', bgColor: '#ebeefa', color: '#3454d1' },
        { initials: 'MK', bgColor: '#e1fbed', color: '#17c666' },
        { initials: 'SI', bgColor: '#ffebd0', color: '#ffa21d' },
        { initials: 'MA', bgColor: '#fdeded', color: '#ea4d4d' },
      ],
    },
    {
      id: 4, date: 25, month: 'Dec',
      title: 'Zoom Team Meeting', time: '03:30pm - 05:30pm',
      bgColor: '#fdeded', textColor: '#ea4d4d',
      participants: [
        { initials: 'JD', bgColor: '#ebeefa', color: '#3454d1' },
        { initials: 'SI', bgColor: '#ffebd0', color: '#ffa21d' },
        { initials: 'MA', bgColor: '#fdeded', color: '#ea4d4d' },
        { initials: 'KH', bgColor: '#dbf5f3', color: '#3dc7be' },
      ],
    },
  ],

  projects: [
    { id: 1, title: 'Apps Development',       category: 'Applications', icon: '📱', progress: 54, progressColor: '#ea4d4d' },
    { id: 2, title: 'Dashboard Design',       category: 'App UI Kit',   icon: '🎨', progress: 86, progressColor: '#3454d1' },
    { id: 3, title: 'Facebook Marketing',     category: 'Marketing',    icon: '📘', progress: 90, progressColor: '#17c666' },
    { id: 4, title: 'React Dashboard Github', category: 'Dashboard',    icon: '💻', progress: 37, progressColor: '#3dc7be' },
    { id: 5, title: 'Paypal Payment Gateway', category: 'Payment',      icon: '💳', progress: 29, progressColor: '#ffa21d' },
  ],

  team: [
    { id: 1, name: 'Alexandra Della', role: 'Frontend Developer', initials: 'AD', avatarColor: '#3454d1', progress: 75, lastUpdated: '30 Min Ago' },
    { id: 2, name: 'Archie Cantones', role: 'UI/UX Designer',     initials: 'AC', avatarColor: '#17c666', progress: 68, lastUpdated: '45 Min Ago' },
    { id: 3, name: 'Malanie Hanvey',  role: 'Backend Developer',  initials: 'MH', avatarColor: '#ffa21d', progress: 82, lastUpdated: '1 Hr Ago'   },
    { id: 4, name: 'Kenneth Hune',    role: 'Digital Marketer',   initials: 'KH', avatarColor: '#ea4d4d', progress: 63, lastUpdated: '2 Hr Ago'   },
  ],

  filterOptions: [
    { id: 'role',           label: 'Role',           enabled: true },
    { id: 'team',           label: 'Team',           enabled: true },
    { id: 'email',          label: 'Email',          enabled: true },
    { id: 'member',         label: 'Member',         enabled: true },
    { id: 'recommendation', label: 'Recommendation', enabled: true },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 ── DATA FETCHING HOOK
// ─────────────────────────────────────────────────────────────────────────────

function useDashboardData() {
  const [data,      setData     ] = useState<ApiDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error,     setError    ] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // ── ✅ SWAP THIS BLOCK TO USE A REAL ENDPOINT ─────────────────────────
      // const res  = await fetch('/api/dashboard');
      // if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      // const json = (await res.json()) as ApiDashboardData;
      // setData(json);
      // ─────────────────────────────────────────────────────────────────────
      await new Promise<void>(resolve => setTimeout(resolve, 700));
      setData({
        ...MOCK_API_RESPONSE,
        meta: { ...MOCK_API_RESPONSE.meta, lastUpdated: new Date().toISOString() },
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error loading dashboard');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 ── CHART HOOK
// Dynamically imports chart.js/auto (avoids Next.js SSR errors),
// destroys stale instance before creating a new one, cleans up on unmount.
// ─────────────────────────────────────────────────────────────────────────────

function useChart(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  buildConfig: () => object,
  deps: React.DependencyList,
): void {
  const instanceRef = useRef<unknown>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      if (!canvasRef.current) return;
      // Dynamic import keeps Chart.js out of the SSR bundle
      const mod = await import('chart.js/auto' as string);
      const Chart     = (mod as any).Chart     ?? (mod as any).default;
      const registerables = (mod as any).registerables;
      if (registerables) Chart.register(...registerables);
      if (!active || !canvasRef.current) return;
      // Destroy previous instance if one exists
      (instanceRef.current as any)?.destroy();
      instanceRef.current = new Chart(canvasRef.current, buildConfig());
    })();

    return () => {
      active = false;
      (instanceRef.current as any)?.destroy();
      instanceRef.current = null;
    };
    // deps are spread intentionally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 ── SHARED MICRO COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// ── Avatar ───────────────────────────────────────────────────────────────────
/** Renders a coloured-initials circle. No image files required. */
function Avatar({
  initials,
  color,
  size = 40,
}: {
  initials: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      style={{
        width:     size,
        height:    size,
        minWidth:  size,
        minHeight: size,
        borderRadius: '50%',
        background: `${color}22`,
        border:     `1px solid ${color}55`,
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        fontWeight: 700,
        fontSize:   Math.round(size * 0.34),
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ── ProgressBar ──────────────────────────────────────────────────────────────
function ProgressBar({
  value,
  color,
  height = 4,
}: {
  value: number;
  color: string;
  height?: number;
}) {
  return (
    <div
      className="progress"
      style={{
        height,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#e9ecef',
        flexShrink: 0,
      }}
    >
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          backgroundColor: color,
          transition: 'width 0.8s ease',
        }}
      />
    </div>
  );
}

// ── TrendBadge ───────────────────────────────────────────────────────────────
/** Shows ▲ 12% in green or ▼ 4% in red based on sign of value */
function TrendBadge({ value, size = 11 }: { value: number; size?: number }) {
  const isUp = value >= 0;
  return (
    <span
      style={{
        fontSize:   size,
        fontWeight: 600,
        color:      isUp ? '#17c666' : '#ea4d4d',
        whiteSpace: 'nowrap',
      }}
    >
      {isUp ? '▲' : '▼'}&nbsp;{Math.abs(value)}%
    </span>
  );
}

// ── StatusBadge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Lead['status'] }) {
  const MAP: Record<string, { bg: string; color: string }> = {
    'Completed':      { bg: '#e1fbed', color: '#17c666' },
    'In Progress':    { bg: '#ebeefa', color: '#3454d1' },
    'Not Interested': { bg: '#ffebd0', color: '#ffa21d' },
  };
  const s = MAP[status] ?? { bg: '#e9ecef', color: '#64748b' };
  return (
    <span
      className="badge"
      style={{
        background:  s.bg,
        color:       s.color,
        fontWeight:  600,
        padding:     '5px 9px',
        borderRadius: 4,
        fontSize:    11,
      }}
    >
      {status}
    </span>
  );
}

// ── SkeletonCard ─────────────────────────────────────────────────────────────
/** Grey placeholder card shown while data loads */
function SkeletonCard({ height = 180 }: { height?: number }) {
  return (
    <div className="card mb-0" style={{ minHeight: height }}>
      <div className="card-body d-flex flex-column gap-3 p-4">
        <div style={{ height: 14, width: '42%', background: '#e9ecef', borderRadius: 6 }} />
        <div style={{ height: 10, width: '68%', background: '#f3f4f6', borderRadius: 6 }} />
        <div style={{ height: 10, width: '50%', background: '#f3f4f6', borderRadius: 6 }} />
        <div
          style={{
            flex:       1,
            background: '#f8f9fa',
            borderRadius: 8,
            marginTop:  8,
            minHeight:  height - 96,
          }}
        />
      </div>
    </div>
  );
}

// ── ErrorBanner ──────────────────────────────────────────────────────────────
function ErrorBanner({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      className="alert d-flex align-items-center justify-content-between mb-4"
      style={{
        background: '#fff5f5',
        border:     '1px solid #fcc',
        borderRadius: 8,
        color:      '#c0392b',
      }}
    >
      <span>
        <i className="feather-alert-circle me-2" />
        <strong>Failed to load dashboard:</strong>&nbsp;{message}
      </span>
      <button className="btn btn-sm btn-danger ms-4" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 ── CARD ACTIONS COMPONENT
// Three macOS-style traffic-light buttons (delete / refresh / fullscreen)
// plus a ⋮ options dropdown.
// ─────────────────────────────────────────────────────────────────────────────

function CardActions({
  cardRef,
  onDelete,
  onRefresh,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  onDelete: () => void;
  onRefresh: () => void;
}) {
  const handleFullscreen = () => {
    if (!cardRef.current) return;
    if (!document.fullscreenElement) {
      cardRef.current.requestFullscreen?.().catch(() => {
        // fullscreen may be blocked by the browser
      });
    } else {
      document.exitFullscreen?.();
    }
  };

  const dot = (
    bg: string,
    title: string,
    label: string,
    onClick: () => void,
  ) => (
    <button
      title={title}
      onClick={onClick}
      style={{
        width:    18,
        height:   18,
        borderRadius: '50%',
        background:   bg,
        border:       'none',
        cursor:       'pointer',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        color:        '#fff',
        fontSize:     12,
        lineHeight:   1,
        padding:      0,
        flexShrink:   0,
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="card-header-action d-flex align-items-center gap-2">
      {/* Traffic-light buttons */}
      <div style={{ display: 'flex', gap: 4 }}>
        {dot('#ea4d4d', 'Delete card',     '×', onDelete)}
        {dot('#ffa21d', 'Refresh data',    '↻', onRefresh)}
        {dot('#17c666', 'Toggle fullscreen','⤢', handleFullscreen)}
      </div>

      {/* ⋮ Options dropdown */}
      <div className="dropdown">
        <a
          href="#"
          className="avatar-text avatar-sm"
          data-bs-toggle="dropdown"
          data-bs-offset="25,25"
          onClick={e => e.preventDefault()}
          aria-label="Card options"
        >
          <i className="feather-more-vertical" />
        </a>
        <div className="dropdown-menu dropdown-menu-end">
          <a href="#" className="dropdown-item">
            <i className="feather-at-sign me-2" />New
          </a>
          <a href="#" className="dropdown-item">
            <i className="feather-calendar me-2" />Event
          </a>
          <a href="#" className="dropdown-item">
            <i className="feather-bell me-2" />Snoozed
          </a>
          <a href="#" className="dropdown-item text-danger">
            <i className="feather-trash-2 me-2" />Deleted
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="feather-settings me-2" />Settings
          </a>
          <a href="#" className="dropdown-item">
            <i className="feather-life-buoy me-2" />Tips &amp; Tricks
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 ── KPI STAT CARD  (top row × 4)
// ─────────────────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon:       string;
  label:      string;
  primary:    React.ReactNode;
  secondary:  string;
  percentage: number;
  barColor:   string;
  trend:      'up' | 'down';
}

function StatCard({
  icon,
  label,
  primary,
  secondary,
  percentage,
  barColor,
  trend,
}: StatCardProps) {
  return (
    <div className="card stretch stretch-full mb-0 h-100">
      <div className="card-body">
        {/* Icon + headline number */}
        <div className="d-flex align-items-start justify-content-between mb-4">
          <div className="d-flex gap-4 align-items-center">
            <div className="avatar-text avatar-lg bg-gray-200">
              <i className={icon} />
            </div>
            <div>
              <div className="fs-4 fw-bold text-dark">{primary}</div>
              <h3 className="fs-13 fw-semibold text-truncate-1-line mb-0">{label}</h3>
            </div>
          </div>
          <span style={{ fontSize: 20, color: trend === 'up' ? '#17c666' : '#ea4d4d', lineHeight: 1 }}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        </div>

        {/* Progress bar row */}
        <div className="pt-3">
          <div className="d-flex align-items-center justify-content-between mb-1">
            <a href="#" className="fs-12 fw-medium text-muted text-truncate-1-line" style={{ maxWidth: '55%' }}>
              {label}
            </a>
            <span className="text-nowrap fs-12">
              <span className="text-dark">{secondary}</span>
              <span className="text-muted ms-1">({percentage}%)</span>
            </span>
          </div>
          <ProgressBar value={percentage} color={barColor} height={3} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8 ── PAYMENT RECORDS CARD  (multi-series line chart)
// ─────────────────────────────────────────────────────────────────────────────

function PaymentRecordsCard({
  chartData,
  paymentStats,
  onDelete,
  onRefresh,
  refreshKey,
}: {
  chartData:    PaymentChartData;
  paymentStats: ApiDashboardData['paymentStats'];
  onDelete:     () => void;
  onRefresh:    () => void;
  refreshKey:   number;
}) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useChart(
    canvasRef,
    () => ({
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Awaiting',
            data:  chartData.awaiting,
            borderColor:     '#3454d1',
            backgroundColor: 'rgba(52,84,209,0.08)',
            fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 5, borderWidth: 2,
          },
          {
            label: 'Completed',
            data:  chartData.completed,
            borderColor:     '#17c666',
            backgroundColor: 'rgba(23,198,102,0.07)',
            fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 5, borderWidth: 2,
          },
          {
            label: 'Rejected',
            data:  chartData.rejected,
            borderColor:     '#ea4d4d',
            backgroundColor: 'rgba(234,77,77,0.07)',
            fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 5, borderWidth: 2,
          },
          {
            label: 'Revenue',
            data:  chartData.revenue,
            borderColor:     '#283c50',
            backgroundColor: 'rgba(40,60,80,0.05)',
            fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 5, borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { size: 11, weight: '600' }, padding: 16, usePointStyle: true, pointStyleWidth: 10 },
          },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 } } },
        },
        animation: { duration: 800 },
      },
    }),
    [chartData, refreshKey],
  );

  const STAT_KEYS: { key: keyof ApiDashboardData['paymentStats']; label: string; color: string }[] = [
    { key: 'awaiting',  label: 'Awaiting',  color: '#3454d1' },
    { key: 'completed', label: 'Completed', color: '#17c666' },
    { key: 'rejected',  label: 'Rejected',  color: '#ea4d4d' },
    { key: 'revenue',   label: 'Revenue',   color: '#283c50' },
  ];

  return (
    <div className="card stretch stretch-full mb-0 h-100" ref={cardRef}>
      <div className="card-header">
        <h5 className="card-title">Payment Record</h5>
        <CardActions cardRef={cardRef} onDelete={onDelete} onRefresh={onRefresh} />
      </div>

      {/* Chart area – position:relative + absolute canvas = fills the box perfectly */}
      <div className="card-body custom-card-action p-3" style={{ position: 'relative', height: 290 }}>
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset:    12,
            width:    'calc(100% - 24px)',
            height:   'calc(100% - 24px)',
          }}
        />
      </div>

      {/* Footer stats */}
      <div className="card-footer">
        <div className="row g-3">
          {STAT_KEYS.map(({ key, label, color }) => {
            const s = paymentStats[key];
            return (
              <div key={key} className="col-lg-3 col-6">
                <div className="p-3 border border-dashed rounded-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fs-12 text-muted">{label}</span>
                    <TrendBadge value={s.trend} />
                  </div>
                  <h6 className="fw-bold text-dark mb-2">{s.amount}</h6>
                  <ProgressBar value={s.percentage} color={color} height={3} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9 ── TOTAL SALES CARD  (white sparkline on blue header)
// ─────────────────────────────────────────────────────────────────────────────

function TotalSalesCard({
  sales,
  onDelete,
  refreshKey,
}: {
  sales:      ApiDashboardData['totalSales'];
  onDelete:   () => void;
  refreshKey: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useChart(
    canvasRef,
    () => ({
      type: 'line',
      data: {
        labels:   Array(sales.sparklineData.length).fill(''),
        datasets: [{
          data:            sales.sparklineData,
          borderColor:     'rgba(255,255,255,0.95)',
          backgroundColor: 'rgba(255,255,255,0.18)',
          fill:          true,
          tension:       0.5,
          pointRadius:   0,
          borderWidth:   2.5,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales:  { x: { display: false }, y: { display: false } },
        animation: { duration: 700 },
      },
    }),
    [sales, refreshKey],
  );

  return (
    <div className="card stretch stretch-full mb-0 h-100 overflow-hidden">
      {/* Blue header + sparkline */}
      <div style={{ background: '#3454d1', color: '#fff' }}>
        <div className="p-4 d-flex justify-content-between align-items-start">
          <div>
            <h4 className="mb-0 fw-bold" style={{ color: '#fff' }}>
              {sales.amount}
            </h4>
            <p className="mb-0 mt-1" style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13 }}>
              Total Sales
            </p>
          </div>
          <span
            className="badge"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color:      '#fff',
              fontSize:   12,
              padding:    '6px 10px',
            }}
          >
            +{sales.trend}%
          </span>
        </div>

        {/* Sparkline canvas */}
        <div style={{ height: 140, position: 'relative' }}>
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Brand items */}
      <div className="card-body p-0">
        {sales.items.map((item, idx) => (
          <div
            key={idx}
            className={`d-flex align-items-center justify-content-between px-4 py-3${
              idx < sales.items.length - 1 ? ' border-bottom border-dashed' : ''
            }`}
          >
            <div className="hstack gap-3">
              <div
                style={{
                  width:      42,
                  height:     42,
                  borderRadius: 8,
                  background: '#f3f4f6',
                  border:     '1px solid #e5e7eb',
                  display:    'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize:   24,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <a href="#" className="d-block fw-semibold text-dark" style={{ fontSize: 13 }}>
                  {item.brand}
                </a>
                <span className="fs-12 text-muted">{item.category}</span>
              </div>
            </div>
            <div className="text-end">
              <div className="fw-bold text-dark">{item.amount}</div>
              <div className="fs-12 text-muted">{item.projects} Projects</div>
            </div>
          </div>
        ))}
      </div>

      <a href="#" className="card-footer fs-11 fw-bold text-uppercase text-center py-4 d-block">
        Full Details
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10 ── MINI STAT CARD  (sparkline + count + % trend)
// ─────────────────────────────────────────────────────────────────────────────

function MiniStatCard({
  title,
  subTitle,
  icon,
  stat,
  onDelete,
  refreshKey,
}: {
  title:      string;
  subTitle:   string;
  icon:       string;
  stat:       MiniStat;
  onDelete:   () => void;
  refreshKey: number;
}) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useChart(
    canvasRef,
    () => ({
      type: 'line',
      data: {
        labels:   Array(stat.data.length).fill(''),
        datasets: [{
          data:            stat.data,
          borderColor:     stat.sparkColor,
          backgroundColor: stat.sparkBg,
          fill:          true,
          tension:       0.4,
          pointRadius:   0,
          borderWidth:   2.5,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales:  { x: { display: false }, y: { display: false } },
        animation: { duration: 700 },
      },
    }),
    [stat, refreshKey],
  );

  return (
    <div className="card mb-0 stretch stretch-full h-100" ref={cardRef}>
      {/* Header row */}
      <div className="card-header d-flex align-items-center justify-content-between py-3 px-4">
        <div className="d-flex gap-3 align-items-center">
          <div
            style={{
              width:    38,
              height:   38,
              minWidth: 38,
              borderRadius: '50%',
              background:   stat.sparkBg,
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              flexShrink:   0,
            }}
          >
            <i className={icon} style={{ color: stat.sparkColor, fontSize: 17 }} />
          </div>
          <div>
            <div className="fw-semibold text-dark" style={{ fontSize: 13 }}>{title}</div>
            <div className="fs-12 text-muted">{subTitle}</div>
          </div>
        </div>
        <div className="fs-4 fw-bold text-dark">{stat.current}/{stat.total}</div>
      </div>

      {/* Sparkline + trend text */}
      <div
        className="card-body d-flex align-items-center justify-content-between gap-4"
        style={{ minHeight: 90, paddingTop: 8, paddingBottom: 8 }}
      >
        <div style={{ flex: 1, height: 65, position: 'relative' }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        </div>
        <div className="fs-12 text-muted text-nowrap text-end" style={{ minWidth: 100 }}>
          <span className="fw-semibold d-block" style={{ color: stat.sparkColor, fontSize: 13 }}>
            {stat.trend}% {stat.trendText}
          </span>
          <span>from last week</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11 ── LEADS OVERVIEW CARD  (doughnut)
// ─────────────────────────────────────────────────────────────────────────────

function LeadsOverviewCard({
  items,
  onDelete,
  onRefresh,
  refreshKey,
}: {
  items:      LeadsOverviewItem[];
  onDelete:   () => void;
  onRefresh:  () => void;
  refreshKey: number;
}) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useChart(
    canvasRef,
    () => ({
      type: 'doughnut',
      data: {
        labels:   items.map(i => i.label),
        datasets: [{
          data:            items.map(i => i.count),
          backgroundColor: items.map(i => i.color),
          borderColor:     '#fff',
          borderWidth:     2,
          hoverOffset:     6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx: any) => {
                const item = items[ctx.dataIndex];
                return ` ${ctx.label}: ${item?.value ?? ''}`;
              },
            },
          },
        },
        animation: { animateRotate: true, duration: 900 },
      },
    }),
    [items, refreshKey],
  );

  return (
    <div className="card stretch stretch-full mb-0 h-100" ref={cardRef}>
      <div className="card-header">
        <h5 className="card-title">Leads Overview</h5>
        <CardActions cardRef={cardRef} onDelete={onDelete} onRefresh={onRefresh} />
      </div>
      <div className="card-body custom-card-action">
        {/* Doughnut */}
        <div style={{ height: 240, position: 'relative', marginBottom: 18 }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        </div>

        {/* 9-item colour legend grid */}
        <div className="row g-2 mt-2">
          {items.map((item, idx) => (
            <div key={idx} className="col-4">
              <a
                href="#"
                className="p-2 hstack gap-2 rounded border border-dashed border-gray-5"
                style={{ textDecoration: 'none', fontSize: 11 }}
              >
                <span
                  style={{
                    width:    8,
                    height:   8,
                    minWidth: 8,
                    borderRadius: '50%',
                    background:   item.color,
                    display:      'inline-block',
                    flexShrink:   0,
                  }}
                />
                <span className="text-dark fw-medium">{item.label}</span>
                <span className="fs-10 text-muted ms-auto">({item.value})</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 12 ── LATEST LEADS TABLE  (with ellipsis pagination)
// ─────────────────────────────────────────────────────────────────────────────

function LatestLeadsCard({
  allLeads,
  pagination,
  onDelete,
  onRefresh,
  onPageChange,
  onViewLead,
  onEditLead,
  onDeleteLead,
}: {
  allLeads:     Lead[];
  pagination:   LeadsPagination;
  onDelete:     () => void;
  onRefresh:    () => void;
  onPageChange: (p: number) => void;
  onViewLead:   (id: number) => void;
  onEditLead:   (id: number) => void;
  onDeleteLead: (id: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { currentPage, totalPages, perPage } = pagination;

  // Slice the leads to the current page
  const visibleLeads = allLeads.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  // Ellipsis pagination builder
  const buildPages = (): (number | '…')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4)             return [1, 2, 3, 4, 5, '…', totalPages];
    if (currentPage >= totalPages - 3) return [1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '…', currentPage - 1, currentPage, currentPage + 1, '…', totalPages];
  };

  const goto = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  return (
    <div className="card stretch stretch-full mb-0 h-100" ref={cardRef}>
      <div className="card-header">
        <h5 className="card-title">Latest Leads</h5>
        <CardActions cardRef={cardRef} onDelete={onDelete} onRefresh={onRefresh} />
      </div>

      <div className="card-body custom-card-action p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr className="border-b">
                <th scope="col" style={{ paddingLeft: 24 }}>Users</th>
                <th scope="col">Proposal</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-end" style={{ paddingRight: 24 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleLeads.map(lead => (
                <tr key={lead.id}>
                  {/* User */}
                  <td style={{ paddingLeft: 24 }}>
                    <div className="d-flex align-items-center gap-3">
                      <Avatar initials={lead.initials} color={lead.avatarColor} size={38} />
                      <a
                        href="#"
                        style={{ textDecoration: 'none' }}
                        onClick={e => { e.preventDefault(); onViewLead(lead.id); }}
                      >
                        <span className="d-block fw-semibold text-dark fs-13">{lead.name}</span>
                        <span className="d-block fs-12 text-muted">{lead.email}</span>
                      </a>
                    </div>
                  </td>

                  {/* Proposal badge */}
                  <td>
                    <span
                      className="badge"
                      style={{
                        background:  '#e9ecef',
                        color:       '#283c50',
                        fontWeight:  500,
                        padding:     '5px 8px',
                        borderRadius: 4,
                        fontSize:    11,
                      }}
                    >
                      {lead.proposal}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="fs-12 text-muted">{lead.date}</td>

                  {/* Status */}
                  <td><StatusBadge status={lead.status} /></td>

                  {/* Actions */}
                  <td className="text-end" style={{ paddingRight: 24 }}>
                    <div className="dropdown">
                      <a
                        href="#"
                        className="text-dark"
                        data-bs-toggle="dropdown"
                        onClick={e => e.preventDefault()}
                        aria-label="Lead options"
                      >
                        <i className="feather-more-vertical" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button className="dropdown-item fs-13" onClick={() => onViewLead(lead.id)}>
                            <i className="feather-eye me-3" />View
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item fs-13" onClick={() => onEditLead(lead.id)}>
                            <i className="feather-edit-3 me-3" />Edit
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item fs-13 text-danger" onClick={() => onDeleteLead(lead.id)}>
                            <i className="feather-trash-2 me-3" />Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer d-flex align-items-center justify-content-between flex-wrap gap-2">
        <span className="fs-12 text-muted">
          Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, allLeads.length)} of {allLeads.length} leads
        </span>
        <ul className="list-unstyled d-flex align-items-center gap-2 mb-0 pagination-common-style">
          <li>
            <a
              href="#"
              onClick={e => goto(e, currentPage - 1)}
              style={{ opacity: currentPage <= 1 ? 0.4 : 1, pointerEvents: currentPage <= 1 ? 'none' : 'auto' }}
            >
              <i className="bi bi-arrow-left" />
            </a>
          </li>

          {buildPages().map((p, idx) => (
            <li key={idx}>
              {p === '…' ? (
                <span className="px-1 text-muted" style={{ fontSize: 14 }}>…</span>
              ) : (
                <a
                  href="#"
                  className={p === currentPage ? 'active' : ''}
                  onClick={e => goto(e, p as number)}
                >
                  {p}
                </a>
              )}
            </li>
          ))}

          <li>
            <a
              href="#"
              onClick={e => goto(e, currentPage + 1)}
              style={{
                opacity:       currentPage >= totalPages ? 0.4 : 1,
                pointerEvents: currentPage >= totalPages ? 'none' : 'auto',
              }}
            >
              <i className="bi bi-arrow-right" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 13 ── UPCOMING SCHEDULE CARD
// ─────────────────────────────────────────────────────────────────────────────

function UpcomingScheduleCard({
  items,
  onDelete,
  onRefresh,
}: {
  items:     ScheduleItem[];
  onDelete:  () => void;
  onRefresh: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="card stretch stretch-full mb-0 h-100" ref={cardRef}>
      <div className="card-header">
        <h5 className="card-title">Upcoming Schedule</h5>
        <CardActions cardRef={cardRef} onDelete={onDelete} onRefresh={onRefresh} />
      </div>

      <div className="card-body">
        {items.map(item => (
          <div key={item.id} className="p-3 border border-dashed rounded-3 mb-3">
            <div className="d-flex align-items-center justify-content-between">

              {/* Date badge + title/time */}
              <div className="d-flex align-items-center gap-3">
                <div
                  style={{
                    width:    52,
                    height:   52,
                    minWidth: 52,
                    background:   item.bgColor,
                    color:        item.textColor,
                    borderRadius: 8,
                    display:      'flex',
                    flexDirection: 'column',
                    alignItems:   'center',
                    justifyContent: 'center',
                    flexShrink:   0,
                    lineHeight:   1.2,
                  }}
                >
                  <span style={{ fontSize: 20, fontWeight: 700, display: 'block' }}>{item.date}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', display: 'block', marginTop: 2 }}>
                    {item.month}
                  </span>
                </div>
                <div>
                  <a
                    href="#"
                    className="d-block fw-bold text-dark text-truncate-1-line mb-1"
                    style={{ fontSize: 13, textDecoration: 'none' }}
                  >
                    {item.title}
                  </a>
                  <span className="fs-11 text-muted">{item.time}</span>
                </div>
              </div>

              {/* Participant avatar stack */}
              <div className="img-group lh-0 d-flex ms-3">
                {item.participants.slice(0, 4).map((p, idx) => (
                  <div
                    key={idx}
                    title={p.initials}
                    style={{
                      width:    28,
                      height:   28,
                      borderRadius: '50%',
                      background: p.bgColor,
                      color:      p.color,
                      border:     '2px solid #fff',
                      display:    'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize:   9,
                      fontWeight: 700,
                      marginLeft: idx > 0 ? -8 : 0,
                      position:   'relative',
                      zIndex:     4 - idx,
                    }}
                  >
                    {p.initials}
                  </div>
                ))}
                {item.participants.length > 4 && (
                  <div
                    style={{
                      width:    28,
                      height:   28,
                      borderRadius: '50%',
                      background: '#e9ecef',
                      color:      '#64748b',
                      border:     '2px solid #fff',
                      display:    'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize:   9,
                      fontWeight: 700,
                      marginLeft: -8,
                    }}
                  >
                    +{item.participants.length - 4}
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      <a href="#" className="card-footer fs-11 fw-bold text-uppercase text-center py-4 d-block">
        Upcoming Schedule
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 14 ── PROJECT STATUS CARD
// ─────────────────────────────────────────────────────────────────────────────

function ProjectStatusCard({
  projects,
  onDelete,
  onRefresh,
}: {
  projects:  ProjectStatus[];
  onDelete:  () => void;
  onRefresh: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="card stretch stretch-full mb-0 h-100" ref={cardRef}>
      <div className="card-header">
        <h5 className="card-title">Project Status</h5>
        <CardActions cardRef={cardRef} onDelete={onDelete} onRefresh={onRefresh} />
      </div>

      <div className="card-body custom-card-action">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className={`d-flex align-items-center${idx < projects.length - 1 ? ' mb-4 pb-1 border-bottom border-dashed' : ''}`}
          >
            {/* Brand column */}
            <div className="d-flex align-items-center me-3" style={{ width: '50%', minWidth: '50%', overflow: 'hidden' }}>
              <span
                style={{
                  fontSize:   24,
                  marginRight: 10,
                  flexShrink:  0,
                  width:       36,
                  height:      36,
                  display:     'inline-flex',
                  alignItems:  'center',
                  justifyContent: 'center',
                }}
              >
                {project.icon}
              </span>
              <div style={{ overflow: 'hidden', minWidth: 0 }}>
                <a
                  href="#"
                  className="d-block fw-semibold text-dark text-truncate-1-line"
                  style={{ fontSize: 13, textDecoration: 'none' }}
                >
                  {project.title}
                </a>
                <div className="fs-11 text-muted">{project.category}</div>
              </div>
            </div>

            {/* Progress column */}
            <div className="d-flex flex-grow-1 align-items-center gap-2">
              <div className="flex-grow-1">
                <ProgressBar value={project.progress} color={project.progressColor} height={5} />
              </div>
              <span className="text-muted fs-12" style={{ minWidth: 34, textAlign: 'right', flexShrink: 0 }}>
                {project.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <a href="#" className="card-footer fs-11 fw-bold text-uppercase text-center py-4 d-block">
        Upcoming Projects
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 15 ── TEAM PROGRESS CARD
// Each member row shows per-member lastUpdated from API.
// Card footer shows the global updatedAgo from API meta.
// ─────────────────────────────────────────────────────────────────────────────

function TeamProgressCard({
  members,
  updatedAgo,
  onDelete,
  onRefresh,
}: {
  members:    TeamMember[];
  /** Global "X ago" string from API meta */
  updatedAgo: string;
  onDelete:   () => void;
  onRefresh:  () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="card stretch stretch-full mb-0 h-100" ref={cardRef}>
      <div className="card-header">
        <h5 className="card-title">Team Progress</h5>
        <CardActions cardRef={cardRef} onDelete={onDelete} onRefresh={onRefresh} />
      </div>

      <div className="card-body custom-card-action">
        {members.map((member, idx) => (
          <div
            key={member.id}
            className={`hstack justify-content-between border border-dashed rounded-3 p-3${
              idx < members.length - 1 ? ' mb-3' : ''
            }`}
          >
            {/* Avatar + name */}
            <div className="hstack gap-3">
              <Avatar initials={member.initials} color={member.avatarColor} size={40} />
              <div>
                <a
                  href="#"
                  className="d-block fw-semibold fs-13"
                  style={{ color: '#283c50', textDecoration: 'none' }}
                >
                  {member.name}
                </a>
                <div className="fs-11 text-muted">{member.role}</div>
              </div>
            </div>

            {/* Progress + per-member lastUpdated (from API) */}
            <div style={{ width: 130, flexShrink: 0 }}>
              <div className="d-flex justify-content-between mb-1">
                <span className="fs-11 text-muted">Progress</span>
                <span className="fs-11 fw-semibold text-dark">{member.progress}%</span>
              </div>
              <ProgressBar value={member.progress} color="#3454d1" height={6} />
              {/* Per-member updated time comes from API, NOT hardcoded */}
              <div className="fs-10 text-muted mt-1 text-end">{member.lastUpdated}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer shows global updatedAgo from API meta – NOT hardcoded */}
      <div className="card-footer fs-11 fw-bold text-uppercase text-center py-4">
        Update {updatedAgo}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 16 ── ROOT DASHBOARD PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboardData();

  // ── Card visibility ─────────────────────────────────────────────────────────
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const hideCard   = (key: string) => setHidden(h => ({ ...h, [key]: true }));
  const restoreAll = () => setHidden({});
  const hiddenCount = Object.values(hidden).filter(Boolean).length;

  // ── Per-card refresh keys (increment → chart re-initialises) ───────────────
  const [refreshKeys, setRefreshKeys] = useState<Record<string, number>>({});
  const refreshCard = (key: string) => {
    refetch(); // re-fetch API data
    setRefreshKeys(k => ({ ...k, [key]: (k[key] ?? 0) + 1 }));
  };

  // ── Filter options – seeded from API, locally editable ─────────────────────
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  useEffect(() => {
    if (data) setFilterOptions(data.filterOptions);
  }, [data]);
  const toggleFilter = (id: string) =>
    setFilterOptions(prev =>
      prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f),
    );

  // ── Leads pagination ────────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);

  // ── Lead row actions ────────────────────────────────────────────────────────
  const handleViewLead   = (id: number) => { /* router.push(`/admin/leads/${id}`) */ console.log('[Dashboard] view',   id); };
  const handleEditLead   = (id: number) => { /* router.push(`/admin/leads/${id}/edit`) */ console.log('[Dashboard] edit', id); };
  const handleDeleteLead = (id: number) => { console.log('[Dashboard] delete', id); };

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const col8or12 = (siblingHidden: boolean) => siblingHidden ? 'col-xxl-12' : 'col-xxl-8';
  const col4or12 = (siblingHidden: boolean) => siblingHidden ? 'col-xxl-12' : 'col-xxl-4';

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <main className="nxl-container">
      <div className="nxl-content">

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/*  PAGE HEADER                                                        */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="page-header">
          <div className="page-header-left d-flex align-items-center">
            <div className="page-header-title">
              <h5 className="m-b-10">Dashboard</h5>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/admin/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">Dashboard</li>
            </ul>
          </div>

          <div className="page-header-right ms-auto">
            <div className="page-header-right-items">

              {/* Back button (mobile) */}
              <div className="d-flex d-md-none">
                <a href="#" className="page-header-right-close-toggle">
                  <i className="feather-arrow-left me-2" />
                  <span>Back</span>
                </a>
              </div>

              <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">

                {/* Date range – driven by API meta */}
                <div id="reportrange" className="reportrange-picker d-flex align-items-center">
                  <span className="reportrange-picker-field">
                    {data
                      ? `${data.meta.dateRange.start} — ${data.meta.dateRange.end}`
                      : '…'}
                  </span>
                </div>

                {/* Restore hidden cards button */}
                {hiddenCount > 0 && (
                  <button
                    className="btn btn-md btn-light-brand"
                    onClick={restoreAll}
                    title={`Restore ${hiddenCount} hidden card${hiddenCount > 1 ? 's' : ''}`}
                  >
                    <i className="feather-refresh-cw me-2" />
                    Restore ({hiddenCount})
                  </button>
                )}

                {/* Filter dropdown – options come from API */}
                <div className="dropdown filter-dropdown">
                  <a
                    className="btn btn-md btn-light-brand"
                    data-bs-toggle="dropdown"
                    data-bs-offset="0,10"
                    data-bs-auto-close="outside"
                    href="#"
                    onClick={e => e.preventDefault()}
                  >
                    <i className="feather-filter me-2" />
                    <span>Filter</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end" style={{ minWidth: 230 }}>
                    {filterOptions.map(f => (
                      <div key={f.id} className="dropdown-item">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`filter-${f.id}`}
                            checked={f.enabled}
                            onChange={() => toggleFilter(f.id)}
                          />
                          <label
                            className="custom-control-label c-pointer ms-2"
                            htmlFor={`filter-${f.id}`}
                          >
                            {f.label}
                          </label>
                        </div>
                      </div>
                    ))}
                    <div className="dropdown-divider" />
                    <a href="#" className="dropdown-item">
                      <i className="feather-plus me-3" />Create New
                    </a>
                    <a href="#" className="dropdown-item">
                      <i className="feather-filter me-3" />Manage Filter
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Open toggle (mobile) */}
            <div className="d-md-none d-flex align-items-center ms-2">
              <a href="#" className="page-header-right-open-toggle">
                <i className="feather-align-right fs-20" />
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/*  MAIN CONTENT                                                       */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="main-content">

          {/* Global error banner */}
          {error && <ErrorBanner message={error} onRetry={refetch} />}

          <div className="row g-3">

            {/* ─────────────────────────────────────────────────────────────── */}
            {/*  ROW 1 – Four KPI stat cards                                    */}
            {/* ─────────────────────────────────────────────────────────────── */}
            {isLoading ? (
              [0, 1, 2, 3].map(i => (
                <div key={i} className="col-xxl-3 col-md-6">
                  <SkeletonCard height={140} />
                </div>
              ))
            ) : data && (
              <>
                {/* Invoices Awaiting Payment */}
                <div className="col-xxl-3 col-md-6">
                  <StatCard
                    icon="feather-dollar-sign"
                    label="Invoices Awaiting Payment"
                    primary={
                      <>
                        <span className="counter">{data.stats.invoicesAwaiting.current}</span>
                        /
                        <span className="counter">{data.stats.invoicesAwaiting.total}</span>
                      </>
                    }
                    secondary={data.stats.invoicesAwaiting.amount ?? ''}
                    percentage={data.stats.invoicesAwaiting.percentage}
                    barColor="#3454d1"
                    trend={data.stats.invoicesAwaiting.trend}
                  />
                </div>

                {/* Converted Leads */}
                <div className="col-xxl-3 col-md-6">
                  <StatCard
                    icon="feather-cast"
                    label="Converted Leads"
                    primary={
                      <>
                        <span className="counter">{data.stats.convertedLeads.current}</span>
                        /
                        <span className="counter">{data.stats.convertedLeads.total}</span>
                      </>
                    }
                    secondary={`${data.stats.convertedLeads.completed ?? 0} Completed`}
                    percentage={data.stats.convertedLeads.percentage}
                    barColor="#ffa21d"
                    trend={data.stats.convertedLeads.trend}
                  />
                </div>

                {/* Projects In Progress */}
                <div className="col-xxl-3 col-md-6">
                  <StatCard
                    icon="feather-briefcase"
                    label="Projects In Progress"
                    primary={
                      <>
                        <span className="counter">{data.stats.projectsInProgress.current}</span>
                        /
                        <span className="counter">{data.stats.projectsInProgress.total}</span>
                      </>
                    }
                    secondary={`${data.stats.projectsInProgress.completed ?? 0} Completed`}
                    percentage={data.stats.projectsInProgress.percentage}
                    barColor="#17c666"
                    trend={data.stats.projectsInProgress.trend}
                  />
                </div>

                {/* Conversion Rate */}
                <div className="col-xxl-3 col-md-6">
                  <StatCard
                    icon="feather-activity"
                    label="Conversion Rate"
                    primary={
                      <>
                        <span className="counter">{data.stats.conversionRate.rate}</span>%
                      </>
                    }
                    secondary={data.stats.conversionRate.amount}
                    percentage={data.stats.conversionRate.percentage}
                    barColor="#ea4d4d"
                    trend={data.stats.conversionRate.trend}
                  />
                </div>
              </>
            )}

            {/* ─────────────────────────────────────────────────────────────── */}
            {/*  ROW 2 – Payment Records (col-8) + Total Sales (col-4)          */}
            {/* ─────────────────────────────────────────────────────────────── */}
            {isLoading ? (
              <>
                <div className="col-xxl-8"><SkeletonCard height={460} /></div>
                <div className="col-xxl-4"><SkeletonCard height={460} /></div>
              </>
            ) : data && (
              <>
                {!hidden['payment'] && (
                  <div className={col8or12(!!hidden['sales'])}>
                    <PaymentRecordsCard
                      chartData={data.paymentChart}
                      paymentStats={data.paymentStats}
                      onDelete={() => hideCard('payment')}
                      onRefresh={() => refreshCard('payment')}
                      refreshKey={refreshKeys['payment'] ?? 0}
                    />
                  </div>
                )}

                {!hidden['sales'] && (
                  <div className={hidden['payment'] ? 'col-xxl-6' : 'col-xxl-4'}>
                    <TotalSalesCard
                      sales={data.totalSales}
                      onDelete={() => hideCard('sales')}
                      refreshKey={refreshKeys['sales'] ?? 0}
                    />
                  </div>
                )}
              </>
            )}

            {/* ─────────────────────────────────────────────────────────────── */}
            {/*  ROW 3 – Three mini stat sparkline cards                        */}
            {/* ─────────────────────────────────────────────────────────────── */}
            {isLoading ? (
              [0, 1, 2].map(i => (
                <div key={i} className="col-lg-4">
                  <SkeletonCard height={130} />
                </div>
              ))
            ) : data && (
              <>
                {!hidden['tasksCompleted'] && (
                  <div className="col-lg-4">
                    <MiniStatCard
                      title="Tasks Completed"
                      subTitle={`${data.miniStats.tasksCompleted.current}/${data.miniStats.tasksCompleted.total} completed`}
                      icon="feather-star"
                      stat={data.miniStats.tasksCompleted}
                      onDelete={() => hideCard('tasksCompleted')}
                      refreshKey={refreshKeys['tasksCompleted'] ?? 0}
                    />
                  </div>
                )}

                {!hidden['newTasks'] && (
                  <div className="col-lg-4">
                    <MiniStatCard
                      title="New Tasks"
                      subTitle={`0/${data.miniStats.newTasks.total} tasks`}
                      icon="feather-file-text"
                      stat={data.miniStats.newTasks}
                      onDelete={() => hideCard('newTasks')}
                      refreshKey={refreshKeys['newTasks'] ?? 0}
                    />
                  </div>
                )}

                {!hidden['projectDone'] && (
                  <div className="col-lg-4">
                    <MiniStatCard
                      title="Project Done"
                      subTitle={`${data.miniStats.projectDone.current}/${data.miniStats.projectDone.total} project`}
                      icon="feather-airplay"
                      stat={data.miniStats.projectDone}
                      onDelete={() => hideCard('projectDone')}
                      refreshKey={refreshKeys['projectDone'] ?? 0}
                    />
                  </div>
                )}
              </>
            )}

            {/* ─────────────────────────────────────────────────────────────── */}
            {/*  ROW 4 – Leads Overview (col-4) + Latest Leads (col-8)          */}
            {/* ─────────────────────────────────────────────────────────────── */}
            {isLoading ? (
              <>
                <div className="col-xxl-4"><SkeletonCard height={520} /></div>
                <div className="col-xxl-8"><SkeletonCard height={520} /></div>
              </>
            ) : data && (
              <>
                {!hidden['leadsOverview'] && (
                  <div className={col4or12(!!hidden['latestLeads'])}>
                    <LeadsOverviewCard
                      items={data.leadsOverview}
                      onDelete={() => hideCard('leadsOverview')}
                      onRefresh={() => refreshCard('leadsOverview')}
                      refreshKey={refreshKeys['leadsOverview'] ?? 0}
                    />
                  </div>
                )}

                {!hidden['latestLeads'] && (
                  <div className={hidden['leadsOverview'] ? 'col-xxl-12' : 'col-xxl-8'}>
                    <LatestLeadsCard
                      allLeads={data.leads}
                      pagination={{
                        ...data.leadsPagination,
                        currentPage,
                        totalPages: Math.ceil(data.leads.length / data.leadsPagination.perPage),
                      }}
                      onDelete={() => hideCard('latestLeads')}
                      onRefresh={() => refreshCard('latestLeads')}
                      onPageChange={setCurrentPage}
                      onViewLead={handleViewLead}
                      onEditLead={handleEditLead}
                      onDeleteLead={handleDeleteLead}
                    />
                  </div>
                )}
              </>
            )}

            {/* ─────────────────────────────────────────────────────────────── */}
            {/*  ROW 5 – Schedule (col-4) + Project Status (col-4) + Team (col-4) */}
            {/* ─────────────────────────────────────────────────────────────── */}
            {isLoading ? (
              [0, 1, 2].map(i => (
                <div key={i} className="col-xxl-4">
                  <SkeletonCard height={420} />
                </div>
              ))
            ) : data && (
              <>
                {!hidden['schedule'] && (
                  <div className="col-xxl-4">
                    <UpcomingScheduleCard
                      items={data.schedule}
                      onDelete={() => hideCard('schedule')}
                      onRefresh={() => refreshCard('schedule')}
                    />
                  </div>
                )}

                {!hidden['projects'] && (
                  <div className="col-xxl-4">
                    <ProjectStatusCard
                      projects={data.projects}
                      onDelete={() => hideCard('projects')}
                      onRefresh={() => refreshCard('projects')}
                    />
                  </div>
                )}

                {!hidden['team'] && (
                  <div className="col-xxl-4">
                    <TeamProgressCard
                      members={data.team}
                      /* updatedAgo from API meta – not hardcoded */
                      updatedAgo={data.meta.updatedAgo}
                      onDelete={() => hideCard('team')}
                      onRefresh={() => refreshCard('team')}
                    />
                  </div>
                )}
              </>
            )}

          </div>{/* /row */}
        </div>{/* /main-content */}
      </div>{/* /nxl-content */}
    </main>
  );
}