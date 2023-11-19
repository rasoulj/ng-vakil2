import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLawyerComponent } from './call-lawyer.component';

describe('CallLawyerComponent', () => {
  let component: CallLawyerComponent;
  let fixture: ComponentFixture<CallLawyerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallLawyerComponent]
    });
    fixture = TestBed.createComponent(CallLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
