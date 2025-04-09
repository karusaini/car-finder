"use client";

import { useEffect, useState } from "react";
import { CarCard } from "@/components/CarCard";
import { sampleCars } from "@/data/cars";
import { Filters, FiltersType } from "@/components/Filters";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Moon, Sun, Laptop } from "lucide-react"; // Using icons for light, dark, and system

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

  // Dark mode state
  const [mode, setMode] = useState<"light" | "dark" | "system">("system");
  const [isDark, setIsDark] = useState(false);

  // Effect to set the theme according to the mode selected
  useEffect(() => {
    if (mode === "system") {
      const systemPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(systemPreference);
      document.documentElement.classList.toggle("dark", systemPreference);
    } else {
      setIsDark(mode === "dark");
      document.documentElement.classList.toggle("dark", mode === "dark");
    }
  }, [mode]);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold cursor-pointer tracking-wide text-shadow-lg">
          Car Finder
        </h1>

        <div className="flex items-center gap-4">
          {/* Wishlist Button */}
          <Link href="/wishlist" className="hidden md:inline-block">
            <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer">
              <Heart className="w-5 h-5" />
              Wishlist
            </div>
          </Link>

          {/* Dark Mode Toggle */}
          <div
            className="relative w-24 h-8 bg-gray-600 rounded-full cursor-pointer"
            onClick={() =>
              setMode(
                mode === "light"
                  ? "system"
                  : mode === "system"
                  ? "dark"
                  : "light"
              )
            }
          >
            {/* Knob */}
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                mode === "dark"
                  ? "translate-x-[64px]"
                  : mode === "system"
                  ? "translate-x-[32px]"
                  : "translate-x-[0px]"
              }`}
            />

            {/* Icons */}
            <div className="absolute inset-0 flex items-center justify-between px-2 text-white">
              <Sun
                className={`${
                  mode === "light" ? "text-yellow-400" : "opacity-50"
                } w-4 h-4`}
              />
              <Laptop
                className={`${
                  mode === "system" ? "text-gray-300" : "opacity-50"
                } w-4 h-4`}
              />
              <Moon
                className={`${
                  mode === "dark" ? "text-blue-400" : "opacity-50"
                } w-4 h-4`}
              />
            </div>
          </div>
        </div>
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
