import { Component } from '@angular/core';
import { Question } from './question.model';
import { catchError } from 'rxjs';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent {
  data: Question[] = [];
  errorMessage?: string;

  constructor(
    private requestService: QuestionsService,
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
