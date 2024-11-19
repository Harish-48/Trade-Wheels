import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function SellerProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Seller Profile</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <p className="mt-1 text-lg">{user?.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-lg">{user?.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone</label>
            <p className="mt-1 text-lg">{user?.phone || 'Not provided'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600">Location</label>
            <p className="mt-1 text-lg">{user?.location || 'Not provided'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}