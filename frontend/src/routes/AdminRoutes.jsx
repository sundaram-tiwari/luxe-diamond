import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import Products from "../admin/pages/Products";
import Users from "../admin/pages/Users";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminProtectedRoute from "./ProtectedRoute";
import Profile from "../admin/pages/AdminProfile";

const AdminRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route element={<AdminProtectedRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoutes;
