import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyersPanelComponent } from './lawyers-panel.component';

describe('LawyersPanelComponent', () => {
  let component: LawyersPanelComponent;
  let fixture: ComponentFixture<LawyersPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LawyersPanelComponent]
    });
    fixture = TestBed.createComponent(LawyersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
