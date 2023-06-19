import { lazyImport } from "@/utils/LazyImportUtil";

const {AuthRoutes} = lazyImport(() => import('@/features/auth'), 'AuthRoutes');
export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
