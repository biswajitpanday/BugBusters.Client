import { API_URL } from "@/config";

export const ApiRouteConstant = {
  Auth: {
    Root: () => `${API_URL}auth/`,
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
