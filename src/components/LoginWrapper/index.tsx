"use client";
import { useUserContext } from "@/utils/contexts";
import { Login } from "@/components/Login";
import { Menu } from "@/components/Menu";

export const LoginWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();

  if (!user) {
    return (
      <>
        <p>We did not find any username with this value. Please try again</p>
        <Login />
      </>
    );
  }

  return (
    <div>
      <Menu />
      <p>Hi {user.name}</p>
      {children}
    </div>
  );
};
