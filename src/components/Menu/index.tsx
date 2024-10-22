"use client";
import { useUserContext } from "@/utils/contexts";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const { logout, favoriteCategory, setFavoriteCategory } = useUserContext();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isRecipePage = pathname.includes("/recipe/");

  return (
    <nav
      className={`${
        isRecipePage
          ? "bg-gradient-to-r from-purple-500 to-pink-500"
          : "bg-gray-800"
      } p-4 rounded-lg shadow-md transition-all duration-300 transform ${
        isRecipePage ? "hover:scale-105" : ""
      }`}
    >
      <ul className="flex space-x-6">
        <li>
          <Link
            href="/"
            className={`${
              isRecipePage
                ? "text-white hover:text-gray-300"
                : "text-gray-300 hover:text-white"
            } transition`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className={`${
              isRecipePage
                ? "text-white hover:text-gray-300"
                : "text-gray-300 hover:text-white"
            } transition`}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            href="/category"
            className={`${
              isRecipePage
                ? "text-white hover:text-gray-300"
                : "text-gray-300 hover:text-white"
            } transition`}
          >
            Category
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className={`${
              isRecipePage
                ? "text-white hover:text-gray-300"
                : "text-gray-300 hover:text-white"
            } transition`}
          >
            Logout
          </button>
        </li>
      </ul>
      {favoriteCategory && (
        <div
          className={`mt-2 ${isRecipePage ? "text-white" : "text-gray-300"}`}
        >
          Favorite Category: <strong>{favoriteCategory}</strong>
        </div>
      )}
    </nav>
  );
};
