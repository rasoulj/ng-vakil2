import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../shared/config/consts';
import { Observable } from 'rxjs';
import { Question } from './question.model';

const END_POINT = `${BASE_URL}my-questions`;

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Question[]> {
    return this.http.get(END_POINT) as Observable<Question[]>;
  }
}
