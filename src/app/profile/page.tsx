"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import { RandomMeals } from "@/components/RandomMeals";
import Link from "next/link";

const Profile = () => {
  const { user, logout } = useUserContext();
  const [savedMeals, setSavedMeals] = useState<any[]>([]);

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchSavedMeals = async () => {
      if (user && user.savedRecipes.length > 0) {
        const mealPromises = user.savedRecipes.map(async (recipeId) => {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
          );
          const data = await response.json();
          return data.meals[0]; // Assuming the API returns an array and we want the first meal
        });

        const mealsData = await Promise.all(mealPromises);
        setSavedMeals(mealsData.filter((meal) => meal)); // Filter out any undefined results
      }
    };

    fetchSavedMeals();
  }, [user]);

  if (!user) return <p>Please log in to see your profile.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Favorite Category: {user.category}</p>

      <h2>Saved Recipes</h2>
      <ul>
        {user.savedRecipes.length === 0 ? (
          <p>No saved recipes</p>
        ) : (
          user.savedRecipes.map((recipeId) => (
            <li key={recipeId}>
              <Link href={`/recipe/${recipeId}`}>Recipe {recipeId}</Link>
            </li>
          ))
        )}
      </ul>

      <RandomMeals meals={savedMeals} />

      <div className="mt-4 flex space-x-4">
        <button
          onClick={logout}
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
