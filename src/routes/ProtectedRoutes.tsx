import { Spinner } from "@/components/elements/spinner";
import { MainLayout } from "@/components/layout";
import { AppRouteConstant } from "@/constant";
import { lazyImport } from "@/utils/LazyImportUtil";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const { QuestionRoutes } = lazyImport(() => import('@/features/question'), 'QuestionRoutes');

const ProtectedApp = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Spinner size={100} />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};


export const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedApp />,
    children: [
      { path: AppRouteConstant.QuestionList(), element: <QuestionRoutes /> },
    //   { path: "/users", element: <Users /> },
    //   { path: "/profile", element: <Profile /> },
    //   { path: "/", element: <Dashboard /> },
    //   { path: "*", element: <Navigate to="." /> },
    ],
  },
];
