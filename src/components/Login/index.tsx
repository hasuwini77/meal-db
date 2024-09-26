// Login.tsx
"use client";
import { useState } from "react";

interface LoginProps {
  onLogin: (userInput: string) => void; // Change this prop
}

export const Login = ({ onLogin }: LoginProps) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    onLogin(userInput); // Call onLogin with userInput
    setUserInput(""); // Reset input field
  };

  return (
    <div>
      <label htmlFor="user-input">Enter User Name</label>
      <input
        type="text"
        id="user-input"
        value={userInput}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Login</button>
    </div>
  );
};
