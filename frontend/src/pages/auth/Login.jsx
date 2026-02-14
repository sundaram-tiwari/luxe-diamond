import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Loader from "../../components/common/Loader";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log("Signin Data:", formData);
      navigate("/"); // redirect after login
    }, 1500);
  };

  return (
    <>
      {loading && <Loader />}

      <AuthLayout>
        <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 text-center">

          {/* Logo */}
          <Link to="/" className="mb-3 d-block">
            <img
              src="/assets/img/lux-diamond-vertical-logo.png"
              alt="Logo"
              style={{ width: "260px" }}
            />
          </Link>

          <div className="card p-4 shadow rounded-3 mt-3">
            <h3 className="mb-4 fw-bold">Login</h3>

            <form onSubmit={handleSubmit}>

              {/* Email */}
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
                <label>Email address</label>
              </div>

              {/* Password */}
              <div className="form-floating mb-3">
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

              <div className="text-end mb-3">
                <Link to="/forgot-password" className="small">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-dark w-100 py-2 ">
                Log In
              </button>
            </form>

            <p className="mt-3 small">
              Don't have an account?{" "}
              <Link to="/signup">Sign Up</Link>
            </p>

          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
