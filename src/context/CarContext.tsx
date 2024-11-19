import React, { createContext, useContext, useState } from 'react';
import { Car } from '../types';

// Initial mock data
const initialCars: Car[] = [
  {
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
    createdAt: new Date(),
  },
  {
    id: '2',
    sellerId: 'seller2',
    make: 'Hyundai',
    model: 'Creta',
    year: 2020,
    mileage: 35000,
    price: 1200000,
    location: 'Delhi',
    images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80'],
    description: 'Single owner Creta in excellent condition',
    status: 'available',
    createdAt: new Date(),
  },
];

interface CarContextType {
  cars: Car[];
  addCar: (car: Omit<Car, 'id' | 'createdAt' | 'status'>) => void;
  deleteCar: (id: string) => void;
  getSellerCars: (sellerId: string) => Car[];
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export function CarProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>(initialCars);

  const addCar = (carData: Omit<Car, 'id' | 'createdAt' | 'status'>) => {
    const newCar: Car = {
      ...carData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      status: 'available',
    };
    setCars([...cars, newCar]);
  };

  const deleteCar = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const getSellerCars = (sellerId: string) => {
    return cars.filter(car => car.sellerId === sellerId);
  };

  return (
    <CarContext.Provider value={{ cars, addCar, deleteCar, getSellerCars }}>
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
}