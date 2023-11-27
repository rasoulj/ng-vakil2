import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EMPTY_QUESTION, IQuestion } from '../../../models/question.model';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { PickerService } from '../../../services/picker.service';

@Component({
  selector: 'app-question-row',
  templateUrl: './question-row.component.html',
  styleUrls: ['./question-row.component.css']
})
export class QuestionRowComponent {

  @Input() question: IQuestion = EMPTY_QUESTION;
  @Output() click = new EventEmitter<IQuestion>();

  constructor(
    private authService: AuthService,
    private picker: PickerService,
  ) { }

  get askedMe(): boolean {
    return this.question.responderId._id === this.authService.userId;
  }

  get questionText(): string {
    return this.question.answers[0]?.text ?? '-';
  }

  get completed(): boolean {
    return this.question.status === "completed";
  }

  get class(): string {
    return this.completed ? 'completedQuestion' : (this.askedMe ? 'askedMe' : '');
  }

  onClick() {
    this.click.emit(this.question);
  }

  get expertise(): Observable<string> {
    return this.picker.getExpertiseName(this.question?.expertiseId);
  }

  get visibility(): string {
    return this.question.isPrivate ? 'visibility_off' : 'visibility'
  }
}
