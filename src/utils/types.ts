export type UserType = { 
    name: string;
    category: string;
    savedRecipes: string[];
};

export type UserContextType = { 
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    login: (userData: UserType) => void;
    logout: () => void;
};

export type RecipeType = {
    idMeal: string;
    strMeal: string;
    strMealThumb?: string;
    strArea?: string;
    strCategory?: string;
    strInstructions?: string;
    strYoutube?: string;
    strIngredient1?: string;
    // Add other fields as needed
  };
  

// New type for categories
export type CategoryType = {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
};
