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
    <div>
      <h1>{category} Meals</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <Link href={`/item/${meal.idMeal}`}>{meal.strMeal}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDetail;
