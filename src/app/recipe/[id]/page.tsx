"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserType } from "@/utils/types";
import Swal from "sweetalert2";
import { Menu } from "@/components/Menu";

type RecipePageProps = {
  params: {
    id: string;
  };
};

const RecipePage = ({ params }: RecipePageProps) => {
  const { id } = params;
  const [meal, setMeal] = useState<RecipeType | null>(null);
  const { user, setUser, favoriteCategory, setFavoriteCategory } =
    useUserContext();

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

  const handleSaveRecipe = async () => {
    if (user && meal) {
      const recipeId = meal.idMeal;

      if (recipeId) {
        if (!user.savedRecipes.includes(recipeId)) {
          setUser((prevUser) => {
            if (prevUser) {
              return {
                ...prevUser, // Spread previous user properties
                savedRecipes: [...prevUser.savedRecipes, recipeId],
                favoriteCategory: prevUser.favoriteCategory,
              };
            }
            return user; // In case prevUser is null, return the current user (this shouldn't happen)
          });

          await Swal.fire({
            title: "Success!",
            text: "Recipe successfully saved!",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          await Swal.fire({
            title: "Error!",
            text: "This recipe has already been saved.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        console.log("Invalid recipe ID!");
      }
    }
  };

  const handleGoBack = () => {
    window.location.href = "/";
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <>
      {user && <Menu />}
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

      {!user && (
        <div className="max-w-sm mx-auto mt-4">
          <button
            onClick={handleGoBack}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-md shadow-md transition duration-200"
          >
            Go Back
          </button>
        </div>
      )}
    </>
  );
};

export default RecipePage;
