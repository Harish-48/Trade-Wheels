import React from 'react';
import { useCart } from '../../context/CartContext';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, total } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
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
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ car }) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
              <img
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                className="w-32 h-32 object-cover rounded-md"
              />
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {car.make} {car.model}
                </h3>
                <p className="text-gray-600">Year: {car.year}</p>
                <p className="text-gray-600">Mileage: {car.mileage.toLocaleString()} km</p>
                <p className="text-xl font-bold text-yellow-600 mt-2">
                  {formatPrice(car.price)}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(car.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Total Cars</span>
              <span>{items.length}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total Amount</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            to="/buyer/checkout"
            className="block w-full bg-yellow-500 text-black text-center px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}