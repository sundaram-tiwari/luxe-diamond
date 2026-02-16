import { Link } from "react-router-dom";

const EmailVerificationSent = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-5 shadow text-center" style={{ width: "420px" }}>

        <img
          src="/assets/img/lux-diamond-vertical-logo.png"
          alt="Luxe Diamond"
          width="180"
          className="mb-4 mx-auto"
        />

        <h3 className="mb-3">📩 Check Your Email</h3>

        <p>
          A verification link has been sent to your email address.
          Please verify your email to activate your account.
        </p>

        <p className="small text-muted mt-2">
          Didn’t receive email? Check spam folder.
        </p>

        <Link to="/login" className="btn btn-dark mt-4">
          Go to Login
        </Link>

      </div>
    </div>
  );
};

export default EmailVerificationSent;
