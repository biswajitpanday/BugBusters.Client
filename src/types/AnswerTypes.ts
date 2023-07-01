import { BaseResponse } from "./BaseResponse";

export type AnswerResponse = {
    title: string;
    body: string;
    upVoteCount: number;
    isAccepted: boolean;
    userId: string;
    downVoteCount: number;
} & BaseResponse;