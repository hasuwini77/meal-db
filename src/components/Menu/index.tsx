import { useUserContext } from "@/utils/contexts";
import Link from "next/link";

export const Menu = () => {
  const { logout, favoriteCategory, setFavoriteCategory } = useUserContext(); // Access favoriteCategory from context

  return (
    <nav className="bg-gray-800 p-4 rounded shadow-md">
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="text-white hover:text-gray-300 transition">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className="text-white hover:text-gray-300 transition"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            href="/category"
            className="text-white hover:text-gray-300 transition"
          >
            Category
          </Link>
        </li>
        <li>
          <button
            onClick={logout}
            className="text-white hover:text-gray-300 transition"
          >
            Logout
          </button>
        </li>
      </ul>
      {favoriteCategory && ( // Conditionally display the favorite category
        <div className="mt-2 text-white">
          Favorite Category: <strong>{favoriteCategory}</strong>
        </div>
      )}
    </nav>
  );
};
