"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import Link from "next/link";
import Swal from "sweetalert2";
import { Menu } from "@/components/Menu";

const Category = () => {
  const { favoriteCategory, setFavoriteCategory } = useUserContext();
  const [categories, setCategories] = useState<string[]>([]);
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await response.json();
        const categoryNames = data.categories.map(
          (cat: any) => cat.strCategory
        );
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch meals from the favorite category when it's set
  useEffect(() => {
    if (favoriteCategory) {
      const fetchMeals = async () => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${favoriteCategory}`
          );
          const data = await response.json();
          setMeals(data.meals.slice(0, 6)); // Show 6 items
        } catch (error) {
          console.error("Error fetching meals:", error);
        }
      };

      fetchMeals();
    }
  }, [favoriteCategory]);

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
      <Menu />
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* Category buttons */}
      <div className="flex flex-wrap mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleSetFavorite(category)}
            className={`p-2 m-1 border rounded ${
              favoriteCategory === category
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Meals from favorite category */}
      {favoriteCategory ? (
        <>
          <h2 className="text-xl font-semibold mb-4">
            You Favorite Category is Currently: {favoriteCategory}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <Link href={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
                <li className="bg-white text-gray-800 rounded-lg shadow-md p-4">
                  {meal.strMeal}
                </li>
              </Link>
            ))}
          </ul>
        </>
      ) : (
        <p>Please select a category to see the meals.</p>
      )}
    </div>
  );
};

export default Category;
