import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShopListPage from './pages/ShopListPage';
import ShopDetailPage from './pages/ShopDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MerchantDashboard from './pages/merchant/MerchantDashboard';
import AddShopPage from './pages/merchant/AddShopPage';
import ManageProductsPage from './pages/merchant/ManageProductsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shops" element={<ShopListPage />} />
            <Route path="/shops/:id" element={<ShopDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
            <Route path="/merchant/add-shop" element={<AddShopPage />} />
            <Route path="/merchant/shops/:shopId/products"
                   element={<ManageProductsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;