import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRowComponent } from './question-row.component';

describe('QuestionRowComponent', () => {
  let component: QuestionRowComponent;
  let fixture: ComponentFixture<QuestionRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionRowComponent]
    });
    fixture = TestBed.createComponent(QuestionRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
