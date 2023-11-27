import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { DatePickerDialog, IDatePickerModel } from '../dialogs/date-picker/date-picker.dialog';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  constructor(
    public dialog: Dialog,
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
