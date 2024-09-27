"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
interface RandomMealsProps {
  meals: any[];
}

export const RandomMeals = ({ meals }: RandomMealsProps) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-300 mb-6 text-center">
        Random Meals You Might Like:
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <motion.li
            key={meal.idMeal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 ease-in-out"
          >
            <Link href={`/recipe/${meal.idMeal}`} className="block">
              <div className="w-full h-48 relative">
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  placeholder="blur"
                  blurDataURL={meal.strMealThumb}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 p-4">
                {meal.strMeal}
              </h3>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default RandomMeals;
