export interface LegalRequest {
    _id: string | undefined,
    title: string,
    body: string,
    completed: boolean,
    userId: number,
}

export const NEW_REQUEST: LegalRequest = {
    _id: undefined,
    title: '',
    body: '',
    completed: false,
    userId: 0,
}
