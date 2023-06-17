import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { AuthResponse, LoginDto, RegistrationDto } from "@/types";

export const login = async (request: LoginDto): Promise<AuthResponse> => {
  const body = JSON.stringify(request);
  return await axios.post(ApiRouteConstant.Auth.Login(), body);
};

export const register = async (
  request: RegistrationDto
): Promise<AuthResponse> => {
  const body = JSON.stringify(request);
  return await axios.post(ApiRouteConstant.Auth.UserRegister(), body);
};

export const refreshToken = async (request: string) => {
  const body = JSON.stringify(request);
  return await axios.post(ApiRouteConstant.Auth.RefreshToken(), body);
};
