import { Component } from '@angular/core';
import { PendingPayment } from './pending-payment.model';
import { catchError } from 'rxjs';
import { PendingPaymentsService } from './pending-payments.service';

@Component({
  selector: 'app-pending-payments',
  templateUrl: './pending-payments.component.html',
  styleUrls: ['./pending-payments.component.css']
})
export class PendingPaymentsComponent {
  data: PendingPayment[] = [];
  errorMessage?: string;

  constructor(
    private requestService: PendingPaymentsService,
  ) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.requestService.getAll().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return [];
      })
    ).subscribe(res => {
      this.data = res;
    });
  }
}
