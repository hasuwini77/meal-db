"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "@/utils/contexts";
import { LoginWrapper } from "@/components/LoginWrapper";
import { Menu } from "@/components/Menu";
import { RandomMeals } from "@/components/RandomMeals";
import { registeredUsers } from "@/utils/users";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

const Page = () => {
  const { user, login, setUser, favoriteCategory, setFavoriteCategory } =
    useUserContext();
  const [isValidUser, setIsValidUser] = useState<boolean>(false);
  const [hasTriedLogin, setHasTriedLogin] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [userMeals, setUserMeals] = useState<any[]>([]);
  const [randomMeals, setRandomMeals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetchRandomMeals(); // Fetch random meals on load
  }, []);

  useEffect(() => {
    if (user && favoriteCategory) {
      fetchUserMeals(favoriteCategory);
    }
  }, [user]);

  const fetchUserMeals = async (category: string) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setUserMeals(data.meals.slice(0, 3));
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

  const fetchRandomMeals = async () => {
    try {
      const mealPromises = [];
      for (let i = 0; i < 6; i++) {
        mealPromises.push(
          fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(
            (res) => res.json()
          )
        );
      }
      const mealsData = await Promise.all(mealPromises);
      const meals = mealsData
        .map((mealData) => mealData.meals[0])
        .filter((meal) => meal && meal.strMealThumb);
      setRandomMeals(meals);
    } catch (error) {
      console.error("Error fetching random meals:", error);
    }
  };

  const handleLoginAttempt = () => {
    setHasTriedLogin(true);
    const foundUser = registeredUsers.find(
      (u) => u.name.toLowerCase() === userInput.toLowerCase()
    );
    if (foundUser) {
      login(foundUser);
      setIsValidUser(true);
      fetchUserMeals(foundUser.favoriteCategory || ""); // Provide a fallback value here
    } else {
      setIsValidUser(false);
    }
  };

  const handleRemoveRecipe = async (recipeId: string) => {
    if (user) {
      // Confirm the removal
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This recipe will be removed from your favorites.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        // Update the user context
        const updatedSavedRecipes = user.savedRecipes.filter(
          (id) => id !== recipeId
        );
        setUser({
          ...user,
          savedRecipes: updatedSavedRecipes,
        });

        // Show success alert
        await Swal.fire({
          title: "Removed!",
          text: "Recipe has been removed from favorites.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Optionally, refresh the random meals
        setRandomMeals((prevMeals) =>
          prevMeals.filter((meal) => meal.idMeal !== recipeId)
        );
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {!user ? (
        <div className="text-center">
          <p className="text-lg mb-4">
            Welcome, visitor! Please fill in the login form below:
          </p>
          <LoginWrapper
            setUserInput={setUserInput}
            handleLoginAttempt={handleLoginAttempt}
            setIsValidUser={setIsValidUser}
          />

          {hasTriedLogin && !isValidUser && (
            <p className="text-red-500 mt-4">
              Wrong Username. Please try again.
            </p>
          )}
          <RandomMeals
            meals={randomMeals}
            onRemove={handleRemoveRecipe}
            isLoggedIn={!!user}
          />
        </div>
      ) : (
        <div>
          <Menu />
          <p className="text-xl font-semibold mt-6">Hi {user.name}</p>

          {isLoading ? (
            <p className="mt-4">Loading meals...</p>
          ) : (
            <>
              {fetchError ? (
                <p className="text-red-500 mt-4">{fetchError}</p>
              ) : (
                <>
                  {userMeals.length > 0 ? (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
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
                  ) : (
                    <p className="mt-4">
                      No meals found for the category "
                      {user.favoriteCategory || "N/A"}".
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
