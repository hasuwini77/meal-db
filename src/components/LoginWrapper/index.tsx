"use client";

import { useUserContext } from "@/utils/contexts";
import { Login } from "@/components/Login";
import { registeredUsers } from "@/utils/users";

interface LoginWrapperProps {
  setIsValidUser: (isValid: boolean) => void;
  handleLoginAttempt: () => void;
  setUserInput: (input: string) => void;
}

export const LoginWrapper = ({
  setIsValidUser,
  setUserInput,
  handleLoginAttempt,
}: LoginWrapperProps) => {
  const { login, favoriteCategory, setFavoriteCategory } = useUserContext();

  const handleLogin = (userInput: string) => {
    setUserInput(userInput);

    const foundUser = registeredUsers.find(
      (user) => user.name.toLowerCase() === userInput.toLowerCase()
    );
    if (foundUser) {
      // Assume foundUser has favoriteCategory
      const userToLogin = {
        name: foundUser.name,
        savedRecipes: foundUser.savedRecipes || [],
        favoriteCategory: foundUser.favoriteCategory || null,
      };
      login(userToLogin);
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
      console.log("User not found");
    }

    handleLoginAttempt();
  };

  return <Login onLogin={handleLogin} />;
};
