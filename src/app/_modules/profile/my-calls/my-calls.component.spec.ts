import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCallsComponent } from './my-calls.component';

describe('MyCallsComponent', () => {
  let component: MyCallsComponent;
  let fixture: ComponentFixture<MyCallsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCallsComponent]
    });
    fixture = TestBed.createComponent(MyCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
