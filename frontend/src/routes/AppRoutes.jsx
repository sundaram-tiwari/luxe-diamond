import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

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

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;