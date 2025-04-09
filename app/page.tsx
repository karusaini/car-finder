"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectTheme = (themeOption: string) => {
    setTheme(themeOption);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
      >
        {/* Button Text for Light/Dark Toggle */}
        {theme === "dark" ? (
          <>
            <Moon className="w-5 h-5" />
            Dark Mode
          </>
        ) : (
          <>
            <Sun className="w-5 h-5" />
            Light Mode
          </>
        )}
      </button>

      {/* Dropdown for System, Light, Dark Options */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg z-10">
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handleSelectTheme("system")}
          >
            System Default
          </div>
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handleSelectTheme("light")}
          >
            Light Mode
          </div>
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handleSelectTheme("dark")}
          >
            Dark Mode
          </div>
        </div>
      )}
    </div>
  );
}
