"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { UserType, UserContextType } from "./types";

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provide a hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [favoriteCategory, setFavoriteCategory] = useState<string | null>(null); // Start with null

  // Update favoriteCategory when user changes
  useEffect(() => {
    if (user) {
      setFavoriteCategory(user.category); // Set to user's category when user logs in
    }
  }, [user]);

  const login = (userData: UserType) => {
    setUser(userData);
    setFavoriteCategory(userData.category); // Set favorite category on login
  };

  const logout = () => {
    setUser(null);
    setFavoriteCategory(null); // Clear favorite category on logout
    window.location.href = "/";
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
