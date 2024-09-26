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
  const [hasTriedLogin, setHasTriedLogin] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [userMeals, setUserMeals] = useState<any[]>([]);
  const [randomMeals, setRandomMeals] = useState<any[]>([]);

  useEffect(() => {
    if (isValidUser) {
      fetchUserMeals(userInput);
    }
  }, [isValidUser, userInput]);

  useEffect(() => {
    if (!user) {
      fetchRandomMeals();
    }
  }, [user]);

  const fetchUserMeals = async (userName: string) => {
    const foundUser = registeredUsers.find(
      (user) => user.name.toLowerCase() === userName.toLowerCase()
    );
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
      for (let i = 0; i < 6; i++) {
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

  // Handle login attempt
  const handleLoginAttempt = () => {
    setHasTriedLogin(true);
    const foundUser = registeredUsers.find(
      (u) => u.name.toLowerCase() === userInput.toLowerCase()
    );
    if (foundUser) {
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
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
            <p className="text-red-500 mt-4">Please try again.</p>
          )}
          <RandomMeals meals={randomMeals} />
        </div>
      ) : (
        <div>
          <Menu />
          <p className="text-xl font-semibold mt-6">Hi {user.name}</p>
          {userMeals.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {userMeals.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="bg-white rounded-lg shadow-lg p-4"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">{meal.strMeal}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4">No meals found for your category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
