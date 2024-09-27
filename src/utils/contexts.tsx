"use client";
import { createContext, useContext, useState } from "react";
import { UserType, UserContextType } from "./types";

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to use UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

// UserProvider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [favoriteCategory, setFavoriteCategory] = useState<string | null>(null);

  // Login function to set user and favorite category
  const login = (userData: UserType) => {
    setUser(userData);
    setFavoriteCategory(userData.favoriteCategory || null);
  };

  // Logout function to clear user and favorite category
  const logout = () => {
    setUser(null);
    setFavoriteCategory(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        favoriteCategory,
        setFavoriteCategory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
