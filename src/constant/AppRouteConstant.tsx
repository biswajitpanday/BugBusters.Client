export const AppRouteConstant = {
  Root: () => "/",

  Login: () => `${AppRouteConstant.Root()}login`,
  Registration: () => `${AppRouteConstant.Root()}signup`,
  UserProfile: () => `${AppRouteConstant.Root()}profile`,
  Users: () => `${AppRouteConstant.Root()}users`,
  Settings: () => `${AppRouteConstant.Root()}settings`,
  Questions: () => `${AppRouteConstant.Root()}questions`,
  AskQuestion: () => `${AppRouteConstant.Root()}ask-question`,
  QuestionDetail: () => `${AppRouteConstant.Root()}question-details`,
  SearchResult: () => `${AppRouteConstant.Root()}search-result`,
};
