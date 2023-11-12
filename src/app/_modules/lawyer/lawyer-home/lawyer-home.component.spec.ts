import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerHomeComponent } from './lawyer-home.component';

describe('LawyerHomeComponent', () => {
  let component: LawyerHomeComponent;
  let fixture: ComponentFixture<LawyerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LawyerHomeComponent]
    });
    fixture = TestBed.createComponent(LawyerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
