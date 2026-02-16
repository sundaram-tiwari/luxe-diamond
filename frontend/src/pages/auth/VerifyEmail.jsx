import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { verifyEmail } from "../../api/auth.api";
import Loader from "../../components/common/Loader";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("verifying");
  // verifying | success | error

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");
      } catch (error) {
        setStatus("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) verify();
  }, [token]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-5 shadow text-center" style={{ width: "420px" }}>
        {/* Logo */}
        <img
          src="/assets/img/lux-diamond-vertical-logo.png"
          alt="Luxe Diamond"
          width="180"
          className="mb-4 mx-auto"
        />

        {loading && <Loader />}

        {!loading && status === "success" && (
          <>
            <h3 className="mb-3">✨ Welcome to Luxe Diamond</h3>
            <p>Your email has been successfully verified.</p>

            <button
              className="btn btn-dark mt-3"
              onClick={() => navigate("/login", { state: { verified: true } })}
            >
              Go to Login
            </button>
          </>
        )}

        {!loading && status === "error" && (
          <>
            <h3 className="text-danger mb-3">Verification Failed</h3>
            <p>Invalid or expired verification link.</p>

            <Link to="/login" className="btn btn-outline-dark mt-3">
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
