export default function CustomerSecurityTab() {
  return (
    <div className="tab-pane fade p-4" id="securityTab" role="tabpanel">
      <div className="p-4 mb-4 border border-dashed border-gray-3 rounded-1">
        <h6 className="fw-bolder">
          <a href="javascript:void(0);">Two-factor Authentication</a>
        </h6>
        <div className="fs-12 text-muted text-truncate-3-line mt-2 mb-4">
          Two-factor authentication is an enhanced security meansur. Once enabled, you'll be required
          to give two types of identification when you log into Google Authentication and SMS are
          Supported.
        </div>
        <div className="form-check form-switch form-switch-sm">
          <input className="form-check-input c-pointer" type="checkbox" id="2faVerification" defaultChecked />
          <label className="form-check-label fw-500 text-dark c-pointer" htmlFor="2faVerification">
            Enable 2FA Verification
          </label>
        </div>
      </div>
      <div className="p-4 mb-4 border border-dashed border-gray-3 rounded-1">
        <h6 className="fw-bolder">
          <a href="javascript:void(0);">Secondary Verification</a>
        </h6>
        <div className="fs-12 text-muted text-truncate-3-line mt-2 mb-4">
          The first factor is a password and the second commonly includes a text with a code sent to
          your smartphone, or biometrics using your fingerprint, face, or retina.
        </div>
        <div className="form-check form-switch form-switch-sm">
          <input className="form-check-input c-pointer" type="checkbox" id="secondaryVerification" defaultChecked />
          <label className="form-check-label fw-500 text-dark c-pointer" htmlFor="secondaryVerification">
            Set up secondary method
          </label>
        </div>
      </div>
      <div className="p-4 mb-4 border border-dashed border-gray-3 rounded-1">
        <h6 className="fw-bolder">
          <a href="javascript:void(0);">Backup Codes</a>
        </h6>
        <div className="fs-12 text-muted text-truncate-3-line mt-4 mb-4">
          A backup code is automatically generated for you when you turn on two-factor authentication
          through your iOS or Android Twitter app. You can also generate a backup code on twitter.com.
        </div>
        <div className="form-check form-switch form-switch-sm">
          <input className="form-check-input c-pointer" type="checkbox" id="generateBackup" />
          <label className="form-check-label fw-500 text-dark c-pointer" htmlFor="generateBackup">
            Generate backup codes
          </label>
        </div>
      </div>
      <div className="p-4 border border-dashed border-gray-3 rounded-1">
        <h6 className="fw-bolder">
          <a href="javascript:void(0);">Login Verification</a>
        </h6>
        <div className="fs-12 text-muted text-truncate-3-line mt-2 mb-4">
          Login verification is an enhanced security meansur. Once enabled, you'll be required to give
          two types of identification when you log into Google Authentication and SMS are Supported.
        </div>
        <div className="form-check form-switch form-switch-sm">
          <input className="form-check-input c-pointer" type="checkbox" id="loginVerification" defaultChecked />
          <label className="form-check-label fw-500 text-dark c-pointer" htmlFor="loginVerification">
            Enable Login Verification
          </label>
        </div>
      </div>
      <hr className="my-5" />
      <div className="alert alert-dismissible mb-4 p-4 d-flex alert-soft-danger-message" role="alert">
        <div className="me-4 d-none d-md-block">
          <i className="feather feather-alert-triangle text-danger fs-1"></i>
        </div>
        <div>
          <p className="fw-bold mb-0 text-truncate-1-line">You Are Delete or Deactivating Your Account</p>
          <p className="text-truncate-3-line mt-2 mb-4">
            Two-factor authentication adds an additional layer of security to your account by
            requiring more than just a password to log in.
          </p>
          <button className="btn btn-sm btn-danger d-inline-block" type="button">
            Learn more
          </button>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-body">
          <h6 className="fw-bold">Delete Account</h6>
          <p className="fs-11 text-muted">
            Go to the Data & Privacy section of your profile Account. Scroll to "Your data & privacy
            options." Delete your Profile Account. Follow the instructions to delete your account:
          </p>
          <div className="my-4 py-2">
            <input type="password" className="form-control" placeholder="Enter your password" />
            <div className="mt-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="acDeleteDeactive" />
                <label className="form-check-label c-pointer" htmlFor="acDeleteDeactive">
                  I confirm my account deletations or deactivation.
                </label>
              </div>
            </div>
          </div>
          <div className="d-sm-flex gap-2">
            <button className="btn btn-danger" type="button">
              Delete Account
            </button>
            <button className="btn btn-warning mt-2 mt-sm-0" type="button">
              Deactiveted Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
