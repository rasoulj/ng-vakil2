import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLawyerComponent } from './text-lawyer.component';

describe('TextLawyerComponent', () => {
  let component: TextLawyerComponent;
  let fixture: ComponentFixture<TextLawyerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextLawyerComponent]
    });
    fixture = TestBed.createComponent(TextLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
