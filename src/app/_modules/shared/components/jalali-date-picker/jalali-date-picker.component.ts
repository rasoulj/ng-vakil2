import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Jalali } from 'jalali-ts';

const WEEK_DAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
const MONTH_NAMES = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

interface CalendarDay {
  day: number,
  className: string,
  isSelected: boolean,
  isToday: boolean,
  isNormal: boolean,
  isOut: boolean,
  disabled: boolean,
  // isHoliday: boolean,
}


function cmp(d1: Jalali, d2: Jalali): number {
  const y = d1.getFullYear() - d2.getFullYear();
  const m = d1.getMonth() - d2.getMonth();
  const d = d1.getDate() - d2.getDate();
  if (y) return y;
  if (m) return m;
  return d;
}

@Component({
  selector: 'app-jalali-date-picker',
  templateUrl: './jalali-date-picker.component.html',
  styleUrls: ['./jalali-date-picker.component.css']
})
export class JalaliDatePickerComponent implements OnInit {


  @Input() value: Date = new Date();
  @Input() minDate: Date | undefined;
  @Input() maxDate: Date | undefined;
  @Output() change = new EventEmitter<Date>();

  weekDays = WEEK_DAYS;

  currentDate: Jalali = new Jalali(new Date());

  get title(): string {
    return MONTH_NAMES[this.currentDate.getMonth()] + " " + this.currentDate.getFullYear();
  }

  get min(): Jalali {
    return new Jalali(!this.minDate ? new Date(1900) : this.minDate);
  }

  get max(): Jalali {
    return new Jalali(!this.maxDate ? new Date(2200) : this.maxDate);
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
      const isSelected = cmp(s, jd) === 0;
      const isToday = cmp(t, jd) === 0 && !isSelected;
      const isOut = jd.getMonth() !== cm;
      const isNormal = !isSelected && !isToday && !isOut;

      let className = isOut ? 'out' : 'normal';
      if (i % 7 === 6) className += '-friday';

      let disabled = false;
      if (!!this.minDate && cmp(min, jd) > 0) disabled = true;
      if (!!this.maxDate && cmp(max, jd) < 0) disabled = true;

      cal[i] = {
        day: jd.getDate(),
        isOut,
        className,
        isToday,
        isSelected,
        isNormal,
        disabled,
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
    // if (cmp(this.min, jal) > 0) return false;
    // if (cmp(this.max, jal) < 0) return false;
    jal.setDate(1);
    this.currentDate = jal;
    // return true;
  }

  nextMonth() {
    this.currentDate.add(1, 'month');
  }
  prevMonth() {
    this.currentDate.add(-1, 'month');
  }

  onSelect(cd: CalendarDay) {
    const jd = this.currentDate.clone();
    if (cd.isOut) {
      jd.add(cd.day <= 7 ? 1 : -1, "month")
    }
    jd.setDate(cd.day);
    this.setDate(jd.date);
    this.emit(jd.date);
  }

  emit(d: Date): void {
    const jd = new Jalali(d);
    if (cmp(this.min, jd) > 0) return;
    if (cmp(this.max, jd) < 0) return;
    this.change.emit(jd.date);
  }

  selectToday() {
    const now = new Date();
    this.setDate(now);
    this.emit(now);

  }

  getColClass(i: number) {
    let cl = "col ";
    if (i == 0) cl += 'col0';
    if (i == 6) cl += 'col6';
    return cl;
  }

  // getClass(cl: string, d: number) {
  //   const fri = d % 7 === 6;// 
  //   //if (this.isLt(d)) cl = "out";
  //   return `${cl}${fri ? '-friday' : ''}`;
  // }

  // isLt(d: number): boolean {
  //   if (!this.minDate) return false;
  //   const jd = this.currentDate.clone();
  //   jd.setDate(d);
  //   return jd.date < this.minDate;
  // }

}
