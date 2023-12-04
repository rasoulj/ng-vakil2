import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Jalali } from 'jalali-ts';
import { CalendarDay, IHoliday } from '../../models/holiday.model';
import { cmpJalali, findHoliday, isOff } from './jalai-date-picker.utils';
import { ICalls, filterCallsOfDate } from '../../models/calls.model';
import { DailySchedule, UserRole, getOffDays } from '../../models/user-profile.model';

const WEEK_DAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
const MONTH_NAMES = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

@Component({
  selector: 'app-jalali-date-picker',
  templateUrl: './jalali-date-picker.component.html',
  styleUrls: ['./jalali-date-picker.component.css']
})
export class JalaliDatePickerComponent implements OnInit {
  @HostBinding('@.disabled')
  public animationsDisabled = true;

  @Input() mode: UserRole = 'customer';

  @Input() value: Date = new Date();
  @Input() minDate: Date | undefined;
  @Input() maxDate: Date | undefined;
  @Output() change = new EventEmitter<Date>();
  @Output() monthChange = new EventEmitter<Jalali>();
  @Input() rowHeight: string = "4:3";
  @Input() holidays: IHoliday[] = [];
  @Input() calls: ICalls[] = [];
  @Input() dailySchedules: DailySchedule[] = [];


  weekDays = WEEK_DAYS;

  currentDate: Jalali = new Jalali(new Date());

  get title(): string {
    return MONTH_NAMES[this.currentDate.getMonth()] + " " + this.currentDate.getFullYear();
  }

  get min(): Jalali {
    return new Jalali(!this.minDate ? new Date('1900') : this.minDate);
  }

  get max(): Jalali {
    return new Jalali(!this.maxDate ? new Date('2200') : this.maxDate);
  }

  get offDays(): number[] {
    return getOffDays(this.dailySchedules);
  }


  get calendar(): CalendarDay[] {
    let cal: CalendarDay[] = [];

    const s = new Jalali(this.value);
    const t = new Jalali(new Date());

    const min = this.min;
    const max = this.max;

    const cmDays = this.currentDate.monthLength();
    const cm = this.currentDate.getMonth();

    let startDay = (this.currentDate.date.getDay() + 1) % 7;

    const jd = this.currentDate.clone();
    jd.add(-startDay, 'day');

    const count = startDay + cmDays > 35 ? 42 : 35;

    for (let i = 0; i < count; i++) {
      const isSelected = cmpJalali(s, jd) === 0;
      const isToday = cmpJalali(t, jd) === 0 && !isSelected;
      const isOut = jd.getMonth() !== cm;
      const isNormal = !isSelected && !isToday && !isOut;

      const holiday = findHoliday(jd, this.holidays);

      let className = isOut ? 'out' : 'normal';
      if (isOff(i, this.offDays) || holiday) className += '-friday';

      let classNameParent = 'bg-white';

      if (holiday) classNameParent = holiday?.type === 'holiday' ? 'red-holiday' : 'red-vacation';
      else if (isOff(i, this.offDays)) classNameParent = 'red';

      let disabled = false;
      if (!!this.minDate && cmpJalali(min, jd) > 0) disabled = true;
      if (!!this.maxDate && cmpJalali(max, jd) < 0) disabled = true;
      const date = jd.clone();

      const dailySchedule = this.dailySchedules[i % 7];

      let callsCount = filterCallsOfDate(date.date, this.calls).length;
      if (this.mode === 'customer') {
        callsCount = dailySchedule.endTime - dailySchedule.startTime - callsCount + 1;
      }
      if (classNameParent !== 'bg-white' && this.mode === 'customer') callsCount = 0;

      cal[i] = {
        day: jd.getDate(),
        date,
        isOut,
        className,
        classNameParent,
        isToday,
        isSelected,
        isNormal,
        disabled,
        holiday,
        callsCount,
      }
      jd.add(1, 'day');
    }


    return cal;
  }

  ngOnInit(): void {
    this.setDate(this.value);
  }

  setDate(d: Date): void {
    const jal = new Jalali(d);


    jal.setDate(1);
    if (jal.getMonth() !== this.currentDate.getMonth()) {
      this.monthChange.emit(jal);
    }
    this.currentDate = jal;


    // return true;
  }

  nextMonth() {
    this.currentDate.add(1, 'month');
    this.monthChange.emit(this.currentDate);
  }
  prevMonth() {
    this.currentDate.add(-1, 'month');
    this.monthChange.emit(this.currentDate);
  }

  onSelect(cd: CalendarDay) {
    if (cd.disabled) return;

    const jd = this.currentDate.clone();
    if (cd.isOut) {
      jd.add(cd.day <= 7 ? 1 : -1, "month");
    }
    jd.setDate(cd.day);
    this.setDate(jd.date);
    this.emit(jd.date);
  }

  emit(d: Date): void {
    const jd = new Jalali(d);

    if (cmpJalali(this.min, jd) > 0) return;
    if (cmpJalali(this.max, jd) < 0) return;
    this.change.emit(jd.date);
  }

  selectToday() {
    const now = new Date();
    this.setDate(now);
    this.emit(now);

  }

  getColClass(i: number) {
    let cl = isOff(i, this.offDays) ? "colH " : "col ";
    if (i == 0) cl += 'col0';
    if (i == 6) cl += 'col6';
    return cl;
  }

}
