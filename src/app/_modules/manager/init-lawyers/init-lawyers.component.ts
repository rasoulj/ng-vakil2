import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../_services/manager.service';
import { Observable } from 'rxjs';
import { UserProfile, UserRole, UserRoles } from '../../shared/models/user-profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersianPipe } from '../../pipes/persian.pipe';
import { ToolBarButton } from '../../shared/components/tool-bar-button/toolbar-button.model';
import { LawyerViewConfig } from '../../shared/components/lawyer-view/lawyer-view.model';
import { Router } from '@angular/router';

const ACTIONS: ToolBarButton[] = [
  { title: "ok", link: "ok", icon: "check" },
  { title: "reject", link: "reject", icon: "close" },
  { title: "detail", link: "detail", icon: "more_horiz" }
];

@Component({
  selector: 'app-init-lawyers',
  templateUrl: './init-lawyers.component.html',
  styleUrls: ['./init-lawyers.component.css']
})
export class InitLawyersComponent {
  constructor(
    private manager: ManagerService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  config: LawyerViewConfig = {
    actions: ACTIONS,
    moreActions: ACTIONS,
    showPhone: true,
    showExpertise2: true,
    role: "initLawyer"
  }

  reloadToggle = false;
  loadData() {
    this.reloadToggle = !this.reloadToggle;
  }

  onAction(act: { action: string, user: UserProfile }) {
    switch (act.action) {
      case "ok":
        this.manager.editUserRole(act.user, UserRoles.lawyer).subscribe({
          next: () => this.loadData(),
          error: err => this.snackBar.open(err.error, PersianPipe.toPersian("ok"), {
            duration: 3000,
          }),
        });
        break;

      case "reject":
        this.snackBar.open(PersianPipe.toPersian("Not implemented"), PersianPipe.toPersian("ok"), {
          duration: 3000,
        });
        break;

      case "detail":
        this.router.navigate([`/view-lawyer/${act.user._id}`]);
        break;

    }
    //user = { ...user, process: true };

  }
}
