import { useState } from "react";
import { resendEmail } from "../../api/auth.api";

const EmailVerificationSent = () => {
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const handleResendEmail = async () => {
    try {
      const data = {
        email: localStorage.getItem("email"),
      };
      setResendLoading(true);
      setResendMessage("");

      console.log(localStorage.getItem("email"));

      await resendEmail(data);
      setResendMessage("✅ New verification email sent. Please check inbox.");
    } catch (error) {
      setResendMessage(error.data?.message || "Failed to resend email.");
    } finally {
      setResendLoading(false);
    }
  };

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
          A verification link has been sent to your email address. Please verify
          your email to activate your account.
        </p>

        <p className="small text-muted mt-2">
          Didn’t receive email? Check spam folder.
        </p>

        <div className="mt-3 border-top pt-3">
          <p className="text-muted small mb-2">
            Didn't receive the email or link expired?
          </p>

          <button
            className="btn btn-dark"
            onClick={handleResendEmail}
            disabled={resendLoading}
          >
            {resendLoading ? "Sending..." : "Resend Verification Email"}
          </button>

          {resendMessage && <p className="mt-2 small">{resendMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSent;
