import { Component } from '@angular/core';
import { Call } from '../models/call.model';
import { CallsService } from 'src/app/services/calls.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-my-calls',
  templateUrl: './my-calls.component.html',
  styleUrls: ['./my-calls.component.css']
})
export class MyCallsComponent {
  data: Call[] = [];
  errorMessage?: string;

  constructor(
    private requestService: CallsService,
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
