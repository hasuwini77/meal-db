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

  if (!meal) return <p>Loading...</p>;

  return (
    <div>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p>{meal.strInstructions}</p>
      <button onClick={handleSaveRecipe}>Save Recipe</button>
    </div>
  );
};

export default RecipePage;
