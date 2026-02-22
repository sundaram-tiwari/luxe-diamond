import { useState } from "react";
import { checkEmailVerificationStatus, resendEmail } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmailVerificationSent = () => {
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    const checkEmailStatus = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) return;

        const response = await checkEmailVerificationStatus({ email });

        if (response.data.emailVerified) {
          alert(`Email has been verified`);
          if(localStorage.getItem("token")){
            navigate("/");
          } else {
            navigate('/login');
          }
        }
      } catch (error) {
        setResendMessage(
          error.response?.data?.message || "Failed to check email status.",
        );
      }
    };

    checkEmailStatus();
  }, []);

  const handleResendEmail = async () => {
    try {
      const email = localStorage.getItem("email");

      setResendLoading(true);
      setResendMessage("");

      const response = await resendEmail({ email });

      console.log("RESEND RESPONSE:", response.data);

      if (response.data.data.emailVerified) {
        alert("Email has already been verified");
        navigate("/login");
        return;
      }

      setResendMessage("New verification email sent. Please check inbox.");
    } catch (error) {
      setResendMessage(
        error.response?.data?.message || "Failed to resend email.",
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className=" login-wrapper d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-5 shadow text-center" style={{ width: "420px" }}>
        <img
          src="/assets/img/lux-diamond-vertical-logo.png"
          alt="Luxe Diamond"
          width="180"
          className="mb-4 mx-auto"
        />

        <h3 className="mb-3"> Check Your Email</h3>

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
