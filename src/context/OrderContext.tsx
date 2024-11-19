import React, { createContext, useContext, useState } from 'react';
import { Order, Car } from '../types';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  addOrder: (cars: Car[]) => void;
  getBuyerOrders: (buyerId: string) => Order[];
  getSellerOrders: (sellerId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Initial mock data for demonstration
const initialOrders: Order[] = [
  {
    id: '1',
    carId: '1',
    buyerId: 'buyer1',
    sellerId: 'seller1',
    status: 'completed',
    price: 800000,
    createdAt: new Date('2024-01-15'),
    car: {
      id: '1',
      sellerId: 'seller1',
      make: 'Honda',
      model: 'City',
      year: 2019,
      mileage: 45000,
      price: 800000,
      location: 'Mumbai',
      images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80'],
      description: 'Well maintained Honda City with all service records',
      status: 'available',
      createdAt: new Date('2024-01-01'),
    },
  },
];

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const { user } = useAuth();

  const addOrder = (cars: Car[]) => {
    const newOrders = cars.map(car => ({
      id: Math.random().toString(36).substr(2, 9),
      carId: car.id,
      buyerId: user?.id || '',
      sellerId: car.sellerId,
      status: 'completed' as const,
      price: car.price,
      createdAt: new Date(),
      car,
    }));

    setOrders(prev => [...prev, ...newOrders]);
  };

  const getBuyerOrders = (buyerId: string) => {
    return orders.filter(order => order.buyerId === buyerId);
  };

  const getSellerOrders = (sellerId: string) => {
    return orders.filter(order => order.sellerId === sellerId);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getBuyerOrders, getSellerOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}