"use client";

import { useEffect, useState } from "react";
import { Car } from "@/types";
import { CarCard } from "./CarCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type PriceSort = "none" | "lowToHigh" | "highToLow";
type DateSort = "default" | "newest" | "oldest" | "popular";

interface CarListProps {
  cars: Car[];
}

export const CarList = ({ cars }: CarListProps) => {
  const [sortedCars, setSortedCars] = useState<Car[]>([]);
  const [priceSort, setPriceSort] = useState<PriceSort>("none");
  const [dateSort, setDateSort] = useState<DateSort>("default");

  useEffect(() => {
    let updatedCars = [...cars];

    // Apply date-based sorting
    if (dateSort === "newest") {
      updatedCars.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (dateSort === "oldest") {
      updatedCars.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (dateSort === "popular") {
      updatedCars.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    // Apply price-based sorting
    if (priceSort === "lowToHigh") {
      updatedCars.sort((a, b) => a.price - b.price);
    } else if (priceSort === "highToLow") {
      updatedCars.sort((a, b) => b.price - a.price);
    }

    setSortedCars(updatedCars);
  }, [cars, priceSort, dateSort]);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap justify-end gap-4">
        {/* ✅ Category/Date Sort Dropdown */}
        <Select onValueChange={(value: DateSort) => setDateSort(value)}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Sort by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>

        {/* ✅ Price Sort Dropdown */}
        <Select onValueChange={(value: PriceSort) => setPriceSort(value)}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
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
