import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from 'src/app/_modules/pipes/pipes.module';
import { SharedModule } from '../../shared.module';

export interface IDatePickerModel {
  date: Date,
  minDate?: Date,
  maxDate?: Date,
}


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.dialog.html',
  styleUrls: ['./date-picker.dialog.css'],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  standalone: true,

})
export class DatePickerDialog {

  onChange($event: Date) {
    throw new Error('Method not implemented.');
  }


  constructor(
    public dialogRef: DialogRef<IDatePickerModel | undefined>,
    @Inject(DIALOG_DATA) public data: IDatePickerModel,
  ) { }



  close() {
    this.dialogRef.close();
  }

  onSelect() {
    this.dialogRef.close(this.data);
  }

}
