interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  trend: number;
  trendDirection: 'up' | 'down';
}

function StatCard({ icon, label, value, trend, trendDirection }: StatCardProps) {
  const trendClass = trendDirection === 'up' ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger';
  const arrowIcon = trendDirection === 'up' ? 'feather-arrow-up' : 'feather-arrow-down';

  return (
    <div className="col-xxl-3 col-md-6">
      <div className="card stretch stretch-full">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="avatar-text avatar-xl rounded">
                <i className={`feather ${icon}`}></i>
              </div>
              <a href="javascript:void(0);" className="fw-bold d-block">
                <span className="text-truncate-1-line">{label}</span>
                <span className="fs-24 fw-bolder d-block">{value}</span>
              </a>
            </div>
            <div className={`badge ${trendClass}`}>
              <i className={`${arrowIcon} fs-10 me-1`}></i>
              <span>{trend}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomersStatsCards() {
  const stats = [
    {
      icon: 'feather-users',
      label: 'Total Customers',
      value: '26,595',
      trend: 36.85,
      trendDirection: 'up' as const,
    },
    {
      icon: 'feather-user-check',
      label: 'Active Customers',
      value: '2,245',
      trend: 24.56,
      trendDirection: 'down' as const,
    },
    {
      icon: 'feather-user-plus',
      label: 'New Customers',
      value: '1,254',
      trend: 33.29,
      trendDirection: 'up' as const,
    },
    {
      icon: 'feather-user-minus',
      label: 'Inactive Customers',
      value: '4,586',
      trend: 42.47,
      trendDirection: 'down' as const,
    },
  ];

  return (
    <div id="collapseOne" className="accordion-collapse collapse page-header-collapse">
      <div className="accordion-body pb-2">
        <div className="row">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
