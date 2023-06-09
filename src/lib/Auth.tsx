import { configureAuth } from 'react-query-auth';
import { LoginRequestDto, RegistrationRequestDto } from "@/types/AuthTypes";
import storage from '@/utils/storage';

async function loadUser() {
    return null;
}

async function loginFn(data: LoginRequestDto) {
    return null;
}

async function logoutFn() {
    storage.clearToken();
    window.location.assign(window.location.origin as unknown as string);
}

async function registerFn(data: RegistrationRequestDto) {
    return null;
}

export const {useUser, useLogin, useRegister, useLogout, AuthLoader} = configureAuth({
    userFn: async () => await loadUser(),
    loginFn: async (data: LoginRequestDto) => await loginFn(data),
    logoutFn: () => logoutFn(),
    registerFn: async (data: RegistrationRequestDto) => registerFn(data)
})