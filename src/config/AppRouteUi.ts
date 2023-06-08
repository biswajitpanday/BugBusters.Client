import { AppUserRoles } from "./constants";

export const AppRouteUi = {
  Root: "",
  Login: {
    Root: () => `${AppRouteUi.Root}/login`,
    ForgotPassword: () => `${AppRouteUi.Login.Root()}/forgot-password`,
    ResetPassword: () => `${AppRouteUi.Login.Root()}/Reset-password`,
  },
  Question: {
    Root: () => `${AppRouteUi.Root}/question`,
    List: () => `${AppRouteUi.Question.Root()}`,
    ById: () => `${AppRouteUi.Question.Root()}/:questionId`,
    Create: () => `${AppRouteUi.Question.Root()}/Create`,
    Update: () => `${AppRouteUi.Question.Root()}/update/:questionId`,
    UpdateById: (id: string) => `${AppRouteUi.Question.Root()}/update/${id}`,
  },
  User: {
    Root: () => `${AppRouteUi.Root}/user`,
    List: () => `${AppRouteUi.User.Root()}/list`,
    ById: () => `${AppRouteUi.User.Root()}/:userId`,
    Update: () => `${AppRouteUi.User.Root()}/update/:userId`,
    UpdateById: (userId: string) =>
      `${AppRouteUi.User.Root()}/update/${userId}`,
  },

  Dashboard: {
    Root: () => `${AppRouteUi.Root}/dashboard`,
  },
  PrivacyPolicy: {
    Root: () => `${AppRouteUi.Root}/privacy`,
  },
  NotFound: {
    Root: () => `${AppRouteUi.Root}/404`,
  },
  GetRouteByRole: (role: AppUserRoles): string =>
    role === AppUserRoles.Admin
      ? AppRouteUi.Dashboard.Root()
      : role === AppUserRoles.User
      ? AppRouteUi.Question.List()
      : AppRouteUi.NotFound.Root(),
};
