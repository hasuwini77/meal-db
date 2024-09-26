// LoginWrapper.tsx
"use client"; // If your page component uses client-side features

import { useState } from "react";
import { useUserContext } from "@/utils/contexts";
import { Login } from "@/components/Login";
import { registeredUsers } from "@/utils/users";

interface LoginWrapperProps {
  setIsValidUser: (isValid: boolean) => void;
  setUserInput: (input: string) => void; // New prop for setting userInput
}

export const LoginWrapper = ({
  setIsValidUser,
  setUserInput,
}: LoginWrapperProps) => {
  const { login } = useUserContext(); // use login from the context

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
