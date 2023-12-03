import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { EMPTY_USER, UserProfile, getDisplayName } from 'src/app/_modules/shared/models/user-profile.model';
import { Location } from '@angular/common';
import { LoadingService } from 'src/app/_modules/shared/services/loading.service';
import { AuthService } from 'src/app/_modules/shared/services/auth.service';
import { QuestionsService } from 'src/app/_modules/shared/services/questions.services';
import { IQuestionBody } from 'src/app/_modules/shared/models/question.model';
import { PickerService } from 'src/app/_modules/shared/services/picker.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private picker: PickerService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private loadingService: LoadingService,
    private authService: AuthService,
    private questionsService: QuestionsService,
  ) { }

  get loading() {
    return this.loadingService.isLoading$;
  }

  get userId() {
    return this.route.snapshot.params['id']
  }

  user: UserProfile = EMPTY_USER;

  ngOnInit(): void {
    this.user$.subscribe({
      next: user => this.user = user,
      error: err => this.snackBar.open(err.error, PersianPipe.toPersian("ok"), {
        duration: 3000,
      }),
    })
  }

  get displayName() {
    return getDisplayName(this.user);
  }

  get user$(): Observable<UserProfile> {
    return this.authService.getUserById(this.userId);
  }

  form = this.fb.group({
    expertiseId: [undefined, Validators.required],
    title: ['', Validators.required],
    question: ['', Validators.required],
    isPrivate: [false],
  });

  c(name: string) { return this.form.get(name) }

  expertise$ = combineLatest([this.picker.getExpertise(1), this.picker.getExpertise(2)]).pipe(
    map(([e1, e2]) => {
      return [...e1, ...e2]
    })
  );


  get expertiseId() {
    return this.c("expertiseId");
  }

  get title() {
    return this.c("title");
  }

  get question() {
    return this.c("question");
  }

  get isPrivate() {
    return this.c("isPrivate");
  }

  get questionBody(): IQuestionBody {
    return {
      question: this.question?.value,
      title: this.title?.value,
      expertiseId: this.expertiseId?.value,
      responderId: this.user._id,
      isPrivate: this.isPrivate?.value,
    }
  }




  onSubmit() {
    this.authService.ensureLogged(() => {
      this.doSubmit();
    });
  }

  doSubmit() {
    this.questionsService.createQuestion(this.questionBody).subscribe({
      next: qid => {
        this.snackBar.open(PersianPipe.toPersian("question created successfully"), PersianPipe.toPersian("ok"), {
          duration: 3000,
        });
        this.form.reset();
        this.router.navigate(['my-questions', qid]);
      },
      error: err => this.snackBar.open(err.error, PersianPipe.toPersian("ok"), {
        duration: 3000,
      }),
    })
  }

  back() {
    this.location.back();
  }
}
