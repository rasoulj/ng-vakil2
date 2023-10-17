import { Component, OnInit } from '@angular/core';
import { LegalRequestsService } from 'src/app/services/legal-requests.service';

import { LegalRequest } from '../models/legal-requests.model';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-legal-requests',
  templateUrl: './legal-requests.component.html',
  styleUrls: ['./legal-requests.component.css']
})
export class LegalRequestsComponent implements OnInit {
  data: LegalRequest[] = [];
  errorMessage?: string;

  constructor(
    private requestService: LegalRequestsService,
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
