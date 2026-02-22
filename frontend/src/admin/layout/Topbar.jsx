import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <header>
      <nav className="cat-topnav navbar navbar-expand">
        {/* Logo */}
        <Link className="navbar-brand" to="/admin/dashboard">
          <img
            src="/assets/img/lux-diamond-logo-trans.png"
            alt=""
            className="navbar-horizontal-logo"
          />
          <img src="/assets/img/logo-icon.png" alt="" className="navbar-icon" />
        </Link>

        <h4 className="m-0 text-dark ms-4">Admin Panel</h4>

        {/* Profile Dropdown */}
        <ul className="navbar-nav ms-auto me-3">
          <li className="nav-item dropdown">
            <div
              className="d-flex align-items-center dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              <img
                src="/assets/img/avatar.png"
                alt="avatar"
                className="rounded-circle border"
                style={{ height: "40px" }}
              />
              <div className="fs-6 text-dark mx-2">
                Admin
                <small className="d-block small text-dark">Luxe Diamond</small>
              </div>
            </div>

            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/admin/profile")}
                >
                  <i className="fa-solid fa-user me-2"></i>
                  Profile
                </button>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Topbar;
