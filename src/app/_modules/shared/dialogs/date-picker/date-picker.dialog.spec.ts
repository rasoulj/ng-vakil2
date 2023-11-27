import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerDialog } from './date-picker.dialog';

describe('DatePickerComponent', () => {
  let component: DatePickerDialog;
  let fixture: ComponentFixture<DatePickerDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerDialog]
    });
    fixture = TestBed.createComponent(DatePickerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
