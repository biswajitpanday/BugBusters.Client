export const AppRouteConstant = {
  Root: () => "/",

  AppRoot: () => `${AppRouteConstant.Root()}app`,
  AuthRoot: () => `${AppRouteConstant.Root()}auth/`,

  Login: () => `${AppRouteConstant.AuthRoot()}login`,
  Registration: () => `${AppRouteConstant.AuthRoot()}signup`,

  UserProfile: () => `${AppRouteConstant.AppRoot()}/profile`,
  Users: () => `${AppRouteConstant.AppRoot()}/users`,
  Settings: () => `${AppRouteConstant.AppRoot()}/settings`,
  Questions: () => `${AppRouteConstant.AppRoot()}/questions`,
  AskQuestion: () => `${AppRouteConstant.AppRoot()}/ask-question`,
  QuestionDetail: () => `${AppRouteConstant.AppRoot()}/question-details`,
  SearchResult: () => `${AppRouteConstant.AppRoot()}/search-result`,
};
