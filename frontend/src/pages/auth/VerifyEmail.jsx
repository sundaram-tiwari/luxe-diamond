import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resendEmail, verifyEmail } from "../../api/auth.api";
import Loader from "../../components/common/Loader";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const email = localStorage.getItem("email");
        console.log(email);
        if (!email) return;

        const response = await verifyEmail(token, { email });
        if (response.data.emailVerified) {
          setTimeout(() => {
            if (!localStorage.getItem("token")) {
              navigate("/login");
            }
            navigate("/");
          }, 4000);
        }
        // JSON.stringify(response);
        setStatus("success");
        // localStorage.setItem("isVerified", response.isVerified);
      } catch (err) {
        setStatus("error");
        setError(
          err.response?.data?.message ||
            "Invalid or expired verification link.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) verify();
    else {
      setStatus("error");
      setError("Invalid verification link.");
      setLoading(false);
    }
  }, [token, navigate]);

  const handleResendEmail = async () => {
    try {
      const data = {
        email: localStorage.getItem("email"),
      };
      const isVerified = localStorage.getItem("isVerified");
      if (isVerified) {
        navigate("/login");
      }
      setResendLoading(true);
      setResendMessage("");

      await resendEmail(data);
      setResendMessage("New verification email sent. Please check inbox.");
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

        {loading && <Loader />}

        {!loading && status === "success" && (
          <>
            <h3 className="mb-3"> Welcome to Luxe Diamond</h3>
            <p>Your email has been successfully verified.</p>

            <button
              className="btn btn-dark mt-3"
              onClick={() => {
                localStorage.getItem("token") != null
                  ? navigate("/", { state: { verified: true } })
                  : navigate("/login", { state: { verified: true } });
              }}
            >
              {localStorage.getItem("token") != null
                ? "Explore"
                : "Go to Login"}
            </button>
          </>
        )}

        {!loading && status === "error" && (
          <>
            <h3 className="text-danger mb-3">Verification Failed</h3>
            <p>{error}</p>

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
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
