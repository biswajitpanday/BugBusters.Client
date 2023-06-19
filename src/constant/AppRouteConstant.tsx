export const AppRouteConstant = {
  Root: () => "/",
  Login: () => `${AppRouteConstant.Root()}login`,
  Registration: () => `${AppRouteConstant.Root()}registration`,
  UserProfile: () => `${AppRouteConstant.Root()}user-profile`,
  QuestionList: () => `${AppRouteConstant.Root()}question-list`,
  AskQuestion: () => `${AppRouteConstant.Root()}ask-question`,
  QuestionDetail: () => `${AppRouteConstant.Root()}question-details`,
  SearchResult: () => `${AppRouteConstant.Root()}search-result`,
};
