import { useCallback } from "react";
import { useUser } from "./Auth";
import { Roles } from "@/types";
import { Forbidden } from "@/features/misc";

type RoleTypes = keyof typeof Roles;

const useAuthorization = () => {
  const user = useUser().data;
  if (!user) {
    throw Error("User does not exist");
  }
  const checkAccess = useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.role);
      }
      return true;
    },
    [user.role]
  );
  return { checkAccess, role: user.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

// export const POLICIES = {
//   'comment:delete': (user: UserProfile, comment: Comment) => {
//     if (user.role === Roles.Admin) {
//       return true;
//     }
//     if (user.role === 'USER' && comment.authorId === user.id) {
//       return true;
//     }
//     return false;
//   },
// };

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = <Forbidden />,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();
  let canAccess = false;
  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }
  // if (typeof policyCheck !== "undefined") {
  //   canAccess = policyCheck;
  // }
  return <>{canAccess ? children : forbiddenFallback}</>;
};
