import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../services/questions.services';
import { EMPTY_QUESTION, IQuestion } from '../../../models/question.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { MessageBoxService } from '../../../services/message-box.service';
import { AuthService } from '../../../services/auth.service';
import { EMPTY_USER, UserProfile } from '../../../models/user-profile.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { PickerService } from '../../../services/picker.service';

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
    private messageBox: MessageBoxService,
    private authService: AuthService,
    private picker: PickerService,
  ) {

  }

  get isMe(): boolean {
    return this.authService.getUser()?._id === this.question?.userId?._id;
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

  get expertise(): Observable<string> {
    return this.picker.getExpertiseName(this.question?.expertiseId);
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.form.reset();
    this.questionsService.getQuestion(this.questionId).subscribe({

      next: (value) => {
        this.question = value;
        this.cap = !this.isMe ? {
          body: "answer body",
          hint: "answer body hint",
          send: "send answer",
          message: "answer body cannot be empty",
        } : {
          body: "desc body",
          hint: "desc body hint",
          send: "send desc",
          message: "desc body cannot be empty",

        };

        //this.authService.getUserById(value.responderId).subscribe(value => this.responder = value);
      }
    });
  }

  handleError(error: any) {
    this.form.reset();
    this.snack.open(error.error, PersianPipe.toPersian('ok'), {
      duration: 3000
    });
  }

  question: IQuestion = EMPTY_QUESTION;

  get visibility(): string {
    return this.question.isPrivate ? 'visibility_off' : 'visibility'
  }

  get completed(): boolean {
    return this.question.status === "completed";
  }

  onComplete() {
    this.messageBox.open(action => {
      if (action !== "yes") return;

      this.doComplete();
    });
  }

  doComplete() {
    this.questionsService.sendAnswer(this.questionId, undefined, true).subscribe({
      error: err => this.handleError(err),
      next: () => {
        this.ngOnInit();
        this.snack.open(PersianPipe.toPersian('done successfully'), PersianPipe.toPersian("ok"), {
          duration: 3000,
        })
      }
    });
  }

  onSend() {

    this.authService.ensureLogged(() => {
      this.doSend();
    });
  }

  doSend() {
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

  cap: any = {};

}
