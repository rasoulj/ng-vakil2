import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EMPTY_USER, UserProfile, getDisplayName } from '../_modules/shared/models/user-profile.model';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_modules/shared/config/consts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersianPipe } from '../_modules/pipes/persian.pipe';
import { PickerService } from '../_modules/shared/services/picker.service';
import { limitDots } from '../_modules/shared/utils/utils';
import { GeneralViewConfig } from '../_configs/consts';
import { LoadingService } from '../_modules/shared/services/loading.service';
import { ToolBarButton } from '../_modules/shared/components/tool-bar-button/toolbar-button.model';
import { AuthService } from '../_modules/shared/services/auth.service';

@Component({
  selector: 'app-view-lawyer',
  templateUrl: './view-lawyer.component.html',
  styleUrls: ['./view-lawyer.component.css']
})
export class ViewLawyerComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private picker: PickerService,
    private loadingService: LoadingService,
    private router: Router,
    private authService: AuthService,
  ) {

  }

  get loading() {
    return this.loadingService.isLoading$;
  }

  actions = GeneralViewConfig.actions;

  get userId() {
    return this.route.snapshot.params['id']
  }

  get user$(): Observable<UserProfile> {
    return this.authService.getUserById(this.userId);
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


  goLink(act: ToolBarButton) {
    this.router.navigate([...this.route.snapshot.url.map(u => u.path), act.link]);
  }

  onAction(act: ToolBarButton) {
    if (act.link === "call") {
      this.authService.ensureLogged(() => this.goLink(act));
    } else {
      this.goLink(act);
    }
  }

}
