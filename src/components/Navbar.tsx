import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Car, ShoppingCart, User, LogOut, Clock, PlusCircle, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold">Trade Wheels</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to={`/${user.type}/dashboard`}
                  className={`p-2 hover:bg-gray-800 rounded-full ${
                    location.pathname === `/${user.type}/dashboard` ? 'bg-gray-800' : ''
                  }`}
                  title="Dashboard"
                >
                  <Search className="h-6 w-6" />
                </Link>
                
                {user.type === 'buyer' && (
                  <>
                    <Link
                      to="/buyer/cart"
                      className={`relative p-2 hover:bg-gray-800 rounded-full ${
                        location.pathname === '/buyer/cart' ? 'bg-gray-800' : ''
                      }`}
                    >
                      <ShoppingCart className="h-6 w-6" />
                      {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-yellow-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {items.length}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/buyer/purchase-history"
                      className={`p-2 hover:bg-gray-800 rounded-full ${
                        location.pathname === '/buyer/purchase-history' ? 'bg-gray-800' : ''
                      }`}
                      title="Purchase History"
                    >
                      <Clock className="h-6 w-6" />
                    </Link>
                  </>
                )}

                {user.type === 'seller' && (
                  <>
                    <Link
                      to="/seller/my-listings"
                      className={`p-2 hover:bg-gray-800 rounded-full ${
                        location.pathname === '/seller/my-listings' ? 'bg-gray-800' : ''
                      }`}
                      title="My Listings"
                    >
                      <Clock className="h-6 w-6" />
                    </Link>
                    <Link
                      to="/seller/add-car"
                      className={`p-2 hover:bg-gray-800 rounded-full ${
                        location.pathname === '/seller/add-car' ? 'bg-gray-800' : ''
                      }`}
                      title="Add New Car"
                    >
                      <PlusCircle className="h-6 w-6" />
                    </Link>
                  </>
                )}

                <Link
                  to={`/${user.type}/profile`}
                  className={`p-2 hover:bg-gray-800 rounded-full ${
                    location.pathname === `/${user.type}/profile` ? 'bg-gray-800' : ''
                  }`}
                >
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-800 rounded-full"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}