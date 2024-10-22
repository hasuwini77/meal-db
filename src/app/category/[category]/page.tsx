// app/category/[category]/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserContext } from "@/utils/contexts";
import Swal from "sweetalert2";

const CategoryDetail = ({ params }: { params: { category: string } }) => {
  const { setFavoriteCategory } = useUserContext();
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    if (params.category) {
      const fetchMeals = async () => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`
          );
          const data = await response.json();
          setMeals(data.meals || []);
        } catch (error) {
          console.error("Error fetching meals:", error);
        }
      };

      fetchMeals();
    }
  }, [params.category]);

  const handleSetFavorite = () => {
    setFavoriteCategory(params.category);
    Swal.fire({
      title: "Category Set!",
      text: `${params.category} has been set as your favorite category.`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-600">
      <h1 className="text-2xl font-bold mb-4">{params.category} Meals</h1>
      <button
        onClick={handleSetFavorite}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        ❤️ Set Category as Favorite
      </button>
      {meals.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="bg-white rounded-lg shadow-md p-4">
              <Link href={`/recipe/${meal.idMeal}`}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="mt-2 font-semibold">{meal.strMeal}</h2>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No meals found for this category.</p>
      )}
    </div>
  );
};

export default CategoryDetail;
