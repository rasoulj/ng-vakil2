import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { PersianPipe } from '../../pipes/persian.pipe';
import { ToolBarButton } from '../../shared/components/tool-bar-button/toolbar-button.model';
import { UserProfile, UserRoles, UserRole } from '../../shared/models/user-profile.model';
import { ManagerService } from '../_services/manager.service';

@Component({
  selector: 'app-registered-lawyers',
  templateUrl: './registered-lawyers.component.html',
  styleUrls: ['./registered-lawyers.component.css']
})
export class RegisteredLawyersComponent {
  constructor(
    private manager: ManagerService,
    private snackBar: MatSnackBar,
  ) { }

  data: UserProfile[] = [];


  get initLawyers(): Observable<UserProfile[]> {
    return this.manager.getUserRole(UserRoles.lawyer as UserRole) as Observable<UserProfile[]>;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.manager.getUserRole(UserRoles.lawyer as UserRole).subscribe({
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
    this.manager.editUserRole(user, UserRoles.initLawyer).subscribe({
      next: () => this.loadData(),
      error: err => this.snackBar.open(err.error, PersianPipe.toPersian("ok"), {
        duration: 3000,
      }),
    });
  }
}
