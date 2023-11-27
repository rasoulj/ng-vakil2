import { UserProfile } from "./user-profile.model";

export interface IAnswer {
    text: string,
    date: Date,
    uid: Partial<UserProfile>,
}

export const EMPTY_ANSWER: IAnswer = {
    text: "",
    date: new Date(),
    uid: {},
}

export function persianDate(date: Date | undefined): string {
    return new Date(date ?? new Date()).toLocaleDateString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit'
    }) ?? '-';
}

export interface IQuestion {
    _id?: string,
    userId: Partial<UserProfile>,
    responderId: Partial<UserProfile>,
    expertiseId: number,
    title: string,
    // question: string,
    isPrivate: boolean,
    answers: IAnswer[],
    status: "init" | "answered" | "completed",
    type: "legal" | "ticket" | "tracking",
    createdAt: Date,
}

export const EMPTY_QUESTION: IQuestion = {
    userId: {},
    responderId: {},
    expertiseId: 0,
    title: "",
    isPrivate: false,
    answers: [],
    status: "init",
    type: "legal",
    createdAt: new Date(),
}

export interface IGetQuestions {
    length: number,
    data: IQuestion[]
}


export interface IQuestionBody {
    question: string,
    title: string,
    expertiseId: number,
    responderId: string | undefined,
    isPrivate: boolean,
}