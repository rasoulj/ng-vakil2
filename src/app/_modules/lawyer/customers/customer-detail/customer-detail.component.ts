import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Jalali } from 'jalali-ts';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { BASE_URL } from 'src/app/_modules/shared/config/consts';
import { ICalls, getCallLabel } from 'src/app/_modules/shared/models/calls.model';
import { IQuestion } from 'src/app/_modules/shared/models/question.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snack: MatSnackBar,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.loadData();
  }

  calls: ICalls[] = [];
  questions: IQuestion[] = [];

  loadData() {
    this.http.get<{ calls: ICalls[], questions: IQuestion[] }>(`${BASE_URL}users/customers/${this.customerId}`).subscribe({
      next: ({ calls, questions }) => {
        this.calls = calls;
        this.questions = questions;
      },
      error: err => this.snack.open(err.error, PersianPipe.toPersian('ok'), {
        duration: 3000
      }),
    })
  }

  formatTime(c: ICalls): string {
    return getCallLabel(c);
  }

  formatDate(c: ICalls): string {
    return (new Jalali(new Date(c.date))).format("YYYY/MM/DD");
  }

  get customerId() {
    return this.route.snapshot.paramMap.get('customerId');
  }

  onClick(q: IQuestion) {
    this.router.navigate(['my-questions', q._id]);
  }
}
