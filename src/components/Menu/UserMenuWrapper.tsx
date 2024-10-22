"use client";

import { useUserContext } from "@/utils/contexts";
import { Menu } from "@/components/Menu";

const UserMenuWrapper = () => {
  const { user } = useUserContext();

  return user ? <Menu /> : null; // Show Menu only if user is logged in
};

export default UserMenuWrapper;
