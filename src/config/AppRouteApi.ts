import config from "./EnvConfig";
import { PagedRequestParam } from "../models/api/PagedRequest";

const RootApi = config.BASE_URL || "";

export const AppRouteApi = {
  Root: RootApi,
  Auth: {
    Root: () => `${RootApi}/Auth`,
    Login: () => `${AppRouteApi.Auth.Root}/Login`,
    Logout: () => `${AppRouteApi.Auth.Root}/Logout`,
    ForgotPassword: (email: string) =>
      `${AppRouteApi.Auth.Root}/ForgotPassword?email=${email}`,
    ChangePassword: () => `${AppRouteApi.Auth.Root}/ChangePassword`,
    ActivateUser: () => `${AppRouteApi.Auth.Root}/ActivateUser`,
  },
  Profile: {
    Root: () => `${RootApi}/Profile`,
  },
  Question: {
    Root: () => `${RootApi}/Question`,
    Paginated: (pageData: PagedRequestParam) => {
      const params = [];
      if (pageData.searchKey) params.push(`SearchKey=${pageData.searchKey}`);
      if (pageData.pageNumber) params.push(`PageNumber=${pageData.pageNumber}`);
      if (pageData.pageSize) params.push(`PageSize=${pageData.pageSize}`);

      return `${AppRouteApi.Question.Root()}/Paginated${
        params.length > 0 ? "?" + params.join("&") : ""
      }`;
    },
    ById: (id: string) => `${AppRouteApi.Question.Root()}/${id}`,
    Delete: (id: string) => `${AppRouteApi.Question.Root()}?id=${id}`,
  },
};


