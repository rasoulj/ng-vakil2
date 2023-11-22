import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { ToolBarButton } from 'src/app/_modules/shared/components/tool-bar-button/toolbar-button.model';
import { UserProfile, getDisplayName, isOnlineUser } from 'src/app/_modules/shared/models/user-profile.model';
import { PickerService } from 'src/app/_modules/shared/services/picker.service';
import { limitDots } from 'src/app/_modules/shared/utils/utils';
import { stdViewPhone } from 'src/app/_modules/shared/validators/mobile.validator';
import { LawyerViewConfig } from './lawyer-view.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-lawyer-view',
  templateUrl: './lawyer-view.component.html',
  styleUrls: ['./lawyer-view.component.css']
})
export class LawyerViewComponent implements OnInit {

  @Input() user: Partial<UserProfile> = {};
  @Input() config: LawyerViewConfig = {
    role: "lawyer",
  };
  @Output() action = new EventEmitter<string>();

  constructor(
    private picker: PickerService,
    private authService: AuthService,
  ) {

  }

  favorite: boolean = false;
  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      if (user) {
        this.favorite = user.favorites?.includes(this.user.phone ?? "--") ?? false;
      }
    })
  }

  get isLogged() {
    return this.authService.isLogged;
  }


  setFavorite(fav: boolean) {
    this.authService.ensureLogged(() => this.innerSetFavorite(fav));
  }

  innerSetFavorite(fav: boolean) {
    if (!this.user.phone) return;
    const oldValue = this.favorite;
    this.favorite = !oldValue;
    this.authService.setFavorite(this.user.phone, fav).subscribe({
      next: () => {
        this.onAction("setFavorite");
      },
      error: () => {
        this.favorite = oldValue;
      }
    });
  }

  get displayName() {
    return getDisplayName(this.user);
  }

  get phone() {
    return stdViewPhone(this.user.phone, " ");
  }

  get province() {
    return this.picker.getProvinceName(this.user.provinceId);
  }

  get city() {
    return this.picker.getCityName(this.user.provinceId, this.user.cityId);
  }

  get graduationType() {
    return PersianPipe.getEnum('GraduationTypeEnum', this.user.graduationType);
  }

  get lawyerType() {
    return PersianPipe.getEnum('LawyerTypeEnum', this.user.lawyerType);
  }

  get expertise1() {
    return this.picker.getExpertiseName(this.user.expertise1);
  }

  get expertise2() {
    return this.picker.getExpertiseName(this.user.expertise2);
  }

  _limitDots(str: string | null) {
    return limitDots(str, 30);
  }

  onAction(action: string) {
    this.action.emit(action);
  }

  get link(): string {
    return `/view-lawyer/${this.user?._id}`;
  }

}
