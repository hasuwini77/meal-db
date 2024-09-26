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
  const { login } = useUserContext();

  const handleLogin = (userInput: string) => {
    setUserInput(userInput);

    const foundUser = registeredUsers.find(
      (user) => user.name.toLowerCase() === userInput.toLowerCase()
    );
    if (foundUser) {
      login(foundUser); // Use the login method to set the user in context
      setIsValidUser(true); // Set valid user state
    } else {
      setIsValidUser(false); // Set invalid user state
      console.log("User not found");
    }

    handleLoginAttempt();
  };

  return <Login onLogin={handleLogin} />;
};
