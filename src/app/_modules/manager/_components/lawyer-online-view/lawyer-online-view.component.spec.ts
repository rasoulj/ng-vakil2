import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerOnlineViewComponent } from './lawyer-online-view.component';

describe('LawyerOnlineViewComponent', () => {
  let component: LawyerOnlineViewComponent;
  let fixture: ComponentFixture<LawyerOnlineViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LawyerOnlineViewComponent]
    });
    fixture = TestBed.createComponent(LawyerOnlineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
