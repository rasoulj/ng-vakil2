import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../shared/config/consts';
import { Observable } from 'rxjs';
import { Call } from './call.model';

const END_POINT = `${BASE_URL}my-calls`;

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Call[]> {
    return this.http.get(END_POINT) as Observable<Call[]>;
  }
}
