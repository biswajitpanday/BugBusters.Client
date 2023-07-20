import { AnswerResponse, BaseResponse, UserProfile } from ".";

export type QuestionResponse = {
    title: string;
    body: string;
    upVoteCount: number;
    downVoteCount: number;
    answerCount: number;
    createdById: string;
    createdBy: UserProfile;
    answers: AnswerResponse[];
    hasAcceptedAnswer: boolean;
} & BaseResponse;

export type QuestionCreateDto = {
    title: string;
    body: string;
}