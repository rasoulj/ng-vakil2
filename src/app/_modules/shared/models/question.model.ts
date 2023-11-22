export interface IAnswer {
    text: string,
    date: Date,
    uid: string,
}

export interface IQuestion {
    _id?: string,
    userId: string,
    responderId: string,
    expertiseId: number,
    title: string,
    question: string,
    isPrivate: boolean,
    answers: IAnswer[],
    status: "init" | "answered" | "completed",
    type: "legal" | "ticket" | "tracking",
}

export const EMPTY_QUESTION: IQuestion = {
    userId: "",
    responderId: "",
    expertiseId: 0,
    title: "",
    question: "",
    isPrivate: false,
    answers: [],
    status: "init",
    type: "legal"
}

export interface IGetQuestions {
    length: number,
    data: IQuestion[]
}
