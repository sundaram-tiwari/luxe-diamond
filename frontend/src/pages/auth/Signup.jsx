import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Loader from "../../components/common/Loader";
import { signup } from "../../api/auth.api";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
      const response = await signup(formData);
      JSON.stringify(response);
      localStorage.setItem("email",response.data.data.email);
      navigate("/email-verification-sent");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <AuthLayout>
        <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 text-center">
          <Link to="/" className="d-block mb-4">
            <img
              src="/assets/img/lux-diamond-vertical-logo.png"
              alt="Logo"
              style={{ width: "260px" }}
            />
          </Link>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="card p-4 shadow rounded-3 mt-5">
            <h3 className="mb-4 fw-bold">Sign Up</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-floating ml-4 w-100 mb-3">
                <input
                  type="text"
                  name="firstName"
                  className="form-control bg-transparent"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <label>First Name</label>
              </div>

              <div className="form-floating ml-4 w-100 mb-3">
                <input
                  type="text"
                  name="lastName"
                  className="form-control bg-transparent"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <label>Last Name</label>
              </div>

              <div className="form-floating ml-4 w-100 mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control bg-transparent"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Email address</label>
              </div>

              <div className="form-floating ml-4 w-100 mb-4">
                <input
                  type="password"
                  name="password"
                  className="form-control bg-transparent"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label>Password</label>
              </div>

              <div className="form-floating ml-4 mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control bg-transparent"
                  placeholder="Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label>Confirm Password</label>
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100 py-2"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <p className="mt-3 small">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Signup;
