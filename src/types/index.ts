export interface User {
  id: string;
  name: string;
  email: string;
  type: 'buyer' | 'seller';
  location?: string;
  phone?: string;
}

export interface Car {
  id: string;
  sellerId: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  location: string;
  images: string[];
  description: string;
  status: 'available' | 'sold';
  createdAt: Date;
}

export interface Order {
  id: string;
  carId: string;
  buyerId: string;
  sellerId: string;
  status: 'completed' | 'cancelled';
  price: number;
  createdAt: Date;
  car: Car;
}

export interface CartItem {
  carId: string;
  car: Car;
}