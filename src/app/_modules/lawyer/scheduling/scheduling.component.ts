import { Component, OnInit } from '@angular/core';
import { PersianPipe } from '../../pipes/persian.pipe';
import { DailySchedule } from '../../shared/models/user-profile.model';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../shared/services/loading.service';
import { FormControl } from '@angular/forms';
import { formatLabel } from '../../shared/models/calls.model';


type Days = 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

function dayToDayModel(day: Days): DailySchedule {
  return {
    disabled: true,
    day,
    startTime: 16,
    endTime: 32
  }
}

const AllDays: Days[] = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

function getAllDays() {
  return AllDays.map((day) => dayToDayModel(day));
}



@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {


  today: Date = new Date();
  startChange(d: DailySchedule, $event: number) {
    d.startTime = $event;
    this.dirty = true;
  }

  endChange(d: DailySchedule, $event: number) {
    d.endTime = $event;
    this.dirty = true;
  }


  constructor(
    private authService: AuthService,
    private snack: MatSnackBar,
    private loadingService: LoadingService,
  ) { }


  canRemove(type: 'vacation' | 'holiday' | 'off'): boolean {
    return (type === 'vacation' && this.authService?.getUser()?.role === 'lawyer') || (type === 'holiday' && this.authService?.getUser()?.role === 'manager');
  }

  get loading$() {
    return this.loadingService.isLoading$
  }

  dateValue = new FormControl();

  ngOnInit(): void {
    let days = this.authService?.getUser()?.dailySchedules ?? [];
    if (!days || days.length !== 7) {
      days = getAllDays();
    }
    this.days = days;
  }

  dirty: boolean = false;
  days: DailySchedule[] = getAllDays();

  formatLabel(value: number): string {
    return formatLabel(value);
  }

  getLabel(d: DailySchedule): string {
    if (d.disabled) return PersianPipe.toPersian('holiday');

    const start = formatLabel(d.startTime);
    const end = formatLabel(d.endTime);
    return `${start} - ${end}`
  }

  toggleChecked(d: DailySchedule) {
    d.disabled = !d.disabled;
    this.dirty = true;
  }


  save() {
    const dailySchedules = this.days;//.map(convertToModel);
    this.authService.setUser({ dailySchedules }).subscribe({
      next: () => {
        this.snack.open(PersianPipe.toPersian('saved'), PersianPipe.toPersian('ok'), { duration: 3000 });
        this.dirty = false;
      },
      error: err => this.snack.open(err.error, PersianPipe.toPersian('ok'), { duration: 3000 }),
    })
  }




}
