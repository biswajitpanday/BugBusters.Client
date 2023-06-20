export const AppRouteConstant = {
  Root: () => "/app/",
  AuthRoot: () => "/auth/",
  
  Login: () => `${AppRouteConstant.AuthRoot()}login`,
  Registration: () => `${AppRouteConstant.AuthRoot()}signup`,

  UserProfile: () => `${AppRouteConstant.Root()}profile`,
  Questions: () => `${AppRouteConstant.Root()}questions`,
  AskQuestion: () => `${AppRouteConstant.Root()}ask-question`,
  QuestionDetail: () => `${AppRouteConstant.Root()}question-details`,
  SearchResult: () => `${AppRouteConstant.Root()}search-result`,
};
