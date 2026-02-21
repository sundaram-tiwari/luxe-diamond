import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { forgetPassword } from "../../api/auth.api";
import AuthLayout from "../../components/layout/AuthLayout";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
//   const [showMessage, setShowMessage] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
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
      const response = await forgetPassword(formData);
      console.log(response)
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

          {error && <div className="alert alert-danger">{error}</div>}
          <div className="card p-4 shadow rounded-3 mt-3">
            <h3 className="mb-4 fw-bold">Forget Password</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control bg-transparent"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Email </label>
              </div>

              <div className="text-end mb-3">
                <Link to="/login" className="small">
                  Back to Login
                </Link>
              </div>

              <button type="submit" className="btn btn-dark w-100 py-2 ">
                Send password reset email
              </button>
            </form>

            {/* <p className="mt-3 small">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p> */}
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
