"use client"

export default function BrandUpload() {
  return (
    <div className="mb-4 mb-md-0 your-brand" data-aos="zoom-in" data-aos-duration="600">
      <div className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded">
        <img src="assets/images/logo-abbr.png" className="upload-pic img-fluid rounded h-100 w-100" alt="Brand Logo" />
        <div className="position-absolute start-50 top-50 end-0 bottom-0 translate-middle h-100 w-100 hstack align-items-center justify-content-center c-pointer upload-button">
          <i className="feather feather-camera" aria-hidden="true"></i>
        </div>
        <input className="file-upload" type="file" accept="image/*" />
      </div>
      <div className="fs-12 text-muted mt-2">* Upload your brand</div>
    </div>
  )
}
