import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../_services/manager.service';
import { Observable } from 'rxjs';
import { UserProfile, UserRole, UserRoles } from '../../shared/models/user-profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersianPipe } from '../../pipes/persian.pipe';
import { ToolBarButton } from '../../shared/components/tool-bar-button/toolbar-button.model';

@Component({
  selector: 'app-init-lawyers',
  templateUrl: './init-lawyers.component.html',
  styleUrls: ['./init-lawyers.component.css']
})
export class InitLawyersComponent implements OnInit {
  constructor(
    private manager: ManagerService,
    private snackBar: MatSnackBar,
  ) { }

  data: UserProfile[] = [];


  get initLawyers(): Observable<UserProfile[]> {
    return this.manager.getUserRole(UserRoles.initLawyer as UserRole) as Observable<UserProfile[]>;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.manager.getUserRole(UserRoles.initLawyer as UserRole).subscribe({
      next: res => {
        this.data = res;
      },
      error: err => this.handleError(err),
    });
  }

  handleError(err: any) {
    this.snackBar.open(err.message, 'Close', {
      duration: 3000
    });
    return [];
  }

  actions: ToolBarButton[] = [
    { title: "ok", link: "ok", icon: "check" },
    { title: "reject", link: "reject", icon: "close" },
    { title: "detail", link: "detail", icon: "more_horiz" }
  ];
  //["check", "close", "more_horiz"];

  onAction(action: string, user: UserProfile) {
    this.manager.editUserRole(user, UserRoles.lawyer).subscribe({
      next: () => this.loadData(),
      error: err => this.snackBar.open(err.error, PersianPipe.toPersian("ok"), {
        duration: 3000,
      }),
    });
  }
}
