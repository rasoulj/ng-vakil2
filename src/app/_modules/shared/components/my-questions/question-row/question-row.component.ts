import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EMPTY_QUESTION, IQuestion } from '../../../models/question.model';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { PickerService } from '../../../services/picker.service';
import { UserProfile } from '../../../models/user-profile.model';

@Component({
  selector: 'app-question-row',
  templateUrl: './question-row.component.html',
  styleUrls: ['./question-row.component.css']
})
export class QuestionRowComponent {

  @Input() question: IQuestion = EMPTY_QUESTION;
  @Input() link: string = '';


  constructor(
    private authService: AuthService,
    private picker: PickerService,
  ) { }

  get askedMe(): boolean {
    return this.question.responderId._id === this.authService.userId;
  }

  get owner(): Partial<UserProfile> {
    console.log(this.question);
    return !this.askedMe ? this.question.responderId : this.question.userId;
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

  // onClick() {
  //   this.click.emit(this.question);
  // }

  get expertise(): Observable<string> {
    return this.picker.getExpertiseName(this.question?.expertiseId);
  }

  get visibility(): string {
    return this.question.isPrivate ? 'visibility_off' : 'visibility'
  }


}
