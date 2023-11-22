import { Component, Input } from '@angular/core';
import { EMPTY_USER, UserProfile } from 'src/app/_modules/shared/models/user-profile.model';

@Component({
  selector: 'app-view-answer',
  templateUrl: './view-answer.component.html',
  styleUrls: ['./view-answer.component.css']
})
export class ViewAnswerComponent {
  @Input() text: string = "";
  @Input() date: Date = new Date();
  @Input() user: UserProfile = EMPTY_USER;
  //@Input()
}
