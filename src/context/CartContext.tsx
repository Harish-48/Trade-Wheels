import React, { createContext, useContext, useState } from 'react';
import { CartItem, Car } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (carId: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (car: Car) => {
    if (!items.some(item => item.carId === car.id)) {
      setItems([...items, { carId: car.id, car }]);
    }
  };

  const removeFromCart = (carId: string) => {
    setItems(items.filter(item => item.carId !== carId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.car.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}