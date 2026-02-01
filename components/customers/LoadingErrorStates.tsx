export function LoadingState() {
  return (
    <main className="nxl-container">
      <div className="nxl-content">
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export function ErrorState({ error }: { error: string }) {
  return (
    <main className="nxl-container">
      <div className="nxl-content">
        <div className="alert alert-danger m-4">{error}</div>
      </div>
    </main>
  );
}
