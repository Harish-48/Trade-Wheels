import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, MapPin, Calendar, Activity } from 'lucide-react';

// Mock data for demonstration
const mockCar: Car = {
  id: '1',
  sellerId: 'seller1',
  make: 'Honda',
  model: 'City',
  year: 2019,
  mileage: 45000,
  price: 800000,
  location: 'Mumbai',
  images: [
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80',
  ],
  description: 'Well maintained Honda City with all service records. Single owner vehicle with regular service history. The car is in excellent condition both mechanically and aesthetically.',
  status: 'available',
  createdAt: new Date(),
};

export default function CarDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart, items } = useCart();
  const car = mockCar; // In real app, fetch car by id
  const isInCart = items.some(item => item.carId === car.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              className="w-full h-96 object-cover"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {car.images.slice(1).map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={image}
                  alt={`${car.make} ${car.model} view ${index + 2}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-2">
              {car.make} {car.model}
            </h1>
            
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="h-5 w-5" />
              <span>{car.location}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span>Year: {car.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-gray-600" />
                <span>Mileage: {car.mileage.toLocaleString()} km</span>
              </div>
            </div>

            <p className="text-3xl font-bold text-yellow-600 mb-6">
              {formatPrice(car.price)}
            </p>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{car.description}</p>
            </div>

            {user?.type === 'buyer' && (
              <div className="mt-6">
                {isInCart ? (
                  <Link
                    to="/buyer/cart"
                    className="block w-full bg-gray-100 text-gray-700 text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
                  >
                    View in Cart
                  </Link>
                ) : (
                  <button
                    onClick={() => addToCart(car)}
                    className="w-full bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}