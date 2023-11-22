import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IGetQuestions, IQuestion } from "../models/question.model";
import { BASE_URL } from "../config/consts";
import { UserProfile } from "../models/user-profile.model";

const EP = 'questions';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {

    constructor(private http: HttpClient) {
    }

    myQuestions(status: string | undefined, dir: string | undefined): Observable<IGetQuestions> {
        let params = {};
        if (status) params = { ...params, status };
        if (dir) params = { ...params, dir };

        return this.http.get(`${BASE_URL}/${EP}`, { params }) as Observable<IGetQuestions>;
    }

    getQuestion(id: string): Observable<IQuestion> {
        return this.http.get(`${BASE_URL}/${EP}/${id}`) as Observable<IQuestion>;
    }

    sendAnswer(questionId: string, text: string | undefined | null, completed?: boolean): Observable<any> {
        return this.http.put(`${BASE_URL}${EP}/${questionId}`, { text: !text ? undefined : text, status: completed ? 'completed' : undefined })
    }

}
