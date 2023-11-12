import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuestionsComponent } from './my-questions.component';

describe('MyQuestionsComponent', () => {
  let component: MyQuestionsComponent;
  let fixture: ComponentFixture<MyQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyQuestionsComponent]
    });
    fixture = TestBed.createComponent(MyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
