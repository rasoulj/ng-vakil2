import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredLawyersComponent } from './registered-lawyers.component';

describe('RegisteredLawyersComponent', () => {
  let component: RegisteredLawyersComponent;
  let fixture: ComponentFixture<RegisteredLawyersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredLawyersComponent]
    });
    fixture = TestBed.createComponent(RegisteredLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
