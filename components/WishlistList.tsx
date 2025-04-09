"use client";

import { useEffect, useState } from "react";
import { CarCard } from "@/components/CarCard";

interface Car {
  id: number;
  name: string;
  brand: string;
  price: number;
  fuelType: string;
  seating: number;
  image: string;
}

export const WishlistList = () => {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(saved);
  }, []);

  if (wishlist.length === 0) {
    return <p className="text-muted-foreground">Your wishlist is empty.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {wishlist.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};
