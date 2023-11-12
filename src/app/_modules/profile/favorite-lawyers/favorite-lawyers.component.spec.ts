import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteLawyersComponent } from './favorite-lawyers.component';

describe('FavoriteLawyersComponent', () => {
  let component: FavoriteLawyersComponent;
  let fixture: ComponentFixture<FavoriteLawyersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteLawyersComponent]
    });
    fixture = TestBed.createComponent(FavoriteLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
