import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { IGetQuestions, IQuestion, IQuestionBody } from "../models/question.model";
import { BASE_URL } from "../config/consts";

const EP = 'questions';



@Injectable({
    providedIn: 'root'
})
export class QuestionsService {

    constructor(private http: HttpClient) {
    }

    //A simple test for mary

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

    createQuestion(questionBody: IQuestionBody): Observable<string> {
        return (this.http.post(`${BASE_URL}/${EP}`, questionBody) as Observable<{ id: string }>).pipe(
            map((value: { id: string }) => value.id)
        );
    }

}
