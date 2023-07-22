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
  User: {
    Root: () => "user/",
    GetById: () => `${ApiRouteConstant.User.Root()}:id`,
    Profile: () => `${ApiRouteConstant.User.Root()}profile`
  },
  Vote: {
    Root: () => "vote/",
    Create: () => `${ApiRouteConstant.Question.Root()}create`,
  },
  Answer: {
    Root: () => "Answer/",
    Accept: () => `${ApiRouteConstant.Answer.Root()}Accept`,
    Create: () => `${ApiRouteConstant.Answer.Root()}`,
  },
};
