import { Dispatch, SetStateAction } from "react";

export interface UserType {
  name: string;
  savedRecipes: string[];
  favoriteCategory: string | null;
}

export interface UserContextType {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  login: (userData: UserType) => void;
  logout: () => void;
  favoriteCategory: string | null; // Add this line
  setFavoriteCategory: Dispatch<SetStateAction<string | null>>; // Add this line
}
  
  // Updated RecipeType
  export type RecipeType = {
    idMeal: string;
    strMeal: string;
    strMealThumb?: string;
    strArea?: string;
    strCategory?: string;
    strInstructions?: string;
    strYoutube?: string;
    strIngredient1?: string;

  };
  

  export type CategoryType = {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  };
  