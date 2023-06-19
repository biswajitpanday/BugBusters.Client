import { useCallback } from "react";
import { useUser } from "./Auth";
import { Roles } from "@/types";


const useAuthorization = () => {
  const user = useUser().data;
  if (!user) {
    throw Error("User does not exist");
  }
  
  type RoleTypes = keyof typeof Roles;
  const checkAccess = useCallback(({ allowedRoles } : { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.role);
      }
      return true;
    }, [user.role]
  );
  return { checkAccess, role: user.role };
};
