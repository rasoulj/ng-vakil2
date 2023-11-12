import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitLawyersComponent } from './init-lawyers.component';

describe('InitLawyersComponent', () => {
  let component: InitLawyersComponent;
  let fixture: ComponentFixture<InitLawyersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitLawyersComponent]
    });
    fixture = TestBed.createComponent(InitLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
