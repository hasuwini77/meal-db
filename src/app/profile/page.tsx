"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import Link from "next/link";
import Swal from "sweetalert2";
import { Menu } from "@/components/Menu";
import Image from "next/image";

const Profile = () => {
  const { user, setUser, logout, favoriteCategory, setFavoriteCategory } =
    useUserContext();
  const [savedMeals, setSavedMeals] = useState<any[]>([]);
  const [userMeals, setUserMeals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  // Fetch and display 3 random meals based on user's favorite category
  useEffect(() => {
    if (user && favoriteCategory) {
      fetchUserMeals(favoriteCategory);
      setFavoriteCategory(favoriteCategory);
    }
  }, [user, favoriteCategory, setFavoriteCategory]);

  const fetchUserMeals = async (category: string) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setUserMeals(data.meals.slice(0, 3)); // Limit to 3 meals
      } else {
        setUserMeals([]);
      }
    } catch (error) {
      console.error("Error fetching user meals:", error);
      setFetchError("Failed to fetch meals. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch saved recipes
  useEffect(() => {
    const fetchSavedMeals = async () => {
      if (user && user.savedRecipes.length > 0) {
        const mealPromises = user.savedRecipes.map(async (recipeId) => {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
          );
          const data = await response.json();
          return data.meals[0];
        });

        const mealsData = await Promise.all(mealPromises);
        setSavedMeals(mealsData.filter((meal) => meal));
      }
    };

    fetchSavedMeals();
  }, [user]);

  const handleRemoveRecipe = async (recipeId: string) => {
    if (user) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This recipe will be removed from your favorites.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const updatedSavedRecipes = user.savedRecipes.filter(
          (id) => id !== recipeId
        );
        setUser({
          ...user,
          savedRecipes: updatedSavedRecipes,
        });

        await Swal.fire({
          title: "Removed!",
          text: "Recipe has been removed from favorites.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setSavedMeals((prevMeals) =>
          prevMeals.filter((meal) => meal.idMeal !== recipeId)
        );
      }
    }
  };

  if (!user) return <p>Please log in to see your profile.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Menu />
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Favorite Category: {favoriteCategory ? favoriteCategory : "None"}</p>

      <h2 className="text-xl font-semibold mt-6">Saved Recipes</h2>
      {user.savedRecipes.length === 0 ? (
        <p>No saved recipes</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {savedMeals.map((meal) => (
            <li key={meal.idMeal} className="flex justify-between items-center">
              <Link
                href={`/recipe/${meal.idMeal}`}
                className="text-blue-600 hover:underline"
              >
                {meal.strMeal}
              </Link>
              <button
                onClick={() => handleRemoveRecipe(meal.idMeal)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-semibold mt-6">
        Recommended Meals from Your Favorite Category: {favoriteCategory}
      </h2>
      {isLoading ? (
        <p className="mt-4">Loading meals...</p>
      ) : fetchError ? (
        <p className="text-red-500 mt-4">{fetchError}</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {userMeals.map((meal) => (
            <Link
              key={meal.idMeal}
              href={`/recipe/${meal.idMeal}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-lg p-4">
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-md"
                  placeholder="blur"
                  blurDataURL={meal.strMealThumb}
                />
                <h3 className="text-lg font-semibold text-gray-600 mt-2">
                  {meal.strMeal}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
        <button
          onClick={handleGoBack}
          className="bg-orange-500 text-white py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Profile;
