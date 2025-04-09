"use client";

import { useEffect, useState } from "react";
import { CarCard } from "@/components/CarCard";
import { sampleCars } from "@/data/cars";
import { Filters, FiltersType } from "@/components/Filters";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Home() {
  const [cars] = useState(sampleCars);
  const [filteredCars, setFilteredCars] = useState(sampleCars);
  const [filters, setFilters] = useState<FiltersType>({
    search: "",
    brand: "",
    fuelType: "",
    seating: "",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  useEffect(() => {
    let results = [...cars];

    if (filters.search) {
      results = results.filter((car) =>
        car.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.brand) {
      results = results.filter((car) => car.brand === filters.brand);
    }

    if (filters.fuelType) {
      results = results.filter((car) => car.fuelType === filters.fuelType);
    }

    if (filters.seating) {
      results = results.filter(
        (car) => car.seating === parseInt(filters.seating)
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      results = results.filter((car) => car.price >= min && car.price <= max);
    }

    setFilteredCars(results);
    setCurrentPage(1);
  }, [filters, cars]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100 dark:bg-black relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Car Finder</h1>

        {/* Desktop Wishlist Button */}
        <Link href="/wishlist" className="hidden md:inline-block">
          <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            <Heart className="w-5 h-5" /> Wishlist
          </button>
        </Link>
      </div>

      {/* Filters */}
      <Filters filters={filters} onChange={setFilters} />

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded disabled:opacity-50"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded disabled:opacity-50"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Mobile Floating Wishlist Button */}
      <Link href="/wishlist" className="md:hidden">
        <button className="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition z-50">
          <Heart className="w-6 h-6" />
        </button>
      </Link>
    </main>
  );
}
