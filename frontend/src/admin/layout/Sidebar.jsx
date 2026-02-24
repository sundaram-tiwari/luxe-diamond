import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="layout-sidenav-nav">
      <nav className="cat-sidenav">
        <div className="cat-sidenav-menu">
          <div className="nav">
            <NavLink to="/admin/dashboard" end className="nav-link">
              <div className="cat-nav-link-icon">
                <i className="fa-solid fa-gauge"></i>
              </div>
              Dashboard
            </NavLink>
            <NavLink to="/admin/users" className="nav-link">
              <div className="cat-nav-link-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              Users
            </NavLink>

            <NavLink to="/admin/products" className="nav-link">
              <div className="cat-nav-link-icon">
                <i className="fa-solid fa-gem"></i>
              </div>
              Products
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
