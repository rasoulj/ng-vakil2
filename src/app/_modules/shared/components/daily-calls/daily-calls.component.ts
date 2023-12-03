import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICallUI, ICalls, geEmptyCall, getCallLabel, isResponder, itsMe } from '../../models/calls.model';
import { AuthService } from '../../services/auth.service';
import { DailySchedule, EMPTY_DAILY_SCHEDULE, EMPTY_USER, UserProfile, getDisplayName } from '../../models/user-profile.model';
import { IHoliday } from '../../models/holiday.model';
import { getSelectedHolidays, isOff } from '../jalali-date-picker/jalai-date-picker.utils';
import { map, of, tap } from 'rxjs';

@Component({
  selector: 'app-daily-calls',
  templateUrl: './daily-calls.component.html',
  styleUrls: ['./daily-calls.component.css']
})
export class DailyCallsComponent {
  @Input() hideHolidays: boolean = false;
  @Input() regCalls: ICalls[] = [];
  @Input() user: UserProfile = EMPTY_USER;
  @Input() holidays: IHoliday[] = [];
  @Input() timeSlot = -1;
  @Input() selectedDate: Date = new Date();
  @Output() click = new EventEmitter<ICallUI>()

  constructor(
    private authService: AuthService,
  ) { }


  get loggedUserId(): string | undefined {
    return this.authService.getUser()?._id;
  }

  get calls(): ICallUI[] {
    const ds: DailySchedule = this.dailySchedule, regCalls: ICalls[] = this.regCalls, userId = this.loggedUserId;


    const calls: ICallUI[] = [];
    for (let i = 16; i <= 41; i++) {
      const call = regCalls.find(p => p.timeSlot === i);

      let en = !(ds.startTime > i || ds.endTime < i);
      en = en && (itsMe(call, this.loggedUserId) || isResponder(call, this.loggedUserId));

      calls.push({
        timeSlot: i,
        title: getCallLabel(geEmptyCall(new Date(), i)),
        disabled: !en, // ds.startTime > i || ds.endTime < i,
        call,
      });
    }
    return calls;
  }

  // isResponder(call: ICalls | undefined): boolean {
  //   return (!!call?.responderId) && call?.responderId._id === this.loggedUserId;
  // }

  // itsMe(call: ICalls | undefined): boolean {
  //   return !call?.userId || (!!call?.userId) && call?.userId._id === this.loggedUserId;
  // }

  get dailySchedule(): DailySchedule {
    return this.user.dailySchedules?.[this.selectedDay] ?? EMPTY_DAILY_SCHEDULE;
  }

  get dailySchedules(): DailySchedule[] {
    const dd = this.user.dailySchedules ?? [];
    if (dd.length !== 7) return Array(7).fill({ disabled: true });
    return this.user.dailySchedules ?? [];
  }

  get offDays(): number[] {
    return this.dailySchedules.map((p, i) => {
      if (p.disabled) return i;
      else return -1;
    }).filter(i => i >= 0) ?? [6];
  }

  get selectedDay(): number {
    return (this.selectedDate.getDay() + 1) % 7
  }

  get selectedHolidays(): IHoliday[] {

    const sh = getSelectedHolidays(this.selectedDate, this.holidays);
    const off = isOff(this.selectedDay, this.offDays);
    if (off) {
      sh.push({ type: 'off', description: '', day: this.selectedDate, _id: '' });
    }

    return sh;
  }

  onClick(cu: ICallUI) {
    this.click.emit(cu);
  }


}
