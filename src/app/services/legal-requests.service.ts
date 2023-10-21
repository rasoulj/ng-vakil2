import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../config/consts';
import { Observable } from 'rxjs';
import { LegalRequest } from "../profile/models/legal-requests.model"

const END_POINT = `${BASE_URL}legal-requests`;

@Injectable({
  providedIn: 'root'
})
export class LegalRequestsService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<LegalRequest[]> {
    return this.http.get(END_POINT) as Observable<LegalRequest[]>;
  }

  addNew(request: LegalRequest): Observable<LegalRequest> {
    return this.http.post(END_POINT, request) as Observable<LegalRequest>;
  }
}
