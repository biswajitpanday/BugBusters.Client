import { apiLogin, apiRefreshToken, apiRegister } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { AuthResponse, LoginRequestDto, RegistrationRequestDto } from "@/types/AuthTypes";

export const login = async (request: LoginRequestDto): Promise<AuthResponse> => {
    const body = JSON.stringify(request);
    console.log("Login Body: " + body);
    const response = await axios.post(apiLogin, body);
    console.log("Login Response: " + response);
    return response.data;
}

export const register = async (request: RegistrationRequestDto): Promise<AuthResponse> => {
    const body = JSON.stringify(request);
    console.log("Registration Body: " + body);
    const response = await axios.post(apiRegister, body);
    console.log("Registration Response: " + response);
    return response.data;
}

export const refreshToken = async (request: string) => {
    const body = JSON.stringify(request);
    console.log("RefreshToken Body: " + body);
    const response = await axios.post(apiRefreshToken, body);
    console.log("RefreshToken Response: " + response);
    return response.data;
}