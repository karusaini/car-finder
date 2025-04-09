"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export interface FiltersType {
  search: string;
  brand: string;
  fuelType: string;
  seating: string;
  priceRange: string;
}

interface Props {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
}

export const Filters = ({ filters, onChange }: Props) => {
  const handleChange = (key: keyof FiltersType, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    onChange({
      search: "",
      brand: "",
      fuelType: "",
      seating: "",
      priceRange: "",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
      {/* Search Field */}
      <div>
        <Input
          placeholder="Search by car name..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
        />
      </div>

      {/* Brand Select */}
      <div>
        <Select
          value={filters.brand}
          onValueChange={(val) => handleChange("brand", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            <SelectItem value="Maruti">Maruti</SelectItem>
            <SelectItem value="Hyundai">Hyundai</SelectItem>
            <SelectItem value="Toyota">Toyota</SelectItem>
            <SelectItem value="Honda">Honda</SelectItem>
            <SelectItem value="BMW">BMW</SelectItem>
            <SelectItem value="Mercedes">Mercedes</SelectItem>
            <SelectItem value="Audi">Audi</SelectItem>
            <SelectItem value="Ford">Ford</SelectItem>
            <SelectItem value="Kia">Kia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Fuel Type Select */}
      <div>
        <Select
          value={filters.fuelType}
          onValueChange={(val) => handleChange("fuelType", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Fuel Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Petrol">Petrol</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
            <SelectItem value="CNG">CNG</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Seating Capacity Select */}
      <div>
        <Select
          value={filters.seating}
          onValueChange={(val) => handleChange("seating", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seating Capacity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="5">5 Seater</SelectItem>
            <SelectItem value="7">7 Seater</SelectItem>
            <SelectItem value="4">4 Seater</SelectItem>
            <SelectItem value="2">2 Seater</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Select */}
      <div>
        <Select
          value={filters.priceRange}
          onValueChange={(val) => handleChange("priceRange", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0-500000">Below ₹5L</SelectItem>
            <SelectItem value="500000-1000000">₹5L - ₹10L</SelectItem>
            <SelectItem value="1000000-2000000">₹10L - ₹20L</SelectItem>
            <SelectItem value="2000000-5000000">₹20L - ₹50L</SelectItem>
            <SelectItem value="5000000-10000000">₹50L - ₹1Cr</SelectItem>
            <SelectItem value="10000000-20000000">₹1Cr - ₹2Cr</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters Button (Centered) */}
      <div className="col-span-full flex justify-center mt-6">
        <button
          onClick={handleClearFilters}
          className="text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
