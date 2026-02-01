export default function CustomerProfileCard() {
  return (
    <div className="card stretch stretch-full">
      <div className="card-body">
        <div className="mb-4 text-center">
          <div className="wd-150 ht-150 mx-auto mb-3 position-relative">
            <div className="avatar-image wd-150 ht-150 border border-5 border-gray-3">
              <img src="assets/images/avatar/1.png" alt="Avatar" className="img-fluid" />
            </div>
            <div className="wd-10 ht-10 text-success rounded-circle position-absolute translate-middle" style={{ top: '76%', right: '10px' }}>
              <i className="bi bi-patch-check-fill"></i>
            </div>
          </div>
          <div className="mb-4">
            <a href="javascript:void(0);" className="fs-14 fw-bold d-block">
              {' '}
              Alexandra Della
            </a>
            <a href="javascript:void(0);" className="fs-12 fw-normal text-muted d-block">
              alex@example.com
            </a>
          </div>
          <div className="fs-12 fw-normal text-muted text-center d-flex flex-wrap gap-3 mb-4">
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">28.65K</h6>
              <p className="fs-12 text-muted mb-0">Followers</p>
            </div>
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">38.85K</h6>
              <p className="fs-12 text-muted mb-0">Following</p>
            </div>
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">43.67K</h6>
              <p className="fs-12 text-muted mb-0">Engagement</p>
            </div>
          </div>
        </div>
        <ul className="list-unstyled mb-4">
          <li className="hstack justify-content-between mb-4">
            <span className="text-muted fw-medium hstack gap-3">
              <i className="feather-map-pin"></i>Location
            </span>
            <a href="javascript:void(0);" className="float-end">
              California, USA
            </a>
          </li>
          <li className="hstack justify-content-between mb-4">
            <span className="text-muted fw-medium hstack gap-3">
              <i className="feather-phone"></i>Phone
            </span>
            <a href="javascript:void(0);" className="float-end">
              +01 (375) 2589 645
            </a>
          </li>
          <li className="hstack justify-content-between mb-0">
            <span className="text-muted fw-medium hstack gap-3">
              <i className="feather-mail"></i>Email
            </span>
            <a href="javascript:void(0);" className="float-end">
              alex@example.com
            </a>
          </li>
        </ul>
        <div className="d-flex gap-2 text-center pt-4">
          <button className="w-50 btn btn-light-brand" type="button">
            <i className="feather-trash-2 me-2"></i>
            <span>Delete</span>
          </button>
          <button className="w-50 btn btn-primary" type="button">
            <i className="feather-edit me-2"></i>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
