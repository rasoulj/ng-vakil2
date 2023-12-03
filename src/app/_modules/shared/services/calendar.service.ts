import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jalali } from 'jalali-ts';
import { BASE_URL } from '../config/consts';
import { Observable, map, tap } from 'rxjs';
import { IHoliday, ISearchHoliday } from '../models/holiday.model';
import { ICalls } from '../models/calls.model';

export interface IHolidayCalls {
  holidays: IHoliday[],
  calls: ICalls[],
};

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient,
  ) { }

  loadHolidays(date: Jalali): Observable<IHoliday[]> {
    const jd = date.clone();
    jd.setDate(1);
    jd.setHours(0);
    jd.setMinutes(0);
    jd.add(-6, 'day')
    const minDate = jd.date.toISOString();

    jd.add(42, 'day');
    jd.setHours(23);
    jd.setMinutes(59);

    const maxDate = jd.date.toISOString();

    return this.http.get<ISearchHoliday>(`${BASE_URL}/holidays`, {
      params: {
        minDate,
        maxDate,
      }
    }).pipe(
      map(p => p.data),
    );
  }

  loadLawyerHolidays(uid: string, date: Jalali): Observable<IHoliday[]> {
    const jd = date.clone();
    jd.setDate(1);
    jd.setHours(0);
    jd.setMinutes(0);
    jd.add(-6, 'day')
    const minDate = jd.date.toISOString();

    jd.add(42, 'day');
    jd.setHours(23);
    jd.setMinutes(59);

    const maxDate = jd.date.toISOString();

    return this.http.get<ISearchHoliday>(`${BASE_URL}/holidays/lawyer/${uid}`, {
      params: {
        minDate,
        maxDate,
      }
    }).pipe(
      map(p => p.data),
    );
  }

  loadHolidayCalls(date: Jalali, uid?: string): Observable<IHolidayCalls> {
    const jd = date.clone();
    jd.setDate(1);
    jd.setHours(0);
    jd.setMinutes(0);
    jd.add(-6, 'day')
    const minDate = jd.date.toISOString();

    jd.add(42, 'day');
    jd.setHours(23);
    jd.setMinutes(59);

    const maxDate = jd.date.toISOString();

    let url = `${BASE_URL}/holidays/hc`;
    if (uid) url = `${url}/${uid}`;

    return this.http.get<IHolidayCalls>(url, {
      params: {
        minDate,
        maxDate,
      }
    })
  }

  //getUserHolidaysAndCalls
  //getLawyerHolidaysAndCalls

  createHoliday(type: 'vacation' | 'holiday', date: Date, description: string | null | undefined): Observable<any> {
    let url = `${BASE_URL}/holidays`;
    if (type === 'holiday') url = url + '/public';

    return this.http.post(url, {
      day: date.toISOString(),
      description,
    });
  }

  deleteHoliday(type: 'vacation' | 'holiday' | 'off', id: string): Observable<any> {
    let url = `${BASE_URL}/holidays`;
    if (type === 'holiday') url = url + '/public';
    return this.http.delete(`${url}/${id}`);
  }
}
