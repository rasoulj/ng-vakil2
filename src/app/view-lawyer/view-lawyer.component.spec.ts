import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLawyerComponent } from './view-lawyer.component';

describe('ViewLawyerComponent', () => {
  let component: ViewLawyerComponent;
  let fixture: ComponentFixture<ViewLawyerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLawyerComponent]
    });
    fixture = TestBed.createComponent(ViewLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
