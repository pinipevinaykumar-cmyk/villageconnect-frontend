import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ShopListPage from './pages/ShopListPage';
import ShopDetailPage from './pages/ShopDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MerchantDashboard from './pages/merchant/MerchantDashboard';
import AddShopPage from './pages/merchant/AddShopPage';
import ManageProductsPage from './pages/merchant/ManageProductsPage';
import AdminPage from './pages/admin/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';
  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/shops" element={<ProtectedRoute><ShopListPage /></ProtectedRoute>} />
        <Route path="/shops/:id" element={<ProtectedRoute><ShopDetailPage /></ProtectedRoute>} />
        <Route path="/merchant/dashboard" element={<ProtectedRoute requiredRole="MERCHANT"><MerchantDashboard /></ProtectedRoute>} />
        <Route path="/merchant/add-shop" element={<ProtectedRoute requiredRole="MERCHANT"><AddShopPage /></ProtectedRoute>} />
        <Route path="/merchant/shops/:shopId/products" element={<ProtectedRoute requiredRole="MERCHANT"><ManageProductsPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"><AdminPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
