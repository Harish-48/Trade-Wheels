import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PurchaseHistory() {
  const { user } = useAuth();
  const { getBuyerOrders } = useOrders();
  const orders = getBuyerOrders(user!.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Purchase History</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't made any purchases yet</p>
          <Link
            to="/buyer/dashboard"
            className="inline-block bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Purchase History</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <img
                  src={order.car.images[0]}
                  alt={`${order.car.make} ${order.car.model}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6 md:col-span-2">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">
                    {order.car.make} {order.car.model}
                  </h2>
                  <span className="text-xl font-bold text-yellow-600">
                    {formatPrice(order.price)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>Purchased on {formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{order.car.location}</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-gray-600">
                  <p>Year: {order.car.year}</p>
                  <p>Mileage: {order.car.mileage.toLocaleString()} km</p>
                </div>
                
                <Link
                  to={`/cars/${order.car.id}`}
                  className="inline-block mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}