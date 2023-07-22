import { BaseResponse } from "./BaseResponse";
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

export type AuthResponseDto = {
    token: string;
    isActivated: boolean;
    role: keyof typeof Roles,
    profileData: UserProfile;
};

export type TokenDto = {
    exp: string;
    iss: string;
    aud: string;
    jti: string;
}

export type UserProfile = {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    fullName?: string | undefined;
    userName: string;
    email: string;
    address?: string;
    dateOfBirth?: Date;
    phoneNumber?: string;
    role: keyof typeof Roles;
} & BaseResponse;

export type ProfileStatistic = {
    questionAsked: number;
    answered: number;
    upVoteCount: number;
    downVoteCount: number;
}