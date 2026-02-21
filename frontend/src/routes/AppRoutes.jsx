import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import VerifyEmail from '../pages/auth/VerifyEmail';
import EmailVerificationSent from '../pages/auth/EmailVerificationSent';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Main Route */}
                <Route path="/" element={
                    <MainLayout>
                        <Landing/>
                    </MainLayout>
                } />

                {/* Auth Routes */}
                <Route path='/login' element={
                    <Login />
                } />

                <Route path='/signup' element={
                    <Signup />
                } />

                <Route path='/verify-email' element={
                    <VerifyEmail />
                } />

                <Route path='/email-verification-sent' element={
                    <EmailVerificationSent />
                } />

                <Route path='/forgot-password' element={
                    <ForgotPassword />
                } />

                <Route path='/reset-password' element={
                    <ResetPassword />
                } />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;