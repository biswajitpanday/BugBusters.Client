import { AnswerResponse, BaseResponse } from ".";

export type QuestionResponse = {
    title: string;
    body: string;
    answers: AnswerResponse;
} & BaseResponse;

export type QuestionCreateDto = {
    title: string;
    body: string;
}