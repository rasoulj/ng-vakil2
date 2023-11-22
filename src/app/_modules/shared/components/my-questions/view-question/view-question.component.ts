import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../services/questions.services';
import { EMPTY_QUESTION, IQuestion } from '../../../models/question.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';

@Component({
  selector: 'app-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  constructor(
    private questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private loadingService: LoadingService,
    private snack: MatSnackBar,
  ) {

  }

  get loading() {
    return this.loadingService.isLoading$;
  }

  form = this.fb.group({
    answer: ['', Validators.required],
  })

  get answer() {
    return this.form.get('answer');
  }

  get questionId(): string {
    return this.activatedRoute.snapshot.params['questionId'];
  }

  ngOnInit(): void {
    this.form.reset();
    this.questionsService.getQuestion(this.questionId).subscribe({
      next: value => this.question = value
    })
  }

  handleError(error: any) {
    this.form.reset();
    this.snack.open(error.error, PersianPipe.toPersian('ok'), {
      duration: 3000
    });
  }

  question: IQuestion = EMPTY_QUESTION;

  get completed(): boolean {
    return this.question.status === "completed";
  }

  onComplete() {
    this.questionsService.sendAnswer(this.questionId, undefined, true).subscribe({
      error: err => this.handleError(err),
      next: () => {
        this.ngOnInit();
      }
    });
  }

  onSend() {
    this.questionsService.sendAnswer(this.questionId, this.answer?.value, false).subscribe({
      error: err => this.handleError(err),
      next: () => {
        this.ngOnInit();
      }
    });
  }

  onBack() {
    this.location.back();
  }

}
