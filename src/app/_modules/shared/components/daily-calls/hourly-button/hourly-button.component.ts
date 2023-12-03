import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICallUI, isResponder, isSelfie, itsMe } from '../../../models/calls.model';
import { getDisplayName } from '../../../models/user-profile.model';
import { limitDots, stringToHslColor } from '../../../utils/utils';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';

@Component({
  selector: 'app-hourly-button',
  templateUrl: './hourly-button.component.html',
  styleUrls: ['./hourly-button.component.css']
})
export class HourlyButtonComponent {

  @Input() loggedUserId: string | undefined;
  @Input() timeSlot: number = -1;
  @Input() callUi: ICallUI = {
    title: '-',
    disabled: true,
    timeSlot: -2,
  };
  @Input() holidaysLength: number = 0;
  @Output() click = new EventEmitter<void>();


  get title(): string | undefined {
    if (!this.callUi.call) {
      return undefined;// this.callUi.title;
    }
    else if ((itsMe(this.callUi.call, this.loggedUserId) || isResponder(this.callUi.call, this.loggedUserId))) {
      if (isSelfie(this.callUi.call)) return PersianPipe.toPersian('selfie');

      return limitDots(getDisplayName(this.callUi.call.userId), 15);

    } else {
      return PersianPipe.toPersian('reserved');
    }
  }


  get backgroundColor(): string | undefined {
    if (!this.callUi.call) {
      return undefined;
    }
    else if ((itsMe(this.callUi.call, this.loggedUserId) || isResponder(this.callUi.call, this.loggedUserId))) {
      if (isSelfie(this.callUi.call)) return 'gray';
      return stringToHslColor(getDisplayName(this.callUi.call.userId));

    } else {
      return undefined;
    }
  }


  onClick() {
    this.click.emit();
  }


}
