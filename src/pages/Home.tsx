import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
            alt="Luxury car"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            An Enjoyable Way to Buy and Sell Second-Hand Cars
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Connect directly with genuine sellers and buyers. No middlemen, just great deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Link
                to={`/${user.type}/dashboard`}
                className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-center"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login?type=buyer"
                  className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-center"
                >
                  Start Buying
                </Link>
                <Link
                  to="/login?type=seller"
                  className="inline-block bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition-colors text-center"
                >
                  Start Selling
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Trade Wheels?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
              <ShieldCheck className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Sellers</h3>
            <p className="text-gray-600">
              All our sellers go through a strict verification process to ensure authenticity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
            <p className="text-gray-600">
              Connect directly with buyers or sellers without any intermediaries.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
              <Car className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Browse through thousands of cars from various sellers across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}