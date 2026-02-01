"use client"

export default function InvoiceNoteSection() {
  return (
    <div className="px-4 pb-4" data-aos="fade-up" data-aos-duration="700">
      <div className="form-group">
        <label htmlFor="InvoiceNote" className="form-label">Invoice Note:</label>
        <textarea rows={6} className="form-control" id="InvoiceNote" placeholder="It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!"></textarea>
      </div>
    </div>
  )
}
