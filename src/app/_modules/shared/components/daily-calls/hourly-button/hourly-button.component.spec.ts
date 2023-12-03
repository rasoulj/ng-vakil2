import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyButtonComponent } from './hourly-button.component';

describe('HourlyButtonComponent', () => {
  let component: HourlyButtonComponent;
  let fixture: ComponentFixture<HourlyButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HourlyButtonComponent]
    });
    fixture = TestBed.createComponent(HourlyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
