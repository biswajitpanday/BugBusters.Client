import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../routes/PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";
import { AuthRoutes } from "../routes/AuthRoutes";
import { AppRouteUi } from "../config/AppRouteUi";

export function LayoutPublic(): JSX.Element {
    return (
      <div className="site-content">
        <div className="container-fluid m-auto p-0">
          <div className="row gx-0">
            {/* <Nav /> */}
            <main className="site-main-content">
              <Routes>
                <PrivateRoute path={AppRouteUi.Login.Root()} element={<AuthRoutes />} />
                <Route path={AppRouteUi.NotFound.Root()} element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    );
  }
  