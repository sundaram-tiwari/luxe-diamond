import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import VerifyEmail from "../pages/auth/VerifyEmail";
import EmailVerificationSent from "../pages/auth/EmailVerificationSent";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/products/ProductDetails";
import NotFound from "../pages/NotFound";

// Admin
import AdminLayout from "../admin/layout/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import AdminProducts from "../admin/pages/Products";
import Users from "../admin/pages/Users";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminProtectedRoute from "./ProtectedRoute";
import Profile from "../admin/pages/AdminProfile";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Setting from "../admin/pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>

     {/* Public routess */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:category" element={<Products />} />
        <Route
          path="/product/:category/:productSlug"
          element={<ProductDetails />}
        />
      </Route>

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/email-verification-sent" element={<EmailVerificationSent />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;