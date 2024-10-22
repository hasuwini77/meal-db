"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Menu } from "@/components/Menu";
const Category = () => {
  const { favoriteCategory, setFavoriteCategory } = useUserContext();
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleViewMeals = (category: string) => {
    router.push(`/category/${category}`);
  };

  const handleSetFavorite = (category: string) => {
    setFavoriteCategory(category);
    Swal.fire({
      title: "Category Set!",
      text: `${category} has been set as your favorite category.`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <div
            key={category.strCategory}
            className="border rounded-lg shadow-md"
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{category.strCategory}</h2>
              <button
                onClick={() => handleViewMeals(category.strCategory)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Meals
              </button>
              <button
                onClick={() => handleSetFavorite(category.strCategory)}
                className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ❤️ Set as Favorite
              </button>
            </div>
          </div>
        ))}
      </div>
      {favoriteCategory && (
        <p>Your Favorite Category is Currently: {favoriteCategory}</p>
      )}
    </div>
  );
};

export default Category;
