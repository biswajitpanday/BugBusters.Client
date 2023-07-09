import { BaseResponse } from "./BaseResponse";

export type VoteResponse = {
    questionId: string;
    answerId: string;
} & BaseResponse;

export type VoteCreateDto = {
    isUpVote: boolean;
    questionId?: string | null;
    answerId?: string | null;
}