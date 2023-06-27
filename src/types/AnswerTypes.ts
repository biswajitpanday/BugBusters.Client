import { BaseResponse } from "./BaseResponse";

export type AnswerResponse = {
    title: string;
    body: string;
    upVoteCount: number;
    downVoteCount: number;
} & BaseResponse;