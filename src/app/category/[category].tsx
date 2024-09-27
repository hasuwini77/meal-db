"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RecipeType } from "@/utils/types"; // Import the type

const CategoryDetail = () => {
  const router = useRouter();
  const { category } = router.query as { category?: string }; // Type the query to expect a string
  const [meals, setMeals] = useState<RecipeType[]>([]); // Use RecipeType[] for state

  useEffect(() => {
    if (category) {
      const fetchMeals = async () => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          );
          const data = await response.json();
          setMeals(data.meals); // Update state with data
        } catch (error) {
          console.error("Error fetching meals:", error);
        }
      };
      fetchMeals();
    }
  }, [category]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{category} Meals</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <li key={meal.idMeal} className="bg-white rounded-lg shadow-md p-4">
            <Link href={`/item/${meal.idMeal}`}>{meal.strMeal}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDetail;
