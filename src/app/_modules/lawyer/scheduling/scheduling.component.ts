import { Component, OnInit } from '@angular/core';
import { PersianPipe } from '../../pipes/persian.pipe';
import { DailySchedule } from '../../shared/models/user-profile.model';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../shared/services/loading.service';
import { FormControl } from '@angular/forms';
import { DatePickerService } from '../../shared/services/date-picker.service';
import { Jalali } from 'jalali-ts';

type Days = 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

function dayToDayModel(day: Days): IDayModel {
  return {
    disabled: true,
    day,
    start: 16,
    end: 32
  }
}

const AllDays: Days[] = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

function getAllDays() {
  return AllDays.map((day) => dayToDayModel(day));
}

interface IDayModel {
  disabled: boolean;
  day: Days;
  start: number,
  end: number,
}

function convertToModel(day: IDayModel): DailySchedule {
  return {
    startTime: new Date(0, 0, 0, day.start / 2, day.start % 2 * 30),
    endTime: new Date(0, 0, 0, day.end / 2, day.end % 2 * 30),
    day: day.day,
    disabled: day.disabled,
  }
}

function backToModel(schedule: DailySchedule): IDayModel {
  const startTime = new Date(schedule.startTime ?? new Date());
  const endTime = new Date(schedule.endTime ?? new Date());
  return {
    disabled: schedule.disabled,
    day: schedule.day,
    start: startTime.getHours() * 2 + Math.floor(startTime.getMinutes() / 30),
    end: endTime.getHours() * 2 + Math.floor(endTime.getMinutes() / 30),
  }
}

function zeroPad(num: number): string {
  if (num < 10) return `0${num}`;
  else return num.toString();
}

function formatLabel(value: number): string {
  const hour = Math.floor(value / 2);
  const minute = (value % 2) * 30;
  return `${zeroPad(hour)}:${zeroPad(minute)}`;
}

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  today: Date = new Date();
  startChange(d: IDayModel, $event: number) {
    d.start = $event;
    this.dirty = true;
  }

  endChange(d: IDayModel, $event: number) {
    d.end = $event;
    this.dirty = true;
  }


  constructor(
    private authService: AuthService,
    private snack: MatSnackBar,
    private loadingService: LoadingService,
    private datePicker: DatePickerService,
  ) { }

  get loading$() {
    return this.loadingService.isLoading$
  }

  dateValue = new FormControl();

  ngOnInit(): void {
    let days = this.authService?.getUser()?.dailySchedules?.map(backToModel);
    if (!days || days.length !== 7) {
      days = getAllDays();
    }
    this.days = days;
  }

  dirty: boolean = false;
  days: IDayModel[] = getAllDays();

  formatLabel(value: number): string {
    return formatLabel(value);
  }

  getLabel(d: IDayModel): string {
    if (d.disabled) return PersianPipe.toPersian('holiday');

    const start = formatLabel(d.start);
    const end = formatLabel(d.end);
    return `${start} - ${end}`
  }

  toggleChecked(d: IDayModel) {
    d.disabled = !d.disabled;
    this.dirty = true;
  }


  save() {
    const dailySchedules = this.days.map(convertToModel);
    this.authService.setUser({ dailySchedules }).subscribe({
      next: () => {
        this.snack.open(PersianPipe.toPersian('saved'), PersianPipe.toPersian('ok'), { duration: 3000 });
        this.dirty = false;
      },
      error: err => this.snack.open(err.error, PersianPipe.toPersian('ok'), { duration: 3000 }),
    })
  }




  testDate = new Date(1978, 6, 2);
  changeDate(d: Date) {
    this.testDate = d;
  }

  pickDate() {
    const jal = Jalali.parse("1402-01-01");


    this.datePicker.pick(new Date(2023, 10, 28), new Date(2023, 10, 29), new Date(2023, 11, 16)).subscribe({
      next: console.log,
    });
  }
}
