import { Route, Routes } from "react-router-dom";
import { AppRouteUi } from "../config/AppRouteUi";
import { AuthRoutes } from "../routes/AuthRoutes";
import NotFoundPage from "../pages/NotFoundPage";

export function LayoutPublic(): JSX.Element {
  return (
    <div className="">
      <div className="container-fluid m-auto">
        <div className="row">
          <main className="">
            <Routes>
              <Route path={AppRouteUi.Login.Root()} element={<AuthRoutes />} />
              <Route path={AppRouteUi.NotFound.Root()} element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
