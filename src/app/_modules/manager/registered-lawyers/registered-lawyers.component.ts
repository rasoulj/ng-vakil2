import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError } from 'rxjs';
import { PersianPipe } from '../../pipes/persian.pipe';
import { ToolBarButton } from '../../shared/components/tool-bar-button/toolbar-button.model';
import { UserProfile, UserRoles, UserRole } from '../../shared/models/user-profile.model';
import { ManagerService } from '../_services/manager.service';
import { LawyerViewConfig } from '../../shared/components/lawyer-view/lawyer-view.model';
import { Router } from '@angular/router';

const ACTIONS: ToolBarButton[] = [
  { title: "ok", link: "ok", icon: "check" },
  { title: "reject", link: "reject", icon: "close" },
  { title: "detail", link: "detail", icon: "more_horiz" }
];


@Component({
  selector: 'app-registered-lawyers',
  templateUrl: './registered-lawyers.component.html',
  styleUrls: ['./registered-lawyers.component.css']
})
export class RegisteredLawyersComponent {
  constructor(
    private manager: ManagerService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  handleError(err: any) {
    this.snackBar.open(err.message, 'Close', {
      duration: 3000
    });
    return [];
  }




  config: LawyerViewConfig = {
    actions: ACTIONS,
    moreActions: ACTIONS,
    showPhone: true,
    showExpertise2: true,
    role: "lawyer",
  }

  reloadToggle = false;
  loadData() {
    this.reloadToggle = !this.reloadToggle;
  }

  onAction(act: { action: ToolBarButton, user: UserProfile }) {
    switch (act.action.link) {
      case "ok":
        this.manager.editUserRole(act.user, UserRoles.initLawyer).subscribe({
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
    }
  }

}
