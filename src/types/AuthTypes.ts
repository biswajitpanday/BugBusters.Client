import { Roles } from "./RoleTypes";

export type LoginDto = {
    email: string;
    password: string;
};

export type RegistrationDto = {
    email: string;
    password: string;
    userName: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    address?: string;
    phone: string;
};

export type AuthResponse = {
    token: string;
    isActivated: boolean;
    role: keyof typeof Roles,
    profile: UserProfile;
};

export type TokenDto = {
    exp: string;
    iss: string;
    aud: string;
    jti: string;
}

export type UserProfile = {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    phone: string;
    address: string;
    accountId: string;
    role: keyof typeof Roles;
};