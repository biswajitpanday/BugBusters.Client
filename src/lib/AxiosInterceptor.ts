import { API_URL } from "@/config";
import storage from "@/utils/storage";
import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

function axiosInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers!.Authorization = `${token}`;
  }
  config.headers!.Accept = "application/json";
  return config;
}

export const axios = Axios.create({ baseURL: `${API_URL}/api` });
axios.interceptors.request.use(axiosInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(message);
    // @todo: Show Error Notification/Alert/Toastr
    return Promise.reject(error);
  }
);

// @todo: Need to verify and check. Not Tested....!!!
// Token Get from server, set localy all should be fixed....!!!
// @Warning: this code is just a concept for future use.
// Get Hint from : https://stackoverflow.com/questions/76160628/axios-interceptor-on-request-does-not-wait-for-await-function-calls-to-be-finish
let refreshTokenPromise;
async function axiosConfigWithRefreshTokenAndExpiry(
  config: AxiosRequestConfig
) {
  const token = storage.getToken();
  if (!token) {
    console.warn("No Token");
    return config;
  }

  //const expiration = storage.get("expiration");
  const isValidToken = Date.now() <= (token.expiration ?? Date.now());
  if (isValidToken) {
    console.log("Token is Valid.");
    config.headers!.Authorization = token;
    return config;
  }

  const refreshToken = storage.get("refreshToken");
  if (!refreshToken) {
    console.warn("No refresh token");
    return config;
  }

  refreshTokenPromise ??= getRefreshedToken(refreshToken);
  const newTokens = await refreshTokenPromise;
  refreshTokenPromise = null;
  storage.set("refreshToken", newTokens);
  config.headers!.Authorization = token.access_token;

  return config;
}

const getRefreshedToken = async (token: string) => {
  console.log("Refresh Token");
  //return (await axios.get("/auth/refreshToken", {params: {token}})).data.data.data;

  // mock data instead
  return delay({
    access_token: "new_access_token",
    expires_in: new Date(Date.now() + 3600000), // +1 hour
    refresh_token: "new_refresh_token",
  });
};

const delay = (
  v: {
    access_token: string;
    expires_in: Date; // +1 hour
    refresh_token: string;
  },
  d = 2000
) => new Promise((r) => setTimeout(r, d, v));
