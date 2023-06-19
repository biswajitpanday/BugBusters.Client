import { BaseResponse } from "./BaseResponse";

export type VoteResponse = {
    questionId: string;
    answerId: string;
} & BaseResponse;