import Link from "next/link";
import { WishlistList } from "@/components/WishlistList";
import { ArrowLeft } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-black relative">
      {/* Back to Home Button - Top Right */}
      <div className="absolute top-6 right-6">
        <Link href="/">
          <button className="flex items-center gap-2 text-sm text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-md transition">
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
        My Wishlist
      </h1>

      <WishlistList />
    </div>
  );
}
