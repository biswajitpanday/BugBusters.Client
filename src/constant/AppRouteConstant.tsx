export const AppRouteConstant = {
  Root: () => "/",

  Login: () => `${AppRouteConstant.Root()}login`,
  Registration: () => `${AppRouteConstant.Root()}signup`,
  UserProfile: () => `${AppRouteConstant.Root()}profile`,
  UserProfileUpdate: () => `${AppRouteConstant.UserProfile()}/update`,
  Users: () => `${AppRouteConstant.Root()}users`,
  Settings: () => `${AppRouteConstant.Root()}settings`,
  Questions: () => `${AppRouteConstant.Root()}questions`,
  AskQuestion: () => `${AppRouteConstant.Questions()}/ask-question`,
  JiraWorld: () => `${AppRouteConstant.Root()}/jira-world`,
  SearchResult: () => `${AppRouteConstant.Root()}search-result`,
};
