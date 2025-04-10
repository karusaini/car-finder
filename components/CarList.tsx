"use client";

import { useState, useEffect } from "react";
import { CarCard } from "./CarCard";
import { Car } from "@/types"; // Make sure this interface is available or move it here
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CarListProps {
  cars: Car[];
}

export const CarList = ({ cars }: CarListProps) => {
  const [sortedCars, setSortedCars] = useState<Car[]>([]);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    let updatedCars = [...cars];

    if (sortOption === "lowToHigh") {
      updatedCars.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      updatedCars.sort((a, b) => b.price - a.price);
    }

    setSortedCars(updatedCars);
  }, [sortOption, cars]);

  return (
    <div className="w-full space-y-6">
      {/* Sorting Dropdown */}
      <div className="flex justify-end">
        <Select onValueChange={setSortOption}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="highToLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Car Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};
