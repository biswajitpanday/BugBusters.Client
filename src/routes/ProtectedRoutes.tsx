import { Spinner } from "@/components/elements/spinner";
import { MainLayout } from "@/components/layout";
import { AppRouteConstant } from "@/constant";
import { PageNotFound } from "@/features/misc";
import { lazyImport } from "@/utils/LazyImportUtil";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const { QuestionRoutes } = lazyImport(() => import('@/features/question'), 'QuestionRoutes');
const { UserRoutes } = lazyImport(() => import('@/features/users'), 'UserRoutes');

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
      { path: AppRouteConstant.Root(), element: <QuestionRoutes /> }, 
      { path: `${AppRouteConstant.Questions()}/*`, element: <QuestionRoutes /> },
      { path: `${AppRouteConstant.Users()}/*`, element: <UserRoutes /> },
      // { path: "/profile", element: <Profile /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
];
