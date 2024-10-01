"use client";
import { createContext, useContext, useState } from "react";
import { UserType, UserContextType } from "./types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [favoriteCategory, setFavoriteCategory] = useState<string | null>(null);

  const login = (userData: UserType) => {
    setUser(userData);
    setFavoriteCategory(userData.favoriteCategory || null);
  };

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
