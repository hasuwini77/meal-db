"use client";
import { useState } from "react";

interface LoginProps {
  onLogin: (userInput: string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    onLogin(userInput);
    setUserInput("");
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="user-input">Enter Username</label>
      <input
        type="text"
        id="user-input"
        value={userInput}
        onChange={handleChange}
        className="max-w-[200px] mx-auto text-black p-1"
      />
      <button
        onClick={handleClick}
        className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 min-w-[150px] mt-4 mx-auto rounded-lg shadow-md transition duration-200"
      >
        Login
      </button>
    </div>
  );
};
