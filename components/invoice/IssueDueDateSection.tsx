"use client"

export default function IssueDueDateSection() {
  return (
    <div className="d-md-flex align-items-center justify-content-end gap-4" data-aos="fade-left" data-aos-duration="600">
      <div className="form-group mb-3 mb-md-0">
        <label className="form-label">Issue Date:</label>
        <input id="issueDate" className="form-control" placeholder="Issue date..." />
      </div>
      <div className="form-group">
        <label className="form-label">Due Date:</label>
        <input id="dueDate" className="form-control" placeholder="Due date..." />
      </div>
    </div>
  )
}
