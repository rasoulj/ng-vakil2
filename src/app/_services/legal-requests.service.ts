import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../_config/consts';
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

  editRequest(id: string | undefined, request: Partial<LegalRequest>): Observable<LegalRequest> {

    console.log(`${END_POINT}/${id}`);
    return this.http.put(`${END_POINT}/${id}`, request) as Observable<LegalRequest>;
  }

  deleteOne(id: string | undefined): Observable<any> {
    return this.http.delete(`${END_POINT}/${id}`);
  }

}
