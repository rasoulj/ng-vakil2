import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../config/consts';
import { Observable } from 'rxjs';
import { FavoriteLawyer } from '../profile/models/favorite-lawyers.model';

const END_POINT = `${BASE_URL}favorite-lawyers`;

@Injectable({
  providedIn: 'root'
})
export class FavoriteLawyersService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<FavoriteLawyer[]> {
    return this.http.get(END_POINT) as Observable<FavoriteLawyer[]>;
  }
}
