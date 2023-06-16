import { Roles } from "./RoleTypes";

export type AuthUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'USER';
};

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
    profile: UserProfile;
};

export type TokenDto = {
    exp: string;
    role: keyof typeof Roles
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