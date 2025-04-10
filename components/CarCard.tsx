"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Car {
  id: number;
  name: string;
  brand: string;
  price: number;
  fuelType: string;
  seating: number;
  image: string;
}

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const router = useRouter();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsInWishlist(wishlist.some((c: Car) => c.id === car.id));
  }, [car.id]);

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isInWishlist) {
      wishlist = wishlist.filter((c: Car) => c.id !== car.id);
    } else {
      wishlist.push(car);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsInWishlist(!isInWishlist);
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border hover:shadow-md transition-all flex flex-col">
      {/* Wishlist Heart Icon */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 p-1 rounded-full bg-white dark:bg-gray-800 hover:scale-110 transition"
        aria-label="Toggle Wishlist"
        title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <Heart
          size={20}
          className={
            isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400"
          }
        />
      </button>

      {/* Car Image */}
      <Image
        src={car.image}
        alt={car.name}
        width={400}
        height={200}
        className="rounded-xl object-cover w-full h-48 shadow-md hover:scale-105 transition-transform duration-300"
      />

      {/* Car Name and Price */}
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-lg font-bold">{car.name}</h2>
        <p className="text-base font-semibold text-green-600 dark:text-green-400">
          ₹{car.price.toLocaleString()}
        </p>
      </div>

      {/* Car Info in Flex Layout */}
      <div className="flex justify-between text-sm text-muted-foreground mt-2">
        <p>
          <span className="font-medium">Brand:</span> {car.brand}
        </p>
        <p>
          <span className="font-medium">Fuel:</span> {car.fuelType}
        </p>
        <p>
          <span className="font-medium">Seats:</span> {car.seating}
        </p>
      </div>

      {/* View Details Button */}
      <Button
        className="mt-4"
        onClick={() => router.push(`/car/${car.id}`)}
        variant="outline"
      >
        View Details
      </Button>
    </div>
  );
};
