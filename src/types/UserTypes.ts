import { UserProfile } from "./AuthTypes";
import { BaseResponse } from "./BaseResponse";

export type UserResponse = {
    userName?: string;
    emailConfirmed: boolean;
    lockoutEnabled: boolean;
    accountId: string;
    address?: string;
} & BaseResponse & UserProfile; 