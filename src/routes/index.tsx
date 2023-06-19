import { useUser } from "@/lib/Auth";
import HomePage from "@/pages/HomePage";
import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./ProtectedRoutes";
import { publicRoutes } from "./PublicRoutes";


export const AppRoutes = () => {
    const user = useUser();
    const commonRoutes = [{path: '/', element: <HomePage />}]
    const routes = user.data ? protectedRoutes : publicRoutes;
    const element = useRoutes([...routes, ...commonRoutes]);
    return <>{element}</>;
}