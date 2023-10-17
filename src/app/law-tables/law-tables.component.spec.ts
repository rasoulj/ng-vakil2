import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawTablesComponent } from './law-tables.component';

describe('LawTablesComponent', () => {
  let component: LawTablesComponent;
  let fixture: ComponentFixture<LawTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LawTablesComponent]
    });
    fixture = TestBed.createComponent(LawTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
