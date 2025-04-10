// /types/index.ts or /types/car.ts

export interface Car {
    id: number;
    name: string;
    brand: string;
    price: number;
    fuelType: string;
    seating: number;
    image: string;
    createdAt: string;      // ISO string or Date type
    popularity?: number;
  }
  
  