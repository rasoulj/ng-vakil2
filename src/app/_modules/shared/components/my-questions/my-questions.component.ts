import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.services';
import { IGetQuestions, IQuestion } from '../../models/question.model';
import { Router } from '@angular/router';
import { MatChipListboxChange } from '@angular/material/chips';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { BehaviorSubject, combineLatest } from 'rxjs';

const AllStatus = ["all", "init", "answered", "completed"].map(e => {
  return {
    value: e,
    viewValue: PersianPipe.toPersian(`questions.${e}`),
  }
});

const AllSubject = ["all", "you", "other"].map(e => {
  return {
    value: e,
    viewValue: PersianPipe.toPersian(`subject.${e}`),
  }
});

function tranStatus(status: string) {
  const t = AllStatus.find(e => e.viewValue === status)?.value;
  return t === "all" ? undefined : t;
}

function tranSubject(subject: string) {
  const t = AllSubject.find(e => e.viewValue === subject)?.value;
  return t === "all" ? undefined : t;
}


@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent {


  constructor(
    private questionsService: QuestionsService,
    private router: Router,
  ) { }

  allStatus = AllStatus;
  status$ = new BehaviorSubject<string>(this.allStatus[0].viewValue);

  allSubject = AllSubject;
  subject$ = new BehaviorSubject<string>(this.allSubject[0].viewValue);

  questions: IGetQuestions = {
    length: 0, data: [],
  };

  questions$ = combineLatest([this.status$, this.subject$]).subscribe({
    next: ([status, subject]) => {
      this.questionsService.myQuestions(tranStatus(status), tranSubject(subject)).subscribe({
        next: value => this.questions = value,
      })
    }
  });

  onQuestionClick(q: IQuestion) {
    this.router.navigate(['my-questions', q._id]);
  }

  statusChanged(chipVal: MatChipListboxChange) {
    this.status$.next(chipVal.value);
  }

  subjectChanged(chipVal: MatChipListboxChange) {
    this.subject$.next(chipVal.value);
  }
}
