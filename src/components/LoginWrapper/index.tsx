"use client";

import { useUserContext } from "@/utils/contexts";
import { Login } from "@/components/Login";
import { registeredUsers } from "@/utils/users";

interface LoginWrapperProps {
  setIsValidUser: (isValid: boolean) => void;
  setUserInput: (input: string) => void;
}

export const LoginWrapper = ({
  setIsValidUser,
  setUserInput,
}: LoginWrapperProps) => {
  const { login } = useUserContext();

  const handleLogin = (userInput: string) => {
    const foundUser = registeredUsers.find((user) => user.name === userInput);
    if (foundUser) {
      login(foundUser); // use the login method
      setIsValidUser(true); // Set valid user state
    } else {
      setUserInput(userInput); // Update userInput if user is not found
      setIsValidUser(false); // Set invalid user state
      console.log("User not found");
    }
  };

  return <Login onLogin={handleLogin} />;
};
