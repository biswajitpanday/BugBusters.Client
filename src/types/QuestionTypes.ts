import { Answer } from ".";

export type QuestionResponse = {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
    lastUpdated: Date;
    answers: Answer;
}

export type QuestionCreateDto = {
    title: string;
    body: string;
}