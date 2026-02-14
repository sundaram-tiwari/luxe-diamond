import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Loader from "../../components/common/Loader";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API call
    setTimeout(() => {
      console.log("Signup Data:", formData);
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      {loading && <Loader />}

      <AuthLayout>
        <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 text-center">
          {/* Logo */}
          <Link to="/" className="d-block mb-4">
            <img
              src="/assets/img/lux-diamond-vertical-logo.png"
              alt="Logo"
              style={{ width: "260px" }}
            />
          </Link>

          <div className="card p-4 shadow rounded-3 mt-5">
            <h3 className="mb-4 fw-bold">Sign Up</h3>

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="form-floating ml-4 w-100 mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control bg-transparent"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <label>Username</label>
              </div>

              {/* Email */}
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

              {/* Password */}
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

              {/* Confirm Password */}
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

              <button type="submit" className="btn btn-dark w-100 py-2">
                Sign Up
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
