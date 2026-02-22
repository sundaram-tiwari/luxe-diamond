import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="layout-sidenav">
        <Sidebar isOpen={sidebarOpen} />
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        <div className="layout-sidenav-content d-flex flex-column min-vh-100">
          <div className=" p-4 flex-grow-1">
            <Outlet />
          </div>
          <Footer />
        </div>

      </div>
    </>
  );
};

export default AdminLayout;