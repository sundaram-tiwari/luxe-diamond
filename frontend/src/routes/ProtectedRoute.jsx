import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminProtectedRoute = () => {
  const adminToken = localStorage.getItem("adminToken");

  return adminToken ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export const UserProtectedRoute = ({children}) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminProtectedRoute;
