"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import { RecipeType } from "@/utils/types";

type RecipePageProps = {
  params: {
    id: string; // The dynamic route parameter passed to the component
  };
};

const RecipePage = ({ params }: RecipePageProps) => {
  const { id } = params;
  const [meal, setMeal] = useState<RecipeType | null>(null); // Use RecipeType or a more detailed type
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (id) {
      const fetchMeal = async () => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          const data = await response.json();
          if (data.meals && data.meals.length > 0) {
            setMeal(data.meals[0]);
          }
        } catch (error) {
          console.error("Error fetching meal:", error);
        }
      };
      fetchMeal();
    }
  }, [id]);

  const handleSaveRecipe = () => {
    if (user && meal) {
      if (!user.savedRecipes.includes(meal.idMeal)) {
        // Prevent duplicate saves
        setUser({
          ...user,
          savedRecipes: [...user.savedRecipes, meal.idMeal],
        });
      } else {
        console.log("Recipe already saved!");
      }
    }
  };

  const handleGoBack = () => {
    if (user) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <>
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md mt-6 overflow-hidden p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{meal.strMeal}</h1>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover rounded-md"
        />
        <p className="text-gray-600 text-sm leading-relaxed">
          {meal.strInstructions}
        </p>
        <button
          onClick={handleSaveRecipe}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md shadow-md transition duration-200"
        >
          Save Recipe
        </button>
      </div>
      <div className="max-w-sm mx-auto mt-4">
        <button
          onClick={handleGoBack}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-md shadow-md transition duration-200"
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default RecipePage;
