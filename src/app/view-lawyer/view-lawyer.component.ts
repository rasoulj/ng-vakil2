import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { EMPTY_USER, UserProfile, getDisplayName } from '../_modules/shared/models/user-profile.model';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_modules/shared/config/consts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersianPipe } from '../_modules/pipes/persian.pipe';
import { PickerService } from '../_modules/shared/services/picker.service';
import { limitDots } from '../_modules/shared/utils/utils';
import { GeneralViewConfig } from '../_configs/consts';

@Component({
  selector: 'app-view-lawyer',
  templateUrl: './view-lawyer.component.html',
  styleUrls: ['./view-lawyer.component.css']
})
export class ViewLawyerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private picker: PickerService,
  ) {

  }

  actions = GeneralViewConfig.actions;

  get userId() {
    return this.route.snapshot.params['id']
  }

  get user$(): Observable<UserProfile> {
    return this.http.get(`${BASE_URL}/users/id/${this.userId}`) as Observable<UserProfile>;
  }

  user: UserProfile = EMPTY_USER;

  ngOnInit(): void {
    this.user$.subscribe({
      next: user => this.user = user,
      error: err => this.snackBar.open(err.error, PersianPipe.toPersian("ok"), {
        duration: 3000,
      }),
    })
  }

  get displayName() {
    return getDisplayName(this.user);
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

}
