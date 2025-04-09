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

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <Input
        placeholder="Search by car name..."
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
      />

      <Select
        value={filters.brand}
        onValueChange={(val) => handleChange("brand", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Brands</SelectItem>
          <SelectItem value="Maruti">Maruti</SelectItem>
          <SelectItem value="Hyundai">Hyundai</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.fuelType}
        onValueChange={(val) => handleChange("fuelType", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Fuel Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Petrol">Petrol</SelectItem>
          <SelectItem value="Diesel">Diesel</SelectItem>
          <SelectItem value="Electric">Electric</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.seating}
        onValueChange={(val) => handleChange("seating", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seating Capacity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          <SelectItem value="5">5 Seater</SelectItem>
          <SelectItem value="7">7 Seater</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.priceRange}
        onValueChange={(val) => handleChange("priceRange", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Price Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="0-500000">Below ₹5L</SelectItem>
          <SelectItem value="500000-1000000">₹5L - ₹10L</SelectItem>
          <SelectItem value="1000000-2000000">₹10L - ₹20L</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
