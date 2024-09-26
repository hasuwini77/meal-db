"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "@/utils/contexts";
import { LoginWrapper } from "@/components/LoginWrapper";
import { Menu } from "@/components/Menu";
import { RandomMeals } from "@/components/RandomMeals";
import { registeredUsers } from "@/utils/users";

const Page = () => {
  const { user, login } = useUserContext();
  const [isValidUser, setIsValidUser] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [userMeals, setUserMeals] = useState<any[]>([]);
  const [randomMeals, setRandomMeals] = useState<any[]>([]);

  useEffect(() => {
    if (isValidUser) {
      fetchUserMeals(userInput); // Fetch meals based on the user input
    }
  }, [isValidUser, userInput]); // Include userInput in dependency array

  useEffect(() => {
    if (!user) {
      fetchRandomMeals(); // Fetch random meals if no user is logged in
    }
  }, [user]);

  const fetchUserMeals = async (userName: string) => {
    const foundUser = registeredUsers.find((user) => user.name === userName);
    if (foundUser) {
      login(foundUser);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${foundUser.category}`
        );
        const data = await response.json();
        if (data.meals) {
          setUserMeals(data.meals.slice(0, 3)); // Store only the first 3 meals
        }
      } catch (error) {
        console.error("Error fetching user meals:", error);
      }
    }
  };

  const fetchRandomMeals = async () => {
    try {
      const mealPromises = [];
      for (let i = 0; i < 5; i++) {
        mealPromises.push(
          fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(
            (res) => res.json()
          )
        );
      }
      const mealsData = await Promise.all(mealPromises);
      const meals = mealsData.map((mealData) => mealData.meals[0]);
      setRandomMeals(meals);
    } catch (error) {
      console.error("Error fetching random meals:", error);
    }
  };

  return (
    <div>
      {!user ? (
        <div>
          <p>Welcome to you, visitor! Please fill in the login form below:</p>
          <LoginWrapper
            setIsValidUser={setIsValidUser}
            setUserInput={setUserInput}
          />
          {isValidUser ? (
            <p>Login successful! Loading your meals...</p>
          ) : (
            <p>Please try again.</p>
          )}
          <RandomMeals meals={randomMeals} /> {/* Show random meals */}
        </div>
      ) : (
        <div>
          <Menu />
          <p>Hi {user.name}</p>
          {userMeals.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              {userMeals.map((meal) => (
                <div key={meal.idMeal} className="card">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-auto rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{meal.strMeal}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p>No meals found for your category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
