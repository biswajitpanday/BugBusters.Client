import { API_URL } from "@/config";

// #region Auth
export const apiRegister = API_URL + "auth/register";
export const apiLogin = API_URL + "auth/login";
export const apiRefreshToken = API_URL + "auth/refreshToken";

// #endregion

// #region Question
export const apiQuestionGet = API_URL + "question";
export const apiQuestionGetById = API_URL + "question/:id";
export const apiQuestionCreate = API_URL + "question/create";

// #endregion

export const ApiRouteConstant = {
  Auth: {
    Root: () => "auth/",
    Login: () => `${ApiRouteConstant.Auth.Root()}login`,
    RefreshToken: () => `${ApiRouteConstant.Auth.Root()}refresh-token`,
    UserRegister: () => `${ApiRouteConstant.Auth.Root()}register`,
    AdminRegister: () => `${ApiRouteConstant.Auth.Root()}register-admin`,
  },
  Question: {
    Root: () => "question/",
    GetById: () => `${ApiRouteConstant.Question.Root()}:id`,
    Create: () => `${ApiRouteConstant.Question.Root()}create`,
  },
};
