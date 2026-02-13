import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Landing from '../pages/Landing';
import AuthLayout from '../components/layout/AuthLayout';

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
                {/* <Route path='/signin' element={
                    <AuthLayout>
                        
                    </AuthLayout>
                } */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;