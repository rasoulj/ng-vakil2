import { Component, OnInit } from '@angular/core';
import { IHoliday } from '../../models/holiday.model';
import { Jalali } from 'jalali-ts';
import { cmpDate, getSelectedHolidays } from '../jalali-date-picker/jalai-date-picker.utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { Observable, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';
import { MessageBoxService } from '../../services/message-box.service';
import { DailySchedule, EMPTY_USER, UserProfile, UserRole, getOffDays } from '../../models/user-profile.model';
import { ICallUI, ICalls, filterCallsOfDate, isSelfie } from '../../models/calls.model';
import { CallsService } from '../../services/calls.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private snack: MatSnackBar,
    private calendarService: CalendarService,
    private callService: CallsService,
    private loadingService: LoadingService,
    private messageBoxService: MessageBoxService,
  ) { }


  get dailySchedules(): DailySchedule[] {
    const dd = this.user?.dailySchedules ?? [];
    if (dd.length !== 7) return Array(7).fill({ disabled: this.role === 'lawyer' });
    return this.user?.dailySchedules ?? [];
  }

  offDays: number[] = getOffDays(this.dailySchedules);

  get loading$(): Observable<boolean> {
    return this.loadingService.isLoading$;
  }

  loadingId = '';

  canRemove(d: IHoliday): boolean {
    const { type, _id } = d;
    //if (_id === '') return false;
    return (type === 'vacation' && this.role === 'lawyer') || (type === 'holiday' && this.role === 'manager');
  }

  desc = new FormControl('', Validators.required);

  form = new FormGroup({
    desc: this.desc,
  })


  ngOnInit(): void {
    this.loadData(new Jalali());
  }

  loadData(jd: Jalali) {
    this.calendarService.loadHolidayCalls(jd).subscribe({
      next: ({ holidays, calls }) => {

        this.calls = calls;
        this.holidays = holidays;
        this.loadingId = '';
      },
      error: err => {
        this.loadingId = '';
        this.snack.open(err.error, PersianPipe.toPersian('ok'), { duration: 3000 });
      },
    });
  }



  holidays: IHoliday[] = [];
  calls: ICalls[] = [];
  get regCalls(): ICalls[] {
    return filterCallsOfDate(this.selectedDate, this.calls);
  }

  onHoliday() {
    const desc = this.desc.value;
    this.createVacation('holiday', desc);
  }

  onVacate() {
    this.createVacation('vacation', '');
  }

  createVacation(type: 'vacation' | 'holiday', desc?: string | null) {
    this.holidays.push({
      _id: '',
      day: this.selectedDate,
      type,
      description: desc ?? '',
    })
    this.loadingId = type;
    this.calendarService.createHoliday(type, this.selectedDate, desc).subscribe({
      next: d => {
        this.form.reset();
        this.loadData(new Jalali(this.selectedDate));
      },
      error: err => {
        this.loadingId = '';
        this.snack.open(err.error, PersianPipe.toPersian('ok'), { duration: 3000 });
      },
    })
  }


  onDelete(type: 'holiday' | 'vacation' | 'off', id: string) {
    this.messageBoxService.open(() => this.doDelete(type, id));
  }

  doDelete(type: 'holiday' | 'vacation' | 'off', id: string) {
    this.loadingId = id;
    this.calendarService.deleteHoliday(type, id).subscribe({
      next: d => this.loadData(new Jalali(this.selectedDate)),
      error: err => this.snack.open(err.error, PersianPipe.toPersian('ok'), { duration: 3000 }),
    })
  }

  selectedDate = new Date();
  get formattedSelected(): string {
    return new Jalali(this.selectedDate).format("YYYY/MM/DD");
  }

  changeDate(d: Date) {
    this.selectedDate = d;
  }



  get selectedHolidays(): IHoliday[] {
    return getSelectedHolidays(this.selectedDate, this.holidays);
  }

  get role(): UserRole {
    return this.user?.role;
  }

  get canVacate(): boolean {
    if (this.role !== 'lawyer') return false;

    const day = (this.selectedDate.getDay() + 1) % 7;
    if (this.offDays.includes(day)) return false;

    if (this.selectedHolidays.length > 0) return false;

    return true;
  }

  get user(): UserProfile {
    return this.authService.getUser() ?? EMPTY_USER;
  }


  get noCallsOfDate(): number {
    return filterCallsOfDate(this.selectedDate, this.calls).length;
  }

  reserve(cu: ICallUI) {
    this.callService.createCall(this.user?._id ?? '', cu.timeSlot, this.selectedDate, 0).subscribe({
      next: () => this.loadData(new Jalali(this.selectedDate))
    })
  }

  deleteCall(cu: ICallUI) {
    this.callService.deleteCall(cu.call?._id).subscribe({
      next: () => this.loadData(new Jalali(this.selectedDate)),
    })
  }

  onClick(cu: ICallUI) {
    if (!cu.call) this.reserve(cu);
    else if (isSelfie(cu.call)) this.deleteCall(cu);
    else this.snack.open('Not Implemented!', 'OK', {
      duration: 3000,
    });
  }

}
