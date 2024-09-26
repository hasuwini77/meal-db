"use client";
import { useUserContext } from "@/utils/contexts";
import Link from "next/link";

const Profile = () => {
  const { user } = useUserContext();

  if (!user) return <p>Please log in to see your profile</p>;

  return (
    <div>
      <h1>Profile Page</h1>
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
    </div>
  );
};

export default Profile;
