import { apiLogin, apiRefreshToken, apiRegister } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { AuthResponse, LoginDto, RegistrationDto } from "@/types";

export const login = async (request: LoginDto): Promise<AuthResponse> => {
  const body = JSON.stringify(request);
  return await axios.post(apiLogin, body);
};

export const register = async (
  request: RegistrationDto
): Promise<AuthResponse> => {
  const body = JSON.stringify(request);
  return await axios.post(apiRegister, body);
};

export const refreshToken = async (request: string) => {
  const body = JSON.stringify(request);
  return await axios.post(apiRefreshToken, body);
};
