import { useUser } from "@/lib/Auth";
import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./ProtectedRoutes";
import { publicRoutes } from "./PublicRoutes";
import { Landing } from "@/features/misc";
import { AppRouteConstant } from "@/constant";

export const AppRoutes = () => {
  const user = useUser();
  const commonRoutes = [
    { path: AppRouteConstant.Root(), element: <Landing /> },
  ];
  const routes = user.data ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);
  return <>{element}</>;
};
