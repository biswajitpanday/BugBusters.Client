import { UserProfile } from "./AuthTypes";
import { BaseResponse } from "./BaseResponse";
import { QuestionResponse } from "./QuestionTypes";

export type UserResponse = {
    userName?: string;
    emailConfirmed: boolean;
    lockoutEnabled: boolean;
    accountId: string;
    address?: string;
    questions?: QuestionResponse[]
} & BaseResponse & UserProfile; 