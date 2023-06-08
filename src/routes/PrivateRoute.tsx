import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { AppRouteUi } from "../config/AppRouteUi";
import { AppUserRoles } from '../config/constants';


type Props = RouteProps & {
    role?: AppUserRoles | AppUserRoles[];
  };

const FallBack = () => <Navigate to={AppRouteUi.NotFound.Root()}/>;

export function PrivateRoute({role, ...routeProps}: Props): JSX.Element {
    //const userRole = useAppSelector((state) => state.auth.userRole); // Todo: Get UserRole from store or something like this
    const userRole = AppUserRoles.Admin;

    const isRoleMatch = React.useMemo(() => {
        if (!userRole) return true;
        if (Array.isArray(role)) {
            return role.includes(userRole);
          } else {
            return role === userRole;
          }
    }, [role, userRole]);
    return (
        <Route {...routeProps} element={isRoleMatch ? routeProps.element : <FallBack />}  />
    );
}