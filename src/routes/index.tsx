//import { useUser } from "@/lib/Auth";
import HomePage from "@/pages/HomePage";
import { useRoutes } from "react-router-dom";


export const AppRoutes = () => {
    //const user = useUser();

    const commonRoutes = [{path: '/', element: <HomePage />}]
    //const routes = user ? protectedRoutes : publicRoutes;
    //const element = useRoutes([...routes, ...commonRoutes]);
    const element = useRoutes([...commonRoutes]);
    return <>{element}</>;
}