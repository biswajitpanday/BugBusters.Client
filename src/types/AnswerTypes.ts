import { UserProfile } from "./AuthTypes";
import { BaseResponse } from "./BaseResponse";

export type AnswerResponse = {
    title: string;
    body: string;
    upVoteCount: number;
    isAccepted: boolean;
    createdById: string;
    createdBy: UserProfile;
    downVoteCount: number;
} & BaseResponse;