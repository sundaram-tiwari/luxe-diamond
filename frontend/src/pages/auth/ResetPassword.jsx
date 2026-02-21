import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { resetPassword } from "../../api/auth.api";
import AuthLayout from "../../components/layout/AuthLayout";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let responseStatus = false;
  //   const [showMessage, setShowMessage] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await resetPassword(token,formData);
      console.log(response);
      responseStatus = true;
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setError(error?.response?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}

      <AuthLayout>
        <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 text-center">
          <Link to="/" className="mb-3 d-block">
            <img
              src="/assets/img/lux-diamond-vertical-logo.png"
              alt="Logo"
              style={{ width: "260px" }}
            />
          </Link>

          {responseStatus ? (
            <div className="alert alert-danger">
              "Password has been changed successfully. Redirecting to login"
            </div>
          ) : null}

          {error && <div className="alert alert-success">{error}</div>}
          <div className="card p-4 shadow rounded-3 mt-3">
            <h3 className="mb-4 fw-bold">Reset Password</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control bg-transparent"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label>New Password </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control bg-transparent"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label>Confirm Password </label>
              </div>

              <div className="text-end mb-3">
                <Link to="/login" className="small">
                  Go to Login
                </Link>
              </div>

              <button type="submit" className="btn btn-dark w-100 py-2 ">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
