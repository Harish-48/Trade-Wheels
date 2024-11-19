import React from 'react';
import { Car } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { user } = useAuth();
  const { addToCart, items } = useCart();
  const isInCart = items.some(item => item.carId === car.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={car.images[0]}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          {user?.type === 'buyer' && !isInCart && (
            <button
              onClick={() => addToCart(car)}
              className="p-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">
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

        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/cars/${car.id}`}
            className="flex items-center space-x-1 text-gray-600 hover:text-yellow-600"
          >
            <Info className="h-4 w-4" />
            <span>View Details</span>
          </Link>
          
          {isInCart && (
            <span className="text-sm text-green-600 font-medium">
              Added to cart
            </span>
          )}
        </div>
      </div>
    </div>
  );
}