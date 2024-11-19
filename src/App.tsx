import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CarProvider } from './context/CarContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyerProfile from './pages/buyer/Profile';
import SellerProfile from './pages/seller/Profile';
import Cart from './pages/buyer/Cart';
import Checkout from './pages/buyer/Checkout';
import PurchaseHistory from './pages/buyer/PurchaseHistory';
import AddCar from './pages/seller/AddCar';
import CarDetails from './pages/CarDetails';
import ProtectedRoute from './components/ProtectedRoute';
import BuyerDashboard from './pages/buyer/Dashboard';
import SellerDashboard from './pages/seller/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <CarProvider>
        <CartProvider>
          <OrderProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                
                {/* Protected Buyer Routes */}
                <Route element={<ProtectedRoute allowedUserType="buyer" />}>
                  <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
                  <Route path="/buyer/profile" element={<BuyerProfile />} />
                  <Route path="/buyer/cart" element={<Cart />} />
                  <Route path="/buyer/checkout" element={<Checkout />} />
                  <Route path="/buyer/purchase-history" element={<PurchaseHistory />} />
                </Route>

                {/* Protected Seller Routes */}
                <Route element={<ProtectedRoute allowedUserType="seller" />}>
                  <Route path="/seller/dashboard" element={<SellerDashboard />} />
                  <Route path="/seller/profile" element={<SellerProfile />} />
                  <Route path="/seller/add-car" element={<AddCar />} />
                  <Route path="/seller/my-listings" element={<SellerDashboard />} />
                </Route>

                {/* Legacy route redirects */}
                <Route path="/dashboard" element={<Navigate to="/buyer/dashboard" replace />} />
                <Route path="/profile" element={<Navigate to="/buyer/profile" replace />} />
                <Route path="/cart" element={<Navigate to="/buyer/cart" replace />} />
                <Route path="/checkout" element={<Navigate to="/buyer/checkout" replace />} />
                <Route path="/purchase-history" element={<Navigate to="/buyer/purchase-history" replace />} />
                <Route path="/my-listings" element={<Navigate to="/seller/my-listings" replace />} />
                <Route path="/add-car" element={<Navigate to="/seller/add-car" replace />} />

                {/* Redirect all unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <ChatBot />
            </div>
          </OrderProvider>
        </CartProvider>
      </CarProvider>
    </AuthProvider>
  );
}