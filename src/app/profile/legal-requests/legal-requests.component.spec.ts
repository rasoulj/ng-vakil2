import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalRequestsComponent } from './legal-requests.component';

describe('LegalRequestsComponent', () => {
  let component: LegalRequestsComponent;
  let fixture: ComponentFixture<LegalRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegalRequestsComponent]
    });
    fixture = TestBed.createComponent(LegalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
