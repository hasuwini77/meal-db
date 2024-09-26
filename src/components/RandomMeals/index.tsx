// RandomMeals.tsx
"use client"; // If your component uses client-side features

import Link from "next/link";

interface RandomMealsProps {
  meals: any[]; // You may want to define a more specific type instead of 'any'
}

export const RandomMeals = ({ meals }: RandomMealsProps) => {
  return (
    <div>
      <h2>Random Meals You Might Like:</h2>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <h3>
              <Link href={`/item/${meal.idMeal}`}>{meal.strMeal}</Link>
            </h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </li>
        ))}
      </ul>
    </div>
  );
};
