import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronDown, ChevronUp, User, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCars } from '../context/CarContext';
import { useOrders } from '../context/OrderContext';

export default function MyListings() {
  const { user } = useAuth();
  const { getSellerCars, deleteCar } = useCars();
  const { getSellerOrders } = useOrders();
  const sellerCars = getSellerCars(user!.id);
  const sellerOrders = getSellerOrders(user!.id);
  const [expandedCars, setExpandedCars] = useState<string[]>([]);

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

  const toggleExpand = (carId: string) => {
    setExpandedCars(prev =>
      prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const getCarPurchases = (carId: string) => {
    return sellerOrders.filter(order => order.carId === carId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Link
          to="/add-car"
          className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400"
        >
          <Plus className="h-5 w-5" />
          Add New Car
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellerCars.map((car) => {
          const isExpanded = expandedCars.includes(car.id);
          const purchases = getCarPurchases(car.id);

          return (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {car.make} {car.model}
                </h3>
                
                <div className="mt-2 space-y-2">
                  <p className="text-gray-600">Year: {car.year}</p>
                  <p className="text-gray-600">
                    Mileage: {car.mileage.toLocaleString()} km
                  </p>
                  <p className="text-gray-600">Location: {car.location}</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {formatPrice(car.price)}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => toggleExpand(car.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-yellow-600"
                  >
                    {purchases.length} Purchase{purchases.length !== 1 ? 's' : ''}
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 space-y-3">
                      {purchases.length > 0 ? (
                        purchases.map(purchase => (
                          <div
                            key={purchase.id}
                            className="bg-gray-50 p-3 rounded-lg space-y-2"
                          >
                            <div className="flex items-center gap-2 text-gray-600">
                              <User className="h-4 w-4" />
                              <span>Buyer ID: {purchase.buyerId}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(purchase.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{car.location}</span>
                            </div>
                            <div className="font-medium text-yellow-600">
                              {formatPrice(purchase.price)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No purchases yet</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/cars/${car.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-200 text-center"
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => deleteCar(car.id)}
                    className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded font-medium hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {sellerCars.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg mb-4">You haven't listed any cars yet</p>
            <Link
              to="/add-car"
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400"
            >
              <Plus className="h-5 w-5" />
              Add Your First Car
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}