import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { DatePickerDialog, IDatePickerModel } from '../dialogs/date-picker/date-picker.dialog';
import { Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Jalali } from 'jalali-ts';
import { BASE_URL } from '../config/consts';
import { IHoliday } from '../models/holiday.model';



@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  constructor(
    public dialog: Dialog,
    public http: HttpClient,
  ) { }

  public pick(date?: Date, minDate?: Date, maxDate?: Date): Observable<Date | undefined> {
    const dialogRef = this.dialog.open<IDatePickerModel | undefined>(DatePickerDialog, {
      width: '650px',
      data: {
        date: date ?? new Date(),
        minDate,
        maxDate,
      },
    });

    return dialogRef.closed.pipe(
      map(r => r?.date)
    );
  }

  
}
