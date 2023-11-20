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

  reloadToggle = false;
  loadData() {
    this.reloadToggle = !this.reloadToggle;
  }

  onAction(act: { action: string, user: UserProfile }) {
    this.manager.editUserRole(act.user, UserRoles.initLawyer).subscribe({
      next: () => this.loadData(),
      error: err => this.snackBar.open(err.error, PersianPipe.toPersian("ok"), {
        duration: 3000,
      }),
    });
  }
}
