import { configureAuth } from 'react-query-auth';
import { AuthResponse, LoginRequestDto, RegistrationRequestDto } from "@/types/AuthTypes";
import storage from '@/utils/storage';
import { login, register } from '@/apis/AuthApi';

function loadUser() {
    if(storage.getToken()) {
        const userProfile = storage.getUserProfile();
        return userProfile;
    }
    return null;
}

async function loginFn(data: LoginRequestDto) {
    const response = await login(data);
    const user = await handleResponse(response);
    return user;
}

async function logoutFn() {
    storage.clearStorage();
    window.location.assign(window.location.origin as unknown as string);
}

async function registerFn(data: RegistrationRequestDto) {
    const response = await register(data);
    const user = await handleResponse(response);
    return user;
}

async function handleResponse(data: AuthResponse) {
    const {token, expiration, isActivated, profile} = data;
    if(!isActivated) {
        storage.clearStorage();
        return null;
    }
    storage.setToken(token);
    storage.set('expiration', JSON.stringify(expiration));
    storage.setUserProfile(JSON.stringify(profile));
    return profile;
}

export const {useUser, useLogin, useRegister, useLogout, AuthLoader} = configureAuth({
    userFn: async () => await loadUser(),
    loginFn: async (data: LoginRequestDto) => await loginFn(data),
    logoutFn: () => logoutFn(),
    registerFn: async (data: RegistrationRequestDto) => registerFn(data)
})