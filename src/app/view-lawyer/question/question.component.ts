import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { BASE_URL } from 'src/app/_modules/shared/config/consts';
import { EMPTY_USER, UserProfile, getDisplayName } from 'src/app/_modules/shared/models/user-profile.model';
import { PickerService } from 'src/app/_modules/shared/services/picker.service';
import { Location } from '@angular/common';
import { LoadingService } from 'src/app/_modules/shared/services/loading.service';

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
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private loadingService: LoadingService,
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
    return this.http.get(`${BASE_URL}/users/id/${this.userId}`) as Observable<UserProfile>;
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

  get questionBody(): any {
    return {
      question: this.question?.value,
      title: this.title?.value,
      expertiseId: this.expertiseId?.value,
      responderId: this.user._id,
    }
  }



  onSubmit() {
    this.http.post(`${BASE_URL}/questions`, this.questionBody).subscribe({
      next: (value) => {
        this.snackBar.open(PersianPipe.toPersian("question created successfully"), PersianPipe.toPersian("ok"), {
          duration: 3000,
        });
        this.form.reset();
      },
      error: err => this.snackBar.open(err.error, PersianPipe.toPersian("ok"), {
        duration: 3000,
      }),
    });
  }

  back() {
    this.location.back();
  }
}
