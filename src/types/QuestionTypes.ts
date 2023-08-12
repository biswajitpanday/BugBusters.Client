import { AnswerResponse, BaseResponse, PagedResponse, UserProfile } from ".";

export type QuestionResponse = {
    title: string;
    body: string;
    upVoteCount: number;
    downVoteCount: number;
    answerCount: number;
    createdById: string;
    createdBy: UserProfile;
    pagedAnswers: PagedResponse<AnswerResponse[]>;
    hasAcceptedAnswer: boolean;
} & BaseResponse;

export type QuestionCreateDto = {
    title: string;
    body: string;
}