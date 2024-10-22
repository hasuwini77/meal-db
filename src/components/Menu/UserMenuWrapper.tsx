// components/UserMenuWrapper.tsx

"use client";

import { useUserContext } from "@/utils/contexts";
import { Menu } from "@/components/Menu";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation

const UserMenuWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  const pathname = usePathname(); // Get the current pathname

  // Check if the current pathname includes 'recipe' to apply different styles
  const isRecipePage = pathname.includes("/recipe/");

  return (
    <div className="p-2">
      {/* Only show Menu if the user is logged in */}
      {user && (
        <div
          className={`${
            isRecipePage ? "bg-white shadow-md p-6" : ""
          } rounded-lg shadow`}
        >
          <Menu />
        </div>
      )}
      {children}
    </div>
  );
};

export default UserMenuWrapper;
