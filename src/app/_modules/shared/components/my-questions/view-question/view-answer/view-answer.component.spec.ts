import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnswerComponent } from './view-answer.component';

describe('ViewAnswerComponent', () => {
  let component: ViewAnswerComponent;
  let fixture: ComponentFixture<ViewAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAnswerComponent]
    });
    fixture = TestBed.createComponent(ViewAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
