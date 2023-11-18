import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLawyersComponent } from './search-lawyers.component';

describe('SearchLawyersComponent', () => {
  let component: SearchLawyersComponent;
  let fixture: ComponentFixture<SearchLawyersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchLawyersComponent]
    });
    fixture = TestBed.createComponent(SearchLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
