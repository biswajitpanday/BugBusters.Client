import { AppRouteConstant } from "@/constant";
import { lazyImport } from "@/utils/LazyImportUtil";

const {AuthRoutes} = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

export const publicRoutes = [
  {
    path: `${AppRouteConstant.AuthRoot()}*`,
    element: <AuthRoutes />,
  },
];
