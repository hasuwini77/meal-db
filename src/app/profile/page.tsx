"use client";
import { useUserContext } from "@/utils/contexts"; // Ensure you import the context
import { RandomMeals } from "@/components/RandomMeals";
import Link from "next/link";

const Profile = () => {
  const { user, logout } = useUserContext(); // Get user and logout function from context

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
              <Link href={`/item/${recipeId}`}>Recipe {recipeId}</Link>
            </li>
          ))
        )}
      </ul>

      <RandomMeals meals={user.savedRecipes} />

      <div className="mt-4">
        {/* Logout button */}
        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
