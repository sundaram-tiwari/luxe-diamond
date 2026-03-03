import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="layout-sidenav-nav">
      <nav className="cat-sidenav bg-light h-100">
        <div className="cat-sidenav-menu">
          <div className="nav flex-column">

            <NavLink to="/admin/dashboard" end className="nav-link">
              <span className="cat-nav-link-icon">
                <i className="fa-solid fa-gauge"></i>
              </span>
              Dashboard
            </NavLink>

            <NavLink to="/admin/users" className="nav-link">
              <span className="cat-nav-link-icon">
                <i className="fa-solid fa-users"></i>
              </span>
              Users
            </NavLink>

            <NavLink to="/admin/products" className="nav-link">
              <span className="cat-nav-link-icon">
                <i className="fa-solid fa-gem"></i>
              </span>
              Products
            </NavLink>

            <NavLink to="/admin/settings" className="nav-link">
              <span className="cat-nav-link-icon">
                <i className="fa-solid fa-gear"></i>
              </span>
              Settings
            </NavLink>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;