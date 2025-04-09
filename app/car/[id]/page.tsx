import { sampleCars } from "@/data/cars";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CarDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // 🛠️ Correctly awaitable dynamic route param usage
  const car = sampleCars.find((car) => car.id === Number(params.id));

  if (!car) return notFound();

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-100 dark:bg-black text-black dark:text-white">
      {/* Back Button */}
      <div className="flex justify-end mb-6">
        <Link href="/">
          <button className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </Link>
      </div>

      {/* Main Car Detail Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Car Image */}
        <div>
          <Image
            src={car.image}
            alt={car.name}
            width={800}
            height={500}
            className="rounded-lg w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover shadow"
          />
        </div>

        {/* Car Info Section */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{car.name}</h1>

          <div className="space-y-2 text-base md:text-lg">
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Brand:
              </span>{" "}
              {car.brand}
            </p>
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Fuel Type:
              </span>{" "}
              {car.fuelType}
            </p>
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Seating:
              </span>{" "}
              {car.seating}
            </p>
            <p className="text-xl font-semibold text-black dark:text-white mt-2">
              ₹{car.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
