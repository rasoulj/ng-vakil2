import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY_QUESTION, IQuestion } from '../../../models/question.model';
import { QuestionsService } from '../../../services/questions.services';
import { AuthService } from '../../../services/auth.service';
import { take, tap } from 'rxjs';
import { EMPTY_USER, UserProfile } from '../../../models/user-profile.model';

@Component({
  selector: 'app-question-row',
  templateUrl: './question-row.component.html',
  styleUrls: ['./question-row.component.css']
})
export class QuestionRowComponent implements OnInit {

  @Input() question: IQuestion = EMPTY_QUESTION;
  @Output() click = new EventEmitter<IQuestion>();

  constructor(
    private authService: AuthService,
  ) { }

  get askedMe(): boolean {
    return this.question.responderId === this.authService.userId;
  }

  ngOnInit(): void {
    const uid = this.askedMe ? this.question.userId : this.question.responderId;

    this.authService.getUserById(uid).subscribe(value => this.responder = value);
  }

  get completed(): boolean {
    return this.question.status === "completed";
  }

  get class(): string {
    return this.completed ? 'completedQuestion' : (this.askedMe ? 'askedMe' : '');
  }

  responder: UserProfile = EMPTY_USER;

  onClick() {
    this.click.emit(this.question);
  }
}
