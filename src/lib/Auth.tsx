import { configureAuth } from "react-query-auth";
import {
  AuthResponse,
  LoginDto,
  RegistrationDto,
  TokenDto,
  UserProfile,
} from "@/types/AuthTypes";
import storage from "@/utils/storage";
import { login, register } from "@/apis/AuthApi";
import { queryClient } from "./ReactQuery";
import jwtDecode from "jwt-decode";
import { StorageConstant } from "@/constant";

function loadUser(): UserProfile | null {
  if (storage.getToken()) {
    const userProfile = storage.getUserProfile() as UserProfile;
    return userProfile;
  }
  return null;
}

async function loginFn(data: LoginDto) {
  const response = await login(data);
  const user = await handleResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearStorage();
  queryClient.setQueryData(["authenticated-user"], null);
  window.location.assign(window.location.origin as unknown as string);
}

async function registerFn(data: RegistrationDto) {
  const response = await register(data);
  const user = await handleResponse(response);
  return user;
}

async function handleResponse(data: AuthResponse) {
  const { token, isActivated, profile, role } = data;
  if (!isActivated) {
    storage.clearStorage();
    return null;
  }
  const { exp } = jwtDecode<TokenDto>(token);
  profile.role = role;
  storage.setToken(token);
  storage.set(StorageConstant.TokenExpiration(), JSON.stringify(exp));
  storage.setUserProfile(JSON.stringify(profile));
  queryClient.setQueryData(["authenticated-user"], data);
  return profile;
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn: () => loadUser(),
    loginFn: async (data: LoginDto) => await loginFn(data),
    logoutFn: () => logoutFn(),
    registerFn: async (data: RegistrationDto) => registerFn(data),
  });
