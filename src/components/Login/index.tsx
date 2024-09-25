"use client";
import { useState } from "react";
import { registeredUsers } from "@/utils/users";
import { useUserContext } from "@/utils/contexts";
import { UserType } from "@/utils/types";

export const Login = () => {
  const [userInput, setUserInput] = useState<string>("");
  const { login } = useUserContext(); // use login from the context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    const foundUser = registeredUsers.find(
      (user: UserType) => user.name === userInput
    );
    if (foundUser) {
      login(foundUser); // use the login method
    } else {
      console.log("User not found");
    }
  };

  return (
    <div>
      <p>To log in, please enter your user name</p>
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
