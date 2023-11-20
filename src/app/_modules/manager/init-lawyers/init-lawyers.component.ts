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
export class InitLawyersComponent {
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
    //user = { ...user, process: true };
    this.manager.editUserRole(act.user, UserRoles.lawyer).subscribe({
      next: () => this.loadData(),
      error: err => this.snackBar.open(err.error, PersianPipe.toPersian("ok"), {
        duration: 3000,
      }),
    });
  }
}
