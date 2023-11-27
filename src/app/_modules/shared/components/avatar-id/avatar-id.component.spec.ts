import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarIdComponent } from './avatar-id.component';

describe('AvatarIdComponent', () => {
  let component: AvatarIdComponent;
  let fixture: ComponentFixture<AvatarIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarIdComponent]
    });
    fixture = TestBed.createComponent(AvatarIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
