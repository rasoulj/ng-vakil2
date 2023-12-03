import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jalali } from 'jalali-ts';
import { Observable, map, min, of } from 'rxjs';
import { ISearchCalls } from '../models/calls.model';
import { BASE_URL } from '../config/consts';

function getDayBounds(date: Jalali): string[] {
  const jd = date.clone();
  jd.setHours(0);
  jd.setMinutes(0);
  jd.setSeconds(0);

  const minDate = jd.date.toISOString();

  jd.setHours(23);
  jd.setMinutes(59);
  jd.setSeconds(59);

  const maxDate = jd.date.toISOString();
  return [minDate, maxDate];
}

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  constructor(
    private http: HttpClient,
  ) { }

  // getUserCalls(date: Jalali): Observable<ISearchCalls> {
  //   const [minDate, maxDate] = getDayBounds(date);

  //   return this.http.get(`${BASE_URL}/calls`, {
  //     params: { minDate, maxDate }
  //   }) as Observable<ISearchCalls>;
  // }

  // getLawyerCalls(uid: string, date: Jalali): Observable<ISearchCalls> {
  //   const [minDate, maxDate] = getDayBounds(date);

  //   return this.http.get(`${BASE_URL}/calls/lawyer/${uid}`, {
  //     params: { minDate, maxDate }
  //   }) as Observable<ISearchCalls>;
  // }

  createCall(responderId: string, timeSlot: number, date: Date, expertiseId: number): Observable<string> {
    return (this.http.post(`${BASE_URL}/calls`, {
      responderId,
      timeSlot,
      expertiseId,
      date: date?.toISOString(),
    }) as Observable<{ _id: string }>).pipe(
      map(t => t._id)
    );
  }


  deleteCall(id?: string): Observable<any> {
    if (!id) {
      return of();
    }
    return this.http.delete(`${BASE_URL}/calls/${id}`)
  }
}
