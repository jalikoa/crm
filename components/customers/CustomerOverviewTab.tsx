export default function CustomerOverviewTab() {
  return (
    <div className="tab-pane fade show active p-4" id="overviewTab" role="tabpanel">
      <div className="about-section mb-5">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0">Profile About:</h5>
          <button className="btn btn-sm btn-light-brand" type="button">
            Updates
          </button>
        </div>
        <p>
          John Doe is a frontend developer with over 5 years of experience creating high-quality,
          user-friendly websites and web applications. He has a strong understanding of web
          development technologies and a keen eye for design.
        </p>
        <p>
          John is proficient in languages such as HTML, CSS, and JavaScript, and is experienced in
          using popular frontend frameworks such as React and Angular. He is also well-versed in
          user experience design and uses his knowledge to create engaging and intuitive user
          interfaces.
        </p>
        <p>
          Throughout his career, John has worked on a wide range of projects for clients in various
          industries, including e-commerce, healthcare, and education. He takes a collaborative
          approach to development and enjoys working closely with clients and other developers to
          bring their ideas to life.
        </p>
      </div>
      <div className="profile-details mb-5">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0">Profile Details:</h5>
          <button className="btn btn-sm btn-light-brand" type="button">
            Edit Profile
          </button>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Full Name:</div>
          <div className="col-sm-6 fw-semibold">Alexandra Della</div>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Surname:</div>
          <div className="col-sm-6 fw-semibold">Della</div>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Company:</div>
          <div className="col-sm-6 fw-semibold">theme_ocean</div>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Date of Birth:</div>
          <div className="col-sm-6 fw-semibold">26 May, 2000</div>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Mobile Number:</div>
          <div className="col-sm-6 fw-semibold">+01 (375) 5896 3214</div>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Email Address:</div>
          <div className="col-sm-6 fw-semibold">alex@example.com</div>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Location:</div>
          <div className="col-sm-6 fw-semibold">California, United States</div>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Joining Date:</div>
          <div className="col-sm-6 fw-semibold">20 Dec, 2023</div>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Country:</div>
          <div className="col-sm-6 fw-semibold">United States</div>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Communication:</div>
          <div className="col-sm-6 fw-semibold">Email, Phone</div>
        </div>
        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Allow Changes:</div>
          <div className="col-sm-6 fw-semibold">YES</div>
        </div>
        <div className="row g-0">
          <div className="col-sm-6 text-muted">Website:</div>
          <div className="col-sm-6 fw-semibold">https://themewagon.com</div>
        </div>
      </div>
      <div className="alert alert-dismissible mb-4 p-4 d-flex alert-soft-warning-message profile-overview-alert" role="alert">
        <div className="me-4 d-none d-md-block">
          <i className="feather feather-alert-triangle fs-1"></i>
        </div>
        <div>
          <p className="fw-bold mb-1 text-truncate-1-line">Your profile has not been updated yet!!!</p>
          <p className="fs-10 fw-medium text-uppercase text-truncate-1-line">
            Last Update: <strong>26 Dec, 2023</strong>
          </p>
          <button className="btn btn-sm bg-soft-warning text-warning d-inline-block" type="button">
            Update Now
          </button>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
}
