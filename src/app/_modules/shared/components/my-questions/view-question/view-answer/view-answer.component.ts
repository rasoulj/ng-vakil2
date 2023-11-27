import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EMPTY_ANSWER, IAnswer, persianDate } from 'src/app/_modules/shared/models/question.model';
import { AuthService } from 'src/app/_modules/shared/services/auth.service';

@Component({
  selector: 'app-view-answer',
  templateUrl: './view-answer.component.html',
  styleUrls: ['./view-answer.component.css']
})
export class ViewAnswerComponent {
  @Input() answer: IAnswer | undefined = EMPTY_ANSWER;

  constructor(
    private authService: AuthService,
  ) { }

  get isMe(): boolean {
    return this.authService.getUser()?._id === this.answer?.uid?._id;
  }

  get class(): string {
    return this.isMe ? "answer my-answer" : "answer other-answer";
  }

  get contentClass(): string {
    return this.isMe ? "content my-content" : "content other-content";
  }

  get sentences(): string[] {
    return this.answer?.text.split("\n") ?? [];
  }

  get date(): string {
    return persianDate(this.answer?.date);
    return "yyyy/mm/dd, HH:MM"
  }
}
