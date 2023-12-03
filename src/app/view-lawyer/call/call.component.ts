import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jalali } from 'jalali-ts';
import { Observable } from 'rxjs';
import { filterCallsOfDate, ICalls, ICallUI } from 'src/app/_modules/shared/models/calls.model';
import { IHoliday } from 'src/app/_modules/shared/models/holiday.model';
import { DailySchedule, EMPTY_USER, UserProfile } from 'src/app/_modules/shared/models/user-profile.model';
import { AuthService } from 'src/app/_modules/shared/services/auth.service';
import { CalendarService } from 'src/app/_modules/shared/services/calendar.service';
import { CallsService } from 'src/app/_modules/shared/services/calls.service';
import { LoadingService } from 'src/app/_modules/shared/services/loading.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private calendarService: CalendarService,
    private callsService: CallsService,
  ) { }

  holidays: IHoliday[] = [];
  calls: ICalls[] = [];
  user: UserProfile = EMPTY_USER;
  selectedDate: Date = new Date();
  timeSlot = -1;


  ngOnInit(): void {
    this.changeDate(new Date());
    this.authService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.loadData();
      },
    })
  }

  get loggedUserId(): string | undefined {
    return this.authService.getUser()?._id;
  }

  get regCalls(): ICalls[] {
    return filterCallsOfDate(this.selectedDate, this.calls);
  }

  get loading$(): Observable<boolean> {
    return this.loadingService.isLoading$;
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


  loadData() {
    this.calendarService.loadHolidayCalls(new Jalali(this.selectedDate), this.userId).subscribe({
      next: ({ holidays, calls }) => {
        this.holidays = holidays;
        this.calls = calls;
        this.timeSlot = -1;
      },
      error: e => this.timeSlot = -1,
    });

  }

  monthChange($event: Jalali) {
    this.calls = [];
    this.holidays = [];
    this.selectedDate = $event.date;
    this.loadData();
  }


  get userId() {
    return this.route.snapshot.params['id']
  }


  get selectedDay(): number {
    return (this.selectedDate.getDay() + 1) % 7
  }

  changeDate($event: Date) {
    this.selectedDate = $event;
  }

  onClick(cu: ICallUI) {
    if (!cu.timeSlot) return;
    

    this.timeSlot = cu.timeSlot;

    if (!cu.call) {
      this.callsService.createCall(this.userId, cu.timeSlot, this.selectedDate, 0).subscribe({
        next: value => this.loadData(),
        error: e => this.timeSlot = -1,
      })
    } else {
      this.callsService.deleteCall(cu.call._id).subscribe({
        next: value => this.loadData(),
        error: e => this.timeSlot = -1,
      })
    }
  }

}
