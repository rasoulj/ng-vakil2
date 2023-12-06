import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../shared/models/user-profile.model';
import { BASE_URL } from '../../shared/config/consts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersianPipe } from '../../pipes/persian.pipe';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
  ) { }
  ngOnInit(): void {
    this.loadData();
  }

  customers: UserProfile[] = [];
  loadData() {
    this.http.get<UserProfile[]>(`${BASE_URL}users/customers`).subscribe({
      next: res => {
        this.customers = res;
      },
      error: err => this.snack.open(err.error, PersianPipe.toPersian('ok'), {
        duration: 3000
      }),
    })
  }
}
