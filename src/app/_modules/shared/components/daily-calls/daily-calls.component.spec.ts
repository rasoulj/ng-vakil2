import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCallsComponent } from './daily-calls.component';

describe('DailyCallsComponent', () => {
  let component: DailyCallsComponent;
  let fixture: ComponentFixture<DailyCallsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyCallsComponent]
    });
    fixture = TestBed.createComponent(DailyCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
