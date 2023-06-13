import { apiLogin, apiRefreshToken, apiRegister } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import {
  AuthResponse,
  LoginRequestDto,
  RegistrationRequestDto,
} from "@/types/AuthTypes";

export const login = async (
  request: LoginRequestDto
): Promise<AuthResponse> => {
  const body = JSON.stringify(request);
  return await axios.post(apiLogin, body);
};

export const register = async (
  request: RegistrationRequestDto
): Promise<AuthResponse> => {
  const body = JSON.stringify(request);
  return await axios.post(apiRegister, body);
};

export const refreshToken = async (request: string) => {
  const body = JSON.stringify(request);
  return await axios.post(apiRefreshToken, body);
};
