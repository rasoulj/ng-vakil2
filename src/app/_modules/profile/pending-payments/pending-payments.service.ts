import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../shared/config/consts';
import { Observable } from 'rxjs';
import { PendingPayment } from './pending-payment.model';

const END_POINT = `${BASE_URL}pending-payments`;

@Injectable({
  providedIn: 'root'
})
export class PendingPaymentsService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<PendingPayment[]> {
    return this.http.get(END_POINT) as Observable<PendingPayment[]>;
  }
}
