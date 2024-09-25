export type UserType = { 
    name: string,
    category: string,
    savedRecipes: string[] 
}

export type UserContextType = { 
    user: UserType | null , 
    setUser: (user:UserType | null) => void 
    login: (userData: UserType) => void;
    logout: () => void;
}