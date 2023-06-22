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
    path: AppRouteConstant.Root(),
    element: <ProtectedApp />,
    children: [
      { path: `${AppRouteConstant.Questions()}/*`, element: <QuestionRoutes /> },
      // { path: "/users", element: <Users /> },
      // { path: "/profile", element: <Profile /> },
      // { path: AppRouteConstant.Root(), element: <QuestionRoutes /> },
      // { path: "*", element: <Navigate to="." /> },
    ],
  },
];
